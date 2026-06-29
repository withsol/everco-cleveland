/**
 * HTML email builder + Resend sender for the Ever Co deal finder.
 *
 * Builds a responsive, email-client-safe HTML deal sheet (inline styles, table
 * layout) and sends it through the Resend API via fetch. Ported from emailer.py.
 */
import * as config from "./config";
import type { Listing, RentRow } from "./types";

// Brand palette
const INK = "#1a2b33";
const MUTED = "#6b7c85";
const LINE = "#e3e8ea";
const TEAL = "#0f766e";
const TEAL_SOFT = "#e6f4f1";
const GREEN = "#16a34a";
const GREEN_BG = "#dcfce7";
const AMBER = "#b45309";
const AMBER_BG = "#fef3c7";
const RED = "#dc2626";
const CARD_BG = "#ffffff";
const PAGE_BG = "#f4f6f7";

const money = (n: number): string =>
  "$" + Math.round(n).toLocaleString("en-US");

const pct = (x: number): string => (x * 100).toFixed(2) + "%";

function badges(deal: Listing): string {
  const out: [string, string, string][] = [];
  if (deal.is_new) out.push(["NEW", "#fff", TEAL]);
  if (deal.price_change) {
    const pc = deal.price_change;
    if (pc < 0) out.push([`PRICE ↓ ${money(Math.abs(pc))}`, "#fff", RED]);
    else if (pc > 0) out.push([`PRICE ↑ ${money(pc)}`, "#fff", AMBER]);
  }
  if (deal.is_multifamily) out.push(["MULTI-FAMILY", INK, "#e8edef"]);
  const label = deal.garage_label;
  if (label) {
    if (deal.garage_ok) out.push([`🚗 ${label}`, GREEN, GREEN_BG]);
    else out.push([`⚠️ ${label}`, "#fff", AMBER]);
  }
  let chips = "";
  for (const [text, fg, bg] of out) {
    chips +=
      `<span style="display:inline-block;background:${bg};color:${fg};` +
      `font-size:11px;font-weight:700;letter-spacing:.3px;padding:3px 8px;` +
      `border-radius:10px;margin-right:6px;">${text}</span>`;
  }
  return chips;
}

function rentTable(deal: Listing): string {
  let rows = "";
  for (const a of deal.rent_analysis as RentRow[]) {
    const hit = a.hits_target;
    const bg = hit ? GREEN_BG : "#ffffff";
    const capColor = hit ? GREEN : INK;
    const capWeight = hit ? "700" : "400";
    const reno = a.reno_budget;
    const renoColor = reno >= 0 ? GREEN : RED;
    const check = hit
      ? ` <span style="color:${GREEN};font-weight:700;">✓</span>`
      : "";
    rows += `
        <tr style="background:${bg};">
          <td style="padding:7px 10px;border-bottom:1px solid ${LINE};font-weight:600;color:${INK};">$${a.monthly_rent.toLocaleString("en-US")}/mo</td>
          <td style="padding:7px 10px;border-bottom:1px solid ${LINE};text-align:right;color:${capColor};font-weight:${capWeight};">${pct(a.cap_at_asking)}${check}</td>
          <td style="padding:7px 10px;border-bottom:1px solid ${LINE};text-align:right;color:${MUTED};">${money(a.noi)}</td>
          <td style="padding:7px 10px;border-bottom:1px solid ${LINE};text-align:right;color:${MUTED};">${money(a.price_for_target_cap)}</td>
          <td style="padding:7px 10px;border-bottom:1px solid ${LINE};text-align:right;color:${renoColor};font-weight:600;">${money(reno)}</td>
        </tr>`;
  }
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;margin-top:14px;border:1px solid ${LINE};border-radius:8px;overflow:hidden;">
      <tr style="background:${INK};">
        <th style="padding:8px 10px;text-align:left;color:#cfe3df;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">Rent</th>
        <th style="padding:8px 10px;text-align:right;color:#cfe3df;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">Cap @ Asking</th>
        <th style="padding:8px 10px;text-align:right;color:#cfe3df;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">NOI</th>
        <th style="padding:8px 10px;text-align:right;color:#cfe3df;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">Price @ 7%</th>
        <th style="padding:8px 10px;text-align:right;color:#cfe3df;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">Reno Budget</th>
      </tr>
      ${rows}
    </table>`;
}

function specLine(label: string, value: string | number, est = false): string {
  const estTag = est
    ? ` <span style="color:${MUTED};font-size:11px;">(est)</span>`
    : "";
  return (
    `<td style="padding:0 14px 0 0;white-space:nowrap;">` +
    `<div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:.4px;">${label}</div>` +
    `<div style="font-size:15px;color:${INK};font-weight:600;">${value}${estTag}</div>` +
    `</td>`
  );
}

function dealCard(deal: Listing, rank: number): string {
  const bestReno = deal.best_reno_budget as number;
  const bestCap = deal.best_cap as number;
  const analysis = deal.rent_analysis as RentRow[];
  const nHits = analysis.filter((a) => a.hits_target).length;
  const hitLevels = analysis.filter((a) => a.hits_target).map((a) => a.monthly_rent);
  const minHit = hitLevels.length ? Math.min(...hitLevels) : null;

  const renoColor = bestReno >= 0 ? GREEN : RED;
  const renoLabel = bestReno >= 0 ? "Reno budget @ $3k rent" : "Over 7%-price @ $3k by";
  const sqft = deal.sqft ? `${deal.sqft.toLocaleString("en-US")} sqft` : "— sqft";
  const yr = deal.year_built ? deal.year_built : "—";
  const dom = deal.days_on_market;
  const domStr = dom <= 1 ? "New today" : `${dom} days on market`;

  const addrLink = deal.url || "#";

  let photoCell = "";
  if (deal.photo_url) {
    photoCell = `
            <td width="172" style="vertical-align:top;padding-right:16px;">
              <a href="${addrLink}"><img src="${deal.photo_url}" width="160" height="120" alt="${deal.address}" style="display:block;width:160px;height:120px;object-fit:cover;border-radius:10px;border:1px solid ${LINE};"></a>
            </td>`;
  }

  let hoaBlock = "";
  if (deal.hoa_monthly) {
    const incl = deal.hoa_includes || [];
    const inclTxt = incl.length ? ` (${incl.join(", ")})` : "";
    hoaBlock = `
        <tr><td style="padding:12px 22px 0 22px;">
          <div style="background:${AMBER_BG};border-radius:8px;padding:9px 14px;font-size:13px;color:${INK};">
            <strong style="color:${AMBER};">HOA:</strong> ${money(deal.hoa_annual)}/yr
            (<span style="color:${MUTED};">${money(deal.hoa_monthly)}/mo</span>)${inclTxt}
            <span style="color:${MUTED};font-size:12px;"> — included in carrying costs below</span>
          </div>
        </td></tr>`;
  }

  const hitSummary =
    `Clears 7% cap at ${nHits} of ${analysis.length} rent levels` +
    (minHit ? ` (from $${minHit.toLocaleString("en-US")}/mo)` : "");

  return `
    <tr><td style="padding:0 0 18px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CARD_BG};border:1px solid ${LINE};border-radius:14px;border-collapse:separate;overflow:hidden;">
        <tr><td style="padding:20px 22px 4px 22px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            ${photoCell}
            <td style="vertical-align:top;">
              <div style="font-size:12px;color:${TEAL};font-weight:700;letter-spacing:.5px;">#${rank} · ${deal.town.toUpperCase()} · ${deal.zip}</div>
              <div style="font-size:20px;font-weight:700;color:${INK};margin:3px 0 6px 0;line-height:1.25;">
                <a href="${addrLink}" style="color:${INK};text-decoration:none;">${deal.address}</a>
              </div>
              <div>${badges(deal)}</div>
            </td>
            <td style="vertical-align:top;text-align:right;white-space:nowrap;">
              <div style="font-size:26px;font-weight:800;color:${INK};">${money(deal.price)}</div>
              <div style="font-size:12px;color:${MUTED};">${domStr}</div>
            </td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:14px 22px 0 22px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            ${specLine("Beds", deal.beds)}
            ${specLine("Baths", deal.baths)}
            ${specLine("Size", sqft)}
            ${specLine("Built", yr)}
            ${specLine("Garage", deal.garage_label || "—")}
            ${specLine("Taxes/yr", money(deal.taxes), deal.taxes_estimated)}
            ${specLine("Insurance/yr", money(deal.insurance), deal.insurance_estimated)}
          </tr></table>
        </td></tr>
        ${hoaBlock}

        <tr><td style="padding:16px 22px 0 22px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${TEAL_SOFT};border-radius:10px;"><tr>
            <td style="padding:12px 16px;">
              <div style="font-size:11px;color:${TEAL};text-transform:uppercase;letter-spacing:.4px;font-weight:700;">Best cap @ asking</div>
              <div style="font-size:22px;font-weight:800;color:${TEAL};">${pct(bestCap)}</div>
            </td>
            <td style="padding:12px 16px;border-left:1px solid #cfe6e1;">
              <div style="font-size:11px;color:${renoColor};text-transform:uppercase;letter-spacing:.4px;font-weight:700;">${renoLabel}</div>
              <div style="font-size:22px;font-weight:800;color:${renoColor};">${money(bestReno)}</div>
            </td>
            <td style="padding:12px 16px;border-left:1px solid #cfe6e1;">
              <div style="font-size:12px;color:${INK};line-height:1.4;">${hitSummary}</div>
              <div style="margin-top:6px;"><a href="${addrLink}" style="color:${TEAL};font-weight:700;font-size:13px;text-decoration:none;">View on Redfin →</a></div>
            </td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:0 22px 20px 22px;">
          ${rentTable(deal)}
        </td></tr>
      </table>
    </td></tr>`;
}

export interface Report {
  date_str: string;
  deals: Listing[];
  stats: { scanned: number; qualified: number };
}

export function buildHtml(report: Report): string {
  const deals = report.deals;
  const stats = report.stats;
  const dateStr = report.date_str;

  const cards = deals.map((d, i) => dealCard(d, i + 1)).join("");

  const newCount = deals.filter((d) => d.is_new).length;
  const dropCount = deals.filter((d) => (d.price_change || 0) < 0).length;

  let intro: string;
  if (deals.length) {
    intro =
      `<strong style="color:${INK};">${deals.length}</strong> propert` +
      `${deals.length === 1 ? "y" : "ies"} clear the 7% cap target ` +
      `(of ${stats.scanned || 0} scanned across ${config.TOWNS.length} towns).`;
  } else {
    intro =
      `No properties cleared the 7% cap target today ` +
      `(scanned ${stats.scanned || 0} listings across ${config.TOWNS.length} towns).`;
  }

  let summaryChips = "";
  const chipData: [string, number][] = [
    ["Qualified deals", deals.length],
    ["New", newCount],
    ["Price drops", dropCount],
    ["Scanned", stats.scanned || 0],
  ];
  for (const [label, val] of chipData) {
    summaryChips += `
        <td style="padding:0 6px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid ${LINE};border-radius:10px;">
            <tr><td style="padding:12px 14px;text-align:center;">
              <div style="font-size:24px;font-weight:800;color:${TEAL};">${val}</div>
              <div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:.4px;">${label}</div>
            </td></tr>
          </table>
        </td>`;
  }

  const emptyBlock = deals.length
    ? ""
    : `
      <tr><td style="padding:0 0 18px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CARD_BG};border:1px dashed ${LINE};border-radius:14px;">
          <tr><td style="padding:40px 22px;text-align:center;color:${MUTED};font-size:15px;">
            Nothing hit the 7% target today. The market's been screened — we'll keep watching.
          </td></tr>
        </table>
      </td></tr>`;

  const townsLine = config.TOWNS.map((t) => t.name).join(", ");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${PAGE_BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE_BG};">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="660" cellpadding="0" cellspacing="0" style="max-width:660px;width:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

        <!-- Header -->
        <tr><td style="padding:0 4px 18px 4px;">
          <div style="font-size:13px;color:${TEAL};font-weight:700;letter-spacing:1px;text-transform:uppercase;">The Ever Company · Cleveland</div>
          <div style="font-size:30px;font-weight:800;color:${INK};margin-top:4px;">Daily Deal Sheet</div>
          <div style="font-size:15px;color:${MUTED};margin-top:4px;">${dateStr}</div>
          <div style="font-size:15px;color:${INK};margin-top:14px;line-height:1.5;">${intro}</div>
        </td></tr>

        <!-- Summary -->
        <tr><td style="padding:0 0 22px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${summaryChips}</tr></table>
        </td></tr>

        <!-- Deals -->
        <tr><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${cards}${emptyBlock}
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:10px 4px 0 4px;">
          <div style="border-top:1px solid ${LINE};padding-top:16px;font-size:12px;color:${MUTED};line-height:1.6;">
            <strong style="color:${INK};">Model:</strong> EGI = gross rent × 90% occupancy; less $480/yr vacancy utilities,
            taxes + insurance + HOA, and 10% management. NOI ÷ asking = cap rate; NOI ÷ 7% = max price for a 7% cap;
            reno budget = that price − asking.<br>
            <strong style="color:${INK};">Data:</strong> Property taxes, insurance, and HOA pulled from each Redfin listing's
            payment calculator.<br>
            <strong style="color:${INK};">Garage:</strong> We prefer 2-car. <span style="color:${AMBER};">⚠️ 1-Car Garage</span> means just that —
            check the driveway/parking from photos. "Garage not confirmed" means we couldn't read it from the listing; verify on Redfin.
            Single-family homes with no garage are excluded; multi-family is kept regardless.<br>
            <strong style="color:${INK};">Towns screened:</strong> ${townsLine}. Source: Redfin. Single-family capped at ${money(config.MAX_PRICE)};
            no cap on multi-family.
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

/** Send via Resend. Returns the API response object. */
export async function sendEmail(
  html: string,
  subject: string,
  opts: { apiKey?: string; toEmails?: string[] } = {},
): Promise<unknown> {
  const toEmails = opts.toEmails || config.TO_EMAILS;
  const apiKey = opts.apiKey || process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set (env var or pass apiKey).");

  const payload = {
    from: `${config.FROM_NAME} <${config.FROM_EMAIL}>`,
    to: toEmails,
    subject,
    html,
  };

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "ever-co-deals/1.0 (+https://theevercocleveland.com)",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await resp.text();
  if (!resp.ok) throw new Error(`Resend API error ${resp.status}: ${text}`);
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
