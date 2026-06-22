# Event Bus, Workflows & Campaign Hub

**Session date:** June 22, 2026  
**Planned location:** `apps/opus` (port 3004) — **not yet in repo**; intended patterns apply to `apps/launcher/lib/opus/`

---

## Event Bus Foundation

### Planned structure

```
apps/opus/                    # or apps/launcher/lib/opus/
├── lib/opus/
│   ├── event-bus.ts          # Redis Pub/Sub + BullMQ
│   ├── workflow-engine.ts    # Event handlers + orchestration
│   └── types.ts
```

### Event bus capabilities

- Redis Pub/Sub for real-time broadcasting
- BullMQ job queues for background/long-running tasks
- Outbox-style reliability (persist before publish)
- Correlation IDs for cross-service tracing
- Idempotency-ready structure
- Error handling with structured logging

### Usage pattern

```typescript
import { initEventBus, eventBus } from '@/lib/opus/event-bus';

await initEventBus();

await eventBus.publish({
  type: 'PlanApproved',
  payload: { planId: 'plan_123', clientId: 'client_456' },
  metadata: {
    sourceService: 'planning',
    correlationId: 'req_abc123',
    organizationId: 'org_mediabubble',
    version: 'v1',
  },
});

eventBus.subscribe('PlanApproved', async (event) => {
  // Trigger task creation, content generation, etc.
});
```

---

## Workflow Engine

### Registered workflows

| Workflow | Trigger | Actions |
|----------|---------|---------|
| Plan workflow | `PlanApproved` | Generate tasks → publish `TasksCreated` |
| Content workflow | `TasksCreated` | Claude content gen → publish `ContentGenerated` |
| Optimization | `PerformanceThresholdCrossed` | Regenerate if CTR low |
| Campaign launch | Approval complete | Publish to Meta/Google |

### Example: PlanApproved handler

1. Receive `PlanApproved` event
2. Generate tasks (content, design, review)
3. Publish `TasksCreated` with task list
4. Content workflow picks up CONTENT_GENERATION tasks
5. Each completed task publishes `ContentGenerated`

---

## Campaign Hub UI + BullMQ

### Campaign Hub features

- List active campaigns with status badges
- Quick actions: New Brief, Run Weekly Planning, View Reports
- Recent activity feed (social plan generated, lead synced, budget reallocated)
- Performance score + usage gauges

### BullMQ long-running tasks

- Content generation batches (150+ variants)
- Publishing jobs to Meta/Google
- Weekly social planning execution
- Performance monitoring scans

Job types:

- `content-generation`
- `campaign-publish`
- `weekly-social-planning`
- `performance-scan`

---

## Planned UI Components

| Component | Purpose |
|-----------|---------|
| `BriefFormModal` | Multi-step brief entry |
| `CampaignCard` | Campaign summary with ROAS/spend |
| `MetricsPanel` | Real-time performance tiles |
| `WorkflowStatusCard` | Live automation progress |

---

## Migration Path (Launcher → OPUS)

1. Port Task Board, CRM, finance into OPUS shell
2. Shared Prisma schema (single database)
3. Redirect old Launcher routes during transition
4. Keep `pnpm run dev:launcher` until cutover complete

---

## Next Steps (from session)

- [ ] Prisma schema extensions (`OpusCampaign`, `OpusEventLog`)
- [ ] Example event handlers wired to real Claude service
- [ ] Campaign Hub page with brand tokens
- [ ] End-to-end Brief → Live Campaign pilot
