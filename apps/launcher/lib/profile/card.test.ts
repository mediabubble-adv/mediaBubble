import { bioPreview } from './card'

describe('bioPreview', () => {
  it('returns null for empty bio', () => {
    expect(bioPreview(null)).toBeNull()
    expect(bioPreview('   ')).toBeNull()
  })

  it('returns full bio when under limit', () => {
    expect(bioPreview('Hello team')).toBe('Hello team')
  })

  it('truncates long bio with ellipsis', () => {
    const long = 'a'.repeat(150)
    const preview = bioPreview(long, 120)
    expect(preview).toHaveLength(120)
    expect(preview?.endsWith('…')).toBe(true)
  })
})
