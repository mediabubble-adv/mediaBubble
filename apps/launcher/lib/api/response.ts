// Standardized API response envelope (matches the Phase 1 spec):
//   Success: { status, data, message }
//   Error:   { status, error, message, details? }

import { z } from 'zod'

export interface ApiSuccess<T> {
  status: number
  data: T
  message: string
}

export interface ApiError {
  status: number
  error: string
  message: string
  details?: unknown
}

export function ok<T>(data: T, message = 'Success', status = 200): ApiSuccess<T> {
  return { status, data, message }
}

export function fail(
  error: string,
  message: string,
  status = 400,
  details?: unknown,
): ApiError {
  return details === undefined
    ? { status, error, message }
    : { status, error, message, details }
}

/** Convert a Zod failure into a 400 validation error envelope. */
export function validationError(issues: z.ZodError): ApiError {
  return fail('validation_error', 'Invalid request body', 400, issues.flatten())
}
