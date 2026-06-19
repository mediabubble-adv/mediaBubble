// Role-based access control. Roles mirror the users.role values in the
// canonical schema (default 'Contributor'), ordered by privilege.

export const ROLES = ['Viewer', 'Contributor', 'Manager', 'Admin'] as const
export type Role = (typeof ROLES)[number]

const RANK: Record<Role, number> = {
  Viewer: 0,
  Contributor: 1,
  Manager: 2,
  Admin: 3,
}

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value)
}

/** True if `role` is at least as privileged as `minimum`. */
export function hasAtLeast(role: Role, minimum: Role): boolean {
  return RANK[role] >= RANK[minimum]
}

export const isAdmin = (role: Role): boolean => role === 'Admin'
