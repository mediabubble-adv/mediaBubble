'use client'

/**
 * Client-only exports ('use client' modules and browser hooks).
 * Prefer this entry in client components instead of the root barrel.
 */
export { ConsentProvider, useConsentContext } from './consent/ConsentContext'
export { ThemeProvider, useTheme } from './theme/ThemeProvider'
export { useDevServiceWorkerCleanup } from './hooks/use-dev-service-worker-cleanup'
export {
  I18nProvider,
  useI18n,
  flattenTranslations,
  type Locale,
  type I18nProviderProps,
} from './i18n/I18nProvider'
export { useExperiment } from './hooks/use-experiment'
export {
  EXPERIMENTS,
  HOME_HERO_CTA_COPY,
  BLOG_SEARCH_PLACEHOLDER_COPY,
  type ExperimentKey,
  type ExperimentVariant,
} from './experiments/config'
export { useGA } from './hooks/use-ga'
export { useConsent } from './hooks/use-consent'
export { useDebounce } from './utils/use-debounce'
export { useLocalStorage } from './hooks/use-local-storage'
export { usePrefersReducedMotion } from './hooks/use-prefers-reduced-motion'
export {
  trackExperimentConversion,
  trackExperimentExposure,
  trackFormCompleted,
  trackFormStarted,
  trackNewsletterSubmitted,
  trackNewsletterShown,
  trackNewsletterDismissed,
  trackInsightsSearch,
  trackFloatingCtaClicked,
  trackGitModalOpened,
  trackGitModalCtaClicked,
  trackServiceViewed,
} from './ga4-events'
export {
  searchInsightsPosts,
  toInsightSearchSummary,
  type InsightSearchResult,
  type InsightSearchablePost,
} from './insights/search'
export {
  resolveMarketSiteConfig,
  getMarketPortalUrl,
  type Market,
  type MarketSiteDefaults,
} from './site-config'
export { buildInsightPostJsonLd, buildCaseStudyJsonLd, serializeJsonLd, type InsightPostJsonLdInput, type CaseStudyJsonLdInput } from './seo/json-ld'
export { isOfficeOpen } from './office-hours'
export { useOfficeOpen } from './hooks/use-office-open'
export { FooterSocialLinks } from './components/FooterSocialLinks'
export {
  STORAGE_KEYS,
  getTypedStorageItem,
  setTypedStorageItem,
  type StorageKey,
  type CookieConsentValue,
} from './storage-keys'
export {
  DEFAULT_RESPONSIVE_IMAGE_SIZES,
  HERO_IMAGE_SIZES,
  THUMBNAIL_IMAGE_SIZES,
} from './performance/image'
