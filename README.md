<div align="center">

# MediaBubble

**Bilingual marketing platform for a full-service agency — Egypt, UAE, and brand guidelines in one Nx monorepo.**

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/mediabubble-adv/mediaBubble/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Nx](https://img.shields.io/badge/Nx-22.7-143055?logo=nx&logoColor=white)](https://nx.dev/)
[![Node](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[mediabubble.co](https://mediabubble.co) · [mediabubble.ae](https://mediabubble.ae) · [brand.mediabubble.co](https://brand.mediabubble.co)

</div>

---

## Overview

[MediaBubble](https://mediabubble.co) is a Hurghada-based full-service marketing agency (est. 2015). This repository is the **digital platform workspace** that powers:

- **Market websites** for Egypt and the UAE — conversion-focused, bilingual, RTL-aware Next.js apps replacing a legacy WordPress stack
- **Brand guidelines** — an interactive reference app for identity, tokens, components, and AI-assisted design workflows
- **Shared packages** — design system, env validation, API integrations, and localization tooling used across all surfaces

The monorepo is built for **parallel market delivery**: Egypt (`web-eg`) ships first with Egyptian Arabic (Masri); UAE (`web-ae`) is a structural clone with Khaliji Arabic and UAE-specific metadata, kept in sync via scripts and an i18n parity gate.

---

## What's in the repo

| Layer | Path | Production URL | Status |
|-------|------|----------------|--------|
| Egypt marketing site | `apps/web-eg` | [mediabubble.co](https://mediabubble.co) | Primary market app — routes, services, blog, contact |
| UAE marketing site | `apps/web-ae` | [mediabubble.ae](https://mediabubble.ae) | Structural clone — Khaliji `ar` locale, UAE config |
| Brand guidelines | `apps/brand` | [brand.mediabubble.co](https://brand.mediabubble.co) | Interactive brand book (14 sections, search, copy tools) |
| Design system | `packages/design-system` | — | Shared UI primitives + Tailwind preset (Rollup build) |
| Shared library | `packages/shared` | — | Env, HubSpot/Resend clients, i18n factory, security headers |
| Content pipeline | `packages/content-pipeline` | — | UAE localization (`nx run content-pipeline:localize`) |

### Live service pages (both market apps)

`seo` · `ppc` · `social` · `branding` · `web` — routed at `/services/[slug]`. Additional services (`content`, `events`) are planned; see `docs/content/service-component-inventory.md`.

### Core marketing routes

`/`, `/about`, `/services`, `/portfolio`, `/blog`, `/contact`, `/privacy`, `/terms`, `/cookies` — plus dynamic `[slug]` pages for services, portfolio, and blog.

---

## Architecture

```mermaid
flowchart TB
  subgraph apps [Applications]
    EG["web-eg · mediabubble.co"]
    AE["web-ae · mediabubble.ae"]
    BR["brand · brand.mediabubble.co"]
  end

  subgraph packages [Shared packages]
    DS["@mediabubble/design-system"]
    SH["@mediabubble/shared"]
    CP["content-pipeline"]
  end

  subgraph integrations [Integrations]
    HS["HubSpot CRM"]
    RS["Resend email"]
    GA["Google Analytics 4"]
  end

  EG --> DS
  EG --> SH
  AE --> DS
  AE --> SH
  BR --> DS
  BR --> SH
  CP -.-> AE
  SH --> HS
  SH --> RS
  SH --> GA
```

**Client vs server imports:** In `'use client'` files, import hooks and browser utilities from `@mediabubble/shared/client` (not the root barrel). Server Components and API routes use `@mediabubble/shared/server` or package subpaths to avoid pulling server-only code into the client bundle.

---

## Tech stack

| Category | Choices |
|----------|---------|
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript 5.3 |
| Styling | Tailwind CSS 3, `tailwindcss-rtl`, semantic `brand-*` tokens + dark mode (`html.dark`) |
| Monorepo | Nx 22, npm workspaces |
| i18n | i18next + react-i18next — English + dialect locales (`ar-masri` EG, `ar` Khaliji AE) |
| UI | Radix primitives, Lucide / React Icons, shared design-system components |
| Forms & CRM | HubSpot API (contacts, newsletter), Resend (transactional email) |
| PWA | `@ducanh2912/next-pwa` (per-app) |
| CI | GitHub Actions — build, lint, typecheck, Jest |
| Hosting | Vercel (one project per app) |

---

## Prerequisites

- **Node.js 20** (matches CI)
- **npm** (lockfile: `package-lock.json`)
- Optional: [Vercel CLI](https://vercel.com/docs/cli) for env pull and deploys

---

## Quick start

```bash
git clone https://github.com/mediabubble-adv/mediaBubble.git
cd mediaBubble
npm install
cp .env.example .env.local   # fill in keys — see Environment variables
npm run dev:eg               # http://localhost:3000
```

### Run each app locally

| Command | App | Port |
|---------|-----|------|
| `npm run dev:eg` | Egypt (`web-eg`) | 3000 |
| `npm run dev:ae` | UAE (`web-ae`) | 3001 |
| `npm run dev:brand` | Brand guidelines | 3002 |

### Clean dev restart (after webpack / PWA cache issues)

Stale service workers or overlapping prod builds can cause `Cannot read properties of undefined (reading 'call')` in dev. Use:

```bash
npm run dev:eg:clean   # kills :3000, wipes .next + webpack cache + stale SW
npm run dev:ae:clean   # same for :3001
```

Then hard-refresh the browser or use an incognito window for `localhost`.

---

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` in the repo root (gitignored). Key variables:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (per deploy) |
| `NEXT_PUBLIC_BUSINESS_PHONE` | E.164 phone for JSON-LD and contact UI |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID |
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_EMAIL` | Inbox for form submissions (default: `hello@mediabubble.com`) |
| `HUBSPOT_API_KEY` | CRM upsert for `/api/contact` and `/api/hubspot` |
| `IMPECCABLE_CONTEXT_DIR` | Design-agent context path (`docs/planning`) |

On Vercel, set variables per project, then:

```bash
vercel env pull .env.local --yes
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` / `dev:eg` | Egypt marketing site (port 3000) |
| `npm run dev:ae` | UAE marketing site (port 3001) |
| `npm run dev:brand` | Brand guidelines (port 3002) |
| `npm run dev:eg:clean` / `dev:ae:clean` | Reset dev server + caches |
| `npm run build` | Build all Nx projects |
| `npm run start` | Production server for `web-eg` |
| `npm run lint` | ESLint across workspace |
| `npm run typecheck` | TypeScript check all projects |
| `npm run test` | Jest test suite |
| `npm run test:security` | Shared security-headers tests |
| `npm run check:i18n` | EG/AE locale key parity gate |
| `npm run graph` | Open Nx dependency graph |
| `npm run format` | Prettier write |

---

## Packages

### `@mediabubble/design-system`

Shared UI primitives and Tailwind preset. Built with Rollup (`nx build design-system`). Import components and tokens in all three apps for visual consistency.

### `@mediabubble/shared`

Cross-app utilities:

- Environment validation and market site config
- HubSpot and Resend API helpers
- i18n factory (`useI18n()` from client subpath)
- CSP / security header helpers (wired in each app's `middleware.ts`)
- Theme provider (`mediabubble-theme` storage key, class-based dark mode)

### `content-pipeline`

UAE localization tooling:

```bash
npx nx run content-pipeline:localize
```

For targeted Khaliji register fixes on AE Arabic locales, use `scripts/apply-khaliji-ae-ar.mjs` — do **not** run `scripts/clarify-marketing-ae.mjs` on finalized AE files (it Masri-swaps EG templates).

---

## Egypt → UAE workflow

`web-ae` is a **structural clone** of `web-eg`. After Egypt changes land:

```bash
npx tsx scripts/clone-eg-to-ae.ts
```

Then apply UAE-specific metadata, URLs (`mediabubble.ae`), and Khaliji copy in `apps/web-ae`. Before merge:

```bash
npm run check:i18n
```

---

## Internationalization & RTL

| Market | App | Arabic locale | Register |
|--------|-----|---------------|----------|
| Egypt | `web-eg` | `ar-masri` | Egyptian Arabic (Masri) |
| UAE | `web-ae` | `ar` (+ `ar-khaliji.json`) | Gulf Arabic (Khaliji) |

Locales merge per-app `lib/i18n/*.json` with `public/locales/*/translation.json`. RTL layouts use `tailwindcss-rtl`; infinite-scroll marquees keep animation tracks `dir="ltr"` for loop math while card content respects Arabic direction.

Arabic content skills live under `.claude/skills/arabic-*` (symlinked to `.cursor/skills/`). Sync with:

```bash
bash scripts/sync-cursor-arabic-skills.sh
```

---

## Deployment (Vercel)

Each app is a **separate Vercel project** with root directory set to the app folder:

| Vercel root | Domain |
|-------------|--------|
| `apps/web-eg` | mediabubble.co |
| `apps/web-ae` | mediabubble.ae |
| `apps/brand` | brand.mediabubble.co |

Each `vercel.json` uses a monorepo-aware build:

```json
"buildCommand": "cd ../.. && npx nx build <app>"
```

Avoid running production builds while a dev server is active on the same app.

---

## Quality & CI

On push/PR to `master`, GitHub Actions runs:

1. `npm ci`
2. `nx run-many -t build` (design-system, web-eg, web-ae, brand)
3. `npm run lint`
4. `npm run typecheck`
5. `npm run test`

Pre-commit: Husky + lint-staged (ESLint + related Jest tests on staged TS/TSX).

---

## Project layout

```
mediabubble Main/
├── apps/
│   ├── web-eg/              Egypt marketing → mediabubble.co
│   ├── web-ae/              UAE marketing → mediabubble.ae
│   └── brand/               Brand guidelines → brand.mediabubble.co
├── packages/
│   ├── design-system/       @mediabubble/design-system
│   ├── shared/              @mediabubble/shared
│   └── content-pipeline/    UAE localization
├── scripts/                 Clone, i18n, Arabic skill sync
├── docs/                    Planning, audits, brand, website specs
├── .github/workflows/       CI
├── .env.example             Env template (copy → .env.local)
├── nx.json
└── package.json             @mediabubble/workspace
```

---

## Documentation

**For AI assistants and deep context:** start with **[docs/CONTEXT.md](./docs/CONTEXT.md)** — structure, progress, and reading order.

| Document | When to use it |
|----------|----------------|
| [docs/CONTEXT.md](./docs/CONTEXT.md) | Full repo handoff — what's built vs planned |
| [docs/README.md](./docs/README.md) | Documentation index |
| [docs/getting-started/README_START_HERE.md](./docs/getting-started/README_START_HERE.md) | Website improvement entry guide |
| [docs/getting-started/EXECUTION_START_HERE.md](./docs/getting-started/EXECUTION_START_HERE.md) | Audit fixes with Cursor/Claude |
| [docs/audits/COMPREHENSIVE_AUDIT_REPORT.md](./docs/audits/COMPREHENSIVE_AUDIT_REPORT.md) | Codebase audit report |
| [docs/planning/MASTER_DEVELOPMENT_PLAN.md](./docs/planning/MASTER_DEVELOPMENT_PLAN.md) | 12-week development roadmap |
| [docs/website/README.md](./docs/website/README.md) | Website transformation & conversions |
| [AGENTS.md](./AGENTS.md) | Agent/workspace conventions learned in-repo |

---

## Roadmap (high level)

- Expand service pages beyond the current five live slugs
- HubSpot + Resend + GA4 fully configured in all environments
- Lighthouse 95+, formal WCAG AA audit
- AI chat agent for lead qualification (spec in `docs/business/`)
- Open-source design system and website template (strategy docs in `docs/business/strategy/`)

See [docs/CONTEXT.md](./docs/CONTEXT.md) §2 for estimated completion percentages per initiative.

---

## Contact

**Yasser Dorgham** — [yasser.dorgham@gmail.com](mailto:yasser.dorgham@gmail.com)

**Agency** — [mediabubble.co](https://mediabubble.co) · Hurghada, Egypt

---

<div align="center">

Private repository · © MediaBubble

</div>
