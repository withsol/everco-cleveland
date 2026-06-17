import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The EverCo to schedule a tour or ask about a home. A real member of the family will respond within a business day.",
};

const details = [
  { label: "Email", value: "hello@theeverco.com", href: "mailto:hello@theeverco.com" },
  { label: "Leasing office", value: "(216) 555-0142", href: "tel:+12165550142" },
  { label: "Maintenance (24/7)", value: "(216) 555-0188", href: "tel:+12165550188" },
];

export default function ContactPage() {
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
              Tell us a little about what you&apos;re looking for and we&apos;ll
              be in touch to schedule a private tour — usually within a business
              day.
            </p>

            <dl className="mt-12 space-y-6">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="border-cream-deep border-t pt-6"
                >
                  <dt className="eyebrow text-copper">{item.label}</dt>
                  <dd className="mt-2">
                    <a
                      href={item.href}
                      className="text-forest hover:text-copper font-serif text-2xl transition-colors"
                    >
                      {item.value}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="border-cream-deep border-t pt-6">
                <dt className="eyebrow text-copper">Service area</dt>
                <dd className="text-charcoal mt-2 leading-relaxed">
                  Lakewood · Rocky River · Bay Village · Westlake · West Park ·
                  Detroit-Shoreway
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: form card */}
          <div className="border-cream-deep bg-paper rounded-3xl border p-7 shadow-[0_24px_60px_-40px_rgba(43,40,38,0.5)] sm:p-10">
            <h2 className="text-forest text-2xl">Send us a note</h2>
            <p className="text-charcoal-soft mt-2 text-sm">
              Fields marked with detail help us respond faster.
            </p>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
