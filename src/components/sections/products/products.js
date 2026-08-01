// ---------------------------------------------------------------------------
// The single seam between the product UI and Sanity.
//
// Everything downstream consumes this shape, and nothing else in the app knows
// where the data came from:
//
//   {
//     id, name, blurb, price, categories,
//     image:       { src, width, height, blurDataURL },
//     otherImages: [{ src, width, height, blurDataURL }, ...],
//   }
//
// Each image is deliberately shaped like a static import (StaticImageData), so
// <Image src={product.image} /> keeps working exactly as it did when these were
// files on disk. `otherImages` is the extra angles/detail shots, in the order
// the editor arranged them, and is `[]` when there are none.
//
// The schema lives in the separate studio repo, at
// ../studio-sds-handicrafts/schemaTypes/product.ts.
// ---------------------------------------------------------------------------

import { cacheTag } from "next/cache";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

// Products with no photo are skipped rather than crashing the carousel — the
// card is mostly image, so there's nothing to show without one. `$category` is
// null when we want every category, which the filter short-circuits on. A
// product can belong to several categories, so this is membership, not equality.
const FILTER = `_type == "product" && defined(photo.asset) && ($category == null || $category in categories)`;

const ORDER = `order(coalesce(displayOrder, 9999) asc, _createdAt asc)`;

// _id is what the image URL is built from — dropping it here silently breaks
// urlFor().
const IMAGE_ASSET = `
  asset->{
    _id,
    "lqip": metadata.lqip,
    "width": metadata.dimensions.width,
    "aspectRatio": metadata.dimensions.aspectRatio
  }
`;

const FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  blurb,
  price,
  categories,
  photo { ${IMAGE_ASSET} },
  // An editor can leave a half-added slot in the array, so drop entries whose
  // upload never landed rather than blowing up the mapper.
  "otherImages": otherImages[defined(asset)] { ${IMAGE_ASSET} }
`;

// Cap on the CDN image we request. The largest card is ~30vw and the lightbox
// shows the same URL full screen, so this is sized for the lightbox; next/image
// resizes down from here for the cards.
const MAX_WIDTH = 1600;

/**
 * Read products, newest-ordering first.
 *
 * @param {object}  [options]
 * @param {string?} [options.category] One of the slugs in @/sanity/categories;
 *                                     matches products that include it among
 *                                     theirs. Omit or pass null for all.
 * @param {number?} [options.limit]    Page size. Omit or pass null for all.
 * @param {number}  [options.offset]   How many to skip — `(page - 1) * limit`.
 * @returns {Promise<{products: Array, total: number}>} `total` counts every
 *          match, ignoring limit/offset, so callers can render page controls.
 */
export async function getProducts({
  category = null,
  limit = null,
  offset = 0,
} = {}) {
  "use cache";
  // Every variant carries the same tag, so one webhook call invalidates all of
  // them — see src/app/api/revalidate/route.js.
  cacheTag("products");

  // The slice is omitted entirely when unpaginated; GROQ has no "rest of the
  // list" bound, and a hardcoded huge number would be a silent ceiling.
  const slice = limit === null ? "" : `[$offset...$end]`;

  const { products, total } = await client.fetch(
    `{
      "products": *[${FILTER}] | ${ORDER} ${slice} { ${FIELDS} },
      "total": count(*[${FILTER}])
    }`,
    { category, offset, end: limit === null ? null : offset + limit },
  );

  return { products: products.map(toProduct), total };
}

function toProduct(doc) {
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug ?? null,
    blurb: doc.blurb ?? null,
    price: doc.price ?? null,
    categories: doc.categories ?? [],
    image: toImage(doc.photo),
    otherImages: (doc.otherImages ?? []).map(toImage),
  };
}

/**
 * Read one product by its slug, for /product/[slug].
 *
 * @returns {Promise<object|null>} null when nothing matches, so the caller can
 *          decide between notFound() and rendering something else.
 */
export async function getProduct(slug) {
  "use cache";
  cacheTag("products");

  // Same photo guard as the listing: a product with no main image has nothing
  // to build a gallery from.
  const doc = await client.fetch(
    `*[_type == "product" && defined(photo.asset) && slug.current == $slug][0] { ${FIELDS} }`,
    { slug },
  );

  return doc ? toProduct(doc) : null;
}

/** Every slug with a page worth prerendering — drives generateStaticParams. */
export async function getProductSlugs() {
  "use cache";
  cacheTag("products");

  return client.fetch(
    `*[_type == "product" && defined(photo.asset) && defined(slug.current)].slug.current`,
  );
}

/** Sanity image field -> the StaticImageData shape next/image accepts. */
function toImage(source) {
  const { lqip, width: originalWidth, aspectRatio } = source.asset;
  // Never ask the CDN to upscale past the file that was uploaded.
  const width = Math.min(originalWidth, MAX_WIDTH);

  return {
    src: urlFor(source).width(width).auto("format").url(),
    width,
    height: Math.round(width / aspectRatio),
    blurDataURL: lqip,
  };
}
