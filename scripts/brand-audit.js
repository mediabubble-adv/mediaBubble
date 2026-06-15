/**
 * Brand Consistency Audit Script — MediaBubble
 *
 * Run in browser DevTools console to check brand compliance on any page.
 *
 * Usage:
 *   Copy-paste into the browser console, then call: window.brandAudit.audit()
 */

const brandStandards = {
  colors: {
    yellow:   '#ffc107',
    blue:     '#2196f3',
    navy:     '#072a6b',
    charcoal: '#333333',
    canvas:   '#fafafa',
  },
  typography: {
    display: ['Poppins'],
    body:    ['Inter'],
    mono:    ['JetBrains Mono'],
  },
  spacing: {
    unit: 8, // all spacing should be multiples of 8px
  },
}

// Convert computed rgb(...) to lowercase hex for comparison
function rgbToHex(rgb) {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (!match) return rgb.toLowerCase()
  return '#' + [match[1], match[2], match[3]]
    .map(n => parseInt(n).toString(16).padStart(2, '0'))
    .join('')
}

function auditColors() {
  const results = { passes: 0, failures: 0, details: [] }
  const ctaBtns = document.querySelectorAll(
    'a[class*="bg-brand-yellow"], button[class*="bg-brand-yellow"], [data-ripple]',
  )

  ctaBtns.forEach(btn => {
    const bg = rgbToHex(window.getComputedStyle(btn).backgroundColor)
    if (bg !== brandStandards.colors.yellow && bg !== '#ffb300') {
      results.failures++
      results.details.push({ element: btn.tagName, issue: 'CTA not using brand yellow', actual: bg, expected: brandStandards.colors.yellow })
    } else {
      results.passes++
    }
  })

  return results
}

function auditTypography() {
  const results = { passes: 0, failures: 0, details: [] }
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')

  headings.forEach(h => {
    const family = window.getComputedStyle(h).fontFamily
    const ok = brandStandards.typography.display.some(f => family.includes(f)) ||
               brandStandards.typography.body.some(f => family.includes(f))
    if (!ok) {
      results.failures++
      results.details.push({ element: `${h.tagName}: ${h.textContent?.slice(0, 40)}`, issue: 'Off-brand font', actual: family.split(',')[0].trim() })
    } else {
      results.passes++
    }
  })

  return results
}

function auditSpacing() {
  const results = { passes: 0, failures: 0, details: [] }
  const sections = document.querySelectorAll('section, [class*="py-"], [class*="px-"]')
  const unit = brandStandards.spacing.unit

  sections.forEach(el => {
    const pt = parseInt(window.getComputedStyle(el).paddingTop)
    if (pt > 0 && pt % unit !== 0) {
      results.failures++
      results.details.push({ element: el.tagName + (el.id ? `#${el.id}` : ''), issue: `Padding-top ${pt}px not a multiple of ${unit}px` })
    } else if (pt > 0) {
      results.passes++
    }
  })

  return results
}

function auditElements() {
  return {
    logoPresent:              document.querySelectorAll('[alt*="MediaBubble"], [alt*="logo"], [src*="logo"]').length > 0,
    navPresent:               !!document.querySelector('nav'),
    footerPresent:            !!document.querySelector('footer'),
    metaDescriptionPresent:   !!document.querySelector('meta[name="description"]'),
    altTextMissing:           document.querySelectorAll('img:not([alt])').length,
    focusRingsPresent:        !!document.querySelector('[class*="focus-visible"]'),
  }
}

function auditBrandConsistency() {
  const colors     = auditColors()
  const typography = auditTypography()
  const spacing    = auditSpacing()
  const elements   = auditElements()

  const totalPasses   = colors.passes + typography.passes + spacing.passes
  const totalFailures = colors.failures + typography.failures + spacing.failures
  const score         = totalPasses + totalFailures > 0
    ? Math.round((totalPasses / (totalPasses + totalFailures)) * 100)
    : 100

  console.group(`%c🎨 Brand Audit — Score: ${score}%`, 'font-weight:bold;font-size:14px')
  console.log(`Colors:     ${colors.passes} pass / ${colors.failures} fail`)
  console.log(`Typography: ${typography.passes} pass / ${typography.failures} fail`)
  console.log(`Spacing:    ${spacing.passes} pass / ${spacing.failures} fail`)
  console.log('Elements:', elements)

  if (colors.details.length)     { console.group('Color issues');     console.table(colors.details);     console.groupEnd() }
  if (typography.details.length) { console.group('Typography issues'); console.table(typography.details); console.groupEnd() }
  if (spacing.details.length)    { console.group('Spacing issues');    console.table(spacing.details);    console.groupEnd() }
  console.groupEnd()

  return { score, colors, typography, spacing, elements, timestamp: new Date().toISOString() }
}

window.brandAudit = { audit: auditBrandConsistency, standards: brandStandards }
auditBrandConsistency()
