// GET/POST /api/tasks — list parent tasks. POST creates parent + optional template subtasks.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { createTaskSchema, listTasksQuerySchema } from '@/lib/tasks/schemas'
import { recordTaskActivity } from '@/lib/tasks/activity'
import { resolveInternalClientId } from '@/lib/tasks/parent'
import { parseTemplateSubtasks, spawnTemplateSubtasks } from '@/lib/tasks/templates'
import {
  assigneeUserSelect,
  loadTaskAssignees,
  resolveAssigneeIds,
} from '@/lib/tasks/assignees'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

const taskListSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  assigned_to: true,
  tags: true,
  due_date: true,
  client_id: true,
  created_at: true,
  updated_at: true,
  clients: { select: { id: true, name: true } },
  other_tasks: {
    where: { deleted_at: null },
    select: { id: true, status: true },
  },
} as const

const taskCreateInclude = {
  clients: { select: { id: true, name: true } },
  other_tasks: {
    where: { deleted_at: null },
    select: { id: true, status: true },
  },
} as const

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const params = Object.fromEntries(new URL(req.url).searchParams)
  const parsed = listTasksQuerySchema.safeParse(params)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { assigned_to, ...rest } = parsed.data
  const where = {
    deleted_at: null,
    parent_task_id: null,
    ...rest,
    ...(assigned_to
      ? {
          OR: [
            { assigned_to },
            { task_assignees: { some: { user_id: assigned_to } } },
          ],
        }
      : {}),
  }

  const tasks = await prisma.tasks.findMany({
    where,
    orderBy: { updated_at: 'desc' },
    select: taskListSelect,
  })

  const assigneeMap = await loadTaskAssignees(
    prisma,
    tasks.map((t) => t.id),
  )
  const withAssignees = tasks.map((t) => ({
    ...t,
    assignees: assigneeMap.get(t.id) ?? [],
  }))

  return toResponse(ok(withAssignees, 'Tasks retrieved'))
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = createTaskSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { template_id, assignee_ids, assigned_to, ...taskInput } = parsed.data
  const clientId = taskInput.client_id ?? (await resolveInternalClientId(prisma))
  const assignees = resolveAssigneeIds({ assignee_ids, assigned_to })

  const client = await prisma.clients.findFirst({
    where: { id: clientId, deleted_at: null },
    select: { id: true },
  })
  if (!client) return toResponse(fail('invalid_client', 'Client not found', 400))

  let template: {
    description: string | null
    default_priority: string | null
    default_tags: string[]
    department_id: string | null
    subtasks: unknown
  } | null = null

  if (template_id) {
    template = await prisma.task_templates.findFirst({
      where: {
        id: template_id,
        OR: [{ is_public: true }, { created_by: me.id }],
      },
      select: {
        description: true,
        default_priority: true,
        default_tags: true,
        department_id: true,
        subtasks: true,
      },
    })
    if (!template) return toResponse(fail('not_found', 'Task template not found', 404))
  }

  const taskId = await prisma.$transaction(async (tx) => {
    const task = await tx.tasks.create({
      data: {
        title: taskInput.title,
        description: taskInput.description ?? template?.description ?? undefined,
        priority: taskInput.priority ?? template?.default_priority ?? undefined,
        status: taskInput.status,
        assigned_to: assignees[0] ?? null,
        department_id: taskInput.department_id ?? template?.department_id ?? undefined,
        due_date: taskInput.due_date,
        estimated_hours: taskInput.estimated_hours,
        tags: taskInput.tags?.length ? taskInput.tags : (template?.default_tags ?? []),
        client_id: clientId,
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

    await recordTaskActivity(tx, {
      task_id: task.id,
      actor_id: me.id,
      type: 'task_created',
      payload: { title: task.title, template_id: template_id ?? null },
    })

    if (template) {
      const items = parseTemplateSubtasks(template.subtasks)
      if (items.length > 0) {
        await spawnTemplateSubtasks(tx, {
          parentId: task.id,
          clientId,
          createdBy: me.id,
          actorId: me.id,
          items,
        })
      }
    }

    return task.id
  })

  const task = await prisma.tasks.findFirst({
    where: { id: taskId },
    include: {
      ...taskCreateInclude,
      task_assignees: {
        include: { users: { select: assigneeUserSelect } },
        orderBy: { created_at: 'asc' },
      },
    },
  })

  const payload = task
    ? {
        ...task,
        assignees: task.task_assignees.map((row) => row.users),
        task_assignees: undefined,
      }
    : task

  return toResponse(ok(payload, 'Task created', 201))
}
