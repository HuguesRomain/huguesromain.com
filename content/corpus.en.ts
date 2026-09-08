export const corpusEn = `# Hugues Romain — Corpus (v1: résumé)

## Identity
- Hugues Romain, freelance full-stack engineer & AI architect, based in Nice, France. He designs and ships AI workflows and agents.
- Company: Axiome (SASU), founded September 2024.
- Email: huguesromainpro@gmail.com · GitHub: github.com/huguesromain
- Languages: French (native), English (fluent).

## Education
- HETIC — Grande École du Web (Montreuil, France). Master's degree (M.Sc. equivalent) in Computer Programming & Specific Applications, Nov. 2021 – Sept. 2023, work-study alongside Alobees then Microdoing.
- Bachelor's degree in Computer Programming, HETIC, 2018 – 2021, work-study alongside Ouihelp.

## Experience

### aiOrigin — Co-founder & Lead Engineer (Feb. 2026 – present)
Multi-tenant SaaS platform for autonomous AI agents in the enterprise.
- Designed and built the platform end to end — architecture, fully async FastAPI backend, React 18 / TypeScript frontend, Docker infrastructure and AI layer — on PostgreSQL (Supabase), Redis and Temporal Cloud.
- Engineered a multi-provider agent loop (Claude Agent SDK + LiteLLM) making 4 LLM providers interchangeable without touching agent code, with semantic tool selection across 850+ OAuth-connected applications.
- Built token-by-token real-time streaming (Redis Streams → SSE → React): idempotent sequenced events, crash-resume and inactivity watchdog, removing perceived wait on multi-minute responses.
- Orchestrated long-running work through durable Temporal workflows — scheduled jobs and a 4-phase multi-agent B2B prospecting pipeline — with dual heartbeats and automatic cleanup of orphaned runs.
- Secured multi-tenancy: ES256 JWT auth (JWKS), PostgreSQL RLS, a 5-level permission hierarchy, sandboxed tool execution and idempotent Stripe usage-based billing.
- Set up observability (Sentry, PostHog, Langfuse over OpenTelemetry) and a distributed documentation convention (~48 linted AGENTS.md files) consumable by AI agents.

### Sinea Formation — Lead Full-Stack Engineer (Sept. 2025 – present)
B2B platform helping employees develop their soft skills.
- Contributed to product design and scoping alongside the client: specification workshops, functional trade-offs and roadmap prioritisation.
- Led the technical side of the project: work breakdown, code reviews and coordination of the developers across the three repositories.
- Built and evolved the product's three codebases: Expo / React Native mobile app, NestJS + Prisma + PostgreSQL API and React / TanStack Query back office.
- Shipped the app to iOS and Android stores (EAS builds, native versioning, App Store & Play Store submissions) on a sustained release cadence.
- Built the campaign and challenge engine — progress tracking, badges, per-team statistics — and multi-format feedback (text, audio, video with Deepgram transcription).
- Implemented GDPR compliance (JSON export of personal data, cascading account deletion) and multi-channel notifications (Firebase, email, Teams, SMS).
- Hardened the API: 4-role JWT authentication, guards and scopes (UserScoped / ClientScoped), throttling and Sentry monitoring.

### Axiome App Studio — Founder & Product Engineer (2025 – present)
Consumer mobile app studio, designed and operated solo.
- Designed, built and shipped 5 mobile apps (Expo SDK 56/57, React Native, strict TypeScript, Supabase, Superwall): Belle (AI beauty advisor), Koji (gut health), Tanzy (tanning coach), KnuckleMax and Teacherz (AI tutoring chat).
- Put AI into production on the product side: vision-model image analysis, personalised onboarding paths, generated content and auto-detected FR/EN/ES/IT localisation.
- Industrialised the full release chain — multi-file version bumping, local .ipa / .aab builds, App Privacy, App Review responses — reducing each submission to an automated procedure.
- Instrumented the whole portfolio with PostHog: tracking plan, onboarding funnels, activation and retention monitoring, driving product iterations from data.
- Set up subscription monetisation (Superwall paywalls) and Sentry error tracking across every app.

### theTribe — Freelance Full-Stack Engineer (Oct. 2025 – 2026)
Full-stack missions through theTribe, a French product agency, for several of its clients.
- Teamway: features, fixes and iOS / Android releases for the Workplace 365 mobile app (React Native).
- HomeExchange Day: event platform (React frontend, Express backend, PostgreSQL) — Luma integration, host / guest registration flows, data exports.
- Aleteia: online media (Next.js, GraphQL) — rebuilt archive pages and header, Algolia search, internationalisation, CSS migration to Tailwind.

### Ida — Freelance Full-Stack Engineer (Sept. 2024 – Sept. 2025)
B2B ordering platform for fresh produce serving neighbourhood grocery stores.
- Designed and built the core ordering and fresh-product management features of the platform (FastAPI, React).
- Delivered a dynamic price list: real-time pricing, packaging units, product groups and business rules reacting to stock movements.
- Instrumented the product with PostHog to track user behaviour, prioritise the roadmap and optimise key flows.
- Coordinated the tech team day to day (code reviews, agile rituals).

### Microdoing — Full-Stack Engineer, work-study (Oct. 2022 – Oct. 2023, Paris)
React Native product, ported to the web with Expo for Web.
- Designed and built a gamification feature that lifted user engagement and adoption by 20%.
- Ported the React Native mobile app to the web with Expo for Web.
- Reorganised the team (code reviews, sprints, daily rituals, retrospectives) to cut the production error rate.

### Alobees — Full-Stack Engineer, work-study (Dec. 2021 – Sept. 2022, Paris)
Interactive site-planning tool for construction professionals.
- Rearchitected the web and mobile front ends and unified both around an atomic design system.
- Built an interactive site-planning tool for construction professionals.
- Removed UX friction from sign-up and login flows.
- Introduced automated testing (Jest).

### Ouihelp — Front-End Engineer, work-study (Jul. 2019 – Sept. 2021, Paris)
Client portal and location tools for families, beneficiaries and caregivers.
- Designed and built a smart location feature to quickly identify the caregivers closest to each beneficiary.
- Reworked state management (replacing Redux with React hooks and contexts).
- Built a client portal simplifying access to Ouihelp services for families.
- Created a Gatsby static site wired to Contentful (headless CMS).

## Technical skills
- Languages: TypeScript, JavaScript, Python, SQL.
- Front-end: React 18, Next.js, React Native / Expo, TanStack Query, Zustand, Tailwind CSS, Radix UI, design systems, i18n.
- Back-end: FastAPI, NestJS, Node.js, PostgreSQL / Supabase, Prisma, SQLModel, Redis, pgvector, REST & SSE.
- AI & agents: Claude Agent SDK, MCP, LiteLLM (Anthropic · OpenAI · Gemini · Mistral), RAG, multi-agent orchestration, Temporal.
- Infra & tooling: Docker, Temporal Cloud, Stripe, Railway, EAS / Expo, GitHub Actions, Sentry, PostHog, Langfuse.
- Product: software architecture, App Store & Play Store publishing, GDPR compliance, team leadership, agile methods.

## Personal projects
- Astrotierra: astrocartography web product designed and launched solo (Supabase Edge Functions, Swiss Ephemeris, LLM-generated readings).
- Signal Radar: SaaS detecting app opportunities from trend signals.

## Questionnaire
TODO_QUESTIONNAIRE: answers to the questionnaire (ways of working, mission preferences, process, anecdotes) will be added here.
`;
