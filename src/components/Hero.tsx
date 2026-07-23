"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line = {
    hidden: { y: "115%" },
    visible: { y: 0 },
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      {/* Marca de edición estilo revista */}
      <motion.div
        style={{ y: yText }}
        className="mx-auto flex w-full max-w-7xl items-center justify-between text-xs uppercase tracking-[0.28em] text-muted"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {t.hero.edition} · Elche
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {t.hero.issue}
        </motion.span>
      </motion.div>

      <hr className="hairline mx-auto mt-4 w-full max-w-7xl" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 py-8 lg:grid-cols-12">
        {/* Titular */}
        <motion.div style={{ y: yText }} className="lg:col-span-7">
          <p className="eyebrow mb-5">{t.hero.role}</p>
          <h1 className="font-display text-[clamp(3.4rem,12vw,10rem)] font-medium leading-[0.92] tracking-tight">
            {t.hero.name.map((part, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {part}
                  {i === t.hero.name.length - 1 && (
                    <span className="text-terracotta">.</span>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            {t.hero.tagline}
          </motion.p>
        </motion.div>

        {/* Retrato */}
        <div className="lg:col-span-5">
          <motion.div
            style={{ y: yPortrait }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm"
          >
            <div className="absolute inset-0 rounded-[2px] bg-gradient-to-br from-sand to-sand-deep" />
            {/* Placeholder de retrato — sustituir por <Image /> con la foto real */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ink/20">
                <span className="font-display text-2xl text-ink/50">A</span>
              </div>
              <span className="px-6 text-xs uppercase tracking-[0.25em] text-ink/45">
                Foto editorial
              </span>
            </div>
            {/* Marco fino */}
            <div className="pointer-events-none absolute inset-3 border border-cream/40" />
          </motion.div>
        </div>
      </div>

      {/* Marquee inferior */}
      <motion.div
        style={{ opacity: fade }}
        className="mx-auto w-full max-w-7xl overflow-hidden border-y border-line py-3"
      >
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <span key={rep} className="flex items-center">
              {t.hero.marquee.map((word, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-6 font-display text-xl text-ink-soft">
                    {word}
                  </span>
                  <span className="text-terracotta">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        style={{ opacity: fade }}
        className="mx-auto mt-6 flex w-full max-w-7xl items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        {t.hero.scroll}
      </motion.div>
    </section>
  );
}
