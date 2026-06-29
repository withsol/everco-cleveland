/**
 * Redfin scraper for the Ever Co deal finder.
 *
 * Pulls the public Redfin "gis-csv" export for each target zip (the same file
 * the "Download All" button produces) and normalizes the rows. For candidates
 * that clear the first-pass screen, fetches the detail page to pull real
 * taxes/insurance/HOA + photo + garage.
 *
 * NOTE ON THE WAF: Redfin fronts its endpoints with a CloudFront WAF that can
 * block non-browser clients via TLS fingerprinting. The original Python used
 * curl_cffi to impersonate Chrome's TLS handshake — Node's fetch can't do that,
 * so from a serverless IP some requests may be challenged. Everything here
 * degrades gracefully: a blocked town is skipped; a blocked detail page keeps
 * estimated values flagged "(est)". overrides.json supplies real numbers for
 * already-diligenced listings regardless of WAF state.
 *
 * Ported from scraper.py.
 */
import * as config from "./config";
import { estimateTaxes } from "./analyzer";
import overridesData from "./overrides.json";
import type { Listing, Override, Town } from "./types";

const GIS_CSV_URL = "https://www.redfin.com/stingray/api/gis-csv";

const overrides = overridesData as Record<string, Override>;

// Realistic Chrome request headers — best effort at passing the WAF without a
// matching TLS fingerprint.
const BROWSER_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Upgrade-Insecure-Requests": "1",
};

function buildUrl(regionId: string): string {
  const params =
    `?al=1&market=${config.REDFIN_MARKET}&num_homes=350` +
    `&ord=redfin-recommended-asc&page_number=1` +
    `&region_id=${regionId}&region_type=2` +
    `&status=1&uipt=${config.REDFIN_UIPT}&v=8`;
  return GIS_CSV_URL + params;
}

function toFloat(val: unknown, def = 0): number {
  if (val === null || val === undefined) return def;
  const n = parseFloat(String(val).replace(/,/g, "").trim());
  return Number.isNaN(n) ? def : n;
}

function toInt(val: unknown, def = 0): number {
  return Math.trunc(toFloat(val, def));
}

/**
 * Parse RFC-4180 CSV text into an array of row objects keyed by header.
 * Handles quoted fields with embedded commas, escaped quotes, and newlines.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      // skip blank lines
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.length > 1 || row[0] !== "") rows.push(row);
  }
  if (rows.length === 0) return [];

  const headers = rows[0];
  return rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = r[idx] ?? "";
    });
    return obj;
  });
}

// The Redfin CSV's URL column header is verbose; match it loosely.
function getUrl(row: Record<string, string>): string {
  for (const key of Object.keys(row)) {
    if (key.startsWith("URL")) return (row[key] || "").trim();
  }
  return "";
}

function normalizeRow(row: Record<string, string>, town: Town): Listing {
  const propType = (row["PROPERTY TYPE"] || "").trim();
  const isMf = ["multi-family", "multi family", "duplex"].some((mf) =>
    propType.toLowerCase().includes(mf),
  );

  const price = toInt(row["PRICE"]);
  const zipCode = (row["ZIP OR POSTAL CODE"] || town.zip).trim();
  let url = getUrl(row);
  if (url && !url.startsWith("http")) url = "https://www.redfin.com" + url;

  const taxes = estimateTaxes(price, zipCode);
  const hoaMonthly = toInt(row["HOA/MONTH"]);

  return {
    source: "redfin",
    mls: (row["MLS#"] || "").trim(),
    address: (row["ADDRESS"] || "").trim(),
    city: (row["CITY"] || town.name).trim(),
    state: (row["STATE OR PROVINCE"] || "OH").trim(),
    zip: zipCode,
    town: town.name,
    price,
    beds: toInt(row["BEDS"]),
    baths: toFloat(row["BATHS"]),
    sqft: toInt(row["SQUARE FEET"]),
    lot_size: toInt(row["LOT SIZE"]),
    year_built: toInt(row["YEAR BUILT"]),
    days_on_market: toInt(row["DAYS ON MARKET"]),
    property_type: propType,
    is_multifamily: isMf,
    status: (row["STATUS"] || "").trim(),
    url,
    taxes,
    taxes_estimated: true,
    insurance: config.DEFAULT_INSURANCE,
    insurance_estimated: true,
    hoa_monthly: hoaMonthly,
    hoa_annual: hoaMonthly * 12,
    hoa_includes: [],
    hoa_source: null,
    photo_url: "",
    garage_spaces: null,
    garage_type: null,
    garage_source: null,
  };
}

/** Stable key for dedup/tracking: prefer MLS#, fall back to URL then address. */
export function listingId(lst: Listing): string {
  return lst.mls || lst.url || lst.address;
}

async function fetchWithTimeout(
  url: string,
  headers: Record<string, string>,
  timeoutMs: number,
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { headers, signal: controller.signal, redirect: "follow" });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function scrapeTown(town: Town): Promise<Listing[]> {
  const url = buildUrl(town.region_id);
  const headers = {
    ...BROWSER_HEADERS,
    Referer: `https://www.redfin.com/zipcode/${town.zip}`,
  };
  const resp = await fetchWithTimeout(url, headers, 15000);
  if (!resp || resp.status !== 200) {
    console.warn(`  ! ${town.name}: HTTP ${resp ? resp.status : "no-response"}`);
    return [];
  }
  const text = await resp.text();
  const rows = parseCsv(text);
  const listings = rows
    .filter((r) => (r["ADDRESS"] || "").trim())
    .map((r) => normalizeRow(r, town));
  console.log(`  + ${town.name} ${listings.length} listings`);
  return listings;
}

/** Scrape every configured town in parallel. Returns deduped listings. */
export async function scrapeAll(): Promise<Listing[]> {
  const results = await Promise.all(config.TOWNS.map((t) => scrapeTown(t).catch(() => [])));
  const allListings: Listing[] = [];
  const seenIds = new Set<string>();
  for (const townListings of results) {
    for (const lst of townListings) {
      const lid = listingId(lst);
      if (seenIds.has(lid)) continue;
      seenIds.add(lid);
      allListings.push(lst);
    }
  }
  return allListings;
}

// ---------------------------------------------------------------------------
// Detail-page parsing (best effort).
// ---------------------------------------------------------------------------

/**
 * Parse garage info from a Redfin detail page's HTML.
 * Returns [spaces, type]: spaces is an int (0 == explicitly no garage) or null
 * if undeterminable; type is "Attached"/"Detached"/null.
 */
export function parseGarage(html: string): [number | null, "Attached" | "Detached" | null] {
  if (!html) return [null, null];
  const low = html.toLowerCase();

  // COUNT — authoritative source is the SUBJECT's JSON-LD amenity name.
  let spaces: number | null = null;
  const nameMatches = low.match(/"name"\s*:\s*"([^"]*garage[^"]*)"/g) || [];
  for (const nm of nameMatches) {
    const m = nm.match(/(\d+)\s*-?\s*car/);
    if (m) {
      spaces = parseInt(m[1], 10);
      break;
    }
  }

  // TYPE — from rendered amenity phrases that carry BOTH type and a count.
  const typed: [string, number][] = [];
  let tm: RegExpExecArray | null;
  const re1 = /(attached|detached)\s+garage\s*\(\s*(\d+)\s*car/g;
  while ((tm = re1.exec(low))) typed.push([tm[1], parseInt(tm[2], 10)]);
  const re2 = /(attached|detached)\s+(\d+)\s*-?\s*car\s+garage/g;
  while ((tm = re2.exec(low))) typed.push([tm[1], parseInt(tm[2], 10)]);

  let gtype: "Attached" | "Detached" | null = null;
  const cap = (s: string): "Attached" | "Detached" =>
    (s.charAt(0).toUpperCase() + s.slice(1)) as "Attached" | "Detached";
  if (typed.length) {
    if (spaces !== null) {
      for (const [t, n] of typed) {
        if (n === spaces) {
          gtype = cap(t);
          break;
        }
      }
    } else {
      gtype = cap(typed[0][0]);
      spaces = typed[0][1];
    }
  }

  // COUNT fallback if JSON-LD was absent and no typed phrase matched.
  if (spaces === null) {
    const mc =
      low.match(/(\d+)\s*-?\s*car\s+garage/) || low.match(/garage\s*\(\s*(\d+)\s*car/);
    if (mc) spaces = parseInt(mc[1], 10);
  }

  // Explicit no-garage (rare but definitive).
  if (spaces === null && /\bno\s+garage\b|garage:\s*none/.test(low)) spaces = 0;

  return [spaces, gtype];
}

/**
 * Extract Redfin's payment-calculator MONTHLY figures from a detail page.
 * Returns a partial of { taxes, insurance, hoa }.
 */
export function parsePaymentCalc(html: string): {
  taxes?: number;
  insurance?: number;
  hoa?: number;
} {
  const out: { taxes?: number; insurance?: number; hoa?: number } = {};
  if (!html) return out;
  const labels: [keyof typeof out, string][] = [
    ["taxes", "Property taxes"],
    ["insurance", "Home insurance"],
    ["hoa", "HOA dues"],
  ];
  for (const [key, label] of labels) {
    const i = html.indexOf(label);
    if (i < 0) continue;
    const m = html.slice(i, i + 120).match(/\$([\d,]+)/);
    if (m) out[key] = parseInt(m[1].replace(/,/g, ""), 10);
  }
  return out;
}

/** Extract the primary listing photo from the og:image meta tag. */
export function parseOgImage(html: string): string {
  if (!html) return "";
  const m =
    html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i,
    ) ||
    html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    );
  return m ? m[1] : "";
}

/** List everything an HOA covers, from the detail page's structured data. */
export function parseHoaIncludes(html: string): string[] {
  if (!html) return [];
  const refs = [
    "ASSOCIATION_FEE_INCLUDES",
    "ASSOCIATION_AMENITIES",
    "HOA_AMENITIES",
    "COMMUNITY_FEATURES",
  ];
  const items: string[] = [];
  for (const ref of refs) {
    let start = 0;
    while (true) {
      const i = html.indexOf(ref, start);
      if (i < 0) break;
      start = i + 1;
      const j = html.indexOf("amenityValues", i);
      if (j < 0 || j - i > 200) continue;
      const k = html.indexOf("[", j);
      const e = html.indexOf("]", k);
      if (k < 0 || e < 0) continue;
      const arr = html.slice(k + 1, e).replace(/\\/g, "");
      const found = arr.match(/"([^"]+)"/g) || [];
      for (const f of found) items.push(f.slice(1, -1));
    }
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v0 of items) {
    const v = v0.trim();
    if (v && !seen.has(v.toLowerCase())) {
      seen.add(v.toLowerCase());
      out.push(v);
    }
  }
  return out;
}

async function fetchDetailHtml(url: string, timeoutMs: number): Promise<string | null> {
  const resp = await fetchWithTimeout(
    url,
    { ...BROWSER_HEADERS, Referer: "https://www.redfin.com/" },
    timeoutMs,
  );
  if (!resp || resp.status !== 200) return null;
  const text = await resp.text();
  return text.length > 50000 ? text : null;
}

function needsFetch(l: Listing): boolean {
  if (!l.url) return false;
  return (
    l.taxes_estimated ||
    l.insurance_estimated ||
    !l.photo_url ||
    l.garage_spaces === null ||
    (l.hoa_monthly > 0 && l.hoa_includes.length === 0 && l.hoa_source !== "manual")
  );
}

/** Run async tasks with a concurrency cap. */
async function pMap<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const idx = next++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return results;
}

/**
 * Fetch each candidate's detail page once and fill in real figures. Bounded by
 * a global deadline so the cron stays inside the function timeout — anything
 * not reached keeps its estimate (flagged "(est)"). Fields set via overrides
 * are preserved.
 */
export async function enrichDetails(
  listings: Listing[],
  opts: { deadlineMs?: number; concurrency?: number; perRequestTimeoutMs?: number } = {},
): Promise<Listing[]> {
  const deadline = Date.now() + (opts.deadlineMs ?? 35000);
  const concurrency = opts.concurrency ?? 5;
  const perRequestTimeout = opts.perRequestTimeoutMs ?? 9000;

  const todo = listings.filter(needsFetch);
  if (!todo.length) return listings;

  let got = 0;
  let blocked = 0;

  await pMap(todo, concurrency, async (lst) => {
    if (Date.now() > deadline) {
      blocked += 1;
      return;
    }
    const html = await fetchDetailHtml(lst.url, perRequestTimeout);
    if (html === null) {
      blocked += 1;
      return;
    }

    const calc = parsePaymentCalc(html);
    if (calc.taxes !== undefined && lst.taxes_estimated) {
      lst.taxes = calc.taxes * 12;
      lst.taxes_estimated = false;
    }
    if (calc.insurance !== undefined && lst.insurance_estimated) {
      lst.insurance = calc.insurance * 12;
      lst.insurance_estimated = false;
    }
    if (calc.hoa !== undefined && lst.hoa_source !== "manual") {
      lst.hoa_monthly = calc.hoa;
      lst.hoa_annual = calc.hoa * 12;
      lst.hoa_source = "redfin";
    }

    if (!lst.photo_url) lst.photo_url = parseOgImage(html);

    if (lst.garage_source !== "manual") {
      const [spaces, gtype] = parseGarage(html);
      lst.garage_spaces = spaces;
      lst.garage_type = gtype;
      lst.garage_source = "redfin";
    }

    if (lst.hoa_monthly > 0 && lst.hoa_includes.length === 0) {
      lst.hoa_includes = parseHoaIncludes(html);
    }
    got += 1;
  });

  console.log(`Detail enrichment: ${got} read, ${blocked} blocked.`);
  return listings;
}

/** Apply per-listing overrides from overrides.json (keyed by MLS# or URL). */
export function applyOverrides(listings: Listing[]): Listing[] {
  for (const lst of listings) {
    const ov =
      overrides[listingId(lst)] || overrides[lst.mls] || overrides[lst.url];
    if (!ov) continue;
    if (ov.taxes !== undefined) {
      lst.taxes = ov.taxes;
      lst.taxes_estimated = false;
    }
    if (ov.insurance !== undefined) {
      lst.insurance = ov.insurance;
      lst.insurance_estimated = false;
    }
    if (ov.garage_spaces !== undefined) {
      lst.garage_spaces = ov.garage_spaces;
      lst.garage_type = ov.garage_type ?? lst.garage_type;
      lst.garage_source = "manual";
    }
    if (ov.hoa_monthly !== undefined) {
      lst.hoa_monthly = ov.hoa_monthly;
      lst.hoa_annual = ov.hoa_monthly * 12;
      lst.hoa_source = "manual";
    }
    if (ov.hoa_includes !== undefined) lst.hoa_includes = ov.hoa_includes;
    if (ov.photo_url !== undefined) lst.photo_url = ov.photo_url;
  }
  return listings;
}
