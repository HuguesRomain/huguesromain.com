"use client";

import { useState } from "react";
import type { Project } from "@/content/types";
import { AsciiImage } from "@/components/ascii/ascii-image";
import { CornerFrame } from "@/components/ui/corner-frame";

export function WorkCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-full rounded-[4px] bg-bg-panel"
    >
      <CornerFrame className="flex h-full flex-col gap-5 p-5">
        <AsciiImage
          src={project.image}
          alt={project.imageAlt}
          cellSize={8}
          speed={hovered ? 2.2 : 1}
          className="relative aspect-[16/10] w-full"
          sizes="(min-width: 768px) 40vw, 90vw"
        />
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-mono text-[13px] uppercase tracking-[0.08em] text-text">
            {project.title}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
            {project.period}
          </span>
        </div>
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-muted">
          {project.role}
        </p>
        <p className="font-mono text-[13px] leading-[1.7] text-text-muted">
          {project.context}
        </p>
        <ul className="mt-auto flex flex-col gap-2.5">
          {project.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 font-mono text-[12px] leading-[1.6] text-text-muted"
            >
              <span aria-hidden className="mt-[1px] text-accent">
                /
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </CornerFrame>
    </article>
  );
}
