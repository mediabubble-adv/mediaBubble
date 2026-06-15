import { portfolioAsset } from '@/lib/data/portfolio-paths'
import { getCaseStudyBySlug, CASE_STUDIES } from '@/lib/data/case-studies'

describe('portfolio paths', () => {
  it('builds local asset paths', () => {
    expect(portfolioAsset('coral-bay', 'hero')).toBe('/assets/portfolio/coral-bay/hero.webp')
  })
})

describe('case studies', () => {
  it('has at least five portfolio entries with local images', () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(5)
    for (const cs of CASE_STUDIES) {
      expect(cs.heroImage).toMatch(/^\/assets\/portfolio\//)
      expect(cs.technologies.length).toBeGreaterThan(0)
      expect(cs.keyMetrics.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('resolves slug lookup', () => {
    const cs = getCaseStudyBySlug('coral-bay')
    expect(cs?.client).toBe('Coral Bay Resort')
    expect(cs?.beforeAfter?.before.src).toContain('before.webp')
  })
})
