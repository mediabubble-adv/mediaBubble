import { diffAssigneeIds } from './assignees'

describe('diffAssigneeIds', () => {
  it('detects added and removed users', () => {
    const a = '11111111-1111-1111-1111-111111111111'
    const b = '22222222-2222-2222-2222-222222222222'
    const c = '33333333-3333-3333-3333-333333333333'
    expect(diffAssigneeIds([a, b], [b, c])).toEqual({ added: [c], removed: [a] })
  })

  it('returns empty when unchanged', () => {
    const a = '11111111-1111-1111-1111-111111111111'
    expect(diffAssigneeIds([a], [a])).toEqual({ added: [], removed: [] })
  })
})
