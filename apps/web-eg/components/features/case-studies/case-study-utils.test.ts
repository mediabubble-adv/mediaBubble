import { caseStudyAsset } from '@/lib/data/case-studies-paths'
import { getCaseStudyBySlug, CASE_STUDIES } from '@/lib/data/case-studies'

describe('portfolio paths', () => {
  it('builds local asset paths', () => {
    expect(caseStudyAsset('coral-bay', 'hero')).toBe('/assets/case-studies/coral-bay/hero.webp')
  })

  it('builds local asset paths for v2 assets', () => {
    expect(caseStudyAsset('coral-bay', 'hero', true)).toBe('/assets/case-studies/coral-bay/hero-v2.webp')
  })
})

describe('case studies', () => {
  it('has at least five portfolio entries with local images', () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(5)
    for (const cs of CASE_STUDIES) {
      expect(cs.heroImage).toMatch(/^\/assets\/case-studies\//)
      expect(cs.technologies.length).toBeGreaterThan(0)
      expect(cs.keyMetrics.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('resolves slug lookup', () => {
    const cs = getCaseStudyBySlug('coral-bay')
    expect(cs?.client).toBe('Coral Bay Resort')
    expect(cs?.beforeAfter?.before.src).toContain('before-v2.webp')
  })
})
