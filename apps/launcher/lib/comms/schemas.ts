// Zod request schemas for Communication Hub endpoints.

import { z } from 'zod'

export const CHANNEL_TYPES = ['Public', 'Private', 'DM', 'Activity'] as const

export const USER_CHANNEL_TYPES = ['Public', 'Private'] as const

export const createChannelSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().max(2_000).optional().nullable(),
  type: z.enum(CHANNEL_TYPES).optional(),
  member_ids: z.array(z.string().uuid()).max(50).optional(),
})

export const updateChannelSchema = z
  .object({
    name: z.string().trim().min(1).max(255).optional(),
    description: z.string().trim().max(2_000).optional().nullable(),
    member_ids: z.array(z.string().uuid()).max(50).optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listChannelsQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
})

export const createMessageSchema = z.object({
  content: z.string().trim().min(1).max(8_000),
  thread_id: z.string().uuid().optional().nullable(),
})

export const updateMessageSchema = z.object({
  content: z.string().trim().min(1).max(8_000),
})

export const messageReactionSchema = z.object({
  emoji: z.string().trim().min(1).max(20),
})

export const createDmSchema = z.object({
  user_id: z.string().uuid(),
})

export const listMessagesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  before: z.string().datetime().optional(),
  view: z.enum(['top', 'flat']).optional(),
})

export type CreateChannelInput = z.infer<typeof createChannelSchema>
export type CreateMessageInput = z.infer<typeof createMessageSchema>
