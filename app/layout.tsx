import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono, Cairo } from 'next/font/google'
import { I18nLayoutWrapper } from '@/components/I18nLayoutWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-poppins' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })
const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700', '800', '900'], variable: '--font-cairo' })

export const metadata: Metadata = {
  title: {
    template: '%s | MediaBubble',
    default:  'MediaBubble \u2014 Hurghada Marketing Agency',
  },
  description:
    'MediaBubble is a full-service marketing agency in Hurghada, Egypt. SEO, paid ads, branding, web development, and social media \u2014 since 2015.',
  metadataBase: new URL('https://mediabubble.com'),
  openGraph: {
    siteName: 'MediaBubble',
    locale:   'en_US',
    type:     'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://mediabubble.com/#business',
      name: 'MediaBubble',
      description:
        'Full-service marketing agency in Hurghada, Egypt. SEO, paid ads, branding, web development, social media, and events — since 2015.',
      url: 'https://mediabubble.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mediabubble.com/assets/logo.svg',
      },
      image: 'https://mediabubble.com/assets/og-image.jpg',
      telephone: '+201234567890',
      email: 'hello@mediabubble.com',
      foundingDate: '2015',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hurghada',
        addressRegion: 'Red Sea Governorate',
        addressCountry: 'EG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 27.2579,
        longitude: 33.8116,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: [
        'https://www.facebook.com/mediabubble',
        'https://www.instagram.com/mediabubble',
        'https://www.linkedin.com/company/mediabubble',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Marketing Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Organic Growth' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paid Advertising (PPC)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Events & Activations' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mediabubble.com/#website',
      url: 'https://mediabubble.com',
      name: 'MediaBubble',
      description: 'Hurghada\'s #1 full-service marketing agency.',
      publisher: { '@id': 'https://mediabubble.com/#business' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://mediabubble.com/blog?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} ${cairo.variable} font-sans`}>
        <I18nLayoutWrapper>{children}</I18nLayoutWrapper>
      </body>
    </html>
  )
}
