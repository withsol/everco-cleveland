"use client";

import { useState } from "react";
import { properties } from "@/lib/properties";

const inputClass =
  "w-full rounded-xl border border-cream-deep bg-paper px-4 py-3 text-charcoal placeholder:text-charcoal-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition";

const INBOX = "hello@theevercocleveland.com";

type Status = "idle" | "pending" | "sent" | "error";

export function InquiryForm({ defaultProperty }: { defaultProperty?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  // When the form was shown — the API drops submissions made implausibly fast.
  const [startedAt] = useState(() => Date.now());
  const knownProperty = properties.some((p) => p.address === defaultProperty);
  const submitted = status === "sent";
  const pending = status === "pending";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setStatus("pending");
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt }),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (res.ok && json?.ok) {
        setStatus("sent");
        return;
      }
      // 422 carries a field-level message the person can fix; anything else
      // is on our side.
      setError(res.status === 422 && json?.error ? json.error : null);
      setStatus("error");
    } catch {
      setError(null);
      setStatus("error");
    }
  }

  if (submitted) {
    return (
      <div className="border-forest/20 bg-forest/5 rounded-2xl border p-10 text-center">
        <span className="text-copper font-serif text-4xl">✦</span>
        <h3 className="text-forest mt-4 text-2xl">Thank you — we&apos;ve got it.</h3>
        <p className="text-charcoal-soft mx-auto mt-3 max-w-sm">
          Kelsey or Todd will be in touch, usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-copper mt-6 text-sm underline-offset-4 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-charcoal mb-2 block text-sm font-medium"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-charcoal mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="text-charcoal mb-2 block text-sm font-medium"
          >
            Phone <span className="text-charcoal-soft/60">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Best number to reach you"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="property"
            className="text-charcoal mb-2 block text-sm font-medium"
          >
            Home of interest
          </label>
          <select
            id="property"
            name="property"
            className={inputClass}
            defaultValue={knownProperty ? defaultProperty : ""}
          >
            <option value="" disabled>
              Select a home…
            </option>
            <option value="furnished">Furnished / corporate housing</option>
            <option value="future">A future home — keep me posted</option>
            {properties.map((p) => (
              <option key={p.slug} value={p.address}>
                {p.address} — {p.city.split(",")[0]}
              </option>
            ))}
            <option value="general">Not sure yet / general inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-charcoal mb-2 block text-sm font-medium"
        >
          What are you looking for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your timeline, who's moving in, pets, whether you need it furnished — anything that helps us help you…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error ? (
            error
          ) : (
            <>
              Sorry — your message didn&apos;t go through. Please email us
              directly at{" "}
              <a href={`mailto:${INBOX}`} className="font-medium underline">
                {INBOX}
              </a>{" "}
              and we&apos;ll get right back to you.
            </>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="bg-forest text-paper hover:bg-forest-deep w-full rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Sending…" : "Send inquiry"}
      </button>
      <p className="text-charcoal-soft/70 text-xs">
        We&apos;ll only use your details to respond to this inquiry. No spam,
        ever.
      </p>
    </form>
  );
}
