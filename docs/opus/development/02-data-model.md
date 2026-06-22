# OPUS Data Model

Migration: `apps/launcher/prisma/migrations/0008_opus/`

## Tables

### `opus_briefs`

Structured campaign briefs. Optional `campaign_id` links to `campaigns`.

| Field | Purpose |
|-------|---------|
| goal | awareness \| leads \| conversions |
| channels | Service lines (seo, ppc, social…) |
| platforms | Meta, Google, email, LinkedIn flags (JSON) |
| key_messages | Array of message bullets (JSON) |

### `opus_triggers`

Automation definitions (TIME, EVENT, DATA).

| Field | Purpose |
|-------|---------|
| slug | Unique identifier (e.g. weekly-social-planning) |
| schedule | Cron expression for TIME triggers |
| action | Handler name (GenerateWeeklySocialContentPlan) |

### `opus_trigger_runs`

Execution audit log per trigger run.

### `opus_campaign_metrics`

Performance snapshots for dashboards (impressions, clicks, ROAS, etc.).

### `opus_usage_periods`

Monthly usage counters for hybrid billing metering.

## Relations

- `opus_briefs` → `clients`, `campaigns`, `users`
- `opus_campaign_metrics` → `campaigns`
- No multi-tenant `organization_id` yet — single workspace; org isolation is Phase 2
