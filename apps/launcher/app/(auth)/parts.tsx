'use client'

// Shared UI primitives + fetch helper for the auth pages. All client-side:
// the forms POST to /api/auth/* and render the standardized envelope.

import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

export interface ApiResult<T = unknown> {
  ok: boolean
  message: string
  data?: T
  error?: string
}

/** POST JSON to an auth endpoint and normalize the response envelope. */
export async function postJson<T = unknown>(
  url: string,
  body: unknown,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => ({}))
    const fallback =
      res.status >= 500
        ? 'Server error — check launcher env (DATABASE_URL) and restart dev.'
        : 'Something went wrong'
    return {
      ok: res.ok,
      message: json.message ?? (res.ok ? 'Success' : fallback),
      data: json.data,
      error: json.error,
    }
  } catch {
    return { ok: false, message: 'Network error — please try again.', error: 'network_error' }
  }
}

export function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-foreground">{label}</span>
      <input
        id={id}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...props}
      />
      {hint ? <span className="mt-1 block text-[12px] text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

export function SubmitButton({
  children,
  pending,
}: {
  children: ReactNode
  pending: boolean
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-primary px-4 py-2.5 text-[14px] font-bold text-white transition-all duration-200 hover:bg-primary/85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Please wait…' : children}
    </button>
  )
}

export function Alert({ kind, children }: { kind: 'error' | 'success'; children: ReactNode }) {
  const styles =
    kind === 'error'
      ? 'border-destructive/40 bg-destructive/[0.12] text-destructive'
      : 'border-[#16A34A]/40 bg-[#16A34A]/[0.12] text-[#16A34A]'
  return (
    <div role="alert" className={`rounded-lg border px-3 py-2.5 text-[13px] ${styles}`}>
      {children}
    </div>
  )
}

/**
 * Dev-only callout used to surface the one-time token that would normally be
 * emailed (email transport is stubbed in Phase 1).
 */
export function DevTokenNote({ href, label }: { href: string; label: string }) {
  return (
    <div className="rounded-lg border border-[#CA8A04]/40 bg-[#CA8A04]/[0.12] px-3 py-2.5 text-[12px] text-foreground">
      <span className="font-bold text-[#CA8A04]">Dev only:</span> email isn’t wired yet.{' '}
      <a href={href} className="font-semibold text-primary underline">
        {label}
      </a>
    </div>
  )
}
