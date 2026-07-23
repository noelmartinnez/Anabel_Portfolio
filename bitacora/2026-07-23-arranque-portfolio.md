# 2026-07-23 — Arranque del portfolio

## Contexto

Se crea desde cero un portfolio **sorprendente y creativo** para Anabel Pérez Lara,
estudiante de Publicidad y Relaciones Públicas y Community Manager, apasionada de la
moda. El objetivo es mostrar quién es, su experiencia, sus datos y sus trabajos, con
una estética que no sea básica.

## Decisiones tomadas (con el usuario)

| Decisión | Elección | Motivo |
|----------|----------|--------|
| **Estética** | Editorial / revista de moda | Encaja con Publicidad + pasión por la moda |
| **Paleta** | Cálida / nude (crema, arena, terracota) | Sofisticada y femenina |
| **Tecnología** | Next.js 16 + React 19 + Motion (Framer Motion) + Tailwind v4 | Animaciones ricas y despliegue sencillo |
| **Idioma** | Bilingüe ES/EN con selector | Alcance internacional |
| **Contenido** | Trabajos reales (los aportará el usuario); placeholders mientras tanto | — |
| **Despliegue** | Vercel / Netlify (gratis) | Dominio propio fácil |

## Cambios realizados

- **Scaffold**: proyecto Next.js con TypeScript, Tailwind v4, ESLint, App Router y `src/`.
  Instalada la librería de animación `motion`.
- **Sistema de diseño** (`src/app/globals.css`): tokens de color nude, tipografías
  editoriales (Playfair Display display + Jost sans vía `next/font`), estilos base,
  marquee, cursor personalizado y soporte de `prefers-reduced-motion`.
- **i18n** (`src/lib/i18n.tsx`): contexto de idioma ES/EN con persistencia en
  `localStorage` y detección del idioma del navegador.
- **Contenido** (`src/content/`): `es.ts` y `en.ts` con todo el copy (bio, experiencia,
  formación, aptitudes, idiomas, extras, contacto), `types.ts` con el tipado y
  `projects.ts` con los metadatos de la galería (con placeholders).
- **Componentes** (`src/components/`): `Nav` (con selector de idioma animado), `Hero`
  (portada de revista con parallax), `About`, `Experience` (timeline), `Gallery`
  (rejilla + lightbox), `Education`, `Skills` (barras de idiomas animadas), `Contact`
  (contraportada), más utilidades `Reveal` (animaciones de scroll), `RevealTitle`,
  `SectionHeading` y `Cursor`.
- **Ensamblaje** (`src/app/page.tsx`, `layout.tsx`): página única con scroll narrativo
  y metadata/SEO.

## Estado

- ✅ `npm run build` pasa sin errores.
- ✅ `npm run dev` sirve el sitio (HTTP 200) con el contenido correcto.
- ⏳ Pendiente de verificación visual completa en navegador.

## Pendiente

- Sustituir los **placeholders** de la galería por trabajos reales de Anabel.
- Añadir la **foto editorial** real en el Hero y en Sobre mí.
- Confirmar tipografías si hay preferencia distinta.
- Desplegar en Vercel/Netlify.
