"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Cursor personalizado editorial: un punto que sigue al ratón y un anillo
 * que lo persigue con retardo. Se agranda sobre elementos interactivos.
 * Sólo se activa en dispositivos con puntero fino (ratón).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='hover']")
      );
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px]"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-terracotta" />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        animate={{ scale: hovering ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        <div
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border transition-colors"
          style={{
            borderColor: hovering
              ? "var(--terracotta)"
              : "rgba(43,38,34,0.35)",
            backgroundColor: hovering ? "rgba(181,103,74,0.08)" : "transparent",
          }}
        />
      </motion.div>
    </>
  );
}
