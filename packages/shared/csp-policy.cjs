/** Pure CSP string builders (no Next.js imports — safe for Jest). */

const {
  MEDIABUBBLE_IMAGE_HOSTS,
  ANALYTICS_CONNECT_HOSTS,
} = require('./security-headers.cjs')

const crypto = require('crypto')
const { THEME_INIT_SCRIPT, DEV_SW_CLEANUP_SCRIPT, LANG_INIT_SCRIPT } = require('./src/inline-scripts.cjs')

const sha256 = (str) => crypto.createHash('sha256').update(str).digest('base64')

const THEME_HASH = `'sha256-${sha256(THEME_INIT_SCRIPT)}'`
const DEV_SW_HASH = `'sha256-${sha256(DEV_SW_CLEANUP_SCRIPT)}'`
const LANG_HASH = `'sha256-${sha256(LANG_INIT_SCRIPT)}'`

/**
 * @param {string|null|undefined} nonce
 * @param {{ analytics?: boolean; dev?: boolean }} [options]
 * @returns {string}
 */
function buildContentSecurityPolicyWithNonce(nonce, options = {}) {
  const { analytics = false, dev = process.env.NODE_ENV === 'development' } = options

  const scriptParts = ["'self'"]
  if (nonce) {
    scriptParts.push(`'nonce-${nonce}'`, "'strict-dynamic'")
  } else {
    // Whitelist inline script hashes for static pages
    scriptParts.push(THEME_HASH, LANG_HASH)
    if (dev) {
      scriptParts.push(DEV_SW_HASH)
    }
  }
  if (analytics) scriptParts.push('https://www.googletagmanager.com')
  if (dev) scriptParts.push("'unsafe-eval'")

  const connectParts = ["'self'"]
  if (analytics) connectParts.push(...ANALYTICS_CONNECT_HOSTS)
  if (dev) {
    connectParts.push(
      'ws://localhost:*',
      'ws://127.0.0.1:*',
      'http://localhost:*',
      'http://127.0.0.1:*',
    )
  }

  const imgHosts = MEDIABUBBLE_IMAGE_HOSTS.map((host) => `https://${host}`).join(' ')

  return [
    "default-src 'self'",
    `script-src ${scriptParts.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${imgHosts}`,
    "font-src 'self'",
    `connect-src ${connectParts.join(' ')}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ')
}

module.exports = {
  buildContentSecurityPolicyWithNonce,
}
