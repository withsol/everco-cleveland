/**
 * Configuration for the Ever Co daily rental deal finder.
 *
 * Ported from the original Python config.py. Edit values here to tune the
 * screen. Everything the analyzer and emailer need is centralized here.
 */
import type { Town } from "./types";

// ---------------------------------------------------------------------------
// Target markets — Redfin "region_id"s for each zip (region_type=2 == zip code).
// Region IDs are static; discovered once from Redfin's zip search pages.
// ---------------------------------------------------------------------------
export const TOWNS: Town[] = [
  { name: "Bay Village", zip: "44140", region_id: "18531", county: "Cuyahoga" },
  { name: "Avon Lake", zip: "44012", region_id: "18433", county: "Lorain" },
  { name: "Rocky River", zip: "44116", region_id: "18507", county: "Cuyahoga" },
  { name: "Strongsville", zip: "44136", region_id: "18527", county: "Cuyahoga" },
  { name: "Westlake", zip: "44145", region_id: "18536", county: "Cuyahoga" },
  { name: "Avon", zip: "44011", region_id: "18432", county: "Lorain" },
];
export const REDFIN_MARKET = "cleveland";

// ---------------------------------------------------------------------------
// Listing filters
// ---------------------------------------------------------------------------
export const MIN_BEDS = 3;
export const MIN_BATHS = 1;
export const MAX_PRICE = 450_000; // applies to single-family / non-multifamily only
// No price cap for multi-family (duplex / 2-4 unit).

// Redfin property-type codes (uipt): 1=House, 2=Condo, 3=Townhouse,
// 4=Multi-family, 5=Land, 6=Other. We want single family + multi-family.
export const REDFIN_UIPT = "1,4";
// Statuses we accept as genuinely "for sale" (exclude pending / contingent).
export const ACTIVE_STATUSES = new Set(["Active", "Coming Soon"]);

// DETACHED housing only. Exclude any attached product (the uipt query already
// drops most, but the PROPERTY TYPE string is the final word). A listing must
// match an ALLOWED term and none of the EXCLUDED terms.
export const ALLOWED_PROPERTY_TYPE_TERMS = [
  "single family",
  "multi-family",
  "multi family",
  "duplex",
];
export const EXCLUDED_PROPERTY_TYPE_TERMS = [
  "townhouse",
  "townhome",
  "condo",
  "co-op",
  "coop",
  "cooperative",
  "cluster",
  "row home",
  "row house",
  "rowhouse",
  "attached",
  "stacked",
];

// ---------------------------------------------------------------------------
// Financial model
// ---------------------------------------------------------------------------
export const RENT_LEVELS = [2500, 2700, 2900, 3000, 3100, 3200, 3300, 3400, 3500]; // $/month
export const OCCUPANCY = 0.9; // Effective Gross Income = Gross Rent * 0.90
export const VACANCY_UTILITIES = 400 * 1.2; // $480/yr utilities during vacancy (a cost)
export const MGMT_FEE_RATE = 0.1; // 10% of Effective Gross Income
export const TARGET_CAP = 0.07; // 7% cap rate target
// First-pass screen uses ESTIMATED taxes (we can't fetch detail pages for every
// listing). Candidates clearing this lower bar get their real taxes/insurance
// pulled, then the true 7% filter is applied.
export const CANDIDATE_CAP = 0.055;
export const SORT_RENT_LEVEL = 3000; // rank deals by cap rate at this rent level

// Default annual insurance when not available from listing data.
export const DEFAULT_INSURANCE = 2500;

// Estimated *effective* annual property-tax rate (annual tax / market value),
// keyed by zip. Redfin's CSV export does not include taxes, so taxes are
// ESTIMATED from these county/town effective rates. Override per-listing via
// overrides.json.
export const EFFECTIVE_TAX_RATE: Record<string, number> = {
  "44140": 0.025, // Bay Village  (Cuyahoga)
  "44116": 0.0235, // Rocky River  (Cuyahoga)
  "44145": 0.021, // Westlake     (Cuyahoga)
  "44136": 0.0215, // Strongsville (Cuyahoga)
  "44011": 0.0195, // Avon         (Lorain)
  "44012": 0.0205, // Avon Lake    (Lorain)
};
export const DEFAULT_TAX_RATE = 0.022; // fallback if a zip isn't listed above

// ---------------------------------------------------------------------------
// Email (Resend)
// ---------------------------------------------------------------------------
// thealignedbusiness.com is verified in Resend. theevercocleveland.com must be
// verified in the Resend dashboard before sending from it; until then use the
// verified domain.
export const FROM_EMAIL =
  process.env.EVER_FROM_EMAIL || "evercodealfinder@thealignedbusiness.com";
export const FROM_NAME = process.env.EVER_FROM_NAME || "Ever Co Deal Finder";
export const TO_EMAILS = (
  process.env.EVER_TO_EMAILS ||
  [
    "kelsey.cronkhite@gmail.com",
    "GregCronkhite10@gmail.com",
    "jacobcokergroup@kw.com",
    "kerslake.todd@gmail.com",
    "kurt.belawske1@gmail.com",
  ].join(",")
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);
export const SUBJECT_PREFIX = "Ever Co Deal Sheet";
// Replies go to a monitored Ever Co inbox, not the dealfinder sender. All 5
// recipients are in the visible TO field, so Reply All reaches the whole group.
export const REPLY_TO = process.env.EVER_REPLY_TO || "hello@theevercocleveland.com";
