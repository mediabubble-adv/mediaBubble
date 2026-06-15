'use client'

import { NewsletterModal } from './NewsletterModal'
import { FloatingCta } from '@/components/features/contact/FloatingCta'

/**
 * Mounts all Phase 1 global UI components once at the layout level.
 * GitModal is page-triggered — import and render it from individual pages.
 */
export function Phase1Provider() {
  return (
    <>
      <NewsletterModal />
      <FloatingCta />
    </>
  )
}
