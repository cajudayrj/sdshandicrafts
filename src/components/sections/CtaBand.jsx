import { SOCIALS } from "@/lib/socials";

export default function CtaBand() {
  return (
    <section className="bg-sunny py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Let&apos;s make something together
        </h2>
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
