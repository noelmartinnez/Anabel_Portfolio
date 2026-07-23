"use client";

import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
}: {
  index: string;
  eyebrow: string;
}) {
  return (
    <Reveal>
      <div className="mb-10 flex items-baseline gap-4">
        <span className="section-index">{index}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
    </Reveal>
  );
}
