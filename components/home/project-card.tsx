import Image from "next/image";
import Link from "next/link";
import { experienceHref } from "@/content/experience";
import type { Locale, Project } from "@/content/types";
import { Card } from "./card";
import { PROJECT_ICONS } from "./project-icons";

export function ProjectIconMark({
  slug,
  size = "card",
}: {
  slug: string;
  size?: "card" | "detail";
}) {
  const icon = PROJECT_ICONS[slug];
  const box = size === "detail" ? "size-14 rounded-[15px]" : "size-12 rounded-[13px]";
  const img = size === "detail" ? 56 : 48;
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden border border-surface-border ${box} ${icon?.padding ?? ""}`}
      style={{ background: icon?.background ?? "var(--surface)" }}
    >
      {icon?.image ? (
        <Image
          src={icon.image}
          alt=""
          width={img}
          height={img}
          className="size-full object-contain"
        />
      ) : (
        <span className="text-[16px] font-semibold text-white">A</span>
      )}
    </span>
  );
}

export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  return (
    <Link
      href={experienceHref(locale, project.slug)}
      className="block h-full cursor-pointer"
    >
      <Card className="bento-hover flex h-full flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <ProjectIconMark slug={project.slug} />
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
    </Link>
  );
}
