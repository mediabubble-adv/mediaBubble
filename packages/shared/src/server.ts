/**
 * RSC-safe exports for Server Components, layouts, and route handlers.
 * Do not re-export 'use client' modules from this entry — use ./client instead.
 */
export { env, validateEnv, type Env } from './env'
export {
  resolveMarketSiteConfig,
  getMarketPortalUrl,
  type Market,
  type MarketSiteDefaults,
} from './site-config'
export { buildMarketJsonLd, serializeJsonLd } from './seo/json-ld'
export type {
  MarketJsonLdGraph,
  SchemaLocalBusiness,
  SchemaWebSite,
} from './seo/json-ld'
export { THEME_INIT_SCRIPT } from './theme/theme-utils'
export { DEV_SW_CLEANUP_SCRIPT } from './pwa/dev-sw-cleanup'
export { ISR_REVALIDATE_SECONDS } from './performance/isr'
export { checkRateLimit, getClientIp } from './rate-limit'
export { searchBlogPosts, toBlogSearchSummary, type BlogSearchResult, type BlogSearchablePost } from './blog/search'
export {
  upsertContact,
  syncContactToHubSpot,
  type HubSpotContactInput,
} from './hubspot-client'
export {
  isValidEmail,
  sendContactEmail,
  type ContactEmailPayload,
} from './resend-client'
