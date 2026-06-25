'use client'

import { cn } from '@/lib/utils'
import type { TaskAssignee } from './types'

function compactInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

function CompactAvatar({ user, size }: { user: TaskAssignee; size: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-5 w-5 text-[9px]' : 'h-6 w-6 text-[10px]'
  return (
    <span
      title={user.name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/20 font-bold text-primary ring-2 ring-brand-canvas',
        dim,
      )}
    >
      {user.avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.avatar_url} alt={user.name} className="h-full w-full object-cover" />
      ) : (
        compactInitials(user.name)
      )}
    </span>
  )
}

export function UserAvatarStack({
  users,
  max = 3,
  size = 'sm',
}: {
  users: TaskAssignee[]
  max?: number
  size?: 'sm' | 'md'
}) {
  if (users.length === 0) return null
  const visible = users.slice(0, max)
  const overflow = users.length - visible.length

  return (
    <div className="flex -space-x-1.5">
      {visible.map((user) => (
        <CompactAvatar key={user.id} user={user} size={size} />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            'flex items-center justify-center rounded-full bg-brand-whisper-border font-mono font-bold text-brand-text-muted ring-2 ring-brand-canvas',
            size === 'sm' ? 'h-5 w-5 text-[9px]' : 'h-6 w-6 text-[10px]',
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
