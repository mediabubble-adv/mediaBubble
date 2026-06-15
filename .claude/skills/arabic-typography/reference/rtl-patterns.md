# RTL Layout Patterns & CSS Guide

## Golden Rule

**Never use `left` or `right` in CSS.** Always use logical properties. The browser handles direction switching automatically.

## CSS Logical Properties

### Instead of directional properties:

| Directional (Avoid) | Logical (Use) |
|---------------------|---------------|
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |
| `text-align: left` / `text-align: right` | Use `dir` attribute instead |

### Tailwind CSS equivalents:

| Directional (Avoid) | Logical Tailwind (Use) |
|---------------------|----------------------|
| `ml-4` / `mr-4` | `ms-4` / `me-4` |
| `pl-4` / `pr-4` | `ps-4` / `pe-4` |
| `left-0` / `right-0` | `start-0` / `end-0` |
| `border-l-2` / `border-r-2` | `border-s-2` / `border-e-2` |
| `rounded-l-lg` / `rounded-r-lg` | `rounded-s-lg` / `rounded-e-lg` |

## RTL Base Setup

```css
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
  unicode-bidi: embed;
}

html[dir="ltr"] {
  direction: ltr;
  text-align: left;
}
```

In Next.js:

```tsx
// app/[locale]/layout.tsx
export default function LocaleLayout({ children, params }) {
  const dir = params.locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={params.locale} dir={dir}>
      {children}
    </html>
  );
}
```

## Component-Level RTL Adjustments

### Navigation

```
LTR: [Logo] [Item 1] [Item 2] [Item 3]
RTL: [Item 3] [Item 2] [Item 1] [Logo]
```

```css
.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav__menu {
  display: flex;
  gap: 1rem;
  margin-inline-start: auto;
}
```

### Forms

```
LTR: [Label] [Input] [Hint]
RTL: [Hint] [Input] [Label]
```

```css
.form-field__label {
  text-align: start;
}

.form-field__input {
  text-align: start;
}
```

### Buttons with Icons

```
LTR: [Back] [Next]
RTL: [Back] [Next] (icons mirrored)
```

```css
[dir="rtl"] .icon-arrow-forward,
[dir="rtl"] .icon-chevron-right {
  transform: scaleX(-1);
}
```

### Progress Bars

```
LTR: [filled] [empty] 10%
RTL: [empty] [filled] 10%
```

```css
[dir="rtl"] .progress-bar__fill {
  transform-origin: right center;
}
```

## Icons Requiring Mirroring in RTL

| Icon | LTR | RTL |
|------|-----|-----|
| Arrow (left) | Back | Forward |
| Arrow (right) | Forward | Back |
| Chevron (<) | Collapse | Expand |
| Chevron (>) | Expand | Collapse |
| Share | Left-pointing | Right-pointing |
| Send | Right-pointing | Left-pointing |

```css
[dir="rtl"] .icon-arrow-back,
[dir="rtl"] .icon-arrow-forward,
[dir="rtl"] .icon-chevron-left,
[dir="rtl"] .icon-chevron-right,
[dir="rtl"] .icon-share,
[dir="rtl"] .icon-send {
  transform: scaleX(-1);
}
```

## RTL Testing Checklist

1. **Page direction** — Load page with `dir="rtl"`. Text aligns right.
2. **Text overflow** — Arabic is 25-35% longer. No truncation.
3. **Navigation** — Logo on right. Menu items flow RTL.
4. **Forms** — Labels on right. Inputs start from right.
5. **Buttons** — Icon positions mirror LTR.
6. **Checkbox/Radio** — Label on left of control.
7. **Progress bars** — Fill starts from right.
8. **Data tables** — Columns in reverse order. Numbers right-aligned.
9. **Carousels** — Scroll direction reverses.
10. **Dropdowns** — Open to the left in RTL.
11. **Modals** — Close button on left edge.
12. **Responsive** — Test all breakpoints with RTL.
13. **Screen reader** — Confirm `lang` and `dir` attributes correct.
14. **Zoom** — 200% zoom. No text breaks or overlaps.
