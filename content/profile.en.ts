import { CALENDLY_URL, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import type { Profile } from "./types";

export const profileEn: Profile = {
  locale: "en",
  name: "Hugues Romain",
  tagline:
    "Freelance software engineer & AI specialist · AI workflows and agents, end-to-end web & mobile products · Nice",
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
      slug: "stratbuy",
      title: "StratBuy",
      role: "Product design, engineering & strategy (freelance)",
      period: "2026",
      context:
        "SaaS platform for managing procurement, which I build and support, from product to business strategy.",
      bullets: [
        "Product design: work on the procurement flows, from the sourcing file through tender and award to the contract",
        "Engineering: took over and hardened the Turborepo monorepo (Next.js, Auth.js, Prisma, PostgreSQL), documented architecture decisions, GitHub Actions CI, multi-organisation isolation and integration tests replayed on every change",
        "Business support: strategic choices alongside the team, sales demo narrative, preparation of the first beta",
      ],
      image: "/images/projects/stratbuy-icon.png",
      imageAlt: "StratBuy icon",
    },
    {
      slug: "sinea",
      title: "Sinea Formation",
      role: "Lead Full-Stack Engineer (freelance)",
      period: "2025 to 2026",
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
      slug: "aiorigin",
      title: "aiOrigin",
      role: "Founding Engineer",
      period: "2026",
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
      slug: "recto",
      title: "Recto AI",
      role: "Founder & Product Engineer",
      period: "Since 2026",
      context:
        "Mobile app that explains the hard passages of a book: photograph the page, highlight, and the AI explains and keeps the passage.",
      bullets: [
        "Designed and built solo: Expo / React Native, TypeScript, Supabase (PostgreSQL, Edge Functions), RevenueCat subscriptions",
        "Core flow: page photo, on-device text recognition (ML Kit), highlighting, AI explanation, a library of passages per book",
        "Interface in French, English and Simplified Chinese; app in preparation for the App Store",
      ],
      image: "/images/projects/recto-icon.png",
      imageAlt: "Recto AI icon",
    },
    {
      slug: "belle",
      title: "Belle",
      role: "Founder & Product Engineer",
      period: "Since 2025",
      context:
        "AI beauty advisor mobile app: one photo is enough to read skin, face, hair and style, then Belle builds an everyday routine.",
      bullets: [
        "Designed, built and shipped solo: Expo / React Native, strict TypeScript, Supabase (auth, PostgreSQL, storage, Edge Functions), RevenueCat subscriptions",
        "AI in production: vision-model photo analysis, Glow Score and palette, a daily routine tuned to weather and UV index",
        "Live on the App Store in French, English, Spanish and Italian; photos encrypted and deleted after 30 days",
      ],
      image: "/images/apps/belle-icon.png",
      imageAlt: "Belle icon",
    },
    {
      slug: "orbi",
      title: "Orbi",
      role: "Founder & Product Engineer",
      period: "Since 2026",
      context:
        "Prompting coach for companies that lives right inside teams' AI assistants and helps the whole company get better with AI, without ever reading conversations.",
      bullets: [
        "Designed, built and launched solo: MCP server with in-assistant widgets, Next.js dashboard, Supabase, Stripe billing, Microsoft 365 Copilot agent",
        "Prompt coaching at the right time, XP, 5 levels and 7 mastery dimensions, skills shared in an internal marketplace, aggregated manager views",
        "Go-to-market: reseller model for AI trainers, and an automated prospecting system to find prospects for Orbi and contact them with personalised messages",
      ],
      image: "/images/orbi/orbi-neutral.webp",
      imageAlt: "Orbi mascot",
    },
    {
      slug: "axiome",
      title: "Axiome App Studio",
      role: "Founder & Product Engineer",
      period: "Since 2025",
      context:
        "Axiome App Studio is my consumer mobile app studio. I spot a market, design the app, build and ship it solo, then measure what finds its audience.",
      bullets: [
        "The model: niche apps launched fast, each with a clear use, a channel to reach its users and a subscription",
        "The whole chain, solo: market research (Signal Radar), product design, Expo / React Native and Supabase code, App Store and Play Store publishing",
        "A shared foundation across every app: industrialised releases, paywalls, Sentry error tracking and PostHog analytics (funnels, activation, retention)",
      ],
      image: "/images/work-axiome.webp",
      imageAlt: "Macro shot of a printed circuit board in raking light",
    },
    {
      slug: "thetribe",
      title: "theTribe",
      role: "Full-Stack Engineer (freelance)",
      period: "2025 to 2026",
      context:
        "Full-stack missions through theTribe, a French product agency, for several of its clients.",
      bullets: [
        "Teamway: Workplace 365 mobile app (React Native): features, fixes and iOS / Android releases",
        "HomeExchange Day: event platform (React, Express, PostgreSQL): Luma integration, host / guest registration flows",
        "Aleteia: online media (Next.js, GraphQL): rebuilt archive pages and header, Algolia search, i18n, CSS migration to Tailwind",
      ],
      image: "/images/projects/thetribe-logo.png",
      imageAlt: "theTribe logo",
    },
    {
      slug: "ida",
      title: "Ida",
      role: "Full-Stack Engineer (freelance)",
      period: "2024 to 2025",
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
      role: "Full-Stack Engineer",
      period: "2022 to 2023",
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
      role: "Full-Stack Engineer",
      period: "2021 to 2022",
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
      role: "Front-End Engineer",
      period: "2019 to 2021",
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
      "Software engineer and AI specialist, freelance in Nice since 2024. I design and build web and mobile products end to end, and I ship AI workflows and agents. A HETIC graduate who worked at Ouihelp, Alobees and Microdoing, I now support StratBuy, from product design to business strategy, and I am launching Recto AI, an app that explains the hard passages of a book.",
      "I take a project from scoping to production: product design, architecture, code, store publishing and follow-up after launch. I work remotely, in French and English.",
    ],
    portrait: "/images/portrait.webp",
    portraitAlt: "Portrait of Hugues Romain",
    portraitHint: "HOVER TO RESOLVE",
  },
  contact: {
    intro:
      "An architecture to challenge, an agent to ship, a product to build end to end? Write me, I answer fast.",
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
    inputAriaLabel: "Talk with Hugues, ask him your question",
    sendAriaLabel: "Send the question",
    panelAriaLabel: "Chat with Hugues (AI version)",
  },
  footer: "BUILT WITH NEXT.JS · NO TEMPLATE",
};
