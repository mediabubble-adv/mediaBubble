import Image, { type ImageProps } from 'next/image'
import {
  DEFAULT_RESPONSIVE_IMAGE_SIZES,
  HERO_IMAGE_SIZES,
  THUMBNAIL_IMAGE_SIZES,
} from '@mediabubble/shared/client'

export { DEFAULT_RESPONSIVE_IMAGE_SIZES, HERO_IMAGE_SIZES, THUMBNAIL_IMAGE_SIZES }

export type OptimizedImageProps = Omit<ImageProps, 'sizes'> & {
  /** Responsive `sizes` preset; defaults to grid/card layout. */
  sizes?: ImageProps['sizes']
  variant?: 'responsive' | 'hero' | 'thumbnail'
}

/**
 * Next.js Image wrapper with AVIF/WebP (via next.config), responsive `sizes`,
 * and lazy loading by default (use `priority` for LCP images).
 */
export function OptimizedImage({
  variant = 'responsive',
  sizes,
  alt,
  priority,
  loading,
  ...props
}: OptimizedImageProps) {
  const resolvedSizes =
    sizes ??
    (variant === 'hero'
      ? HERO_IMAGE_SIZES
      : variant === 'thumbnail'
        ? THUMBNAIL_IMAGE_SIZES
        : DEFAULT_RESPONSIVE_IMAGE_SIZES)

  return (
    <Image
      {...props}
      alt={alt}
      sizes={resolvedSizes}
      priority={priority}
      loading={priority ? undefined : (loading ?? 'lazy')}
    />
  )
}
