'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function Alert({ kind, children }: { kind: 'error' | 'success'; children: React.ReactNode }) {
  const styles =
    kind === 'error'
      ? 'border-brand-error/30 bg-brand-error/10 text-brand-error'
      : 'border-brand-success/30 bg-brand-success/10 text-brand-success'
  return (
    <p className={`rounded-xl border px-4 py-3 text-[13px] ${styles}`}>{children}</p>
  )
}

export function PortalVerifyForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''
  const next = searchParams.get('next') ?? '/portal'
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setState('error')
      setMessage('Missing sign-in link. Ask your MediaBubble contact for a new portal invite.')
      return
    }

    let cancelled = false
    setState('loading')

    fetch('/api/portal/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const json = await res.json()
        if (cancelled) return
        if (json.status !== 200) {
          setState('error')
          setMessage(json.message ?? 'Could not verify link')
          return
        }
        setState('done')
        window.location.href = next.startsWith('/portal') ? next : '/portal'
      })
      .catch(() => {
        if (!cancelled) {
          setState('error')
          setMessage('Network error — try again in a moment.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [token, next])

  return (
    <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-6 shadow-xl shadow-black/20">
      <h1 className="font-display text-xl font-bold text-brand-text">Signing you in</h1>
      <p className="mt-2 text-[13px] text-brand-text-muted">
        Verifying your secure portal link…
      </p>

      <div className="mt-6">
        {state === 'loading' || state === 'idle' ? (
          <div className="flex items-center gap-2 text-[13px] text-brand-text-muted">
            <Loader2 size={16} className="animate-spin" />
            One moment
          </div>
        ) : null}
        {state === 'error' && message ? <Alert kind="error">{message}</Alert> : null}
        {state === 'done' ? <Alert kind="success">Redirecting to your portal…</Alert> : null}
      </div>
    </div>
  )
}
