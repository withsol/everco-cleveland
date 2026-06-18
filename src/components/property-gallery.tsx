"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function PropertyGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const current = images[active] ?? images[0];
  const hasMany = images.length > 1;

  const go = (delta: number) =>
    setActive((i) => (i + delta + images.length) % images.length);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <div>
      <div
        className="border-cream-deep group relative aspect-[16/10] overflow-hidden rounded-3xl border"
        onTouchStart={hasMany ? onTouchStart : undefined}
        onTouchEnd={hasMany ? onTouchEnd : undefined}
      >
        <Image
          src={current}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="bg-charcoal/40 text-paper hover:bg-charcoal/70 focus-visible:outline-paper absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-xl backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden>‹</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="bg-charcoal/40 text-paper hover:bg-charcoal/70 focus-visible:outline-paper absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-xl backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden>›</span>
            </button>
            <span className="bg-charcoal/70 text-paper absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasMany && (
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
