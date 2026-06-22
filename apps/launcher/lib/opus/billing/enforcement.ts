// OPUS usage enforcement — soft warnings at 80%, hard block at 100%.

import { getUsageSnapshot, incrementUsage } from './metering'
import type { OpusPlan } from '../types'

export type UsageEvent = 'ai_generation' | 'campaign_launch' | 'api_call' | 'optimization'

export interface UsageCheckResult {
  allowed: boolean
  warning: boolean
  message: string
  percent_used: number
}

export async function checkUsage(
  event: UsageEvent,
  plan: OpusPlan = 'professional',
): Promise<UsageCheckResult> {
  const snapshot = await getUsageSnapshot(plan)
  const key =
    event === 'ai_generation'
      ? 'ai_generations'
      : event === 'campaign_launch'
        ? 'campaigns_launched'
        : 'api_calls'

  const used = snapshot[key]
  const quota = snapshot.quotas[key]
  const percent = snapshot.percent_used[key]

  if (plan === 'enterprise') {
    return { allowed: true, warning: false, message: 'Enterprise — unlimited', percent_used: percent }
  }

  if (used >= quota) {
    return {
      allowed: false,
      warning: true,
      message: `${key.replace('_', ' ')} quota exceeded. Upgrade plan or wait for next period.`,
      percent_used: percent,
    }
  }

  if (percent >= 80) {
    return {
      allowed: true,
      warning: true,
      message: `${percent}% of ${key.replace('_', ' ')} quota used this period.`,
      percent_used: percent,
    }
  }

  return { allowed: true, warning: false, message: 'Within quota', percent_used: percent }
}

export async function consumeUsage(event: UsageEvent, amount = 1, plan: OpusPlan = 'professional'): Promise<UsageCheckResult> {
  const check = await checkUsage(event, plan)
  if (!check.allowed) return check
  await incrementUsage(event, amount)
  return check
}
