import { createPortalLinkSchema, verifyPortalTokenSchema } from './schemas'

describe('portal schemas', () => {
  it('validates create link payload', () => {
    expect(
      createPortalLinkSchema.safeParse({
        client_id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'client@example.com',
      }).success,
    ).toBe(true)
    expect(createPortalLinkSchema.safeParse({ client_id: 'x', email: 'bad' }).success).toBe(false)
  })

  it('validates verify token payload', () => {
    expect(verifyPortalTokenSchema.safeParse({ token: 'abc123def456ghi789' }).success).toBe(true)
    expect(verifyPortalTokenSchema.safeParse({ token: 'short' }).success).toBe(false)
  })
})
