"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PhotoLightbox } from "@/components/photo-lightbox";
import { MediaFrame, PlayBadge } from "@/components/property-media";
import { isVideo, type PropertyMedia } from "@/lib/properties";

export function PropertyGallery({
  media,
  alt,
}: {
  media: PropertyMedia[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  // Index being viewed fullscreen, or null when the lightbox is closed.
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const current = media[active] ?? media[0];
  const hasMany = media.length > 1;

  const step = (delta: number) =>
    (active + delta + media.length) % media.length;

  /** Open fullscreen, and keep the inline gallery on whatever was last viewed. */
  function openLightbox(index: number) {
    setActive(index);
    setLightboxIndex(index);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) setActive(step(dx < 0 ? 1 : -1));
    touchStartX.current = null;
  }

  return (
    <div>
      <div
        className="border-cream-deep group relative aspect-[16/10] overflow-hidden rounded-3xl border"
        onTouchStart={hasMany ? onTouchStart : undefined}
        onTouchEnd={hasMany ? onTouchEnd : undefined}
      >
        {/* A video plays in place; a photo opens full screen, since the inline
            frame crops it to 16:10. */}
        {isVideo(current.src) ? (
          <MediaFrame
            item={current}
            alt={alt}
            sizes="(min-width: 1024px) 60vw, 100vw"
            fit="contain"
            className="bg-charcoal"
          />
        ) : (
          <button
            type="button"
            onClick={() => openLightbox(active)}
            aria-label="View photo full screen"
            className="focus-visible:outline-paper absolute inset-0 h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4"
          >
            <MediaFrame
              item={current}
              alt={alt}
              sizes="(min-width: 1024px) 60vw, 100vw"
              preload
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
        )}

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => openLightbox(step(-1))}
              aria-label="Previous photo, full screen"
              className="bg-charcoal/40 text-paper hover:bg-charcoal/70 focus-visible:outline-paper absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-xl backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden>‹</span>
            </button>
            <button
              type="button"
              onClick={() => openLightbox(step(1))}
              aria-label="Next photo, full screen"
              className="bg-charcoal/40 text-paper hover:bg-charcoal/70 focus-visible:outline-paper absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-xl backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden>›</span>
            </button>
            <span className="bg-charcoal/70 text-paper pointer-events-none absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide">
              {active + 1} / {media.length}
            </span>
          </>
        )}
      </div>

      {hasMany && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              onDoubleClick={() => openLightbox(i)}
              aria-label={`View photo ${i + 1}`}
              aria-pressed={i === active}
              className={`focus-visible:outline-copper relative aspect-[4/3] overflow-hidden rounded-xl border transition ${
                i === active
                  ? "border-forest ring-forest/30 ring-2"
                  : "border-cream-deep opacity-80 hover:opacity-100"
              } focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              {isVideo(item.src) ? (
                <>
                  {item.poster ? (
                    <Image
                      src={item.poster}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={item.src}
                      preload="metadata"
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <PlayBadge small />
                </>
              ) : (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      <PhotoLightbox
        media={media}
        index={lightboxIndex}
        alt={alt}
        onIndexChange={(next) => {
          setActive(next);
          setLightboxIndex(next);
        }}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
