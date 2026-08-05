import Link from "next/link";
import { notFound } from "next/navigation";
import { SHOP } from "@/lib/socials";
import { categoryTitle } from "@/sanity/categories";
import ProductGallery from "@/components/product/ProductGallery";
import {
  getProduct,
  getProductSlugs,
} from "@/components/sections/products/products";

// A slug that can never match a real product. Cache Components rejects a
// generateStaticParams that returns nothing, so a dataset with no slugged
// products still has to yield one entry — this one, which 404s like any other
// unknown slug. Without it, building against an empty dataset would fail.
const PLACEHOLDER_SLUG = "__no-products__";

// This exists so `params` counts as prerenderable rather than a runtime API,
// which lets the lookup happen in the page body. That matters: notFound() has
// to run before anything is streamed, or the response commits as 200 and the
// 404 is UI-only.
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  const known = slugs.length > 0 ? slugs : [PLACEHOLDER_SLUG];
  return known.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} — SDS Handicrafts`,
    description: product.blurb ?? undefined,
    openGraph: {
      title: product.name,
      description: product.blurb ?? undefined,
      images: [product.image.src],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  // Runs before any output is streamed, so this is a real 404 response.
  if (!product) notFound();

  // The gallery treats the main photo as the first slide, then the extras.
  const images = [product.image, ...product.otherImages];

  return (
    <article className="pattern-dots py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Breadcrumb product={product} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={images} name={product.name} />

          <div className="flex flex-col">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              {product.name}
            </h1>

            {product.price && (
              <p className="mt-5 inline-block w-fit rounded-full border-2 border-navy bg-sunny px-5 py-2 font-display text-xl font-semibold text-navy shadow-[3px_3px_0_0_var(--navy)]">
                {product.price}
              </p>
            )}

            {product.blurb && (
              <p className="mt-6 text-lg leading-relaxed text-navy/75">
                {product.blurb}
              </p>
            )}

            {product.categories.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-navy/50">
                  Collections
                </h2>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {product.categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/category/${category}`}
                        className="inline-block rounded-full border-2 border-navy bg-cream px-4 py-1.5 font-display text-sm font-semibold text-navy hover:bg-sunny"
                      >
                        {categoryTitle(category) ?? category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nothing is sold on this site — the CTA hands off to the shop. */}
            <div className="mt-10 flex flex-col gap-3 border-t-2 border-dashed border-navy/20 pt-8 sm:flex-row">
              <a
                href={SHOP.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-navy bg-sunny px-6 py-3 text-center font-display text-base font-semibold text-navy shadow-[3px_3px_0_0_var(--navy)]"
              >
                Order on {SHOP.name}
              </a>
              {/* Plain <a>, not next/link: routing a homepage fragment through
                  the router appends to the current hash instead of replacing
                  it. Same reasoning as the header nav. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/#how-to-order"
                className="rounded-full border-2 border-navy bg-cream px-6 py-3 text-center font-display text-base font-semibold text-navy hover:bg-blush"
              >
                How ordering works
              </a>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-navy/60">
              Handmade to order, so every piece varies a little from its photo —
              that&apos;s the point.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function Breadcrumb({ product }) {
  // Any of a product's categories would do; the first is the stable choice.
  const category = product.categories[0];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-navy/60">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
        </li>
        {category && (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/category/${category}`} className="hover:text-navy">
                {categoryTitle(category) ?? category}
              </Link>
            </li>
          </>
        )}
        <li aria-hidden="true">/</li>
        <li className="font-semibold text-navy">{product.name}</li>
      </ol>
    </nav>
  );
}
