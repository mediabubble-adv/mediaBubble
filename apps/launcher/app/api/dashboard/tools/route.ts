// PATCH /api/dashboard/tools — save personalized tool order

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { DASHBOARD_MODULES } from '@/lib/dashboard/modules'
import { saveToolOrder } from '@/lib/dashboard/prefs'

export const runtime = 'nodejs'

const validIds = new Set(DASHBOARD_MODULES.map((m) => m.id))

const schema = z.object({
  order: z.array(z.string()).max(DASHBOARD_MODULES.length),
})

export async function PATCH(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = schema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const order = parsed.data.order.filter((id) => validIds.has(id))
  const missing = DASHBOARD_MODULES.map((m) => m.id).filter((id) => !order.includes(id))
  const fullOrder = [...order, ...missing]

  await saveToolOrder(me.id, fullOrder)

  return toResponse(ok({ order: fullOrder }, 'Tool order saved'))
}
