// Zod request schemas for AI prompt endpoints.

import { z } from 'zod'

export const PROMPT_STATUSES = ['Draft', 'Active', 'Archived'] as const
export const PROMPT_CATEGORIES = ['content', 'seo', 'sales', 'ops', 'other'] as const

const variableDefSchema = z.object({
  name: z.string().trim().min(1).max(100),
  label: z.string().trim().max(100).optional(),
  default: z.string().max(500).optional(),
})

export const createPromptSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().max(2_000).optional().nullable(),
  category: z.enum(PROMPT_CATEGORIES).optional(),
  template: z.string().trim().min(1).max(20_000),
  variables: z.array(variableDefSchema).max(20).optional(),
  is_public: z.boolean().optional(),
  status: z.enum(PROMPT_STATUSES).optional(),
})

export const updatePromptSchema = createPromptSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listPromptsQuerySchema = z.object({
  category: z.enum(PROMPT_CATEGORIES).optional(),
  status: z.enum(PROMPT_STATUSES).optional(),
  q: z.string().trim().max(100).optional(),
})

export const runPromptSchema = z.object({
  variables: z.record(z.string(), z.string().max(2_000)).optional(),
})

export type CreatePromptInput = z.infer<typeof createPromptSchema>
export type UpdatePromptInput = z.infer<typeof updatePromptSchema>
export type RunPromptInput = z.infer<typeof runPromptSchema>
