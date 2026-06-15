import type { MetadataRoute } from 'next'
import { resolveMarketSiteConfig } from '@mediabubble/shared/server'
import { CASE_STUDIES } from '@/lib/data/case-studies'
import { BLOG_POSTS } from '@/lib/data/blog-posts'
import { getRegistrySlugs } from '@/lib/content/services'
import { SERVICE_SLUGS } from '@/lib/services-data'

const site = resolveMarketSiteConfig('eg')
const BASE = site.siteUrl

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const allServiceSlugs = Array.from(new Set([...SERVICE_SLUGS, ...getRegistrySlugs()]))
  const serviceRoutes: MetadataRoute.Sitemap = allServiceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/portfolio/${cs.id}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes]
}
