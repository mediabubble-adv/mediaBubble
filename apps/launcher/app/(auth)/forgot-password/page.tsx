'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Field, SubmitButton, Alert, DevTokenNote, postJson } from '../parts'

interface ResetRequestData {
  resetToken?: string
}

export default function ForgotPasswordPage() {
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState<ResetRequestData | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const form = new FormData(e.currentTarget)
    const result = await postJson<ResetRequestData>('/api/auth/request-password-reset', {
      email: form.get('email'),
    })
    setPending(false)
    // Endpoint always 200s with a generic message (no account enumeration).
    setDone(result.data ?? {})
  }

  if (done) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-xl font-bold text-foreground">Check your email</h1>
        <Alert kind="success">
          If an account exists for that email, a reset link has been sent.
        </Alert>
        {done.resetToken ? (
          <DevTokenNote
            href={`/reset-password?token=${encodeURIComponent(done.resetToken)}`}
            label="Reset password now"
          />
        ) : null}
        <p className="text-center text-[13px] text-muted-foreground">
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">Reset password</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Enter your email and we’ll send a reset link.
        </p>
      </div>

      <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@mediabubble.co" />

      <SubmitButton pending={pending}>Send reset link</SubmitButton>

      <p className="text-center text-[13px] text-muted-foreground">
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  )
}
