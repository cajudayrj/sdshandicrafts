import Link from "next/link";

/**
 * Previous/next pager shared by every paginated listing.
 *
 * @param {string} basePath e.g. "/products" or "/category/on-hand". Page 1 links
 *                          back to the bare path so the first page has one URL
 *                          rather than two.
 */
export default function Pagination({ basePath, current, pageCount }) {
  if (pageCount <= 1) return null;

  const href = (page) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex items-center justify-center gap-3"
    >
      <PageLink href={href(current - 1)} disabled={current === 1}>
        Previous
      </PageLink>

      <span className="font-display text-sm font-semibold text-navy/70">
        Page {current} of {pageCount}
      </span>

      <PageLink href={href(current + 1)} disabled={current === pageCount}>
        Next
      </PageLink>
    </nav>
  );
}

function PageLink({ href, disabled, children }) {
  const className =
    "rounded-full border-2 border-navy px-5 py-2 font-display text-sm font-semibold text-navy";

  // A disabled link isn't a thing in HTML — render the dead end as plain text
  // so it can't be focused or followed.
  if (disabled) {
    return (
      <span className={`${className} opacity-30`} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={`${className} bg-cream hover:bg-sunny`}>
      {children}
    </Link>
  );
}

/** `?page=` is user input — anything that isn't a positive integer means page 1. */
export function toPageNumber(value) {
  const page = Number.parseInt(Array.isArray(value) ? value[0] : value, 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}
