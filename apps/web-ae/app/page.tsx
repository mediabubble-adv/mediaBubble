import type { Metadata } from 'next'
import { HomePageContent } from './content'

export const metadata: Metadata = {
  title: "UAE's #1 Marketing Agency",
  description:
    "UAE's results-driven marketing agency. SEO, PPC, social media, branding and web development for tourism and hospitality brands. Free strategy audit.",
  alternates: { canonical: '/' },
  openGraph: {
    title:       "MediaBubble — UAE's #1 Marketing Agency",
    description: 'Full-service marketing for UAE businesses. SEO, ads, branding, web, social — all from one team.',
    url:         '/',
    type:        'website',
  },
  twitter: {
    title:       "MediaBubble — UAE's #1 Marketing Agency",
    description: 'Full-service marketing for UAE businesses. SEO, ads, branding, web, social — all from one team.',
  },
}

export default function HomePage() {
  return <HomePageContent />
}
