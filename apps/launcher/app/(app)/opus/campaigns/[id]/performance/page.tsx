import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCampaignPerformance } from '@/lib/opus/metrics/campaign-performance'
import { OpusPerformanceView } from './performance-view'

export const metadata: Metadata = { title: 'OPUS — Campaign Performance' }
export const dynamic = 'force-dynamic'

export default async function OpusPerformancePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getCampaignPerformance(id)
  if (!data) notFound()
  return <OpusPerformanceView data={data} />
}
