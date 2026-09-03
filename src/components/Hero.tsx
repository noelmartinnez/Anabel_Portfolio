"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { portraitPiece } from "@/content/projects";

/**
 * Portada de revista, pero corta a propósito: el nombre, una presentación
 * breve y el retrato. En cuanto termina, ya asoma la rejilla: el protagonista
 * es el trabajo.
 */
export function Hero() {
  const { t } = useI18n();
  const a = t.about;

  const line = {
    hidden: { y: "115%" },
    visible: { y: 0 },
  };

  /** Entrada suave para cada bloque de la presentación. */
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        {/*
          Tres hijos sueltos, no un bloque de texto y una foto: en movil el
          retrato tiene que caer entre el nombre y la presentacion. En `lg` la
          colocacion automatica devuelve la maqueta de siempre — nombre y
          presentacion en dos filas a la izquierda, retrato a la derecha
          ocupandolas las dos.
        */}
        <div className="grid grid-cols-1 items-center gap-8 py-10 lg:grid-cols-12 lg:gap-12">
          <h1 className="text-center font-display text-[clamp(2.6rem,8.2vw,7.2rem)] font-medium leading-[0.9] tracking-tight sm:text-left lg:col-span-8">
            {t.hero.name.map((part, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {part}
                </motion.span>
              </span>
            ))}
          </h1>

          {portraitPiece && (
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-[70%] sm:mx-0 sm:w-auto lg:col-span-4 lg:row-span-2 lg:self-center"
            >
              <Image
                src={portraitPiece.src}
                alt="Anabel Pérez"
                width={portraitPiece.w}
                height={portraitPiece.h}
                preload
                placeholder="blur"
                blurDataURL={portraitPiece.blur}
                quality={90}
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 33vw"
                className="w-full rounded-[2px] object-cover"
              />
              <div className="pointer-events-none absolute inset-3 border border-cream/40" />
            </motion.div>
          )}

          <div className="mx-auto max-w-3xl text-center text-[0.95rem] leading-[1.95] tracking-[0.01em] text-ink-soft sm:mx-0 sm:text-left lg:col-span-8">
            {a.intro.map((text, i) => (
              <motion.p key={i} className="mb-6" {...fade(0.55 + i * 0.1)}>
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
