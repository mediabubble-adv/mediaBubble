import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PortalVerifyForm } from './verify-form'

export const metadata: Metadata = { title: 'Client portal sign-in' }

export default function PortalVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-border bg-card p-6 text-[13px] text-muted-foreground">
          Loading…
        </div>
      }
    >
      <PortalVerifyForm />
    </Suspense>
  )
}
