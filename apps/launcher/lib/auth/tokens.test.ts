import { generateOneTimeToken, hashToken, isExpired } from './tokens'

describe('one-time tokens', () => {
  it('hashes deterministically', () => {
    expect(hashToken('abc')).toBe(hashToken('abc'))
    expect(hashToken('abc')).not.toBe(hashToken('abd'))
  })

  it('generates a raw token whose hash matches', () => {
    const { token, tokenHash } = generateOneTimeToken()
    expect(token).toBeTruthy()
    expect(tokenHash).toBe(hashToken(token))
  })

  it('generates unique tokens', () => {
    expect(generateOneTimeToken().token).not.toBe(generateOneTimeToken().token)
  })

  it('detects expiry', () => {
    const now = new Date('2026-06-19T12:00:00Z')
    expect(isExpired(new Date('2026-06-19T11:00:00Z'), now)).toBe(true)
    expect(isExpired(new Date('2026-06-19T13:00:00Z'), now)).toBe(false)
  })
})
