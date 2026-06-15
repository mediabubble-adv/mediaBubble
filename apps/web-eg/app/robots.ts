import type { MetadataRoute } from 'next'
import { resolveMarketSiteConfig } from '@mediabubble/shared/server'

const site = resolveMarketSiteConfig('eg')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/brand/'],
      },
    ],
    sitemap: `${site.siteUrl}/sitemap.xml`,
  }
}
