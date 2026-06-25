// GET/POST /api/tasks/templates — list or save task templates.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { saveTaskTemplateSchema } from '@/lib/tasks/schemas'
import { buildTemplateFromTask, serializeTaskTemplate } from '@/lib/tasks/templates'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const rows = await prisma.task_templates.findMany({
    where: {
      OR: [{ is_public: true }, { created_by: me.id }],
    },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      description: true,
      default_priority: true,
      default_tags: true,
      subtasks: true,
    },
  })

  return toResponse(
    ok(rows.map(serializeTaskTemplate), 'Task templates retrieved'),
  )
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = saveTaskTemplateSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const snapshot = await buildTemplateFromTask(prisma, parsed.data.task_id)
  if (!snapshot) return toResponse(fail('not_found', 'Parent task not found', 404))

  const row = await prisma.task_templates.create({
    data: {
      name: parsed.data.name,
      description: snapshot.description,
      default_priority: snapshot.default_priority,
      default_tags: snapshot.default_tags,
      department_id: snapshot.department_id,
      subtasks: snapshot.subtasks,
      created_by: me.id,
      is_public: parsed.data.is_public ?? false,
    },
    select: {
      id: true,
      name: true,
      description: true,
      default_priority: true,
      default_tags: true,
      subtasks: true,
    },
  })

  return toResponse(ok(serializeTaskTemplate(row), 'Task template saved', 201))
}
