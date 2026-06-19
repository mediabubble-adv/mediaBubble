// Zod request schemas for the auth endpoints (Phase 1 Week 2). Endpoints parse
// untrusted input with these before any business logic runs.

import { z } from 'zod'

const email = z.string().trim().toLowerCase().email()
const password = z.string().min(8, 'Password must be at least 8 characters').max(128)

export const signupSchema = z.object({
  email,
  password,
  name: z.string().trim().min(1).max(255),
})

export const loginSchema = z.object({
  email,
  password: z.string().min(1),
})

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
})

export const requestPasswordResetSchema = z.object({
  email,
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password,
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
