# OPUS — MediaBubble Autonomous Marketing Platform

**OPUS** (Operational Platform for Unified Strategy) is the marketing intelligence layer inside **MediaBubble Launcher**. It turns a strategic brief into executed, optimized campaigns — with automation, usage metering, and performance review in one place.

---

## Start Here

| Audience | Document |
|----------|----------|
| **Everyone** | [Who we build for, pain, and value](./product/WHO-PAIN-VALUE.md) |
| **Product** | [PRD](./product/PRD.md) · [Delivery summary](./product/DELIVERY_SUMMARY.md) |
| **Engineering** | [Development guide](./development/README.md) |
| **Architecture** | [Architecture index](./architecture/README.md) |
| **Integrations** | [Meta, Google, HubSpot…](./integrations/INTEGRATIONS_STRATEGY.md) |
| **Roadmap** | [3-year plan](./roadmap/3YEAR_ROADMAP.md) |
| **Planning session** | [Session synthesis](./CHAT_SESSION_INDEX.md) |
| **Strategy (2026)** | [Continue vs rebuild](./STRATEGIC_DECISION_ANALYSIS.md) · [Clean-slate rethink](./RETHINK_CLEAN_ARCHITECTURE.md) |

---

## Folder Structure

```
docs/opus/
├── README.md                 ← You are here
├── product/                  Who, why, PRD, value proposition
├── architecture/             System design, scalability, phased foundation
├── integrations/             External APIs + automation engine
├── development/              Implementation guides by workstream
├── operations/               Deploy, env, runbooks
├── roadmap/                  Strategic timelines
├── session/                  Deduplicated planning-session notes
└── archive/                  Raw exports
```

---

## Implementation in Launcher

OPUS ships as **`apps/launcher/lib/opus/`** plus routes under **`/opus`** and **`/api/opus`**.

| Feature | Route | Code |
|---------|-------|------|
| Command center | `/opus` | `app/(app)/opus/` |
| Brief builder | `/opus/briefs/new` | `lib/opus/briefs/` |
| Triggers | `/opus/triggers` | `lib/opus/triggers/` |
| Usage metering | `/opus/usage` | `lib/opus/billing/` |
| Performance review | `/opus/campaigns/[id]/performance` | `lib/opus/metrics/` |

**Database:** migration `0008_opus` — `opus_briefs`, `opus_triggers`, `opus_trigger_runs`, `opus_campaign_metrics`, `opus_usage_periods`.

**Seed:** `pnpm run db:seed` creates 4 default triggers + sample metrics.

---

## Core Promise

> From brief to results in hours, not days — with 80% less manual campaign ops.

Built for MediaBubble first (Hurghada agency ops, EN + Arabic), extensible to client **Managed OPUS** upsells.

---

## Quick Commands

```bash
pnpm run dev:launcher          # http://localhost:3003
pnpm run db:migrate            # apply 0008_opus
pnpm run db:seed               # triggers + sample data
nx run launcher:test           # includes lib/opus tests
```

---

## Related Launcher Modules

OPUS extends existing Launcher capabilities — it does not replace them:

- **Campaigns** (`/campaigns`) — proposals + live campaigns
- **Automation** (`/automation`) — general workflows
- **AI Tools** (`/ai`) — Claude content generation
- **CRM** — clients, invoices, HubSpot sync (future)
