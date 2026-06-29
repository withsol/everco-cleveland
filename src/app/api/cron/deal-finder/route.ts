/**
 * Ever Co daily rental deal finder — Vercel cron route.
 *
 * Replicates the original Python orchestrator (main.py):
 *   1. Scrape Redfin gis-csv for the 6 target towns.
 *   2. First-pass screen with estimated taxes at a relaxed cap to form a
 *      candidate pool.
 *   3. Pull real taxes/insurance/HOA + photo + garage for candidates only
 *      (overrides first, then best-effort detail-page fetch within a deadline).
 *   4. Re-analyze on real numbers, apply the true 7% filter, then garage rules.
 *   5. Diff against the Supabase seen table; email only new / price-changed.
 *   6. On a successful send, upsert every scraped listing's price.
 *
 * Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`. Manual runs
 * may pass `?dry=1` (with the secret) to build a preview without sending/saving.
 */
import { NextResponse } from "next/server";
import * as config from "@/lib/deal-finder/config";
import * as scraper from "@/lib/deal-finder/scraper";
import * as analyzer from "@/lib/deal-finder/analyzer";
import * as emailer from "@/lib/deal-finder/emailer";
import { loadSeen, saveSeen } from "@/lib/deal-finder/store";
import type { Listing } from "@/lib/deal-finder/types";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

function todayParts() {
  // Format in America/New_York so the date reads correctly for Cleveland.
  const now = new Date();
  const tz = "America/New_York";
  const long = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);
  const short = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(now);
  // ISO date (YYYY-MM-DD) in the same tz.
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return { long, short, iso };
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const dryRun = url.searchParams.get("dry") === "1";
  const showAll = url.searchParams.get("all") === "1";

  const startedAt = Date.now();
  const { long: dateLong, short: dateShort, iso: nowIso } = todayParts();
  const log: string[] = [];
  const note = (m: string) => {
    log.push(m);
    console.log(m);
  };

  try {
    // 1. Gather + overrides.
    const listings = await scraper.scrapeAll();
    scraper.applyOverrides(listings);
    note(`Gathered ${listings.length} listings.`);

    if (listings.length === 0) {
      // WAF likely blocked every town; don't proceed to email or save.
      note("No listings scraped (Redfin likely blocked). Aborting without email.");
      return NextResponse.json(
        { ok: false, reason: "no-listings", log, elapsedMs: Date.now() - startedAt },
        { status: 502 },
      );
    }

    // 2. First-pass screen on estimates at the relaxed candidate cap.
    const { kept: candidates, dropped } = analyzer.analyzeAndFilter(
      listings,
      config.CANDIDATE_CAP,
    );
    note(
      `Dropped ${dropped.filters} on filters, ${dropped.below_target_cap} below candidate cap. ` +
        `${candidates.length} candidates.`,
    );

    // 2b. Real taxes/insurance/HOA + photo + garage for candidates only.
    scraper.applyOverrides(candidates);
    // Leave headroom against the 60s function ceiling for analysis + email + save.
    const enrichDeadline = Math.max(5000, 50000 - (Date.now() - startedAt));
    await scraper.enrichDetails(candidates, { deadlineMs: enrichDeadline });

    // 2c. Re-analyze on real numbers, apply the true 7% filter.
    for (const c of candidates) analyzer.analyzeListing(c);
    let deals = analyzer.sortDeals(
      candidates.filter((c) => (c.best_cap || 0) >= config.TARGET_CAP),
    );
    note(
      `${deals.length} clear the ${(config.TARGET_CAP * 100).toFixed(0)}% target on real numbers.`,
    );

    // 2d. Garage rules: drop no-garage single-family, flag the rest.
    const garageResult = analyzer.applyGarageRules(deals);
    deals = garageResult.kept;
    if (garageResult.excluded)
      note(`Excluded ${garageResult.excluded} single-family with no garage.`);
    note(`${deals.length} deals after garage rules.`);

    // 3. Diff against history (Supabase).
    const seen = await loadSeen();
    const firstRun = Object.keys(seen).length === 0;
    for (const d of deals) {
      const lid = scraper.listingId(d);
      const prev = seen[lid];
      if (!prev) {
        d.is_new = true;
        d.price_change = 0;
      } else {
        d.is_new = false;
        d.price_change = d.price - (prev.last_price ?? d.price);
      }
    }

    // 4. Decide what to show.
    let shown: Listing[];
    let mode: string;
    if (firstRun || showAll) {
      shown = deals;
      mode = firstRun ? "baseline (all qualifying deals)" : "all qualifying deals";
    } else {
      shown = deals.filter((d) => d.is_new || d.price_change);
      mode = "new + price-changed deals";
    }
    note(`Email mode: ${mode} — ${shown.length} to show.`);

    // 4b. No empty emails on a normal daily run; leave seen untouched so the
    //     accumulated diff carries to the next run. ?all / ?dry bypass this.
    if (shown.length === 0 && !showAll && !dryRun) {
      note("Nothing new or changed — no email sent.");
      return NextResponse.json({
        ok: true,
        emailed: false,
        reason: "no-changes",
        scanned: listings.length,
        qualified: deals.length,
        log,
        elapsedMs: Date.now() - startedAt,
      });
    }

    // 5. Build email.
    const report = {
      date_str: dateLong,
      deals: shown,
      stats: { scanned: listings.length, qualified: deals.length },
    };
    const html = emailer.buildHtml(report);
    let subject = `${config.SUBJECT_PREFIX} — ${dateShort}`;
    if (shown.length)
      subject += ` (${shown.length} deal${shown.length !== 1 ? "s" : ""})`;

    if (dryRun) {
      // Return the HTML preview without sending or saving.
      return new NextResponse(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const result = await emailer.sendEmail(html, subject);
    note(`Email sent to ${config.TO_EMAILS.length} recipients.`);

    // 6. Update history AFTER a successful send.
    const saved = await saveSeen(listings, seen, nowIso);
    note(`Saved ${saved} listings to deal_finder_seen.`);

    return NextResponse.json({
      ok: true,
      emailed: true,
      shown: shown.length,
      scanned: listings.length,
      qualified: deals.length,
      resend: result,
      log,
      elapsedMs: Date.now() - startedAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("deal-finder failed:", message);
    return NextResponse.json(
      { ok: false, error: message, log, elapsedMs: Date.now() - startedAt },
      { status: 500 },
    );
  }
}
