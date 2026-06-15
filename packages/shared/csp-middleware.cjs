/** CSP middleware for Next.js App Router (nonce + strict-dynamic). */

const { NextResponse } = require('next/server')
const { buildContentSecurityPolicyWithNonce } = require('./csp-policy.cjs')

/**
 * @param {{ analytics?: boolean }} [options]
 * @returns {(request: import('next/server').NextRequest) => import('next/server').NextResponse}
 */
function createCspMiddleware(options = {}) {
  return function cspMiddleware(request) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const csp = buildContentSecurityPolicyWithNonce(nonce, options)
      .replace(/\s{2,}/g, ' ')
      .trim()

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set('Content-Security-Policy', csp)

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    })
    response.headers.set('Content-Security-Policy', csp)

    return response
  }
}

/** Default matcher: all document routes except static assets. */
const DEFAULT_MIDDLEWARE_MATCHER = [
  {
    source:
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
    missing: [
      { type: 'header', key: 'next-router-prefetch' },
      { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
  },
]

module.exports = {
  buildContentSecurityPolicyWithNonce,
  createCspMiddleware,
  DEFAULT_MIDDLEWARE_MATCHER,
}
