import { render, screen } from '@testing-library/react'
import { OptimizedImage } from './OptimizedImage'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { src, alt, loading, sizes, priority, ...rest } = props
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === 'string' ? src : ''}
        alt={typeof alt === 'string' ? alt : ''}
        data-loading={loading}
        data-sizes={sizes}
        data-priority={priority ? 'true' : 'false'}
        {...rest}
      />
    )
  },
}))

describe('OptimizedImage', () => {
  it('lazy-loads by default with responsive sizes', () => {
    render(<OptimizedImage src="/test.webp" alt="Test" width={400} height={300} />)
    const img = screen.getByRole('img', { name: 'Test' })
    expect(img).toHaveAttribute('data-loading', 'lazy')
    expect(img.getAttribute('data-sizes')).toContain('100vw')
  })

  it('uses hero sizes and skips lazy loading when priority', () => {
    render(
      <OptimizedImage
        src="/hero.webp"
        alt="Hero"
        width={1200}
        height={800}
        variant="hero"
        priority
      />,
    )
    const img = screen.getByRole('img', { name: 'Hero' })
    expect(img.getAttribute('data-sizes')).toBe('100vw')
    expect(img).toHaveAttribute('data-priority', 'true')
  })
})
