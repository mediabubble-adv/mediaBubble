const { buildNextImageConfig } = require('./next-image-config.cjs')
const { buildPwaConfig } = require('./next-pwa-config.cjs')

describe('buildNextImageConfig', () => {
  it('enables AVIF/WebP and responsive breakpoints', () => {
    const config = buildNextImageConfig()
    expect(config.formats).toEqual(['image/avif', 'image/webp'])
    expect(config.deviceSizes).toContain(640)
    expect(config.deviceSizes).toContain(1920)
    expect(config.minimumCacheTTL).toBeGreaterThan(0)
    expect(config.remotePatterns?.length).toBeGreaterThan(0)
  })
})

describe('buildPwaConfig', () => {
  it('registers offline fallback and runtime caches', () => {
    const config = buildPwaConfig({ offlinePath: '/offline' })
    expect(config.fallbacks.document).toBe('/offline')
    expect(config.disable).toBe(process.env.NODE_ENV === 'development')
    expect(config.workboxOptions.runtimeCaching.length).toBeGreaterThanOrEqual(3)
  })
})
