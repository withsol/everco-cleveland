import { Container, Eyebrow, Section, ButtonLink } from "@/components/ui";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/properties";

const amenities = [
  { label: "Studs-out renovations", note: "Modern systems, original soul" },
  { label: "Pet-friendly homes", note: "Most of our houses welcome dogs" },
  { label: "Online rent & requests", note: "A portal that actually works" },
  { label: "24/7 maintenance line", note: "A real person, same day" },
];

const testimonials = [
  {
    quote:
      "We rented from a faceless management company for years. The EverCo felt like the opposite — they knew our names, fixed things before we even noticed, and the house was genuinely beautiful.",
    name: "Maren & Tom",
    detail: "Tenants in Lakewood, 3 years",
  },
  {
    quote:
      "Every detail was considered, from the kitchen to the way they handled our move-in. It's clear this is a family that cares about the homes, not just the rent check.",
    name: "Priya R.",
    detail: "Tenant in Rocky River",
  },
];

export default function HomePage() {
  const featured = properties.filter((p) => p.status !== "Leased").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="from-cream via-paper to-cream-deep absolute inset-0 bg-gradient-to-b" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(176,133,66,0.18), transparent 42%), radial-gradient(circle at 82% 78%, rgba(47,70,54,0.16), transparent 45%)",
          }}
          aria-hidden
        />
        <Container className="relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <Eyebrow>West Side Cleveland · Est. 1986</Eyebrow>
            <h1 className="text-forest mt-7 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Homes worth
              <br />
              <span className="text-copper italic">putting down roots</span> in.
            </h1>
            <p className="text-charcoal-soft mt-8 max-w-xl text-lg leading-relaxed">
              The EverCo is a family-run collection of beautifully renovated
              rental homes across Cleveland&apos;s western suburbs. Character-rich
              houses, modern comforts, and a landlord who actually answers the
              phone.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/properties">Browse available homes</ButtonLink>
              <ButtonLink href="/about" variant="outline">
                Meet the family
              </ButtonLink>
            </div>

            <dl className="border-cream-deep mt-16 grid max-w-lg grid-cols-3 gap-8 border-t pt-8">
              {[
                { figure: "38", label: "Years on the west side" },
                { figure: "60+", label: "Homes renovated" },
                { figure: "4.9", label: "Average resident rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-forest font-serif text-4xl">
                    {stat.figure}
                  </dt>
                  <dd className="text-charcoal-soft mt-2 text-sm leading-snug">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Featured properties */}
      <Section className="bg-paper">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Eyebrow>Currently leasing</Eyebrow>
              <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
                Featured homes
              </h2>
              <p className="text-charcoal-soft mt-4 text-lg">
                A few of the houses ready for their next residents this season.
              </p>
            </div>
            <ButtonLink href="/properties" variant="ghost">
              View all properties →
            </ButtonLink>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Amenities strip */}
      <section className="bg-forest text-cream">
        <Container className="py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <Eyebrow className="text-copper-light">The EverCo standard</Eyebrow>
              <h2 className="text-cream mt-5 text-4xl">
                Renting, the way it should feel.
              </h2>
            </div>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {amenities.map((item, i) => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-copper-light font-serif text-2xl leading-none">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-cream text-lg font-medium">
                      {item.label}
                    </p>
                    <p className="text-cream/70 mt-1 text-sm">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <Section className="bg-cream">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">From our residents</Eyebrow>
            <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
              People stay for years.
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="border-cream-deep bg-paper rounded-2xl border p-8 sm:p-10"
              >
                <span className="text-copper font-serif text-5xl leading-none">
                  &ldquo;
                </span>
                <blockquote className="text-charcoal -mt-4 text-lg leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="text-charcoal-soft mt-6 text-sm">
                  <span className="text-forest font-medium">{t.name}</span> ·{" "}
                  {t.detail}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-paper">
        <Container>
          <div className="bg-forest-deep relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, rgba(201,162,75,0.3), transparent 50%)",
              }}
              aria-hidden
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-cream text-4xl sm:text-5xl">
                Found one you love?
              </h2>
              <p className="text-cream/75 mx-auto mt-5 max-w-lg text-lg">
                Tell us a little about yourself and we&apos;ll set up a private
                tour — usually within a couple of days.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <ButtonLink
                  href="/contact"
                  className="bg-copper hover:bg-copper-light"
                >
                  Schedule a tour
                </ButtonLink>
                <ButtonLink
                  href="/properties"
                  variant="outline"
                  className="border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-forest"
                >
                  See all homes
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
