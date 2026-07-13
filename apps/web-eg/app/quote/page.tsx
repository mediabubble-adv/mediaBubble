import type { Metadata } from 'next'
import { getAlternates } from '@mediabubble/shared/server'
import { QuoteRequestSection } from '@/components/features/quote/QuoteRequestSection'
import { MainLayout } from '@/components/layout/MainLayout'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Get a custom marketing quote from MediaBubble. Tell us about your project and budget, and we\'ll provide a detailed proposal within 24-48 hours.',
  alternates: getAlternates('/quote', 'eg'),
  openGraph: {
    title: 'Request a Quote | MediaBubble',
    description: 'Get a custom marketing proposal tailored to your business goals.',
    url: '/quote',
  },
}

export default function QuotePage() {
  return (
    <MainLayout>
      <QuoteRequestSection />
    </MainLayout>
  )
}
