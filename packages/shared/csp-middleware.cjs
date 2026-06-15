/** CSP middleware for Next.js App Router (nonce + strict-dynamic). */

const { NextResponse } = require('next/server')
const { buildContentSecurityPolicyWithNonce } = require('./csp-policy.cjs')
const {
  CSP_NONCE_HEADER,
  buildMiddlewareCsp,
  generateCspNonce,
} = require('./csp-nonce-utils.cjs')

/**
 * @param {{ analytics?: boolean }} [options]
 * @returns {(request: import('next/server').NextRequest) => import('next/server').NextResponse}
 */
function createCspMiddleware(options = {}) {
  return function cspMiddleware(request) {
    const { nonce, csp } = buildMiddlewareCsp(options)

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Content-Security-Policy', csp)
    requestHeaders.set(CSP_NONCE_HEADER, nonce)

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
  CSP_NONCE_HEADER,
  buildContentSecurityPolicyWithNonce,
  buildMiddlewareCsp,
  createCspMiddleware,
  DEFAULT_MIDDLEWARE_MATCHER,
  generateCspNonce,
}
