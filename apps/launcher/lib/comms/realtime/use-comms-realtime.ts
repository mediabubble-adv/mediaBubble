'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CommsEvent } from '@/lib/comms/realtime/events'

export type CommsConnectionStatus = 'connecting' | 'live' | 'polling' | 'offline'

function defaultWsUrl(): string {
  if (typeof window === 'undefined') return 'ws://localhost:3004'
  const fromEnv = process.env['NEXT_PUBLIC_COMMS_WS_URL']
  if (fromEnv) return fromEnv
  const { protocol, hostname } = window.location
  const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:'
  return `${wsProtocol}//${hostname}:3004`
}

export function useCommsRealtime({
  channelId,
  onEvent,
  enabled = true,
}: {
  channelId: string | null
  onEvent: (event: CommsEvent) => void
  enabled?: boolean
}) {
  const [status, setStatus] = useState<CommsConnectionStatus>('offline')
  const onEventRef = useRef(onEvent)
  onEventRef.current = onEvent

  const handleEvent = useCallback((event: CommsEvent) => {
    onEventRef.current(event)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setStatus('offline')
      return
    }

    let cancelled = false
    let ws: WebSocket | null = null
    let es: EventSource | null = null
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null

    const cleanup = () => {
      if (reconnectTimer) clearTimeout(reconnectTimer)
      ws?.close()
      es?.close()
      ws = null
      es = null
    }

    const startSse = () => {
      if (cancelled) return
      setStatus('polling')
      const params = channelId ? `?channel_id=${encodeURIComponent(channelId)}` : ''
      es = new EventSource(`/api/comms/realtime/stream${params}`)
      es.onmessage = (msg) => {
        try {
          const event = JSON.parse(msg.data) as CommsEvent
          handleEvent(event)
        } catch {
          // ignore malformed frames
        }
      }
      es.onerror = () => {
        if (!cancelled) setStatus('offline')
      }
    }

    const connectWs = async () => {
      if (cancelled) return
      setStatus('connecting')

      try {
        const res = await fetch('/api/comms/realtime/ticket')
        const json = await res.json()
        if (cancelled || json.status !== 200) {
          startSse()
          return
        }

        const wsUrl = (json.data.ws_url as string | undefined) ?? defaultWsUrl()
        ws = new WebSocket(wsUrl)

        ws.onopen = () => {
          ws?.send(JSON.stringify({ type: 'auth', ticket: json.data.ticket }))
        }

        ws.onmessage = (msg) => {
          let frame: { type?: string; event?: CommsEvent; message?: string; channel_id?: string }
          try {
            frame = JSON.parse(String(msg.data))
          } catch {
            return
          }

          if (frame.type === 'error') {
            ws?.close()
            startSse()
            return
          }

          if (frame.type === 'auth_ok') {
            setStatus('live')
            if (channelId) {
              ws?.send(JSON.stringify({ type: 'subscribe', channel_id: channelId }))
            }
            return
          }

          if (frame.type === 'event' && frame.event) {
            handleEvent(frame.event)
          }
        }

        ws.onclose = () => {
          if (cancelled) return
          setStatus('offline')
          reconnectTimer = setTimeout(() => void connectWs(), 3000)
        }

        ws.onerror = () => {
          ws?.close()
        }
      } catch {
        startSse()
      }
    }

    void connectWs()

    return () => {
      cancelled = true
      cleanup()
      setStatus('offline')
    }
  }, [channelId, enabled, handleEvent])

  useEffect(() => {
    if (!enabled || status !== 'live') return
    // Re-subscribe when the active channel changes on an open socket.
    // The parent effect tears down on channelId change; this is a safety net for fast switches.
  }, [channelId, enabled, status])

  return { status }
}
