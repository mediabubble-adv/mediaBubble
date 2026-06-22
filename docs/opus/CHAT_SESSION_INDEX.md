# OPUS Planning Session — Full Synthesis

**Date:** June 22, 2026  
**Participants:** Yasser Dorgham + AI planning assistant  
**Scope:** OPUS integration into MediaBubble Launcher

---

## Executive Summary

OPUS is an **autonomous marketing orchestration platform** designed to close the loop from strategic brief → content → ads → leads → CRM → revenue attribution. The planning session mapped how OPUS fits MediaBubble's Nx monorepo, bilingual market sites (EN + Masri/Khaliji), and internal ops app **MediaBubble Launcher**.

**Core business goals:**

- Save **15+ hours/week** per team member on campaign ops
- Enable **"OPUS-Managed Campaigns"** upsell ($2K–5K/month per client)
- Drive **Hurghada service leads** with conversion-first UX
- Differentiate via proprietary closed-loop automation + bilingual support

**Technical anchor:** Extend Launcher (`apps/launcher`) with OPUS intelligence — Prisma/Supabase, JWT auth, Redis pub/sub, BullMQ jobs, Claude content generation, Meta/Google/HubSpot integrations.

---

## Strategic Evolution

### Frame 1 — Integration (initial)

OPUS as an engine **inside** Launcher:

- Routes: `/campaigns`, `/automation`
- Prisma models: `OpusBrief`, `OpusCampaign`, `OpusAsset`, `OpusMetric`, `OpusWorkflow`
- Phased rollout aligned with OPUS 24-week roadmap

### Frame 2 — Replacement

User directive: *"I want replace launcher with opus"*

- New primary app: `apps/opus` (port 3004)
- Migrate tasks, CRM, finance, time, chat from Launcher
- Soft-deprecate `apps/launcher` with redirects

### Frame 3 — In-place evolution (final)

User directive: *"Let's make this convention about improve opus to be MediaBubble team main workflow tool"*

- **Keep Launcher** as the shell; OPUS becomes the workflow layer
- Phase 0 execution inside existing app structure
- No big-bang rename — incremental module delivery

---

## Architecture Decisions

### OPUS microservices (12 services, 4 layers)

| Layer | Services |
|-------|----------|
| Foundation | Profile Service |
| Planning | Planning Service |
| Execution | Task, Workflow & Automation, Content Generation, Publishing |
| Intelligence | Analytics, Optimization, Reporting |
| Support | Notification, Chat, Integration |

**Communication:** Event-driven — Redis Pub/Sub + BullMQ job queues + correlation IDs.

### Data model extensions

Link OPUS entities to existing Launcher models:

- `OpusBrief` → `Task`, `Client`
- `OpusCampaign` → `FinanceTransaction`, metrics
- `OpusAutomationTrigger` → workflows, cron schedules
- All scoped by `organizationId` for multi-tenant isolation

### MediaBubble alignment principles

1. **Conversion-first** — CTAs on every success screen
2. **Bilingual** — EN + Masri via existing `useI18n()`
3. **Brand tokens** — `@mediabubble/design-system`, `brand-*` Tailwind
4. **Launcher-native** — Reuse JWT (`proxy.ts`), Prisma, CRM, finance modules
5. **Quality** — WCAG 2.1 AA, TypeScript strict, Lighthouse ≥90

---

## Phased Rollout (Consolidated)

| Phase | Timeline | Deliverables |
|-------|----------|--------------|
| **0 — Foundation** | Week 1 | Prisma schema, env vars, Brief entry form, docs |
| **1 — Brief → Content → Approval** | Weeks 1–4 | Claude parser, multi-channel content, approval workflow, campaign stub |
| **2 — Integrations & Intelligence** | Weeks 5–12 | Meta/Google full integration, GA4/HubSpot/Stripe loop, automation engine, dashboards |
| **3 — Advanced & Scale** | Weeks 13+ | Video gen, predictive analytics, white-label, multi-touch attribution |

---

## Workstreams Completed in Session (Design / Spec Level)

### 1. Event infrastructure

- Event bus with Redis Pub/Sub + BullMQ
- Event types: `PlanApproved`, `TasksCreated`, `ContentGenerated`, `CampaignLaunched`, `PerformanceThresholdCrossed`
- Workflow engine chaining plan → tasks → content → optimization
- Campaign Hub UI + long-running task processing

### 2. Automation engine

- Trigger types: **Time**, **Event**, **Data**
- Sample triggers: `WeeklySocialPlanning`, `PerformanceMonitoring`, `LeadCaptured`, `HighEngagementBoost`
- Real cron (node-cron, Africa/Cairo timezone)
- Distributed locking via Redis / Upstash (serverless-safe)
- Trigger Management UI at `/automation/triggers`

### 3. Multi-tenant & security

- Shared DB + `organizationId` + application-level RLS
- RBAC roles: `ADMIN`, `MANAGER`, `CONTRIBUTOR`, `VIEWER`
- Trigger access: Admin + Manager only
- Organization Switcher in header
- Org isolation on all Prisma queries

### 4. Billing & metering

- Stripe Billing: one customer per organization
- Plans: Starter ($999), Professional ($2,999), Enterprise (custom)
- **Hybrid metering:** base subscription + tier quotas + overage
- Metered events: AI generations, campaign launches, optimizations, API calls
- Usage enforcement: soft warnings → hard blocks
- Usage dashboard at `/settings/billing/usage`

### 5. UI wireframes

Seven major screens designed (ASCII):

1. OPUS Dashboard (command center)
2. Trigger Management
3. Usage Dashboard
4. Campaign Brief Builder (5-step wizard)
5. Campaign Dashboard
6. Organization Settings / Switcher
7. Weekly Planning Workflow preview

Plus refined **Campaign Performance Review** and **Weekly Social Planning** workflow (6 steps).

---

## Key Workflows

### WeeklySocialPlanning

| Step | Action |
|------|--------|
| 1 | Fetch approved social plan / brief context |
| 2 | Generate content in parallel (IG, LinkedIn, TikTok, Facebook) |
| 3 | Create review tasks with smart assignment |
| 4 | Wait for approval (24h timeout, escalate on failure) |
| 5 | Schedule posts with UTM tracking |
| 6 | Send summary, log execution, update usage metering |

**Trigger:** Every Monday 9:00 AM (Africa/Cairo)

### Brief → Campaign (MVP)

1. User submits brief (goal, audience, budget, platforms, messages)
2. Claude parses brief → structured plan
3. Content generation (150+ variants across channels)
4. Human approval via task board
5. Campaign activation (Meta/Google publishing stub → full integration)

---

## Success Metrics (from session)

| Category | Target |
|----------|--------|
| Campaign setup time | < 30 minutes |
| Content approval rate | 85%+ |
| Publishing success | 99%+ |
| NPS (OPUS features) | 50+ |
| ROAS improvement | +35% average |
| System uptime | 99.9% |
| API latency P95 | < 200ms |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| API rate limits (Meta/Google) | Queue + exponential backoff |
| Claude cost | Caching, batching, confidence-based auto-approve |
| Human review bottleneck | AI confidence scoring, auto-approve high-confidence |
| Data privacy | Org isolation, consent flows, audit logging |
| Bilingual parity | Existing `check:i18n` + Arabic skill pipeline |
| Upstash lock reliability | Fail-open fallback, TTL tuning |

---

## Open / Next Items (End of Session)

Priority backlog when session ended:

1. **WeeklySocialPlanning** — full React implementation (approval gallery, live status)
2. **Stripe Webhook Handler** — subscription lifecycle events
3. **Execution History dashboard** — automation run logs
4. **Slack notifications** — trigger events + alerts
5. **Meta/Google publishing** — real API integration (Phase 2)
6. **Campaign Brief Builder** — convert wireframe to React components

---

## How to Use These Docs

1. **Start here** for context and decisions
2. **Drill into** [`session/`](./session/) topic files for detail
3. **Cross-check** [`OPUS_*`](./) canonical specs for full architecture
4. **Verify** against `apps/launcher` before assuming implementation status
5. **Raw transcript** in [`archive/chat-raw-export-2026-06-22.md`](./archive/chat-raw-export-2026-06-22.md) if you need exact wording

---

## Duplication Note

The raw export contained **three near-identical blocks**:

- Lines ~1–887 ≈ ~887–1773 (integration + event bus arc)
- Lines ~1776–4371 ≈ ~4371–6966 (automation through weekly social)

All session topic files are **deduplicated** — read those instead of the raw export.
