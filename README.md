<img src="apps/web-eg/public/assets/Logo/logo-favicon.svg" alt="MediaBubble logo" width="88" height="88" />

# MediaBubble Workspace

**Bilingual marketing sites, the brand system, and the internal operations hub in one Nx monorepo.**

**DevOps & Workflow**  
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/mediabubble-adv/mediaBubble/actions/workflows/ci.yml)
[![Nx](https://img.shields.io/badge/Nx-23-143055?logo=nx&logoColor=white)](https://nx.dev/)

**Frontend Core**  
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**Database & Real-time**  
[![Prisma](https://img.shields.io/badge/Prisma-5-123A50?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Redis](https://img.shields.io/badge/Redis-PubSub-DC382D?logo=redis&logoColor=white)](https://redis.io/)

**APIs & Quality**  
[![HubSpot](https://img.shields.io/badge/HubSpot-CRM-FF7A59?logo=hubspot&logoColor=white)](https://www.hubspot.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-black?logo=resend&logoColor=white)](https://resend.com/)
[![ESLint](https://img.shields.io/badge/ESLint-Linter-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white)](https://jestjs.io/)

![MediaBubble GitHub cover](docs/assets/github/mediabubble-github-cover.png)

[web-eg.vercel.app (Egypt)](https://web-eg.vercel.app) · [web-ae-nine.vercel.app (UAE)](https://web-ae-nine.vercel.app) · [brand-mediabubble.vercel.app (Brand)](https://brand-mediabubble.vercel.app) · [launcher-peach.vercel.app (Launcher)](https://launcher-peach.vercel.app)

---

## Deployments (Vercel)

| App | Custom domain | Vercel |
| --- | --- | --- |
| MediaBubble Egypt | [mediabubble.co](https://mediabubble.co) | [web-eg.vercel.app](https://web-eg.vercel.app) |
| MediaBubble UAE | [mediabubble.ae](https://mediabubble.ae) | [web-ae-nine.vercel.app](https://web-ae-nine.vercel.app) |
| MediaBubble Brand | [brand.mediabubble.co](https://brand.mediabubble.co) | [brand-mediabubble.vercel.app](https://brand-mediabubble.vercel.app) |
| MediaBubble Launcher | [launcher.mediabubble.co](https://launcher.mediabubble.co) | [launcher-peach.vercel.app](https://launcher-peach.vercel.app) |

## What lives here

| Area | Path | Purpose |
| --- | --- | --- |
| MediaBubble Egypt | `apps/web-eg` | Public Egyptian market site |
| MediaBubble UAE | `apps/web-ae` | Public UAE market site |
| MediaBubble Brand | `apps/brand` | Interactive brand guidelines |
| MediaBubble Launcher | `apps/launcher` | Internal ops hub for the agency team |
| Shared UI and helpers | `packages/` | Reusable design system and shared utilities |
| Planning and handoffs | `docs/` | Strategy, specs, audits, and implementation notes |

## Quick Start

1. Install dependencies from the repository root:

   ```bash
   npm ci
   ```

2. Copy the environment templates you need:

   ```bash
   cp .env.example .env.local
   cp apps/launcher/.env.example apps/launcher/.env.local
   ```

3. Start the app you want to work on:

   | App | Command | Local URL |
   | --- | --- | --- |
   | Egypt site | `npm run dev:eg` | http://localhost:3000 |
   | UAE site | `npm run dev:ae` | http://localhost:3001 |
   | Brand app | `npm run dev:brand` | http://localhost:3002 |
   | Launcher | `npm run dev:launcher` | http://localhost:3003 |

4. Use the clean restart helpers when caches get in the way:

   ```bash
   npm run dev:eg:clean
   npm run dev:ae:clean
   npm run dev:brand
   npm run dev:launcher:clean
   ```

## Working Rules

- Install from the repo root only. Do not add a second package install inside `apps/*`.
- Keep `package-lock.json` in sync with any dependency changes.
- Treat `apps/web-eg` as the source market site and sync structural changes to `apps/web-ae`.
- Launcher-specific setup, seeds, and deploy steps live in [apps/launcher/README.md](apps/launcher/README.md).
- Design and product context for the launcher lives in [PRODUCT.md](PRODUCT.md) and [docs/brand/DESIGN.md](docs/brand/DESIGN.md).

## 🏗️ Architecture & Project Layout

Here is how code moves, imports are constrained, and requests are processed in our workspace.

### Monorepo Dependency Rules
Apps are allowed to import packages (`packages/*`), but packages must **never** import from applications. Doing so will violate Nx boundaries and fail the build.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Poppins, Inter, system-ui, sans-serif","fontSize":"13px","lineColor":"#2196F3","primaryTextColor":"#e5e7eb","primaryBorderColor":"#2196F3","clusterBkg":"#0D0F12","clusterBorder":"#1565C0","titleColor":"#FFC107","edgeLabelBackground":"#0D0F12"},"flowchart":{"curve":"monotoneY","nodeSpacing":48,"rankSpacing":64,"padding":16}}}%%
flowchart TB
  %% Users & Edge
  Client[/"User / Employee"\] -->|HTTPS| Vercel["Vercel Edge Network"]
  
  subgraph Vercel ["Vercel Deployments (Next.js Apps)"]
    direction TB
    
    subgraph webApp ["web-eg / web-ae (Marketing Sites)"]
      direction LR
      EG["Egypt (Masri)<br/>web-eg.vercel.app"]
      AE["UAE (Khaliji)<br/>web-ae-nine.vercel.app"]
      EG -.->|"npx tsx scripts/clone-eg-to-ae"| AE
    end
    
    Brand["brand<br/>brand-mediabubble.vercel.app"]
    Launcher["launcher<br/>launcher-peach.vercel.app"]
  end
  
  %% Middleware & Logic Gate
  Vercel -->|Router| MW["Next.js Middleware"]
  MW -->|CSP / Nonce Header| CSP["@mediabubble/shared/csp-middleware"]
  Launcher -->|Auth / Route Proxy| JWT["JWT Verification"]
  
  %% Packages Layer
  Vercel ====|Imports| Packages
  
  subgraph Packages ["@mediabubble Workspace Packages"]
    direction LR
    DS["@mediabubble/design-system<br/>(Tailwind preset / UI cards)"]
    SH["@mediabubble/shared<br/>(Resend / HubSpot client / Storage)"]
    CP["content-pipeline<br/>(Gulf Arabic translations)"]
  end
  
  CP -.->|Localization Pipeline| AE
  
  %% Infrastructure & Integrations
  Launcher & SH -->|Prisma client| DB[("Supabase PostgreSQL")]
  Launcher -->|ws:launcher| WS["Redis WebSocket Bridge<br/>(Port :3004 / Chat)"]
  SH -->|Web SDK / REST| Ext["HubSpot CRM / Resend / GA4"]

  classDef app fill:#0D0F12,stroke:#2196F3,color:#e5e7eb,stroke-width:1.5px
  classDef pkg fill:#1565C0,stroke:#2196F3,color:#FFFFFF,stroke-width:1.5px
  classDef pipe fill:#0D0F12,stroke:#FFC107,color:#e5e7eb,stroke-width:1.5px
  classDef infra fill:#0D0F12,stroke:#1AD191,color:#FFFFFF,stroke-width:1.5px

  class EG,AE,Brand,Launcher app
  class DS,SH,CP pkg
  class JWT,CSP pipe
  class DB,WS,Ext,Vercel infra

  style Vercel fill:#0D0F12,stroke:#1565C0,color:#FFC107
  style webApp fill:#0D0F12,stroke:#2196F3,color:#FFC107
  style Packages fill:#0D0F12,stroke:#1565C0,color:#FFC107
```

### Folder Layout
```text
mediabubble Main/
├── apps/
│   ├── web-eg/
│   ├── web-ae/
│   ├── brand/
│   └── launcher/
├── packages/
│   ├── design-system/
│   ├── shared/
│   └── content-pipeline/
├── scripts/
├── docs/
├── AGENTS.md
├── PRODUCT.md
└── README.md
```

## Documentation

| Read next | Why it matters |
| --- | --- |
| [docs/README.md](docs/README.md) | Full docs index and directory map |
| [docs/CONTEXT.md](docs/CONTEXT.md) | AI handoff with repo status, structure, and priorities |
| [apps/launcher/README.md](apps/launcher/README.md) | Launcher install, database, and deploy guide |
| [docs/website/README.md](docs/website/README.md) | Website conversion and UX workstream |
| [docs/brand/DESIGN.md](docs/brand/DESIGN.md) | Brand system, tokens, and visual rules |

## GitHub Notes

- This repository is private, so the CI badge uses a static shields.io link.
- The root is intentionally small. The only files that should stay at the top level are `README.md`, `AGENTS.md`, and `PRODUCT.md`, plus normal config files.
- Extra planning material belongs under `docs/`.

## Support

Primary contact: Yasser Dorgham - yasser.dorgham@gmail.com

Live deployments (Vercel):

- [MediaBubble Egypt](https://web-eg.vercel.app)
- [MediaBubble UAE](https://web-ae-nine.vercel.app)
- [MediaBubble Brand](https://brand-mediabubble.vercel.app)
- [MediaBubble Launcher](https://launcher-peach.vercel.app)
