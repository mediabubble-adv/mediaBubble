// Bridges the framework-agnostic response envelopes (lib/api/response.ts) to
// the web `Response` returned by Next.js route handlers, keeping the HTTP
// status in lockstep with the envelope's `status` field.

import type { ApiError, ApiSuccess } from './response'

export function toResponse(envelope: ApiSuccess<unknown> | ApiError): Response {
  return Response.json(envelope, { status: envelope.status })
}

/** Parse a JSON request body, returning `undefined` on malformed input. */
export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json()
  } catch {
    return undefined
  }
}
