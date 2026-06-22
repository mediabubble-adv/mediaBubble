# Phase 1: Design System & Brand Foundation

**Timeline:** Weeks 1-2  
**Status:** Implementation Guide  
**Owner:** Design Team

---

## Overview

This phase establishes the visual and structural foundation for:

1. MediaBubble's new website
2. Future internal apps (dashboards, CMS, analytics)
3. Long-term brand consistency

---

## Part 1: Design System Architecture

### Design Tokens (Source of Truth)

Design tokens are semantic variables that store design decisions. Store in `styles/design-tokens.json`:

```json
{
  "color": {
    "primary": {
      "50": "#f0f7ff",
      "100": "#e0efff",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c3d66"
    },
    "secondary": {
      "50": "#f5f3ff",
      "100": "#ede9fe",
      "200": "#ddd6fe",
      "300": "#c4b5fd",
      "400": "#a78bfa",
      "500": "#8b5cf6",
      "600": "#7c3aed",
      "700": "#6d28d9",
      "800": "#5b21b6",
      "900": "#4c1d95"
    },
    "accent": {
      "default": "#f97316",
      "hover": "#ea580c",
      "active": "#c2410c"
    },
    "semantic": {
      "success": "#10b981",
      "error": "#ef4444",
      "warning": "#f59e0b",
      "info": "#3b82f6"
    },
    "neutral": {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827"
    }
  },
  "typography": {
    "fontFamily": {
      "sans": "'Inter', 'Segoe UI', sans-serif",
      "serif": "'Merriweather', serif",
      "mono": "'Fira Code', monospace",
      "arabic": "'Cairo', 'Droid Arabic Naskh', sans-serif"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem"
    },
    "fontWeight": {
      "light": 300,
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    },
    "lineHeight": {
      "tight": 1.2,
      "normal": 1.5,
      "relaxed": 1.75,
      "loose": 2
    },
    "letterSpacing": {
      "tight": "-0.02em",
      "normal": "0",
      "wide": "0.02em",
      "wider": "0.05em"
    }
  },
  "spacing": {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem"
  },
  "shadow": {
    "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)"
  },
  "radius": {
    "none": "0",
    "sm": "0.125rem",
    "base": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "transition": {
    "duration": {
      "fast": "150ms",
      "base": "200ms",
      "slow": "300ms"
    },
    "timing": {
      "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }
}
```

### Tailwind Configuration

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import designTokens from './styles/design-tokens.json'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: designTokens.color,
    fontFamily: designTokens.typography.fontFamily,
    fontSize: designTokens.typography.fontSize,
    spacing: designTokens.spacing,
    boxShadow: designTokens.shadow,
    borderRadius: designTokens.radius,
    transitionDuration: designTokens.transition.duration,
    transitionTimingFunction: designTokens.transition.timing,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

---

## Part 2: Component Library (40+ Components)

### Foundation Components

#### 1. Button

```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
        secondary:
          "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800",
        ghost:
          "bg-transparent text-primary-600 hover:bg-primary-50 active:bg-primary-100",
        outline:
          "bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
        danger: "bg-error text-white hover:bg-red-700 active:bg-red-800",
      },
      size: {
        xs: "px-2.5 py-1.5 text-xs gap-1.5",
        sm: "px-3 py-2 text-sm gap-2",
        md: "px-4 py-2.5 text-base gap-2",
        lg: "px-6 py-3 text-lg gap-2.5",
        xl: "px-8 py-3.5 text-lg gap-3",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, loading, icon, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {icon}
      {children}
    </button>
  ),
);
```

#### 2. Card

```tsx
// components/ui/Card.tsx
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outlined" | "flat";
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "elevated", interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-6 transition-all",
        variant === "elevated" && "bg-white shadow-md hover:shadow-lg",
        variant === "outlined" &&
          "bg-white border border-neutral-200 hover:border-neutral-300",
        variant === "flat" && "bg-neutral-50 hover:bg-neutral-100",
        interactive && "cursor-pointer",
        className,
      )}
      {...props}
    />
  ),
);

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props} />
);

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-xl font-bold text-neutral-900", className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-neutral-600", className)} {...props} />
);

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-6 flex gap-3 border-t border-neutral-200 pt-4",
      className,
    )}
    {...props}
  />
);
```

#### 3. Input & Form Fields

```tsx
// components/ui/Input.tsx
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, hint, type, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">
          {label}
          {props.required && <span className="text-error"> *</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-neutral-500">{icon}</span>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-base text-neutral-900",
            "placeholder:text-neutral-500",
            "focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none",
            "disabled:bg-neutral-100 disabled:text-neutral-500",
            icon && "pl-10",
            error &&
              "border-error bg-red-50 focus:border-error focus:ring-red-200",
            className,
          )}
          {...props}
        />
      </div>
      {hint && <span className="text-xs text-neutral-500">{hint}</span>}
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  ),
);
```

#### 4. Modal/Dialog

```tsx
// components/ui/Modal.tsx
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "rounded-xl border-0 p-6 shadow-xl",
          size === "sm" && "max-w-sm",
          size === "md" && "max-w-md",
          size === "lg" && "max-w-lg",
          size === "xl" && "max-w-xl",
        )}
      >
        {title && (
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="my-4">{children}</div>
        {footer && (
          <div className="mt-6 flex gap-3 border-t border-neutral-200 pt-4">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

#### 5. Badge

```tsx
// components/ui/Badge.tsx
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-800",
        secondary: "bg-secondary-100 text-secondary-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-amber-100 text-amber-800",
        error: "bg-red-100 text-red-800",
        outline: "border border-neutral-200 bg-white text-neutral-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
);
```

#### 6. Tabs

```tsx
// components/ui/Tabs.tsx
export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-700",
      className,
    )}
    {...props}
  />
));

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
```

---

## Part 3: Additional Components (20+ more)

Create these components (30-minute implementation each):

1. **Text Components**
   - Heading (H1-H6)
   - Paragraph
   - Text (small, emphasized)

2. **Form Components**
   - TextArea
   - Select
   - Checkbox
   - Radio
   - Toggle
   - Slider
   - DatePicker

3. **Feedback Components**
   - Alert
   - Toast/Notification
   - Skeleton (loading placeholder)
   - Progress Bar
   - Spinner

4. **Navigation Components**
   - Navbar
   - Sidebar
   - Breadcrumb
   - Pagination
   - Menu/Dropdown

5. **Data Components**
   - Table
   - DataGrid
   - List

6. **Layout Components**
   - Container
   - Grid
   - Flex
   - Stack

---

## Part 4: Color Palette Deep Dive

### Primary Color (Blue) - For CTAs, focus states

```
50: #f0f7ff   → Very light backgrounds
100: #e0efff  → Light backgrounds
200: #bae6fd  → Lighter hover states
300: #7dd3fc  → Active states
400: #38bdf8  → Secondary buttons
500: #0ea5e9  → Main accent (less used)
600: #0284c7  → Primary buttons, links
700: #0369a1  → Hover state for primary
800: #075985  → Active state for primary
900: #0c3d66  → Dark text/backgrounds
```

### Secondary Color (Purple) - For secondary actions

```
Similar 9-step scale for secondary CTAs, alternate themes
```

### Accent Color (Orange) - For highlights, alerts

```
default: #f97316   → Normal state
hover: #ea580c     → Hover state
active: #c2410c    → Active state
```

### Semantic Colors

- **Success:** #10b981 (green)
- **Error:** #ef4444 (red)
- **Warning:** #f59e0b (amber)
- **Info:** #3b82f6 (blue)

---

## Part 5: Typography System

### Font Selection

```
English:
- Sans-Serif (Body): Inter 400, 500, 600, 700
- Serif (Headlines): Georgia or Crimson Text
- Monospace (Code): Fira Code

Arabic (Masri):
- Cairo (Arabic-optimized sans — active, implemented font)
- Fallback: Droid Arabic Naskh
```

### Type Scale

```
Display: 3rem (48px)  - H1, hero headlines
Heading 1: 2.25rem (36px) - Page titles
Heading 2: 1.875rem (30px) - Section headers
Heading 3: 1.5rem (24px) - Subsection headers
Heading 4: 1.25rem (20px) - Card titles
Body: 1rem (16px) - Main text
Small: 0.875rem (14px) - Labels, captions
Tiny: 0.75rem (12px) - Helper text
```

### Line Heights

- Headings: 1.2 (tight)
- Body: 1.5 (normal)
- Large text: 1.75 (relaxed)

---

## Part 6: Spacing & Layout

### Spacing Scale (8px base)

```
4px (0.25rem)   - xs
8px (0.5rem)    - sm
12px (0.75rem)  - md
16px (1rem)     - lg
24px (1.5rem)   - xl
32px (2rem)     - 2xl
48px (3rem)     - 3xl
64px (4rem)     - 4xl
```

### Grid System

- Desktop: 12-column grid
- Tablet: 8-column grid
- Mobile: 4-column grid
- Gap: 24px (desktop), 16px (tablet), 12px (mobile)

---

## Part 7: Accessibility Guidelines

### Color Contrast

- **AAA Standard:** 7:1 contrast ratio (preferred)
- **AA Standard:** 4.5:1 contrast ratio (minimum)
- Test with: WebAIM Contrast Checker

### Keyboard Navigation

- Tab order: Logical flow
- Focus indicators: Visible (2px ring, 2px offset)
- Skip links: Present on all pages
- ARIA labels: On all interactive elements

### Screen Readers

- Semantic HTML (buttons, links, headings)
- ARIA labels for icon-only buttons
- Form labels properly associated with inputs
- Alt text on all images

### Motion & Animation

- Respect `prefers-reduced-motion`
- Animations: max 300ms
- No auto-playing videos/animations

---

## Part 8: Dark Mode Support

### Tailwind Dark Mode Config

```typescript
// tailwind.config.ts
module.exports = {
  darkMode: "class",
  theme: {
    // ...
  },
};
```

### Dark Mode Color Adjustments

```tsx
// Example: Button in dark mode
<button
  className="
  bg-primary-600 dark:bg-primary-500
  text-white dark:text-white
  hover:bg-primary-700 dark:hover:bg-primary-600
"
/>
```

---

## Part 9: Implementation Checklist

- [ ] Create `styles/design-tokens.json`
- [ ] Configure Tailwind CSS
- [ ] Create 10 foundation components (Button, Card, Input, Modal, etc.)
- [ ] Create 30+ supporting components
- [ ] Set up Storybook
- [ ] Write component documentation
- [ ] Implement dark mode
- [ ] Test accessibility (WCAG 2.1 AA)
- [ ] Create Figma design system (for design team)
- [ ] Document design patterns
- [ ] Create component guidelines
- [ ] Set up component versioning

---

## Part 10: Storybook Setup

```bash
# Install Storybook
npx storybook@latest init

# Create story for Button
```

```typescript
// components/ui/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary", "ghost", "outline", "danger"],
      control: { type: "radio" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Click me",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Click me",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    size: "md",
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
    children: "Disabled",
  },
};
```

---

## Deliverables Summary

✅ Design tokens JSON file  
✅ 40+ reusable components  
✅ Figma design system  
✅ Storybook documentation  
✅ Accessibility guidelines  
✅ Dark mode support  
✅ Component usage guidelines  
✅ Design system documentation site

---

**Ready to move to Phase 2: Content Strategy!**
