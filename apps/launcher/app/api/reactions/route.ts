// POST /api/reactions — toggle or set a reaction on a comment or activity item.

import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { reactionSchema } from '@/lib/tasks/schemas'
import { planReactionToggle, type TaskReactionEmoji } from '@/lib/tasks/reactions'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'

async function targetExists(
  target_type: 'comment' | 'activity',
  target_id: string,
): Promise<boolean> {
  if (target_type === 'comment') {
    const row = await prisma.task_comments.findFirst({ where: { id: target_id } })
    return !!row
  }
  const row = await prisma.task_activity.findFirst({ where: { id: target_id } })
  return !!row
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) {
    return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))
  }
  const parsed = reactionSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  const { target_type, target_id, emoji } = parsed.data
  if (!(await targetExists(target_type, target_id))) {
    return toResponse(fail('not_found', 'Reaction target not found', 404))
  }

  const existing = await prisma.task_reactions.findUnique({
    where: {
      target_type_target_id_user_id: {
        target_type,
        target_id,
        user_id: me.id,
      },
    },
  })

  const plan = planReactionToggle(existing?.emoji as TaskReactionEmoji | undefined, emoji)

  if (plan.action === 'delete') {
    await prisma.task_reactions.delete({
      where: {
        target_type_target_id_user_id: {
          target_type,
          target_id,
          user_id: me.id,
        },
      },
    })
    return toResponse(ok({ emoji: null }, 'Reaction removed'))
  }

  if (plan.action === 'create') {
    const row = await prisma.task_reactions.create({
      data: { target_type, target_id, user_id: me.id, emoji },
    })
    return toResponse(ok(row, 'Reaction added', 201))
  }

  const row = await prisma.task_reactions.update({
    where: {
      target_type_target_id_user_id: {
        target_type,
        target_id,
        user_id: me.id,
      },
    },
    data: { emoji },
  })
  return toResponse(ok(row, 'Reaction updated'))
}
