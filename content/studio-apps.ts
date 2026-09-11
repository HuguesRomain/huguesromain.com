import type { Locale } from "./types";

export type StudioApp = {
  slug: "belle" | "knucklemax" | "koji";
  name: string;
  icon: string;
  url: string;
  description?: string;
};

const APPS: Record<
  Locale,
  readonly StudioApp[]
> = {
  fr: [
    {
      slug: "belle",
      name: "Belle",
      icon: "/images/apps/belle-icon.png",
      url: "https://belle.axiomestudio.com/fr",
      description: "Conseillère beauté IA",
    },
    {
      slug: "knucklemax",
      name: "KnuckleMax",
      icon: "/images/apps/knucklemax-icon.png",
      url: "https://knucklemax.axiomestudio.com/fr",
    },
    {
      slug: "koji",
      name: "Koji",
      icon: "/images/apps/koji-icon.png",
      url: "https://koji.axiomestudio.com/fr",
      description: "Santé intestinale",
    },
  ],
  en: [
    {
      slug: "belle",
      name: "Belle",
      icon: "/images/apps/belle-icon.png",
      url: "https://belle.axiomestudio.com/en",
      description: "AI beauty advisor",
    },
    {
      slug: "knucklemax",
      name: "KnuckleMax",
      icon: "/images/apps/knucklemax-icon.png",
      url: "https://knucklemax.axiomestudio.com/en",
    },
    {
      slug: "koji",
      name: "Koji",
      icon: "/images/apps/koji-icon.png",
      url: "https://koji.axiomestudio.com/en",
      description: "Gut health",
    },
  ],
};

export function getStudioApps(locale: Locale): readonly StudioApp[] {
  return APPS[locale];
}
