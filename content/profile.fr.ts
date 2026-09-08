import type { Profile } from "./types";

export const TODO_LINKEDIN_URL = "TODO_LINKEDIN_URL";
export const TODO_BOOKING_URL = "TODO_BOOKING_URL";

export const profileFr: Profile = {
  locale: "fr",
  name: "Hugues Romain",
  tagline:
    "Ingénieur full-stack & IA — freelance · architecture, agents IA, produits web & mobile de bout en bout · Paris",
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
      role: "Co-fondateur & Lead Engineer",
      period: "2026 — aujourd'hui",
      context:
        "Plateforme SaaS multi-tenant d'agents IA autonomes pour l'entreprise.",
      bullets: [
        "Conçue et construite de bout en bout : backend FastAPI async, front React / TypeScript, infra Docker, PostgreSQL, Redis, Temporal Cloud",
        "Boucle d'agents multi-provider (Claude Agent SDK + LiteLLM) : 4 LLM interchangeables, sélection sémantique d'outils sur 850+ apps OAuth",
        "Streaming temps réel token par token (Redis Streams → SSE → React) : événements séquencés idempotents, reprise sur crash",
      ],
      image: "/images/work-aiorigin.webp",
      imageAlt: "Sculpture classique en marbre, profil éclairé sur fond noir",
    },
    {
      slug: "sinea",
      title: "Sinea Formation",
      role: "Lead Full-Stack Engineer",
      period: "2025 — aujourd'hui",
      context:
        "Plateforme B2B qui aide les collaborateurs à développer leurs soft skills.",
      bullets: [
        "Trois codebases construites et menées : app mobile Expo / React Native, API NestJS + Prisma + PostgreSQL, back-office React",
        "Publiée sur l'App Store et le Play Store (builds EAS), cadence de release soutenue",
        "Moteur de campagnes et challenges : progression, badges, feedback texte / audio / vidéo transcrit par Deepgram",
      ],
      image: "/images/work-sinea.webp",
      imageAlt: "Structure métallique en treillis sur ciel noir",
    },
    {
      slug: "axiome",
      title: "Axiome App Studio",
      role: "Fondateur & Product Engineer",
      period: "2025 — aujourd'hui",
      context: "Studio d'apps mobiles grand public, conçu et opéré en solo.",
      bullets: [
        "5 apps conçues, construites et publiées : Belle, Koji, Tanzy, KnuckleMax, Teacherz (Expo, TypeScript strict, Supabase, Superwall)",
        "IA en production : analyse d'image par modèles de vision, onboarding personnalisé, localisation auto FR / EN / ES / IT",
        "Chaîne de release industrialisée et analytics PostHog sur tout le portfolio : funnels, activation, rétention",
      ],
      image: "/images/work-axiome.webp",
      imageAlt: "Macro d'un circuit imprimé en lumière rasante",
    },
    {
      slug: "ida",
      title: "Ida",
      role: "Full-Stack Engineer",
      period: "2024 — 2025",
      context:
        "Plateforme B2B de commande de produits frais pour les épiceries de quartier.",
      bullets: [
        "Cœur du produit conçu et construit : commande et gestion des produits frais (FastAPI, React)",
        "Mercuriale dynamique : prix temps réel, unités de conditionnement, règles métier réagissant aux mouvements de stock",
        "Coordination quotidienne de l'équipe tech : code reviews, rituels agiles",
      ],
      image: "/images/work-ida.webp",
      imageAlt: "Crête de dune sculptée par le vent dans l'obscurité",
    },
  ],
  stack: [
    { label: "Langages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
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
      label: "IA & agents",
      items: [
        "Claude Agent SDK",
        "MCP",
        "LiteLLM",
        "RAG",
        "Orchestration multi-agents",
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
      "Ingénieur full-stack indépendant depuis 2024 sous ma société Axiome, je conçois et construis des produits web et mobiles de bout en bout — de l'architecture à la production. Diplômé d'HETIC, formé en alternance chez Ouihelp, Alobees puis Microdoing, je co-fonde aujourd'hui aiOrigin, une plateforme d'agents IA autonomes pour l'entreprise.",
      "Mon terrain : les systèmes où l'IA rencontre la vraie ingénierie — boucles d'agents multi-providers, streaming temps réel, workflows durables, apps mobiles publiées en solo. Basé à Paris, je travaille en français comme en anglais.",
    ],
    portrait: "/images/portrait.webp",
    portraitAlt: "Portrait de Hugues Romain",
    portraitHint: "SURVOLER POUR RÉSOUDRE",
  },
  contact: {
    intro:
      "Un doute sur une archi, un agent à mettre en prod, un produit à construire de bout en bout — écrivez-moi, je réponds vite.",
    email: "huguesromainpro@gmail.com",
    github: "https://github.com/huguesromain",
    linkedin: TODO_LINKEDIN_URL,
    booking: TODO_BOOKING_URL,
    bookingLabel: "Book a call",
  },
  chat: {
    placeholders: [
      "Quelle est ton expérience avec les agents IA ?",
      "Tu es dispo pour une mission ?",
      "Raconte-moi l'archi de aiOrigin",
      "Tu bosses en React Native ?",
    ],
    chips: [
      "Ton expérience avec les agents IA ?",
      "Dispo pour une mission ?",
      "L'archi de aiOrigin ?",
    ],
    panelTitle: "Conversation",
    youLabel: "Vous",
    meLabel: "Hugues · IA",
    stop: "Stop",
    clear: "Effacer",
    retry: "Réessayer",
    errorNetwork:
      "La connexion a échoué. Vérifiez votre réseau et réessayez.",
    errorRateLimit:
      "Limite atteinte : 20 messages par heure. Revenez un peu plus tard, ou écrivez-moi directement par email.",
    errorEmpty: "Réponse vide reçue. Relancez la question.",
    closeHint: "Esc pour fermer",
    close: "Fermer la conversation",
    inputAriaLabel: "Posez votre question à la version IA de Hugues",
    sendAriaLabel: "Envoyer la question",
    panelAriaLabel: "Conversation avec la version IA de Hugues",
  },
  footer: "BUILT WITH NEXT.JS · NO TEMPLATE",
};
