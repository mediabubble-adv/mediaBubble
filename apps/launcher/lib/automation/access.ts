// Workflow visibility helpers for Automation routes.

import type { workflows } from '@prisma/client'
import type { Role } from '@/lib/auth/rbac'
import { hasAtLeast } from '@/lib/auth/rbac'

export function canReadWorkflow(workflow: workflows, userId: string, role: Role): boolean {
  if (workflow.created_by === userId) return true
  return hasAtLeast(role, 'Manager')
}

export function canManageWorkflow(workflow: workflows, userId: string, role: Role): boolean {
  if (workflow.created_by === userId) return true
  return hasAtLeast(role, 'Manager')
}

export function workflowListWhere(userId: string, role: Role) {
  if (hasAtLeast(role, 'Manager')) return {}
  return { created_by: userId }
}
