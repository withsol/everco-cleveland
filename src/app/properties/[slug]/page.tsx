import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink } from "@/components/ui";
import { PropertyGallery } from "@/components/property-gallery";
import {
  getProperty,
  properties,
  propertyImages,
  statusStyles,
} from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Property not found" };

  return {
    title: `${property.address} — ${property.city.split(",")[0]}`,
    description:
      property.blurb ??
      `${property.type} in ${property.area} — ${property.beds} bd, ${property.baths} ba${
        property.sqft ? `, ${property.sqft.toLocaleString()} sqft` : ""
      }.`,
    openGraph: { images: [property.photo] },
  };
}

function statusLabel(property: NonNullable<ReturnType<typeof getProperty>>) {
  if (property.status === "Leased") return "Currently Leased";
  if (property.status === "Coming Soon") {
    return property.statusNote
      ? `Coming Soon — ${property.statusNote}`
      : "Coming Soon";
  }
  return "Available";
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const images = propertyImages(property);

  const facts: { label: string; value: string }[] = [
    { label: "Bedrooms", value: `${property.beds}` },
    { label: "Bathrooms", value: `${property.baths}` },
    ...(property.sqft
      ? [{ label: "Square feet", value: property.sqft.toLocaleString() }]
      : []),
    { label: "Type", value: property.type },
    ...(property.built ? [{ label: "Year built", value: `${property.built}` }] : []),
    { label: "Area", value: property.area },
  ];

  return (
    <>
      <section className="bg-cream">
        <Container className="py-10 sm:py-14">
          <Link
            href="/properties"
            className="text-charcoal-soft hover:text-forest inline-flex items-center gap-2 text-sm transition-colors"
          >
            <span aria-hidden>←</span> Back to all homes
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${statusStyles[property.status]}`}
            >
              {statusLabel(property)}
            </span>
            {property.furnished && (
              <span className="border-copper/40 text-copper rounded-full border px-3 py-1 text-xs font-medium tracking-wide">
                Furnished{property.minStay ? ` · ${property.minStay}` : ""}
              </span>
            )}
          </div>

          <h1 className="text-forest mt-4 text-4xl sm:text-5xl">
            {property.address}
          </h1>
          <p className="text-charcoal-soft mt-2 text-lg">
            {property.city} · {property.area}
          </p>
        </Container>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            {/* Left: gallery + description */}
            <div>
              <PropertyGallery
                images={images}
                alt={`${property.address}, ${property.city}`}
              />

              {property.blurb && (
                <div className="mt-10">
                  <h2 className="text-forest text-2xl">About this home</h2>
                  <p className="text-charcoal-soft mt-4 leading-relaxed">
                    {property.blurb}
                  </p>
                </div>
              )}

              {property.communityFeatures &&
                property.communityFeatures.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-forest text-2xl">Community features</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {property.communityFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="border-cream-deep text-charcoal-soft rounded-full border px-3 py-1 text-sm"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Right: facts + CTA */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-cream-deep bg-cream rounded-3xl border p-7 sm:p-8">
                {property.rent && (
                  <p className="text-forest font-serif text-3xl">
                    ${property.rent.toLocaleString()}
                    <span className="text-charcoal-soft font-sans text-base">
                      /mo
                    </span>
                  </p>
                )}

                <dl className="mt-6 divide-y divide-cream-deep">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-center justify-between py-3"
                    >
                      <dt className="text-charcoal-soft text-sm">{fact.label}</dt>
                      <dd className="text-charcoal font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8">
                  <ButtonLink
                    href={`/contact?property=${encodeURIComponent(property.address)}`}
                    className="w-full"
                  >
                    {property.status === "Available"
                      ? "Inquire about this home"
                      : "Ask about availability"}
                  </ButtonLink>
                </div>
                <p className="text-charcoal-soft/70 mt-3 text-center text-xs">
                  A member of the family will respond within a business day.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
