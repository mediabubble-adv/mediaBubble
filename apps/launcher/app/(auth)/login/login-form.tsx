'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Field, SubmitButton, Alert, postJson } from '../parts'

export function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/profile'

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    const result = await postJson('/api/auth/login', {
      email: form.get('email'),
      password: form.get('password'),
    })
    if (!result.ok) {
      setError(result.message)
      setPending(false)
      return
    }
    // Session cookie is set by the API; navigate into the app.
    router.replace(next.startsWith('/') ? next : '/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">Sign in</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Welcome back to the operations platform.
        </p>
      </div>

      {error ? <Alert kind="error">{error}</Alert> : null}

      <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@mediabubble.co" />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required />

      <div className="text-right">
        <Link href="/forgot-password" className="text-[12px] font-semibold text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <SubmitButton pending={pending}>Sign in</SubmitButton>

      <p className="text-center text-[13px] text-muted-foreground">
        No account?{' '}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Create one
        </Link>
      </p>
    </form>
  )
}
