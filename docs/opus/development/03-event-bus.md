# Event Bus

**Code:** `apps/launcher/lib/opus/event-bus.ts`

In-process pub/sub for workflow orchestration. Swappable to Redis pub/sub when multi-instance cron is required.

## Event types

PlanApproved, TasksCreated, ContentGenerated, BriefCreated, TriggerExecuted, PerformanceThresholdCrossed, …

## Usage

```typescript
import { publish, subscribe, createCorrelationId } from '@/lib/opus/event-bus'

subscribe('BriefCreated', async (event) => { /* … */ })

await publish({
  type: 'BriefCreated',
  payload: { briefId: '…' },
  metadata: { sourceService: 'brief', correlationId: createCorrelationId() },
})
```

## Workflow init

Call `initOpusWorkflows()` from API routes on first request to register default handlers.
