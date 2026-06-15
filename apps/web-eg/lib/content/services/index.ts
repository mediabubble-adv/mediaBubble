import type { ServicePageConfig } from './types'
import { seoServiceConfig } from './seo'
import { ppcServiceConfig } from './ppc'
import { socialServiceConfig } from './social'
import { brandingServiceConfig } from './branding'
import { webServiceConfig } from './web'
import { contentServiceConfig } from './content'
import { eventsServiceConfig } from './events'

const REGISTRY: Partial<Record<string, ServicePageConfig>> = {
  seo: seoServiceConfig,
  ppc: ppcServiceConfig,
  social: socialServiceConfig,
  branding: brandingServiceConfig,
  web: webServiceConfig,
  content: contentServiceConfig,
  events: eventsServiceConfig,
}

export function getServicePageConfig(slug: string): ServicePageConfig | null {
  return REGISTRY[slug] ?? null
}

export function getRegistrySlugs(): string[] {
  return Object.keys(REGISTRY)
}

export type { ServicePageConfig, ServiceSectionId } from './types'
