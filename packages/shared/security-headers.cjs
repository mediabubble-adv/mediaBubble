/** Shared security headers for Next.js apps (required from next.config.js). */

const MEDIABUBBLE_IMAGE_HOSTS = [
  'mediabubble.co',
  'www.mediabubble.co',
  'mediabubble.ae',
  'www.mediabubble.ae',
  'brand.mediabubble.co',
  'cdn.mediabubble.co',
  'images.unsplash.com',
  'www.googletagmanager.com',
  'www.google-analytics.com',
]

const ANALYTICS_CONNECT_HOSTS = [
  'https://www.google-analytics.com',
  'https://analytics.google.com',
  'https://stats.g.doubleclick.net',
]

/** CSP is applied per-request in middleware (nonce). See csp-middleware.cjs. */

/**
 * @param {{ analytics?: boolean }} [options]
 * @returns {string}
 */
function buildContentSecurityPolicy(options = {}) {
  const { analytics = false } = options

  const scriptSrc = analytics
    ? "script-src 'self' https://www.googletagmanager.com"
    : "script-src 'self'"

  const connectSrc = analytics
    ? ["connect-src 'self'", ...ANALYTICS_CONNECT_HOSTS].join(' ')
    : "connect-src 'self'"

  const imgHosts = MEDIABUBBLE_IMAGE_HOSTS.map((host) => `https://${host}`).join(' ')

  return [
    "default-src 'self'",
    scriptSrc,
    // Next.js and Tailwind inject inline styles at runtime.
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${imgHosts}`,
    "font-src 'self'",
    connectSrc,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ')
}

/** @returns {import('next').RemotePattern[]} */
function buildImageRemotePatterns() {
  const hostnames = [
    'images.unsplash.com',
    'mediabubble.co',
    'www.mediabubble.co',
    'mediabubble.ae',
    'www.mediabubble.ae',
    'brand.mediabubble.co',
    'cdn.mediabubble.co',
  ]

  return hostnames.map((hostname) => ({
    protocol: 'https',
    hostname,
  }))
}

/**
 * @param {{ analytics?: boolean }} [options]
 * @returns {{ key: string, value: string }[]}
 */
function buildSecurityHeaders() {
  return [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
  ]
}

const productionStaticCacheHeader = {
  key: 'Cache-Control',
  value: 'public, max-age=31536000, immutable',
}

const developmentStaticCacheHeader = {
  key: 'Cache-Control',
  value: 'no-store, must-revalidate',
}

function buildCacheHeaders() {
  const staticCacheHeader =
    process.env.NODE_ENV === 'development'
      ? developmentStaticCacheHeader
      : productionStaticCacheHeader

  return [
    {
      source: '/fonts/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/images/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
    },
    {
      source: '/assets/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/_next/static/:path*',
      headers: [staticCacheHeader],
    },
    {
      source: '/:path((?!_next/static|fonts|images|assets).*)',
      headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
    },
  ]
}

/**
 * @param {{ analytics?: boolean }} [options]
 * @returns {import('next').Header[]}
 */
function buildNextHeaders() {
  return [
    {
      source: '/(.*)',
      headers: buildSecurityHeaders(),
    },
    ...buildCacheHeaders(),
  ]
}

module.exports = {
  MEDIABUBBLE_IMAGE_HOSTS,
  ANALYTICS_CONNECT_HOSTS,
  buildContentSecurityPolicy,
  buildImageRemotePatterns,
  buildSecurityHeaders,
  buildNextHeaders,
}
