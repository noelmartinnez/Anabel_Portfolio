"use client";

import type { Piece } from "@/content/projects";

/** Reproductor sobrio: sin autoplay, con póster y sin descargar nada hasta que se pide. */
export function VideoPiece({ piece, title }: { piece: Piece; title: string }) {
  return (
    <video
      controls
      preload="none"
      poster={piece.poster}
      playsInline
      aria-label={title}
      style={{ aspectRatio: `${piece.w} / ${piece.h}` }}
      className="w-full rounded-[2px] bg-ink"
    >
      <source src={piece.src} type="video/mp4" />
    </video>
  );
}
