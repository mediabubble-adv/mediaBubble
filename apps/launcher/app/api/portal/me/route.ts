// GET /api/portal/me — current client portal session profile.

import { ok, fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentPortalSession } from '@/lib/portal/session'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const session = getCurrentPortalSession(req)
  if (!session) return toResponse(fail('unauthorized', 'Portal sign-in required', 401))

  const client = await prisma.clients.findFirst({
    where: { id: session.clientId, deleted_at: null },
    select: {
      id: true,
      name: true,
      invoice_view_enabled: true,
      content_approval_enabled: true,
    },
  })
  if (!client) return toResponse(fail('not_found', 'Client not found', 404))

  return toResponse(
    ok({
      client_id: client.id,
      client_name: client.name,
      email: session.email,
      invoice_view_enabled: client.invoice_view_enabled !== false,
      content_approval_enabled: client.content_approval_enabled !== false,
    }),
  )
}
