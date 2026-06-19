# launcher.mediabubble.co

MediaBubble's unified internal operations platform. This app is being built per
`PHASE_1_EXECUTION_PROMPT.md` and the `LAUNCHER_*` design docs at the repo root.

## Status: Phase 1 — Weeks 1–2 (Foundation + auth core)

Scoped to what's verifiable without live infrastructure. Delivered:

**Week 1 — foundation**
- ✅ Nx Next.js 16 app scaffold (`apps/launcher`), mirroring the monorepo's
  conventions (Tailwind + design-system preset, TS, ESLint). Builds + typechecks.
- ✅ Dashboard shell placeholder (`app/page.tsx`).
- ✅ Prisma **baseline migration** = the canonical database schema, verbatim.

**Week 2 — auth core (DB-independent, fully unit-tested)**
- ✅ `0002_auth_tokens` additive migration (email-verification + password-reset
  tokens — closes the gap noted below).
- ✅ `lib/auth`: password hashing (scrypt), HS256 JWT, one-time tokens, Zod
  request schemas, RBAC — all via `node:crypto`/`zod`, no new deps.
- ✅ `lib/api/response.ts`: standardized success/error envelopes.
- ✅ 26 Jest unit tests (`npm test` → project `launcher`).

### Deliberately deferred

- ❌ Live PostgreSQL / Redis (decision: schema + Prisma only, no provisioning yet).
- ❌ **Auth HTTP endpoints** — the `lib/auth` core is ready, but wiring
  `/api/auth/*` route handlers needs the generated Prisma client (live DB).
- ❌ Real-time, Task/Time MVP apps — Weeks 3–4.

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

## ✅ Resolved finding (auth token tables)

The canonical schema lacked the token tables the Week 2 auth spec needs. Added,
**additively**, in `prisma/migrations/0002_auth_tokens/migration.sql`:

- **Email verification tokens** (`/api/auth/verify-email`)
- **Password reset tokens** (`/api/auth/reset-password`)

Both store only a SHA-256 hash of the token, never the raw value. No `sessions`
table — sessions are JWT-only (consistent with the spec); refresh-token rotation,
if added later, gets its own additive migration. The immutability rule (only
add, never remove/rename) holds.

## Crypto note

`lib/auth` uses Node's built-in `crypto` (scrypt for passwords, HMAC for JWT) to
stay dependency-free and fully unit-testable now. If the team prefers `bcrypt` /
`jsonwebtoken`, swap the implementations behind the same function signatures —
call sites won't change.

## Develop

```bash
npm run dev:launcher   # http://localhost:3003
```

## Reference

- `PHASE_1_EXECUTION_PROMPT.md` — week-by-week plan
- `LAUNCHER_DATABASE_SCHEMA.sql` — canonical schema (source of truth)
- `LAUNCHER_TECHNICAL_ROADMAP.md`, `IMPLEMENTATION_PHASE_1_DETAILED.md`
