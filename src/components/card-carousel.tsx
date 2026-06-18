"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const arrowBase =
  "bg-charcoal/40 text-paper hover:bg-charcoal/70 focus-visible:outline-paper absolute top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-lg opacity-0 backdrop-blur-sm transition focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 group-hover:opacity-100 max-md:opacity-100";

export function CardCarousel({
  slug,
  images,
  alt,
  isLeased,
  statusLabel,
  statusClass,
  furnishedLabel,
}: {
  slug: string;
  images: string[];
  alt: string;
  isLeased: boolean;
  statusLabel: string;
  statusClass: string;
  furnishedLabel?: string;
}) {
  const shown = images.slice(0, 3);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasMany = shown.length > 1;
  const current = shown[index] ?? shown[0];
  const showViewAll = index === shown.length - 1 && images.length > shown.length;

  const go = (delta: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + delta + shown.length) % shown.length);
  };

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) setIndex((i) => (i + (dx < 0 ? 1 : -1) + shown.length) % shown.length);
    touchStartX.current = null;
  }

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden"
      onTouchStart={hasMany ? onTouchStart : undefined}
      onTouchEnd={hasMany ? onTouchEnd : undefined}
    >
      <Image
        src={current}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
          isLeased ? "saturate-[0.85]" : ""
        }`}
      />
      {isLeased && <span className="absolute inset-0 bg-charcoal/10" aria-hidden />}

      <span
        className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${statusClass}`}
      >
        {statusLabel}
      </span>
      {furnishedLabel && (
        <span className="bg-paper/90 text-charcoal absolute bottom-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-medium tracking-wide">
          {furnishedLabel}
        </span>
      )}

      {hasMany && (
        <>
          <button
            type="button"
            onClick={(e) => go(-1, e)}
            aria-label="Previous photo"
            className={`${arrowBase} left-3`}
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={(e) => go(1, e)}
            aria-label="Next photo"
            className={`${arrowBase} right-3`}
          >
            <span aria-hidden>›</span>
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {shown.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-paper" : "bg-paper/50"
                }`}
                aria-hidden
              />
            ))}
          </div>
        </>
      )}

      {showViewAll && (
        <Link
          href={`/properties/${slug}`}
          className="bg-charcoal/55 text-paper hover:bg-charcoal/70 focus-visible:outline-paper absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          View all {images.length} photos
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
