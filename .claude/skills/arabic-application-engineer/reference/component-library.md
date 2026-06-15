# Component Library — RTL-Aware React Components

## Core Principles

1. **Never use physical properties** — always use logical CSS properties
2. **Dir is inherited** — set `dir` on `<html>`, components respond automatically
3. **Test in both directions** — every component must render correctly in LTR and RTL
4. **Icons must mirror** — directional icons (arrows, chevrons) need RTL variants or CSS transforms

## Tailwind RTL Utilities

Tailwind CSS v3.4+ supports RTL natively with the `rtl:` and `ltr:` prefixes:

```jsx
{/* Margin — logical properties */}
<div className="ms-4 me-2" />     {/* margin-inline-start/end */}
<div className="ms-auto" />         {/* push to the end */}
<div className="me-auto" />         {/* push to the start */}

{/* Padding — logical properties */}
<div className="ps-4 pe-2" />       {/* padding-inline-start/end */}

{// Inset — logical properties}
<div className="inset-x-0" />       {/* left:0; right:0 */}
<div className="start-0" />         {/* left:0 in LTR, right:0 in RTL */}
<div className="end-0" />           {/* right:0 in LTR, left:0 in RTL */}

{// Text alignment}
<div className="text-start" />      {/* text-align: start */}
<div className="text-end" />        {/* text-align: end */}

{// Direction-specific overrides}
<div className="rtl:text-end" />    {/* only applies in RTL */}
<div className="ltr:text-start" />  {/* only applies in LTR */}
```

## RTL-Aware Component Patterns

### Icon Mirroring

```tsx
// utils/direction.ts
'use client'
import { useLocale } from 'next-intl'

export function useDirection() {
  const locale = useLocale()
  return locale === 'ar-EG' ? 'rtl' : 'ltr'
}

export function isRTL() {
  if (typeof document === 'undefined') return false
  return document.documentElement.dir === 'rtl'
}
```

```tsx
// components/Icon.tsx
'use client'

interface IconProps {
  name: 'chevron-left' | 'chevron-right' | 'arrow-left' | 'arrow-right' | 'share'
  className?: string
}

const DIRECTIONAL_ICONS = new Set(['chevron-left', 'chevron-right', 'arrow-left', 'arrow-right'])

export function Icon({ name, className }: IconProps) {
  const isDirectional = DIRECTIONAL_ICONS.has(name)

  return (
    <span
      className={className}
      style={{
        transform: isDirectional ? 'scaleX(var(--tw-scale-x, 1))' : undefined,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
```

### Navigation Bar

```tsx
// components/NavBar.tsx
'use client'

export function NavBar() {
  return (
    <nav className="flex items-center gap-4 px-6 py-3">
      <a href="/" className="text-lg font-bold">
        MediaBubble
      </a>

      <ul className="flex gap-6 ms-auto"> {/* ms-auto pushes items to end */}
        <li><a href="/services">Services</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <LocaleSwitcher />

      <a href="/book" className="px-4 py-2 bg-brand-yellow rounded-lg">
        Book Now
      </a>
    </nav>
  )
}
```

### Form Field

```tsx
// components/FormField.tsx
interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-start">{label}</label>
      {children}
      {error && (
        <p className="text-sm text-red-500 text-start">{error}</p>
      )}
    </div>
  )
}

// Usage:
<FormField label="الاسم" error="هذا الحقل مطلوب">
  <input
    type="text"
    className="px-4 py-2 border rounded-lg text-start"
    placeholder="اكتب اسمك"
  />
</FormField>
```

### Card Component

```tsx
// components/Card.tsx
interface CardProps {
  image?: string
  title: string
  description: string
  action?: React.ReactNode
}

export function Card({ image, title, description, action }: CardProps) {
  return (
    <div className="flex flex-col rounded-xl border overflow-hidden">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg text-start">{title}</h3>
        <p className="text-muted-steel text-start">{description}</p>
        {action && (
          <div className="flex gap-2 justify-start mt-auto">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
```

### Modal / Dialog

```tsx
// components/Modal.tsx
'use client'

import { useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) dialog.showModal()
    else dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-modal m-auto p-6 rounded-xl max-w-lg w-full"
      onClose={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 end-4 p-1 rounded-full hover:bg-gray-100"
        aria-label="Close"
      >
        ✕
      </button>
      {children}
    </dialog>
  )
}
```

## Carousel / Slider

```tsx
// components/Carousel.tsx
'use client'

import { useRef } from 'react'

export function Carousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const isRTL = document.documentElement.dir === 'rtl'
    const dir = isRTL ? -1 : 1
    const amount = direction === 'next' ? dir * 300 : -dir * 300
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4"
      >
        {children}
      </div>
      <button onClick={() => scroll('prev')} className="absolute start-2 top-1/2 -translate-y-1/2">
        <Icon name="chevron-left" />
      </button>
      <button onClick={() => scroll('next')} className="absolute end-2 top-1/2 -translate-y-1/2">
        <Icon name="chevron-right" />
      </button>
    </div>
  )
}
```

## Accordion

```tsx
// components/Accordion.tsx
'use client'

import { useState } from 'react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-start px-4 py-3"
        aria-expanded={open}
      >
        <span className="flex-1 font-medium">{title}</span>
        <span className={`transition-transform ms-auto ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && <div className="px-4 pb-3 text-start">{children}</div>}
    </div>
  )
}
```

## Breadcrumbs

```tsx
// components/Breadcrumbs.tsx
interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2 items-center">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <a href={item.href} className="text-brand-blue hover:underline">
                {item.label}
              </a>
            ) : (
              <span className="text-muted-steel">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <span className="text-muted-steel" aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

## Data Table

```tsx
// components/Table.tsx
interface Column<T> {
  key: keyof T
  header: string
  align?: 'start' | 'end' | 'center'
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
}: {
  columns: Column<T>[]
  data: T[]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-3 font-semibold text-${col.align || 'start'} bg-gray-50`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className={`px-4 py-3 text-${col.align || 'start'}`}>
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

## Accessibility for RTL Components

- All components must work with `dir="rtl"` without additional props
- ARIA attributes are direction-independent (works automatically)
- Focus order is document-order, which matches visual order in both directions
- Skip links should use `inset-inline-start` for positioning
- Screen readers (JAWS, NVDA, VoiceOver) handle RTL text natively — no special handling needed, just set correct `lang` attribute
