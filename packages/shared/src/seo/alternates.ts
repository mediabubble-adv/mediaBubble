import { resolveMarketSiteConfig } from '../site-config'

/**
 * Dynamically builds canonical and hreflang language alternates for MediaBubble routes.
 * Output conforms to absolute URL standards required by search engines.
 * 
 * @param path The URL path (e.g. '/about' or '/services/seo')
 * @param market The market identifier ('eg' | 'ae')
 */
export function getAlternates(path: string, market: 'eg' | 'ae') {
  const config = resolveMarketSiteConfig(market)
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const canonicalUrl = `${config.siteUrl}${cleanPath === '/' ? '' : cleanPath}`
  const arLocale = market === 'eg' ? 'ar-EG' : 'ar-AE'

  return {
    canonical: canonicalUrl,
    languages: {
      'en': `${canonicalUrl}?lang=en`,
      [arLocale]: `${canonicalUrl}?lang=ar`,
    },
  }
}
