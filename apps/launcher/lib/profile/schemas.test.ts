import { profilePatchSchema } from './schemas'

describe('profilePatchSchema', () => {
  it('accepts a valid partial update with bio and social links', () => {
    const r = profilePatchSchema.safeParse({
      name: 'Yasser Dorgham',
      bio: 'Creative director at MediaBubble.',
      linkedin_url: 'https://www.linkedin.com/in/yasser',
      instagram_url: 'https://instagram.com/mediabubble',
      behance_url: 'https://www.behance.net/mediabubble',
      website_url: 'https://mediabubble.co',
    })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.bio).toBe('Creative director at MediaBubble.')
      expect(r.data.linkedin_url).toBe('https://www.linkedin.com/in/yasser')
    }
  })

  it('coerces empty strings to null for bio and URLs', () => {
    const r = profilePatchSchema.safeParse({
      bio: '',
      linkedin_url: '',
      website_url: '',
    })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.bio).toBeNull()
      expect(r.data.linkedin_url).toBeNull()
      expect(r.data.website_url).toBeNull()
    }
  })

  it('rejects http:// URLs', () => {
    expect(
      profilePatchSchema.safeParse({ website_url: 'http://mediabubble.co' }).success,
    ).toBe(false)
    expect(
      profilePatchSchema.safeParse({ linkedin_url: 'http://linkedin.com/in/foo' }).success,
    ).toBe(false)
  })

  it('rejects bio longer than 500 characters', () => {
    expect(profilePatchSchema.safeParse({ bio: 'x'.repeat(501) }).success).toBe(false)
  })

  it('rejects wrong hostname for platform-specific URLs', () => {
    expect(
      profilePatchSchema.safeParse({ linkedin_url: 'https://twitter.com/foo' }).success,
    ).toBe(false)
    expect(
      profilePatchSchema.safeParse({ instagram_url: 'https://facebook.com/foo' }).success,
    ).toBe(false)
    expect(
      profilePatchSchema.safeParse({ behance_url: 'https://dribbble.com/foo' }).success,
    ).toBe(false)
  })

  it('accepts any https hostname for website_url', () => {
    const r = profilePatchSchema.safeParse({ website_url: 'https://example.com/portfolio' })
    expect(r.success).toBe(true)
  })

  it('rejects an empty update', () => {
    expect(profilePatchSchema.safeParse({}).success).toBe(false)
  })
})
