# Automation Engine — Triggers, Cron & Locking

**Session date:** June 22, 2026  
**Related spec:** [`OPUS_AUTOMATION_SCHEDULING_ENGINE.md`](../OPUS_AUTOMATION_SCHEDULING_ENGINE.md)  
**Target routes:** `/automation`, `/automation/triggers`

---

## Phase 0 Execution Plan

OPUS becomes MediaBubble team's **main workflow tool** inside Launcher:

- Weekly performance review + recommendations auto-generated
- Social content planning on schedule
- Lead capture → CRM sync on events
- Budget optimization on performance thresholds

---

## Trigger Types

| Type | Example | Evaluation |
|------|---------|------------|
| **Time** | WeeklySocialPlanning — Mon 9:00 AM | Cron schedule |
| **Time** | PerformanceMonitoring — every 2h 9–17 | Cron schedule |
| **Event** | LeadCaptured — new Meta/Google lead | Webhook / event bus |
| **Data** | HighEngagementBoost — engagement > 5% for 3d | Metric threshold query |

### Prisma model (planned)

```prisma
model OpusAutomationTrigger {
  id             String   @id @default(uuid())
  name           String
  type           TriggerType  // TIME | EVENT | DATA
  enabled        Boolean  @default(true)
  schedule       String?  // cron expression
  condition      Json?    // event/data condition
  action         String   // workflow handler name
  organizationId String
  organization   Organization @relation(...)
  lastRunAt      DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([organizationId])
  @@index([organizationId, type])
}
```

---

## Implementation Progress (Session Claims)

| Item | Status in session |
|------|-------------------|
| Trigger types + Prisma schema | ✅ Defined |
| Core types + validation | ✅ Defined |
| Sample rules in `db:seed` | ✅ Seeded |
| Workflow engine stub | ✅ `lib/opus/automation/engine.ts` |
| UI placeholder `/automation` | ✅ Trigger list |
| Trigger Engine service | ✅ Evaluate + execute |
| Real cron (node-cron) | ✅ Africa/Cairo timezone |
| Distributed locking | ✅ Redis-based |
| Upstash Redis upgrade | ✅ Serverless path |
| Trigger Management UI | ✅ `/automation/triggers` CRUD |

**Verify against repo** — `lib/opus/` tree may not exist yet.

---

## Trigger Engine

### Responsibilities

1. Load enabled triggers for organization
2. Register cron jobs for TIME triggers
3. Subscribe to event bus for EVENT triggers
4. Poll/query metrics for DATA triggers
5. Acquire distributed lock before execution
6. Execute workflow action handler
7. Log execution + update `lastRunAt`

### Sample triggers (seeded)

```typescript
// WeeklySocialPlanning
{ type: 'TIME', schedule: '0 9 * * 1', action: 'GenerateWeeklySocialContentPlan' }

// PerformanceMonitoring
{ type: 'TIME', schedule: '0 9-17/2 * * *', action: 'ScanCampaignPerformance' }

// LeadCaptured
{ type: 'EVENT', condition: { event: 'LeadCaptured' }, action: 'SyncLeadToHubSpot' }
```

---

## Distributed Locking

### Why needed

- Prevent duplicate cron execution across Vercel instances
- Safe concurrent webhook handling
- WeeklySocialPlanning must run once per org per week

### Implementation

- Redis `SET key NX EX ttl` pattern
- Lock key: `opus:lock:trigger:{triggerId}:{orgId}`
- TTL: slightly longer than expected job duration
- Fail-open fallback if Redis unavailable (log warning)

### Upstash Redis (serverless)

- Recommended for Vercel deployment
- REST-based Redis client (no persistent connection)
- Lock reliability: use with awareness of edge-case TTL expiry
- Env: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

---

## Trigger Management UI

**Route:** `/automation/triggers`  
**Access:** Admin + Manager only

### Features

- Filter: All / Enabled / Time / Event / Data
- Table: Name, Type, Schedule/Condition, Status
- Actions: Edit, Run Now, Disable, Delete
- Detail panel: last run, execution count, linked workflow

---

## Cron Configuration

- Library: `node-cron`
- Timezone: `Africa/Cairo`
- Init on app startup (server-side singleton)
- Graceful shutdown on process exit

---

## Open Items

- [ ] WeeklySocialPlanning full workflow implementation
- [ ] Execution History dashboard
- [ ] Slack notifications on trigger events
- [ ] Meta integration for LeadCaptured trigger
