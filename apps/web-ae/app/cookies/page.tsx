import type { Metadata } from 'next'
import { LegalDocument } from '@/components/features/legal/LegalDocument'
import { cookiePolicy } from '@/lib/content/legal/cookies'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How MediaBubble UAE uses cookies and how you can control them.',
  alternates: { canonical: '/cookies' },
  openGraph: { title: 'Cookie Policy | MediaBubble UAE', url: '/cookies' },
}

export default function CookiesPage() {
  return <LegalDocument document={cookiePolicy} />
}
