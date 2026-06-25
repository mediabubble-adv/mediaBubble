'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { ChannelRow } from '@/lib/comms/channels'
import type { MessageRow } from '@/lib/comms/messages'
import { isFeedCardMessage } from '@/lib/comms/messages'
import type { CommsEvent } from '@/lib/comms/realtime/events'
import { useCommsRealtime } from '@/lib/comms/realtime/use-comms-realtime'
import { USER_CHANNEL_TYPES } from '@/lib/comms/schemas'
import { MeetSidebar } from './meet-sidebar'
import { AuthorHoverCard } from './author-hover-card'

const REACTION_EMOJIS = ['👍', '🔥', '✅'] as const

const MEET_RAIL_KEY = 'mb_meet_rail_open'

export interface MeetContextValue {
  channels: ChannelRow[]
  selectedId: string | null
  selectedChannel: ChannelRow | null
  messages: MessageRow[]
  selectChannel: (id: string) => Promise<void>
  refreshChannels: () => Promise<void>
  appendMessage: (message: MessageRow) => void
  updateMessage: (message: MessageRow) => void
  railOpen: boolean
  setRailOpen: (open: boolean) => void
  liveStatus: string
  currentUserId: string
  isManager: boolean
}

const MeetContext = createContext<MeetContextValue | null>(null)

export function useMeet(): MeetContextValue {
  const ctx = useContext(MeetContext)
  if (!ctx) throw new Error('useMeet must be used within MeetProvider')
  return ctx
}

export function MeetProvider({
  currentUserId,
  isManager,
  children,
}: {
  currentUserId: string
  isManager: boolean
  children: ReactNode
}) {
  const [channels, setChannels] = useState<ChannelRow[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<MessageRow[]>([])
  const [railOpen, setRailOpenState] = useState(true)

  useEffect(() => {
    setRailOpenState(localStorage.getItem(MEET_RAIL_KEY) !== '0')
  }, [])

  const setRailOpen = useCallback((open: boolean) => {
    setRailOpenState(open)
    localStorage.setItem(MEET_RAIL_KEY, open ? '1' : '0')
  }, [])

  const selectedChannel = useMemo(
    () => channels.find((c) => c.id === selectedId) ?? null,
    [channels, selectedId],
  )

  const refreshChannels = useCallback(async () => {
    const res = await fetch('/api/comms/channels')
    const json = await res.json()
    if (json.status === 200) setChannels(json.data)
  }, [])

  const loadMessages = useCallback(async (channelId: string) => {
    const res = await fetch(`/api/comms/channels/${channelId}/messages?view=flat&limit=100`)
    const json = await res.json()
    if (json.status === 200) setMessages(json.data)
  }, [])

  const selectChannel = useCallback(
    async (id: string) => {
      setSelectedId(id)
      await loadMessages(id)
    },
    [loadMessages],
  )

  useEffect(() => {
    void refreshChannels()
  }, [refreshChannels])

  const applyRealtimeEvent = useCallback(
    (event: CommsEvent) => {
      switch (event.type) {
        case 'channel.created':
          setChannels((prev) => {
            if (prev.some((c) => c.id === event.channel.id)) return prev
            return [...prev, event.channel].sort((a, b) => a.name.localeCompare(b.name))
          })
          return
        case 'message.created':
          if (event.channel_id === selectedId) {
            setMessages((prev) =>
              prev.some((m) => m.id === event.message.id) ? prev : [...prev, event.message],
            )
          }
          return
        case 'message.updated':
          if (event.channel_id === selectedId) {
            setMessages((prev) =>
              prev.map((m) => (m.id === event.message.id ? event.message : m)),
            )
          }
          return
        case 'message.deleted':
          if (event.channel_id === selectedId) {
            setMessages((prev) => prev.filter((m) => m.id !== event.message_id))
          }
          return
        default: {
          const _exhaustive: never = event
          void _exhaustive
        }
      }
    },
    [selectedId],
  )

  const { status: liveStatus } = useCommsRealtime({
    channelId: selectedId,
    onEvent: applyRealtimeEvent,
  })

  const appendMessage = useCallback((message: MessageRow) => {
    setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]))
  }, [])

  const updateMessage = useCallback((message: MessageRow) => {
    setMessages((prev) => prev.map((m) => (m.id === message.id ? message : m)))
  }, [])

  const value: MeetContextValue = {
    channels,
    selectedId,
    selectedChannel,
    messages,
    selectChannel,
    refreshChannels,
    appendMessage,
    updateMessage,
    railOpen,
    setRailOpen,
    liveStatus,
    currentUserId,
    isManager,
  }

  return <MeetContext.Provider value={value}>{children}</MeetContext.Provider>
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function MeetPanel({
  variant,
  onMessagePosted,
}: {
  variant: 'embedded' | 'page'
  onMessagePosted?: () => void
}) {
  const {
    selectedId,
    selectedChannel,
    messages,
    selectChannel,
    refreshChannels,
    liveStatus,
    currentUserId,
    isManager,
    appendMessage,
    updateMessage,
  } = useMeet()

  const [draft, setDraft] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages])

  async function createChannel(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!isManager) return
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/comms/channels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        description: fd.get('description') || null,
        type: fd.get('type') || 'Public',
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create channel')
      return
    }
    await refreshChannels()
    await selectChannel(json.data.id)
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function sendMessage(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!selectedId || !draft.trim()) return
    setBusy(true)
    setError(null)
    const content = draft.trim()
    const res = await fetch(`/api/comms/channels/${selectedId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, thread_id: replyTo }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not send message')
      return
    }
    appendMessage(json.data)
    setDraft('')
    setReplyTo(null)
    onMessagePosted?.()
  }

  async function toggleReaction(messageId: string, emoji: string): Promise<void> {
    const res = await fetch(`/api/comms/messages/${messageId}/reactions`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji }),
    })
    const json = await res.json()
    if (json.status === 200) {
      updateMessage(json.data)
    }
  }

  const liveLabel =
    liveStatus === 'live' ? 'Live' : liveStatus === 'polling' ? 'SSE' : liveStatus === 'connecting' ? '…' : 'Off'

  const panel = (
    <div
      className={
        variant === 'page'
          ? 'mt-6 grid min-h-[32rem] gap-4 xl:grid-cols-[minmax(240px,280px)_minmax(0,1fr)]'
          : 'flex h-full min-h-0 flex-col lg:flex-row'
      }
    >
      <MeetSidebar variant={variant} />

      <section className={`flex min-h-0 min-w-0 flex-1 flex-col ${variant === 'page' ? 'rounded-2xl border border-border bg-card' : ''}`}>
        {!selectedChannel ? (
          <div className="flex flex-1 items-center justify-center p-6 text-[12px] text-muted-foreground">
            Pick a channel
          </div>
        ) : (
          <>
            <header className="flex items-center justify-between border-b border-border px-3 py-2">
              <p className="truncate text-[13px] font-bold">{selectedChannel.name}</p>
              <span className="shrink-0 text-[10px] font-bold uppercase text-muted-foreground">{liveLabel}</span>
            </header>

            <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-3">
              {messages
                .filter((m) => !m.thread_id)
                .map((msg) => (
                  <div key={msg.id}>
                    <MessageBubble
                      msg={msg}
                      currentUserId={currentUserId}
                      onReact={(emoji) => void toggleReaction(msg.id, emoji)}
                      onReply={() => setReplyTo(msg.id)}
                    />
                    {messages
                      .filter((r) => r.thread_id === msg.id)
                      .map((reply) => (
                        <div key={reply.id} className="ms-3 mt-1">
                          <MessageBubble
                            msg={reply}
                            currentUserId={currentUserId}
                            onReact={(emoji) => void toggleReaction(reply.id, emoji)}
                            onReply={() => setReplyTo(reply.id)}
                            compact
                          />
                        </div>
                      ))}
                  </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="border-t border-border p-2">
              {replyTo && (
                <p className="mb-1 text-[10px] text-muted-foreground">
                  Replying in thread ·{' '}
                  <button type="button" className="text-primary" onClick={() => setReplyTo(null)}>
                    cancel
                  </button>
                </p>
              )}
              {error && <p className="mb-1 text-[10px] text-destructive">{error}</p>}
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Message…"
                  className="min-w-0 flex-1 rounded-lg border border-border bg-background px-2 py-1.5 text-[13px]"
                />
                <button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  className="shrink-0 rounded-lg bg-primary px-3 text-[12px] font-bold text-white disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  )

  if (variant === 'embedded') return panel

  return (
    <div>
      {error && <p className="mb-2 text-[12px] text-destructive">{error}</p>}
      {isManager && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-primary px-3 py-1.5 text-[12px] font-bold text-white"
          >
            New channel
          </button>
          {showForm && (
            <form onSubmit={createChannel} className="mt-3 grid gap-2 rounded-xl border border-border p-4 md:grid-cols-2">
              <input name="name" required placeholder="channel-name" className="rounded border border-border px-2 py-1.5 text-[13px] md:col-span-2" />
              <input name="description" placeholder="Description" className="rounded border border-border px-2 py-1.5 text-[13px] md:col-span-2" />
              <select name="type" defaultValue="Public" className="rounded border border-border px-2 py-1.5 text-[13px]">
                {USER_CHANNEL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={busy} className="rounded bg-primary px-3 py-1.5 text-[12px] font-bold text-white">
                Create
              </button>
            </form>
          )}
        </div>
      )}
      {panel}
    </div>
  )
}

function MessageBubble({
  msg,
  currentUserId,
  onReact,
  onReply,
  compact,
}: {
  msg: MessageRow
  currentUserId: string
  onReact: (emoji: string) => void
  onReply: () => void
  compact?: boolean
}) {
  const feed = isFeedCardMessage(msg)
  const att = feed ? msg.attachments : null
  const isOwn = msg.user_id === currentUserId

  return (
    <article
      className={`rounded-lg border px-2.5 py-2 ${compact ? 'text-[11px]' : 'text-[12px]'} ${
        isOwn ? 'border-primary/30 bg-primary/10' : 'border-border bg-card/60'
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <AuthorHoverCard userId={msg.user_id} authorName={msg.author_name} compact={compact} />
        <time className="text-[10px] text-muted-foreground" dateTime={msg.created_at}>
          {formatTime(msg.created_at)}
        </time>
      </div>
      <p className="mt-1 whitespace-pre-wrap text-foreground">{msg.content}</p>
      {att?.href && (
        <a href={att.href} className="mt-1 inline-block text-[11px] font-semibold text-primary hover:underline">
          Open →
        </a>
      )}
      {att?.xp_delta !== undefined && (
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">+{att.xp_delta} XP</p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {REACTION_EMOJIS.map((emoji) => {
          const users = msg.reactions?.[emoji] ?? []
          const count = users.length
          const active = users.includes(currentUserId)
          return (
            <button
              key={emoji}
              type="button"
              onClick={() => onReact(emoji)}
              className={`rounded-full border px-1.5 py-0.5 text-[10px] ${
                active ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              {emoji} {count > 0 ? count : ''}
            </button>
          )
        })}
        <button type="button" onClick={onReply} className="text-[10px] font-semibold text-primary">
          Reply
        </button>
      </div>
    </article>
  )
}
