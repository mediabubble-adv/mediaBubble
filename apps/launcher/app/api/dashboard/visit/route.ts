// POST /api/dashboard/visit — record module usage for personalization

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { getModuleById } from '@/lib/dashboard/modules'
import { recordModuleVisit } from '@/lib/dashboard/prefs'

export const runtime = 'nodejs'

const schema = z.object({
  moduleId: z.string().min(1).max(50),
})

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = schema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (!getModuleById(parsed.data.moduleId)) {
    return toResponse(fail('invalid_module', 'Unknown module id', 400))
  }

  const usage = await recordModuleVisit(me.id, parsed.data.moduleId)

  return toResponse(ok({ usage }, 'Visit recorded'))
}
