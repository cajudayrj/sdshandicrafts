/**
 * Mirrors PRODUCT_CATEGORIES in ../../../studio-sds-handicrafts/schemaTypes/product.ts.
 * The two repos deploy separately, so this list is duplicated rather than
 * imported — if you add a category there, add it here too.
 *
 * `value` doubles as the URL segment for the planned per-category pages.
 */
export const CATEGORIES = [
  { value: "on-hand", title: "On Hand" },
  { value: "personalized", title: "Personalized" },
];

/** Guard for untrusted route params, so a bad slug 404s instead of querying. */
export function isCategory(value) {
  return CATEGORIES.some((category) => category.value === value);
}

export function categoryTitle(value) {
  return CATEGORIES.find((category) => category.value === value)?.title ?? null;
}
