'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Field, SubmitButton, Alert, postJson } from '../parts'

export function ResetForm() {
  const token = useSearchParams().get('token') ?? ''

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    const password = String(form.get('password') ?? '')
    if (password !== String(form.get('confirm') ?? '')) {
      setError('Passwords do not match.')
      setPending(false)
      return
    }
    const result = await postJson('/api/auth/reset-password', { token, password })
    setPending(false)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-xl font-bold text-foreground">Password updated</h1>
        <Alert kind="success">Your password has been changed. You can now sign in.</Alert>
        <p className="text-center text-[13px] text-muted-foreground">
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Go to sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">Set a new password</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Choose a strong password.</p>
      </div>

      {!token ? <Alert kind="error">Missing reset token. Use the link from your email.</Alert> : null}
      {error ? <Alert kind="error">{error}</Alert> : null}

      <Field
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        hint="At least 8 characters."
      />
      <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" required minLength={8} />

      <SubmitButton pending={pending}>Update password</SubmitButton>
    </form>
  )
}
