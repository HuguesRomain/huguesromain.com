import type { Profile } from "./types";
import { TODO_BOOKING_URL, TODO_LINKEDIN_URL } from "./profile.fr";

export const profileEn: Profile = {
  locale: "en",
  name: "Hugues Romain",
  tagline:
    "Freelance full-stack & AI engineer · architecture, AI agents, end-to-end web & mobile products · Nice",
  heroFirstName: "Hugues",
  heroLastName: "Romain",
  sections: {
    work: { label: "001 / WORK", title: "Selected work" },
    stack: { label: "002 / STACK", title: "Stack" },
    about: { label: "003 / ABOUT", title: "About" },
    contact: { label: "004 / CONTACT", title: "Contact" },
  },
  projects: [
    {
      slug: "aiorigin",
      title: "aiOrigin",
      role: "Co-founder & Lead Engineer",
      period: "2026 — present",
      context:
        "Multi-tenant SaaS platform for autonomous AI agents in the enterprise.",
      bullets: [
        "Designed and built end to end: fully async FastAPI backend, React / TypeScript frontend, Docker infrastructure, PostgreSQL, Redis, Temporal Cloud",
        "Multi-provider agent loop (Claude Agent SDK + LiteLLM): 4 interchangeable LLM providers, semantic tool selection across 850+ OAuth-connected apps",
        "Token-by-token real-time streaming (Redis Streams → SSE → React): idempotent sequenced events, crash-resume",
      ],
      image: "/images/work-aiorigin.webp",
      imageAlt: "Classical marble sculpture in profile, lit against black",
    },
    {
      slug: "sinea",
      title: "Sinea Formation",
      role: "Lead Full-Stack Engineer",
      period: "2025 — present",
      context: "B2B platform helping employees develop their soft skills.",
      bullets: [
        "Built and led three codebases: Expo / React Native mobile app, NestJS + Prisma + PostgreSQL API, React back office",
        "Shipped to the App Store and Play Store (EAS builds) on a sustained release cadence",
        "Campaign and challenge engine: progress tracking, badges, text / audio / video feedback transcribed with Deepgram",
      ],
      image: "/images/work-sinea.webp",
      imageAlt: "Steel lattice structure against a black sky",
    },
    {
      slug: "axiome",
      title: "Axiome App Studio",
      role: "Founder & Product Engineer",
      period: "2025 — present",
      context: "Consumer mobile app studio, designed and operated solo.",
      bullets: [
        "5 apps designed, built and shipped: Belle, Koji, Tanzy, KnuckleMax, Teacherz (Expo, strict TypeScript, Supabase, Superwall)",
        "AI in production: vision-model image analysis, personalised onboarding, auto-detected FR / EN / ES / IT localisation",
        "Industrialised release chain and PostHog analytics across the portfolio: funnels, activation, retention",
      ],
      image: "/images/work-axiome.webp",
      imageAlt: "Macro shot of a printed circuit board in raking light",
    },
    {
      slug: "ida",
      title: "Ida",
      role: "Full-Stack Engineer (freelance)",
      period: "2024 — 2025",
      context:
        "B2B ordering platform for fresh produce serving neighbourhood grocery stores.",
      bullets: [
        "Designed and built the core ordering and fresh-product management features (FastAPI, React)",
        "Dynamic price list: real-time pricing, packaging units, business rules reacting to stock movements",
        "Day-to-day tech team coordination: code reviews, agile rituals",
      ],
      image: "/images/work-ida.webp",
      imageAlt: "Wind-sculpted dune ridge in darkness",
    },
    {
      slug: "thetribe",
      title: "theTribe",
      role: "Full-Stack Engineer (freelance)",
      period: "2025 — 2026",
      context:
        "Full-stack missions through theTribe, a French product agency, for several of its clients.",
      bullets: [
        "Teamway — Workplace 365 mobile app (React Native): features, fixes and iOS / Android releases",
        "HomeExchange Day — event platform (React, Express, PostgreSQL): Luma integration, host / guest registration flows",
        "Aleteia — online media (Next.js, GraphQL): rebuilt archive pages and header, Algolia search, i18n, CSS migration to Tailwind",
      ],
      image: "/images/projects/thetribe-logo.png",
      imageAlt: "theTribe logo",
    },
  ],
  stack: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
    {
      label: "Front",
      items: [
        "React",
        "Next.js",
        "React Native / Expo",
        "TanStack Query",
        "Zustand",
        "Tailwind CSS",
        "Radix UI",
      ],
    },
    {
      label: "Back",
      items: [
        "FastAPI",
        "NestJS",
        "Node.js",
        "PostgreSQL / Supabase",
        "Prisma",
        "Redis",
        "pgvector",
        "REST & SSE",
      ],
    },
    {
      label: "AI & agents",
      items: [
        "Claude Agent SDK",
        "MCP",
        "LiteLLM",
        "RAG",
        "Multi-agent orchestration",
        "Temporal",
      ],
    },
    {
      label: "Infra",
      items: [
        "Docker",
        "Temporal Cloud",
        "Stripe",
        "Railway",
        "EAS / Expo",
        "GitHub Actions",
        "Sentry",
        "PostHog",
        "Langfuse",
      ],
    },
  ],
  about: {
    paragraphs: [
      "Independent full-stack engineer since 2024 through my company Axiome, I design and build web and mobile products end to end — from architecture to production. A HETIC graduate trained through work-study at Ouihelp, Alobees and Microdoing, I now co-found aiOrigin, a platform for autonomous AI agents in the enterprise.",
      "My ground: systems where AI meets real engineering — multi-provider agent loops, real-time streaming, durable workflows, mobile apps shipped solo. Based in Nice, working in French and English.",
    ],
    portrait: "/images/portrait.webp",
    portraitAlt: "Portrait of Hugues Romain",
    portraitHint: "HOVER TO RESOLVE",
  },
  contact: {
    intro:
      "An architecture to challenge, an agent to ship, a product to build end to end — write me, I answer fast.",
    email: "huguesromainpro@gmail.com",
    github: "https://github.com/huguesromain",
    linkedin: TODO_LINKEDIN_URL,
    booking: TODO_BOOKING_URL,
    bookingLabel: "Book a call",
  },
  chat: {
    placeholders: [
      "Are you available right now?",
      "What's your background?",
      "Where are you based, how do you work?",
      "What's it like working with you?",
    ],
    chips: [
      "Are you available right now?",
      "What's your background?",
      "Where are you based, how do you work?",
    ],
    panelTitle: "Chat with Hugues",
    youLabel: "You",
    meLabel: "Hugues · AI",
    stop: "Stop",
    clear: "Clear",
    retry: "Retry",
    errorNetwork: "Connection failed. Check your network and try again.",
    errorRateLimit:
      "Rate limit reached: 20 messages per hour. Come back later, or email me directly.",
    errorEmpty: "Empty response received. Ask again.",
    closeHint: "Esc to close",
    close: "Close the conversation",
    inputAriaLabel: "Talk with Hugues — ask him your question",
    sendAriaLabel: "Send the question",
    panelAriaLabel: "Chat with Hugues (AI version)",
  },
  footer: "BUILT WITH NEXT.JS · NO TEMPLATE",
};
