/** Users with last_seen within this window are considered active in Launcher. */
export const ONLINE_WINDOW_MS = 5 * 60 * 1000

export const PRESENCE_STATUSES = ['Online', 'Away', 'Busy', 'Offline'] as const
export type PresenceStatus = (typeof PRESENCE_STATUSES)[number]

/** Statuses a user can set manually from profile. */
export const USER_SETTABLE_PRESENCE = ['Online', 'Away', 'Busy'] as const
export type UserSettablePresence = (typeof USER_SETTABLE_PRESENCE)[number]

export const PRESENCE_STATUS_LABELS: Record<UserSettablePresence, string> = {
  Online: 'Available',
  Away: 'Away',
  Busy: 'Busy',
}

export const PRESENCE_DOT_CLASS: Record<PresenceStatus, string> = {
  Online: 'bg-emerald-500',
  Away: 'bg-amber-400',
  Busy: 'bg-red-500',
  Offline: 'bg-muted-foreground/50',
}
