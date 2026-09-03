"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { bySection, getMedia, type Section } from "@/content/projects";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Rejilla de portadas. Deliberadamente muda: la imagen no lleva nada encima y
 * el pie aparece al pasar el ratón, en un hueco ya reservado para que nada salte.
 * En pantallas sin hover el pie se ve siempre.
 */
export function WorkGrid({ section }: { section: Section }) {
  const { t, lang } = useI18n();
  const heading = t[section];
  const items = bySection(section);

  return (
    <section id={section} className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={heading.index} eyebrow={heading.eyebrow} />

        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <RevealTitle
            text={heading.title}
            className="text-center font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-medium leading-tight tracking-tight sm:text-left lg:col-span-7"
          />
          <Reveal as="p" delay={0.1} className="self-end text-center text-ink-soft sm:text-left lg:col-span-4 lg:col-start-9">
            {heading.intro}
          </Reveal>
        </div>

        {/* Columnas al estilo de un tablón: cada portada conserva su proporción */}
        <div className="gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
          {items.map((project, i) => {
            const cover = getMedia(project.slug)?.cover;
            if (!cover) return null;

            return (
              <Reveal
                key={project.slug}
                delay={(i % 3) * 0.06}
                className="mb-4 break-inside-avoid"
              >
                <Link
                  href={`/trabajo/${project.slug}`}
                  data-cursor="hover"
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-[2px] bg-cream-deep">
                    <Image
                      src={cover.src}
                      alt={project.title}
                      width={cover.w}
                      height={cover.h}
                      placeholder="blur"
                      blurDataURL={cover.blur}
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex items-baseline justify-between gap-4 pt-3 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                    <span className="font-display text-lg leading-none">
                      {project.title}
                    </span>
                    <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.15em] text-muted">
                      {project.subtitle[lang]}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
