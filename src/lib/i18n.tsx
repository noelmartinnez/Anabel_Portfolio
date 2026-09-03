"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { es } from "@/content/es";
import { en } from "@/content/en";
import type { Content } from "./../content/types";

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

/**
 * El idioma vive en un pequeño store externo (localStorage + preferencia del
 * navegador) en lugar de en un `useState` sincronizado por efecto: así el
 * primer render del cliente ya trae el idioma correcto.
 */
let current: Lang | null = null;
const listeners = new Set<() => void>();

function read(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // Modo privado o almacenamiento bloqueado: seguimos con el idioma del navegador.
  }
  return navigator.language?.startsWith("en") ? "en" : "es";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Lang {
  if (current === null) current = read();
  return current;
}

/** En el servidor no hay preferencia: se prerenderiza en español. */
function getServerSnapshot(): Lang {
  return "es";
}

function publish(next: Lang) {
  if (current === next) return;
  current = next;
  for (const listener of listeners) listener();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Reflejar el idioma en <html lang> y persistirlo: sistemas externos a React.
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Si no se puede persistir, el idioma sigue funcionando en esta sesión.
    }
  }, [lang]);

  const setLang = (l: Lang) => publish(l);
  const toggle = () => publish(getSnapshot() === "es" ? "en" : "es");

  return (
    <I18nContext.Provider
      value={{ lang, t: dictionaries[lang], setLang, toggle }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
