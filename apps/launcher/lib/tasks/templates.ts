import { z } from 'zod'
import type { Prisma, PrismaClient } from '@prisma/client'
import { recordTaskActivity } from '@/lib/tasks/activity'

export const templateSubtaskItemSchema = z.object({
  title: z.string().trim().min(1).max(255),
  assigned_to: z.string().uuid().optional(),
  estimated_hours: z.number().nonnegative().optional(),
})

export type TemplateSubtaskItem = z.infer<typeof templateSubtaskItemSchema>

const templateSubtasksSchema = z.array(
  z.union([z.string().trim().min(1).max(255), templateSubtaskItemSchema]),
)

/** Normalize DB JSON — supports `["Title"]` or `[{ title, assigned_to?, estimated_hours? }]`. */
export function parseTemplateSubtasks(raw: unknown): TemplateSubtaskItem[] {
  if (raw == null) return []
  const parsed = templateSubtasksSchema.safeParse(raw)
  if (!parsed.success) return []
  return parsed.data.map((item) => (typeof item === 'string' ? { title: item } : item))
}

type Db = PrismaClient | Prisma.TransactionClient

export async function spawnTemplateSubtasks(
  db: Db,
  input: {
    parentId: string
    clientId: string
    createdBy: string
    actorId: string
    items: TemplateSubtaskItem[]
  },
): Promise<number> {
  let count = 0
  for (const item of input.items) {
    const subtask = await db.tasks.create({
      data: {
        title: item.title,
        parent_task_id: input.parentId,
        client_id: input.clientId,
        created_by: input.createdBy,
        assigned_to: item.assigned_to,
        estimated_hours: item.estimated_hours,
        status: 'Backlog',
        ...(item.assigned_to
          ? {
              task_assignees: {
                create: {
                  user_id: item.assigned_to,
                  assigned_by: input.actorId,
                },
              },
            }
          : {}),
      },
    })
    await recordTaskActivity(db, {
      task_id: input.parentId,
      actor_id: input.actorId,
      type: 'subtask_added',
      payload: { subtask_id: subtask.id, title: subtask.title, from_template: true },
    })
    count += 1
  }
  return count
}

export interface TaskTemplateSummary {
  id: string
  name: string
  description: string | null
  default_priority: string | null
  default_tags: string[]
  subtasks: TemplateSubtaskItem[]
}

export async function buildTemplateFromTask(
  db: Db,
  taskId: string,
): Promise<{
  description: string | null
  default_priority: string | null
  default_tags: string[]
  department_id: string | null
  subtasks: TemplateSubtaskItem[]
} | null> {
  const task = await db.tasks.findFirst({
    where: { id: taskId, deleted_at: null, parent_task_id: null },
    select: {
      description: true,
      priority: true,
      tags: true,
      department_id: true,
      other_tasks: {
        where: { deleted_at: null },
        orderBy: { created_at: 'asc' },
        select: {
          title: true,
          assigned_to: true,
          estimated_hours: true,
        },
      },
    },
  })
  if (!task) return null

  return {
    description: task.description,
    default_priority: task.priority,
    default_tags: task.tags ?? [],
    department_id: task.department_id,
    subtasks: task.other_tasks.map((s) => ({
      title: s.title,
      ...(s.assigned_to ? { assigned_to: s.assigned_to } : {}),
      ...(s.estimated_hours != null
        ? { estimated_hours: Number(s.estimated_hours) }
        : {}),
    })),
  }
}

export function serializeTaskTemplate(row: {
  id: string
  name: string
  description: string | null
  default_priority: string | null
  default_tags: string[]
  subtasks: unknown
}): TaskTemplateSummary {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    default_priority: row.default_priority,
    default_tags: row.default_tags ?? [],
    subtasks: parseTemplateSubtasks(row.subtasks),
  }
}
