import {
  canDeleteOwnEntry,
  canEditOwnEntry,
  canReviewEntry,
  canSubmitEntry,
} from './entries-policy'

describe('entries-policy', () => {
  it('allows edit/delete only on draft', () => {
    expect(canEditOwnEntry('Draft')).toBe(true)
    expect(canEditOwnEntry('Rejected')).toBe(true)
    expect(canEditOwnEntry('Submitted')).toBe(false)
    expect(canDeleteOwnEntry('Draft')).toBe(true)
    expect(canDeleteOwnEntry('Submitted')).toBe(false)
  })

  it('gates submit and review', () => {
    expect(canSubmitEntry('Draft', 'u1', 'u1')).toBe(true)
    expect(canSubmitEntry('Draft', 'u1', 'u2')).toBe(false)
    expect(canReviewEntry('Submitted', 'u1', 'u2', 'Manager')).toBe(true)
    expect(canReviewEntry('Submitted', 'u1', 'u1', 'Manager')).toBe(false)
  })
})
