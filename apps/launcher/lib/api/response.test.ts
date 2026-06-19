import { z } from 'zod'
import { fail, ok, validationError } from './response'

describe('api response envelopes', () => {
  it('builds a success envelope', () => {
    expect(ok({ id: 1 }, 'Created', 201)).toEqual({
      status: 201,
      data: { id: 1 },
      message: 'Created',
    })
  })

  it('defaults success status + message', () => {
    expect(ok('x')).toEqual({ status: 200, data: 'x', message: 'Success' })
  })

  it('omits details when not provided', () => {
    expect(fail('not_found', 'Missing', 404)).toEqual({
      status: 404,
      error: 'not_found',
      message: 'Missing',
    })
  })

  it('includes details when provided', () => {
    const e = fail('bad', 'Bad', 400, { field: 'email' })
    expect(e.details).toEqual({ field: 'email' })
  })

  it('maps a Zod error to a 400 validation envelope', () => {
    const result = z.object({ email: z.string().email() }).safeParse({ email: 'nope' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const e = validationError(result.error)
      expect(e.status).toBe(400)
      expect(e.error).toBe('validation_error')
      expect(e.details).toHaveProperty('fieldErrors')
    }
  })
})
