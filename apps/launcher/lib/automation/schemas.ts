// Zod request schemas for Workflow Automation endpoints.

import { z } from 'zod'
import { ACTION_TYPES, TRIGGER_TYPES } from './catalog'

const triggerSchema = z.object({
  type: z.enum(TRIGGER_TYPES),
  conditions: z.record(z.string(), z.string()).optional(),
})

const stepSchema = z.object({
  action: z.enum(ACTION_TYPES),
  params: z.record(z.string(), z.unknown()).optional().default({}),
})

export const createWorkflowSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().max(2_000).optional().nullable(),
  trigger: triggerSchema,
  steps: z.array(stepSchema).min(1).max(20),
  enabled: z.boolean().optional(),
})

export const updateWorkflowSchema = createWorkflowSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listWorkflowsQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  enabled: z.enum(['true', 'false']).optional(),
})

export const testWorkflowSchema = z.object({
  trigger_data: z.record(z.string(), z.unknown()).optional(),
})

export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>
export type TestWorkflowInput = z.infer<typeof testWorkflowSchema>
export type WorkflowStepInput = z.infer<typeof stepSchema>
export type WorkflowTriggerInput = z.infer<typeof triggerSchema>
