import Link from "next/link";
import { CATEGORIES } from "@/sanity/categories";

/**
 * Collection nav for the listing pages. Sits above the grid on small screens
 * and becomes a sticky left rail from lg up.
 *
 * @param {string?} current The active category slug, or null on /products.
 */
export default function CategorySidebar({ current = null }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-navy/50">
        Collections
      </h2>

      <nav className="mt-4">
        <ul className="flex flex-wrap gap-3 lg:flex-col lg:gap-2">
          <li>
            <SidebarLink href="/products" active={current === null}>
              All products
            </SidebarLink>
          </li>
          {CATEGORIES.map(({ value, title }) => (
            <li key={value}>
              <SidebarLink
                href={`/category/${value}`}
                active={current === value}
              >
                {title}
              </SidebarLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function SidebarLink({ href, active, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`block rounded-full border-2 border-navy px-5 py-2 font-display text-sm font-semibold text-navy lg:w-full ${
        active
          ? "bg-sunny shadow-[3px_3px_0_0_var(--navy)]"
          : "bg-cream hover:bg-blush"
      }`}
    >
      {children}
    </Link>
  );
}
