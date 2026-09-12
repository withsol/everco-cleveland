"use client";

import Image from "next/image";
import { isVideo, type PropertyMedia } from "@/lib/properties";

/**
 * Renders one gallery item, picking a video player or an image by file
 * extension. Both fill their container, so callers control the frame.
 */
export function MediaFrame({
  item,
  alt,
  sizes,
  className = "",
  /** object-cover crops to the frame; object-contain shows the whole thing. */
  fit = "cover",
  /** Only the inline gallery shows controls; the lightbox passes its own. */
  controls = true,
  preload = false,
  style,
}: {
  item: PropertyMedia;
  alt: string;
  sizes: string;
  className?: string;
  fit?: "cover" | "contain";
  controls?: boolean;
  preload?: boolean;
  style?: React.CSSProperties;
}) {
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  if (isVideo(item.src)) {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls={controls}
        playsInline
        // Fetch enough to paint a first frame without pulling the whole file.
        preload="metadata"
        aria-label={item.caption ? `${alt} — ${item.caption}` : alt}
        className={`absolute inset-0 h-full w-full ${objectFit} ${className}`}
        style={style}
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={alt}
      fill
      preload={preload}
      sizes={sizes}
      className={`${objectFit} ${className}`}
      style={style}
    />
  );
}

/** Play badge overlaid on a video's thumbnail. */
export function PlayBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`bg-charcoal/55 text-paper pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm ${
        small ? "h-7 w-7" : "h-14 w-14"
      }`}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={small ? "h-3 w-3" : "h-6 w-6"}
        style={{ marginLeft: small ? 1 : 2 }}
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}
