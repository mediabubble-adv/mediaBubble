// Zod request schemas for availability and holiday endpoints.

import { z } from 'zod'

export const AVAILABILITY_STATUSES = ['Available', 'Busy', 'On Leave'] as const
export const HOLIDAY_COUNTRIES = ['Egypt', 'UAE'] as const

export const createAvailabilitySchema = z
  .object({
    date: z.coerce.date(),
    start_time: z.string().regex(/^\d{2}:\d{2}$/, 'Use HH:MM format'),
    end_time: z.string().regex(/^\d{2}:\d{2}$/, 'Use HH:MM format'),
    status: z.enum(AVAILABILITY_STATUSES).optional(),
  })
  .refine((v) => v.end_time > v.start_time, {
    message: 'end_time must be after start_time',
    path: ['end_time'],
  })

export const listAvailabilityQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
})

export const listHolidaysQuerySchema = z.object({
  country: z.enum(HOLIDAY_COUNTRIES),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
})

export type CreateAvailabilityInput = z.infer<typeof createAvailabilitySchema>
export type ListAvailabilityQuery = z.infer<typeof listAvailabilityQuerySchema>
export type ListHolidaysQuery = z.infer<typeof listHolidaysQuerySchema>
