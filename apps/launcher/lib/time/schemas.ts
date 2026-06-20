// Zod request schemas for Time Management endpoints.

import { z } from 'zod'

export const TIME_ENTRY_STATUSES = ['Draft', 'Submitted', 'Approved', 'Rejected'] as const

const uuid = z.string().uuid()

export const timeEntrySchema = z
  .object({
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    description: z.string().trim().max(2_000).optional(),
    billable: z.boolean().optional(),
    task_id: uuid.optional(),
  })
  .refine((v) => v.end_time.getTime() > v.start_time.getTime(), {
    message: 'end_time must be after start_time',
    path: ['end_time'],
  })

export const updateTimeEntrySchema = z
  .object({
    start_time: z.coerce.date().optional(),
    end_time: z.coerce.date().optional(),
    description: z.string().trim().max(2_000).optional().nullable(),
    billable: z.boolean().optional(),
    status: z.enum(TIME_ENTRY_STATUSES).optional(),
    task_id: uuid.optional().nullable(),
  })
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listTimeEntriesQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  task_id: uuid.optional(),
  status: z.enum(TIME_ENTRY_STATUSES).optional(),
  scope: z.enum(['mine', 'team', 'pending']).optional(),
})

export const reviewTimeEntrySchema = z.object({
  status: z.enum(['Approved', 'Rejected']),
})

export const capacityQuerySchema = z.object({
  week: z.coerce.date().optional(),
  scope: z.enum(['mine', 'team']).optional(),
})

export type TimeEntryInput = z.infer<typeof timeEntrySchema>
export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntrySchema>
export type ListTimeEntriesQuery = z.infer<typeof listTimeEntriesQuerySchema>
export type ReviewTimeEntryInput = z.infer<typeof reviewTimeEntrySchema>
export type CapacityQuery = z.infer<typeof capacityQuerySchema>
