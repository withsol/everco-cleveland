import { type Property, statusStyles } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group border-cream-deep bg-paper overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(43,40,38,0.45)]">
      {/* Placeholder image area — a warm gradient stands in for photography. */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${property.tone} 0%, ${property.tone}cc 55%, #2b2826 140%)`,
        }}
      >
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${statusStyles[property.status]}`}
        >
          {property.status}
        </span>
        <span className="font-serif text-paper/90 absolute bottom-4 right-5 text-5xl opacity-30 transition-opacity duration-300 group-hover:opacity-50">
          {property.beds}BR
        </span>
      </div>

      <div className="p-6">
        <p className="eyebrow text-copper">{property.neighborhood}</p>
        <h3 className="text-forest mt-2 text-xl">{property.name}</h3>
        <p className="text-charcoal-soft mt-3 text-sm leading-relaxed">
          {property.blurb}
        </p>

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
          <div className="ml-auto text-right">
            <dt className="sr-only">Monthly rent</dt>
            <dd className="text-forest font-serif text-lg">
              ${property.rent.toLocaleString()}
              <span className="text-charcoal-soft text-xs font-sans">/mo</span>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
