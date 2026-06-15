import type { Metadata } from 'next'
import { LegalDocument } from '@/components/features/legal/LegalDocument'
import { termsOfService } from '@/lib/content/legal/terms'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of MediaBubble UAE services and this website.',
  alternates: { canonical: '/terms' },
  openGraph: { title: 'Terms of Service | MediaBubble UAE', url: '/terms' },
}

export default function TermsPage() {
  return <LegalDocument document={termsOfService} />
}
