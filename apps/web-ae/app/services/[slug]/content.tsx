'use client'

import { getServicePageConfig } from '@/lib/content/services'
import { ServicePageRenderer } from '@/components/features/services/ServicePageRenderer'

export function ServicePageContent({ slug }: { slug: string }) {
  const config = getServicePageConfig(slug)
  if (config) {
    return <ServicePageRenderer config={config} />
  }

  return null
}
