import { loginSchema, resetPasswordSchema, signupSchema } from './schemas'

describe('auth schemas', () => {
  it('accepts a valid signup and normalises email', () => {
    const parsed = signupSchema.parse({
      email: '  USER@MediaBubble.CO ',
      password: 'longenough',
      name: 'Jane',
    })
    expect(parsed.email).toBe('user@mediabubble.co')
    expect(parsed.name).toBe('Jane')
  })

  it('rejects short passwords on signup', () => {
    expect(signupSchema.safeParse({ email: 'a@b.co', password: 'short', name: 'X' }).success).toBe(false)
  })

  it('rejects invalid emails', () => {
    expect(loginSchema.safeParse({ email: 'not-an-email', password: 'x' }).success).toBe(false)
  })

  it('requires an 8+ char password on reset', () => {
    expect(resetPasswordSchema.safeParse({ token: 't', password: 'tiny' }).success).toBe(false)
    expect(resetPasswordSchema.safeParse({ token: 't', password: 'longenough' }).success).toBe(true)
  })
})
