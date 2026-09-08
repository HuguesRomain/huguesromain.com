import Image from "next/image";
import type { Profile, Project } from "@/content/types";
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

function ProjectRow({ project }: { project: Project }) {
  const icon = ICONS[project.slug];
  return (
    <li>
      <div className="group -mx-3 flex items-start gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-surface">
        <span
          className={`flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-surface-border ${icon?.padding ?? ""}`}
          style={{ background: icon?.background ?? "var(--surface)" }}
        >
          {icon?.image ? (
            <Image
              src={icon.image}
              alt=""
              width={44}
              height={44}
              className="size-full object-contain"
            />
          ) : (
            <span className="text-[15px] font-semibold text-white">A</span>
          )}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
              {project.title}
            </h3>
            <span className="shrink-0 text-[12px] text-text-muted">
              {project.period}
            </span>
          </div>
          <p className="text-[13px] font-medium text-text-muted">
            {project.role}
          </p>
          <p className="text-[14px] leading-[1.55] text-text-muted">
            {project.context}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Projects({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  return (
    <Section id="projects" title={fr ? "Projets" : "Projects"}>
      <ul className="flex flex-col gap-1">
        {profile.projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ul>
      <p className="text-[13px] leading-[1.6] text-text-muted">
        {fr
          ? "Également en freelance pour Savoir, Lead Genius, Teamway, Champagne Dupont, HomeExchange et Aleteia."
          : "Also worked freelance for Savoir, Lead Genius, Teamway, Champagne Dupont, HomeExchange and Aleteia."}
      </p>
    </Section>
  );
}
