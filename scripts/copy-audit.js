/**
 * Copy Audit Script — MediaBubble
 *
 * Run in browser DevTools console to find weak or generic copy.
 *
 * Usage:
 *   Copy-paste into the browser console, then call: window.copyAudit()
 */

const GENERIC_HEADINGS = [
  'welcome to our website',
  'our services',
  'learn more',
  'professional services',
  'about us',
  'contact us',
  'get in touch',
  'click here',
]

const WEAK_CTAS = [
  'submit',
  'click here',
  'more info',
  'read more',
  'learn more',
  'go',
]

const META_DESC_MIN = 120
const META_DESC_MAX = 160

function auditCopy() {
  const audit = {
    genericHeadings:      [],
    weakCTAs:             [],
    shortMetaDescription: null,
    longMetaDescription:  null,
    missingH1:            false,
    multipleH1:           false,
  }

  // Headings
  document.querySelectorAll('h1, h2, h3').forEach(h => {
    const text = h.textContent?.trim().toLowerCase() ?? ''
    if (GENERIC_HEADINGS.some(g => text.includes(g))) {
      audit.genericHeadings.push({ tag: h.tagName, current: h.textContent?.trim(), suggestion: 'Replace with benefit-driven, specific copy' })
    }
  })

  // CTAs
  document.querySelectorAll('button, [role="button"], a[class*="cta"], a[class*="btn"]').forEach(el => {
    const text = el.textContent?.trim().toLowerCase() ?? ''
    if (WEAK_CTAS.some(w => text === w || text.startsWith(w + ' '))) {
      audit.weakCTAs.push({ current: el.textContent?.trim(), suggestion: 'Use action-oriented benefit copy, e.g. "Get Your Free Audit"' })
    }
  })

  // Meta description
  const meta = document.querySelector('meta[name="description"]')
  if (meta) {
    const len = meta.getAttribute('content')?.length ?? 0
    if (len < META_DESC_MIN) audit.shortMetaDescription = { length: len, content: meta.getAttribute('content'), suggestion: `Expand to ${META_DESC_MIN}–${META_DESC_MAX} chars` }
    if (len > META_DESC_MAX) audit.longMetaDescription  = { length: len, content: meta.getAttribute('content'), suggestion: `Trim to ≤${META_DESC_MAX} chars to avoid truncation` }
  } else {
    audit.shortMetaDescription = { length: 0, content: null, suggestion: 'Add a meta description tag' }
  }

  // H1 count
  const h1s = document.querySelectorAll('h1')
  audit.missingH1  = h1s.length === 0
  audit.multipleH1 = h1s.length > 1

  // Report
  console.group('%c✍️  Copy Audit', 'font-weight:bold;font-size:14px')
  console.log(`Generic headings:  ${audit.genericHeadings.length}`)
  console.log(`Weak CTAs:         ${audit.weakCTAs.length}`)
  console.log(`Missing H1:        ${audit.missingH1}`)
  console.log(`Multiple H1:       ${audit.multipleH1}`)
  console.log(`Meta description:  ${audit.shortMetaDescription ? '⚠️ short/missing' : audit.longMetaDescription ? '⚠️ too long' : '✅ ok'}`)
  if (audit.genericHeadings.length) { console.group('Generic headings'); console.table(audit.genericHeadings); console.groupEnd() }
  if (audit.weakCTAs.length)        { console.group('Weak CTAs');         console.table(audit.weakCTAs);        console.groupEnd() }
  if (audit.shortMetaDescription)   console.log('Meta description (short):', audit.shortMetaDescription)
  if (audit.longMetaDescription)    console.log('Meta description (long):',  audit.longMetaDescription)
  console.groupEnd()

  return audit
}

window.copyAudit = auditCopy
auditCopy()
