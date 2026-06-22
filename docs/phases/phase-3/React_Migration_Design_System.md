# MediaBubble React Migration & Design System Architecture

**For Phase 3 Implementation**

---

## Project Structure

```
mediabubble-web/
├── public/
│   ├── images/
│   ├── logos/
│   └── index.html
├── src/
│   ├── design-tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── shadows.ts
│   │   └── index.ts (exports all)
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.config.ts
│   │   └── theme.css
│   ├── components/
│   │   ├── base/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── layouts/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── index.ts
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTA.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Solutions/
│   │   │   ├── StrategicMarketing.tsx
│   │   │   ├── DigitalGrowth.tsx
│   │   │   ├── Branding.tsx
│   │   │   └── WebDevelopment.tsx
│   │   ├── About.tsx
│   │   ├── Blog/
│   │   │   ├── index.tsx
│   │   │   └── [slug].tsx
│   │   ├── Contact.tsx
│   │   └── 404.tsx
│   ├── hooks/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## Step 1: Design Tokens (TypeScript)

### File: `src/design-tokens/colors.ts`

```typescript
export const colors = {
  // Primary brand colors
  primary: {
    yellow: "#FFC107",
    blue: "#2196F3",
  },

  // Secondary colors
  secondary: {
    darkBlue: "#0D3A7D",
    lightGray: "#F5F5F5",
    darkGray: "#1a1a1a",
  },

  // Text colors
  text: {
    primary: "#1a1a1a",
    secondary: "#666666",
    light: "#999999",
    inverse: "#FFFFFF",
  },

  // Background colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F5F5F5",
    dark: "#0D3A7D",
  },

  // State colors
  state: {
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",
  },

  // Semantic colors (for dark mode future)
  semantic: {
    border: "#EEEEEE",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
} as const;
```

### File: `src/design-tokens/spacing.ts`

```typescript
export const spacing = {
  // Base unit: 8px
  xs: "8px", // 1 unit
  sm: "16px", // 2 units
  md: "24px", // 3 units
  lg: "32px", // 4 units
  xl: "48px", // 6 units
  "2xl": "64px", // 8 units
  "3xl": "80px", // 10 units
} as const;

// Type-safe spacing values
export type SpacingKey = keyof typeof spacing;

// Helper function to get spacing value
export const getSpacing = (key: SpacingKey): string => spacing[key];

// Utility: Create consistent margin/padding patterns
export const spacingPatterns = {
  section: {
    top: spacing.xl, // 48px
    bottom: spacing.xl, // 48px
    mobile: spacing.lg, // 32px
  },
  card: {
    padding: spacing.lg, // 32px
  },
  button: {
    paddingH: spacing.md, // 24px
    paddingV: spacing.sm, // 16px
  },
} as const;
```

### File: `src/design-tokens/typography.ts`

```typescript
export const typography = {
  fontFamily: {
    base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'Courier New', Courier, monospace",
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
  },

  lineHeight: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.6",
    loose: "1.8",
  },

  fontWeight: {
    light: 300,
    normal: 400,
    semibold: 600,
    bold: 700,
  },

  // Predefined text styles
  styles: {
    h1: {
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: "1.2",
      letterSpacing: "-0.5px",
    },
    h2: {
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "1.3",
      letterSpacing: "-0.25px",
    },
    h3: {
      fontSize: "28px",
      fontWeight: 600,
      lineHeight: "1.4",
    },
    h4: {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "1.4",
    },
    body: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "1.6",
    },
    bodySmall: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "1.6",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "1.5",
    },
  },
} as const;
```

### File: `src/design-tokens/shadows.ts`

```typescript
export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
} as const;

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
} as const;

export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
```

### File: `src/design-tokens/index.ts`

```typescript
export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./shadows";

export const theme = {
  colors: require("./colors").colors,
  spacing: require("./spacing").spacing,
  typography: require("./typography").typography,
  shadows: require("./shadows").shadows,
} as const;
```

---

## Step 2: Tailwind Configuration

### File: `tailwind.config.ts`

```typescript
import {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  transitions,
} from "./src/design-tokens";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // Brand colors
        "brand-yellow": colors.primary.yellow,
        "brand-blue": colors.primary.blue,
        "dark-blue": colors.secondary.darkBlue,

        // Text colors
        "text-primary": colors.text.primary,
        "text-secondary": colors.text.secondary,
        "text-light": colors.text.light,
        "text-inverse": colors.text.inverse,

        // Background colors
        "bg-secondary": colors.background.secondary,
        "bg-dark": colors.background.dark,

        // State colors
        success: colors.state.success,
        warning: colors.state.warning,
        error: colors.state.error,
        info: colors.state.info,
      },

      spacing: {
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        "2xl": spacing["2xl"],
        "3xl": spacing["3xl"],
      },

      fontSize: {
        xs: typography.fontSize.xs,
        sm: typography.fontSize.sm,
        base: typography.fontSize.base,
        lg: typography.fontSize.lg,
        xl: typography.fontSize.xl,
        "2xl": typography.fontSize["2xl"],
        "3xl": typography.fontSize["3xl"],
        "4xl": typography.fontSize["4xl"],
        "5xl": typography.fontSize["5xl"],
      },

      fontWeight: {
        light: 300,
        normal: 400,
        semibold: 600,
        bold: 700,
      },

      lineHeight: {
        tight: typography.lineHeight.tight,
        normal: typography.lineHeight.normal,
        relaxed: typography.lineHeight.relaxed,
        loose: typography.lineHeight.loose,
      },

      boxShadow: {
        sm: shadows.sm,
        md: shadows.md,
        lg: shadows.lg,
        xl: shadows.xl,
      },

      borderRadius: {
        sm: borderRadius.sm,
        md: borderRadius.md,
        lg: borderRadius.lg,
        xl: borderRadius.xl,
      },

      transitionDuration: {
        fast: transitions.fast,
        base: transitions.base,
        slow: transitions.slow,
      },
    },
  },

  plugins: [],
};
```

---

## Step 3: Base Components

### File: `src/components/base/Button.tsx`

```typescript
import React from 'react';
import { colors, spacing } from '@/design-tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  href,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-md transition-all duration-base
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-brand-yellow text-text-primary
      hover:opacity-90 active:opacity-80
      shadow-md hover:shadow-lg
    `,
    secondary: `
      border-2 border-brand-blue text-brand-blue
      hover:bg-blue-50 active:bg-blue-100
    `,
    text: `
      text-brand-blue
      hover:underline active:opacity-80
    `,
  };

  const sizeStyles = {
    sm: `h-9 px-3 text-sm`,       // 36px height
    md: `h-11 px-5 text-base`,    // 44px height
    lg: `h-13 px-7 text-lg`,      // 52px height
  };

  const classNames = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        {...(props as any)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classNames}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2">⏳</span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};
```

### File: `src/components/base/Card.tsx`

```typescript
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg p-lg shadow-md
        ${hoverable ? 'hover:shadow-lg transition-all duration-base' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => (
  <div className="mb-md pb-md border-b border-gray-200">
    {children}
  </div>
);

interface CardBodyProps {
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ children }) => (
  <div className="mb-md">
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => (
  <div className="mt-md pt-md border-t border-gray-200">
    {children}
  </div>
);
```

### File: `src/components/base/Input.tsx`

```typescript
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random()}`;

  return (
    <div className="mb-md">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-text-primary mb-sm"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-md py-sm
          border rounded-md
          focus:outline-none focus:ring-2 focus:ring-brand-blue
          ${error ? 'border-error' : 'border-gray-300'}
          transition-colors duration-base
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-xs">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-text-light mt-xs">{helperText}</p>
      )}
    </div>
  );
};
```

---

## Step 4: Layout Components

### File: `src/components/layouts/Header.tsx`

```typescript
import React, { useState } from 'react';
import { Button } from '@/components/base/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-lg py-md flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-md">
          <img
            src="/logos/mediabubble-logo.svg"
            alt="MediaBubble"
            className="h-12"
          />
          <span className="text-xl font-bold text-text-primary hidden md:block">
            MediaBubble
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-lg">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-text-primary hover:text-brand-blue transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            variant="primary"
            size="md"
            href="/contact"
          >
            Get in Touch
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-bg-secondary py-lg px-lg">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-sm text-text-primary hover:text-brand-blue"
            >
              {item.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="md"
            href="/contact"
            className="w-full mt-md"
          >
            Get in Touch
          </Button>
        </nav>
      )}
    </header>
  );
};
```

### File: `src/components/layouts/Footer.tsx`

```typescript
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-text-inverse py-3xl">
      <div className="container mx-auto px-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl mb-3xl">
          {/* Company Info */}
          <div>
            <h4 className="font-bold mb-md">MediaBubble</h4>
            <p className="text-sm text-gray-300 mb-md">
              #1 Marketing Agency in Hurghada
            </p>
            <p className="text-sm text-gray-300">
              📍 Hurghada, Egypt<br/>
              📧 hello@mediabubble.co<br/>
              📱 +20 (0) 1234 567 890
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold mb-md">Solutions</h4>
            <ul className="space-y-sm">
              <li><a href="/solutions/strategic" className="hover:text-brand-yellow">Strategic Marketing</a></li>
              <li><a href="/solutions/digital" className="hover:text-brand-yellow">Digital Growth</a></li>
              <li><a href="/solutions/branding" className="hover:text-brand-yellow">Branding</a></li>
              <li><a href="/solutions/web" className="hover:text-brand-yellow">Web Development</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-md">Company</h4>
            <ul className="space-y-sm">
              <li><a href="/about" className="hover:text-brand-yellow">About</a></li>
              <li><a href="/blog" className="hover:text-brand-yellow">Blog</a></li>
              <li><a href="/careers" className="hover:text-brand-yellow">Careers</a></li>
              <li><a href="/contact" className="hover:text-brand-yellow">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-md">Legal</h4>
            <ul className="space-y-sm">
              <li><a href="/privacy" className="hover:text-brand-yellow">Privacy</a></li>
              <li><a href="/terms" className="hover:text-brand-yellow">Terms</a></li>
              <li><a href="/cookies" className="hover:text-brand-yellow">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-lg text-center text-sm text-gray-300">
          <p>&copy; {currentYear} MediaBubble. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
```

---

## Step 5: Section Components

### File: `src/components/sections/Hero.tsx`

```typescript
import React from 'react';
import { Button } from '@/components/base/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get in Touch',
  ctaHref = '/contact',
  backgroundImage,
}) => {
  return (
    <section
      className="bg-dark-blue text-text-inverse py-3xl min-h-[600px] flex items-center"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(13, 58, 125, 0.8), rgba(13, 58, 125, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="container mx-auto px-lg">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-md leading-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-200 mb-2xl">
            {subtitle}
          </p>
          <Button
            variant="primary"
            size="lg"
            href={ctaHref}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};
```

### File: `src/components/sections/Services.tsx`

```typescript
import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/base/Card';
import { Button } from '@/components/base/Button';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

interface ServicesProps {
  services: Service[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section className="py-3xl bg-bg-secondary">
      <div className="container mx-auto px-lg">
        <div className="text-center mb-3xl">
          <h2 className="text-4xl font-bold text-text-primary mb-md">
            Our Solutions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive marketing solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {services.map((service) => (
            <Card key={service.id} hoverable>
              <CardHeader>
                <div className="text-4xl mb-md">{service.icon}</div>
                <h3 className="text-2xl font-bold text-text-primary">
                  {service.title}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-text-secondary mb-lg">
                  {service.description}
                </p>
              </CardBody>
              <Button
                variant="secondary"
                size="sm"
                href={service.href}
              >
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## Step 6: Pages

### File: `src/pages/Home.tsx`

```typescript
import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { CTA } from '@/components/sections/CTA';

const services = [
  {
    id: '1',
    title: 'Strategic Marketing',
    description: 'Data-driven strategies to grow your business',
    icon: '📊',
    href: '/solutions/strategic',
  },
  {
    id: '2',
    title: 'Digital Growth',
    description: 'SEO, PPC, and social media campaigns',
    icon: '📈',
    href: '/solutions/digital',
  },
  {
    id: '3',
    title: 'Branding',
    description: 'Build a memorable brand identity',
    icon: '🎨',
    href: '/solutions/branding',
  },
  {
    id: '4',
    title: 'Web Development',
    description: 'Modern, fast, and responsive websites',
    icon: '💻',
    href: '/solutions/web',
  },
];

export const Home: React.FC = () => {
  return (
    <main>
      <Hero
        title="Elevate Your Business to New Heights"
        subtitle="We specialize in helping businesses thrive through innovative, results-driven marketing strategies."
        ctaText="Get Started"
        ctaHref="/contact"
      />

      <Services services={services} />

      <CTA
        title="Ready to Transform Your Business?"
        subtitle="Let's work together to achieve your marketing goals."
        ctaText="Schedule a Consultation"
        ctaHref="/contact"
      />
    </main>
  );
};
```

### File: `src/App.tsx`

```typescript
import React from 'react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Home } from '@/pages/Home';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
```

---

## Build & Deploy

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect GitHub repo directly in Vercel dashboard.

---

## Key Benefits of This Architecture

✅ **Type-safe design tokens** - TypeScript prevents invalid color/spacing values
✅ **Centralized source of truth** - Change tokens once, update everywhere
✅ **Tailwind integration** - Use Tailwind utilities with custom tokens
✅ **Component reusability** - Build once, use everywhere
✅ **Performance** - Small bundle size, tree-shaking unused styles
✅ **Maintainability** - Easy to update brand without touching components
✅ **Scalability** - Add dark mode, themes, etc. by extending tokens
✅ **Testing** - Components are isolated and easy to test

---

## Next: Storybook Setup

After building components, add Storybook for documentation:

```bash
npx storybook init
```

This creates `.storybook/` with stories for each component, making it easy for team collaboration.

---

End of React Migration Guide
