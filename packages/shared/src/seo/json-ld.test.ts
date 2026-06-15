import { resolveMarketSiteConfig, buildMarketJsonLd, serializeJsonLd } from '../index'

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
