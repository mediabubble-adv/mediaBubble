import type { Metadata } from 'next'
import { OpusHub } from './opus-hub'

export const metadata: Metadata = { title: 'OPUS Command Center' }
export const dynamic = 'force-dynamic'

export default function OpusPage() {
  return <OpusHub />
}
