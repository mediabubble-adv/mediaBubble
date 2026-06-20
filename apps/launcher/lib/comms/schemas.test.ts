import { CHANNEL_TYPES, createChannelSchema, createMessageSchema } from './schemas'

describe('comms schemas', () => {
  it('accepts a public channel', () => {
    const parsed = createChannelSchema.safeParse({ name: 'general' })
    expect(parsed.success).toBe(true)
  })

  it('validates channel types', () => {
    expect(CHANNEL_TYPES).toContain('Public')
    expect(createChannelSchema.safeParse({ name: 'ops', type: 'Private' }).success).toBe(true)
  })

  it('requires message content', () => {
    expect(createMessageSchema.safeParse({ content: 'Hello team' }).success).toBe(true)
    expect(createMessageSchema.safeParse({ content: '   ' }).success).toBe(false)
  })
})
