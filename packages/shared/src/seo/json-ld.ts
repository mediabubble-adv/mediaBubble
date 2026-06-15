import type { MarketSiteDefaults } from '../site-config'

export interface SchemaImageObject {
  '@type': 'ImageObject'
  '@id': string
  url: string
  contentUrl: string
  width: number
  height: number
  caption: string
}

export interface SchemaQuantitativeValue {
  '@type': 'QuantitativeValue'
  value: number
}

export interface SchemaPostalAddress {
  '@type': 'PostalAddress'
  addressLocality: string
  addressRegion: string
  addressCountry: string
}

export interface SchemaGeoCoordinates {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
}

export interface SchemaOpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: string[]
  opens: string
  closes: string
}

export interface SchemaServiceOffer {
  '@type': 'Offer'
  itemOffered: {
    '@type': 'Service'
    name: string
    url: string
  }
}

export interface SchemaLocalBusiness {
  '@type': ['LocalBusiness', 'MarketingAgency', 'ProfessionalService']
  '@id': string
  name: string
  alternateName: string
  slogan: string
  description: string
  url: string
  logo: SchemaImageObject
  image: string
  telephone: string
  email: string
  foundingDate: string
  numberOfEmployees: SchemaQuantitativeValue
  priceRange: string
  areaServed: Array<{ '@type': 'City' | 'Country'; name: string }>
  address: SchemaPostalAddress
  geo: SchemaGeoCoordinates
  openingHoursSpecification: SchemaOpeningHoursSpecification[]
  sameAs: string[]
  hasOfferCatalog: {
    '@type': 'OfferCatalog'
    name: string
    itemListElement: SchemaServiceOffer[]
  }
}

export interface SchemaWebSite {
  '@type': 'WebSite'
  '@id': string
  url: string
  name: string
  description: string
  publisher: { '@id': string }
  potentialAction: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

export interface MarketJsonLdGraph {
  '@context': 'https://schema.org'
  '@graph': [SchemaLocalBusiness, SchemaWebSite]
}

export interface MarketJsonLdOverrides {
  slogan: string
  businessDescription: string
  websiteDescription: string
  areaServed: Array<{ '@type': 'City' | 'Country'; name: string }>
  geo: SchemaGeoCoordinates
}

const SERVICE_OFFERS = [
  'SEO & Organic Growth',
  'Paid Advertising (PPC)',
  'Social Media Marketing',
  'Branding & Design',
  'Web Development',
  'Content Marketing',
  'Events & Activations',
] as const

const SERVICE_SLUGS = ['seo', 'ppc', 'social', 'branding', 'web', 'content', 'events'] as const

import { MEDIABUBBLE_SOCIAL_PROFILES } from '../social-links'

export function buildMarketJsonLd(
  site: MarketSiteDefaults,
  overrides: MarketJsonLdOverrides,
): MarketJsonLdGraph {
  const siteUrl = site.siteUrl

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'MarketingAgency', 'ProfessionalService'],
        '@id': `${siteUrl}/#business`,
        name: 'MediaBubble',
        alternateName: 'Media Bubble',
        slogan: overrides.slogan,
        description: overrides.businessDescription,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${siteUrl}/#logo`,
          url: `${siteUrl}/assets/Logo/logo-favicon.svg`,
          contentUrl: `${siteUrl}/assets/Logo/logo-favicon.svg`,
          width: 512,
          height: 512,
          caption: 'MediaBubble logo',
        },
        image: `${siteUrl}/assets/og-image.jpg`,
        telephone: site.phone,
        email: site.email,
        foundingDate: '2015',
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: 22,
        },
        priceRange: '$$',
        areaServed: overrides.areaServed,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.locality,
          addressRegion: site.region,
          addressCountry: site.countryCode,
        },
        geo: overrides.geo,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        sameAs: [...MEDIABUBBLE_SOCIAL_PROFILES],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Marketing Services',
          itemListElement: SERVICE_OFFERS.map((name, index) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name,
              url: `${siteUrl}/services/${SERVICE_SLUGS[index]}`,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'MediaBubble',
        description: overrides.websiteDescription,
        publisher: { '@id': `${siteUrl}/#business` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }
}

export function serializeJsonLd(graph: MarketJsonLdGraph): string {
  return JSON.stringify(graph)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}
