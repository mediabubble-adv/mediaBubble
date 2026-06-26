<div align="center">

<img src="apps/web-eg/public/assets/Logo/logo-favicon.svg" alt="MediaBubble logo" width="88" height="88" />

# MediaBubble Workspace

**One Nx monorepo for the public market sites, the Brand Guidelines studio, and the internal Launcher.**

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/mediabubble-adv/mediaBubble/actions/workflows/ci.yml) [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![Nx](https://img.shields.io/badge/Nx-23-143055?logo=nx&logoColor=white)](https://nx.dev/)

[MediaBubble Egypt](https://web-eg.vercel.app) · [MediaBubble UAE](https://web-ae-nine.vercel.app) · [MediaBubble Brand](https://brand-mediabubble.vercel.app) · [MediaBubble Launcher](https://launcher-peach.vercel.app)

![MediaBubble GitHub cover](docs/assets/github/mediabubble-github-cover.png)

</div>

## What This Repo Is

MediaBubble is a bilingual agency workspace built for daily use, not just demos.

It combines:

- `apps/web-eg` for the Egyptian market site
- `apps/web-ae` for the UAE market site
- `apps/brand` for the brand guidelines experience
- `apps/launcher` for internal operations, tasks, time, AI, and team coordination
- `packages/` for shared design, UI, auth, and utility code
- `docs/` for planning, references, and implementation guidance

## Deployments (Vercel)

| Surface | Purpose | Live URL |
| :--- | :--- | :--- |
| MediaBubble Egypt | Public Egyptian market site | [web-eg.vercel.app](https://web-eg.vercel.app) |
| MediaBubble UAE | Public UAE market site | [web-ae-nine.vercel.app](https://web-ae-nine.vercel.app) |
| MediaBubble Brand | Brand system, assets, and guidance | [brand-mediabubble.vercel.app](https://brand-mediabubble.vercel.app) |
| MediaBubble Launcher | Internal operations hub | [launcher-peach.vercel.app](https://launcher-peach.vercel.app) |

## Brand Guidelines

The Brand app is the visual source of truth for MediaBubble. It keeps the studio voice, palette, typography, and component rules in one place.

Use it when you need:

- The brand palette and surface tokens
- Typography and spacing direction
- Component styling cues
- Searchable brand assets and AI prompt guidance

## Launcher Workflow

The Launcher is the daily driver for the agency team. It is where work gets owned, tracked, reviewed, and moved forward.

### Core workflow

1. Capture work as tasks.
2. Track time against real client and internal work.
3. Review capacity, leave, and workload before assigning more.
4. Use AI tools to draft, summarize, classify, and accelerate repeatable work.
5. Turn approved output into client-ready work products.

### What the Launcher manages

- Tasks and task comments
- Time entries, approvals, capacity, and availability
- CRM records and client-facing finance surfaces
- Team chat and realtime updates
- Workflow automation and operational follow-up
- AI-assisted drafting through OPUS and related tooling

### Where generative AI fits

Generative AI is part of the workflow, not a separate novelty layer. In practice, it can help with:

- Drafting task briefs and follow-up copy
- Summarizing work and surfacing next steps
- Creating charts, diagrams, and infographics from structured inputs
- Turning raw notes into presentation-ready visual assets

The rule is simple: AI accelerates the work, people own the result.

## Architecture At A Glance

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Inter, Cairo, system-ui, sans-serif","background":"transparent","primaryColor":"#FFFFFF","primaryTextColor":"#0D0F12","primaryBorderColor":"#2196F3","lineColor":"#1565C0","clusterBkg":"#F8FAFC","clusterBorder":"#D7DEE8","edgeLabelBackground":"#FFFFFF","tertiaryColor":"#FFC107","tertiaryTextColor":"#0D0F12","titleColor":"#0D0F12"},"flowchart":{"curve":"basis","nodeSpacing":46,"rankSpacing":62,"padding":18}}}%%
flowchart LR
  subgraph Spine["Brand spine"]
    direction TB
    BrandGuide["Brand Guidelines<br/>`apps/brand`"]
    Tokens["Design tokens<br/>Poppins · Inter · Cairo"]
    Shared["Shared packages<br/>`packages/*`"]
  end

  subgraph Markets["Market experiences"]
    direction TB
    EG["Egypt site<br/>Masri Arabic + English"]
    AE["UAE site<br/>Khaliji Arabic + English"]
    BrandApp["Brand app<br/>Assets + prompt guidance"]
  end

  subgraph Launcher["Launcher operations"]
    direction TB
    Hub["MediaBubble Launcher<br/>Tasks · Time · CRM · AI"]
    TaskFlow["Task board"]
    TimeFlow["Time + capacity"]
    AiFlow["OPUS + Prompt Studio"]
    VizFlow["Charts + infographics"]
  end

  subgraph Platform["Platform layer"]
    direction TB
    Vercel["Vercel deployments"]
    Postgres["Supabase Postgres"]
    Redis["Redis realtime"]
  end

  BrandGuide --> Tokens --> Shared
  Shared --> EG
  Shared --> AE
  Shared --> BrandApp
  Shared --> Hub

  Hub --> TaskFlow
  Hub --> TimeFlow
  Hub --> AiFlow
  AiFlow --> VizFlow

  EG --> Vercel
  AE --> Vercel
  BrandApp --> Vercel
  Hub --> Vercel
  Hub --> Postgres
  Hub --> Redis

  classDef brand fill:#FFC107,stroke:#E0A800,color:#0D0F12,stroke-width:1.6px;
  classDef spine fill:#FFFFFF,stroke:#2196F3,color:#0D0F12,stroke-width:1.4px;
  classDef market fill:#F4FAFF,stroke:#2196F3,color:#0D0F12,stroke-width:1.3px;
  classDef ops fill:#1565C0,stroke:#0D47A1,color:#FFFFFF,stroke-width:1.5px;
  classDef module fill:#FFFFFF,stroke:#D7DEE8,color:#0D0F12,stroke-width:1.1px;
  classDef infra fill:#F2FFFA,stroke:#1AD191,color:#0D0F12,stroke-width:1.2px;

  class BrandGuide brand
  class Tokens,Shared spine
  class EG,AE,BrandApp market
  class Hub ops
  class TaskFlow,TimeFlow,AiFlow,VizFlow module
  class Vercel,Postgres,Redis infra

  style Spine fill:#FFF8D7,stroke:#FFC107,color:#0D0F12
  style Markets fill:#F4FAFF,stroke:#2196F3,color:#0D0F12
  style Launcher fill:#F8FAFC,stroke:#1565C0,color:#0D0F12
  style Platform fill:#F2FFFA,stroke:#1AD191,color:#0D0F12
```

## Local Setup

### Prerequisites

- Node.js 22+
- npm 10+
- PostgreSQL for Launcher data
- Redis if you want realtime chat locally

### Install

```bash
npm ci
cp .env.example .env.local
cp apps/launcher/.env.example apps/launcher/.env.local
```

### Product Close-Ups

<table>
  <tr>
    <td width="50%">
      <img src="docs/assets/github/brand-guidelines-macbook-pro.png" alt="MediaBubble Brand Guidelines displayed inside a MacBook Pro mockup" />
      <br />
      <sub><strong>Brand Guidelines</strong></sub>
    </td>
    <td width="50%">
      <img src="docs/assets/github/brand-color-system-macbook-pro.png" alt="MediaBubble color system displayed inside a MacBook Pro mockup" />
      <br />
      <sub><strong>Color System</strong></sub>
    </td>
  </tr>
</table>

### Database

```bash
npm run db:deploy
npm run db:seed
```

### Dev servers

| App | Command | URL |
| :--- | :--- | :--- |
| Egypt site | `npm run dev:eg` | http://localhost:3000 |
| UAE site | `npm run dev:ae` | http://localhost:3001 |
| Brand app | `npm run dev:brand` | http://localhost:3002 |
| Launcher | `npm run dev:launcher` | http://localhost:3003 |

### Realtime chat

```bash
npm run ws:launcher
```

### Clean restarts

Use these when stale caches or old workers get in the way:

```bash
npm run dev:eg:clean
npm run dev:ae:clean
npm run dev:launcher:clean
```

## Working Rules

- Install from the repo root only.
- Keep `package-lock.json` in sync with dependency changes.
- Treat `apps/web-eg` as the source market site and sync structural changes to `apps/web-ae`.
- Launcher-specific setup, seeds, and deploy steps live in [apps/launcher/README.md](apps/launcher/README.md).
- Product context for the Launcher lives in [PRODUCT.md](PRODUCT.md) and [docs/brand/DESIGN.md](docs/brand/DESIGN.md).
- Keep planning material under `docs/`.

## Repo Map

| Area | Path | Purpose |
| :--- | :--- | :--- |
| Egypt site | `apps/web-eg` | Public Egyptian market site |
| UAE site | `apps/web-ae` | Public UAE market site |
| Brand app | `apps/brand` | Brand guidelines, assets, and prompts |
| Launcher | `apps/launcher` | Internal operations platform |
| Shared code | `packages/` | Design system, shared helpers, and common utilities |
| Docs | `docs/` | Planning, references, and implementation notes |

## Documentation

| Doc | Why it matters |
| :--- | :--- |
| [docs/README.md](docs/README.md) | Main documentation index |
| [docs/CONTEXT.md](docs/CONTEXT.md) | Repo-wide AI handoff and status |
| [apps/launcher/README.md](apps/launcher/README.md) | Launcher setup, database, and deploy steps |
| [docs/brand/DESIGN.md](docs/brand/DESIGN.md) | Brand system, tokens, and visual rules |

## Notes

- The repository is private, so the CI badge uses a static shields.io link.
- The root should stay lean. Keep only `README.md`, `AGENTS.md`, and `PRODUCT.md` at the top level, plus normal config files.
- Extra planning material belongs under `docs/`.

## Support

Primary contact: Yasser Dorgham - yasser.dorgham@gmail.com

[![HubSpot](https://img.shields.io/badge/HubSpot-CRM-FF7A59?logo=hubspot&logoColor=white)](https://www.hubspot.com/) [![Resend](https://img.shields.io/badge/Resend-Email-black?logo=resend&logoColor=white)](https://resend.com/)
