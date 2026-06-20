// Prompt visibility helpers for AI routes.

import type { prompts } from '@prisma/client'
import type { Role } from '@/lib/auth/rbac'
import { hasAtLeast } from '@/lib/auth/rbac'

export function canReadPrompt(prompt: prompts, userId: string, role: Role): boolean {
  if (prompt.created_by === userId) return true
  if (prompt.is_public) return true
  return hasAtLeast(role, 'Manager')
}

export function canManagePrompt(prompt: prompts, userId: string, role: Role): boolean {
  if (prompt.created_by === userId) return true
  return hasAtLeast(role, 'Manager')
}

export function promptListWhere(userId: string, role: Role) {
  if (hasAtLeast(role, 'Manager')) return {}
  return {
    OR: [{ created_by: userId }, { is_public: true }],
  }
}
