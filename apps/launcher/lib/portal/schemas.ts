// Zod request schemas for Client Portal endpoints.

import { z } from 'zod'

export const createPortalLinkSchema = z.object({
  client_id: z.string().uuid(),
  email: z.string().trim().email().max(255),
})

export const verifyPortalTokenSchema = z.object({
  token: z.string().trim().min(16).max(512),
})

export type CreatePortalLinkInput = z.infer<typeof createPortalLinkSchema>
export type VerifyPortalTokenInput = z.infer<typeof verifyPortalTokenSchema>
