// OPUS usage metering — tracks AI gens, campaign launches, API calls per period.

import { prisma } from '@/lib/db/prisma'
import type { OpusPlan, OpusUsageSnapshot } from '../types'
import { OPUS_PLAN_QUOTAS, isOpusPlan } from './plans'

function monthBounds(date = new Date()): { start: Date; end: Date } {
  const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
  const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0))
  return { start, end }
}

function pct(used: number, quota: number): number {
  if (quota <= 0) return 0
  return Math.min(100, Math.round((used / quota) * 100))
}

export async function getOrCreateUsagePeriod(plan: OpusPlan = 'professional'): Promise<{
  id: string
  plan: OpusPlan
  period_start: Date
  period_end: Date
  ai_generations: number
  campaigns_launched: number
  api_calls: number
  optimizations: number
}> {
  const { start, end } = monthBounds()
  const row = await prisma.opus_usage_periods.upsert({
    where: { period_start: start },
    create: {
      period_start: start,
      period_end: end,
      plan,
      ai_generations: 0,
      campaigns_launched: 0,
      api_calls: 0,
      optimizations: 0,
    },
    update: {},
  })
  const resolvedPlan = isOpusPlan(row.plan) ? row.plan : plan
  return {
    id: row.id,
    plan: resolvedPlan,
    period_start: row.period_start,
    period_end: row.period_end,
    ai_generations: row.ai_generations ?? 0,
    campaigns_launched: row.campaigns_launched ?? 0,
    api_calls: row.api_calls ?? 0,
    optimizations: row.optimizations ?? 0,
  }
}

export async function incrementUsage(
  event: 'ai_generation' | 'campaign_launch' | 'api_call' | 'optimization',
  amount = 1,
): Promise<void> {
  const period = await getOrCreateUsagePeriod()
  const data =
    event === 'ai_generation'
      ? { ai_generations: { increment: amount } }
      : event === 'campaign_launch'
        ? { campaigns_launched: { increment: amount } }
        : event === 'api_call'
          ? { api_calls: { increment: amount } }
          : { optimizations: { increment: amount } }

  await prisma.opus_usage_periods.update({
    where: { id: period.id },
    data,
  })
}

export async function getUsageSnapshot(plan: OpusPlan = 'professional'): Promise<OpusUsageSnapshot> {
  const period = await getOrCreateUsagePeriod(plan)
  const quotas = OPUS_PLAN_QUOTAS[period.plan]
  return {
    plan: period.plan,
    period_start: period.period_start.toISOString().slice(0, 10),
    period_end: period.period_end.toISOString().slice(0, 10),
    ai_generations: period.ai_generations,
    campaigns_launched: period.campaigns_launched,
    api_calls: period.api_calls,
    optimizations: period.optimizations,
    quotas: {
      ai_generations: quotas.ai_generations,
      campaigns_launched: quotas.campaigns_launched,
      api_calls: quotas.api_calls,
    },
    percent_used: {
      ai_generations: pct(period.ai_generations, quotas.ai_generations),
      campaigns_launched: pct(period.campaigns_launched, quotas.campaigns_launched),
      api_calls: pct(period.api_calls, quotas.api_calls),
    },
  }
}
