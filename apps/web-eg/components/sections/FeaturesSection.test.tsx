import React from 'react'
import { render, screen } from '@testing-library/react'
import { FeaturesSection } from './FeaturesSection'

jest.mock('@/lib/i18n/provider', () => ({
  useI18n: () => ({
    t: (_key: string, fallback: string) => fallback,
    dir: 'ltr' as const,
  }),
}))

describe('FeaturesSection', () => {
  it('renders the section heading', () => {
    render(<FeaturesSection />)
    expect(
      screen.getByRole('heading', {
        name: /Marketing for brands that need growth/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders four feature cards', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Strategy-first execution')).toBeInTheDocument()
    expect(screen.getByText('Full-service under one roof')).toBeInTheDocument()
    expect(screen.getByText('Results you can report on')).toBeInTheDocument()
    expect(screen.getByText('Local expertise, global standards')).toBeInTheDocument()
  })

  it('uses a list for features', () => {
    render(<FeaturesSection />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})
