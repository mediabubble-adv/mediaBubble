import type { PrismaClient } from '@prisma/client'
import { broadcastMessageCreated } from '@/lib/comms/realtime/broadcast'
import { messageInclude, serializeMessage } from '@/lib/comms/messages'
import type { TaskActivityType } from '@/lib/tasks/activity'
import { FEED_CARD_KIND, STUDIO_CHANNEL_NAME } from '@/lib/meet/constants'

type Db = PrismaClient

const FEED_ACTIVITY_TYPES = new Set<TaskActivityType>([
  'status_changed',
  'subtask_completed',
])

export function formatTaskFeedContent(
  type: string,
  payload: Record<string, unknown>,
  actorName: string,
): string {
  switch (type) {
    case 'status_changed':
      if (payload['to'] === 'Done') {
        return `${actorName} completed a task`
      }
      return `${actorName} moved a task to ${String(payload['to'] ?? '—')}`
    case 'subtask_completed':
      return `${actorName} completed subtask “${String(payload['title'] ?? '')}”`
    default:
      return `${actorName} updated a task`
  }
}

export async function resolveMeetBotUserId(db: Db): Promise<string | null> {
  const bot = await db.users.findFirst({
    where: { email: 'meet-bot@mediabubble.internal', deleted_at: null },
    select: { id: true },
  })
  return bot?.id ?? null
}

export async function resolveStudioChannelId(db: Db): Promise<string | null> {
  const channel = await db.channels.findFirst({
    where: { name: STUDIO_CHANNEL_NAME, type: 'Activity', archived_at: null },
    select: { id: true },
  })
  return channel?.id ?? null
}

export async function publishTaskActivityToMeet(
  db: Db,
  input: {
    activityType: TaskActivityType
    payload: Record<string, unknown>
    actorId: string
    actorName: string
    taskId: string
    taskTitle?: string
  },
): Promise<void> {
  if (!FEED_ACTIVITY_TYPES.has(input.activityType)) return

  const botId = await resolveMeetBotUserId(db)
  const channelId = await resolveStudioChannelId(db)
  if (!botId || !channelId) return

  if (input.activityType === 'status_changed' && input.payload['to'] !== 'Done') return

  const entityId = String(input.payload['subtask_id'] ?? input.taskId)

  let content = formatTaskFeedContent(input.activityType, input.payload, input.actorName)
  if (input.taskTitle) {
    content = `${content}: *${input.taskTitle}*`
  }

  const xpDelta = input.activityType === 'subtask_completed' ? 15 : undefined

  const row = await db.messages.create({
    data: {
      channel_id: channelId,
      user_id: botId,
      content,
      attachments: {
        kind: FEED_CARD_KIND,
        source: 'task',
        event_type: input.activityType,
        entity_id: entityId,
        href: `/tasks/${input.taskId}`,
        actor_id: input.actorId,
        ...(xpDelta !== undefined ? { xp_delta: xpDelta } : {}),
      },
    },
    include: messageInclude,
  })

  broadcastMessageCreated(serializeMessage(row))
}

async function hasAchievementFeedCard(
  db: Db,
  entityId: string,
): Promise<boolean> {
  const existing = await db.messages.findFirst({
    where: {
      attachments: {
        path: ['entity_id'],
        equals: entityId,
      },
    },
    select: { id: true },
  })
  return existing !== null
}

export async function publishAchievementToMeet(
  db: Db,
  input: {
    achievementId: string
    title: string
    actorId: string
    actorName: string
    href?: string
    xpDelta?: number
  },
): Promise<void> {
  const botId = await resolveMeetBotUserId(db)
  const channelId = await resolveStudioChannelId(db)
  if (!botId || !channelId) return

  const entityId = `achievement:${input.achievementId}:${input.actorId}`
  if (await hasAchievementFeedCard(db, entityId)) return

  const content = `${input.actorName} unlocked “${input.title}”`

  const row = await db.messages.create({
    data: {
      channel_id: channelId,
      user_id: botId,
      content,
      attachments: {
        kind: FEED_CARD_KIND,
        source: 'achievement',
        event_type: 'achievement_unlocked',
        entity_id: entityId,
        href: input.href ?? '/leaderboard',
        actor_id: input.actorId,
        ...(input.xpDelta !== undefined ? { xp_delta: input.xpDelta } : {}),
      },
    },
    include: messageInclude,
  })

  broadcastMessageCreated(serializeMessage(row))
}

export async function maybePublishFirstTaskAchievement(
  db: Db,
  actorId: string,
  actorName: string,
): Promise<void> {
  const completedCount = await db.tasks.count({
    where: {
      deleted_at: null,
      status: 'Done',
      assigned_to: actorId,
    },
  })
  if (completedCount !== 1) return

  await publishAchievementToMeet(db, {
    achievementId: 'first_task',
    title: 'First Flight',
    actorId,
    actorName,
    href: '/leaderboard',
    xpDelta: 150,
  })
}
