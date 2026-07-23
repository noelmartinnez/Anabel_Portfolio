"use client";

import { useI18n } from "@/lib/i18n";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const { t } = useI18n();
  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-cream-deep px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={t.experience.index} eyebrow={t.experience.eyebrow} />
        <RevealTitle
          text={t.experience.title}
          className="mb-16 font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-tight tracking-tight"
        />

        <ol className="relative">
          {t.experience.items.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 0.05}>
              <div className="group grid grid-cols-1 gap-4 border-t border-line py-8 transition-colors hover:bg-cream/60 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="text-sm font-medium text-terracotta-deep">
                    {item.period}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted">
                    {item.mode}
                  </p>
                </div>

                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-2xl leading-tight md:text-3xl">
                      {item.role}
                    </h3>
                    <span className="text-ink-soft">— {item.company}</span>
                  </div>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line bg-cream px-3 py-1 text-xs uppercase tracking-wider text-ink-soft"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </ol>
      </div>
    </section>
  );
}
