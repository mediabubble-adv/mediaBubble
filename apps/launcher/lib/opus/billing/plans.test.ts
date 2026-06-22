import { describe, expect, it, beforeEach } from '@jest/globals'
import { OPUS_PLAN_QUOTAS } from './plans'

describe('OPUS plans', () => {
  it('defines starter, professional, enterprise quotas', () => {
    expect(OPUS_PLAN_QUOTAS.starter.ai_generations).toBe(500)
    expect(OPUS_PLAN_QUOTAS.professional.campaigns_launched).toBe(100)
    expect(OPUS_PLAN_QUOTAS.enterprise.monthly_price_usd).toBeGreaterThan(0)
  })
})
