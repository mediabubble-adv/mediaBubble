const { buildContentSecurityPolicyWithNonce } = require('./csp-policy.cjs')
const {
  buildContentSecurityPolicy,
  buildSecurityHeaders,
} = require('./security-headers.cjs')

describe('csp middleware', () => {
  it('includes nonce and strict-dynamic in script-src', () => {
    const csp = buildContentSecurityPolicyWithNonce('test-nonce', { analytics: true })
    expect(csp).toContain("script-src 'self' 'nonce-test-nonce' 'strict-dynamic'")
    expect(csp).toContain('https://www.googletagmanager.com')
  })

  it('allows unsafe-eval in development for Next.js HMR', () => {
    const prev = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    const csp = buildContentSecurityPolicyWithNonce('dev-nonce', { analytics: true })
    expect(csp).toContain("'unsafe-eval'")
    expect(csp).toContain('ws://localhost:*')
    process.env.NODE_ENV = prev
  })
})

describe('security headers', () => {
  it('legacy buildContentSecurityPolicy still omits unsafe-inline in script-src', () => {
    const csp = buildContentSecurityPolicy({ analytics: true })
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/)
    expect(csp).toContain("script-src 'self' https://www.googletagmanager.com")
  })

  it('does not set CSP on static next.config headers (middleware owns CSP)', () => {
    const headers = buildSecurityHeaders()
    const keys = headers.map((header) => header.key)
    expect(keys).not.toContain('Content-Security-Policy')
    expect(keys).toEqual(
      expect.arrayContaining([
        'Strict-Transport-Security',
        'X-Content-Type-Options',
        'Referrer-Policy',
      ]),
    )
  })
})
