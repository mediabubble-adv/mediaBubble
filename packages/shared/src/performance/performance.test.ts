import { ISR_REVALIDATE_SECONDS } from './isr'
import {
  DEFAULT_RESPONSIVE_IMAGE_SIZES,
  HERO_IMAGE_SIZES,
  THUMBNAIL_IMAGE_SIZES,
} from './image'

describe('ISR_REVALIDATE_SECONDS', () => {
  it('uses sensible revalidation windows per segment', () => {
    expect(ISR_REVALIDATE_SECONDS.blog).toBe(3600)
    expect(ISR_REVALIDATE_SECONDS.portfolio).toBe(3600)
    expect(ISR_REVALIDATE_SECONDS.services).toBe(86_400)
    expect(ISR_REVALIDATE_SECONDS.listing).toBe(1800)
    expect(ISR_REVALIDATE_SECONDS.listing).toBeLessThan(ISR_REVALIDATE_SECONDS.blog)
  })
})

describe('responsive image sizes', () => {
  it('exports preset size strings for OptimizedImage', () => {
    expect(DEFAULT_RESPONSIVE_IMAGE_SIZES).toContain('100vw')
    expect(HERO_IMAGE_SIZES).toBe('100vw')
    expect(THUMBNAIL_IMAGE_SIZES).toContain('96px')
  })
})
