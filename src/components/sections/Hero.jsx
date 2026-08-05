import { SHOP } from "@/lib/socials";
import {
  Bow,
  CrochetHook,
  Flower,
  Heart,
  ScallopEdge,
  Sparkle,
  Squiggle,
  Star,
} from "@/components/decor";
import HeroCarousel from "./HeroCarousel";
import { getProducts } from "./products/products";

// How many product photos the slideshow cycles through.
const SLIDE_COUNT = 5;

// Shown before there is anything to pull from Sanity — an empty frame would
// read as a broken image rather than an empty shop.
const FALLBACK_SLIDES = [
  { src: "/atfimage.jpg", alt: "SDS Handicrafts logo" },
];

export default async function Hero() {
  const { products } = await getProducts({ limit: SLIDE_COUNT });

  const slides = products.length
    ? products.map((product) => ({
        src: product.image.src,
        blurDataURL: product.image.blurDataURL,
        alt: product.name,
      }))
    : FALLBACK_SLIDES;

  return (
    <section id="home" className="relative overflow-hidden">
      

      {/* Margin stickers: xl only, where there's room either side of the
          max-w-6xl grid for them to sit without crowding the copy. */}
      <CrochetHook className="doodle-float pointer-events-none absolute bottom-28 left-[3%] hidden h-16 w-16 -rotate-12 text-navy/45 xl:block" />
      <Sparkle
        fill="var(--sunny)"
        className="doodle-float-slow pointer-events-none absolute right-[4%] top-24 hidden h-12 w-12 text-navy/60 xl:block"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          {/* <span className="inline-block rounded-full border-2 border-navy bg-sunny px-4 py-1.5 font-display text-sm font-semibold">
            Handmade with love
          </span> */}
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-6xl">
            Little handmade things,
            <br />
            made just for you.
          </h1>
          <Squiggle className="mx-auto mt-4 h-auto w-40 text-heart/70 lg:mx-0" />
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-navy/70 lg:mx-0">
            SDS Handicrafts is a small craft shop making keepsakes, personalized
            gifts and everyday accessories — each one put together by hand, made
            to order.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href={SHOP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border-2 border-navy bg-sunny px-7 py-3.5 text-center font-display text-base font-semibold text-navy shadow-[4px_4px_0_0_var(--navy)] transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Shop on {SHOP.name}
            </a>
            <a
              href="#what-we-make"
              className="w-full rounded-full border-2 border-navy bg-cream px-7 py-3.5 text-center font-display text-base font-semibold text-navy transition-colors hover:bg-blush sm:w-auto"
            >
              See what we make
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          {/* Stickers hang off the carousel frame itself, so they follow it at
              every breakpoint instead of needing their own positions. */}
          <div className="relative">
            <HeroCarousel slides={slides} />
            <Bow
              fill="var(--blush)"
              className="doodle-float pointer-events-none absolute -left-4 -top-6 h-12 w-12 -rotate-12 text-navy sm:-left-8 sm:-top-8 sm:h-16 sm:w-16"
            />
            <Heart
              fill="var(--heart)"
              className="doodle-float-slow pointer-events-none absolute -right-3 top-6 h-8 w-8 rotate-12 text-navy sm:-right-5 sm:h-11 sm:w-11"
            />
            <Star
              fill="var(--sunny)"
              className="doodle-float pointer-events-none absolute -bottom-4 -right-4 h-11 w-11 rotate-6 text-navy sm:-bottom-6 sm:-right-7 sm:h-14 sm:w-14"
            />
            <Flower
              fill="var(--blush)"
              className="doodle-spin pointer-events-none absolute -bottom-6 left-1 h-11 w-11 text-navy sm:-bottom-9 sm:left-2 sm:h-14 sm:w-14"
            />
          </div>
        </div>
      </div>

      {/* Into "What we make", which sits on blush/35 over this cream. */}
      <ScallopEdge fill="var(--blush)" fillOpacity={0.35} />
    </section>
  );
}
