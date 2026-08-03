import { SHOP } from "@/lib/socials";
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-28 h-96 w-96 rounded-full bg-blush/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-sunny/40 blur-3xl"
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
          <HeroCarousel slides={slides} />
        </div>
      </div>
    </section>
  );
}
