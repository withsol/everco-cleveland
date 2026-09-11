import { Container, Eyebrow, Section, ButtonLink } from "@/components/ui";
import { PropertyCard } from "@/components/property-card";
import { HomeHero } from "@/components/home-hero";
import { properties } from "@/lib/properties";
import { averageRating, featuredTestimonials } from "@/lib/testimonials";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const stats = [
  {
    title: "5th Gen Clevelanders",
    detail:
      "Both of our families have been in the Cleveland area for five generations. We don't just invest here — we live here.",
    icon: (
      <svg {...iconProps}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M12 18a3.5 3.5 0 0 1-3-5 2 2 0 0 1 3 0 2 2 0 0 1 3 0 3.5 3.5 0 0 1-3 5Z" />
      </svg>
    ),
  },
  {
    title: "12 Homes",
    detail:
      "Single-family homes and one Rocky River duplex across Rocky River, Bay Village, Avon Lake, and Strongsville.",
    icon: (
      <svg {...iconProps}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </svg>
    ),
  },
  {
    title: `${averageRating} ★ Rating`,
    detail:
      "Averaged across resident exit surveys and our public reviews on Furnished Finder and Airbnb.",
    icon: (
      <svg {...iconProps} fill="currentColor">
        <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.8l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5Z" />
      </svg>
    ),
  },
];

const amenities = [
  {
    label: "Renovated before you move in",
    note: "Updated kitchens, baths, and systems — not just fresh paint",
  },
  {
    label: "Furnished options available",
    note: "Our Rocky River duplex is furnished, and we'll furnish any home on request",
  },
  {
    label: "You'll be speaking with us",
    note: "Kelsey and Todd live locally — no call center, no leasing agent",
  },
  {
    label: "Maintenance handled quickly",
    note: "Submit a request in your resident portal — usually answered same day",
  },
];

export default function HomePage() {
  const featured = properties.filter((p) => p.status !== "Leased").slice(0, 3);

  return (
    <>
      {/* Hero — rotating full-bleed property carousel */}
      <HomeHero />

      {/* Stats strip */}
      <section className="bg-cream border-cream-deep border-b">
        <Container className="py-14">
          <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.title}>
                <span
                  className="text-copper bg-forest/10 inline-flex h-11 w-11 items-center justify-center rounded-full"
                  aria-hidden
                >
                  {stat.icon}
                </span>
                <dt className="text-forest mt-4 font-serif text-2xl leading-tight">
                  {stat.title}
                </dt>
                <dd className="text-charcoal-soft mt-2 text-sm leading-relaxed">
                  {stat.detail}
                </dd>
              </div>
            ))}
          </dl>
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
              <Eyebrow className="text-copper-light">The Ever Company standard</Eyebrow>
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
              Homes people are glad they found.
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {featuredTestimonials.map((t) => (
              <figure
                key={t.quote}
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
          <div className="mt-10 text-center">
            <ButtonLink href="/about#reviews" variant="ghost">
              Read more resident reviews →
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Furnished & corporate housing */}
      <Section className="bg-paper">
        <Container>
          <div className="border-cream-deep bg-cream grid gap-10 rounded-3xl border p-9 sm:p-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Furnished &amp; corporate housing</Eyebrow>
              <h2 className="text-forest mt-5 text-3xl sm:text-4xl">
                Need a furnished home in Cleveland?
              </h2>
              <p className="text-charcoal-soft mt-5 text-lg leading-relaxed">
                Our Rocky River duplex is fully furnished and set up for
                month-to-month stays — a favorite with travelling professionals,
                families between houses, and anyone in town for a renovation.
                We&apos;re happy to furnish any home in our portfolio on request.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <ul className="space-y-4 text-base">
                {[
                  "Month-to-month and short-term stays welcome",
                  "Relocations, travel nurses, and insurance placements",
                  "Corporate accounts and multi-month bookings",
                  "Any home in our portfolio can be furnished on request",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-copper mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                    <span className="text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/contact">
                  Ask about furnished housing
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-paper pt-0">
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
                tour. And if nothing is open right now — reach out anyway.
                We&apos;re always purchasing and renovating, and we&apos;ll tell
                you what&apos;s coming before it&apos;s listed.
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
