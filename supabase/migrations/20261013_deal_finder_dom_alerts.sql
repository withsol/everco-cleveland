-- Days-on-market re-alerts for the Ever Co deal finder.
-- One row per milestone (15/30/45/60/90/100 days) already emailed for a
-- listing, so each milestone is sent once. Written/read only by the cron route
-- with the service-role key, so RLS stays on with no public policies.

create table if not exists public.deal_finder_dom_alerts (
  redfin_id      text not null,          -- listingId(): MLS# (or URL fallback)
  milestone      integer not null,       -- days-on-market milestone, e.g. 30
  days_on_market integer,                -- actual DOM when the alert went out
  price          bigint,                 -- asking price when the alert went out
  sent_at        timestamptz not null default now(),
  primary key (redfin_id, milestone)
);

alter table public.deal_finder_dom_alerts enable row level security;

-- No policies: the service-role key bypasses RLS; anon/auth roles get no access.
