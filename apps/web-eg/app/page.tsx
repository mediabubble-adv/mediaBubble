import type { Metadata } from 'next'
import { HomePageContent } from './content'

export const metadata: Metadata = {
  title: "Hurghada's #1 Marketing Agency",
  description:
    "Hurghada's results-driven marketing agency. SEO, PPC, social media, branding and web development for tourism and hospitality brands. Free strategy audit.",
  alternates: { canonical: '/' },
  openGraph: {
    title:       'MediaBubble | Hurghada Marketing Agency',
    description: 'Full-service marketing for Hurghada businesses. SEO, ads, branding, web, and social from one team.',
    url:         '/',
    type:        'website',
  },
  twitter: {
    title:       'MediaBubble | Hurghada Marketing Agency',
    description: 'Full-service marketing for Hurghada businesses. SEO, ads, branding, web, and social from one team.',
  },
}

export default function HomePage() {
  return <HomePageContent />
}
