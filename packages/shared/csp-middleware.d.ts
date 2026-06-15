import type { NextRequest, NextResponse } from 'next/server'

export interface CspMiddlewareOptions {
  analytics?: boolean
}

export function createCspMiddleware(
  options?: CspMiddlewareOptions
): (request: NextRequest) => NextResponse

export const DEFAULT_MIDDLEWARE_MATCHER: Array<{
  source: string
  missing?: Array<{ type: string; key: string; value?: string }>
}>
