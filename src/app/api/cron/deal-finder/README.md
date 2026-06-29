# Ever Co Deal Finder — Vercel cron

Daily rental-deal screener for 6 west-Cleveland towns, ported from the original
Python project (`~/ever-co-deals`). Scrapes Redfin, runs a 7% cap investment
model at 9 rent levels, and emails a deal sheet when there are new listings or
price changes.

## How it runs

`vercel.json` schedules a daily GET to `/api/cron/deal-finder` at **12:00 UTC
(8:00 AM ET in summer)**. Vercel Cron authenticates with
`Authorization: Bearer ${CRON_SECRET}`.

Pipeline (in `route.ts`):

1. **Scrape** the Redfin `gis-csv` export for all 6 towns (`scraper.ts`).
2. **First-pass screen** on estimated taxes at a relaxed 5.5% cap → candidates.
3. **Enrich** candidates only — real taxes/insurance/HOA + photo + garage from
   `overrides.json` first, then best-effort Redfin detail-page fetches inside a
   ~35s deadline. Anything not reached keeps its estimate, flagged `(est)`.
4. **Re-analyze** on real numbers; keep those clearing the true 7% target; apply
   garage rules (drop no-garage single-family; flag <2-car).
5. **Diff** against the Supabase `deal_finder_seen` table.
6. **Email** via Resend only if something is new or price-changed; then upsert
   every scraped listing's price.

## One-time setup (required before the cron works)

### 1. Create the Supabase table

Run `supabase/migrations/20260629_deal_finder_seen.sql` in the Supabase SQL
editor (same project as sol-chat-app). RLS is on with no public policies — only
the service-role key (used by this route) can read/write it.

### 2. Set Vercel environment variables (Production)

| Variable | Source |
| --- | --- |
| `RESEND_API_KEY` | `~/ever-co-deals/.env` |
| `NEXT_PUBLIC_SUPABASE_URL` | sol-chat-app env |
| `SUPABASE_SERVICE_ROLE_KEY` | sol-chat-app env |
| `CRON_SECRET` | reuse sol-chat-app's value |

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

`?dry=1` returns the rendered HTML and neither sends nor writes. A plain
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
- **Tuning:** all thresholds (towns, rent levels, caps, tax rates, recipients)
  live in `src/lib/deal-finder/config.ts`. Per-listing real
  taxes/insurance/garage/HOA live in `src/lib/deal-finder/overrides.json`.
