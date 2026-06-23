import { prisma } from '@/lib/db/prisma'

export interface CreateNotificationInput {
  userId: string
  type: string
  title: string
  body?: string
  href?: string
}

export async function createNotification(input: CreateNotificationInput) {
  return prisma.notifications.create({
    data: {
      user_id: input.userId,
      type: input.type,
      title: input.title,
      body: input.body ?? null,
      href: input.href ?? null,
    },
  })
}

export function serializeNotification(n: {
  id: string
  type: string
  title: string
  body: string | null
  href: string | null
  read: boolean
  created_at: Date
}) {
  return {
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    href: n.href,
    read: n.read,
    created_at: n.created_at.toISOString(),
  }
}
