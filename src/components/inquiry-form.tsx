"use client";

import { useState } from "react";
import { properties } from "@/lib/properties";

const inputClass =
  "w-full rounded-xl border border-cream-deep bg-paper px-4 py-3 text-charcoal placeholder:text-charcoal-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition";

export function InquiryForm({ defaultProperty }: { defaultProperty?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const knownProperty = properties.some((p) => p.address === defaultProperty);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Placeholder: wire this up to an email service or API route later.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border-forest/20 bg-forest/5 rounded-2xl border p-10 text-center">
        <span className="text-copper font-serif text-4xl">✦</span>
        <h3 className="text-forest mt-4 text-2xl">Thank you — we&apos;ve got it.</h3>
        <p className="text-charcoal-soft mx-auto mt-3 max-w-sm">
          A member of the family will be in touch within one business day to set
          up your tour.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-copper mt-6 text-sm underline-offset-4 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="(216) 555-0142"
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
          placeholder="Tell us about your timeline, who's moving in, pets, anything that helps us help you…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="bg-forest text-paper hover:bg-forest-deep w-full rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors sm:w-auto"
      >
        Send inquiry
      </button>
      <p className="text-charcoal-soft/70 text-xs">
        We&apos;ll only use your details to respond to this inquiry. No spam,
        ever.
      </p>
    </form>
  );
}
