const STEPS = [
  {
    n: "1",
    title: "Browse & pick",
    body: "Have a look through our latest TikTok posts — that's where new pieces and restocks go up first.",
  },
  {
    n: "2",
    title: "Message us",
    body: "Send us your order details — quantity, colors, personalization, and when you need it.",
  },
  {
    n: "3",
    title: "We make & ship",
    body: "We confirm the details, craft your piece, and send it your way carefully packed.",
  },
];

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="bg-blush/35 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            How to order
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            There&apos;s no checkout here — we take orders through TikTok and
            our other socials so we can talk through the details with you first.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-3xl border-2 border-navy bg-cream p-7 shadow-[5px_5px_0_0_var(--navy)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy bg-sunny font-display text-xl font-semibold text-navy">
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-navy/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
