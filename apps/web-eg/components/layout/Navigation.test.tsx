import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/layout/Navigation'

jest.mock('next/navigation', () => ({
  usePathname: () => '/about',
}))

describe('Navigation', () => {
  it('marks the active route', () => {
    render(
      <Navigation
        items={[
          { label: 'About', href: '/about' },
          { label: 'Blog', href: '/blog' },
        ]}
      />,
    )

    expect(screen.getByRole('link', { name: 'About' })).toHaveClass('text-brand-blue')
    expect(screen.getByRole('link', { name: 'Blog' })).not.toHaveClass('text-brand-blue')
  })
})
