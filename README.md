# MediaBubble Workspace

<div align="center">

<img src="apps/web-eg/public/assets/Logo/logo-favicon.svg" alt="MediaBubble logo" width="88" height="88" />

**Bilingual marketing sites, the brand system, and the internal operations hub in one Nx monorepo.**

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/mediabubble-adv/mediaBubble/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Nx](https://img.shields.io/badge/Nx-23-143055?logo=nx&logoColor=white)](https://nx.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[mediabubble.co](https://mediabubble.co) · [mediabubble.ae](https://mediabubble.ae) · [brand.mediabubble.co](https://brand.mediabubble.co) · [launcher.mediabubble.co](https://launcher.mediabubble.co)

</div>

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

## Repository Layout

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

Live sites:

- [MediaBubble Egypt](https://mediabubble.co)
- [MediaBubble UAE](https://mediabubble.ae)
- [MediaBubble Brand](https://brand.mediabubble.co)
- [MediaBubble Launcher](https://launcher.mediabubble.co)

