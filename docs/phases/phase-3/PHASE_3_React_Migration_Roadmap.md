# Phase 3: React Migration & Full Implementation

**Timeline:** 12-16 Weeks (After Phase 2 completion)  
**Effort:** 144-192 hours  
**Status:** PLANNING  
**Goal:** Rebuild website in React with enforced design system

---

## Executive Summary

Phase 3 replaces WordPress/Elementor with a modern React application that:
- ✅ Enforces design system via code (not manual)
- ✅ 60% faster builds (reusable components)
- ✅ Better performance (30% smaller bundle)
- ✅ Easier maintenance (update once, changes everywhere)
- ✅ Scales to support internal tools/apps

---

## Architecture Overview

### Tech Stack

```
Frontend:
├── React 18+ (with TypeScript)
├── Vite (build tool)
├── Tailwind CSS (styling)
├── shadcn/ui (component library base)
└── React Router v6 (navigation)

Deployment:
├── Vercel (frontend)
├── Cloudflare (CDN)
└── GitHub (version control)

Integrations:
├── HubSpot (CRM)
├── Google Analytics 4
└── Segment (analytics)

Optional (Phase 4+):
├── Next.js (for SSR/SSG)
├── Supabase (backend)
└── Stripe (payments)
```

### Project Structure

```
mediabubble-web/
├── public/
│   ├── images/
│   ├── logos/
│   └── robots.txt
├── src/
│   ├── design-tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── base/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ...
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   └── ...
│   │   ├── layouts/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── index.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services/
│   │   │   ├── index.tsx
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
│   │   ├── useForm.ts
│   │   ├── useContactForm.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── classNames.ts
│   │   ├── analytics.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## Week-by-Week Breakdown

### Phase 3a: Setup & Foundation (Weeks 1-3)

#### Week 1: Project Setup (8 hours)

**Create React project:**
```bash
npm create vite@latest mediabubble-web -- --template react-ts
cd mediabubble-web
npm install
```

**Install dependencies:**
```bash
npm install tailwindcss postcss autoprefixer
npm install react-router-dom
npm install axios clsx
npm install --save-dev @types/react @types/react-dom typescript
```

**Configure Tailwind:**
```bash
npx tailwindcss init -p
# Update tailwind.config.ts with design tokens
```

**Tasks:**
- [ ] Initialize React + TypeScript project
- [ ] Setup Tailwind CSS
- [ ] Configure TypeScript
- [ ] Setup git repository
- [ ] Create .env.example
- [ ] Setup Vercel deployment
- [ ] Create initial commit

#### Week 2: Design Tokens Implementation (8 hours)

**Create TypeScript design tokens:**

```typescript
// src/design-tokens/colors.ts
export const colors = {
  primary: { yellow: '#FFC107', blue: '#2196F3' },
  dark: { blue: '#0D3A7D' },
  text: { primary: '#1a1a1a', secondary: '#666666', light: '#999999' },
  background: { primary: '#FFFFFF', secondary: '#F5F5F5', dark: '#0D3A7D' },
} as const;

// src/design-tokens/spacing.ts
export const spacing = {
  xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '48px',
  '2xl': '64px', '3xl': '80px',
} as const;

// src/design-tokens/index.ts
export * from './colors';
export * from './spacing';
export * from './typography';
```

**Update Tailwind config:**
```typescript
import { colors, spacing } from './src/design-tokens';

export default {
  theme: {
    extend: {
      colors: {
        'brand-yellow': colors.primary.yellow,
        'brand-blue': colors.primary.blue,
        // ...
      },
      spacing: {
        'xs': spacing.xs,
        'sm': spacing.sm,
        // ...
      },
    },
  },
};
```

**Tasks:**
- [ ] Create design tokens (TypeScript)
- [ ] Configure Tailwind with tokens
- [ ] Create design tokens reference
- [ ] Test in app
- [ ] Document for team

#### Week 3: Base Components (16 hours)

**Build essential components:**
1. Button (3 variants, 3 sizes)
2. Card (basic, elevated)
3. Input field
4. Form (wrapper)
5. Modal
6. Link
7. Badge
8. Divider

```typescript
// Example: src/components/base/Button.tsx
import { colors, spacing } from '@/design-tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all';
  
  const variants = {
    primary: 'bg-brand-yellow text-text-primary hover:opacity-90',
    secondary: 'border-2 border-brand-blue text-brand-blue hover:bg-blue-50',
    text: 'text-brand-blue hover:underline',
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-13 px-7 text-lg',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
```

**Tasks:**
- [ ] Build 8 base components
- [ ] Write tests for components
- [ ] Create Storybook stories
- [ ] Document component props
- [ ] Get design approval

---

### Phase 3b: Layout Components (Weeks 4-6)

#### Week 4: Navigation & Headers (12 hours)

**Build:**
1. Header (desktop + mobile)
2. Navigation (mega-menu)
3. Footer
4. Breadcrumb
5. Mobile menu

```typescript
// src/components/layouts/Header.tsx
export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md py-lg">
      <div className="container mx-auto px-lg flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-md">
          <img src="/logos/logo.svg" alt="MediaBubble" className="h-12" />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-xl">
          <a href="/solutions" className="hover:text-brand-blue">Solutions</a>
          <a href="/about" className="hover:text-brand-blue">About</a>
          <a href="/blog" className="hover:text-brand-blue">Blog</a>
          <a href="/contact" className="hover:text-brand-blue">Contact</a>
        </nav>
        
        {/* CTA Button */}
        <Button href="/contact" variant="primary">Get in Touch</Button>
        
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-bg-secondary py-lg px-lg">
          {/* Mobile nav items */}
        </nav>
      )}
    </header>
  );
};
```

**Tasks:**
- [ ] Build Header component
- [ ] Build Navigation system
- [ ] Build Footer component
- [ ] Implement responsive design
- [ ] Mobile menu functionality
- [ ] Test keyboard navigation

#### Week 5: Section Components (12 hours)

**Build:**
1. Hero section
2. Services grid
3. Testimonials carousel
4. CTA section
5. FAQ accordion
6. Feature grid
7. Stats section

```typescript
// src/components/sections/Hero.tsx
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title, subtitle, ctaText = 'Get Started', ctaHref = '/contact',
}) => {
  return (
    <section className="bg-dark-blue text-text-inverse py-3xl">
      <div className="container mx-auto px-lg">
        <h1 className="text-5xl font-bold mb-md">{title}</h1>
        <p className="text-lg text-gray-200 mb-2xl">{subtitle}</p>
        <Button variant="primary" href={ctaHref}>{ctaText}</Button>
      </div>
    </section>
  );
};
```

**Tasks:**
- [ ] Build 7 section components
- [ ] Add interactivity (carousel, accordion)
- [ ] Responsive behavior at each breakpoint
- [ ] Performance optimization
- [ ] Accessibility testing

#### Week 6: Page Templates (12 hours)

**Build base page layouts:**
1. Homepage layout
2. Service page template
3. Blog template
4. Contact page
5. About page
6. 404 page

**Tasks:**
- [ ] Create 6 page templates
- [ ] Implement with components
- [ ] Setup routing
- [ ] Add metadata (SEO tags)
- [ ] Test all pages

---

### Phase 3c: Pages & Content (Weeks 7-10)

#### Weeks 7-8: Homepage Rebuild (16 hours)

**Migrate content from WordPress:**
- Hero section (copy + images)
- Why Choose section
- Client logos
- 3-Step approach
- Services overview
- Results/benefits
- CTA section
- FAQ

**Tasks:**
- [ ] Import all content
- [ ] Optimize images
- [ ] Setup image lazy-loading
- [ ] Test all interactions
- [ ] Performance audit (Lighthouse)
- [ ] Mobile testing

#### Weeks 9-10: Service Pages (16 hours)

**Create pages for each service:**
1. Strategic & Creative Marketing
2. Marketing & Digital Growth
3. Branding & Printing
4. Web Solutions

**Each page includes:**
- Hero with service name
- Overview section
- Benefits list
- Case studies
- Pricing (if applicable)
- CTA

**Tasks:**
- [ ] Create 4 service pages
- [ ] Add case study components
- [ ] Setup internal linking
- [ ] Add schema markup (SEO)
- [ ] Mobile testing

---

### Phase 3d: Integrations & Polish (Weeks 11-12)

#### Week 11: CRM & Analytics Integration (12 hours)

**HubSpot Integration:**
```typescript
// src/utils/hubspot.ts
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (window.hbspt) {
    window.hbspt.analytics.track(eventName, properties);
  }
};

export const submitContactForm = async (formData: ContactFormData) => {
  const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/...', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: [
        { name: 'firstname', value: formData.firstName },
        { name: 'email', value: formData.email },
        // ...
      ],
    }),
  });
  return response.json();
};
```

**Google Analytics 4:**
```typescript
// src/utils/analytics.ts
export const initGA = (measurementId: string) => {
  // Initialize GA4
};

export const trackPageView = (path: string) => {
  window.gtag?.('event', 'page_view', { page_path: path });
};
```

**Tasks:**
- [ ] Setup HubSpot integration
- [ ] Implement contact form submission
- [ ] Setup Google Analytics 4
- [ ] Track key events (CTA clicks, form submissions)
- [ ] Test event tracking
- [ ] Privacy policy updates

#### Week 12: Launch & Optimization (12 hours)

**Performance Optimization:**
- Code splitting
- Image optimization
- CSS minification
- Bundle analysis

**SEO Setup:**
- Meta tags on all pages
- Sitemap generation
- Robots.txt
- Schema markup
- Canonical tags
- Open Graph tags

**Testing:**
- Cross-browser testing
- Mobile testing (iOS, Android)
- Performance testing (Lighthouse)
- Accessibility testing (WCAG AA)
- Form testing
- Link testing

**Deployment:**
- Setup Vercel
- Configure custom domain
- SSL certificate
- CDN setup
- Staging environment
- Production environment

**Tasks:**
- [ ] Performance audit (target: Lighthouse 90+)
- [ ] SEO audit (all pages indexed)
- [ ] Accessibility audit (WCAG AA)
- [ ] Cross-browser testing
- [ ] Load testing
- [ ] Deploy to production
- [ ] Monitor uptime
- [ ] Setup error tracking

---

## Detailed Task List

### Frontend Implementation

**Base Components (16):**
- [ ] Button
- [ ] Card
- [ ] Input
- [ ] Form
- [ ] Modal
- [ ] Link
- [ ] Badge
- [ ] Dropdown
- [ ] Tooltip
- [ ] Alert
- [ ] Breadcrumb
- [ ] Avatar
- [ ] Loading spinner
- [ ] Pagination
- [ ] Tabs
- [ ] Skeleton

**Section Components (10):**
- [ ] Hero
- [ ] Services grid
- [ ] Testimonials carousel
- [ ] CTA section
- [ ] FAQ accordion
- [ ] Feature list
- [ ] Stats section
- [ ] Image + text
- [ ] Blog list
- [ ] Contact form

**Layout Components (5):**
- [ ] Header
- [ ] Navigation (mega-menu)
- [ ] Footer
- [ ] Sidebar (if needed)
- [ ] Container/grid system

**Pages (8):**
- [ ] Home
- [ ] Services (4 sub-pages)
- [ ] About
- [ ] Contact
- [ ] Blog (index)
- [ ] Blog (post detail)
- [ ] 404

### Integration Tasks

- [ ] HubSpot API connection
- [ ] Contact form submission
- [ ] Google Analytics 4
- [ ] Event tracking
- [ ] Error logging (Sentry)
- [ ] Performance monitoring

### Deployment Tasks

- [ ] Vercel setup
- [ ] Domain configuration
- [ ] SSL certificate
- [ ] Redirects from WordPress
- [ ] Staging environment
- [ ] CI/CD pipeline

---

## Quality Assurance

### Testing Checklist

**Functional:**
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Navigation works on all devices
- [ ] Images load properly
- [ ] Videos play
- [ ] Responsive layout at all breakpoints

**Performance:**
- [ ] Lighthouse score 90+
- [ ] Core Web Vitals pass
- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] No memory leaks

**Accessibility:**
- [ ] WCAG AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes
- [ ] Focus states visible

**Cross-browser:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Chrome Mobile

**Security:**
- [ ] No sensitive data in code
- [ ] HTTPS enforced
- [ ] CSP headers set
- [ ] XSS protection
- [ ] CSRF protection

---

## Migration Strategy

### Option 1: Big Bang (Riskier)
- Rebuild entire site
- Launch all at once
- Downtime: 0-2 hours
- Rollback: Complex

### Option 2: Gradual Migration (Recommended)
- Deploy new site at `/new-site`
- Keep WordPress live as backup
- Test in staging
- Redirect pages one by one
- 100% traffic cutover over 1 week
- Downtime: 0
- Rollback: Easy

**Gradual migration plan:**

```
Week 1: Deploy React site to /new-site (not indexed)
Week 2: Redirect /robots.txt to /new-site (gradual)
Week 3: Switch DNS to Vercel
Week 4: Remove old WordPress (after confirming no issues)
```

---

## Budget & Timeline

### Effort Breakdown

| Phase | Hours | Cost (@$75/hr) |
|-------|-------|----------------|
| Setup & Foundation (Weeks 1-3) | 32 | $2,400 |
| Layout Components (Weeks 4-6) | 36 | $2,700 |
| Pages & Content (Weeks 7-10) | 32 | $2,400 |
| Integrations & Polish (Weeks 11-12) | 24 | $1,800 |
| **Total** | **124 hours** | **$9,300** |

*Plus time for:*
- Team reviews & approvals (20 hours)
- Design hand-offs (16 hours)
- QA & testing (24 hours)
- **Grand Total: 184 hours / $13,800**

### Team Structure

**Recommended:**
- 1 Lead Developer (full-time, 12 weeks)
- 1 Junior Developer (part-time, 6 weeks)
- 1 QA Engineer (part-time, 6 weeks)
- Design feedback: 4-8 hours/week

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse score | 90+ |
| Core Web Vitals | All passing |
| Page load time | <3 seconds |
| Accessibility | WCAG AA 100% |
| SEO rankings | Maintain or improve |
| Uptime | 99.9%+ |
| Time to new page | <2 hours (vs 4 hours) |

---

## Post-Launch (Phase 4+)

After successful React migration:

1. **Content Management System**
   - Add Markdown-based blog
   - Add admin panel for case studies
   - Add job postings system

2. **Internal Tools**
   - Client dashboard
   - Campaign manager
   - Analytics dashboard
   - Reporting portal

3. **Advanced Features**
   - Dark mode
   - Multi-language support
   - A/B testing framework
   - Personalization

4. **Backend Development**
   - Move to Next.js (SSR/SSG)
   - Add Supabase database
   - API endpoints for internal tools
   - Email service integration

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Timeline overrun | -2 weeks | Break into sprints, track velocity |
| Design changes mid-project | -3 weeks | Lock design before starting |
| Integration issues (HubSpot) | -1 week | Test integrations in Week 3 |
| Performance issues | High bounce rate | Monitor Lighthouse weekly |
| SEO ranking drop | Traffic loss | Setup proper redirects, test before launch |
| Team turnover | Project stall | Document everything, pair programming |

---

## Checklist for Launch

- [ ] All pages built and tested
- [ ] All integrations working
- [ ] Lighthouse 90+
- [ ] WCAG AA compliance
- [ ] DNS configured
- [ ] SSL certificate installed
- [ ] Redirects configured
- [ ] Monitoring setup
- [ ] Backup of old site
- [ ] Team trained on new codebase
- [ ] Documentation complete
- [ ] Staging fully tested
- [ ] Production deployment plan
- [ ] Rollback plan ready
- [ ] Go-live meeting scheduled

---

## Success Indicators (Post-Launch)

**Technical:**
- ✅ Zero 5xx errors
- ✅ <100ms response time
- ✅ <3s page load
- ✅ 90+ Lighthouse score

**Business:**
- ✅ Form submission rate +20%
- ✅ Bounce rate -15%
- ✅ Average session length +30%
- ✅ SEO rankings maintained

**Team:**
- ✅ Page build time -60%
- ✅ Bug rate <5%
- ✅ Team satisfied with codebase
- ✅ New pages take <2 hours

---

**Timeline: 12-16 weeks from start to live**

**Investment: $9,300-13,800 in development**

**ROI: 60% faster builds, better performance, foundation for internal tools**

See also:
- React_Migration_Design_System.md (technical architecture)
- Brand_Consistency_Implementation_Guide.md (design tokens)
