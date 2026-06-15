import { headers } from 'next/headers'

/** Request header set by `createCspMiddleware` for inline scripts in layouts. */
export const CSP_NONCE_HEADER = 'x-nonce'

/** Nonce for inline `<script>` tags — must match middleware CSP for the request. */
export function getCspNonce(): string | undefined {
  return headers().get(CSP_NONCE_HEADER) ?? undefined
}
