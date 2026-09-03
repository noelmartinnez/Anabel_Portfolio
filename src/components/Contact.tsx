"use client";

import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/** `year` llega del servidor: calcularlo aqui lo recalcularia al hidratar. */
export function Contact({ year }: { year: number }) {
  const { t } = useI18n();
  const c = t.contact;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink px-5 py-16 text-cream sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="section-index" style={{ color: "var(--sand-deep)" }}>
              {c.index}
            </span>
            <span className="h-px flex-1 bg-cream/20" />
            <span className="eyebrow" style={{ color: "var(--sand)" }}>
              {c.eyebrow}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-center font-display text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[0.95] tracking-tight sm:text-left">
            {c.title}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${c.email}`}
            data-cursor="hover"
            aria-label={`Escribir a ${c.email}`}
            className="group mx-auto mt-8 flex w-fit cursor-pointer items-center gap-4 break-all border-b border-cream/30 pb-2 font-display text-[clamp(1.25rem,3.6vw,2.1rem)] transition-colors hover:border-terracotta sm:mx-0"
          >
            {c.email}
            <span className="text-terracotta transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-cream/15 pt-8 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <p className="eyebrow mb-2" style={{ color: "var(--sand)" }}>
                {c.phoneLabel}
              </p>
              <a
                href={`tel:+34${c.phone.replace(/\s/g, "")}`}
                data-cursor="hover"
                className="mx-auto block w-fit cursor-pointer text-lg text-cream/85 transition-colors hover:text-cream sm:mx-0"
              >
                {c.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2" style={{ color: "var(--sand)" }}>
                {c.locationLabel}
              </p>
              <p className="text-lg text-cream/85">{c.location}</p>
            </div>
            <div>
              <p className="eyebrow mb-2" style={{ color: "var(--sand)" }}>
                Social
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href={c.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="mx-auto block w-fit cursor-pointer text-lg text-cream/85 transition-colors hover:text-cream sm:mx-0"
                >
                  {c.linkedin} ↗
                </a>
                <a
                  href={c.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="mx-auto block w-fit cursor-pointer text-lg text-cream/85 transition-colors hover:text-cream sm:mx-0"
                >
                  {c.instagram} ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <footer className="mt-12 border-t border-cream/15 pt-6 text-center text-xs uppercase tracking-widest text-cream/50 sm:text-left">
          <span>
            © {year} {t.footer.rights}
          </span>
        </footer>
      </div>

      {/* Nombre gigante decorativo de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[16vw] leading-none text-cream/[0.03]"
      >
        Anabel
      </span>
    </section>
  );
}
