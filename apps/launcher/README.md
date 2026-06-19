# launcher.mediabubble.co

MediaBubble's unified internal operations platform. This app is being built per
`PHASE_1_EXECUTION_PROMPT.md` and the `LAUNCHER_*` design docs at the repo root.

## Status: Phase 1 — Week 1 (Foundation)

This is the **Week 1 foundation slice**, scoped to what's achievable without
provisioning live infrastructure. Delivered:

- ✅ Nx Next.js 16 app scaffold (`apps/launcher`), mirroring the monorepo's
  conventions (Tailwind + design-system preset, TS, ESLint). Builds + typechecks.
- ✅ Dashboard shell placeholder (`app/page.tsx`).
- ✅ Prisma **baseline migration** = the canonical database schema, verbatim.

### Deliberately deferred

- ❌ Live PostgreSQL / Redis (decision: schema + Prisma only, no provisioning yet).
- ❌ Auth, API endpoints, real-time, Task/Time MVP apps — Weeks 2–4.

## Database

The complete PostgreSQL schema (≈30 tables, indexes, views, functions,
triggers, seed data) is committed verbatim as the initial Prisma migration:

```
prisma/migrations/0001_init/migration.sql   # = LAUNCHER_DATABASE_SCHEMA.sql
prisma/schema.prisma                         # datasource + generator only (see below)
```

### Bringing the database online (Week 1 finish / Week 2 start)

The Phase 1 plan says *generate the Prisma schema from the database, don't write
it by hand*. With no DB yet, `schema.prisma` declares only the datasource and
generator. Once a Postgres instance exists (local, or a host such as **Neon** or
**Supabase**):

```bash
# 1. Install Prisma (not yet added to the workspace deps)
npm install -D prisma && npm install @prisma/client

# 2. Point at your database
cp apps/launcher/.env.example apps/launcher/.env.local   # set DATABASE_URL

# 3. Apply the canonical schema (creates all tables + seed data)
npx prisma migrate deploy --schema apps/launcher/prisma/schema.prisma

# 4. Mark the baseline as applied, then introspect the models
npx prisma migrate resolve --applied 0001_init --schema apps/launcher/prisma/schema.prisma
npx prisma db pull   --schema apps/launcher/prisma/schema.prisma
npx prisma generate  --schema apps/launcher/prisma/schema.prisma
```

Seed data (departments, system settings) is embedded in the baseline migration,
so `migrate deploy` seeds the DB — no separate seed step.

## ⚠️ Findings to resolve before Week 2 (auth)

A "schema is immutable / additive-only" rule is stated in the plan, but the
Week 2 auth spec needs tables the canonical schema **does not contain**:

- **Email verification tokens** (`/api/auth/verify-email`)
- **Password reset tokens** (`/api/auth/reset-password`)
- No `sessions` table — implies JWT-only sessions (consistent with the spec, but
  worth confirming refresh-token storage strategy).

These will require an **additive** `0002_auth_tokens` migration in Week 2. The
immutability rule (only add, never remove/rename) still holds.

## Develop

```bash
npm run dev:launcher   # http://localhost:3003
```

## Reference

- `PHASE_1_EXECUTION_PROMPT.md` — week-by-week plan
- `LAUNCHER_DATABASE_SCHEMA.sql` — canonical schema (source of truth)
- `LAUNCHER_TECHNICAL_ROADMAP.md`, `IMPLEMENTATION_PHASE_1_DETAILED.md`
