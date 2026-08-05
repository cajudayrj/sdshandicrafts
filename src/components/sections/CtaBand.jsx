import { SOCIALS } from "@/lib/socials";
import {
  Heart,
  ScallopEdge,
  Scissors,
  Squiggle,
  Star,
  YarnBall,
} from "@/components/decor";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-sunny py-16 sm:py-20">
      {/* Confetti around the copy — lg and up, where the max-w-3xl column
          leaves clear margins for them. */}
      <YarnBall
        fill="var(--cream)"
        className="doodle-float pointer-events-none absolute left-[6%] top-12 hidden h-16 w-16 -rotate-12 text-navy lg:block"
      />
      <Heart
        fill="var(--heart)"
        className="doodle-float-slow pointer-events-none absolute bottom-14 left-[13%] hidden h-10 w-10 rotate-12 text-navy lg:block"
      />
      <Star
        fill="var(--cream)"
        className="doodle-float-slow pointer-events-none absolute right-[7%] top-16 hidden h-14 w-14 rotate-6 text-navy lg:block"
      />
      <Scissors
        fill="var(--cream)"
        className="doodle-float pointer-events-none absolute bottom-12 right-[14%] hidden h-12 w-12 -rotate-6 text-navy lg:block"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Let&apos;s make something together
        </h2>
        <Squiggle className="mx-auto mt-3 h-auto w-36 text-heart/70" />
        <p className="mx-auto mt-4 max-w-xl text-navy/75">
          Follow along for new pieces and restocks, or send us a message about a
          custom order.
        </p>

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {SOCIALS.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full border-2 border-navy bg-cream px-6 py-3 font-display font-semibold text-navy shadow-[4px_4px_0_0_var(--navy)] transition-transform hover:-translate-y-0.5"
              >
                <Icon className="h-5 w-5" />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
