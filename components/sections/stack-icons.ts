import type { SimpleIcon } from "simple-icons";
import {
  siClaude,
  siDocker,
  siExpo,
  siFastapi,
  siGithubactions,
  siJavascript,
  siModelcontextprotocol,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPosthog,
  siPrisma,
  siPython,
  siRadixui,
  siRailway,
  siReact,
  siReactquery,
  siRedis,
  siSentry,
  siStripe,
  siTailwindcss,
  siTemporal,
  siTypescript,
} from "simple-icons";

const stackIconMap: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  React: siReact,
  "Next.js": siNextdotjs,
  "React Native / Expo": siExpo,
  "TanStack Query": siReactquery,
  "Tailwind CSS": siTailwindcss,
  "Radix UI": siRadixui,
  FastAPI: siFastapi,
  NestJS: siNestjs,
  "Node.js": siNodedotjs,
  "PostgreSQL / Supabase": siPostgresql,
  Prisma: siPrisma,
  Redis: siRedis,
  "Claude Agent SDK": siClaude,
  MCP: siModelcontextprotocol,
  Temporal: siTemporal,
  Docker: siDocker,
  "Temporal Cloud": siTemporal,
  Stripe: siStripe,
  Railway: siRailway,
  "EAS / Expo": siExpo,
  "GitHub Actions": siGithubactions,
  Sentry: siSentry,
  PostHog: siPosthog,
};

export function getStackIcon(item: string): SimpleIcon | null {
  return stackIconMap[item] ?? null;
}

export function getStackInitial(item: string): string {
  return item.charAt(0).toUpperCase();
}
