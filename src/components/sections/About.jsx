import {
  Flower,
  Heart,
  Needle,
  ScallopEdge,
  Squiggle,
  YarnBall,
} from "@/components/decor";

// TODO: replace with the real origin story.
const VALUES = [
  {
    title: "Genuinely handmade",
    body: "Every piece is assembled by hand, one at a time. No factory runs, no shortcuts.",
    Icon: Heart,
    tone: "var(--heart)",
  },
  {
    title: "Made to order",
    body: "We start after you order, so you get something fresh rather than something that sat in a bin.",
    Icon: Needle,
    tone: "none",
  },
  {
    title: "Yours to customize",
    body: "Colors, sizing, names, packaging — tell us what you want and we'll adjust.",
    Icon: Flower,
    tone: "var(--blush)",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="pattern-dots relative overflow-hidden py-20 sm:py-24"
    >
      {/* Oversized outlines, mostly off-canvas — texture rather than objects,
          which is why they're washed out to a fraction of the navy. */}
      <YarnBall className="pointer-events-none absolute -left-16 top-10 h-52 w-52 -rotate-12 text-navy/8" />
      <Flower
        centerFill="none"
        className="doodle-spin pointer-events-none absolute -right-8 bottom-2 h-40 w-40 text-navy/8"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            A small shop, one pair of hands
          </h2>
          <Squiggle className="mt-3 h-auto w-36 text-sage" />
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
              className="flex items-start gap-4 rounded-3xl border-2 border-navy bg-sage/15 p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-cream"
              >
                <value.Icon fill={value.tone} className="h-6 w-6 text-navy" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy/70">
                  {value.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Into "How to order", which sits on blush/35 over this cream. */}
      <ScallopEdge fill="var(--blush)" fillOpacity={0.35} />
    </section>
  );
}
