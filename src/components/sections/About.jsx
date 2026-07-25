// TODO: replace with the real origin story.
const VALUES = [
  {
    title: "Genuinely handmade",
    body: "Every piece is assembled by hand, one at a time. No factory runs, no shortcuts.",
  },
  {
    title: "Made to order",
    body: "We start after you order, so you get something fresh rather than something that sat in a bin.",
  },
  {
    title: "Yours to customize",
    body: "Colors, sizing, names, packaging — tell us what you want and we'll adjust.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            A small shop, one pair of hands
          </h2>
          <p className="mt-5 leading-relaxed text-navy/75">
            SDS Handicrafts started the way most craft shops do — one project,
            made for one person, that other people then started asking for.
            We&apos;ve kept it small on purpose. Everything is still made by
            hand, in small batches, so we can pay attention to the details that
            make a handmade piece worth having.
          </p>
          <p className="mt-4 leading-relaxed text-navy/75">
            If you have an idea for something we haven&apos;t made before,
            we&apos;d genuinely like to hear it.
          </p>
        </div>

        <ul className="space-y-4">
          {VALUES.map((value) => (
            <li
              key={value.title}
              className="rounded-3xl border-2 border-navy bg-sage/15 p-6"
            >
              <h3 className="font-display text-lg font-semibold text-navy">
                {value.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/70">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
