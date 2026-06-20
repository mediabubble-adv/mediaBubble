// Message row helpers for Communication Hub API responses.

import type { messages, users } from '@prisma/client'

export interface MessageRow {
  id: string
  channel_id: string
  user_id: string
  author_name: string
  content: string
  thread_id: string | null
  edited_at: string | null
  created_at: string
}

type MessageWithAuthor = messages & {
  users: Pick<users, 'name'>
}

export function serializeMessage(row: MessageWithAuthor): MessageRow {
  return {
    id: row.id,
    channel_id: row.channel_id,
    user_id: row.user_id,
    author_name: row.users.name,
    content: row.content,
    thread_id: row.thread_id,
    edited_at: row.edited_at?.toISOString() ?? null,
    created_at: row.created_at.toISOString(),
  }
}

export const messageInclude = {
  users: { select: { name: true } },
} as const
