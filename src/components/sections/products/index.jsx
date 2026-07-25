import { SHOP } from "@/lib/socials";
import ProductCarousel from "./ProductCarousel";
import { getProducts } from "./products";

export default async function Products() {
  const products = await getProducts();

  if (products.length === 0) return null;

  return (
    <section id="products" className="bg-sage/12 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Our products
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Swipe through the shelf and tap any photo for a closer look.
          </p>
        </div>

        <ProductCarousel products={products} />

        <a
          href={SHOP.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex flex-col w-fit mx-auto rounded-full border-2 border-navy bg-sunny px-5 py-3 text-center font-display text-base font-semibold text-navy shadow-[3px_3px_0_0_var(--navy)]"
        >
          Browse more on {SHOP.name}
        </a>
      </div>
    </section>
  );
}
