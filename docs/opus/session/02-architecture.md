# Microservices & Event-Driven Architecture

**Session date:** June 22, 2026  
**Related specs:** [`OPUS_ARCHITECTURE_WITH_DIAGRAMS.md`](../OPUS_ARCHITECTURE_WITH_DIAGRAMS.md), [`OPUS_COMPREHENSIVE_TECHNICAL_ARCHITECTURE.md`](../OPUS_COMPREHENSIVE_TECHNICAL_ARCHITECTURE.md)

---

## OPUS Microservices Overview

OPUS uses an **event-driven microservices** architecture with four logical layers and **12 specialized services**.

### Characteristics

- **Event-driven:** Redis Pub/Sub + async job queues (Bull/BullMQ)
- **Layered:** Foundation → Planning → Execution → Intelligence
- **Stack:** Node.js/TypeScript, PostgreSQL + Prisma, Redis, TimescaleDB (metrics), Elasticsearch, S3
- **Frontend:** Next.js 16 UI + OPUS Dashboard
- **Deployment target:** Kubernetes with HPA, multi-region ready
- **Scale target:** 100 → 10,000+ concurrent campaigns

### The 12 services

| # | Service | Layer | Responsibility |
|---|---------|-------|----------------|
| 1 | Profile Service | Foundation | Client/org profiles, brand DNA |
| 2 | Planning Service | Planning | Brief parsing, campaign planning |
| 3 | Task Service | Execution | Task generation and assignment |
| 4 | Workflow & Automation | Execution | Trigger evaluation, orchestration |
| 5 | Content Generation | Execution | Claude-powered multi-channel content |
| 6 | Publishing Service | Execution | Meta, Google, email publishing |
| 7 | Analytics Service | Intelligence | Metrics aggregation, GA4 |
| 8 | Optimization Service | Intelligence | Auto budget/creative optimization |
| 9 | Reporting Service | Intelligence | Dashboards, exports |
| 10 | Notification Service | Support | Email, Slack, in-app alerts |
| 11 | Chat Service | Support | Team/client communication |
| 12 | Integration Service | Support | HubSpot, Stripe, third-party APIs |

### Data layer

- **PostgreSQL + Prisma** — transactional data
- **Redis** — cache, queue, pub/sub
- **TimescaleDB** — time-series metrics
- **Elasticsearch** — search and analytics
- **S3** — asset storage

---

## Event-Driven Message Patterns

### Pattern types explored

| Pattern | Use case |
|---------|----------|
| **Pub/Sub broadcast** | Real-time UI updates, cross-service notifications |
| **Job queue (BullMQ)** | Long-running tasks (content gen, publishing) |
| **Outbox pattern** | Reliable event persistence before publish |
| **Saga / choreography** | Multi-step workflows with compensation |
| **Sequential gates** | Content → Review → Publish with human approval |

### Core event types

```typescript
type OpusEventType =
  | 'PlanApproved'
  | 'TasksCreated'
  | 'ContentGenerated'
  | 'ContentRegenerationRequested'
  | 'CampaignLaunched'
  | 'PerformanceThresholdCrossed'
  | 'LeadCaptured';
```

### Event metadata (required)

- `sourceService` — originating service
- `correlationId` — trace across workflow steps
- `organizationId` — multi-tenant scope
- `version` — schema versioning

---

## Workflow Examples

### PlanApproved → Tasks → Content

1. `PlanApproved` published by Planning Service
2. Workflow engine generates tasks → publishes `TasksCreated`
3. Content service subscribes → generates content per task → publishes `ContentGenerated`
4. Approval gate → `CampaignLaunched` on publish

### Performance optimization

1. Analytics publishes `PerformanceThresholdCrossed` (e.g. CTR < 1%)
2. Optimization service triggers `ContentRegenerationRequested`
3. Content service regenerates underperforming assets

---

## MediaBubble Mapping

For Launcher (not full K8s microservices initially):

| OPUS service | Launcher implementation |
|--------------|-------------------------|
| Event Bus | `lib/opus/event-bus.ts` + Redis |
| Workflow Engine | `lib/opus/workflow-engine.ts` |
| Automation | `lib/opus/automation/engine.ts` |
| UI | Existing `/campaigns`, `/automation` routes |

**Pragmatic path:** Monolith-first in Launcher with service boundaries in code; extract microservices when scale demands it.

---

## Integration stack (external)

Per [`OPUS_INTEGRATIONS_STRATEGY.md`](../OPUS_INTEGRATIONS_STRATEGY.md):

- Meta Marketing API
- Google Ads API
- HubSpot CRM
- GA4 analytics
- Stripe billing
- Klaviyo / Resend email
- Slack notifications
