import type { NextRequest, NextResponse } from 'next/server'

export interface CspMiddlewareOptions {
  analytics?: boolean
}

export const CSP_NONCE_HEADER: 'x-nonce'

export function generateCspNonce(): string

export function buildMiddlewareCsp(
  options?: CspMiddlewareOptions
): { nonce: string; csp: string }

export function createCspMiddleware(
  options?: CspMiddlewareOptions
): (request: NextRequest) => NextResponse

export const DEFAULT_MIDDLEWARE_MATCHER: Array<{
  source: string
  missing?: Array<{ type: string; key: string; value?: string }>
}>
