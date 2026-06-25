export const TASK_REACTION_EMOJIS = [
  'like',
  'love',
  'wink',
  'happy',
  'surprised',
  'sad',
] as const

export type TaskReactionEmoji = (typeof TASK_REACTION_EMOJIS)[number]

export const REACTION_TARGET_TYPES = ['comment', 'activity'] as const
export type ReactionTargetType = (typeof REACTION_TARGET_TYPES)[number]

export const REACTION_LABELS: Record<TaskReactionEmoji, string> = {
  like: '👍',
  love: '❤️',
  wink: '😉',
  happy: '😊',
  surprised: '😮',
  sad: '😢',
}

export type ReactionToggleAction = 'create' | 'update' | 'delete'

export interface ReactionTogglePlan {
  action: ReactionToggleAction
  emoji: TaskReactionEmoji | null
}

/** Pure toggle logic: same emoji removes, different emoji replaces, none creates. */
export function planReactionToggle(
  currentEmoji: TaskReactionEmoji | null | undefined,
  nextEmoji: TaskReactionEmoji,
): ReactionTogglePlan {
  if (!currentEmoji) return { action: 'create', emoji: nextEmoji }
  if (currentEmoji === nextEmoji) return { action: 'delete', emoji: null }
  return { action: 'update', emoji: nextEmoji }
}

export interface ReactionRow {
  emoji: string
  user_id: string
}

export interface ReactionSummary {
  emoji: TaskReactionEmoji
  count: number
  userIds: string[]
  includesMe: boolean
}

export function summarizeReactions(
  rows: ReactionRow[],
  currentUserId: string | null,
): ReactionSummary[] {
  const map = new Map<TaskReactionEmoji, { count: number; userIds: string[] }>()

  for (const row of rows) {
    const emoji = row.emoji as TaskReactionEmoji
    if (!(TASK_REACTION_EMOJIS as readonly string[]).includes(emoji)) continue
    const entry = map.get(emoji) ?? { count: 0, userIds: [] }
    entry.count += 1
    entry.userIds.push(row.user_id)
    map.set(emoji, entry)
  }

  return TASK_REACTION_EMOJIS.filter((e) => map.has(e)).map((emoji) => {
    const { count, userIds } = map.get(emoji)!
    return {
      emoji,
      count,
      userIds,
      includesMe: currentUserId ? userIds.includes(currentUserId) : false,
    }
  })
}
