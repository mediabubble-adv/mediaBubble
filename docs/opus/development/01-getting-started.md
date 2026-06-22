# Getting Started with OPUS Development

## Prerequisites

- MediaBubble monorepo cloned
- `apps/launcher/.env.local` with `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`
- Node 22 + root `pnpm install`

## Setup

```bash
pnpm run db:migrate    # applies 0008_opus
pnpm run db:generate   # refresh Prisma client
pnpm run db:seed       # 4 OPUS triggers + sample metrics
pnpm run dev:launcher    # http://localhost:3003
```

## Login (seed accounts)

| Email | Role | Password |
|-------|------|----------|
| yasser@mediabubble.co | Admin | Launch@2026 |
| manager@mediabubble.co | Manager | Launch@2026 |

## Verify OPUS

1. Open `/opus` — command center loads summary  
2. `/opus/briefs/new` — create a brief linked to a client  
3. `/opus/triggers` — run Weekly Social Planning (Manager+)  
4. `/opus/usage` — see metering gauges  
5. `/opus/campaigns/{id}/performance` — performance review  

## Tests

```bash
nx run launcher:test --testPathPattern=opus
```
