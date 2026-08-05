import Image from "next/image";
import { SHOP } from "@/lib/socials";
import {
  ScallopEdge,
  Scissors,
  Sparkle,
  Spool,
  Squiggle,
  YarnBall,
} from "@/components/decor";
import ProductCarousel from "./ProductCarousel";
import { getProducts } from "./products";
import productsBg from "./sdsproductbg.png";

export default async function Products() {
  // The homepage carousel shows every category; the per-category pages are the
  // ones that will pass a category and paginate.
  const { products } = await getProducts();

  if (products.length === 0) return null;

  return (
    <section
      id="products"
      className="relative isolate overflow-hidden bg-sage/12 py-20 sm:py-24"
    >
      <Image
        src={productsBg}
        alt=""
        aria-hidden="true"
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Keeps the headings and cards readable over the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cream/70"
      />

      {/* Stickers pinned to the section's own margins — clear of the max-w-6xl
          container, so they only appear once there's room beside it. */}
      <YarnBall
        fill="var(--blush)"
        className="doodle-float pointer-events-none absolute left-[3%] top-24 hidden h-16 w-16 -rotate-10 text-navy/60 xl:block"
      />
      <Spool
        fill="var(--sunny)"
        className="doodle-float-slow pointer-events-none absolute right-[3%] top-40 hidden h-14 w-14 rotate-14 text-navy/60 xl:block"
      />
      <Scissors
        fill="var(--cream)"
        className="doodle-float pointer-events-none absolute bottom-32 left-[5%] hidden h-14 w-14 rotate-8 text-navy/50 xl:block"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="inline-flex items-center gap-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            <Sparkle
              fill="var(--sunny)"
              className="h-5 w-5 shrink-0 text-navy sm:h-6 sm:w-6"
            />
            Our products
            <Sparkle
              fill="var(--sunny)"
              className="h-5 w-5 shrink-0 text-navy sm:h-6 sm:w-6"
            />
          </h2>
          <Squiggle className="mx-auto mt-3 h-auto w-36 text-sage" />
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Swipe through the shelf and tap any piece for a closer look.
          </p>
        </div>

        <ProductCarousel products={products} />

        <div className="flex flex-row mt-5 gap-5 justify-center items-center text-center">
          <a
            href={SHOP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full border-2 border-navy bg-sunny px-5 py-3 text-center font-display text-base font-semibold text-navy shadow-[3px_3px_0_0_var(--navy)]"
          >
            Browse more on {SHOP.name}
          </a>
          <a
            href='/products'
            rel="noopener noreferrer"
            className="w-fit rounded-full border-2 border-navy bg-white px-5 py-3 text-center font-display text-base font-semibold text-navy shadow-[3px_3px_0_0_var(--navy)]"
          >
            View All Products
          </a>
        </div>
      </div>

      {/* Hands off to the hero's cream. Each homepage section owns the scallop
          into the one below it, so the color here follows page.js's order. */}
      <ScallopEdge fill="var(--cream)" />
    </section>
  );
}
