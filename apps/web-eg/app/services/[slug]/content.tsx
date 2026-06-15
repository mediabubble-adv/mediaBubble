'use client'

import { getServicePageConfig } from '@/lib/content/services'
import { getService } from '@/lib/services-data'
import { ServicePageRenderer } from '@/components/features/services/ServicePageRenderer'
import { ServicePageTemplate } from '@/components/features/services/ServicePageTemplate'

export function ServicePageContent({ slug }: { slug: string }) {
  const config = getServicePageConfig(slug)
  if (config) {
    return <ServicePageRenderer config={config} />
  }

  const service = getService(slug)
  if (!service) {
    return null
  }

  return <ServicePageTemplate service={service} />
}
