import { resolveMarketSiteConfig, buildMarketJsonLd, serializeJsonLd, buildInsightPostJsonLd, buildCaseStudyJsonLd } from '../index'

describe('buildMarketJsonLd', () => {
  const site = resolveMarketSiteConfig('eg')

  it('builds a schema.org graph with business and website nodes', () => {
    const graph = buildMarketJsonLd(site, {
      slogan: "Hurghada's #1 Marketing Agency",
      businessDescription: 'Test business description',
      websiteDescription: 'Test website description',
      areaServed: [{ '@type': 'City', name: 'Hurghada' }],
      geo: { '@type': 'GeoCoordinates', latitude: 27.2579, longitude: 33.8116 },
    })

    expect(graph['@context']).toBe('https://schema.org')
    expect(graph['@graph']).toHaveLength(2)
    expect(graph['@graph'][0]['@type']).toContain('LocalBusiness')
    expect(graph['@graph'][1]['@type']).toBe('WebSite')
    expect(graph['@graph'][0].telephone).toBe(site.phone)
  })

  it('escapes dangerous characters when serializing', () => {
    const graph = buildMarketJsonLd(site, {
      slogan: 'Test <script>',
      businessDescription: 'A & B',
      websiteDescription: 'Site > home',
      areaServed: [{ '@type': 'City', name: 'Hurghada' }],
      geo: { '@type': 'GeoCoordinates', latitude: 1, longitude: 2 },
    })

    const serialized = serializeJsonLd(graph)
    expect(serialized).not.toContain('<script>')
    expect(serialized).toContain('\\u003c')
    expect(serialized).toContain('\\u0026')
  })
})

describe('buildInsightPostJsonLd', () => {
  const siteUrl = 'https://mediabubble.co'

  it('builds a correct BlogPosting schema', () => {
    const ld = buildInsightPostJsonLd({
      slug: 'seo-tips',
      title: 'SEO Tips',
      description: 'Useful SEO tips',
      datePublished: '2026-06-15',
      imageUrl: '/assets/insights-img.jpg',
    }, siteUrl)

    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('BlogPosting')
    expect(ld.headline).toBe('SEO Tips')
    expect(ld.mainEntityOfPage['@id']).toBe('https://mediabubble.co/seo-tips')
    expect(ld.image).toBe('https://mediabubble.co/assets/insights-img.jpg')
    expect(ld.author.name).toBe('MediaBubble')
  })
})

describe('buildCaseStudyJsonLd', () => {
  const siteUrl = 'https://mediabubble.co'

  it('builds a correct CreativeWork schema for case studies', () => {
    const ld = buildCaseStudyJsonLd({
      slug: '/case-studies/coral-bay',
      title: 'Coral Bay Case Study',
      description: 'Case study details',
      clientName: 'Coral Bay',
      technologies: ['SEO', 'Next.js'],
    }, siteUrl)

    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('CreativeWork')
    expect(ld.name).toBe('Coral Bay Case Study')
    expect(ld.customer.name).toBe('Coral Bay')
    expect(ld.genre).toBe('Case Study')
    expect(ld.about).toHaveLength(2)
    expect(ld.about[0].name).toBe('SEO')
  })
})
