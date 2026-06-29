/**
 * Seen-listings store backed by Supabase (PostgREST), accessed via plain fetch
 * with the service-role key — no SDK dependency.
 *
 * Table `deal_finder_seen`:
 *   redfin_id     text primary key   -- listingId(): MLS# or URL
 *   address       text
 *   asking_price  bigint
 *   first_seen    timestamptz
 *   last_price    bigint
 *
 * See supabase/migrations for the DDL.
 */
import type { Listing, SeenRow } from "./types";
import { listingId } from "./scraper";

const TABLE = "deal_finder_seen";

function restBase(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
  }
  return { url: `${url.replace(/\/$/, "")}/rest/v1/${TABLE}`, key };
}

function headers(key: string, extra: Record<string, string> = {}): HeadersInit {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/** Load the entire seen table keyed by redfin_id. */
export async function loadSeen(): Promise<Record<string, SeenRow>> {
  const { url, key } = restBase();
  const resp = await fetch(`${url}?select=*`, { headers: headers(key) });
  if (!resp.ok) {
    throw new Error(`Supabase load failed ${resp.status}: ${await resp.text()}`);
  }
  const rows = (await resp.json()) as SeenRow[];
  const out: Record<string, SeenRow> = {};
  for (const r of rows) out[r.redfin_id] = r;
  return out;
}

/**
 * Upsert every scraped listing's current price into the seen table, preserving
 * the original first_seen. Mirrors main.py's save step: record price/address so
 * later runs can compute new vs price-changed.
 */
export async function saveSeen(
  listings: Listing[],
  seen: Record<string, SeenRow>,
  nowIso: string,
): Promise<number> {
  const { url, key } = restBase();
  const rows = listings.map((lst) => {
    const lid = listingId(lst);
    const prev = seen[lid];
    return {
      redfin_id: lid,
      address: lst.address,
      asking_price: lst.price,
      first_seen: prev?.first_seen || nowIso,
      last_price: lst.price,
    };
  });
  if (!rows.length) return 0;

  // PostgREST bulk upsert: POST with Prefer: resolution=merge-duplicates.
  const resp = await fetch(url, {
    method: "POST",
    headers: headers(key, {
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify(rows),
  });
  if (!resp.ok) {
    throw new Error(`Supabase save failed ${resp.status}: ${await resp.text()}`);
  }
  return rows.length;
}
