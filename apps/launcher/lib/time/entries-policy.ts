// RBAC rules for time entry submit / review workflows.

import { hasAtLeast, type Role } from '@/lib/auth/rbac'
import type { TIME_ENTRY_STATUSES } from './schemas'

type Status = (typeof TIME_ENTRY_STATUSES)[number]

export function canEditOwnEntry(status: string | null): boolean {
  return status === 'Draft' || status === 'Rejected'
}

export function canDeleteOwnEntry(status: string | null): boolean {
  return status === 'Draft'
}

export function canSubmitEntry(status: string | null, ownerId: string, actorId: string): boolean {
  return ownerId === actorId && (status === 'Draft' || status === 'Rejected')
}

export function canReviewEntry(
  status: string | null,
  ownerId: string,
  actorId: string,
  role: Role,
): boolean {
  return hasAtLeast(role, 'Manager') && ownerId !== actorId && status === 'Submitted'
}

export function isValidStatus(value: unknown): value is Status {
  return value === 'Draft' || value === 'Submitted' || value === 'Approved' || value === 'Rejected'
}
