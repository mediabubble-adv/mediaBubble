import type { PresenceStatus } from '@/lib/presence/constants'

export interface ProfileCardData {
  id: string
  name: string
  avatar_url: string | null
  role: string
  department: string | null
  bio: string | null
  linkedin_url: string | null
  instagram_url: string | null
  behance_url: string | null
  website_url: string | null
  presence_status: PresenceStatus
  status_message: string | null
}

export const PROFILE_CARD_SELECT = {
  id: true,
  name: true,
  avatar_url: true,
  role: true,
  bio: true,
  linkedin_url: true,
  instagram_url: true,
  behance_url: true,
  website_url: true,
  departments_users_department_idTodepartments: { select: { name: true } },
  user_presence: { select: { status: true, status_message: true, last_seen: true } },
} as const

export function bioPreview(bio: string | null, max = 120): string | null {
  if (!bio?.trim()) return null
  const trimmed = bio.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max - 1)}…`
}
