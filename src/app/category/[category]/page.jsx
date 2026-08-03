import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES, categoryTitle, isCategory } from "@/sanity/categories";
import CategorySidebar from "@/components/product/CategorySidebar";
import ProductGrid, {
  ProductGridSkeleton,
} from "@/components/product/ProductGrid";
import Pagination, { toPageNumber } from "@/components/product/Pagination";
import { getProducts } from "@/components/sections/products/products";

const PER_PAGE = 9;

// Both categories are prerendered. This also makes `params` safe to await
// outside a Suspense boundary — without at least one sample, Cache Components
// treats it as a runtime API.
export function generateStaticParams() {
  return CATEGORIES.map(({ value }) => ({ category: value }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const title = categoryTitle(category);
  if (!title) return {};

  return {
    title: `${title} — SDS Handicrafts`,
    description: `Browse our ${title.toLowerCase()} pieces, each one handmade in small batches.`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  // dynamicParams is gone under Cache Components, so an unknown slug reaches us
  // here rather than 404ing on its own.
  if (!isCategory(category)) notFound();

  return (
    <section className="bg-sage/12 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {categoryTitle(category)}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Everything we have in this collection, handmade in small batches.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-12">
          <CategorySidebar current={category} />

          <div>
            {/*
              searchParams is a runtime API, so reading it has to happen below a
              Suspense boundary — otherwise the whole route defers to request
              time and there's no static shell to send. The promise is passed
              down unawaited on purpose: awaiting it here would defeat that.

              The key resets the boundary between categories so one collection's
              grid never lingers while the next is loading.
            */}
            <Suspense key={category} fallback={<ProductGridSkeleton />}>
              <CategoryProducts
                category={category}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

async function CategoryProducts({ category, searchParams }) {
  const { page } = await searchParams;
  const current = toPageNumber(page);

  const { products, total } = await getProducts({
    category,
    limit: PER_PAGE,
    offset: (current - 1) * PER_PAGE,
  });

  if (products.length === 0) {
    return (
      <p className="rounded-3xl border-2 border-dashed border-navy/30 px-6 py-16 text-center text-navy/70">
        {total === 0
          ? "Nothing in this collection just yet — check back soon."
          : "That page is past the end of the collection."}
      </p>
    );
  }

  return (
    <>
      <ProductGrid products={products} />
      <Pagination
        basePath={`/category/${category}`}
        current={current}
        pageCount={Math.ceil(total / PER_PAGE)}
      />
    </>
  );
}
