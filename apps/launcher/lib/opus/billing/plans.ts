// OPUS subscription plan quotas (hybrid tiered + event metering).

import type { OpusPlan } from '../types'

export interface OpusPlanQuota {
  label: string
  monthly_price_usd: number
  ai_generations: number
  campaigns_launched: number
  api_calls: number
  overage: {
    ai_generation: number
    campaign_launch: number
  }
}

export const OPUS_PLAN_QUOTAS: Record<OpusPlan, OpusPlanQuota> = {
  starter: {
    label: 'Starter',
    monthly_price_usd: 999,
    ai_generations: 500,
    campaigns_launched: 10,
    api_calls: 5_000,
    overage: { ai_generation: 0.5, campaign_launch: 50 },
  },
  professional: {
    label: 'Professional',
    monthly_price_usd: 2_999,
    ai_generations: 5_000,
    campaigns_launched: 100,
    api_calls: 10_000,
    overage: { ai_generation: 0.3, campaign_launch: 30 },
  },
  enterprise: {
    label: 'Enterprise',
    monthly_price_usd: 9_999,
    ai_generations: 100_000,
    campaigns_launched: 1_000,
    api_calls: 100_000,
    overage: { ai_generation: 0.1, campaign_launch: 10 },
  },
}

export function isOpusPlan(value: unknown): value is OpusPlan {
  return value === 'starter' || value === 'professional' || value === 'enterprise'
}
