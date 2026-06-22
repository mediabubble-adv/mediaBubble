'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Hash, MessageSquare, Plus, RefreshCw, Send, Wifi, WifiOff } from 'lucide-react'
import type { ChannelRow } from '@/lib/comms/channels'
import type { MessageRow } from '@/lib/comms/messages'
import type { CommsEvent } from '@/lib/comms/realtime/events'
import { useCommsRealtime } from '@/lib/comms/realtime/use-comms-realtime'
import { CHANNEL_TYPES } from '@/lib/comms/schemas'
import { Input } from '@/components/ui/input'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ChatDashboard({
  initialChannels,
  initialMessages,
  initialChannelId,
  currentUserId,
}: {
  initialChannels: ChannelRow[]
  initialMessages: MessageRow[]
  initialChannelId: string | null
  currentUserId: string
}) {
  const [channels, setChannels] = useState(initialChannels)
  const [selectedId, setSelectedId] = useState<string | null>(
    initialChannelId ?? initialChannels[0]?.id ?? null,
  )
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selected = useMemo(
    () => channels.find((c) => c.id === selectedId) ?? null,
    [channels, selectedId],
  )

  const applyRealtimeEvent = useCallback((event: CommsEvent) => {
    switch (event.type) {
      case 'channel.created':
        setChannels((prev) => {
          if (prev.some((c) => c.id === event.channel.id)) return prev
          return [...prev, event.channel].sort((a, b) => a.name.localeCompare(b.name))
        })
        return
      case 'message.created':
        if (event.channel_id !== selectedId) return
        setMessages((prev) =>
          prev.some((m) => m.id === event.message.id) ? prev : [...prev, event.message],
        )
        return
      case 'message.updated':
        if (event.channel_id !== selectedId) return
        setMessages((prev) =>
          prev.map((m) => (m.id === event.message.id ? event.message : m)),
        )
        return
      case 'message.deleted':
        if (event.channel_id !== selectedId) return
        setMessages((prev) => prev.filter((m) => m.id !== event.message_id))
        return
      default: {
        const _exhaustive: never = event
        void _exhaustive
      }
    }
  }, [selectedId])

  const { status: liveStatus } = useCommsRealtime({
    channelId: selectedId,
    onEvent: applyRealtimeEvent,
  })

  const liveLabel =
    liveStatus === 'live'
      ? 'Live'
      : liveStatus === 'polling'
        ? 'SSE'
        : liveStatus === 'connecting'
          ? 'Connecting…'
          : 'Offline'

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages])

  async function loadMessages(channelId: string): Promise<void> {
    const res = await fetch(`/api/comms/channels/${channelId}/messages`)
    const json = await res.json()
    if (json.status === 200) setMessages(json.data)
  }

  async function selectChannel(id: string): Promise<void> {
    setSelectedId(id)
    setError(null)
    await loadMessages(id)
  }

  async function refreshChannels(): Promise<void> {
    const res = await fetch('/api/comms/channels')
    const json = await res.json()
    if (json.status === 200) setChannels(json.data)
  }

  async function createChannel(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
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
    setChannels((prev) => [...prev, json.data])
    setSelectedId(json.data.id)
    setMessages([])
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
      body: JSON.stringify({ content }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not send message')
      return
    }
    setMessages((prev) => [...prev, json.data])
    setDraft('')
  }

  return (
    <PageFrame>
      <PageHeader
        icon={MessageSquare}
        title="Communication Hub"
        description="Team channels with Redis-backed live updates."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white transition-[transform,opacity] duration-150 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={16} />
            New channel
          </button>
        }
      />

        {error ? (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
            {error}
          </p>
        ) : null}

        {showForm ? (
          <form
            onSubmit={createChannel}
            className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2"
          >
            <label className="block md:col-span-2">
              <span className="text-[12px] font-bold text-muted-foreground">Channel name</span>
              <Input
                name="name"
                required
                placeholder="general"
                className="mt-1 text-[14px]"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-[12px] font-bold text-muted-foreground">Description</span>
              <Input
                name="description"
                className="mt-1 text-[14px]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Type</span>
              <select
                name="type"
                defaultValue="Public"
                className="mt-1 text-[14px]"
              >
                {CHANNEL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-border px-4 py-2 text-[13px] font-bold text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        <div className="mt-6 grid min-h-[32rem] gap-4 xl:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] 2xl:min-h-[36rem] 2xl:gap-6">
          <aside className="rounded-2xl border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Channels</p>
              <button
                type="button"
                onClick={() => void refreshChannels()}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
                aria-label="Refresh channels"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="space-y-1">
              {channels.length === 0 ? (
                <p className="px-2 py-6 text-center text-[12px] text-muted-foreground">No channels yet.</p>
              ) : (
                channels.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => void selectChannel(channel.id)}
                    className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-[13px] transition-[transform,background-color,color,border-color,opacity] duration-150 ease-[var(--ease-out)] active:scale-[0.99] ${
                      selectedId === channel.id
                        ? 'bg-primary/15 text-foreground'
                        : 'text-muted-foreground hover:bg-background/60 hover:text-foreground'
                    }`}
                  >
                    <Hash size={14} className="shrink-0 opacity-70" />
                    <span className="truncate font-bold">{channel.name}</span>
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className="flex min-h-[28rem] flex-col rounded-2xl border border-border bg-card">
            {!selected ? (
              <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
                <MessageSquare size={24} className="opacity-40" />
                <p className="mt-2 text-[14px] font-bold text-foreground">Pick a channel</p>
              </div>
            ) : (
              <>
                <header className="border-b border-border px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-bold text-foreground">#{selected.name}</p>
                      {selected.description ? (
                        <p className="text-[12px] text-muted-foreground">{selected.description}</p>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          liveStatus === 'live'
                            ? 'bg-[#16A34A]/15 text-[#16A34A]'
                            : liveStatus === 'polling'
                              ? 'bg-primary/15 text-primary'
                              : 'bg-muted-foreground/15 text-muted-foreground'
                        }`}
                      >
                        {liveStatus === 'live' || liveStatus === 'polling' ? (
                          <Wifi size={10} />
                        ) : (
                          <WifiOff size={10} />
                        )}
                        {liveLabel}
                      </span>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void loadMessages(selected.id)}
                        className="rounded-lg border border-border px-2 py-1 text-[11px] font-bold text-muted-foreground disabled:opacity-50"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                </header>

                <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {messages.length === 0 ? (
                    <p className="py-10 text-center text-[13px] text-muted-foreground">
                      No messages yet. Say hello.
                    </p>
                  ) : (
                    messages.map((msg) => (
                      <article
                        key={msg.id}
                        className={`rounded-xl border px-3 py-2 ${
                          msg.user_id === currentUserId
                            ? 'border-primary/30 bg-primary/10'
                            : 'border-border bg-background/40'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-[12px] font-bold text-foreground">{msg.author_name}</p>
                          <time
                            className="text-[10px] text-muted-foreground"
                            dateTime={msg.created_at}
                            dir="ltr"
                            style={{ unicodeBidi: 'isolate' }}
                          >
                            {formatTime(msg.created_at)}
                            {msg.edited_at ? ' · edited' : ''}
                          </time>
                        </div>
                        <p className="mt-1 whitespace-pre-wrap text-[13px] text-foreground">{msg.content}</p>
                      </article>
                    ))
                  )}
                </div>

                <form
                  onSubmit={sendMessage}
                  className="flex gap-2 border-t border-border p-3"
                >
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={`Message #${selected.name}`}
                    className="min-w-0 flex-1 text-[14px]"
                  />
                  <button
                    type="submit"
                    disabled={busy || !draft.trim()}
                    className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50"
                  >
                    <Send size={14} />
                    Send
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
    </PageFrame>
  )
}
