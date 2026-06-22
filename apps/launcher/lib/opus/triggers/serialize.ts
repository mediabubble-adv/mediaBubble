// OPUS trigger serialization and CRUD helpers.

import type { opus_triggers } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import type { OpusTriggerRow, OpusTriggerType } from '../types'

function parseCondition(value: Prisma.JsonValue | null): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

export function serializeTrigger(row: opus_triggers): OpusTriggerRow {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    type: row.type as OpusTriggerType,
    enabled: row.enabled ?? true,
    schedule: row.schedule,
    condition: parseCondition(row.condition),
    action: row.action,
    created_by: row.created_by,
    last_run_at: row.last_run_at?.toISOString() ?? null,
    execution_count: row.execution_count ?? 0,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}

export const OPUS_SEED_TRIGGERS = [
  {
    name: 'Weekly Social Planning',
    slug: 'weekly-social-planning',
    type: 'TIME' as const,
    schedule: '0 9 * * 1',
    action: 'GenerateWeeklySocialContentPlan',
    condition: { timezone: 'Africa/Cairo' },
  },
  {
    name: 'Performance Monitoring',
    slug: 'performance-monitoring',
    type: 'TIME' as const,
    schedule: '0 9-17/2 * * *',
    action: 'ScanCampaignPerformance',
    condition: { timezone: 'Africa/Cairo' },
  },
  {
    name: 'Lead Captured',
    slug: 'lead-captured',
    type: 'EVENT' as const,
    schedule: null,
    action: 'SyncLeadToHubSpot',
    condition: { event: 'LeadCaptured' },
  },
  {
    name: 'High Engagement Boost',
    slug: 'high-engagement-boost',
    type: 'DATA' as const,
    schedule: null,
    action: 'BoostHighEngagementCreatives',
    condition: { metric: 'engagement_rate', operator: '>', value: 0.05, days: 3 },
  },
] as const
