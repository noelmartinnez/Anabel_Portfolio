"use client";

import { useI18n } from "@/lib/i18n";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const { t } = useI18n();
  return (
    <section
      id="education"
      className="scroll-mt-24 bg-cream-deep px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={t.education.index} eyebrow={t.education.eyebrow} />
        <RevealTitle
          text={t.education.title}
          className="mb-14 font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-tight tracking-tight"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.education.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-[2px] border border-line bg-cream p-8 transition-colors hover:border-terracotta/50">
                <span className="font-display text-5xl text-line transition-colors group-hover:text-sand-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-tight">
                  {item.school}
                </h3>
                <p className="mt-2 text-ink-soft">{item.degree}</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                  <span className="tracking-wide text-ink">{item.period}</span>
                  {item.note && (
                    <span className="text-xs uppercase tracking-widest text-terracotta-deep">
                      {item.note}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
