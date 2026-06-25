'use client'

import { useCallback, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ProfileSocialLinks, UserAvatar } from '@/components/account/profile-form'
import { PresenceDot } from '@/components/presence/presence-status-picker'
import { Badge } from '@/components/ui/badge'
import { PRESENCE_STATUS_LABELS } from '@/lib/presence/constants'
import type { ProfileCardData } from '@/lib/profile/card'

const cardCache = new Map<string, ProfileCardData>()

const ROLE_TONE: Record<string, 'blue' | 'warning' | 'danger' | 'neutral'> = {
  Admin: 'danger',
  Manager: 'warning',
  Contributor: 'blue',
  Viewer: 'neutral',
}

export function AuthorHoverCard({
  userId,
  authorName,
  compact,
}: {
  userId: string
  authorName: string
  compact?: boolean
}) {
  const tooltipId = useId()
  const rootRef = useRef<HTMLSpanElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [card, setCard] = useState<ProfileCardData | null>(() => cardCache.get(userId) ?? null)

  const loadCard = useCallback(async () => {
    const cached = cardCache.get(userId)
    if (cached) {
      setCard(cached)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/profile/${userId}/card`)
      const json = await res.json()
      if (json.status === 200) {
        cardCache.set(userId, json.data)
        setCard(json.data)
      }
    } catch {
      // Hover preview is best-effort
    } finally {
      setLoading(false)
    }
  }, [userId])

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  function openCard() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
    void loadCard()
  }

  return (
    <span
      ref={rootRef}
      className="relative inline-flex"
      onMouseEnter={openCard}
      onMouseLeave={scheduleClose}
      onFocus={openCard}
      onBlur={scheduleClose}
    >
      <button
        type="button"
        className={`font-bold text-foreground underline-offset-2 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${compact ? 'text-[11px]' : 'text-[12px]'}`}
        aria-describedby={open ? tooltipId : undefined}
      >
        {authorName}
      </button>

      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-0 z-50 mb-2 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-border bg-card p-3 shadow-lg"
          onMouseEnter={openCard}
          onMouseLeave={scheduleClose}
        >
          {loading && !card ? (
            <p className="text-[11px] text-muted-foreground">Loading…</p>
          ) : card ? (
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="relative shrink-0">
                  <UserAvatar name={card.name} avatarUrl={card.avatar_url} size="sm" />
                  <PresenceDot status={card.presence_status} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-foreground">{card.name}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge tone={ROLE_TONE[card.role] ?? 'neutral'} className="text-[9px]">
                      {card.role}
                    </Badge>
                    {card.department ? (
                      <Badge tone="neutral" className="text-[9px]">
                        {card.department}
                      </Badge>
                    ) : null}
                  </div>
                  {card.presence_status !== 'Offline' ? (
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {PRESENCE_STATUS_LABELS[
                        card.presence_status === 'Away' || card.presence_status === 'Busy'
                          ? card.presence_status
                          : 'Online'
                      ]}
                      {card.status_message ? ` · ${card.status_message}` : ''}
                    </p>
                  ) : null}
                </div>
              </div>

              {card.bio ? (
                <p className="text-[11px] leading-relaxed text-muted-foreground">{card.bio}</p>
              ) : null}

              <ProfileSocialLinks
                variant="icons"
                linkedin_url={card.linkedin_url}
                instagram_url={card.instagram_url}
                behance_url={card.behance_url}
                website_url={card.website_url}
              />

              <Link
                href={`/profile/${card.id}`}
                className="inline-block text-[10px] font-semibold text-primary hover:underline"
              >
                View full profile →
              </Link>
            </div>
          ) : (
            <p className="text-[11px] text-muted-foreground">Profile unavailable</p>
          )}
        </span>
      ) : null}
    </span>
  )
}
