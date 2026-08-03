"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_MS = 4000;

/**
 * Crossfading hero slideshow: every slide is stacked in the same box and only
 * the active one is opaque, so there is nothing to scroll and no controls to
 * render. `slides` is `[{ src, blurDataURL, alt }]` — plain URLs rather than
 * the StaticImageData shape, since `fill` supplies the geometry.
 */
export default function HeroCarousel({ slides }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;

    // Nothing here can be paused, so anyone who has asked for less motion just
    // keeps the first slide. Read once at mount: the setting changing mid-visit
    // isn't worth a listener.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative h-56 w-56 overflow-hidden rounded-[2.5rem] border-2 border-navy bg-white shadow-[8px_8px_0_0_var(--blush)] rotate-6 transform sm:h-[26rem] sm:w-[26rem]">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          // Only the visible slide is described; the rest are decorative until
          // they come round, and reading five alts in a row helps nobody.
          alt={i === active ? slide.alt : ""}
          aria-hidden={i !== active}
          fill
          // The first slide is the LCP candidate; the others are already in the
          // viewport, so they load on their own without competing for priority.
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          placeholder={slide.blurDataURL ? "blur" : "empty"}
          blurDataURL={slide.blurDataURL}
          sizes="(min-width: 640px) 416px, 224px"
          className={`object-cover pointer-events-none transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
