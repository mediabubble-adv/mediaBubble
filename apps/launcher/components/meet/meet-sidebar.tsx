'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { isActivityChannel, isDmChannel } from '@/lib/meet/dm'
import {
  MEET_SECTION_ACTIVITY,
  MEET_SECTION_DMS,
  MEET_SECTION_ONLINE,
  STUDIO_CHANNEL_NAME,
} from '@/lib/meet/constants'
import { UserAvatar } from '@/components/account/profile-form'
import { PresenceDot } from '@/components/presence/presence-status-picker'
import type { PresenceStatus } from '@/lib/presence/constants'
import { useMeet } from './meet-provider'

interface DmMember {
  id: string
  name: string
  email: string
  online: boolean
}

interface OnlineUser {
  id: string
  name: string
  avatar_url: string | null
  role: string
  presence_status: PresenceStatus
  status_message: string | null
}

export function MeetSidebar({ variant }: { variant: 'embedded' | 'page' }) {
  const { channels, selectedId, selectChannel, refreshChannels, currentUserId } = useMeet()

  const [showDmPicker, setShowDmPicker] = useState(false)
  const [dmUserId, setDmUserId] = useState('')
  const [dmMembers, setDmMembers] = useState<DmMember[]>([])
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [busy, setBusy] = useState(false)

  const activityChannel = useMemo(
    () => channels.find((c) => c.name === STUDIO_CHANNEL_NAME && isActivityChannel(c.type)),
    [channels],
  )

  const publicChannels = useMemo(
    () =>
      channels
        .filter((c) => !isDmChannel(c.type) && !isActivityChannel(c.type))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [channels],
  )

  const dmChannels = useMemo(
    () => channels.filter((c) => isDmChannel(c.type)).sort((a, b) => a.name.localeCompare(b.name)),
    [channels],
  )

  const loadDmMembers = useCallback(async () => {
    const res = await fetch('/api/meet/members')
    const json = await res.json()
    if (json.status === 200) setDmMembers(json.data)
  }, [])

  const loadOnline = useCallback(async () => {
    const res = await fetch('/api/presence/online')
    const json = await res.json()
    if (json.status === 200) setOnlineUsers(json.data)
  }, [])

  useEffect(() => {
    void loadOnline()
    const id = window.setInterval(() => void loadOnline(), 60_000)
    return () => window.clearInterval(id)
  }, [loadOnline])

  useEffect(() => {
    if (showDmPicker && dmMembers.length === 0) void loadDmMembers()
  }, [showDmPicker, dmMembers.length, loadDmMembers])

  async function startDm(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!dmUserId.trim()) return
    setBusy(true)
    const res = await fetch('/api/meet/dm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: dmUserId.trim() }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 200 && json.status !== 201) return
    await refreshChannels()
    await selectChannel(json.data.id)
    setDmUserId('')
    setShowDmPicker(false)
  }

  async function openDmWithUser(userId: string): Promise<void> {
    setBusy(true)
    const res = await fetch('/api/meet/dm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 200 && json.status !== 201) return
    await refreshChannels()
    await selectChannel(json.data.id)
  }

  const asideClass =
    variant === 'page'
      ? 'flex min-h-[32rem] flex-col rounded-2xl border border-border bg-card p-3'
      : 'flex min-h-0 w-full shrink-0 flex-col border-b border-border lg:w-[200px] lg:border-b-0 lg:border-e xl:w-[220px]'

  return (
    <aside className={asideClass}>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
        {/* Channels */}
        <section>
          {activityChannel ? (
            <div className="mb-1">
              <p className="px-2 pb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {MEET_SECTION_ACTIVITY}
              </p>
              <ChannelButton
                name={activityChannel.name}
                selected={selectedId === activityChannel.id}
                onClick={() => void selectChannel(activityChannel.id)}
              />
            </div>
          ) : null}

          {publicChannels.length > 0 ? (
            <div className="space-y-0.5">
              {publicChannels.map((channel) => (
                <ChannelButton
                  key={channel.id}
                  name={channel.name}
                  selected={selectedId === channel.id}
                  onClick={() => void selectChannel(channel.id)}
                />
              ))}
            </div>
          ) : !activityChannel ? (
            <p className="px-2 py-2 text-center text-[11px] text-muted-foreground">No channels yet.</p>
          ) : null}
        </section>

        <div className="border-t border-border" />

        {/* DMs */}
        <section>
          <div className="mb-1 flex items-center justify-between px-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {MEET_SECTION_DMS}
            </p>
            <button
              type="button"
              onClick={() => setShowDmPicker((v) => !v)}
              className="rounded p-0.5 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              aria-label="Start direct message"
            >
              <Plus size={14} />
            </button>
          </div>

          {showDmPicker ? (
            <form onSubmit={startDm} className="mb-2 flex flex-col gap-1 px-1">
              <select
                value={dmUserId}
                onChange={(e) => setDmUserId(e.target.value)}
                className="w-full rounded border border-border bg-background px-2 py-1 text-[11px]"
              >
                <option value="">Pick a teammate…</option>
                {[...dmMembers]
                  .sort((a, b) => Number(b.online) - Number(a.online) || a.name.localeCompare(b.name))
                  .map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.online ? '● ' : ''}
                      {member.name}
                    </option>
                  ))}
              </select>
              <button
                type="submit"
                disabled={!dmUserId || busy}
                className="rounded bg-primary px-2 py-1 text-[10px] font-bold text-white disabled:opacity-50"
              >
                Start DM
              </button>
            </form>
          ) : null}

          <div className="space-y-0.5">
            {dmChannels.length === 0 ? (
              <p className="px-2 py-2 text-center text-[11px] text-muted-foreground">No DMs yet.</p>
            ) : (
              dmChannels.map((channel) => (
                <ChannelButton
                  key={channel.id}
                  name={channel.name}
                  selected={selectedId === channel.id}
                  onClick={() => void selectChannel(channel.id)}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {/* Online now */}
      <footer className="mt-2 shrink-0 border-t border-border pt-3">
        <p className="mb-1.5 px-2 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {MEET_SECTION_ONLINE} ({onlineUsers.length})
        </p>
        <div className="max-h-32 space-y-0.5 overflow-y-auto">
          {onlineUsers.length === 0 ? (
            <p className="px-2 py-1 text-[11px] text-muted-foreground">No one online</p>
          ) : (
            onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-1 rounded-lg px-1 py-0.5 hover:bg-muted/40">
                <button
                  type="button"
                  disabled={busy || user.id === currentUserId}
                  onClick={() => void openDmWithUser(user.id)}
                  title={user.status_message ?? undefined}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1 py-1 text-left text-[12px] text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <span className="relative shrink-0">
                    <UserAvatar name={user.name} avatarUrl={user.avatar_url} size="sm" />
                    <PresenceDot status={user.presence_status} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{user.name}</span>
                    {user.status_message ? (
                      <span className="block truncate text-[10px] text-muted-foreground">
                        {user.status_message}
                      </span>
                    ) : null}
                  </span>
                </button>
                <Link
                  href={`/profile/${user.id}`}
                  className="shrink-0 rounded px-1.5 py-1 text-[10px] font-semibold text-primary hover:underline"
                  title="View profile"
                >
                  Profile
                </Link>
              </div>
            ))
          )}
        </div>
      </footer>
    </aside>
  )
}

function ChannelButton({
  name,
  selected,
  onClick,
}: {
  name: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] ${
        selected ? 'bg-primary/15 text-foreground' : 'text-muted-foreground hover:bg-muted/40'
      }`}
    >
      <span className="truncate font-semibold">{name}</span>
    </button>
  )
}
