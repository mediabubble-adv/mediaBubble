import { Suspense } from 'react'
import type { Metadata } from 'next'
import { VerifyEmail } from './verify'

export const metadata: Metadata = { title: 'Verify email' }

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  )
}
