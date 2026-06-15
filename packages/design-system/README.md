# @mediabubble/design-system

MediaBubble UI primitives and Tailwind preset — **v1.0.0**.

## Install

Workspace apps depend on this package via the monorepo. Peer dependencies: `react`, `react-dom`, `tailwindcss`, `lucide-react`.

## Tailwind preset

```js
// tailwind.config.js
const { mbPreset } = require('@mediabubble/design-system/tailwind-preset')

module.exports = {
  presets: [mbPreset],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
}
```

The preset includes brand colors, typography scale, section spacing tokens, and `darkMode: ['class']`.

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary actions — variants: `primary`, `secondary`, `outline`, `ghost`, `hero-outline` |
| `getButtonClasses` | Shared class helper for Next.js `Link` CTAs |
| `Card` | Surface container with optional hover lift |
| `Input` | Labelled text field with error/hint |
| `Badge` | Status / label chips |
| `SectionHeader` | Kicker + title + intro block |
| `ServiceCard`, `FeatureCard`, `TestimonialCard`, `CaseStudyCard` | Marketing patterns |
| `MasterSwatch` | Brand color reference (dev/docs) |

### Button + Link

```tsx
import Link from 'next/link'
import { getButtonClasses } from '@mediabubble/design-system'

<Link href="/contact" className={getButtonClasses('primary', 'lg')}>
  Get started
</Link>
```

### Card

```tsx
import { Card } from '@mediabubble/design-system'

<Card hover>
  <h3>Title</h3>
  <p>Body copy</p>
</Card>
```

## Dark mode

Primitives include `dark:` variants where relevant. Apps toggle the `dark` class on `<html>` via `@mediabubble/shared` `ThemeProvider` and `ThemeToggle`.

## Build

```bash
npm run build -w @mediabubble/design-system
```
