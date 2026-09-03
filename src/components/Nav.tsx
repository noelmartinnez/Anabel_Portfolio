"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#clientes", label: t.nav.work },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line/60 bg-cream/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-base leading-none tracking-[0.02em] sm:text-lg"
        >
          Anabel Pérez Lara
        </Link>

        {/* En movil no hay menu: la web es de scroll unico y el nombre ya lleva al inicio. */}
        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                data-cursor="hover"
                className="group relative text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <LangToggle lang={lang} setLang={setLang} />
      </nav>
    </motion.header>
  );
}

function LangToggle({
  lang,
  setLang,
}: {
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
}) {
  return (
    // El `mr-2` de movil es compensacion optica: la pildora tiene borde y a
    // los mismos 20 px del `px-5` parece mas pegada al canto que el nombre.
    <div className="mr-2 flex items-center rounded-full border border-line bg-cream/50 p-0.5 text-xs sm:mr-0">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative rounded-full px-3 py-1 uppercase tracking-widest transition-colors ${
            lang === l ? "text-cream" : "text-ink-soft hover:text-ink"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-ink"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{l}</span>
        </button>
      ))}
    </div>
  );
}
