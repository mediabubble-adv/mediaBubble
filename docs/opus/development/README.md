# OPUS Development Guide

Implementation reference for engineers working on OPUS inside MediaBubble Launcher.

---

## Workstreams

| # | Guide | Scope |
|---|-------|-------|
| 1 | [Getting started](./01-getting-started.md) | Env, migrate, seed, dev server |
| 2 | [Data model](./02-data-model.md) | Prisma tables, relations |
| 3 | [Event bus](./03-event-bus.md) | Pub/sub, correlation IDs |
| 4 | [Automation triggers](./04-automation-triggers.md) | Cron, handlers, runs |
| 5 | [Brief to campaign](./05-brief-to-campaign.md) | Brief builder flow |
| 6 | [Billing & metering](./06-billing-metering.md) | Quotas, enforcement |
| 7 | [UI pages](./07-ui-pages.md) | Routes and components |
| 8 | [Testing](./08-testing.md) | Unit tests, manual QA |

---

## Code Map

```
apps/launcher/lib/opus/
├── types.ts                 Shared types
├── schemas.ts               Zod API schemas
├── event-bus.ts             In-process pub/sub
├── workflow-engine.ts       Event subscriptions
├── api/rbac.ts              Route auth helpers
├── briefs/service.ts        Brief CRUD + events
├── triggers/
│   ├── engine.ts            Execute + list runs
│   ├── handlers.ts          WeeklySocialPlanning, etc.
│   └── serialize.ts         Row mappers + seed data
├── billing/
│   ├── plans.ts             Starter / Pro / Enterprise
│   ├── metering.ts            Usage periods
│   └── enforcement.ts       Quota checks
└── metrics/
    └── campaign-performance.ts
```

---

## API Endpoints

| Method | Path | Access |
|--------|------|--------|
| GET | `/api/opus/summary` | Contributor+ |
| GET/POST | `/api/opus/briefs` | Contributor+ |
| GET/POST | `/api/opus/triggers` | GET: Contributor+, POST: Manager+ |
| POST | `/api/opus/triggers/[id]/run` | Manager+ |
| GET | `/api/opus/triggers/[id]/runs` | Contributor+ |
| GET | `/api/opus/usage` | Contributor+ |
| GET | `/api/opus/campaigns/[id]/performance` | Contributor+ |

---

## Phase Status

| Phase | Status |
|-------|--------|
| Foundation (schema, lib, UI shell) | ✅ Shipped |
| Brief → campaign link | ✅ Shipped |
| Triggers + manual run | ✅ Shipped |
| Usage metering | ✅ Shipped |
| Performance dashboard | ✅ Shipped (seed + computed fallback) |
| Meta/Google live publish | ⏳ Phase 2 |
| HubSpot closed loop | ⏳ Phase 2 |
| Stripe webhooks | ⏳ Phase 2 |
| Redis distributed cron | ⏳ Phase 2 |
