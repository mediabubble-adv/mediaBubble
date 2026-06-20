import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PortalVerifyForm } from './verify-form'

export const metadata: Metadata = { title: 'Client portal sign-in' }

export default function PortalVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-brand-whisper-border bg-brand-surface p-6 text-[13px] text-brand-text-muted">
          Loading…
        </div>
      }
    >
      <PortalVerifyForm />
    </Suspense>
  )
}
