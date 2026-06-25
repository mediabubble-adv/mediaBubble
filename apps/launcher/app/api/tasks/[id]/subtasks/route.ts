// GET/POST /api/tasks/:id/subtasks

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { createSubtaskSchema } from '@/lib/tasks/schemas'
import { recordTaskActivity } from '@/lib/tasks/activity'
import { isParentTask } from '@/lib/tasks/parent'
import { resolveAssigneeIds } from '@/lib/tasks/assignees'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const parent = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!parent || !isParentTask(parent)) {
    return toResponse(fail('not_found', 'Parent task not found', 404))
  }

  const subtasks = await prisma.tasks.findMany({
    where: { parent_task_id: id, deleted_at: null },
    orderBy: { created_at: 'asc' },
    select: {
      id: true,
      title: true,
      status: true,
      assigned_to: true,
      due_date: true,
      created_at: true,
    },
  })
  return toResponse(ok(subtasks, 'Subtasks retrieved'))
}

export async function POST(req: Request, { params }: Ctx): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const { id } = await params
  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createSubtaskSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const parent = await prisma.tasks.findFirst({ where: { id, deleted_at: null } })
  if (!parent || !isParentTask(parent)) {
    return toResponse(fail('not_found', 'Parent task not found', 404))
  }
  if (!parent.client_id) {
    return toResponse(fail('invalid_parent', 'Parent task must have a client', 400))
  }

  const assignees = resolveAssigneeIds({
    assignee_ids: parsed.data.assignee_ids,
    assigned_to: parsed.data.assigned_to,
  })

  const subtask = await prisma.$transaction(async (tx) => {
    const row = await tx.tasks.create({
      data: {
        title: parsed.data.title,
        status: parsed.data.status ?? 'Backlog',
        assigned_to: assignees[0] ?? null,
        parent_task_id: id,
        client_id: parent.client_id,
        created_by: me.id,
        ...(assignees.length > 0
          ? {
              task_assignees: {
                create: assignees.map((user_id) => ({
                  user_id,
                  assigned_by: me.id,
                })),
              },
            }
          : {}),
      },
    })
    return row
  })

  await recordTaskActivity(prisma, {
    task_id: id,
    actor_id: me.id,
    type: 'subtask_added',
    payload: { subtask_id: subtask.id, title: subtask.title },
  })

  return toResponse(ok(subtask, 'Subtask created', 201))
}
