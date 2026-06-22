import { describe, expect, it, beforeEach } from '@jest/globals'
import { createOpusBriefSchema, createOpusTriggerSchema } from './schemas'

describe('OPUS schemas', () => {
  it('validates brief creation', () => {
    const parsed = createOpusBriefSchema.safeParse({
      client_id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Q3 Launch',
      goal: 'leads',
      channels: ['social', 'ppc'],
    })
    expect(parsed.success).toBe(true)
  })

  it('rejects invalid trigger slug', () => {
    const parsed = createOpusTriggerSchema.safeParse({
      name: 'Bad',
      slug: 'Bad Slug',
      type: 'TIME',
      action: 'Test',
    })
    expect(parsed.success).toBe(false)
  })
})
