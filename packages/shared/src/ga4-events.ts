// GA4 event names as constants — import these everywhere instead of raw strings
export const GA4_EVENTS = {
  NEWSLETTER_MODAL_SHOWN:      'newsletter_modal_shown',
  NEWSLETTER_MODAL_SUBMITTED:  'newsletter_modal_submitted',
  NEWSLETTER_MODAL_DISMISSED:  'newsletter_modal_dismissed',
  FLOATING_CTA_CLICKED:        'floating_cta_clicked',
  GIT_MODAL_OPENED:            'git_modal_opened',
  GIT_MODAL_CTA_CLICKED:       'git_modal_cta_clicked',
  FORM_STARTED:                'form_started',
  FORM_COMPLETED:              'form_completed',
  SERVICE_VIEWED:              'service_viewed',
  EXPERIMENT_EXPOSURE:         'experiment_exposure',
  EXPERIMENT_CONVERSION:       'experiment_conversion',
  BLOG_SEARCH:                 'blog_search',
} as const

type EventName = (typeof GA4_EVENTS)[keyof typeof GA4_EVENTS]

// Strip personal info before sending; only pass safe metadata
export function trackEvent(
  eventName: EventName,
  parameters: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', eventName, {
    page_path: window.location.pathname,
    ...parameters,
  })
}

// Helpers so call-sites don't assemble parameter objects manually
export function trackNewsletterShown(): void {
  trackEvent(GA4_EVENTS.NEWSLETTER_MODAL_SHOWN)
}

export function trackNewsletterSubmitted(email: string): void {
  const domain = email.includes('@') ? email.split('@')[1] : 'unknown'
  trackEvent(GA4_EVENTS.NEWSLETTER_MODAL_SUBMITTED, { email_domain: domain })
}

export function trackNewsletterDismissed(timeOnPageMs: number): void {
  trackEvent(GA4_EVENTS.NEWSLETTER_MODAL_DISMISSED, {
    time_on_page: Math.round(timeOnPageMs / 1000),
  })
}

export function trackFloatingCtaClicked(scrollDepthPct: number): void {
  trackEvent(GA4_EVENTS.FLOATING_CTA_CLICKED, {
    scroll_depth: Math.round(scrollDepthPct),
  })
}

export function trackGitModalOpened(): void {
  trackEvent(GA4_EVENTS.GIT_MODAL_OPENED)
}

export function trackGitModalCtaClicked(): void {
  trackEvent(GA4_EVENTS.GIT_MODAL_CTA_CLICKED)
}

export function trackFormStarted(formName: string): void {
  trackEvent(GA4_EVENTS.FORM_STARTED, { form_name: formName })
}

export function trackFormCompleted(formName: string): void {
  trackEvent(GA4_EVENTS.FORM_COMPLETED, { form_name: formName })
}

export function trackServiceViewed(serviceName: string): void {
  trackEvent(GA4_EVENTS.SERVICE_VIEWED, { service_name: serviceName })
}

export function trackExperimentExposure(experimentId: string, variant: string): void {
  trackEvent(GA4_EVENTS.EXPERIMENT_EXPOSURE, {
    experiment_id: experimentId,
    variant,
  })
}

export function trackExperimentConversion(
  experimentId: string,
  variant: string,
  action: string,
): void {
  trackEvent(GA4_EVENTS.EXPERIMENT_CONVERSION, {
    experiment_id: experimentId,
    variant,
    action,
  })
}

export function trackBlogSearch(query: string, resultCount: number): void {
  trackEvent(GA4_EVENTS.BLOG_SEARCH, {
    query_length: query.trim().length,
    result_count: resultCount,
  })
}

// Extend the Window type so TypeScript knows about gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
