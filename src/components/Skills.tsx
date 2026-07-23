"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={t.skills.index} eyebrow={t.skills.eyebrow} />
        <RevealTitle
          text={t.skills.title}
          className="mb-16 font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-tight tracking-tight"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Grupos de aptitudes */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {t.skills.groups.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.08}>
                  <h3 className="mb-4 border-b border-line pb-2 font-display text-xl">
                    {g.title}
                  </h3>
                  <ul className="space-y-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-ink-soft"
                      >
                        <span className="mt-1.5 text-terracotta">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* Extras */}
            <Reveal delay={0.15}>
              <h3 className="mb-4 mt-12 border-b border-line pb-2 font-display text-xl">
                {t.skills.extrasTitle}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {t.skills.extras.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-line bg-cream-deep px-4 py-2 text-sm text-ink-soft"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Idiomas */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="mb-6 font-display text-2xl">
                {t.skills.languagesTitle}
              </h3>
              <div className="space-y-6">
                {t.skills.languages.map((l, i) => (
                  <div key={l.name}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="font-display text-lg">{l.name}</span>
                      <span className="text-xs uppercase tracking-widest text-muted">
                        {l.level}
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="h-full rounded-full bg-terracotta"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.2 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
