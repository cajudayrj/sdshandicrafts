"use client";

import { useState } from "react";
import Image from "next/image";
import { SHOP } from "@/lib/socials";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "What We Make", href: "#what-we-make" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "How to Order", href: "#how-to-order" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-blush bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.jpeg"
            alt="SDS Handicrafts"
            width={1181}
            height={1181}
            loading="eager"
            fetchPriority="high"
            sizes="60px"
            className="h-15 w-15 object-contain"
          />
          {/* <span className="font-display text-xl font-semibold tracking-tight text-navy sm:text-2xl">
            SDS Handicrafts
          </span> */}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[15px] font-medium text-navy/75 transition-colors hover:text-heart"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SHOP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-navy bg-sunny px-5 py-2 font-display text-[15px] font-semibold text-navy shadow-[3px_3px_0_0_var(--navy)] transition-transform hover:-translate-y-0.5"
          >
            Shop on {SHOP.name}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy bg-blush text-navy lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-blush bg-cream px-5 pb-6 pt-2 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-blush/70 py-3.5 font-display text-lg font-medium text-navy"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SHOP.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full border-2 border-navy bg-sunny py-3 text-center font-display text-base font-semibold text-navy shadow-[3px_3px_0_0_var(--navy)]"
          >
            Shop on {SHOP.name}
          </a>
        </nav>
      )}
    </header>
  );
}
