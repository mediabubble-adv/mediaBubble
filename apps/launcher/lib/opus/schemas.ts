// Zod schemas for OPUS API endpoints.

import { z } from 'zod'
import { CURRENCIES } from '@/lib/crm/schemas'
import { SERVICE_CHANNELS } from '@/lib/campaigns/schemas'
import { OPUS_BRIEF_GOALS, OPUS_BRIEF_STATUSES, OPUS_TRIGGER_TYPES } from './types'

export const createOpusBriefSchema = z.object({
  client_id: z.string().uuid(),
  name: z.string().trim().min(1).max(255),
  goal: z.enum(OPUS_BRIEF_GOALS).optional(),
  audience: z.string().trim().max(2_000).optional().nullable(),
  budget: z.coerce.number().nonnegative().max(999_999_999).optional().nullable(),
  currency: z.enum(CURRENCIES).optional(),
  channels: z.array(z.enum(SERVICE_CHANNELS)).max(10).optional(),
  key_messages: z.array(z.string().trim().min(1).max(500)).max(20).optional(),
  platforms: z
    .object({
      meta: z.boolean().optional(),
      google: z.boolean().optional(),
      email: z.boolean().optional(),
      linkedin: z.boolean().optional(),
    })
    .optional(),
  create_campaign: z.boolean().optional(),
})

export const updateOpusBriefSchema = createOpusBriefSchema
  .omit({ client_id: true })
  .extend({ status: z.enum(OPUS_BRIEF_STATUSES).optional() })
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const createOpusTriggerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens'),
  type: z.enum(OPUS_TRIGGER_TYPES),
  enabled: z.boolean().optional(),
  schedule: z.string().trim().max(100).optional().nullable(),
  condition: z.record(z.string(), z.unknown()).optional().nullable(),
  action: z.string().trim().min(1).max(100),
})

export const updateOpusTriggerSchema = createOpusTriggerSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const recordUsageSchema = z.object({
  event: z.enum(['ai_generation', 'campaign_launch', 'api_call', 'optimization']),
  amount: z.coerce.number().int().min(1).max(10_000).optional(),
})

export type CreateOpusBriefInput = z.infer<typeof createOpusBriefSchema>
export type UpdateOpusBriefInput = z.infer<typeof updateOpusBriefSchema>
export type CreateOpusTriggerInput = z.infer<typeof createOpusTriggerSchema>
export type UpdateOpusTriggerInput = z.infer<typeof updateOpusTriggerSchema>
