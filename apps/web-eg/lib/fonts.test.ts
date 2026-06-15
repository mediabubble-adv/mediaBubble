jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Poppins: () => ({ variable: '--font-poppins' }),
  JetBrains_Mono: () => ({ variable: '--font-mono' }),
  Cairo: () => ({ variable: '--font-cairo' }),
}))

import { FONT_LOAD_STRATEGY, rootFontClassName } from './fonts'

describe('fonts', () => {
  it('includes CSS variables for all font families', () => {
    expect(rootFontClassName).toContain('--font-inter')
    expect(rootFontClassName).toContain('--font-poppins')
    expect(rootFontClassName).toContain('--font-mono')
    expect(rootFontClassName).toContain('--font-cairo')
  })

  it('defers non-critical fonts until needed', () => {
    expect(FONT_LOAD_STRATEGY.preloaded).toEqual(['inter', 'poppins'])
    expect(FONT_LOAD_STRATEGY.lazy).toEqual(['jetbrainsMono', 'cairo'])
  })
})
