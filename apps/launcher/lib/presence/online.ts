import type { PrismaClient } from '@prisma/client'
import type { PresenceStatus, UserSettablePresence } from './constants'
import { ONLINE_WINDOW_MS } from './constants'

export function isOnline(lastSeen: Date | null | undefined, now = new Date()): boolean {
  if (!lastSeen) return false
  return now.getTime() - lastSeen.getTime() <= ONLINE_WINDOW_MS
}

export function resolvePresenceStatus(
  status: string | null | undefined,
  lastSeen: Date | null | undefined,
  now = new Date(),
): PresenceStatus {
  if (!isOnline(lastSeen, now)) return 'Offline'
  if (status === 'Away' || status === 'Busy') return status
  return 'Online'
}

function normalizePresenceStatus(
  status: string | null | undefined,
  lastSeen: Date | null | undefined,
  now: Date,
): PresenceStatus {
  return resolvePresenceStatus(status, lastSeen, now)
}

/** Heartbeat: refresh last_seen; preserve manual Away/Busy. */
export async function upsertPresence(db: PrismaClient, userId: string): Promise<void> {
  const now = new Date()
  const existing = await db.user_presence.findUnique({
    where: { user_id: userId },
    select: { status: true },
  })

  if (!existing) {
    await db.user_presence.create({
      data: {
        user_id: userId,
        status: 'Online',
        last_seen: now,
        updated_at: now,
      },
    })
    return
  }

  const preserveCustom = existing.status === 'Away' || existing.status === 'Busy'
  await db.user_presence.update({
    where: { user_id: userId },
    data: {
      last_seen: now,
      updated_at: now,
      ...(preserveCustom ? {} : { status: 'Online' }),
    },
  })
}

export async function setUserPresence(
  db: PrismaClient,
  userId: string,
  status: UserSettablePresence,
  statusMessage?: string | null,
): Promise<void> {
  const now = new Date()
  const message = status === 'Online' ? null : (statusMessage ?? null)

  await db.user_presence.upsert({
    where: { user_id: userId },
    create: {
      user_id: userId,
      status,
      status_message: message,
      last_seen: now,
      updated_at: now,
    },
    update: {
      status,
      status_message: message,
      last_seen: now,
      updated_at: now,
    },
  })
}

export interface PresenceSnapshot {
  status: PresenceStatus
  status_message: string | null
  last_seen: string | null
}

export async function getUserPresence(
  db: PrismaClient,
  userId: string,
  now = new Date(),
): Promise<PresenceSnapshot> {
  const row = await db.user_presence.findUnique({
    where: { user_id: userId },
    select: { status: true, status_message: true, last_seen: true },
  })

  if (!row) {
    return { status: 'Offline', status_message: null, last_seen: null }
  }

  return {
    status: normalizePresenceStatus(row.status, row.last_seen, now),
    status_message: row.status_message,
    last_seen: row.last_seen?.toISOString() ?? null,
  }
}

export interface OnlineUser {
  id: string
  name: string
  avatar_url: string | null
  role: string
  presence_status: PresenceStatus
  status_message: string | null
}

export async function listOnlineUsers(
  db: PrismaClient,
  options?: { excludeUserId?: string; now?: Date },
): Promise<OnlineUser[]> {
  const now = options?.now ?? new Date()
  const cutoff = new Date(now.getTime() - ONLINE_WINDOW_MS)

  const rows = await db.user_presence.findMany({
    where: {
      last_seen: { gte: cutoff },
      users: { status: 'active', deleted_at: null },
      ...(options?.excludeUserId ? { user_id: { not: options.excludeUserId } } : {}),
    },
    include: {
      users: {
        select: { id: true, name: true, avatar_url: true, role: true },
      },
    },
    orderBy: { users: { name: 'asc' } },
  })

  return rows.map((row) => ({
    id: row.users.id,
    name: row.users.name,
    avatar_url: row.users.avatar_url,
    role: row.users.role,
    presence_status: normalizePresenceStatus(row.status, row.last_seen, now),
    status_message: row.status_message,
  }))
}
