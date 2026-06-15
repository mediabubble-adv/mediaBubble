import { createCspMiddleware } from '../../packages/shared/csp-middleware.cjs'

export const middleware = createCspMiddleware({ analytics: true })

/** Must be inlined — Next.js cannot analyze imported matcher constants. */
export const config = {
  matcher: [
    {
      source:
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
