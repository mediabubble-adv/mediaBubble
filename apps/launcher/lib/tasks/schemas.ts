// Zod request schemas for the Task Board endpoints. Endpoints parse untrusted
// input with these before touching Prisma, mirroring the auth-route convention.

import { z } from 'zod'
import { TASK_STATUSES } from './status'

export const TASK_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'] as const

export const TASK_REACTION_EMOJIS = [
  'like',
  'love',
  'wink',
  'happy',
  'surprised',
  'sad',
] as const

export const REACTION_TARGET_TYPES = ['comment', 'activity'] as const

const title = z.string().trim().min(1, 'Title is required').max(255)
const priority = z.enum(TASK_PRIORITIES)
const status = z.enum(TASK_STATUSES)
const uuid = z.string().uuid()
const reactionEmoji = z.enum(TASK_REACTION_EMOJIS)
const reactionTarget = z.enum(REACTION_TARGET_TYPES)

export const createTaskSchema = z.object({
  title,
  description: z.string().trim().max(10_000).optional(),
  client_id: uuid.optional(),
  priority: priority.optional(),
  status: status.optional(),
  assigned_to: uuid.optional(),
  assignee_ids: z.array(uuid).optional(),
  department_id: uuid.optional(),
  due_date: z.coerce.date().optional(),
  estimated_hours: z.number().nonnegative().optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  template_id: uuid.optional(),
})

export const replaceAssigneesSchema = z.object({
  user_ids: z.array(uuid),
})

export const saveTaskTemplateSchema = z.object({
  task_id: uuid,
  name: z.string().trim().min(1).max(255),
  is_public: z.boolean().optional(),
})

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const statusUpdateSchema = z.object({ status })

export const taskCommentSchema = z.object({
  content: z.string().trim().min(1, 'Comment cannot be empty').max(10_000),
  parent_id: uuid.optional(),
  mentioned_users: z.array(uuid).optional(),
})

export const createSubtaskSchema = z.object({
  title,
  assigned_to: uuid.optional(),
  assignee_ids: z.array(uuid).optional(),
  status: status.optional(),
})

export const updateSubtaskSchema = z
  .object({
    title: title.optional(),
    assigned_to: uuid.nullable().optional(),
    assignee_ids: z.array(uuid).optional(),
    status: status.optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const reactionSchema = z.object({
  target_type: reactionTarget,
  target_id: uuid,
  emoji: reactionEmoji,
})

export const attachmentMetaSchema = z.object({
  file_name: z.string().trim().min(1).max(255),
  file_url: z.string().trim().min(1),
  file_size: z.number().int().nonnegative().optional(),
  mime_type: z.string().trim().max(100).optional(),
})

export { timeEntrySchema, type TimeEntryInput } from '@/lib/time/schemas'

export const listTasksQuerySchema = z.object({
  status: status.optional(),
  assigned_to: uuid.optional(),
  department_id: uuid.optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type TaskCommentInput = z.infer<typeof taskCommentSchema>
export type CreateSubtaskInput = z.infer<typeof createSubtaskSchema>
export type UpdateSubtaskInput = z.infer<typeof updateSubtaskSchema>
export type ReactionInput = z.infer<typeof reactionSchema>
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>
