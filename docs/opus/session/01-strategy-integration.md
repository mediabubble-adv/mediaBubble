# Strategy & Launcher Integration Plan

**Session date:** June 22, 2026  
**Status:** Planning / blueprint  
**Related specs:** [`OPUS_PRD_PRODUCT_REQUIREMENTS.md`](../OPUS_PRD_PRODUCT_REQUIREMENTS.md), [`OPUS_PHASED_FOUNDATION_ARCHITECTURE.md`](../OPUS_PHASED_FOUNDATION_ARCHITECTURE.md)

---

## Initial Scan Summary

The OPUS documentation package provides a production-ready blueprint for autonomous marketing orchestration. Alignment with MediaBubble:

| OPUS capability | MediaBubble fit |
|-----------------|-----------------|
| Brief → ads → leads → CRM → ROI loop | Direct support for Hurghada lead gen |
| Bilingual i18n hooks | Extends Masri/Khaliji setup |
| Brand token system | White-label under MediaBubble branding |
| Launcher synergy | Engine for tasks, campaigns, automation, analytics |
| Nx + Vercel path | Matches monorepo deployment model |

---

## Integration Plan v1.1

**Goal:** Transform Launcher from internal ops tool into a marketing command center.

### Core principles

1. Conversion-first CTAs on every OPUS screen
2. Full EN + Egyptian Arabic (Masri) with RTL
3. `@mediabubble/design-system` + `brand-*` tokens, dark/light mode
4. WCAG 2.1 AA, TypeScript strict, Lighthouse ≥90
5. Reuse Prisma/Supabase, JWT auth, task board, finance, CRM

### Architecture (Launcher as UI layer)

```
MediaBubble Launcher (Next.js 16)
  ├── UI: Task Board, Campaigns, Analytics
  ├── Auth: JWT + RBAC (proxy.ts)
  └── Data: Prisma + Supabase

OPUS Engine (services / lib/opus)
  ├── Brief Service
  ├── Content Gen (Claude)
  ├── Orchestration + Automation
  ├── Publishing (Meta/Google)
  ├── Analytics + Attribution
  └── CRM Sync (HubSpot)
```

### Prisma model extensions

- `OpusBrief`, `OpusCampaign`, `OpusAsset`, `OpusMetric`, `OpusWorkflow`
- Links to existing `Task`, `Client`, `FinanceTransaction`, `TimeEntry`

---

## Phased Rollout

### Phase 0 — Foundation (Week 1)

- Create `docs/opus/` integration docs
- Extend Prisma schema + migrate
- Add OPUS env vars to `.env.example` + Vercel
- Basic Brief entry form at `/campaigns/new`
- OPUS campaign templates in `apps/launcher/lib/data/`

### Phase 1 — Brief → Content → Approval (Weeks 1–4)

- Brief parser (Claude, existing Launcher AI tools)
- Multi-channel content generation (150+ variants)
- Approval workflow (extend task review)
- Campaign activation stub (Meta/Google)
- **Deliverable:** End-to-end MVP on `/campaigns`

### Phase 2 — Integrations & Intelligence (Weeks 5–12)

- Meta + Google Ads full integration
- GA4 + HubSpot + Stripe closed loop
- Automation engine (time/event/data triggers)
- Real-time dashboard + Slack alerts
- A/B testing + autonomous optimization

### Phase 3 — Advanced & Scale (Weeks 13+)

- Video generation
- Predictive analytics + recommendations
- White-label for reseller agencies
- Multi-touch attribution + LTV tracking

---

## Launcher Replacement Strategy (Pivot)

User requested replacing Launcher with OPUS. Proposed approach:

| Step | Action |
|------|--------|
| Phase 0 | Create `apps/opus` foundation |
| Phase 1 | Port Launcher modules into OPUS (1–2 weeks) |
| Phase 2 | Full OPUS autonomous features |
| Phase 3 | Deprecate old Launcher routes, redirect |

**Final decision:** Evolve Launcher in place — OPUS as workflow layer, not a separate app rename.

---

## Key Files (Planned)

| Path | Purpose |
|------|---------|
| `apps/launcher/app/campaigns/page.tsx` | OPUS Campaign Hub |
| `apps/launcher/lib/opus/` | Services, types, utils |
| `apps/launcher/components/opus/` | BriefForm, CampaignCard, MetricsPanel |
| `apps/launcher/prisma/schema.prisma` | OPUS models |

---

## Business Impact

- **Time saved:** 15+ hrs/week per team member
- **Revenue:** OPUS-Managed tier $2K–5K/month per client
- **Moat:** Proprietary integrations + autonomous optimization
- **Client lock-in:** Full-funnel visibility in Launcher

**Golden rule:** Every OPUS feature must drive Hurghada service leads and work in EN + Masri with RTL.

---

## Immediate Next Actions (from session)

1. Prisma schema extensions
2. Brief parser UI component
3. Phase 1 campaign hub page
4. Update `docs/launcher/LAUNCHER_PLAN_V2.md` + `docs/CONTEXT.md`
