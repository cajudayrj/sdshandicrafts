import Image from "next/image";

// TODO: replace these four placeholders with the real product categories,
// blurbs and photos.
//
// The photos are stand-ins: all four are CC0 / public domain (no attribution
// required, commercial use fine), found via openverse.org —
//   keepsakes, personalized-gifts, accessories ... WordPress Photo Directory
//   custom-orders ............................... Flickr, CC0
// Swap them for SDS's own product shots as soon as we have them; the license
// only makes them safe to ship, not ours to claim.
const CATEGORIES = [
  {
    title: "Handmade Keepsakes",
    blurb:
      "Little pieces made to be kept — the kind of thing that ends up on a shelf and stays there for years.",
    image: "/categories/keepsakes.jpg",
    imageAlt: "A crocheted stuffed rabbit in a teal dress",
    tone: "bg-blush",
  },
  {
    title: "Personalized Gifts",
    blurb:
      "Add a name, a date, or an inside joke. We'll work it in so the gift feels like it was made for one person only.",
    image: "/categories/personalized-gifts.jpg",
    imageAlt: "Three wrapped gift boxes tied with ribbon bows",
    tone: "bg-sunny/60",
  },
  {
    title: "Everyday Accessories",
    blurb:
      "Small, wearable, and sturdy enough for daily use — the pieces people ask you about at the counter.",
    image: "/categories/accessories.jpg",
    imageAlt: "A row of handwoven friendship bracelets in bright colors",
    tone: "bg-sage/40",
  },
  {
    title: "Custom Orders",
    blurb:
      "Have something specific in mind? Send us a reference and we'll tell you honestly whether we can make it.",
    image: "/categories/custom-orders.jpg",
    imageAlt: "Skeins of hand-dyed yarn in rainbow colors",
    tone: "bg-blush",
  },
];

export default function WhatWeMake() {
  return (
    <section id="what-we-make" className="bg-blush/35 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            What we make
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            A quick look at the kinds of things that come out of our craft
            table.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-3xl border-2 border-navy bg-cream p-6 shadow-[5px_5px_0_0_var(--navy)]"
            >
              <span
                className={`relative block aspect-4/3 overflow-hidden rounded-2xl ${item.tone}`}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-navy/70">
                {item.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
