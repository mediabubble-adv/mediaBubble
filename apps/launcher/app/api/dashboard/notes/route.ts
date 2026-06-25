// GET /api/dashboard/notes — list current user's dashboard notes
// POST /api/dashboard/notes — create a note (with @mentions)

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { parseMentionedUserIds } from '@/lib/dashboard/mentions'
import { createNotification } from '@/lib/notifications'

export const runtime = 'nodejs'

const createSchema = z.object({
  content: z.string().trim().min(1).max(4000),
})

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const notes = await prisma.dashboard_notes.findMany({
    where: { user_id: me.id },
    orderBy: { created_at: 'desc' },
    take: 30,
    select: { id: true, content: true, created_at: true, updated_at: true },
  })

  return toResponse(
    ok(
      notes.map((n) => ({
        id: n.id,
        content: n.content,
        created_at: n.created_at.toISOString(),
        updated_at: n.updated_at.toISOString(),
      })),
      'Dashboard notes retrieved',
    ),
  )
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const members = await prisma.users.findMany({
    where: { status: 'active', deleted_at: null },
    select: { id: true, name: true },
  })

  const mentionedIds = parseMentionedUserIds(parsed.data.content, members)

  const note = await prisma.dashboard_notes.create({
    data: {
      user_id: me.id,
      content: parsed.data.content,
    },
    select: { id: true, content: true, created_at: true, updated_at: true },
  })

  if (mentionedIds.length > 0) {
    const author = members.find((m) => m.id === me.id)
    await prisma.mentions.createMany({
      data: mentionedIds.map((userId) => ({
        mentioned_user_id: userId,
        mentioned_by: me.id,
        entity_type: 'dashboard_note',
        entity_id: note.id,
        context: parsed.data.content.slice(0, 500),
      })),
    })

    await Promise.all(
      mentionedIds.map((userId) =>
        createNotification({
          userId,
          type: 'mention',
          title: `${author?.name ?? 'Someone'} mentioned you in a note`,
          body: parsed.data.content.slice(0, 120),
          href: '/',
        }),
      ),
    )
  }

  return toResponse(
    ok(
      {
        id: note.id,
        content: note.content,
        created_at: note.created_at.toISOString(),
        updated_at: note.updated_at.toISOString(),
      },
      'Note created',
      201,
    ),
  )
}
