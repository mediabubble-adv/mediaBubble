// Message row helpers for Meet / Communication Hub API responses.

import type { Prisma } from '@prisma/client'
import type { messages, users } from '@prisma/client'

export interface FeedCardAttachment {
  kind: 'feed_card'
  source: string
  event_type: string
  entity_id?: string
  href?: string
  actor_id?: string
  xp_delta?: number
}

export interface MessageRow {
  id: string
  channel_id: string
  user_id: string
  author_name: string
  content: string
  thread_id: string | null
  attachments: Prisma.JsonValue | null
  reactions: Record<string, string[]> | null
  edited_at: string | null
  created_at: string
}

type MessageWithAuthor = messages & {
  users: Pick<users, 'name'>
}

export function parseReactions(raw: Prisma.JsonValue | null): Record<string, string[]> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  return raw as Record<string, string[]>
}

export function serializeMessage(row: MessageWithAuthor): MessageRow {
  return {
    id: row.id,
    channel_id: row.channel_id,
    user_id: row.user_id,
    author_name: row.users.name,
    content: row.content,
    thread_id: row.thread_id,
    attachments: row.attachments,
    reactions: parseReactions(row.reactions),
    edited_at: row.edited_at?.toISOString() ?? null,
    created_at: row.created_at.toISOString(),
  }
}

export const messageInclude = {
  users: { select: { name: true } },
} as const

export function isFeedCardMessage(row: MessageRow): row is MessageRow & {
  attachments: FeedCardAttachment
} {
  const att = row.attachments
  if (!att || typeof att !== 'object' || Array.isArray(att)) return false
  return (att as unknown as FeedCardAttachment).kind === 'feed_card'
}
