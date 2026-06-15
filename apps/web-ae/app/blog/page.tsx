import type { Metadata } from 'next'
import { ISR_REVALIDATE_SECONDS, getAlternates } from '@mediabubble/shared/server'
import { BlogPageContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.listing

export const metadata: Metadata = {
  title: 'Marketing Blog',
  description:
    'Practical marketing strategy, SEO guides, and campaign insights from the MediaBubble team in Dubai, UAE. No fluff — just what works.',
  alternates: getAlternates('/blog', 'ae'),
  openGraph: {
    title:       'Marketing Blog | MediaBubble',
    description: 'Practical strategy and honest analysis from the team that runs campaigns every day.',
    url:         '/blog',
  },
}

export default function BlogPage() {
  return <BlogPageContent />
}
