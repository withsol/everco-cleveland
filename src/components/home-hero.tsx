"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";

type Slide = { src: string; alt: string };

/** Hand-picked hero photos — a mix of clean exteriors and warm interiors. */
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
    src: "/properties/165-belmar-blvd/01.jpg",
    alt: "Classic colonial exterior on Belmar Blvd in Avon Lake",
  },
  {
    src: "/properties/17016-lanier-ave/04.jpg",
    alt: "Bright, beautifully styled first-floor living space on Lanier Ave",
  },
  {
    src: "/properties/514-cahoon-rd/01.jpg",
    alt: "Charming home exterior on Cahoon Rd in Bay Village",
  },
];

const ROTATE_MS = 5500;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length),
    [],
  );

  // Auto-advance, restarting the timer on each change so manual nav also
  // resets the countdown. Honors reduced-motion and pauses on hover/focus.
  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, index]);

  const arrowBase =
    "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/35 text-cream text-2xl backdrop-blur-sm transition hover:bg-charcoal/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:flex";

  return (
    <section
      className="relative w-full"
      aria-roledescription="carousel"
      aria-label="Featured homes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
        {/* Crossfading photos */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Gradient overlays keep white text legible over any photo */}
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
              <ButtonLink
                href="/about"
                variant="outline"
                className="border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-forest"
              >
                Meet the family
              </ButtonLink>
            </div>
          </div>
        </Container>

        {/* Manual navigation */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className={`${arrowBase} left-5`}
        >
          <span aria-hidden>‹</span>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className={`${arrowBase} right-5`}
        >
          <span aria-hidden>›</span>
        </button>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1} of ${SLIDES.length}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "bg-cream w-7" : "bg-cream/50 hover:bg-cream/80 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
