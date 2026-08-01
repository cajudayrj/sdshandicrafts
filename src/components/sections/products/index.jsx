import Image from "next/image";
import { SHOP } from "@/lib/socials";
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

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Our products
          </h2>
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
    </section>
  );
}
