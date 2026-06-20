// POST /api/portal/verify — consume a magic link and start a client portal session.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import {
  buildPortalSessionToken,
  hashToken,
  isPortalTokenUsable,
} from '@/lib/portal/links'
import { serializeClientSessionCookie } from '@/lib/portal/cookie'
import { verifyPortalTokenSchema } from '@/lib/portal/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = verifyPortalTokenSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const row = await prisma.client_portal_tokens.findUnique({
    where: { token_hash: hashToken(parsed.data.token) },
    include: { clients: true },
  })

  if (!row || !isPortalTokenUsable(row)) {
    return toResponse(fail('invalid_token', 'Link is invalid or expired', 400))
  }
  if (row.clients.deleted_at) {
    return toResponse(fail('invalid_token', 'Client account is no longer available', 400))
  }

  const now = new Date()
  await prisma.client_portal_tokens.update({
    where: { id: row.id },
    data: { used_at: now },
  })

  const sessionToken = buildPortalSessionToken(row.client_id, row.email)
  const response = toResponse(
    ok(
      {
        client_id: row.client_id,
        client_name: row.clients.name,
        email: row.email,
      },
      'Portal session started',
    ),
  )
  response.headers.append('Set-Cookie', serializeClientSessionCookie(sessionToken))
  return response
}
