import { Suspense } from "react";
import CategorySidebar from "@/components/product/CategorySidebar";
import ProductGrid, {
  ProductGridSkeleton,
} from "@/components/product/ProductGrid";
import Pagination, { toPageNumber } from "@/components/product/Pagination";
import { getProducts } from "@/components/sections/products/products";

const PER_PAGE = 12;

export const metadata = {
  title: "All products — SDS Handicrafts",
  description:
    "Every piece we make, in one place — handmade in small batches and made to order.",
};

export default function ProductsPage({ searchParams }) {
  return (
    <section className="bg-sage/12 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            All products
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Everything on the craft table right now. Pick a collection to narrow
            it down.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-12">
          <CategorySidebar current={null} />

          <div>
            {/*
              searchParams is a runtime API, so reading it has to happen below a
              Suspense boundary — otherwise the whole route defers to request
              time and there's no static shell to send. The promise is passed
              down unawaited on purpose: awaiting it here would defeat that.
            */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <AllProducts searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

async function AllProducts({ searchParams }) {
  const { page } = await searchParams;
  const current = toPageNumber(page);

  const { products, total } = await getProducts({
    limit: PER_PAGE,
    offset: (current - 1) * PER_PAGE,
  });

  if (products.length === 0) {
    return (
      <p className="rounded-3xl border-2 border-dashed border-navy/30 px-6 py-16 text-center text-navy/70">
        {total === 0
          ? "Nothing here just yet — check back soon."
          : "That page is past the end of the list."}
      </p>
    );
  }

  return (
    <>
      <ProductGrid products={products} />
      <Pagination
        basePath="/products"
        current={current}
        pageCount={Math.ceil(total / PER_PAGE)}
      />
    </>
  );
}
