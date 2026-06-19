// Zod request schemas for the Task Board endpoints. Endpoints parse untrusted
// input with these before touching Prisma, mirroring the auth-route convention.

import { z } from 'zod'
import { TASK_STATUSES } from './status'

export const TASK_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'] as const

const title = z.string().trim().min(1, 'Title is required').max(255)
const priority = z.enum(TASK_PRIORITIES)
const status = z.enum(TASK_STATUSES)
const uuid = z.string().uuid()

export const createTaskSchema = z.object({
  title,
  description: z.string().trim().max(10_000).optional(),
  priority: priority.optional(),
  status: status.optional(),
  assigned_to: uuid.optional(),
  department_id: uuid.optional(),
  due_date: z.coerce.date().optional(),
  estimated_hours: z.number().nonnegative().optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
})

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const statusUpdateSchema = z.object({ status })

export const taskCommentSchema = z.object({
  content: z.string().trim().min(1, 'Comment cannot be empty').max(10_000),
  mentioned_users: z.array(uuid).optional(),
})

export const timeEntrySchema = z
  .object({
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    description: z.string().trim().max(2_000).optional(),
    billable: z.boolean().optional(),
  })
  .refine((v) => v.end_time.getTime() > v.start_time.getTime(), {
    message: 'end_time must be after start_time',
    path: ['end_time'],
  })

export const listTasksQuerySchema = z.object({
  status: status.optional(),
  assigned_to: uuid.optional(),
  department_id: uuid.optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type TaskCommentInput = z.infer<typeof taskCommentSchema>
export type TimeEntryInput = z.infer<typeof timeEntrySchema>
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>
