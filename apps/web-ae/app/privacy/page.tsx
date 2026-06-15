import type { Metadata } from 'next'
import { LegalDocument } from '@/components/features/legal/LegalDocument'
import { privacyPolicy } from '@/lib/content/legal/privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MediaBubble UAE collects, uses, and protects your personal data.',
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'Privacy Policy | MediaBubble UAE', url: '/privacy' },
}

export default function PrivacyPage() {
  return <LegalDocument document={privacyPolicy} />
}
