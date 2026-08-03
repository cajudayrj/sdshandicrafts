import Link from "next/link";
import Image from "next/image";

/**
 * The card grid shared by /products and /category/[category]. Cards are sized
 * for a three-column layout on large screens. Spacing is the caller's job.
 */
export default function ProductGrid({ products }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          {/* A product without a slug has no page to link to, so it stays a
              plain card rather than a dead link. */}
          <CardShell slug={product.slug}>
            <span className="relative block aspect-square w-full overflow-hidden bg-blush">
              <Image
                src={product.image}
                alt={product.name}
                // Sanity generates a blur placeholder for every upload, but an
                // asset missing one would throw rather than just render plain.
                placeholder={product.image.blurDataURL ? "blur" : "empty"}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </span>

            <span className="flex flex-1 flex-col p-5">
              <span className="font-display text-lg font-semibold text-navy">
                {product.name}
              </span>
              {product.blurb && (
                <span title={product.blurb} className="mt-1.5 flex-1 text-sm leading-relaxed text-navy/70 text-ellipsis overflow-hidden line-clamp-3">
                  {product.blurb}
                </span>
              )}
              {product.price && (
                <span className="mt-4 inline-block w-fit rounded-full border-2 border-navy bg-sunny px-3.5 py-1 font-display text-sm font-semibold text-navy">
                  {product.price}
                </span>
              )}
              <button type="button" className="mt-3 cursor-pointer block rounded-full border-2 border-navy px-5 py-2 font-display text-sm font-semibold text-navy lg:w-full">View Product</button>
            </span>
          </CardShell>
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <li
          key={i}
          className="h-72 animate-pulse rounded-3xl border-2 border-navy/20 bg-blush/30"
        />
      ))}
    </ul>
  );
}

function CardShell({ slug, children }) {
  const className =
    "group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-navy bg-cream shadow-[5px_5px_0_0_var(--navy)]";

  if (!slug) return <div className={className}>{children}</div>;

  return (
    <Link
      href={`/product/${slug}`}
      className={`${className} transition-transform hover:-translate-y-1`}
    >
      {children}
    </Link>
  );
}
