/** ISR revalidation windows (seconds) for market apps. */
export const ISR_REVALIDATE_SECONDS = {
  /** Blog posts and listing — content updates frequently. */
  blog: 3600,
  /** Portfolio case studies — moderate update cadence. */
  portfolio: 3600,
  /** Service pages — stable marketing copy. */
  services: 86_400,
  /** Index/listing pages — refresh more often than detail pages. */
  listing: 1800,
} as const

export type IsrSegment = keyof typeof ISR_REVALIDATE_SECONDS
