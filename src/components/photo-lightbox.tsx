"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { PropertyPhoto } from "@/lib/properties";

const navButton =
  "bg-paper/20 text-paper hover:bg-paper/35 border-paper/40 focus-visible:outline-paper pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border text-2xl shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-0";

export function PhotoLightbox({
  photos,
  index,
  alt,
  onIndexChange,
  onClose,
}: {
  photos: PropertyPhoto[];
  /** Index of the photo to show, or null when the lightbox is closed. */
  index: number | null;
  alt: string;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  const hasMany = photos.length > 1;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  // Drive the native dialog so we inherit its focus trap and top-layer stacking.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The page behind stays visible through the frosted backdrop, so stop it
  // scrolling while the lightbox is up.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Escape") {
        // A modal dialog closes itself on Escape, but the close watcher does
        // not fire in every engine, so close explicitly. Closing twice is a
        // no-op: the effect below only calls close() on a dialog still open.
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, go, onClose]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  const photo = index === null ? undefined : photos[index];

  /** Current photo plus its neighbours, deduped for short galleries. */
  const neighbourhood = useMemo(() => {
    if (index === null) return [];
    const seen = new Set<number>();
    for (const delta of [0, 1, -1]) {
      seen.add((index + delta + photos.length) % photos.length);
    }
    return [...seen];
  }, [index, photos.length]);

  return (
    <dialog
      ref={dialogRef}
      // Escape fires `cancel`; `close` covers that and dialog.close() alike.
      onClose={onClose}
      // A click landing on the dialog itself is a click on the backdrop —
      // anything over the photo or controls is caught by the inner wrapper.
      onClick={onClose}
      aria-label={`${alt} — photo viewer`}
      className="lightbox m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-inherit"
    >
      {photo && (
        <>
          {/* The scrim is a real element rather than ::backdrop styling, which
              several engines refuse to blur. Clicks on it bubble to the dialog
              and close the viewer. */}
          <div
            className="lightbox-scrim absolute inset-0 bg-[rgba(32,50,42,0.85)] backdrop-blur-[14px] backdrop-saturate-125"
            aria-hidden
          />

          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:gap-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={hasMany ? onTouchStart : undefined}
            onTouchEnd={hasMany ? onTouchEnd : undefined}
          >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="bg-paper/20 text-paper hover:bg-paper/35 border-paper/40 focus-visible:outline-paper absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border text-xl shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 sm:right-8 sm:top-8"
          >
            <span aria-hidden>✕</span>
          </button>

          {/* Photo — object-contain so the whole frame is visible, never cropped */}
          <figure className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
            <div className="relative min-h-0 w-full flex-1">
              {/* The current photo plus its two neighbours stay mounted, so
                  stepping through crossfades between already-decoded images
                  instead of blanking the frame while the next one loads. */}
              {neighbourhood.map((i) => (
                <Image
                  key={photos[i].src}
                  src={photos[i].src}
                  alt={
                    i === index
                      ? photos[i].caption
                        ? `${alt} — ${photos[i].caption}`
                        : alt
                      : ""
                  }
                  aria-hidden={i !== index}
                  fill
                  sizes="100vw"
                  className={`object-contain drop-shadow-[0_18px_48px_rgba(0,0,0,0.55)] transition-opacity duration-300 ease-out ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Caption area — holds the counter, plus a caption when one is set.
                Omitted entirely for a lone uncaptioned photo, so no empty
                panel floats under the image. */}
            {(photo.caption || hasMany) && (
              <figcaption className="border-paper/20 mt-4 max-w-2xl rounded-2xl border bg-black/35 px-5 py-3 text-center backdrop-blur-md">
                {photo.caption && (
                  <p className="text-cream leading-relaxed">{photo.caption}</p>
                )}
                {hasMany && (
                  <p
                    className={`text-cream/70 text-xs tracking-wide ${
                      photo.caption ? "mt-1.5" : ""
                    }`}
                  >
                    {index! + 1} of {photos.length}
                  </p>
                )}
              </figcaption>
            )}
          </figure>

          {/* Prev / next */}
          {hasMany && (
            <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-6">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className={navButton}
              >
                <span aria-hidden>‹</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className={navButton}
              >
                <span aria-hidden>›</span>
              </button>
            </div>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
