# MediaBubble

Nx monorepo for MediaBubble marketing sites (Egypt + UAE) and the interactive brand guidelines app.

## Apps

| App | Domain | Dev command | Port |
|-----|--------|-------------|------|
| `web-eg` | [mediabubble.co](https://mediabubble.co) | `npm run dev:eg` | 3000 |
| `web-ae` | [mediabubble.ae](https://mediabubble.ae) | `npm run dev:ae` | 3001 |
| `brand` | [brand.mediabubble.co](https://brand.mediabubble.co) | `npm run dev:brand` | 3002 |

## Packages

| Package | Purpose |
|---------|---------|
| `@mediabubble/design-system` | Shared UI primitives + Tailwind preset (Rollup build) |
| `@mediabubble/shared` | Env validation, API clients, i18n factory, utilities |
| `@mediabubble/content-pipeline` | UAE localization pipeline (`nx run content-pipeline:localize`) |

## Quick start

```bash
npm install
npm run dev:eg
```

## Clone and diverge (UAE)

`web-ae` is a structural clone of `web-eg`. After Egypt changes land:

```bash
npx tsx scripts/clone-eg-to-ae.ts
```

Then apply UAE-specific metadata/i18n in `apps/web-ae` (Khaliji Arabic locale, `mediabubble.ae` URLs). For content localization at scale:

```bash
npx nx run content-pipeline:localize
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:eg` | Egypt marketing site |
| `npm run dev:ae` | UAE marketing site |
| `npm run dev:brand` | Brand guidelines app |
| `npm run build` | Build all Nx projects |
| `npm run graph` | Dependency graph |
| `npm run lint` | Lint all projects |
| `npm run typecheck` | Typecheck all projects |

## Project layout

```
apps/
  web-eg/          Egypt marketing (mediabubble.co)
  web-ae/          UAE marketing clone (mediabubble.ae)
  brand/           Brand guidelines (brand.mediabubble.co)
packages/
  design-system/   Shared UI + Tailwind preset
  shared/          Cross-app utilities and clients
  content-pipeline/ UAE localization tooling
scripts/
  clone-eg-to-ae.ts
docs/              Documentation (see docs/README.md)
```

## Vercel

Each app has its own `vercel.json` with:

```json
"buildCommand": "cd ../.. && npx nx build <app>"
```

Set the Vercel project root directory to `apps/web-eg`, `apps/web-ae`, or `apps/brand`.

## Documentation

**For AI tools and full project context:** start with **[docs/CONTEXT.md](./docs/CONTEXT.md)**.

| Start with | When you need |
|------------|----------------|
| [docs/CONTEXT.md](./docs/CONTEXT.md) | Progress, structure, plans |
| [docs/getting-started/README_START_HERE.md](./docs/getting-started/README_START_HERE.md) | Website Improvement "Start Here" Guide |
| [docs/getting-started/EXECUTION_START_HERE.md](./docs/getting-started/EXECUTION_START_HERE.md) | Audit Fixes Execution Guide (using Cursor/Claude) |
| [docs/audits/COMPREHENSIVE_AUDIT_REPORT.md](./docs/audits/COMPREHENSIVE_AUDIT_REPORT.md) | Complete codebase audit report |
| [docs/planning/MASTER_DEVELOPMENT_PLAN.md](./docs/planning/MASTER_DEVELOPMENT_PLAN.md) | Master 12-week development plan & roadmap |
| [docs/website/README.md](./docs/website/README.md) | Website audit and conversions |
| [docs/README.md](./docs/README.md) | Documentation index |

## Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Nx · i18next (EN + dialect locales)

## Contact

yasser.dorgham@gmail.com
