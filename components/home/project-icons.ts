export type ProjectIcon = {
  image?: string;
  background: string;
  padding?: string;
};

export const PROJECT_ICONS: Record<string, ProjectIcon> = {
  stratbuy: {
    image: "/images/projects/stratbuy-icon.png",
    background: "#000000",
  },
  recto: {
    image: "/images/projects/recto-icon.png",
    background: "#1e1d19",
  },
  aiorigin: {
    image: "/images/projects/aiorigin-logo.png",
    background: "#050e28",
  },
  sinea: {
    image: "/images/projects/sinea-mascot.png",
    background: "linear-gradient(160deg, #cdeef4, #f7d9ec)",
    padding: "p-1",
  },
  belle: {
    image: "/images/apps/belle-icon.png",
    background: "#ffffff",
  },
  axiome: {
    image: "/images/projects/axiome-mark.png",
    background: "#f3e6ea",
  },
  ida: {
    image: "/images/projects/ida-icon.png",
    background: "#fdf3ef",
    padding: "p-1.5",
  },
  thetribe: {
    image: "/images/projects/thetribe-logo.png",
    background: "#01012b",
    padding: "p-1.5",
  },
  microdoing: {
    image: "/images/projects/microdoing-logo.png",
    background: "#0d0d37",
  },
  alobees: {
    image: "/images/projects/alobees-logo.png",
    background: "#ffffff",
    padding: "p-1",
  },
  ouihelp: {
    image: "/images/projects/ouihelp-logo.png",
    background: "#ffffff",
    padding: "p-1",
  },
};
