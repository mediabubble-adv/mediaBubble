# RTL Testing — Visual Regression & Content Rendering

## Testing Strategy

### What to Test

| Test Category | What It Covers | Priority |
|--------------|----------------|----------|
| Direction rendering | `dir` attribute, layout direction | Critical |
| Logical properties | CSS logical properties work in both directions | Critical |
| Font rendering | Arabic glyphs display correctly, no tofu | High |
| Content overflow | Arabic text doesn't overflow containers | High |
| Icon direction | Directional icons mirror in RTL | High |
| Form behavior | Input cursor starts on correct side | Medium |
| Component layout | Cards, nav, tables, accordions reverse correctly | Medium |
| Keyboard navigation | Tab order correct in both directions | Medium |
| Screen reader | Arabic content read correctly | Medium |
| Print layout | Print direction correct for Arabic | Low |

## Playwright RTL Tests

### Setup

```typescript
// e2e/rtl-setup.ts
import { test as base } from '@playwright/test'

export const test = base.extend({
  rtlPage: async ({ page }, use) => {
    // Navigate to Arabic version
    await page.goto('/ar-EG')
    await page.waitForLoadState('networkidle')
    await use(page)
  },

  ltrPage: async ({ page }, use) => {
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    await use(page)
  },
})
```

### Direction Tests

```typescript
// e2e/rtl-direction.spec.ts
import { expect } from '@playwright/test'
import { test } from './rtl-setup'

test('Arabic page has dir="rtl" on html', async ({ rtlPage }) => {
  const dir = await rtlPage.locator('html').getAttribute('dir')
  expect(dir).toBe('rtl')
})

test('English page has dir="ltr" on html', async ({ ltrPage }) => {
  const dir = await ltrPage.locator('html').getAttribute('dir')
  expect(dir).toBe('ltr')
})

test('Arabic html has lang="ar-EG"', async ({ rtlPage }) => {
  const lang = await rtlPage.locator('html').getAttribute('lang')
  expect(lang).toBe('ar-EG')
})
```

### Layout Visual Tests

```typescript
// e2e/rtl-layout.spec.ts
import { expect } from '@playwright/test'
import { test } from './rtl-setup'

test('logo is on opposite side from nav in RTL', async ({ rtlPage, ltrPage }) => {
  // Check logo position in RTL
  const rtlLogoBox = await rtlPage.locator('nav a:first-child').boundingBox()
  const rtlNavBox = await rtlPage.locator('nav ul').boundingBox()
  // In RTL, logo should be on the right, nav on the left
  expect(rtlLogoBox!.x).toBeGreaterThan(rtlNavBox!.x)

  // Check logo position in LTR
  const ltrLogoBox = await ltrPage.locator('nav a:first-child').boundingBox()
  const ltrNavBox = await ltrPage.locator('nav ul').boundingBox()
  // In LTR, logo should be on the left, nav on the right
  expect(ltrLogoBox!.x).toBeLessThan(ltrNavBox!.x)
})

test('text aligns to start in both directions', async ({ rtlPage, ltrPage }) => {
  const rtlText = rtlPage.locator('h1').first()
  const ltrText = ltrPage.locator('h1').first()

  // Verify computed text-align
  const rtlAlign = await rtlText.evaluate(el => getComputedStyle(el).textAlign)
  const ltrAlign = await ltrText.evaluate(el => getComputedStyle(el).textAlign)

  // In LTR, text-align: start = left; in RTL, text-align: start = right
  // Both should be "start" to prove we're using logical properties
  expect(rtlAlign).toBe('start')
  expect(ltrAlign).toBe('start')
})
```

### Icon Direction Tests

```typescript
// e2e/rtl-icons.spec.ts
import { expect } from '@playwright/test'
import { test } from './rtl-setup'

test('navigation chevrons point opposite directions in RTL vs LTR', async ({ rtlPage, ltrPage }) => {
  // Check "next" button icon transform
  const rtlNextIcon = rtlPage.locator('.carousel button:last-child svg')
  const ltrNextIcon = ltrPage.locator('.carousel button:last-child svg')

  const rtlTransform = await rtlNextIcon.evaluate(el => getComputedStyle(el).transform)
  const ltrTransform = await ltrNextIcon.evaluate(el => getComputedStyle(el).transform)

  // ScaleX should be flipped
  expect(rtlTransform).not.toBe(ltrTransform)
})
```

### Content Overflow Tests

```typescript
// e2e/rtl-overflow.spec.ts
import { expect } from '@playwright/test'
import { test } from './rtl-setup'

test('Arabic text does not overflow its container', async ({ rtlPage }) => {
  // Get all text-containing elements and check overflow
  const textElements = rtlPage.locator('p, h1, h2, h3, a, button, span, li, label, td, th')

  const overflowCount = await textElements.evaluateAll((elements) => {
    return elements.filter(el => {
      const parent = el.parentElement
      if (!parent) return false
      const parentRect = parent.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      return elRect.width > parentRect.width || elRect.right > parentRect.right
    }).length
  })

  expect(overflowCount).toBe(0)
})

test('Arabic text truncation shows ellipsis on correct side', async ({ rtlPage }) => {
  const truncated = rtlPage.locator('.truncate').first()
  const overflow = await truncated.evaluate(el => getComputedStyle(el).textOverflow)
  expect(overflow).toBe('ellipsis')
  // In RTL, ellipsis should appear on the left side
  const direction = await truncated.evaluate(el => getComputedStyle(el).direction)
  if (direction === 'rtl') {
    // Text-overflow: ellipsis in RTL shows dots on the left
    // This is browser-native behavior, just verify it doesn't break
    const scrollWidth = await truncated.evaluate(el => el.scrollWidth)
    const clientWidth = await truncated.evaluate(el => el.clientWidth)
    expect(scrollWidth).toBeGreaterThan(clientWidth) // is actually truncated
  }
})
```

### Font Rendering Tests

```typescript
// e2e/rtl-fonts.spec.ts
import { expect } from '@playwright/test'
import { test } from './rtl-setup'

test('Arabic text renders in Cairo font', async ({ rtlPage }) => {
  const arabicText = rtlPage.locator('p').filter({ hasText: /[ء-ي]/ }).first()
  const fontFamily = await arabicText.evaluate(el => getComputedStyle(el).fontFamily)
  expect(fontFamily.toLowerCase()).toContain('cairo')
})

test('English text renders in Inter or Poppins', async ({ ltrPage }) => {
  const englishText = ltrPage.locator('p').first()
  const fontFamily = await englishText.evaluate(el => getComputedStyle(el).fontFamily)
  expect(fontFamily.toLowerCase()).toContain('inter')
})

test('No tofu characters in Arabic content', async ({ rtlPage }) => {
  // Tofu (□) appears when glyphs are missing
  const body = await rtlPage.locator('body').textContent()
  expect(body).not.toContain('□')
  expect(body).not.toContain('�')  // replacement character
})
```

### Visual Regression Tests

```typescript
// e2e/rtl-screenshots.spec.ts
import { expect } from '@playwright/test'
import { test } from './rtl-setup'

test('RTL homepage matches expected layout', async ({ rtlPage }) => {
  await expect(rtlPage).toHaveScreenshot('ar-homepage.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  })
})

test('RTL and LTR layouts are mirrored', async ({ rtlPage, ltrPage }) => {
  // Take screenshots of comparable elements
  const rtlScreenshot = await rtlPage.locator('nav').screenshot()
  const ltrScreenshot = await ltrPage.locator('nav').screenshot()

  // They should NOT match (they're mirrored)
  // This test passes if screenshots differ
  expect(rtlScreenshot).not.toEqual(ltrScreenshot)
})
```

## Manual Testing Checklist

### Quick Visual Check (5 min)
- [ ] Flip between LTR and RTL — does layout mirror correctly?
- [ ] Arabic text reads right-to-left
- [ ] English text reads left-to-right within Arabic pages
- [ ] No overlapping text boxes
- [ ] All icons that represent direction point correctly
- [ ] Forms: labels on right, input cursor on right

### Cross-Browser Check
- [ ] Chrome (most common Egyptian browser)
- [ ] Safari (iOS — 2nd most common in Egypt)
- [ ] Firefox (desktop)
- [ ] Samsung Internet (common on Android)
- [ ] Chrome on Android

### Device Check
- [ ] Desktop (1920×1080)
- [ ] Laptop (1366×768)
- [ ] Tablet (768×1024)
- [ ] Mobile (375×667)

## Automated CI Integration

```yaml
# .github/workflows/rtl-tests.yml
name: RTL Tests
on: [deployment]
jobs:
  rtl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npx playwright install
      - run: npx playwright test e2e/rtl-*.spec.ts
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: rtl-test-screenshots
          path: test-results/
```
