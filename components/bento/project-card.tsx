import Image from "next/image";
import type { Project } from "@/content/types";
import { BentoCard } from "./card";

type Visual = {
  background: string;
  image?: string;
  imageClass?: string;
  monogram?: string;
  monogramClass?: string;
};

const VISUALS: Record<string, Visual> = {
  aiorigin: {
    background: "#050e28",
    image: "/images/projects/aiorigin-logo.png",
    imageClass: "size-24 rounded-[22px]",
  },
  sinea: {
    background: "linear-gradient(160deg, #cdeef4, #f7d9ec)",
    image: "/images/projects/sinea-mascot.png",
    imageClass: "size-28 drop-shadow-lg",
  },
  axiome: {
    background: "linear-gradient(160deg, #e8500f, #ff8a4d)",
    monogram: "AXIOME",
    monogramClass: "text-white text-[2rem] tracking-[0.3em] pl-[0.3em]",
  },
  ida: {
    background: "#fdf3ef",
    image: "/images/projects/ida-logo.png",
    imageClass: "h-14 w-auto",
  },
};

export function ProjectCard({ project }: { project: Project }) {
  const visual = VISUALS[project.slug];
  return (
    <BentoCard hover className="col-span-6 sm:col-span-3">
      <div className="flex h-full flex-col">
        <div
          className="flex h-44 items-center justify-center"
          style={{ background: visual?.background ?? "var(--surface)" }}
        >
          {visual?.image ? (
            <Image
              src={visual.image}
              alt={project.title}
              width={200}
              height={200}
              className={`object-contain ${visual.imageClass ?? ""}`}
            />
          ) : visual?.monogram ? (
            <span
              className={`font-semibold ${visual.monogramClass ?? "text-6xl tracking-[-0.04em]"}`}
            >
              {visual.monogram}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
              {project.title}
            </h3>
            <span className="shrink-0 text-[12px] text-text-muted">
              {project.period}
            </span>
          </div>
          <p className="text-[13px] font-medium text-text-muted">
            {project.role}
          </p>
          <p className="text-[14px] leading-[1.55] text-text">
            {project.context}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
