import type { Metadata } from "next";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tenant Portal",
  description:
    "Current EverCo residents can pay rent, submit maintenance requests, and access lease documents through the tenant portal.",
};

const portalActions = [
  {
    title: "Pay rent",
    body: "Set up autopay or pay one-off — online, no checks, no stamps.",
  },
  {
    title: "Request maintenance",
    body: "Submit a request with photos and track it through to done.",
  },
  {
    title: "Lease & documents",
    body: "Find your lease, receipts, and renewal offers in one place.",
  },
];

export default function TenantPage() {
  return (
    <>
      <section className="bg-forest text-cream">
        <Container className="py-24 sm:py-32">
          <div className="max-w-2xl">
            <Eyebrow className="text-copper-light">Resident portal</Eyebrow>
            <h1 className="text-cream mt-6 text-5xl leading-tight sm:text-6xl">
              Welcome home,
              <br />
              residents.
            </h1>
            <p className="text-cream/75 mt-7 max-w-xl text-lg leading-relaxed">
              Pay rent, request maintenance, and manage your lease from one
              simple place. Our full resident portal is launching soon — in the
              meantime, reach the office any time and we&apos;ll take care of you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {/* Placeholder link — points to the external portal once live. */}
              <ButtonLink
                href="/contact"
                className="bg-copper hover:bg-copper-light"
              >
                Log in to portal →
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline"
                className="border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-forest"
              >
                Need access?
              </ButtonLink>
            </div>
            <p className="text-cream/50 mt-6 text-sm">
              The online portal is coming soon. This link is a placeholder.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {portalActions.map((action) => (
              <div
                key={action.title}
                className="border-cream-deep bg-paper rounded-2xl border p-8"
              >
                <h2 className="text-forest text-xl">{action.title}</h2>
                <p className="text-charcoal-soft mt-3 leading-relaxed">
                  {action.body}
                </p>
              </div>
            ))}
          </div>

          <div className="border-cream-deep mt-16 flex flex-col items-start gap-6 border-t pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-forest text-2xl">Have an emergency?</h2>
              <p className="text-charcoal-soft mt-2">
                Our maintenance line is staffed 24/7 for urgent issues.
              </p>
            </div>
            <a
              href="tel:+12165550188"
              className="text-forest hover:text-copper font-serif text-3xl transition-colors"
            >
              (216) 555-0188
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
