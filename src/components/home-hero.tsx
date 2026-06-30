"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";

type Slide = { src: string; alt: string };

/** Hand-picked hero photos — alternating exteriors and warm interiors. */
const SLIDES: Slide[] = [
  {
    src: "/properties/17016-lanier-ave/01.jpg",
    alt: "Freshly renovated white ranch home on Lanier Ave in Strongsville",
  },
  {
    src: "/properties/19933-westway-dr/01.jpg",
    alt: "Sunlit, fully furnished living room at Westway Dr in Rocky River",
  },
  {
    src: "/properties/514-cahoon-rd/01.jpg",
    alt: "Charming green cape cod with a red door on Cahoon Rd in Bay Village",
  },
  {
    src: "/properties/19931-westway-dr/03.jpg",
    alt: "Beautifully staged living room at Westway Dr in Rocky River",
  },
  {
    src: "/properties/165-belmar-blvd/01.jpg",
    alt: "Classic colonial exterior on Belmar Blvd in Avon Lake",
  },
  {
    src: "/properties/19933-westway-dr/02.jpg",
    alt: "Warm, comfortable furnished living space at Westway Dr in Rocky River",
  },
  {
    src: "/properties/201-yoder-blvd/01.jpg",
    alt: "Single-story ranch home with a deep lawn on Yoder Blvd in Avon Lake",
  },
  {
    src: "/properties/165-belmar-blvd/03.jpg",
    alt: "Bright living room with a stone fireplace and bay window on Belmar Blvd",
  },
];

const ROTATE_MS = 2000;

export function HomeHero() {
  const [index, setIndex] = useState(0);

  // Auto-crossfade. Honors reduced-motion by holding on the first photo.
  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full" aria-label="Featured homes">
      <div className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
        {/* Crossfading photos */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={i === 0 ? slide.alt : ""}
              fill
              preload={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Gradient overlays keep cream text legible over any photo */}
        <div
          className="from-charcoal/85 via-charcoal/35 to-charcoal/10 absolute inset-0 bg-gradient-to-t"
          aria-hidden
        />
        <div
          className="from-charcoal/60 absolute inset-0 bg-gradient-to-r to-transparent"
          aria-hidden
        />

        {/* Overlaid copy */}
        <Container className="relative flex h-full flex-col justify-end pb-24 sm:justify-center sm:pb-0">
          <div className="max-w-2xl">
            <Eyebrow className="text-copper-light">
              West Side Cleveland · Est. 1986
            </Eyebrow>
            <h1 className="text-cream mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Thoughtfully renovated homes
              <br />
              <span className="text-copper-light italic">
                across Cleveland&apos;s west side
              </span>
            </h1>
            <p className="text-cream/85 mt-6 max-w-xl text-lg leading-relaxed">
              A family-run collection of beautifully restored rental homes —
              character-rich houses, modern comforts, and a landlord who actually
              answers the phone.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/properties">Browse Properties</ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
