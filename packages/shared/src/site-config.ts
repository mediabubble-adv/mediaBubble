export type Market = 'eg' | 'ae' | 'brand'

export interface MarketSiteDefaults {
  siteUrl: string
  defaultTitle: string
  description: string
  openGraphTitle: string
  openGraphDescription: string
  phone: string
  email: string
  locality: string
  region: string
  countryCode: string
}

const MARKET_DEFAULTS: Record<Market, MarketSiteDefaults> = {
  eg: {
    siteUrl: 'https://mediabubble.co',
    defaultTitle: 'MediaBubble — Hurghada Marketing Agency',
    description:
      'MediaBubble is a full-service marketing agency in Hurghada, Egypt. SEO, paid ads, branding, web development, and social media — since 2015.',
    openGraphTitle: 'MediaBubble — Hurghada Marketing Agency',
    openGraphDescription:
      'Full-service marketing for Hurghada businesses. SEO, ads, branding, web, and social from one team since 2015.',
    phone: '+201234567890',
    email: 'hello@mediabubble.com',
    locality: 'Hurghada',
    region: 'Red Sea Governorate',
    countryCode: 'EG',
  },
  ae: {
    siteUrl: 'https://mediabubble.ae',
    defaultTitle: 'MediaBubble | UAE Marketing Agency',
    description:
      'MediaBubble is a full-service marketing agency in the UAE. SEO, paid ads, branding, web development, and social media. Since 2015.',
    openGraphTitle: 'MediaBubble — UAE Marketing Agency',
    openGraphDescription:
      'Full-service marketing for UAE businesses. SEO, ads, branding, web, and social from one team since 2015.',
    phone: '+971501234567',
    email: 'hello@mediabubble.ae',
    locality: 'Dubai',
    region: 'Dubai',
    countryCode: 'AE',
  },
  brand: {
    siteUrl: 'https://brand.mediabubble.co',
    defaultTitle: 'MediaBubble Brand Guidelines',
    description: 'Official MediaBubble brand guidelines, assets, and voice & tone documentation.',
    openGraphTitle: 'MediaBubble Brand Guidelines',
    openGraphDescription: 'Brand system, typography, color, and usage guidelines for MediaBubble.',
    phone: '+201234567890',
    email: 'hello@mediabubble.com',
    locality: 'Hurghada',
    region: 'Red Sea Governorate',
    countryCode: 'EG',
  },
}

export function resolveMarketSiteConfig(market: Market): MarketSiteDefaults {
  const defaults = MARKET_DEFAULTS[market]

  return {
    ...defaults,
    siteUrl: process.env['NEXT_PUBLIC_SITE_URL'] ?? defaults.siteUrl,
    phone: process.env['NEXT_PUBLIC_BUSINESS_PHONE'] ?? defaults.phone,
    email: process.env['CONTACT_EMAIL'] ?? defaults.email,
  }
}

/** Cross-market footer / region switcher targets (EG ↔ AE apps). */
export function getMarketPortalUrl(market: 'eg' | 'ae'): string {
  if (market === 'eg') {
    return process.env['NEXT_PUBLIC_EG_SITE_URL'] ?? MARKET_DEFAULTS.eg.siteUrl
  }
  return process.env['NEXT_PUBLIC_AE_SITE_URL'] ?? MARKET_DEFAULTS.ae.siteUrl
}
