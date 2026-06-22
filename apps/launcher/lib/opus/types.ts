// OPUS shared types — event-driven marketing orchestration inside Launcher.

export const OPUS_EVENT_TYPES = [
  'PlanApproved',
  'TasksCreated',
  'ContentGenerated',
  'ContentRegenerationRequested',
  'CampaignLaunched',
  'PerformanceThresholdCrossed',
  'LeadCaptured',
  'BriefCreated',
  'TriggerExecuted',
] as const

export type OpusEventType = (typeof OPUS_EVENT_TYPES)[number]

export const OPUS_TRIGGER_TYPES = ['TIME', 'EVENT', 'DATA'] as const
export type OpusTriggerType = (typeof OPUS_TRIGGER_TYPES)[number]

export const OPUS_BRIEF_GOALS = ['awareness', 'leads', 'conversions'] as const
export type OpusBriefGoal = (typeof OPUS_BRIEF_GOALS)[number]

export const OPUS_BRIEF_STATUSES = ['draft', 'review', 'approved', 'archived'] as const
export type OpusBriefStatus = (typeof OPUS_BRIEF_STATUSES)[number]

export const OPUS_PLANS = ['starter', 'professional', 'enterprise'] as const
export type OpusPlan = (typeof OPUS_PLANS)[number]

export interface OpusEventMetadata {
  sourceService: string
  correlationId: string
  userId?: string
  version?: string
}

export interface OpusEvent<TPayload = Record<string, unknown>> {
  type: OpusEventType
  payload: TPayload
  metadata: OpusEventMetadata
  occurredAt?: string
}

export type OpusEventHandler = (event: OpusEvent) => void | Promise<void>

export interface OpusTriggerRow {
  id: string
  name: string
  slug: string
  type: OpusTriggerType
  enabled: boolean
  schedule: string | null
  condition: Record<string, unknown> | null
  action: string
  created_by: string
  last_run_at: string | null
  execution_count: number
  created_at: string
  updated_at: string
}

export interface OpusBriefRow {
  id: string
  campaign_id: string | null
  client_id: string
  name: string
  goal: OpusBriefGoal
  audience: string | null
  budget: number | null
  currency: string | null
  channels: string[]
  key_messages: string[]
  platforms: Record<string, boolean>
  status: OpusBriefStatus
  created_by: string
  created_at: string
  updated_at: string
}

export interface OpusUsageSnapshot {
  plan: OpusPlan
  period_start: string
  period_end: string
  ai_generations: number
  campaigns_launched: number
  api_calls: number
  optimizations: number
  quotas: {
    ai_generations: number
    campaigns_launched: number
    api_calls: number
  }
  percent_used: {
    ai_generations: number
    campaigns_launched: number
    api_calls: number
  }
}

export interface OpusCampaignPerformance {
  campaign_id: string
  campaign_name: string
  status: string
  period_start: string
  period_end: string
  spend: number
  budget: number | null
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpa: number | null
  roas: number | null
  meta: {
    impressions: number
    clicks: number
    conversions: number
    ctr: number
  }
  google: {
    impressions: number
    clicks: number
    conversions: number
    ctr: number
  }
  top_assets: Array<{ name: string; ctr: number; roas: number; action: string }>
  insights: string[]
}
