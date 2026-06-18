"use client";

import Image from "next/image";
import { useState } from "react";

export function PropertyGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="border-cream-deep relative aspect-[16/10] overflow-hidden rounded-3xl border">
        <Image
          src={current}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <span className="bg-charcoal/70 text-paper absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide">
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              aria-pressed={i === active}
              className={`focus-visible:outline-copper relative aspect-[4/3] overflow-hidden rounded-xl border transition ${
                i === active
                  ? "border-forest ring-forest/30 ring-2"
                  : "border-cream-deep opacity-80 hover:opacity-100"
              } focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
