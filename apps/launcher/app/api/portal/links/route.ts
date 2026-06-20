// POST /api/portal/links — issue a magic link for a client contact (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { isProduction } from '@/lib/auth/config'
import { emailAllowedForClient, isPortalEnabled } from '@/lib/portal/access'
import { sendPortalMagicLinkEmail } from '@/lib/portal/email'
import { createPortalMagicLink } from '@/lib/portal/links'
import { createPortalLinkSchema } from '@/lib/portal/schemas'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Manager')) {
    return toResponse(fail('forbidden', 'Manager access required', 403))
  }

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createPortalLinkSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const client = await prisma.clients.findFirst({
    where: { id: parsed.data.client_id, deleted_at: null },
  })
  if (!client) return toResponse(fail('not_found', 'Client not found', 404))
  if (!isPortalEnabled(client)) {
    return toResponse(fail('forbidden', 'Client portal is disabled for this account', 403))
  }
  if (!emailAllowedForClient(client, parsed.data.email)) {
    return toResponse(
      fail('forbidden', 'Email must match the primary contact or an allowed domain', 403),
    )
  }

  const { token, tokenHash, expiresAt } = createPortalMagicLink()

  await prisma.client_portal_tokens.create({
    data: {
      client_id: client.id,
      email: parsed.data.email.trim().toLowerCase(),
      token_hash: tokenHash,
      expires_at: expiresAt,
      created_by: me.id,
    },
  })

  try {
    await sendPortalMagicLinkEmail(parsed.data.email, client.name, token)
  } catch (err) {
    await prisma.client_portal_tokens.deleteMany({ where: { token_hash: tokenHash } })
    const message = err instanceof Error ? err.message : 'Email delivery failed'
    return toResponse(fail('email_failed', message, 502))
  }

  const data = {
    sent: true,
    expires_at: expiresAt.toISOString(),
    ...(isProduction() ? {} : { portalToken: token }),
  }
  return toResponse(ok(data, 'Portal link sent', 201))
}
