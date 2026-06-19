import { getSessionToken, getCurrentUser } from './session'
import { signJwt } from './jwt'
import { SESSION_COOKIE } from './cookie'

const SECRET = 'session-test-secret'

beforeAll(() => {
  process.env['JWT_SECRET'] = SECRET
})

const reqWith = (headers: Record<string, string>): Request =>
  new Request('http://localhost/', { headers })

describe('getSessionToken', () => {
  it('reads a Bearer token from the Authorization header', () => {
    expect(getSessionToken(reqWith({ authorization: 'Bearer xyz' }))).toBe('xyz')
  })

  it('falls back to the session cookie', () => {
    const req = reqWith({ cookie: `${SESSION_COOKIE}=cookie-tok` })
    expect(getSessionToken(req)).toBe('cookie-tok')
  })

  it('returns undefined when neither is present', () => {
    expect(getSessionToken(reqWith({}))).toBeUndefined()
  })
})

describe('getCurrentUser', () => {
  it('resolves a valid session to the user', () => {
    const token = signJwt({ sub: 'user-9', role: 'Manager' }, SECRET, 3600)
    const user = getCurrentUser(reqWith({ cookie: `${SESSION_COOKIE}=${token}` }))
    expect(user).toEqual({ id: 'user-9', role: 'Manager' })
  })

  it('returns null for a missing token', () => {
    expect(getCurrentUser(reqWith({}))).toBeNull()
  })

  it('returns null for an invalid signature', () => {
    const token = signJwt({ sub: 'u', role: 'Admin' }, 'other-secret', 3600)
    expect(getCurrentUser(reqWith({ authorization: `Bearer ${token}` }))).toBeNull()
  })

  it('returns null when the role is not a known RBAC role', () => {
    const token = signJwt({ sub: 'u', role: 'Superuser' }, SECRET, 3600)
    expect(getCurrentUser(reqWith({ authorization: `Bearer ${token}` }))).toBeNull()
  })
})
