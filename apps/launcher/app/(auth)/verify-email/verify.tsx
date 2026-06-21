'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Alert, postJson } from '../parts'

type Status = 'verifying' | 'success' | 'error' | 'missing'

export function VerifyEmail() {
  const token = useSearchParams().get('token') ?? ''
  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'missing')
  const [message, setMessage] = useState('')
  const ran = useRef(false)

  useEffect(() => {
    if (!token || ran.current) return
    ran.current = true // guard against React 18 StrictMode double-invoke
    postJson('/api/auth/verify-email', { token }).then((result) => {
      setMessage(result.message)
      setStatus(result.ok ? 'success' : 'error')
    })
  }, [token])

  return (
    <div className="space-y-4">
      <h1 className="font-display text-xl font-bold text-foreground">Verify email</h1>

      {status === 'verifying' ? (
        <p className="text-[13px] text-muted-foreground">Verifying your email…</p>
      ) : null}
      {status === 'missing' ? (
        <Alert kind="error">No verification token found. Use the link from your email.</Alert>
      ) : null}
      {status === 'error' ? <Alert kind="error">{message}</Alert> : null}
      {status === 'success' ? <Alert kind="success">{message}</Alert> : null}

      {status !== 'verifying' ? (
        <p className="text-center text-[13px] text-muted-foreground">
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Continue to sign in
          </Link>
        </p>
      ) : null}
    </div>
  )
}
