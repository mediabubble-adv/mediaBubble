// Channel row helpers for Communication Hub API responses.

import type { channels } from '@prisma/client'

export interface ChannelRow {
  id: string
  name: string
  description: string | null
  type: string | null
  dm_key: string | null
  created_by: string
  members: string[]
  created_at: string
  archived_at: string | null
  message_count?: number
}

export function serializeChannel(row: channels, messageCount?: number): ChannelRow {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    type: row.type,
    dm_key: row.dm_key,
    created_by: row.created_by,
    members: row.members,
    created_at: row.created_at.toISOString(),
    archived_at: row.archived_at?.toISOString() ?? null,
    ...(messageCount !== undefined ? { message_count: messageCount } : {}),
  }
}
