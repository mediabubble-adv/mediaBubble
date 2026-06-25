// Channel visibility for Meet / Communication Hub routes.

import type { channels } from '@prisma/client'
import type { Role } from '@/lib/auth/rbac'
import { hasAtLeast } from '@/lib/auth/rbac'
import { isActivityChannel, isDmChannel } from '@/lib/meet/dm'

export function isChannelMember(channel: channels, userId: string): boolean {
  return channel.created_by === userId || channel.members.includes(userId)
}

export function canAccessChannel(channel: channels, userId: string, role: Role): boolean {
  if (channel.archived_at) return false
  if (hasAtLeast(role, 'Manager')) return true
  if (isActivityChannel(channel.type)) return true
  if (channel.type === 'Public') return true
  if (isDmChannel(channel.type)) return isChannelMember(channel, userId)
  return isChannelMember(channel, userId)
}

export function canManageChannel(channel: channels, userId: string, role: Role): boolean {
  if (channel.archived_at) return false
  if (isActivityChannel(channel.type)) return false
  if (isDmChannel(channel.type)) return false
  if (channel.created_by === userId) return true
  return hasAtLeast(role, 'Manager')
}

export function canCreateChannelType(type: string, role: Role): boolean {
  if (isDmChannel(type) || isActivityChannel(type)) return false
  return hasAtLeast(role, 'Manager')
}

export function channelListWhere(userId: string, role: Role) {
  if (hasAtLeast(role, 'Manager')) {
    return { archived_at: null }
  }
  return {
    archived_at: null,
    OR: [
      { type: 'Public' },
      { type: 'Activity' },
      { created_by: userId },
      { members: { has: userId } },
    ],
  }
}

export function uniqueMemberIds(creatorId: string, memberIds: string[] | undefined): string[] {
  const set = new Set<string>([creatorId, ...(memberIds ?? [])])
  return [...set]
}
