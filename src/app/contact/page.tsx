import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Ever Company about a rental home, furnished housing, or corporate stays in Rocky River, Bay Village, Avon Lake, and Strongsville, Ohio. Kelsey or Todd will reply personally.",
};

const topics = [
  {
    title: "Renting a home",
    body: "Ask about a specific house, book a tour, or tell us what you're looking for.",
  },
  {
    title: "Furnished & corporate stays",
    body: "Month-to-month furnished housing, relocations, and business bookings.",
  },
  {
    title: "Renting from us later",
    body: "We're always purchasing and renovating. We'll tell you what's coming before it's listed.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string }>;
}) {
  const { property } = await searchParams;
  return (
    <section className="bg-cream">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left: intro + details */}
          <div>
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="text-forest mt-6 text-5xl leading-tight sm:text-6xl">
              Let&apos;s find your
              <br />
              place.
            </h1>
            <p className="text-charcoal-soft mt-6 max-w-md text-lg leading-relaxed">
              Tell us a little about what you&apos;re looking for. We&apos;re
              Kelsey and Todd — we live locally and we read our own email, so
              you&apos;ll be speaking with us, usually within a business day.
            </p>

            <dl className="mt-12 space-y-6">
              <div className="border-cream-deep border-t pt-6">
                <dt className="eyebrow text-copper">Email</dt>
                <dd className="mt-2">
                  <a
                    href="mailto:hello@theevercocleveland.com"
                    className="text-forest hover:text-copper font-serif text-2xl break-words transition-colors"
                  >
                    hello@theevercocleveland.com
                  </a>
                </dd>
              </div>
              <div className="border-cream-deep border-t pt-6">
                <dt className="eyebrow text-copper">Where we own homes</dt>
                <dd className="text-charcoal mt-2 leading-relaxed">
                  Rocky River · Bay Village · Avon Lake · Strongsville
                  <span className="text-charcoal-soft mt-1 block text-sm">
                    Expanding into Westlake
                  </span>
                </dd>
              </div>
              <div className="border-cream-deep border-t pt-6">
                <dt className="eyebrow text-copper">What we can help with</dt>
                <dd className="mt-4 space-y-4">
                  {topics.map((topic) => (
                    <div key={topic.title}>
                      <p className="text-forest font-medium">{topic.title}</p>
                      <p className="text-charcoal-soft mt-1 text-sm leading-relaxed">
                        {topic.body}
                      </p>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: form card */}
          <div className="border-cream-deep bg-paper rounded-3xl border p-7 shadow-[0_24px_60px_-40px_rgba(43,40,38,0.5)] sm:p-10">
            <h2 className="text-forest text-2xl">Send us a note</h2>
            <p className="text-charcoal-soft mt-2 text-sm">
              The more detail you give us, the faster we can help.
            </p>
            <div className="mt-8">
              <InquiryForm defaultProperty={property} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
