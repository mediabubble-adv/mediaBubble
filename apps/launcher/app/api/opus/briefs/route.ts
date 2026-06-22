// GET /api/opus/briefs — list OPUS briefs.
// POST /api/opus/briefs — create brief (+ optional campaign).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { createOpusBriefSchema } from '@/lib/opus/schemas'
import { createBrief, listBriefs } from '@/lib/opus/briefs/service'
import { requireOpusAccess, isErrorResponse } from '@/lib/opus/api/rbac'
import { initOpusWorkflows } from '@/lib/opus/workflow-engine'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = requireOpusAccess(req)
  if (isErrorResponse(me)) return me
  initOpusWorkflows()
  const briefs = await listBriefs()
  return toResponse(ok(briefs, 'OPUS briefs retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = requireOpusAccess(req, 'Contributor')
  if (isErrorResponse(me)) return me
  initOpusWorkflows()

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Invalid JSON body', 400))
  const parsed = createOpusBriefSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  try {
    const brief = await createBrief(parsed.data, me.id)
    return toResponse(ok(brief, 'Brief created', 201))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create brief'
    return toResponse(fail('opus_brief_error', message, 400))
  }
}
