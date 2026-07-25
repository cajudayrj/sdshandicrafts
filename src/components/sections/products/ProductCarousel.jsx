"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * Horizontal scroll-snap carousel. Clicking a card opens the lightbox at that
 * slide. `products` comes from getProducts() in ./products.js.
 */
export default function ProductCarousel({ products }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(-1); // -1 = lightbox closed
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Track scroll position so the arrows can disable at either end.
  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      el.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    // One card plus the 1.5rem gap.
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const slides = products.map((product) => ({
    src: product.image.src,
    width: product.image.width,
    height: product.image.height,
    alt: product.name,
    title: product.name,
    // description: [product.price, product.blurb].filter(Boolean).join(" — "),
  }));

  return (
    <div className="relative mt-12">
      <div className="flex justify-end gap-3 pb-5">
        <CarouselButton
          direction={-1}
          disabled={atStart}
          onClick={() => scrollByCard(-1)}
        />
        <CarouselButton
          direction={1}
          disabled={atEnd}
          onClick={() => scrollByCard(1)}
        />
      </div>

      {/* No negative margins: the track stays inside the section's own padding
          so cards never touch the screen edge. pr-2/pb-5 leave room for the
          cards' offset shadow, which overflow-x-auto would otherwise clip. */}
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 pr-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, i) => (
          <li
            key={product.id}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[30%]"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border-2 border-navy bg-cream text-left shadow-[5px_5px_0_0_var(--navy)] transition-transform hover:-translate-y-1"
            >
              <span className="relative block aspect-square w-full overflow-hidden bg-blush">
                <Image
                  src={product.image}
                  alt={product.name}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all group-hover:bg-navy/35 group-hover:opacity-100"
                >
                  <span className="rounded-full border-2 border-navy bg-cream px-4 py-1.5 font-display text-sm font-semibold text-navy">
                    View photo
                  </span>
                </span>
              </span>

              <span className="flex flex-1 flex-col p-5">
                <span className="font-display text-lg font-semibold text-navy">
                  {product.name}
                </span>
                {/* <span className="mt-1.5 flex-1 text-sm leading-relaxed text-navy/70">
                  {product.blurb}
                </span>
                {product.price && (
                  <span className="mt-4 inline-block w-fit rounded-full border-2 border-navy bg-sunny px-3.5 py-1 font-display text-sm font-semibold text-navy">
                    {product.price}
                  </span>
                )} */}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions, Counter, Thumbnails, Zoom]}
        captions={{ descriptionTextAlign: "center" }}
        styles={{ container: { backgroundColor: "rgba(27, 42, 78, .92)" } }}
      />
    </div>
  );
}

function CarouselButton({ direction, disabled, onClick }) {
  const isPrev = direction === -1;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous products" : "Next products"}
      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy bg-cream text-navy transition-opacity hover:bg-sunny disabled:opacity-30 disabled:hover:bg-cream"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
