# Ever Co Deal Finder — Vercel cron

Daily rental-deal screener for 6 west-Cleveland school districts (Avon Lake,
Avon, Bay Village, Rocky River, Strongsville, Westlake), ported from the original
Python project (`~/ever-co-deals`). Scrapes Redfin, runs a 7% cap investment
model at 9 rent levels, and emails a deal sheet when there are new listings,
price changes, or qualifying deals reaching 15/30/45/60/90/100 days on market.

## How it runs

`vercel.json` schedules a daily GET to `/api/cron/deal-finder` at **12:00 UTC
(8:00 AM ET in summer)**. Vercel Cron authenticates with
`Authorization: Bearer ${CRON_SECRET}`.

Pipeline (in `route.ts`):

1. **Scrape** the Redfin `gis-csv` export for a map area around each school
   district, and keep listings whose coordinates fall inside a district
   boundary (`scraper.ts`, `districts.ts`). Mailing city and zip don't matter —
   e.g. Strongsville schools include 44149 and some Columbia Station addresses.
2. **First-pass screen** on estimated taxes at a relaxed 5.5% cap → candidates.
3. **Enrich** candidates only — real taxes/insurance/HOA + photo + garage from
   `overrides.json` first, then best-effort Redfin detail-page fetches inside a
   ~35s deadline. Anything not reached keeps its estimate, flagged `(est)`.
4. **Re-analyze** on real numbers; keep those clearing the true 7% target; apply
   garage rules (drop no-garage single-family; flag <2-car).
5. **Diff** against the Supabase `deal_finder_seen` table, and check
   `deal_finder_dom_alerts` for days-on-market milestones already sent.
6. **Email** via Resend only if something is new, price-changed, or hit a
   milestone (shown under "Still on the market"); then upsert every scraped
   listing's price and record the milestones sent.

## One-time setup (required before the cron works)

### 1. Create the Supabase tables

Run every file in `supabase/migrations/` in the Supabase SQL editor of the
**everco-cleveland** project (The Ever Company org — separate from Sol). RLS is
on with no public policies — only the service-role key (used by this route) can
read/write them.

### 2. Set Vercel environment variables (Production)

| Variable | Source |
| --- | --- |
| `RESEND_API_KEY` | `~/ever-co-deals/.env` |
| `NEXT_PUBLIC_SUPABASE_URL` | everco-cleveland Supabase project |
| `SUPABASE_SERVICE_ROLE_KEY` | everco-cleveland Supabase project (legacy service_role key) |
| `CRON_SECRET` | any long random string |

All four already exist locally in `.env.local` (gitignored). Add them with
`vercel env add <NAME> production` or via the Vercel dashboard
(Project → Settings → Environment Variables), then redeploy.

Optional overrides: `EVER_FROM_EMAIL`, `EVER_FROM_NAME`, `EVER_TO_EMAILS`
(comma-separated). Defaults are baked into `config.ts`.

## Manual testing

With the env vars present:

```bash
# Preview the email HTML without sending or saving (table must exist):
curl -H "Authorization: Bearer $CRON_SECRET" \
  "https://<deployment>/api/cron/deal-finder?dry=1"

# Force a full run showing all qualifying deals (sends + saves):
curl -H "Authorization: Bearer $CRON_SECRET" \
  "https://<deployment>/api/cron/deal-finder?all=1"
```

`?dry=1` returns the rendered HTML and neither sends nor writes; `?dry=json`
returns the run log, per-district listing counts and the deals that would be
shown. A plain
authenticated GET behaves like the daily cron (email only on new/changed).

## Notes & caveats

- **First run** is the baseline: it emails every qualifying deal and records all
  scraped listings. Later runs show only new + price-changed.
- **Redfin WAF:** the data endpoint is reachable with normal browser headers,
  but Redfin fronts everything with a CloudFront WAF that can challenge requests
  by TLS fingerprint. Plain `fetch` can't impersonate Chrome's TLS the way the
  Python `curl_cffi` did, so from Vercel some town fetches or detail pages may be
  blocked. The route degrades gracefully (skips a blocked town; keeps `(est)`
  values) and returns HTTP 502 without emailing if *every* town is blocked.
  `overrides.json` supplies real numbers for already-diligenced listings.
- **60s timeout:** detail-page enrichment is bounded by a deadline that leaves
  headroom for analysis, email, and save. Candidates already covered by
  `overrides.json` skip the live fetch entirely.
- **School districts:** boundaries are the Census Bureau's TIGERweb "Unified
  School Districts" polygons, stored in `src/lib/deal-finder/districts.json`.
  Refresh them if a district boundary changes (rare). A listing with no
  coordinates falls back to its mailing city matching a district name. Each
  district's Redfin search is capped at 350 homes; the log warns if one hits it.
- **Days-on-market re-alerts:** each milestone fires once per listing, only
  while the listing still qualifies, and only within 7 days of reaching it —
  so a deal that first qualifies at 200 days doesn't trigger back-dated alerts.
  Relisted homes usually get a new MLS# and start over.
- **Tuning:** all thresholds (districts, milestones, rent levels, caps, tax rates, recipients)
  live in `src/lib/deal-finder/config.ts`. Per-listing real
  taxes/insurance/garage/HOA live in `src/lib/deal-finder/overrides.json`.
