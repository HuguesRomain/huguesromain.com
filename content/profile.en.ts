import { CALENDLY_URL, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import type { Profile } from "./types";

export const profileEn: Profile = {
  locale: "en",
  name: "Hugues Romain",
  tagline:
    "Freelance software engineer & AI architect · AI workflows and agents, end-to-end web & mobile products · Nice",
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
      slug: "microdoing",
      title: "Microdoing",
      role: "Full-Stack Engineer (work-study)",
      period: "2022 — 2023",
      context:
        "React Native product, ported to the web with Expo for Web.",
      bullets: [
        "Designed and built a gamification feature that lifted user engagement and adoption by 20%",
        "Ported the React Native mobile app to the web with Expo for Web",
        "Reorganised the team (code reviews, sprints, daily rituals, retrospectives) to cut the production error rate",
      ],
      image: "/images/projects/microdoing-logo.png",
      imageAlt: "Microdoing logo",
    },
    {
      slug: "alobees",
      title: "Alobees",
      role: "Full-Stack Engineer (work-study)",
      period: "2021 — 2022",
      context:
        "Interactive site-planning tool for construction professionals.",
      bullets: [
        "Rearchitected the web and mobile front ends, unified around an atomic design system",
        "Interactive site-planning tool for construction professionals",
        "Removed UX friction from sign-up and login flows",
      ],
      image: "/images/projects/alobees-logo.png",
      imageAlt: "Alobees logo",
    },
    {
      slug: "ouihelp",
      title: "Ouihelp",
      role: "Front-End Engineer (work-study)",
      period: "2019 — 2021",
      context:
        "Client portal and location tools for families, beneficiaries and caregivers.",
      bullets: [
        "Smart location feature to identify the caregivers closest to each beneficiary",
        "Reworked state management: Redux replaced with React hooks and contexts",
        "Client portal simplifying access to Ouihelp services for families",
      ],
      image: "/images/projects/ouihelp-logo.png",
      imageAlt: "Ouihelp logo",
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
      "Software engineer and AI architect, freelance in Nice since 2024 through my company Axiome. I design and build web and mobile products end to end, and I ship AI workflows and agents. A HETIC graduate trained through work-study at Ouihelp, Alobees and Microdoing, I now co-found aiOrigin, a platform for autonomous AI agents in the enterprise.",
      "My ground: systems where AI meets real engineering — multi-provider agent loops, real-time streaming, durable workflows, mobile apps shipped solo. Based in Nice, working in French and English.",
    ],
    portrait: "/images/portrait.webp",
    portraitAlt: "Portrait of Hugues Romain",
    portraitHint: "HOVER TO RESOLVE",
  },
  contact: {
    intro:
      "An architecture to challenge, an agent to ship, a product to build end to end — write me, I answer fast.",
    email: CONTACT_EMAIL,
    github: GITHUB_URL,
    linkedin: LINKEDIN_URL,
    booking: CALENDLY_URL,
    bookingLabel: "Book a call",
  },
  chat: {
    promptHeading: "I'm here if you want to chat! 😁",
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
