"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { projects, type Project } from "@/content/projects";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const spanClass: Record<Project["span"], string> = {
  tall: "row-span-2 aspect-[3/4]",
  wide: "sm:col-span-2 aspect-[16/10]",
  regular: "aspect-[4/3]",
};

export function Gallery() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={t.work.index} eyebrow={t.work.eyebrow} />

        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <RevealTitle
            text={t.work.title}
            className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-tight tracking-tight lg:col-span-8"
          />
          <Reveal
            as="p"
            delay={0.1}
            className="self-end text-ink-soft lg:col-span-4"
          >
            {t.work.intro}
          </Reveal>
        </div>

        <div className="grid auto-rows-[1fr] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal
              key={p.id}
              delay={(i % 3) * 0.08}
              className={spanClass[p.span]}
            >
              <button
                onClick={() => setActive(p)}
                data-cursor="hover"
                className="group relative h-full w-full overflow-hidden rounded-[2px] text-left"
              >
                <Tile project={p} lang={lang} />
                {/* Overlay al hover */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="translate-y-3 text-xs uppercase tracking-[0.25em] text-cream/80 transition-transform duration-500 group-hover:translate-y-0">
                    {p.category[lang]}
                  </span>
                  <span className="translate-y-3 font-display text-2xl text-cream transition-transform delay-75 duration-500 group-hover:translate-y-0">
                    {p.title[lang]}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-3 text-sm italic text-muted">
            <span className="h-px w-8 bg-line" />
            {t.work.note}
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2px] bg-cream"
            >
              <div className="relative aspect-[16/10] w-full">
                <Tile project={active} lang={lang} big />
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="eyebrow mb-1">{active.category[lang]}</p>
                  <h4 className="font-display text-2xl">{active.title[lang]}</h4>
                </div>
                <button
                  onClick={() => setActive(null)}
                  data-cursor="hover"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg transition-colors hover:bg-ink hover:text-cream"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Tile({
  project,
  lang,
  big = false,
}: {
  project: Project;
  lang: "es" | "en";
  big?: boolean;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.title[lang]}
        fill
        sizes={big ? "768px" : "(max-width:640px) 100vw, 33vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }
  // Placeholder editorial
  return (
    <div
      className={`flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-105 ${
        project.accent
          ? "bg-gradient-to-br from-terracotta to-terracotta-deep"
          : "bg-gradient-to-br from-sand to-sand-deep"
      }`}
    >
      <span
        className={`font-display text-5xl ${
          project.accent ? "text-cream/70" : "text-ink/40"
        }`}
      >
        {project.title[lang].charAt(0)}
      </span>
    </div>
  );
}
