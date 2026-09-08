export const corpusFr = `# Hugues Romain — Corpus (v1 : CV)

## Identité
- Hugues Romain, ingénieur full-stack & IA freelance, basé à Paris.
- Société : Axiome (SASU), fondée en septembre 2024.
- Email : huguesromainpro@gmail.com · GitHub : github.com/huguesromain
- Langues : français (natif), anglais (courant).

## Formation
- HETIC — Grande École du Web (Montreuil). Master (équivalent M.Sc.) en programmation informatique et applications spécifiques, nov. 2021 – sept. 2023, en alternance chez Alobees puis Microdoing.
- Bachelor en programmation informatique, HETIC, 2018 – 2021, en alternance chez Ouihelp.

## Expériences

### aiOrigin — Co-fondateur & Lead Engineer (fév. 2026 – aujourd'hui)
Plateforme SaaS multi-tenant d'agents IA autonomes pour l'entreprise.
- Conception et construction de bout en bout : architecture, backend FastAPI entièrement async, front React 18 / TypeScript, infra Docker, couche IA — sur PostgreSQL (Supabase), Redis et Temporal Cloud.
- Boucle d'agents multi-provider (Claude Agent SDK + LiteLLM) rendant 4 fournisseurs de LLM interchangeables sans toucher au code des agents, avec sélection sémantique d'outils sur plus de 850 applications connectées en OAuth.
- Streaming temps réel token par token (Redis Streams → SSE → React) : événements séquencés idempotents, reprise après crash, watchdog d'inactivité — suppression de l'attente perçue sur des réponses de plusieurs minutes.
- Orchestration de travaux longs via des workflows Temporal durables : jobs planifiés et pipeline de prospection B2B multi-agents en 4 phases, avec double heartbeat et nettoyage automatique des exécutions orphelines.
- Sécurisation du multi-tenant : auth JWT ES256 (JWKS), RLS PostgreSQL, hiérarchie de permissions à 5 niveaux, exécution d'outils sandboxée, facturation Stripe à l'usage idempotente.
- Observabilité : Sentry, PostHog, Langfuse sur OpenTelemetry ; convention de documentation distribuée (~48 fichiers AGENTS.md lintés) consommable par des agents IA.

### Sinea Formation — Lead Full-Stack Engineer (sept. 2025 – aujourd'hui)
Plateforme B2B qui aide les collaborateurs à développer leurs soft skills.
- Participation au cadrage produit avec le client : ateliers de spécification, arbitrages fonctionnels, priorisation de la roadmap.
- Direction technique du projet : découpage du travail, code reviews, coordination des développeurs sur les trois dépôts.
- Construction et évolution des trois codebases : app mobile Expo / React Native, API NestJS + Prisma + PostgreSQL, back-office React / TanStack Query.
- Publication sur l'App Store et le Play Store (builds EAS, versioning natif, soumissions) à cadence soutenue.
- Moteur de campagnes et challenges : suivi de progression, badges, statistiques par équipe ; feedback multi-format (texte, audio, vidéo avec transcription Deepgram).
- Conformité RGPD (export JSON des données personnelles, suppression de compte en cascade) et notifications multi-canal (Firebase, email, Teams, SMS).
- Durcissement de l'API : auth JWT à 4 rôles, guards et scopes (UserScoped / ClientScoped), throttling, monitoring Sentry.

### Axiome App Studio — Fondateur & Product Engineer (2025 – aujourd'hui)
Studio d'apps mobiles grand public, conçu et opéré en solo.
- 5 apps conçues, construites et publiées (Expo SDK 56/57, React Native, TypeScript strict, Supabase, Superwall) : Belle (conseillère beauté IA), Koji (santé intestinale), Tanzy (coach bronzage), KnuckleMax et Teacherz (tutorat IA par chat).
- IA en production côté produit : analyse d'images par modèles de vision, parcours d'onboarding personnalisés, contenu généré, localisation auto-détectée FR/EN/ES/IT.
- Chaîne de release industrialisée : bump de version multi-fichiers, builds .ipa / .aab locaux, App Privacy, réponses App Review — chaque soumission réduite à une procédure automatisée.
- Instrumentation PostHog sur tout le portfolio : plan de tracking, funnels d'onboarding, suivi activation / rétention, itérations produit pilotées par la donnée.
- Monétisation par abonnement (paywalls Superwall) et suivi d'erreurs Sentry sur chaque app.

### Ida — Full-Stack Engineer (sept. 2024 – sept. 2025)
Plateforme B2B de commande de produits frais pour les épiceries de quartier.
- Conception et construction du cœur du produit : commande et gestion des produits frais (FastAPI, React).
- Mercuriale dynamique : prix en temps réel, unités de conditionnement, groupes de produits, règles métier réagissant aux mouvements de stock.
- Instrumentation PostHog : suivi des comportements, priorisation de la roadmap, optimisation des parcours clés.
- Coordination quotidienne de l'équipe tech (code reviews, rituels agiles).

### Microdoing — Full-Stack Engineer, alternance (oct. 2022 – oct. 2023, Paris)
- Feature de gamification qui a augmenté l'engagement et l'adoption de 20 %.
- Portage de l'app React Native vers le web avec Expo for Web.
- Réorganisation de l'équipe (code reviews, sprints, daily, rétrospectives) pour réduire le taux d'erreurs en production.

### Alobees — Full-Stack Engineer, alternance (déc. 2021 – sept. 2022, Paris)
- Réarchitecture des fronts web et mobile, unifiés autour d'un design system atomique.
- Outil interactif de planification de chantiers pour les professionnels du BTP.
- Suppression des frictions UX sur l'inscription et la connexion.
- Introduction des tests automatisés (Jest).

### Ouihelp — Front-End Engineer, alternance (juil. 2019 – sept. 2021, Paris)
- Feature de géolocalisation intelligente pour identifier les auxiliaires de vie les plus proches de chaque bénéficiaire.
- Refonte du state management (Redux remplacé par hooks et contexts React).
- Portail client simplifiant l'accès aux services Ouihelp pour les familles.
- Site statique Gatsby relié à Contentful (CMS headless).

## Compétences techniques
- Langages : TypeScript, JavaScript, Python, SQL.
- Front : React 18, Next.js, React Native / Expo, TanStack Query, Zustand, Tailwind CSS, Radix UI, design systems, i18n.
- Back : FastAPI, NestJS, Node.js, PostgreSQL / Supabase, Prisma, SQLModel, Redis, pgvector, REST & SSE.
- IA & agents : Claude Agent SDK, MCP, LiteLLM (Anthropic · OpenAI · Gemini · Mistral), RAG, orchestration multi-agents, Temporal.
- Infra & tooling : Docker, Temporal Cloud, Stripe, Railway, EAS / Expo, GitHub Actions, Sentry, PostHog, Langfuse.
- Produit : architecture logicielle, publication App Store & Play Store, conformité RGPD, lead d'équipe, méthodes agiles.

## Projets personnels
- Astrotierra : produit web d'astrocartographie conçu et lancé en solo (Supabase Edge Functions, Swiss Ephemeris, lectures générées par LLM).
- Signal Radar : SaaS de détection d'opportunités d'apps à partir de signaux de tendances.

## Questionnaire
TODO_QUESTIONNAIRE : les réponses au questionnaire (façon de travailler, préférences de mission, process, anecdotes) seront ajoutées ici.
`;
