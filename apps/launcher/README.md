# launcher.mediabubble.co

MediaBubble's unified internal operations platform. Built per `LAUNCHER_PLAN_V2.md`
and the `LAUNCHER_*` design docs at the repo root.

## Status: Phase 1 complete (merged to `master`)

Phase 1 MVP ships **Task Board**, **Finance**, and **Gamification** on top of a
JWT auth foundation. Postgres runs on **Supabase** via Prisma; local dev uses port **3003**.

### Delivered

**Foundation**
- Nx Next.js 16 app (`apps/launcher`), Tailwind + design-system preset, ESLint, typecheck.
- Prisma schema (37 models), migrations `0001_init`, `0002_auth_tokens`, `0003_finance`.
- Supabase pooler wiring — `DATABASE_URL` (6543, transaction) + `DIRECT_URL` (5432, migrations).

**Auth**
- JWT sessions (HS256), scrypt passwords, one-time verify/reset tokens, RBAC
  (Viewer / Contributor / Manager / Admin).
- Auth API: signup, login, logout, verify-email, request/reset password.
- Auth UI: login, signup, verify-email, forgot/reset password.
- Route protection via `proxy.ts` (Next.js 16 builder).
- Resend email for verification and password reset (when `RESEND_API_KEY` is set).

**Nav shell**
- Collapsible sidebar, topbar, `Cmd+K` command palette, app layout.

**Task Board**
- Kanban API + UI (Backlog / In Progress / Review / Done), drag-and-drop, comments,
  inline timer → `time_entries`, assigned-to-me.

**Finance**
- Transactions ledger, KPI strip, currency switcher (EGP / AED / USD), cash-flow chart,
  expense donut, AI optimization brief (static copy).

**Gamification**
- XP / levels, hot streak, leaderboard podium, achievements grid.

**Testing**
- 74 Jest unit tests (`pnpm run test:launcher`).
- Playwright E2E: login → create task → timer → drag column
  (`npx playwright test --config apps/launcher/playwright.config.ts`).

### Deferred to Phase 2+

- Time Management (full module — inline task timer exists on the board).
- Redis, WebSocket realtime, CRM, AI Tools, Communication Hub, client portal.

---

## Database setup

1. Copy the env template and fill in Supabase credentials:

```bash
cp apps/launcher/.env.example apps/launcher/.env.local
# Set DATABASE_URL, DIRECT_URL, JWT_SECRET; optional RESEND_API_KEY
```

2. Apply migrations and seed from the **repo root** (scripts source `.env.local`):

```bash
pnpm run db:deploy    # apply migrations
pnpm run db:seed      # departments, 4 RBAC users, finance sample data
pnpm run db:generate  # regenerate Prisma client after schema changes
```

Seeded dev password: `Launch@2026` (override with `SEED_PASSWORD`).

For ad-hoc Prisma CLI from `apps/launcher/prisma/`, mirror the same vars in
`apps/launcher/prisma/.env` (git-ignored).

---

## Deploy (Vercel)

Root the Vercel project at `apps/launcher` (`apps/launcher/vercel.json` runs
`vercel-build:launcher` from the monorepo root).

**Required environment variables** (Project → Settings → Environment):

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` | Auto-injected by Prisma Compute, or Supabase **transaction** pooler (6543, `?pgbouncer=true`) |
| `DIRECT_URL` | **Required** — schema uses `directUrl`. Prisma Compute: set to the **same value** as `DATABASE_URL`. Supabase: **session** pooler (5432). |
| `JWT_SECRET` | `openssl rand -base64 48` |
| `RESEND_API_KEY` | Email verify/reset in production |

If deploy fails with `Environment variable not found: DIRECT_URL`, add `DIRECT_URL`
in the Vercel console (do not rely on Prisma Compute injecting it automatically).

After first deploy, run `pnpm run db:seed` against the production database once
(from a machine with prod env), or seed via Supabase SQL editor.

---

## Develop

```bash
pnpm run dev:launcher          # http://localhost:3003
pnpm run dev:launcher:clean    # kill :3003, wipe .next/cache, restart
```

Use `:clean` after Playwright E2E (leaves a dev server on 3003) or Turbopack cache issues.

### Useful commands

| Command | Purpose |
|---------|---------|
| `pnpm run test:launcher` | Jest unit tests |
| `pnpm run db:studio` | Prisma Studio |
| `pnpm run db:migrate` | Create/apply dev migrations |
| `npx playwright test --config apps/launcher/playwright.config.ts` | E2E gate |

---

## Reference

- `LAUNCHER_PLAN_V2.md` — Phase 1 scope + Phase 2 roadmap (single source of truth)
- `LAUNCHER_DATABASE_SCHEMA.sql` — canonical SQL schema
- `LAUNCHER_TECHNICAL_ROADMAP.md` — full 8-app vision
