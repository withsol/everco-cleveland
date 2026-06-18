import Link from "next/link";
import { CardCarousel } from "@/components/card-carousel";
import { type Property, propertyImages, statusStyles } from "@/lib/properties";

function statusLabel(property: Property): string {
  if (property.status === "Leased") return "Currently Leased";
  if (property.status === "Coming Soon") {
    return property.statusNote
      ? `Coming Soon — ${property.statusNote}`
      : "Coming Soon";
  }
  return "Available";
}

export function PropertyCard({ property }: { property: Property }) {
  const isLeased = property.status === "Leased";

  return (
    <article
      className={`group border-cream-deep bg-paper has-[a:focus-visible]:ring-copper relative overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(43,40,38,0.45)] has-[a:focus-visible]:ring-2 ${
        property.status === "Available"
          ? "ring-forest/30 shadow-[0_12px_30px_-22px_rgba(47,70,54,0.6)] ring-2"
          : ""
      }`}
    >
      <CardCarousel
        slug={property.slug}
        images={propertyImages(property)}
        alt={`${property.address}, ${property.city}`}
        isLeased={isLeased}
        statusLabel={statusLabel(property)}
        statusClass={statusStyles[property.status]}
        furnishedLabel={
          property.furnished
            ? `Furnished${property.minStay ? ` · ${property.minStay}` : ""}`
            : undefined
        }
      />

      <div className="p-6">
        <p className="eyebrow text-copper">{property.area}</p>
        <h3 className="text-forest mt-2 text-xl">
          <Link
            href={`/properties/${property.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {property.address}
          </Link>
        </h3>
        <p className="text-charcoal-soft mt-1 text-sm">
          {property.city} · {property.type}
          {property.built ? ` · Built ${property.built}` : ""}
        </p>

        {property.blurb && (
          <p className="text-charcoal-soft mt-3 text-sm leading-relaxed">
            {property.blurb}
          </p>
        )}

        {property.communityFeatures && property.communityFeatures.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {property.communityFeatures.map((feature) => (
              <li
                key={feature}
                className="border-cream-deep text-charcoal-soft rounded-full border px-3 py-1 text-xs"
              >
                {feature}
              </li>
            ))}
          </ul>
        )}

        <dl className="text-charcoal-soft border-cream-deep mt-5 flex items-center gap-5 border-t pt-5 text-sm">
          <div>
            <dt className="sr-only">Bedrooms</dt>
            <dd>
              <span className="text-forest font-medium">{property.beds}</span> bd
            </dd>
          </div>
          <span className="bg-cream-deep h-4 w-px" aria-hidden />
          <div>
            <dt className="sr-only">Bathrooms</dt>
            <dd>
              <span className="text-forest font-medium">{property.baths}</span> ba
            </dd>
          </div>
          {property.sqft && (
            <>
              <span className="bg-cream-deep h-4 w-px" aria-hidden />
              <div>
                <dt className="sr-only">Square feet</dt>
                <dd>
                  <span className="text-forest font-medium">
                    {property.sqft.toLocaleString()}
                  </span>{" "}
                  sqft
                </dd>
              </div>
            </>
          )}
          <div className="ml-auto text-right">
            {property.rent ? (
              <>
                <dt className="sr-only">Monthly rent</dt>
                <dd className="text-forest font-serif text-lg">
                  ${property.rent.toLocaleString()}
                  <span className="text-charcoal-soft text-xs font-sans">/mo</span>
                </dd>
              </>
            ) : (
              <>
                <dt className="sr-only">Status</dt>
                <dd className="text-charcoal-soft text-xs">{statusLabel(property)}</dd>
              </>
            )}
          </div>
        </dl>

        <span className="text-copper mt-5 inline-flex items-center gap-1 text-sm font-medium">
          View details
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
