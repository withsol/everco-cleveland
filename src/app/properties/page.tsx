import type { Metadata } from "next";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse available and upcoming rental homes from The Ever Company across Lakewood, Rocky River, Bay Village, and Cleveland's west side.",
};

const filters = ["All homes", "Available", "Coming Soon", "Lakewood", "Rocky River"];

export default function PropertiesPage() {
  const available = properties.filter((p) => p.status !== "Leased");
  const leased = properties.filter((p) => p.status === "Leased");

  return (
    <>
      <section className="bg-cream">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>The collection</Eyebrow>
            <h1 className="text-forest mt-6 text-5xl sm:text-6xl">
              Find your next home.
            </h1>
            <p className="text-charcoal-soft mt-6 max-w-xl text-lg leading-relaxed">
              Every home in our portfolio has been renovated by our family and
              maintained like it&apos;s our own. Browse what&apos;s open now, and
              ask us about homes coming to market soon.
            </p>
          </div>

          {/* Filter chips — placeholder, non-functional for now */}
          <div className="mt-10 flex flex-wrap gap-3">
            {filters.map((f, i) => (
              <span
                key={f}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  i === 0
                    ? "border-forest bg-forest text-paper"
                    : "border-cream-deep text-charcoal-soft hover:border-forest/40"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <p className="text-charcoal-soft text-sm">
            Showing{" "}
            <span className="text-forest font-medium">{available.length}</span>{" "}
            available &amp; upcoming homes
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {available.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </Container>
      </section>

      {leased.length > 0 && (
        <section className="bg-cream py-16 sm:py-20">
          <Container>
            <Eyebrow>Recently leased</Eyebrow>
            <h2 className="text-forest mt-4 text-3xl">
              A sense of what we restore.
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {leased.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-forest text-cream py-20">
        <Container className="text-center">
          <h2 className="text-cream text-3xl sm:text-4xl">
            Don&apos;t see the right fit?
          </h2>
          <p className="text-cream/75 mx-auto mt-4 max-w-xl text-lg">
            We bring two to three new homes to market most months. Tell us what
            you&apos;re looking for and we&apos;ll reach out first.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink
              href="/contact"
              className="bg-copper hover:bg-copper-light"
            >
              Join the interest list
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
