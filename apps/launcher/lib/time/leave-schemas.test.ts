import {
  createLeaveRequestSchema,
  reviewLeaveRequestSchema,
  listLeaveRequestsQuerySchema,
} from './leave-schemas'

describe('createLeaveRequestSchema', () => {
  it('accepts a valid leave request', () => {
    const r = createLeaveRequestSchema.safeParse({
      type: 'Vacation',
      start_date: '2026-07-01',
      end_date: '2026-07-05',
      reason: 'Family trip',
    })
    expect(r.success).toBe(true)
  })

  it('rejects end_date before start_date', () => {
    expect(
      createLeaveRequestSchema.safeParse({
        type: 'Sick',
        start_date: '2026-07-05',
        end_date: '2026-07-01',
      }).success,
    ).toBe(false)
  })

  it('rejects unknown leave types', () => {
    expect(
      createLeaveRequestSchema.safeParse({
        type: 'Sabbatical',
        start_date: '2026-07-01',
        end_date: '2026-07-02',
      }).success,
    ).toBe(false)
  })
})

describe('reviewLeaveRequestSchema', () => {
  it('accepts Approved or Rejected', () => {
    expect(reviewLeaveRequestSchema.safeParse({ status: 'Approved' }).success).toBe(true)
    expect(reviewLeaveRequestSchema.safeParse({ status: 'Rejected' }).success).toBe(true)
  })
})

describe('listLeaveRequestsQuerySchema', () => {
  it('accepts pending scope for manager queues', () => {
    expect(listLeaveRequestsQuerySchema.safeParse({ scope: 'pending' }).success).toBe(true)
  })
})
