-- Seen-listings table for the Ever Co deal finder cron.
-- Tracks every scraped Redfin listing's price so daily runs can flag
-- new listings and price changes. Written/read only by the cron route using
-- the service-role key, so RLS stays on with no public policies.

create table if not exists public.deal_finder_seen (
  redfin_id    text primary key,         -- listingId(): MLS# (or URL fallback)
  address      text,
  asking_price bigint,
  first_seen   timestamptz not null default now(),
  last_price   bigint
);

alter table public.deal_finder_seen enable row level security;

-- No policies: the service-role key bypasses RLS; anon/auth roles get no access.
