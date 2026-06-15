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

  it('includes script hashes when no nonce is provided', () => {
    const csp = buildContentSecurityPolicyWithNonce(null, { analytics: true })
    expect(csp).not.toContain('nonce-')
    expect(csp).not.toContain('strict-dynamic')
    expect(csp).toContain("sha256-AngVWd5WLE28t6pDbMdyzyprEeDnIw6V5DYMSdkAQHI=")
    expect(csp).toContain("sha256-s8gtWKaqPslWqKjox+ESaWQUDPMOC3gGL7HepLkekWg=")
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

describe('inline script hashes', () => {
  it('precalculated hashes match actual script SHA-256 hashes', () => {
    const crypto = require('crypto')
    const {
      THEME_INIT_SCRIPT,
      THEME_HASH,
      DEV_SW_CLEANUP_SCRIPT,
      DEV_SW_HASH,
      LANG_INIT_SCRIPT,
      LANG_HASH,
    } = require('./src/inline-scripts.cjs')

    const sha256 = (str) => `sha256-${crypto.createHash('sha256').update(str).digest('base64')}`

    expect(THEME_HASH).toBe(`'${sha256(THEME_INIT_SCRIPT)}'`)
    expect(DEV_SW_HASH).toBe(`'${sha256(DEV_SW_CLEANUP_SCRIPT)}'`)
    expect(LANG_HASH).toBe(`'${sha256(LANG_INIT_SCRIPT)}'`)
  })
})
