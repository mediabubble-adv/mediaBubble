// Zod request schemas for Campaign & Proposal endpoints.

import { z } from 'zod'
import { CURRENCIES } from '@/lib/crm/schemas'

export const MARKETS = ['eg', 'ae', 'both'] as const
export const CAMPAIGN_STATUSES = ['Planning', 'Active', 'Paused', 'Completed', 'Archived'] as const
export const PROPOSAL_STATUSES = ['Draft', 'Sent', 'Won', 'Lost', 'Archived'] as const
export const SERVICE_CHANNELS = ['seo', 'ppc', 'social', 'branding', 'web'] as const

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')

const deliverableSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().max(2_000).optional(),
})

export const createProposalSchema = z.object({
  client_id: z.string().uuid(),
  title: z.string().trim().min(1).max(255),
  summary: z.string().trim().max(4_000).optional().nullable(),
  objectives: z.array(z.string().trim().min(1).max(500)).max(20).optional(),
  deliverables: z.array(deliverableSchema).max(30).optional(),
  timeline_weeks: z.coerce.number().int().min(1).max(104).optional().nullable(),
  budget_estimate: z.coerce.number().nonnegative().max(999_999_999).optional().nullable(),
  currency: z.enum(CURRENCIES).optional(),
  status: z.enum(PROPOSAL_STATUSES).optional(),
})

export const updateProposalSchema = createProposalSchema
  .omit({ client_id: true })
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const createCampaignSchema = z.object({
  client_id: z.string().uuid(),
  name: z.string().trim().min(1).max(255),
  brief: z.string().trim().max(4_000).optional().nullable(),
  market: z.enum(MARKETS).optional(),
  channels: z.array(z.enum(SERVICE_CHANNELS)).max(10).optional(),
  budget: z.coerce.number().nonnegative().max(999_999_999).optional().nullable(),
  currency: z.enum(CURRENCIES).optional(),
  start_date: isoDate.optional().nullable(),
  end_date: isoDate.optional().nullable(),
  status: z.enum(CAMPAIGN_STATUSES).optional(),
  proposal_id: z.string().uuid().optional().nullable(),
})

export const updateCampaignSchema = createCampaignSchema
  .omit({ client_id: true })
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one field is required' })

export const listProposalsQuerySchema = z.object({
  client_id: z.string().uuid().optional(),
  status: z.enum(PROPOSAL_STATUSES).optional(),
  q: z.string().trim().max(100).optional(),
})

export const listCampaignsQuerySchema = z.object({
  client_id: z.string().uuid().optional(),
  status: z.enum(CAMPAIGN_STATUSES).optional(),
  q: z.string().trim().max(100).optional(),
})

export type CreateProposalInput = z.infer<typeof createProposalSchema>
export type UpdateProposalInput = z.infer<typeof updateProposalSchema>
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>
export type ProposalDeliverable = z.infer<typeof deliverableSchema>
