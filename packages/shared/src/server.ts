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
export { buildMarketJsonLd, serializeJsonLd, buildInsightPostJsonLd, buildCaseStudyJsonLd } from './seo/json-ld'
export { getAlternates } from './seo/alternates'
export type {
  MarketJsonLdGraph,
  SchemaLocalBusiness,
  SchemaWebSite,
  InsightPostJsonLdInput,
  CaseStudyJsonLdInput,
} from './seo/json-ld'
export { THEME_INIT_SCRIPT } from './theme/theme-utils'
export { DEV_SW_CLEANUP_SCRIPT } from './pwa/dev-sw-cleanup'
import inlineScripts from './inline-scripts.cjs'
export const LANG_INIT_SCRIPT = inlineScripts.LANG_INIT_SCRIPT as string
export { ISR_REVALIDATE_SECONDS } from './performance/isr'
export { checkRateLimit, getClientIp } from './rate-limit'
export { searchInsightsPosts, toInsightSearchSummary, type InsightSearchResult, type InsightSearchablePost } from './insights/search'
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
