'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import {
  PRESENCE_DOT_CLASS,
  PRESENCE_STATUS_LABELS,
  USER_SETTABLE_PRESENCE,
  type PresenceStatus,
  type UserSettablePresence,
} from '@/lib/presence/constants'

interface PresenceState {
  status: PresenceStatus
  status_message: string | null
}

export function PresenceStatusPicker() {
  const { toast } = useToast()
  const [loaded, setLoaded] = useState<PresenceState | null>(null)
  const [status, setStatus] = useState<UserSettablePresence>('Online')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    void fetch('/api/presence/me')
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 200) return
        const data = json.data as PresenceState
        setLoaded(data)
        const nextStatus =
          data.status === 'Away' || data.status === 'Busy' ? data.status : 'Online'
        setStatus(nextStatus)
        setMessage(data.status_message ?? '')
      })
      .catch(() => undefined)
  }, [])

  const isDirty =
    loaded !== null &&
    (status !== (loaded.status === 'Away' || loaded.status === 'Busy' ? loaded.status : 'Online') ||
      message !== (loaded.status_message ?? ''))

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/presence/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          status_message: status === 'Online' ? null : message.trim() || null,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        toast('error', json.message ?? 'Failed to update presence')
        return
      }
      const data = json.data as PresenceState
      setLoaded(data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      toast('success', 'Presence updated')
    } catch {
      toast('error', 'Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  const previewStatus: PresenceStatus = status

  return (
    <Card className="launcher-surface">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="text-[15px] font-semibold">Presence</CardTitle>
        <CardDescription className="mt-1">
          Teammates see your status in Meet while Launcher is open.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${PRESENCE_DOT_CLASS[previewStatus]}`}
            aria-hidden="true"
          />
          <span className="text-[13px] font-medium text-foreground">
            {PRESENCE_STATUS_LABELS[status]}
          </span>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex flex-wrap gap-2">
            {USER_SETTABLE_PRESENCE.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatus(value)}
                className={[
                  'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors',
                  status === value
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:bg-muted/40',
                ].join(' ')}
              >
                <span
                  className={`h-2 w-2 rounded-full ${PRESENCE_DOT_CLASS[value]}`}
                  aria-hidden="true"
                />
                {PRESENCE_STATUS_LABELS[value]}
              </button>
            ))}
          </div>
        </div>

        {status !== 'Online' ? (
          <div className="space-y-1.5">
            <Label htmlFor="presence-message">Status message</Label>
            <Input
              id="presence-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional — e.g. In a client call"
              maxLength={100}
            />
            <p className="text-[11px] text-muted-foreground tabular-nums">{message.length}/100</p>
          </div>
        ) : null}

        <div className="flex items-center gap-3 pt-1">
          <Button onClick={handleSave} isLoading={saving} disabled={!isDirty || saving || loaded === null}>
            {saved ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                Saved
              </span>
            ) : (
              'Save presence'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function PresenceDot({
  status,
  className = '',
}: {
  status: PresenceStatus
  className?: string
}) {
  return (
    <span
      className={`absolute -bottom-0.5 -end-0.5 h-2 w-2 rounded-full border border-card ${PRESENCE_DOT_CLASS[status]} ${className}`}
      aria-hidden="true"
    />
  )
}
