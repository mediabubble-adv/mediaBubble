import { render, screen, fireEvent } from '@testing-library/react'
import { CaseStudiesGrid } from './CaseStudiesGrid'

jest.mock('@/lib/i18n/provider', () => ({
  useI18n: () => ({
    t: (_key: string, fallback: string) => fallback,
    dir: 'ltr',
  }),
}))

describe('CaseStudiesGrid', () => {
  it('renders all case studies by default', () => {
    render(<CaseStudiesGrid />)
    expect(screen.getByText('How Coral Bay Resort Grew Direct Bookings by 68%')).toBeInTheDocument()
    expect(screen.getByText('Hurghada Rentals: From 8s Load Time to 94 Lighthouse Score')).toBeInTheDocument()
  })

  it('filters case studies by category tag', () => {
    render(<CaseStudiesGrid />)
    fireEvent.click(screen.getByRole('tab', { name: 'Social Media Marketing' }))
    expect(screen.getByText('Desert Rose Hotel: 4.8× Instagram Engagement')).toBeInTheDocument()
    expect(screen.queryByText('How Coral Bay Resort Grew Direct Bookings by 68%')).not.toBeInTheDocument()
  })
})
