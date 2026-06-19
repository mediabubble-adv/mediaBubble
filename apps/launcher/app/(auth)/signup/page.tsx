'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Field, SubmitButton, Alert, DevTokenNote, postJson } from '../parts'

interface SignupData {
  verificationToken?: string
}

export default function SignupPage() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<SignupData | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    const result = await postJson<SignupData>('/api/auth/signup', {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
    })
    setPending(false)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setDone(result.data ?? {})
  }

  if (done) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-xl font-bold text-brand-text">Check your email</h1>
        <Alert kind="success">Account created. Verify your email to activate it.</Alert>
        {done.verificationToken ? (
          <DevTokenNote
            href={`/verify-email?token=${encodeURIComponent(done.verificationToken)}`}
            label="Verify email now"
          />
        ) : null}
        <p className="text-center text-[13px] text-brand-text-muted">
          <Link href="/login" className="font-semibold text-brand-blue hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-bold text-brand-text">Create account</h1>
        <p className="mt-1 text-[13px] text-brand-text-muted">
          Join the MediaBubble operations platform.
        </p>
      </div>

      {error ? <Alert kind="error">{error}</Alert> : null}

      <Field label="Full name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
      <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@mediabubble.co" />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        hint="At least 8 characters."
      />

      <SubmitButton pending={pending}>Create account</SubmitButton>

      <p className="text-center text-[13px] text-brand-text-muted">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-brand-blue hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
