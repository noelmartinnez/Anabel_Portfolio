"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Piece } from "@/content/projects";

type LightboxProps = {
  /** Piezas navegables, en el mismo orden en que se ven en la página. */
  pieces: Piece[];
  /** Índice abierto, o null si está cerrado. */
  index: number | null;
  title: string;
  labels: { close: string; prev: string; next: string };
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Visor a pantalla completa. Existe porque las piezas se guardan a 2400–3000 px
 * y en la rejilla no se ven por encima de ~600: aquí es donde esa resolución
 * sirve para algo. Flechas y Escape para moverse, clic en el fondo para salir.
 */
export function Lightbox({
  pieces,
  index,
  title,
  labels,
  onClose,
  onNavigate,
}: LightboxProps) {
  const open = index !== null;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      onNavigate((index + step + pieces.length) % pieces.length);
    },
    [index, pieces.length, onNavigate],
  );

  // Teclado y bloqueo del scroll de fondo: sistemas externos, no estado de React.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, go, onClose]);

  // Se agrupan indice y pieza para que TypeScript estreche los dos a la vez.
  const current =
    index === null || !pieces[index] ? null : { i: index, piece: pieces[index] };
  const many = pieces.length > 1;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          <header className="flex shrink-0 items-center px-5 py-4 sm:px-8">
            {/* Con barra inferior el contador ya va ahi: aqui sobraria en movil. */}
            <Counter
              i={current.i}
              total={pieces.length}
              className={many ? "hidden sm:block" : undefined}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              data-cursor="hover"
              aria-label={labels.close}
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors hover:border-cream hover:text-cream"
            >
              <Icon d="M5 5l10 10M15 5L5 15" />
            </button>
          </header>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-20 sm:pb-6">
            {many && (
              <Arrow
                side="left"
                label={labels.prev}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current.piece.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-full items-center justify-center"
              >
                <Image
                  src={current.piece.src}
                  alt={title}
                  width={current.piece.w}
                  height={current.piece.h}
                  placeholder="blur"
                  blurDataURL={current.piece.blur}
                  quality={90}
                  sizes="100vw"
                  className="max-h-[calc(100dvh-13rem)] w-auto max-w-full object-contain sm:max-h-[calc(100dvh-9rem)]"
                />
              </motion.div>
            </AnimatePresence>

            {many && (
              <Arrow
                side="right"
                label={labels.next}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              />
            )}
          </div>

          {/* En movil las flechas no caben a los lados sin taparse con la
              lamina: bajan a una barra propia, con el dedo en mente. */}
          {many && (
            <div className="flex shrink-0 items-center justify-center gap-7 pb-6 sm:hidden">
              <TouchArrow
                side="left"
                label={labels.prev}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              />
              <Counter i={current.i} total={pieces.length} />
              <TouchArrow
                side="right"
                label={labels.next}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Counter({
  i,
  total,
  className = "",
}: {
  i: number;
  total: number;
  className?: string;
}) {
  return (
    <span
      className={`text-xs uppercase tracking-[0.18em] text-cream/50 ${className}`}
    >
      {String(i + 1).padStart(2, "0")}
      <span className="mx-2 text-cream/25">/</span>
      {String(total).padStart(2, "0")}
    </span>
  );
}

/**
 * Trazos dibujados en vez de glifos (`✕`, `←`): los tipograficos no van
 * centrados dentro de su caja y ademas cambian de forma segun la fuente del
 * sistema. Un `path` cae siempre en el centro exacto del boton.
 */
const ICONS = {
  left: "M12 4l-6 6 6 6",
  right: "M8 4l6 6-6 6",
} as const;

function Icon({ d }: { d: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const ARROW_STYLE =
  "h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors hover:border-cream hover:text-cream";

function Arrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      aria-label={label}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 sm:flex ${ARROW_STYLE} ${
        side === "left" ? "left-1 sm:left-6" : "right-1 sm:right-6"
      }`}
    >
      <Icon d={ICONS[side]} />
    </button>
  );
}

/** La misma flecha, pero en la barra inferior de movil. */
function TouchArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button onClick={onClick} aria-label={label} className={`flex ${ARROW_STYLE}`}>
      <Icon d={ICONS[side]} />
    </button>
  );
}
