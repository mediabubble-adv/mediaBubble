'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function Alert({ kind, children }: { kind: 'error' | 'success'; children: React.ReactNode }) {
  const styles =
    kind === 'error'
      ? 'border-destructive/30 bg-destructive/10 text-destructive'
      : 'border-[#16A34A]/30 bg-[#16A34A]/10 text-[#16A34A]'
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/20">
      <h1 className="font-display text-xl font-bold text-foreground">Signing you in</h1>
      <p className="mt-2 text-[13px] text-muted-foreground">
        Verifying your secure portal link…
      </p>

      <div className="mt-6">
        {state === 'loading' || state === 'idle' ? (
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
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
