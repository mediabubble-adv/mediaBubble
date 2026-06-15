# Build Pipeline — RTL & Bilingual App Configuration

## Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const config: NextConfig = {
  // Ensure i18n locales are handled
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Headers for font caching
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
}

export default withNextIntl(config)
```

## Tailwind CSS Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
    },
  },
  future: {
    // Enable RTL logical property by default for v4 compatibility
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}

export default config
```

**Note:** Tailwind CSS v3.4+ handles `rtl:` and `ltr:` prefixes natively. No additional plugins needed. Use `ms-*`/`me-*` for margin, `ps-*`/`pe-*` for padding, `start-*`/`end-*` for positioning, and `text-start`/`text-end` for alignment.

## PostCSS Configuration

```typescript
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
  },
}

export default config
```

No RTL-specific PostCSS plugin is needed — logical CSS properties handle direction natively, and Tailwind's `rtl:` prefix provides theme-level control.

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/i18/*": ["./i18n/*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

## Bundle Analysis

### Content Breakdown by Locale

| Asset | English Page | Arabic Page | Notes |
|-------|-------------|-------------|-------|
| Font CSS | Inter (Latin) | Cairo (Arabic + Latin) | Arabic page loads more font data |
| Translation JSON | en.json (~2KB) | ar-EG.json (~2.5KB) | Arabic text is ~25% longer |
| Component JS | Identical | Identical | Same components, different dir |
| Images | Same | Same | Locale-independent |

### Optimization Targets

| Metric | Target | Arabic-Specific Concern |
|--------|--------|------------------------|
| JavaScript bundle | < 150KB gzipped | Same as English |
| CSS bundle | < 30KB gzipped | Logical properties add minimal overhead |
| Font (Arabic) | < 60KB woff2 | Variable font subset achieves this |
| Font (Latin) | < 40KB woff2 | Inter + Poppins combined |
| Total page weight | < 300KB | Arabic font is the main addition |

## Build Commands

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint && tsc --noEmit",
    "test:e2e": "playwright test",
    "test:rtl": "playwright test e2e/rtl-*.spec.ts",
    "analyze:bundle": "ANALYZE=true next build",
    "audit:fonts": "node scripts/audit-fonts.mjs"
  }
}
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,ar-EG
NEXT_PUBLIC_ARABIC_FONT_WEIGHTS=400,600,700,800,900
```

## Deployment Considerations

| Factor | Arabic-Specific |
|--------|----------------|
| CDN | Font files on CDN with immutable cache (1 year) |
| Edge functions | Middleware handles locale detection at edge |
| Static generation | Generate both locale versions at build time |
| ISR | Revalidate both locale versions together |
| Hosting region | Consider Middle East region (Bahrain/Arabian Gulf) for lower latency |

## Performance Budget

```yaml
performance_budget:
  lighthouse_score:
    mobile_performance: 85+
    mobile_accessibility: 95+
    seo: 95+
  metrics:
    lcp: < 2.5s (Arabic pages)
    fcp: < 1.5s
    tbt: < 200ms
    cls: < 0.1
  font_loading:
    cairo_variable: < 60KB woff2
    time_to_rendered_arabic: < 1s
```
