import { presencePatchSchema } from './schemas'
import { USER_SETTABLE_PRESENCE } from './constants'

describe('presencePatchSchema', () => {
  it('accepts Online without a message', () => {
    const r = presencePatchSchema.safeParse({ status: 'Online' })
    expect(r.success).toBe(true)
  })

  it('accepts Away with a short message', () => {
    const r = presencePatchSchema.safeParse({ status: 'Away', status_message: 'In a meeting' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.status_message).toBe('In a meeting')
  })

  it('coerces empty message to null', () => {
    const r = presencePatchSchema.safeParse({ status: 'Busy', status_message: '' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.status_message).toBeNull()
  })

  it('rejects messages over 100 characters', () => {
    expect(
      presencePatchSchema.safeParse({ status: 'Busy', status_message: 'x'.repeat(101) }).success,
    ).toBe(false)
  })

  it('rejects unknown status values', () => {
    expect(presencePatchSchema.safeParse({ status: 'Offline' }).success).toBe(false)
    expect(presencePatchSchema.safeParse({ status: 'Invisible' }).success).toBe(false)
  })

  it('allows every user-settable status', () => {
    for (const status of USER_SETTABLE_PRESENCE) {
      expect(presencePatchSchema.safeParse({ status }).success).toBe(true)
    }
  })
})
