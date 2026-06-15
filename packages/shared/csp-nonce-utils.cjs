/** Per-request CSP nonce helpers (Edge-safe — no Node.js imports). */

const { buildContentSecurityPolicyWithNonce } = require('./csp-policy.cjs')

/** Matches `CSP_NONCE_HEADER` in `src/csp-nonce.ts` (layouts read this for inline scripts). */
const CSP_NONCE_HEADER = 'x-nonce'

function generateCspNonce() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/**
 * @param {{ analytics?: boolean }} [options]
 * @returns {{ nonce: string, csp: string }}
 */
function buildMiddlewareCsp(options = {}) {
  const nonce = generateCspNonce()
  const csp = buildContentSecurityPolicyWithNonce(nonce, options)
    .replace(/\s{2,}/g, ' ')
    .trim()
  return { nonce, csp }
}

module.exports = {
  CSP_NONCE_HEADER,
  buildMiddlewareCsp,
  generateCspNonce,
}
