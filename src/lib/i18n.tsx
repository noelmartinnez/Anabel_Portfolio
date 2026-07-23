"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { es } from "@/content/es";
import { en } from "@/content/en";
import type { Content } from "@/content/types";

export type Lang = "es" | "en";

const dictionaries: Record<Lang, Content> = { es, en };

type I18nValue = {
  lang: Lang;
  t: Content;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "anabel-portfolio-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Cargar preferencia guardada / idioma del navegador tras el montaje
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "es" || stored === "en") {
      setLangState(stored);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.language.startsWith("en")) {
      setLangState("en");
    }
  }, []);

  // Reflejar el idioma en <html lang> y persistir
  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((l) => (l === "es" ? "en" : "es"));

  return (
    <I18nContext.Provider value={{ lang, t: dictionaries[lang], setLang, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
