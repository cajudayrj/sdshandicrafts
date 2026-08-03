import Link from "next/link";
import { CATEGORIES } from "@/sanity/categories";

// Root not-found.js covers both notFound() calls from a segment (a missing
// product or a bad category slug) and any URL that matches no route at all.
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-28 h-96 w-96 rounded-full bg-blush/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-sunny/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="font-display text-6xl font-semibold tracking-tight text-navy sm:text-7xl">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl">
          We couldn&apos;t find that one.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-navy/70">
          The page you were after may have been moved, or the piece you&apos;re
          looking for is no longer on the craft table.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-full border-2 border-navy bg-sunny px-7 py-3.5 text-center font-display text-base font-semibold text-navy shadow-[4px_4px_0_0_var(--navy)] transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Back home
          </Link>
          <Link
            href="/products"
            className="w-full rounded-full border-2 border-navy bg-cream px-7 py-3.5 text-center font-display text-base font-semibold text-navy transition-colors hover:bg-blush sm:w-auto"
          >
            Browse all products
          </Link>
        </div>

        <div className="mt-12">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-navy/50">
            Or pick a collection
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map(({ value, title }) => (
              <li key={value}>
                <Link
                  href={`/category/${value}`}
                  className="inline-block rounded-full border-2 border-navy/20 px-5 py-2 font-display text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-blush"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
