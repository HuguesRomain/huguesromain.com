import Image from "next/image";
import type { Profile, Project } from "@/content/types";
import { Card } from "./card";
import { Section } from "./section";

type ProjectIcon = {
  image?: string;
  background: string;
  padding?: string;
};

const ICONS: Record<string, ProjectIcon> = {
  aiorigin: {
    image: "/images/projects/aiorigin-logo.png",
    background: "#050e28",
  },
  sinea: {
    image: "/images/projects/sinea-mascot.png",
    background: "linear-gradient(160deg, #cdeef4, #f7d9ec)",
    padding: "p-1",
  },
  axiome: {
    background: "linear-gradient(160deg, #e8500f, #ff8a4d)",
  },
  ida: {
    image: "/images/projects/ida-icon.png",
    background: "#fdf3ef",
    padding: "p-1.5",
  },
};

function ProjectCard({ project }: { project: Project }) {
  const icon = ICONS[project.slug];
  return (
    <Card className="bento-hover flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-surface-border ${icon?.padding ?? ""}`}
          style={{ background: icon?.background ?? "var(--surface)" }}
        >
          {icon?.image ? (
            <Image
              src={icon.image}
              alt=""
              width={48}
              height={48}
              className="size-full object-contain"
            />
          ) : (
            <span className="text-[16px] font-semibold text-white">A</span>
          )}
        </span>
        <span className="shrink-0 text-[12px] text-text-muted">
          {project.period}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em]">
          {project.title}
        </h3>
        <p className="text-[13px] font-medium text-text-muted">
          {project.role}
        </p>
      </div>
      <p className="text-[14px] leading-[1.55] text-text-muted">
        {project.context}
      </p>
    </Card>
  );
}

export function Projects({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  return (
    <Section id="projects" title={fr ? "Projets" : "Projects"}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {profile.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <p className="text-[13px] leading-[1.6] text-text-muted">
        {fr
          ? "Également en freelance pour Savoir, Lead Genius, Teamway, Champagne Dupont, HomeExchange et Aleteia."
          : "Also worked freelance for Savoir, Lead Genius, Teamway, Champagne Dupont, HomeExchange and Aleteia."}
      </p>
    </Section>
  );
}
