/**
 * Shared types for the Ever Co deal finder.
 */

export interface Town {
  name: string;
  zip: string;
  region_id: string;
  county: string;
}

/** A single rent-level row of the investment model. */
export interface RentRow {
  monthly_rent: number;
  gross_annual_rent: number;
  egi: number;
  vacancy_utilities: number;
  taxes_insurance: number;
  mgmt_fees: number;
  noi: number;
  cap_at_asking: number;
  price_for_target_cap: number;
  reno_budget: number;
  hits_target: boolean;
}

/** A normalized Redfin listing plus all derived analysis fields. */
export interface Listing {
  source: "redfin" | "manual";
  mls: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  town: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lot_size: number;
  year_built: number;
  days_on_market: number;
  property_type: string;
  is_multifamily: boolean;
  status: string;
  url: string;

  taxes: number;
  taxes_estimated: boolean;
  insurance: number;
  insurance_estimated: boolean;

  hoa_monthly: number;
  hoa_annual: number;
  hoa_includes: string[];
  hoa_source: "redfin" | "manual" | null;

  photo_url: string;

  // garage_spaces === null means UNKNOWN (couldn't determine), not "no garage".
  garage_spaces: number | null;
  garage_type: "Attached" | "Detached" | null;
  garage_source: "redfin" | "manual" | null;

  // Filled in by the analyzer.
  rent_analysis?: RentRow[];
  hits_target_any?: boolean;
  best_cap?: number;
  cap_at_sort_rent?: number;
  best_reno_budget?: number;

  // Filled in by garage classification.
  garage_label?: string;
  garage_warn?: boolean;
  garage_ok?: boolean;

  // Filled in by the history diff.
  is_new?: boolean;
  price_change?: number;
}

/** Per-listing override entry (real taxes/insurance/garage/HOA/photo). */
export interface Override {
  taxes?: number;
  insurance?: number;
  hoa_monthly?: number;
  hoa_includes?: string[];
  garage_spaces?: number;
  garage_type?: "Attached" | "Detached";
  photo_url?: string;
}

/** A row in the Supabase deal_finder_seen table. */
export interface SeenRow {
  redfin_id: string;
  address: string | null;
  asking_price: number | null;
  first_seen: string;
  last_price: number | null;
}
