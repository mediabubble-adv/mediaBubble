import { signJwt, verifyJwt } from './jwt'

const SECRET = 'test-secret'

describe('jwt', () => {
  it('signs and verifies a valid token', () => {
    const token = signJwt({ sub: 'user-1', role: 'Admin' }, SECRET, 3600)
    const claims = verifyJwt(token, SECRET)
    expect(claims?.sub).toBe('user-1')
    expect(claims?.role).toBe('Admin')
    expect(claims?.exp).toBeGreaterThan(claims!.iat)
  })

  it('rejects a wrong secret', () => {
    const token = signJwt({ sub: 'u', role: 'Viewer' }, SECRET, 3600)
    expect(verifyJwt(token, 'other-secret')).toBeNull()
  })

  it('rejects a tampered payload', () => {
    const token = signJwt({ sub: 'u', role: 'Viewer' }, SECRET, 3600)
    const [h, , s] = token.split('.')
    const forged = Buffer.from(JSON.stringify({ sub: 'u', role: 'Admin', iat: 1, exp: 9e9 })).toString('base64url')
    expect(verifyJwt(`${h}.${forged}.${s}`, SECRET)).toBeNull()
  })

  it('rejects an expired token', () => {
    const token = signJwt({ sub: 'u', role: 'Viewer' }, SECRET, -1)
    expect(verifyJwt(token, SECRET)).toBeNull()
  })

  it('rejects malformed tokens', () => {
    expect(verifyJwt('a.b', SECRET)).toBeNull()
    expect(verifyJwt('', SECRET)).toBeNull()
  })
})
