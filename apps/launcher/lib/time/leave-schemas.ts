// Zod request schemas for leave request endpoints.

import { z } from 'zod'

export const LEAVE_TYPES = ['Vacation', 'Sick', 'Personal', 'Other'] as const
export const LEAVE_STATUSES = ['Pending', 'Approved', 'Rejected'] as const

export const createLeaveRequestSchema = z
  .object({
    type: z.enum(LEAVE_TYPES),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    reason: z.string().trim().max(2_000).optional(),
  })
  .refine((v) => v.end_date.getTime() >= v.start_date.getTime(), {
    message: 'end_date must be on or after start_date',
    path: ['end_date'],
  })

export const reviewLeaveRequestSchema = z.object({
  status: z.enum(['Approved', 'Rejected']),
})

export const listLeaveRequestsQuerySchema = z.object({
  status: z.enum(LEAVE_STATUSES).optional(),
  scope: z.enum(['mine', 'pending']).optional(),
})

export type CreateLeaveRequestInput = z.infer<typeof createLeaveRequestSchema>
export type ReviewLeaveRequestInput = z.infer<typeof reviewLeaveRequestSchema>
export type ListLeaveRequestsQuery = z.infer<typeof listLeaveRequestsQuerySchema>
