import { dmKeyForUsers } from './dm'

describe('dmKeyForUsers', () => {
  it('is order-independent', () => {
    const a = '11111111-1111-1111-1111-111111111111'
    const b = '22222222-2222-2222-2222-222222222222'
    expect(dmKeyForUsers(a, b)).toBe(`${a}:${b}`)
    expect(dmKeyForUsers(b, a)).toBe(`${a}:${b}`)
  })
})
