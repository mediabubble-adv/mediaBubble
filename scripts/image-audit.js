/**
 * Image Audit Script — MediaBubble
 *
 * Run in browser DevTools console on any page to identify image issues.
 * Reports: oversized files, missing alt text, missing lazy loading, low resolution.
 *
 * Usage:
 *   Copy-paste into the browser console, then call: auditImages()
 */

async function auditImages() {
  const images = Array.from(document.querySelectorAll('img'))
  const audit = { total: images.length, optimized: 0, unoptimized: 0, missingAlt: 0, issues: [] }

  await Promise.all(
    images.map(async (img) => {
      const issues = []

      // File size via HEAD request (best-effort — may be blocked by CORS)
      try {
        const res = await fetch(img.src, { method: 'HEAD' })
        const bytes = Number(res.headers.get('content-length') ?? 0)
        if (bytes > 250_000) {
          issues.push(`Large file: ${(bytes / 1024).toFixed(0)} KB (max 250 KB)`)
        }
      } catch {
        // CORS or network issue — skip size check for this image
      }

      // Alt text
      if (!img.alt || img.alt.trim() === '') {
        audit.missingAlt++
        issues.push('Missing alt text')
      }

      // Low resolution (skip icons and tiny UI elements)
      if (img.naturalWidth > 0 && img.naturalWidth < 400 && !img.classList.contains('icon')) {
        issues.push(`Low resolution: ${img.naturalWidth}×${img.naturalHeight}px`)
      }

      // Lazy loading (skip above-the-fold images that have priority/eager)
      if (!img.loading && img.getAttribute('loading') !== 'eager') {
        issues.push('No loading attribute (add loading="lazy" for below-fold images)')
      }

      // WebP/AVIF format
      const src = img.src || img.currentSrc || ''
      if (src && !/\.(webp|avif)(\?|$)/i.test(src)) {
        issues.push('Not using modern format (WebP/AVIF)')
      }

      if (issues.length === 0) {
        audit.optimized++
      } else {
        audit.unoptimized++
        audit.issues.push({ src: img.src.split('/').pop(), alt: img.alt || '(none)', issues })
      }
    })
  )

  console.group(`%c📸 Image Audit — ${audit.total} images`, 'font-weight:bold;font-size:14px')
  console.log(`✅ Optimized: ${audit.optimized}`)
  console.log(`⚠️  Issues found: ${audit.unoptimized}`)
  console.log(`🚫 Missing alt text: ${audit.missingAlt}`)
  if (audit.issues.length > 0) {
    console.table(audit.issues)
  }
  console.groupEnd()

  return audit
}

// Auto-run on load
if (document.readyState === 'complete') {
  auditImages()
} else {
  window.addEventListener('load', auditImages)
}

window.auditImages = auditImages
