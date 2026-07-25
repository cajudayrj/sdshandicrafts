// TODO: replace these four placeholders with the real product categories,
// blurbs and (eventually) photos.
const CATEGORIES = [
  {
    title: "Handmade Keepsakes",
    blurb:
      "Little pieces made to be kept — the kind of thing that ends up on a shelf and stays there for years.",
    motif: "🧸",
    tone: "bg-blush",
  },
  {
    title: "Personalized Gifts",
    blurb:
      "Add a name, a date, or an inside joke. We'll work it in so the gift feels like it was made for one person only.",
    motif: "🎁",
    tone: "bg-sunny/60",
  },
  {
    title: "Everyday Accessories",
    blurb:
      "Small, wearable, and sturdy enough for daily use — the pieces people ask you about at the counter.",
    motif: "🌿",
    tone: "bg-sage/40",
  },
  {
    title: "Custom Orders",
    blurb:
      "Have something specific in mind? Send us a reference and we'll tell you honestly whether we can make it.",
    motif: "✨",
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
                className={`flex h-24 items-center justify-center rounded-2xl text-4xl ${item.tone}`}
                aria-hidden="true"
              >
                {item.motif}
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
