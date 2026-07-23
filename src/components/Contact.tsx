"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const { t } = useI18n();
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  const c = t.contact;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink px-5 py-24 text-cream sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4">
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
          <h2 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
            {c.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/70">
            {c.body}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${c.email}`}
            data-cursor="hover"
            className="group mt-12 inline-flex items-center gap-4 border-b border-cream/30 pb-2 font-display text-[clamp(1.5rem,5vw,3rem)] transition-colors hover:border-terracotta"
          >
            {c.email}
            <span className="text-terracotta transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-cream/15 pt-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-2" style={{ color: "var(--sand)" }}>
                {t.nav.contact}
              </p>
              <a
                href={`tel:+34${c.phone.replace(/\s/g, "")}`}
                className="block text-lg text-cream/85 transition-colors hover:text-cream"
              >
                {c.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2" style={{ color: "var(--sand)" }}>
                {c.location}
              </p>
              <p className="text-lg text-cream/85">España</p>
            </div>
            <div>
              <p className="eyebrow mb-2" style={{ color: "var(--sand)" }}>
                Social
              </p>
              <a
                href={c.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="block text-lg text-cream/85 transition-colors hover:text-cream"
              >
                {c.linkedin} ↗
              </a>
            </div>
          </div>
        </Reveal>

        <footer className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-cream/15 pt-8 text-xs uppercase tracking-widest text-cream/50 sm:flex-row sm:items-center">
          <span>
            © {year} {t.footer.rights}
          </span>
          <span className="flex items-center gap-2">
            {t.footer.made} <span className="text-terracotta">✦</span>
          </span>
        </footer>
      </div>

      {/* Nombre gigante decorativo de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-none text-cream/[0.03]"
      >
        Anabel
      </span>
    </section>
  );
}
