<div align="center">

# MediaBubble Launcher

**Internal ops platform** — tasks, time, CRM, finance, chat, AI, automation, and campaigns.

[launcher.mediabubble.co](https://launcher.mediabubble.co) · Part of the [MediaBubble monorepo](../../README.md)

</div>

---

**Status:** Phase 3 slice 1 shipped locally — **production deploy pending** (Vercel env + DNS).  
Scope and progress: [`LAUNCHER_PLAN_V2.md`](../../LAUNCHER_PLAN_V2.md).

**Contents:** [Installation](#installation) · [Modules](#modules) · [Develop](#develop) · [Database](#database) · [Ship checklist](#ship-checklist-vercel--dns) · [Reference](#reference)

---

## Installation

Run these steps from the **repository root** unless noted.

### Prerequisites

| Requirement | Notes |
|-------------|--------|
| Node.js **22+** | Same as monorepo CI |
| npm or pnpm | Root lockfile: `package-lock.json` |
| Supabase Postgres | Transaction pooler (`DATABASE_URL`) + session/direct URL (`DIRECT_URL`) |
| Optional | `RESEND_API_KEY` (verify/reset email), `GEMINI_API_KEY` (live AI runs), `REDIS_URL` (chat WebSocket) |

### 1. Install monorepo dependencies

```bash
git clone https://github.com/mediabubble-adv/mediaBubble.git
cd mediaBubble
npm ci
```

### 2. Configure environment

```bash
cp apps/launcher/.env.example apps/launcher/.env.local
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | Supabase **transaction** pooler (6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Yes | **Session** pooler (5432) — Prisma migrations |
| `JWT_SECRET` | Yes | `openssl rand -base64 48` |
| `RESEND_API_KEY` | Prod | Email verify / password reset |
| `GEMINI_API_KEY` | No | Live Prompt Studio (mock offline without it) |
| `REDIS_URL` | No | Chat pub/sub + WebSocket bridge |

For ad-hoc Prisma CLI from `apps/launcher/prisma/`, mirror the same vars in `apps/launcher/prisma/.env` (gitignored).

### 3. Migrate and seed

Root `db:*` scripts load `apps/launcher/.env.local` automatically:

```bash
npm run db:deploy    # apply migrations
npm run db:seed      # departments, RBAC users, finance, CRM samples
npm run db:generate  # after schema changes
```

**Seeded dev password:** `Launch@2026` (override with `SEED_PASSWORD`).

| Role | Email |
|------|--------|
| Admin | `yasser@mediabubble.co` |
| Manager | `manager@mediabubble.co` |
| Contributor | `creative@mediabubble.co` |
| Viewer | `viewer@mediabubble.co` |

### 4. Start the app

```bash
npm run dev:launcher          # http://localhost:3003
```

**Chat realtime** (optional — second terminal):

```bash
npm run ws:launcher           # WebSocket bridge :3004
```

Open `/chat` in two browsers; live delivery needs Redis + the bridge. Without it, the UI falls back to SSE polling.

**After cache / Playwright issues:**

```bash
npm run dev:launcher:clean    # kill :3003, wipe .next/cache, restart
```

### 5. Verify

```bash
npm run test:launcher
npx playwright test --config apps/launcher/playwright.config.ts
```

---

## Modules

| Route | Module | Highlights |
|-------|--------|------------|
| `/tasks` | Task Board | Kanban, DnD, comments, inline timer → `time_entries` |
| `/time` | Time Management | Timesheet, leave, capacity, calendar, manager approvals |
| `/crm` | CRM | Clients, invoices, quotations, quote → invoice |
| `/ai` | AI Tools | Prompt Studio, `{{variables}}`, execution logs |
| `/chat` | Communication Hub | Channels, messages, Redis + WebSocket (optional) |
| `/automation` | Workflows | Triggers, steps, manual test runs |
| `/campaigns` | Campaigns | Pitch proposals, live campaigns linked to CRM |
| `/finance` | Finance | Ledger, KPIs, EGP/AED/USD, charts |
| `/leaderboard` | Gamification | XP, streak, podium, achievements |
| `/portal` | Client Portal | Magic-link client invoice view (Phase 3 slice 1) |

**Foundation:** JWT auth (HS256), RBAC, `proxy.ts` route gate, Resend email, collapsible sidebar + `Cmd+K` palette.

---

## Develop

| Command | Purpose |
|---------|---------|
| `npm run dev:launcher` | Dev server (:3003) |
| `npm run dev:launcher:clean` | Reset port + Turbopack cache |
| `npm run ws:launcher` | Chat WebSocket bridge (:3004) |
| `npm run test:launcher` | Jest (`apps/launcher/lib/**/*.test.ts`) |
| `npm run db:migrate` | Create/apply dev migrations |
| `npm run db:studio` | Prisma Studio |

---

## Database

- **ORM:** Prisma 6 · **DB:** Supabase Postgres  
- **Migrations:** `apps/launcher/prisma/migrations/` (`0001`–`0006`)  
- **Schema reference:** [`LAUNCHER_DATABASE_SCHEMA.sql`](../../LAUNCHER_DATABASE_SCHEMA.sql)

Production deploy runs `prisma migrate deploy` via root script `vercel-build:launcher`.

---

## Ship checklist (Vercel + DNS)

Production build verified locally: `npx nx build launcher` (also runs in CI).

### 1. Vercel project settings

In [Vercel → launcher → Settings](https://vercel.com/mediabubble/launcher/settings):

| Setting | Value |
|---------|--------|
| **Git repository** | `mediabubble-adv/mediaBubble` (branch `master`) |
| **Root Directory** | `apps/launcher` |
| **Include source files outside of the Root Directory** | **Enabled** |
| **Framework** | Next.js |

`apps/launcher/vercel.json` runs `cd ../.. && npm ci` then `vercel-build:launcher`.

Re-link locally:

```bash
cd apps/launcher && vercel link --yes --project launcher
```

**One-time env sync** (after `.env.local` / `prisma/.env` are filled):

```bash
bash apps/launcher/scripts/ship-env-to-vercel.sh
```

Generate a **new** production `JWT_SECRET` if `.env.local` still uses the dev placeholder.

<details>
<summary><strong>Troubleshooting: <code>npm ci</code> — no package-lock.json</strong></summary>

If the build log shows **~200 deployment files** and install fails, Vercel is uploading only `apps/launcher` instead of the monorepo root:

1. Connect the GitHub repo (Settings → Git).
2. Set **Root Directory** to `apps/launcher`.
3. Enable **Include source files outside of the Root Directory**.
4. Redeploy from Git.

Do **not** add a separate lockfile under `apps/launcher`.

</details>

### 2. Environment variables

Set for **Production**, **Preview**, and **Development** in [Vercel env settings](https://vercel.com/mediabubble/launcher/settings/environment-variables):

| Variable | Production value |
|----------|------------------|
| `DATABASE_URL` | Supabase transaction pooler or Prisma Compute URL |
| `DIRECT_URL` | Duplicate `DATABASE_URL` or Supabase session pooler (5432) |
| `JWT_SECRET` | New secret — do not reuse dev |
| `NEXT_PUBLIC_SITE_URL` | `https://launcher.mediabubble.co` |
| `RESEND_API_KEY` | Verified sender in Resend |
| `GEMINI_API_KEY` | Optional |

### 3. First production deploy

**Preferred:** push to `master` after step 1.

CLI fallback (after Git + monorepo settings):

```bash
cd apps/launcher && vercel --prod
```

### 4. DNS

| Type | Name | Value |
|------|------|--------|
| `CNAME` | `launcher` | `cname.vercel-dns.com` |

Add `launcher.mediabubble.co` under Vercel → launcher → **Settings → Domains**.

### 5. Post-deploy

```bash
npm run db:seed   # once, from a machine with prod DATABASE_URL
```

Smoke test: login → Tasks → CRM → Time → Chat.

### 6. Ongoing releases

Commit new migrations before merging to `master`. Each deploy runs `prisma migrate deploy` automatically.

---

## Reference

| Document | Purpose |
|----------|---------|
| [`LAUNCHER_PLAN_V2.md`](../../LAUNCHER_PLAN_V2.md) | Phase scope and progress |
| [`LAUNCHER_DATABASE_SCHEMA.sql`](../../LAUNCHER_DATABASE_SCHEMA.sql) | Canonical SQL schema |
| [`LAUNCHER_TECHNICAL_ROADMAP.md`](../../LAUNCHER_TECHNICAL_ROADMAP.md) | Full 8-app vision |
| [Monorepo README](../../README.md) | Install all apps, CI, shared packages |
