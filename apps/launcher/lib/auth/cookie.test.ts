import {
  SESSION_COOKIE,
  serializeSessionCookie,
  clearSessionCookie,
  readCookieHeader,
} from './cookie'

describe('cookie', () => {
  it('serializes an httpOnly session cookie with a max-age', () => {
    const value = serializeSessionCookie('tok123', 3600)
    expect(value).toContain(`${SESSION_COOKIE}=tok123`)
    expect(value).toContain('HttpOnly')
    expect(value).toContain('SameSite=Lax')
    expect(value).toContain('Path=/')
    expect(value).toContain('Max-Age=3600')
  })

  it('clears the cookie with Max-Age=0', () => {
    expect(clearSessionCookie()).toContain('Max-Age=0')
  })

  it('does not set Secure outside production', () => {
    expect(serializeSessionCookie('t')).not.toContain('Secure')
  })

  it('reads the named cookie from a header', () => {
    const header = `theme=dark; ${SESSION_COOKIE}=abc.def; other=1`
    expect(readCookieHeader(header, SESSION_COOKIE)).toBe('abc.def')
  })

  it('returns undefined for a missing cookie or null header', () => {
    expect(readCookieHeader('a=1', SESSION_COOKIE)).toBeUndefined()
    expect(readCookieHeader(null, SESSION_COOKIE)).toBeUndefined()
  })
})
