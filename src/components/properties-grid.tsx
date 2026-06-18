"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import {
  areas,
  sortByAvailability,
  type Property,
} from "@/lib/properties";

type Filter = "All homes" | "Available" | (typeof areas)[number];

const filters: Filter[] = ["All homes", "Available", ...areas];

export function PropertiesGrid({ properties }: { properties: Property[] }) {
  const [active, setActive] = useState<Filter>("All homes");

  const visible = useMemo(() => {
    const matched = properties.filter((p) => {
      if (active === "All homes") return true;
      if (active === "Available") return p.status !== "Leased";
      return p.area === active;
    });
    return sortByAvailability(matched);
  }, [properties, active]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "border-forest bg-forest text-paper"
                  : "border-cream-deep text-charcoal-soft hover:border-forest/40"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p className="text-charcoal-soft mt-8 text-sm">
        Showing{" "}
        <span className="text-forest font-medium">{visible.length}</span>{" "}
        {visible.length === 1 ? "home" : "homes"}
        {active !== "All homes" ? ` · ${active}` : ""}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-charcoal-soft mt-10 text-center">
          No homes match that filter right now.
        </p>
      )}
    </div>
  );
}
