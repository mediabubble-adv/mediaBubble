import { hashPassword, verifyPassword } from './password'

describe('password hashing', () => {
  it('verifies a correct password', () => {
    const hash = hashPassword('correct horse battery staple')
    expect(verifyPassword('correct horse battery staple', hash)).toBe(true)
  })

  it('rejects an incorrect password', () => {
    const hash = hashPassword('s3cret-pass')
    expect(verifyPassword('wrong-pass', hash)).toBe(false)
  })

  it('produces a unique salt per hash', () => {
    expect(hashPassword('same')).not.toEqual(hashPassword('same'))
  })

  it('uses the scrypt format', () => {
    expect(hashPassword('x')).toMatch(/^scrypt\$\d+\$\d+\$\d+\$[0-9a-f]+\$[0-9a-f]+$/)
  })

  it('returns false for malformed stored values', () => {
    expect(verifyPassword('x', 'not-a-valid-hash')).toBe(false)
    expect(verifyPassword('x', '')).toBe(false)
  })
})
