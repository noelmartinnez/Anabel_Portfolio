"use client";

import { useI18n } from "@/lib/i18n";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={t.about.index} eyebrow={t.about.eyebrow} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealTitle
              text={t.about.title}
              className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-medium leading-[1.08] tracking-tight"
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {t.about.body.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.08}>
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-line bg-line">
                {t.about.facts.map((f) => (
                  <div key={f.label} className="bg-cream p-6">
                    <dt className="eyebrow mb-2">{f.label}</dt>
                    <dd className="font-display text-xl leading-snug">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
