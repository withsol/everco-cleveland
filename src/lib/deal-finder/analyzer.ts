/**
 * Investment analyzer for the Ever Co deal finder.
 *
 * Runs the rental investment model at each configured rent level and decides
 * whether a property clears the target cap rate. Pure functions, no I/O.
 * Ported from analyzer.py.
 */
import * as config from "./config";
import type { Listing, RentRow } from "./types";

/** Run the full model for a single monthly rent figure. */
export function analyzeRentLevel(
  askingPrice: number,
  taxes: number,
  insurance: number,
  monthlyRent: number,
  hoaAnnual = 0,
): RentRow {
  const grossAnnualRent = monthlyRent * 12;
  const egi = grossAnnualRent * config.OCCUPANCY; // Effective Gross Income
  const vacancyUtilities = config.VACANCY_UTILITIES; // cost
  const taxesInsurance = taxes + insurance + hoaAnnual; // cost (incl. HOA)
  const mgmtFees = egi * config.MGMT_FEE_RATE; // cost

  const noi = egi - vacancyUtilities - taxesInsurance - mgmtFees;

  const capAtAsking = askingPrice ? noi / askingPrice : 0;
  const priceForTarget = config.TARGET_CAP ? noi / config.TARGET_CAP : 0;
  const renoBudget = priceForTarget - askingPrice;

  return {
    monthly_rent: monthlyRent,
    gross_annual_rent: grossAnnualRent,
    egi,
    vacancy_utilities: vacancyUtilities,
    taxes_insurance: taxesInsurance,
    mgmt_fees: mgmtFees,
    noi,
    cap_at_asking: capAtAsking,
    price_for_target_cap: priceForTarget,
    reno_budget: renoBudget,
    hits_target: capAtAsking >= config.TARGET_CAP,
  };
}

/** Attach the full rent-level analysis to a listing dict. Returns the listing. */
export function analyzeListing(listing: Listing): Listing {
  const price = listing.price;
  const taxes = listing.taxes;
  const insurance = listing.insurance;
  const hoaAnnual = listing.hoa_annual || 0;

  const analysis = config.RENT_LEVELS.map((r) =>
    analyzeRentLevel(price, taxes, insurance, r, hoaAnnual),
  );
  listing.rent_analysis = analysis;
  listing.hits_target_any = analysis.some((a) => a.hits_target);
  listing.best_cap = Math.max(...analysis.map((a) => a.cap_at_asking));

  const sortRow =
    analysis.find((a) => a.monthly_rent === config.SORT_RENT_LEVEL) || analysis[0];
  listing.cap_at_sort_rent = sortRow.cap_at_asking;
  listing.best_reno_budget = sortRow.reno_budget;
  return listing;
}

/** Estimate annual property taxes from the town effective tax rate. */
export function estimateTaxes(price: number, zipCode: string): number {
  const rate = config.EFFECTIVE_TAX_RATE[zipCode] ?? config.DEFAULT_TAX_RATE;
  return Math.round(price * rate);
}

/** Apply the hard listing filters (beds/baths/type/price/status). */
export function passesFilters(listing: Listing): boolean {
  if (listing.beds < config.MIN_BEDS) return false;
  if (listing.baths < config.MIN_BATHS) return false;
  if (!config.ACTIVE_STATUSES.has(listing.status)) return false;
  // Detached only: drop attached product (townhouse/condo/cluster/row/etc.).
  const pt = (listing.property_type || "").toLowerCase();
  if (pt) {
    if (config.EXCLUDED_PROPERTY_TYPE_TERMS.some((t) => pt.includes(t))) return false;
    if (!config.ALLOWED_PROPERTY_TYPE_TERMS.some((t) => pt.includes(t))) return false;
  }
  // Price cap applies to non-multifamily only.
  if (!listing.is_multifamily && listing.price > config.MAX_PRICE) return false;
  return true;
}

/**
 * Set human-readable garage display fields on a listing and report whether it
 * should be excluded.
 *
 * Family preference: 2-car garage.
 *   - 2+ spaces            -> good, no warning
 *   - 1 space              -> KEEP but flag prominently
 *   - 0 spaces (no garage) -> EXCLUDE, unless multi-family
 *   - unknown (null)       -> KEEP, flag as unconfirmed (never drop on a guess)
 *
 * Returns true if the listing should be EXCLUDED.
 */
export function classifyGarage(listing: Listing): boolean {
  const spaces = listing.garage_spaces;
  const gtype = listing.garage_type;
  const typeSuffix = gtype ? ` (${gtype})` : "";

  if (spaces === null || spaces === undefined) {
    listing.garage_label = "Garage not confirmed";
    listing.garage_warn = true;
    listing.garage_ok = false;
    return false; // never exclude on unknown
  }

  if (spaces <= 0) {
    if (listing.is_multifamily) {
      listing.garage_label = "No garage (multi-family)";
      listing.garage_warn = true;
      listing.garage_ok = false;
      return false;
    }
    listing.garage_label = "No garage";
    listing.garage_warn = true;
    listing.garage_ok = false;
    return true; // exclude single-family with no garage
  }

  if (spaces === 1) {
    listing.garage_label = `1-Car Garage${typeSuffix}`;
    listing.garage_warn = true;
    listing.garage_ok = false;
    return false;
  }

  listing.garage_label = `${spaces}-Car Garage${typeSuffix}`;
  listing.garage_warn = false;
  listing.garage_ok = true;
  return false;
}

/**
 * Classify garage for each deal and drop no-garage single-family homes.
 * Returns { kept, excluded }. Run AFTER garage enrichment.
 */
export function applyGarageRules(deals: Listing[]): {
  kept: Listing[];
  excluded: number;
} {
  const kept: Listing[] = [];
  let excluded = 0;
  for (const d of deals) {
    if (classifyGarage(d)) {
      excluded += 1;
      continue;
    }
    kept.push(d);
  }
  return { kept, excluded };
}

/** Best deals first: highest cap at the sort rent level, then reno budget. */
export function sortDeals(deals: Listing[]): Listing[] {
  deals.sort((a, b) => {
    const capDiff = (b.cap_at_sort_rent || 0) - (a.cap_at_sort_rent || 0);
    if (capDiff !== 0) return capDiff;
    return (b.best_reno_budget || 0) - (a.best_reno_budget || 0);
  });
  return deals;
}

/**
 * Filter listings, run analysis, keep those whose best cap >= minCap.
 * minCap defaults to the 7% target. Pass CANDIDATE_CAP for the first pass.
 * Returns { kept (sorted best-first), dropped }.
 */
export function analyzeAndFilter(
  listings: Listing[],
  minCap: number = config.TARGET_CAP,
): { kept: Listing[]; dropped: { filters: number; below_target_cap: number } } {
  const dropped = { filters: 0, below_target_cap: 0 };
  const kept: Listing[] = [];
  for (const lst of listings) {
    if (!passesFilters(lst)) {
      dropped.filters += 1;
      continue;
    }
    analyzeListing(lst);
    if ((lst.best_cap || 0) < minCap) {
      dropped.below_target_cap += 1;
      continue;
    }
    kept.push(lst);
  }
  return { kept: sortDeals(kept), dropped };
}
