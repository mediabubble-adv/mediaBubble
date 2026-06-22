// GET /api/opus/triggers — list automation triggers.
// POST /api/opus/triggers — create trigger (Manager+).

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { prisma } from '@/lib/db/prisma'
import type { Prisma } from '@prisma/client'
import { createOpusTriggerSchema } from '@/lib/opus/schemas'
import { listTriggers } from '@/lib/opus/triggers/engine'
import { serializeTrigger } from '@/lib/opus/triggers/serialize'
import { requireOpusAccess, requireOpusManager, isErrorResponse } from '@/lib/opus/api/rbac'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = requireOpusAccess(req)
  if (isErrorResponse(me)) return me
  const triggers = await listTriggers()
  return toResponse(ok(triggers, 'OPUS triggers retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = requireOpusManager(req)
  if (isErrorResponse(me)) return me

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Invalid JSON body', 400))
  const parsed = createOpusTriggerSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const existing = await prisma.opus_triggers.findUnique({ where: { slug: parsed.data.slug } })
  if (existing) return toResponse(fail('conflict', 'Trigger slug already exists', 409))

  const row = await prisma.opus_triggers.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      type: parsed.data.type,
      enabled: parsed.data.enabled ?? true,
      schedule: parsed.data.schedule ?? null,
      condition: (parsed.data.condition ?? undefined) as Prisma.InputJsonValue | undefined,
      action: parsed.data.action,
      created_by: me.id,
    },
  })

  return toResponse(ok(serializeTrigger(row), 'Trigger created', 201))
}
