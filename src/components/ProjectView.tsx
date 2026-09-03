"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  getMedia,
  neighbours,
  type Piece,
  type Project,
} from "@/content/projects";
import { Reveal } from "./Reveal";
import { VideoPiece } from "./VideoPiece";
import { Lightbox } from "./Lightbox";

/** Agrupa piezas consecutivas del mismo tipo para maquetar cada tanda a su manera. */
function runs(pieces: Piece[]) {
  const out: { kind: Piece["kind"]; items: Piece[] }[] = [];
  for (const piece of pieces) {
    const last = out[out.length - 1];
    if (last && last.kind === piece.kind) last.items.push(piece);
    else out.push({ kind: piece.kind, items: [piece] });
  }
  return out;
}

/** Piezas de un mismo PDF, en el orden en que se generaron. */
function groups(pieces: Piece[]) {
  const out: { key: string; items: Piece[] }[] = [];
  for (const piece of pieces) {
    const key = piece.group ?? "";
    const last = out[out.length - 1];
    if (last && last.key === key) last.items.push(piece);
    else out.push({ key, items: [piece] });
  }
  return out;
}

export function ProjectView({ project }: { project: Project }) {
  const { t, lang } = useI18n();
  const media = getMedia(project.slug);
  const pieces = media?.pieces ?? [];
  const { prev, next } = neighbours(project);

  // El visor recorre solo lo que es imagen: los videos se reproducen en linea.
  const viewable = pieces.filter((p) => p.kind !== "video");
  // Se guarda la tanda abierta, no solo el indice: en un dossier el visor
  // recorre las paginas del PDF pulsado, no las de todo el proyecto.
  const [open, setOpen] = useState<{ items: Piece[]; i: number } | null>(null);
  const openAt = (piece: Piece) =>
    setOpen({ items: viewable, i: viewable.indexOf(piece) });

  return (
    <article className="px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* ── Cabecera ────────────────────────────────────────────────── */}
        <Reveal>
          <Link
            href={`/#${project.section}`}
            data-cursor="hover"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            {t.project.back}
          </Link>
        </Reveal>

        {/* El enfoque no se rotula aqui: su etiqueta vive en la rejilla de la portada. */}
        <div className="mt-8 text-center">
          <Reveal>
            <h1 className="font-display text-[clamp(2.4rem,7vw,5rem)] font-medium leading-[0.98] tracking-tight">
              {project.title}
            </h1>
          </Reveal>
          {project.description && (
            <Reveal as="p" delay={0.1} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {project.description[lang]}
            </Reveal>
          )}
        </div>

        {/* ── Piezas ──────────────────────────────────────────────────── */}
        {project.dossier ? (
          // Documentos de lectura: en la pagina solo va la portada de cada uno
          // y las paginas se recorren en el visor, que es donde se leen.
          <div
            className={`mx-auto mt-20 grid grid-cols-1 gap-10 ${
              groups(pieces).length > 1 ? "max-w-5xl sm:grid-cols-2" : "max-w-2xl"
            }`}
          >
            {groups(pieces).map((group, g) => (
              <Reveal key={group.key} delay={(g % 2) * 0.08}>
                <button
                  type="button"
                  onClick={() => setOpen({ items: group.items, i: 0 })}
                  data-cursor="hover"
                  className="group block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-[2px] bg-cream-deep">
                    <Image
                      src={group.items[0].src}
                      alt={project.title}
                      width={group.items[0].w}
                      height={group.items[0].h}
                      placeholder="blur"
                      blurDataURL={group.items[0].blur}
                      quality={90}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                    />
                    {/* Las paginas siguientes, apenas insinuadas al borde. */}
                    <span className="pointer-events-none absolute inset-y-0 right-0 w-1.5 bg-ink/10" />
                  </div>
                  <span className="mt-3 flex items-baseline justify-between gap-4 text-[0.68rem] uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-ink">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden>⤢</span>
                      {t.project.openDossier}
                    </span>
                    <span className="shrink-0">
                      {group.items.length} {t.project.pages}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        ) : (
        <div className="mt-20 space-y-6">
          {runs(pieces).map((run, r) =>
            run.kind === "image" ? (
              // Las publicaciones y las fotos van de dos en dos: son verticales
              // y a pantalla completa quedarian enormes.
              <div key={r} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {run.items.map((piece, i) => (
                  <Reveal key={piece.src} delay={(i % 2) * 0.08}>
                    <Frame
                      piece={piece}
                      alt={project.title}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      onOpen={openAt}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              // Los slides de dossier y los videos piden ancho completo.
              <div key={r} className="mx-auto max-w-5xl space-y-6">
                {run.items.map((piece) => (
                  <Reveal key={piece.src}>
                    {piece.kind === "video" ? (
                      <VideoPiece piece={piece} title={project.title} />
                    ) : (
                      <Frame
                        piece={piece}
                        alt={project.title}
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        onOpen={openAt}
                      />
                    )}
                  </Reveal>
                ))}
              </div>
            ),
          )}
        </div>
        )}

        {/* ── Anterior / siguiente ────────────────────────────────────── */}
        <nav className="mt-24 grid grid-cols-2 gap-6 border-t border-line pt-8">
          <Link
            href={`/trabajo/${prev.slug}`}
            data-cursor="hover"
            className="group"
          >
            <span className="block text-xs uppercase tracking-[0.15em] text-muted">
              ← {t.project.prev}
            </span>
            <span className="mt-2 block font-display text-xl transition-colors group-hover:text-terracotta sm:text-2xl">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/trabajo/${next.slug}`}
            data-cursor="hover"
            className="group text-right"
          >
            <span className="block text-xs uppercase tracking-[0.15em] text-muted">
              {t.project.next} →
            </span>
            <span className="mt-2 block font-display text-xl transition-colors group-hover:text-terracotta sm:text-2xl">
              {next.title}
            </span>
          </Link>
        </nav>
      </div>

      <Lightbox
        pieces={open?.items ?? []}
        index={open?.i ?? null}
        title={project.title}
        labels={{
          close: t.project.close,
          prev: t.project.prev,
          next: t.project.next,
        }}
        onClose={() => setOpen(null)}
        onNavigate={(i) => setOpen((prev) => (prev ? { ...prev, i } : prev))}
      />
    </article>
  );
}

function Frame({
  piece,
  alt,
  sizes,
  onOpen,
}: {
  piece: Piece;
  alt: string;
  sizes: string;
  onOpen: (piece: Piece) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(piece)}
      data-cursor="hover"
      aria-label={alt}
      className="block w-full cursor-zoom-in overflow-hidden rounded-[2px] bg-cream-deep"
    >
      <Image
        src={piece.src}
        alt={alt}
        width={piece.w}
        height={piece.h}
        placeholder="blur"
        blurDataURL={piece.blur}
        quality={90}
        sizes={sizes}
        className="w-full"
      />
    </button>
  );
}
