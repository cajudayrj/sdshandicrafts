import Image from "next/image";
import { SOCIALS } from "@/lib/socials";

// Absolute, not bare hashes: the footer renders on every route, and these
// sections only exist on the homepage. Plain <a> rather than next/link for the
// same reason as the header — see the note there.
const QUICK_LINKS = [
  { label: "What We Make", href: "/#what-we-make" },
  { label: "About Us", href: "/#about" },
  { label: "How to Order", href: "/#how-to-order" },
  { label: "Contact", href: "/#contact" },
];

// Cached because of the copyright year below: with Cache Components, reading the
// current time during prerender has to be explicitly opted into. Everything else
// here is static, so caching the whole footer is the cheapest way to say "this
// year is fine to bake in until the next revalidation".
export default async function Footer() {
  "use cache";

  return (
    <footer id="contact" className="bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream p-1.5">
              <Image
                src="/logo.jpeg"
                alt="SDS Handicrafts"
                width={1181}
                height={1181}
                sizes="56px"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-display text-2xl font-semibold">
              SDS Handicrafts
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            Small-batch handmade crafts and personalized gifts, made to order
            with a whole lot of care.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-sunny">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-cream/75 transition-colors hover:text-sunny"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-sunny">
            Find us online
          </h2>
          <ul className="mt-5 space-y-3">
            {SOCIALS.map(({ name, handle, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-cream/75 transition-colors hover:text-sunny"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors group-hover:border-sunny">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display font-medium text-cream group-hover:text-sunny">
                      {name}
                    </span>
                    <span className="block text-xs text-cream/55">{handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-6 text-xs text-cream/60 sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} SDS Handicrafts. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Handmade with
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-heart" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 21s-7.5-4.7-9.4-9.1C1.1 8.3 3 4.9 6.3 4.4c2-.3 3.9.7 4.9 2.3l.8 1.3.8-1.3c1-1.6 2.9-2.6 4.9-2.3 3.3.5 5.2 3.9 3.7 7.5C19.5 16.3 12 21 12 21Z"
              />
            </svg>
            <span className="sr-only">love</span>
            in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
