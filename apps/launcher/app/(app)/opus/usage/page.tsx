import type { Metadata } from 'next'
import { OpusUsageDashboard } from './usage-dashboard'

export const metadata: Metadata = { title: 'OPUS — Usage' }
export const dynamic = 'force-dynamic'

export default function OpusUsagePage() {
  return <OpusUsageDashboard />
}
