# MediaBubble Component Library

All components live in `components/ui/` and use Tailwind CSS with the project's `brand-*` design tokens.

---

## Design Tokens

| Token                  | Value     | Use                       |
| ---------------------- | --------- | ------------------------- |
| `brand-yellow`         | `#FFC107` | Primary CTA, accents      |
| `brand-navy`           | `#072A6B` | Primary text, backgrounds |
| `brand-blue`           | `#1565C0` | Links, kicker text        |
| `brand-canvas`         | `#F8F9FA` | Section backgrounds       |
| `brand-secondary`      | `#555F6D` | Body copy                 |
| `brand-whisper-border` | `#EBEBEB` | Card borders              |

---

## Button

**File:** `components/ui/Button.tsx`

### Variants

| Variant     | When to use                         |
| ----------- | ----------------------------------- |
| `primary`   | Main CTA (yellow background)        |
| `secondary` | Supporting action (navy background) |
| `outline`   | Alternative / low-emphasis          |
| `ghost`     | In-context link-style action        |

### Sizes

| Size             | Padding       | Use                 |
| ---------------- | ------------- | ------------------- |
| `sm`             | `px-4 py-2`   | Inline, compact UIs |
| `md` _(default)_ | `px-5 py-2.5` | Standard usage      |
| `lg`             | `px-8 py-4`   | Hero, CTA sections  |

### Props

```ts
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  // + all native <button> HTML attributes
}
```

### Usage

```tsx
import { Button } from '@/components/ui/Button'

// Primary CTA
<Button variant="primary" size="lg">Get Free Audit</Button>

// Loading state
<Button variant="primary" loading>Sending…</Button>

// Disabled
<Button variant="secondary" disabled>Unavailable</Button>

// Ghost — in-text action
<Button variant="ghost" size="sm">Learn more</Button>
```

### Accessibility

- Automatically sets `disabled` attribute when `loading={true}`
- `focus-visible` ring uses `brand-yellow` for keyboard nav
- Button ripple effect fires via `data-ripple` attribute (wired globally by `Phase3Provider`)

### Do's and Don'ts

✅ Use `primary` for the single most important action per view  
✅ Use `size="lg"` in hero sections only  
❌ Don't use more than one `primary` button per section  
❌ Don't use `ghost` for primary actions

---

## SectionHeader

**File:** `components/ui/SectionHeader.tsx`

Renders a kicker label, `<h2>` title, and optional intro paragraph.

### Props

```ts
interface SectionHeaderProps {
  kicker?: string; // Small uppercase label above the title
  title: React.ReactNode;
  intro?: string; // Paragraph below the title
  align?: "left" | "center"; // default: 'left'
  light?: boolean; // true = white text (for dark backgrounds)
  className?: string;
}
```

### Usage

```tsx
import { SectionHeader } from '@/components/ui/SectionHeader'

// Standard (light background)
<SectionHeader
  kicker="What We Do"
  title="Everything Your Business Needs to Grow Online"
  intro="From SEO to branding — we cover every channel that moves the needle."
/>

// Centred hero-section header
<SectionHeader
  kicker="Our Work"
  title="Results That Speak for Themselves"
  align="center"
/>

// On dark (navy) background
<SectionHeader
  kicker="Process"
  title="How We Work"
  intro="A clear, repeatable system for every engagement."
  light
/>
```

### Responsive behaviour

The `h2` scales from `28px` (mobile) → `34px` (sm) → `40px` (lg) via Tailwind responsive classes.

### Do's and Don'ts

✅ Always include a `kicker` — it anchors the section  
✅ Keep `intro` to 1–2 sentences  
❌ Don't use as a page `<h1>` — this is section-level  
❌ Don't nest `SectionHeader` inside another heading

---

## Cards

**File:** `components/ui/Card.tsx`

Four card types for distinct content patterns.

---

### ServiceCard

Icon + title + description. Optional `href` makes it a link.

```tsx
import { ServiceCard } from "@/components/ui/Card";
import { Search } from "lucide-react";

<ServiceCard
  icon={<Search size={22} />}
  title="SEO & Organic Growth"
  description="Rank on the first page of Google and turn searchers into customers."
  href="/services/seo"
/>;
```

**Accessibility:** When `href` is provided the card renders as `<a>` — ensure the `title` is descriptive enough to stand alone as link text.

---

### FeatureCard

Checkmark + feature name + optional description. Use in feature lists.

```tsx
import { FeatureCard } from "@/components/ui/Card";

<FeatureCard
  feature="Monthly performance reports"
  description="Transparent data delivered every 30 days, no fluff."
/>;
```

---

### TestimonialCard

5-star rating, blockquote, author with optional avatar.

```tsx
import { TestimonialCard } from "@/components/ui/Card";

<TestimonialCard
  quote="MediaBubble doubled our bookings in 4 months. Best investment we made."
  author="Ahmed Hassan"
  title="Owner"
  company="Coral Bay Resort"
/>;
```

**Accessibility:** `blockquote` with `<footer>` for author attribution. Star icons include `aria-label="5 out of 5 stars"`.

---

### CaseStudyCard

Dark navy card with a large metric number. Optional `href` adds a hover CTA.

```tsx
import { CaseStudyCard } from "@/components/ui/Card";

<CaseStudyCard
  metric="+312%"
  metricLabel="Organic traffic in 6 months"
  description="Complete SEO overhaul, technical audit, and local search optimisation."
  company="Red Sea Divers"
  href="/portfolio/red-sea-divers"
/>;
```

---

## Scroll Reveal

Any element with `data-reveal` will animate in when it enters the viewport (powered by `Phase3Provider`).

```tsx
// Single element
<section data-reveal>…</section>

// Staggered siblings — add delay in ms
<div data-reveal data-reveal-delay="0">First card</div>
<div data-reveal data-reveal-delay="100">Second card</div>
<div data-reveal data-reveal-delay="200">Third card</div>
```

Animation: `opacity: 0 → 1` + `translateY(24px → 0)` over `550ms` with `ease-out-quart`.  
Reduced-motion users see no animation (CSS `prefers-reduced-motion` override).

---

## Button Ripple

Add `data-ripple=""` to any button or link to get a click-origin ripple effect. Already applied to `Button`, `FloatingCta`, and newsletter submit.

```tsx
<button data-ripple="" className="…">
  Click me
</button>
```

The `Phase3Provider` handles the rest via event delegation — no per-component JS needed.

---

## Interactive Cursor

Activated globally by `Phase3Provider` (desktop only, skipped on touch devices).

- Yellow dot follows cursor precisely
- Ring lags behind for a smooth tail effect
- Ring expands on hover over `a`, `button`, `input`, `select`

No per-component configuration required.
