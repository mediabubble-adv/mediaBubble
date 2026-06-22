# MediaBubble Development Plan — Cursor IDE Execution Guide

**Execute the 12-week plan directly in Cursor IDE with AI-assisted development**

---

## 🎯 Quick Setup (Do This First)

### 1. Open Project in Cursor

```bash
# In your terminal
cd /path/to/mediabubble-project
cursor .
```

### 2. Enable Cursor Features for This Project

- **Codebase Indexing**: Cmd+K → "Index this codebase"
- **AI Composer**: Enable in Settings (Cmd+,) → Search "Composer"
- **Multi-file Edits**: Enable in Settings → Search "Multi-file"

### 3. Create a Cursor Rules File (`.cursor/rules.md`)

```markdown
# MediaBubble Development Rules

## Architecture

- Next.js 14 with React 18 (Nx monorepo)
- TypeScript strict mode
- Tailwind CSS with dark mode
- Context API for state management
- Custom hooks pattern

## Code Style

- Use functional components with hooks
- Add JSDoc comments to all exports
- Extract reusable hooks to `hooks/` directory
- Organize components by feature/responsibility
- Use const assertions for type safety

## Testing

- Jest + React Testing Library
- Test file location: `__tests__/` or `.test.ts`
- Minimum coverage targets: Phase 1: 15%, Phase 2: 30%, Phase 3: 80%
- Mock external services (GA, analytics)

## Security

- No hardcoded credentials
- Use environment variables for all secrets
- Content Security Policy: no 'unsafe-inline'
- Validate all user inputs
- Sanitize HTML content

## Performance

- Lazy load components with dynamic imports
- Optimize images: AVIF/WebP with responsive sizing
- Code split by route with next/dynamic
- Use React.memo for expensive components
- Monitor Core Web Vitals

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast 4.5:1 minimum
```

---

## 📅 Phase 1: Foundation & Security (Weeks 1-2)

### Day 1-2: Security Fixes

**In Cursor, use Cmd+Shift+P and run these composer commands:**

```
@codebase
Fix security issue: Remove 'unsafe-inline' from CSP in next.config.js
- Current: contentSecurityPolicy has 'unsafe-inline' in style-src
- Action: Move inline styles to external CSS or use nonce-based approach
- Files affected: apps/web-eg/next.config.js, global styles
- After: Run `npm run build` to verify no CSP violations
```

```
@codebase
Remove .env.local from git tracking
- Action: git rm --cached .env.local && echo ".env.local" >> .gitignore
- Create .env.example with placeholder values
- Commit: "chore: remove .env.local from tracking"
```

```
@codebase
Fix wildcard domain in CSP
- Current: img-src has * (wildcard)
- Action: Replace with explicit domains
- File: apps/web-eg/next.config.js
- Example: img-src 'self' https://cdn.mediabubble.co https://images.unsplash.com
```

### Day 2-3: Bug Fixes

```
@codebase
Fix GA4 consent race condition in GoogleAnalytics.tsx
- Issue: Multiple useEffect hooks can desynchronize state
- Solution: Combine useEffect hooks or use useReducer
- Test: Verify consent state updates atomically
- File: apps/web-eg/components/GoogleAnalytics.tsx
```

```
@codebase
Add error boundary to root layout
- File: apps/web-eg/app/layout.tsx
- Create: apps/web-eg/app/error.tsx
- Component: ErrorBoundary wrapping children
- Fallback: User-friendly error page
```

```
@codebase
Fix localStorage error handling
- Issue: No try/catch around localStorage access
- Action: Wrap all localStorage calls in try/catch
- Create utility: apps/web-eg/lib/storage.ts
- Export: getItem(), setItem(), removeItem() helpers
```

### Day 3-4: Testing Infrastructure

```
@codebase
Set up Jest + React Testing Library
- Create: jest.config.js
- Create: jest.setup.js
- Install: npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
- Config: Extend from ts-jest preset
- Add scripts to package.json:
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
```

```
@codebase
Write first test suite for GoogleAnalytics.tsx
- File: apps/web-eg/components/__tests__/GoogleAnalytics.test.tsx
- Tests:
  1. Loads gtag script on mount
  2. Respects consent state
  3. Sends pageview on route change
  4. Handles missing consent
- Target: 100% coverage for this file
```

### Day 4-5: Project Configuration

```
@codebase
Enhance ESLint with stricter rules
- File: .eslintrc.json
- Add: @typescript-eslint/strict rules
- Add: react-hooks/exhaustive-deps
- Add: no-console (warn)
- Add: no-var (error)
- Add: prefer-const (error)
```

```
@codebase
Set up GitHub Actions CI/CD
- Create: .github/workflows/ci.yml
- Run on: push, pull_request
- Steps:
  1. Checkout code
  2. Install dependencies
  3. Run linter (npm run lint)
  4. Run tests (npm run test:coverage)
  5. Build project (npm run build)
  6. Deploy to staging (if main branch)
```

---

## 📅 Phase 2: Architecture & Code Quality (Weeks 3-4)

### Week 3: Component Refactoring

```
@codebase
Extract custom hooks library
- Create directory: apps/web-eg/hooks/
- Create files:
  - useConsent.ts (manage consent state)
  - useGA.ts (send analytics events)
  - useLocalStorage.ts (persistent state)
  - useI18n.ts (language/translation)
  - index.ts (export all)
- Each hook: Export type, JSDoc, error handling
```

```
@codebase
Create useConsent hook
- File: apps/web-eg/hooks/useConsent.ts
- Returns: { consent, grantConsent, denyConsent, mounted }
- Handles: localStorage, context provider, event listeners
- JSDoc: Full documentation with examples
- Test: Write __tests__/useConsent.test.ts
```

```
@codebase
Implement Context API for global state
- Create: apps/web-eg/contexts/ConsentContext.tsx
- Provider: ConsentProvider wraps root layout
- Hook: useConsentContext() for components
- File: apps/web-eg/app/layout.tsx → wrap children
- Test: Verify context updates propagate
```

```
@codebase
Reorganize components by feature
- Current: apps/web-eg/components/ (flat structure)
- New structure:
  components/
  ├── shared/        (reusable primitives)
  │   ├── Button.tsx
  │   ├── Card.tsx
  │   └── Input.tsx
  ├── features/      (feature-specific)
  │   ├── Hero/
  │   ├── Blog/
  │   └── Portfolio/
  ├── layout/        (layout components)
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   └── Navigation.tsx
  └── forms/         (form components)
      └── ContactForm.tsx
- Update all imports in affected files
```

### Week 3-4: Type Safety & Documentation

```
@codebase
Create comprehensive types file
- File: apps/web-eg/types/index.ts
- Exports:
  - BlogPost { id, title, slug, content, image, publishedAt }
  - PortfolioProject { id, title, description, images, link, tools }
  - PageMeta { title, description, image, canonical }
  - ConsentState { analytics, marketing, necessary }
- Add JSDoc to each type
```

```
@codebase
Enable TypeScript strict mode
- File: tsconfig.json
- Set: "strict": true
- Fix any type errors revealed
- Run: npm run build to verify
```

```
@codebase
Add JSDoc to all exports
- Pattern: Every exported function, component, hook gets JSDoc
- Include: @param, @returns, @example, @throws if applicable
- Example template:
  /**
   * Button component with multiple variants and sizes
   * @param props - Button props (variant, size, children, onClick)
   * @returns JSX.Element - Rendered button
   * @example
   * <Button variant="primary" size="lg">Click me</Button>
   */
```

---

## 📅 Phase 3: UI/UX Modernization (Weeks 5-7)

### Week 5: Design System Foundation

```
@codebase
Create Button primitive component
- File: apps/web-eg/components/shared/Button.tsx
- Variants: primary, secondary, ghost, danger
- Sizes: sm, md, lg
- States: hover, active, disabled, loading
- Exports: Button, ButtonProps type
- Use: Tailwind CSS with dark mode support
- Test: Write comprehensive test suite
```

**Cursor Composer Prompt:**

```
Create a professional Button component with:
1. Multiple variants (primary, secondary, ghost, danger)
2. Multiple sizes (sm, md, lg, xl)
3. Dark mode support
4. Loading state with spinner
5. Disabled state
6. Full TypeScript types
7. JSDoc documentation
8. Tailwind CSS styling
9. Accessibility (aria-label, disabled, etc.)
10. Unit tests

Use the design system tokens from tailwind.config.js
```

```
@codebase
Create Card, Input, Badge primitives
- Files:
  - apps/web-eg/components/shared/Card.tsx
  - apps/web-eg/components/shared/Input.tsx
  - apps/web-eg/components/shared/Badge.tsx
- Each: Variants, sizes, dark mode, TypeScript, JSDoc, tests
- Export from components/shared/index.ts
```

```
@codebase
Update Tailwind config with design system
- File: tailwind.config.js
- Add brand colors (primary, secondary, accent)
- Add dark mode configuration
- Add custom spacing scale
- Add typography (font-sizes, line-heights)
- Add shadow tokens
- Add animation presets
```

### Week 5-6: Page Redesigns

```
@codebase
Redesign Hero section on homepage
- File: apps/web-eg/app/(marketing)/page.tsx
- Design:
  1. Full-width background (gradient or image)
  2. Large headline with subheading
  3. CTA buttons (primary + secondary)
  4. Hero image/graphic on right (responsive)
  5. Scroll indicator at bottom
- Dark mode: Full support
- Mobile: Stack vertically, optimize typography
- Component: Create HeroSection.tsx
```

```
@codebase
Redesign Blog page
- File: apps/web-eg/app/(marketing)/blog/page.tsx
- Sections:
  1. Hero (title, subtitle)
  2. Featured post (large card)
  3. Post grid (3 columns on desktop, 2 on tablet, 1 on mobile)
  4. Search bar (integrated with blog search API)
  5. Categories sidebar (or pills)
  6. Pagination
- Components:
  - BlogCard.tsx (featured variant + grid variant)
  - BlogSearch.tsx (input + results)
  - BlogGrid.tsx (layout + filtering)
- Dark mode: Full support
```

```
@codebase
Redesign Portfolio page
- File: apps/web-eg/app/(marketing)/portfolio/page.tsx
- Sections:
  1. Hero (title, subtitle)
  2. Portfolio grid (3 columns, hover effects)
  3. Filter by category (buttons or dropdown)
  4. Project detail modals or separate pages
  5. CTA at bottom ("Let's work together")
- Components:
  - PortfolioCard.tsx (image + title + description)
  - PortfolioGrid.tsx (layout + filtering)
  - ProjectModal.tsx (project details)
- Features:
  - Image hover zoom
  - Category filter
  - Responsive images
```

### Week 6-7: Dark Mode Implementation

```
@codebase
Implement dark mode toggle
- File: apps/web-eg/components/layout/ThemeToggle.tsx
- Features:
  1. System preference detection
  2. Manual toggle button
  3. Persist choice to localStorage
  4. Update root HTML class (dark)
- Provider: Create ThemeProvider in contexts/
- Root layout: Wrap with ThemeProvider
```

```
@codebase
Apply dark mode to all components
- Pattern: Use Tailwind dark: prefix
- Example: className="bg-white dark:bg-slate-900 text-black dark:text-white"
- Check: Every component should have dark mode variants
- Test: Verify readability in both modes
```

---

## 📅 Phase 4: Content & Assets (Weeks 8-9)

### Week 8: Blog Content

```
@codebase
Create blog post data structure
- File: apps/web-eg/data/blog.ts
- Structure:
  {
    id: string
    slug: string
    title: string
    subtitle: string
    image: string (URL to featured image)
    imageAlt: string
    author: string
    publishedAt: Date
    updatedAt?: Date
    readingTime: number (minutes)
    category: string[]
    tags: string[]
    content: MDX content
    relatedPosts: string[] (IDs)
  }
- Create 10+ blog posts with this structure
```

```
@codebase
Optimize blog post images
- Directory: public/images/blog/
- Format: WebP + JPEG fallback
- Size: ~100KB max per image
- Dimensions: 1200x630 (16:9 aspect)
- Tools: Use ImageOptim or similar
- Update: Blog data with image URLs
```

```
@codebase
Add blog features
- Table of Contents: Auto-generate from MDX headings
- Reading Time: Calculate from content length
- Related Posts: Show 3 related by category
- Author Bio: Byline + social links
- Share Buttons: Twitter, LinkedIn, Facebook
- Newsletter CTA: Prominent signup form
```

### Week 9: Portfolio Assets

```
@codebase
Create portfolio project data
- File: apps/web-eg/data/portfolio.ts
- Structure:
  {
    id: string
    slug: string
    title: string
    description: string
    category: string
    image: string (main image)
    images: string[] (3-5 images)
    challenge: string (the problem)
    solution: string (what we did)
    results: string (outcomes/metrics)
    tools: string[]
    duration: string (e.g., "3 months")
    link?: string (to live project)
    caseStudy?: string (detailed writeup)
  }
- Create 5+ portfolio projects
```

```
@codebase
Create case study pages
- Route: /portfolio/[slug]/page.tsx
- Sections:
  1. Hero (project image + title)
  2. Overview (challenge, solution, results)
  3. Image gallery (carousel or grid)
  4. Detailed sections (process, learnings)
  5. CTA (related projects, contact)
- Component: CaseStudyLayout.tsx
- Dark mode: Full support
```

---

## 📅 Phase 5: Features & Performance (Weeks 10-11)

### Week 10: Feature Implementation

```
@codebase
Implement blog search API
- File: apps/web-eg/app/api/search/route.ts
- Endpoint: GET /api/search?q=query
- Returns: BlogPost[] matching query
- Search: Title, subtitle, tags, category
- Limit: 20 results
- Filter: By category if provided
- Client: BlogSearch.tsx uses this endpoint
```

```
@codebase
Build A/B testing framework
- File: apps/web-eg/lib/experiments.ts
- Features:
  1. Variant assignment (deterministic by user)
  2. Tracking variant in analytics
  3. React hook: useExperiment(experimentId)
  4. Returns: { variant, isLoading }
- Example: Test CTA button text variants
- Track: Conversion metrics per variant
```

### Week 11: Performance Optimizations

```
@codebase
Optimize fonts
- Action: Lazy load fonts conditionally by language
- Fonts: Load English fonts by default
- Fallback: System fonts if needed
- display: swap for faster rendering
- File: apps/web-eg/app/layout.tsx
- Test: Monitor Web Vitals improvement
```

```
@codebase
Optimize images
- Implementation:
  1. Use next/image for all images
  2. Configure responsive sizes
  3. Use WebP with JPEG fallback
  4. Lazy load below the fold
  5. Add blurred placeholder
- Example:
  <Image
    src={image}
    alt="description"
    width={1200}
    height={630}
    placeholder="blur"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
- Test: Check Lighthouse score
```

```
@codebase
Set up Service Worker for PWA
- Install: npm install next-pwa
- Configure: next.config.js with pwa plugin
- Features:
  1. Offline support
  2. Cache strategies (network-first for API, cache-first for assets)
  3. App manifest
  4. Install prompt
- File: public/manifest.json
- Test: DevTools → Application → Service Workers
```

```
@codebase
Configure ISR for blog posts
- File: apps/web-eg/app/blog/[slug]/page.tsx
- Export: revalidate = 3600 (1 hour)
- On-demand: Trigger revalidation via API
- Endpoint: /api/revalidate?slug=post-name
- Benefit: Fresh content without full rebuild
```

---

## 📅 Phase 6: Polish & Launch (Week 12)

### Final Week: QA & Deployment

```
@codebase
Write E2E tests with Playwright
- Install: npm install --save-dev @playwright/test
- Config: playwright.config.ts
- Tests:
  1. Homepage loads and interactive
  2. Blog search works
  3. Portfolio filters work
  4. Contact form submits
  5. Dark mode toggle works
  6. Mobile responsive
- Run: npm run test:e2e
```

```
@codebase
Performance audit
- Tools:
  1. npm run build (check bundle size)
  2. Lighthouse (npm install lighthouse)
  3. npm run test:coverage (coverage report)
- Targets:
  - Bundle < 200KB gzipped
  - Lighthouse > 90 (all categories)
  - Coverage > 80%
- Fix: Any issues found
```

```
@codebase
Set up error monitoring with Sentry
- Install: npm install @sentry/nextjs
- Configure: apps/web-eg/next.config.js + middleware
- Capture:
  1. Unhandled errors
  2. Performance metrics
  3. Custom error messages
- Dashboard: Monitor in production
```

```
@codebase
Final deployment checklist
- [ ] All tests passing (npm run test)
- [ ] Lighthouse score 90+ (all categories)
- [ ] No console errors in production build
- [ ] Accessibility audit passed
- [ ] Mobile responsive (all pages)
- [ ] Dark mode functional
- [ ] Blog search working
- [ ] Portfolio filters working
- [ ] Contact form submitting
- [ ] Service worker registered
- [ ] Error monitoring active
- [ ] Analytics tracking (GA4)
- [ ] Security headers present
- [ ] No hardcoded credentials
- [ ] Environment variables configured
- [ ] CI/CD pipeline passing
```

---

## 🎯 Using Cursor's AI Features Effectively

### Composer Commands (Cmd+K)

**For file creation:**

```
@codebase
Create a new component [name] that:
- Purpose: [what it does]
- Props: [TypeScript interface]
- Features: [list of features]
- Styling: [Tailwind classes]
```

**For refactoring:**

```
@codebase
Refactor [file] to:
- Extract [function/component] to separate file
- Update imports in affected files
- Add TypeScript types
- Add unit tests
```

**For bug fixes:**

```
@codebase
Fix [issue description]
- File: [affected file]
- Problem: [what's wrong]
- Solution: [how to fix]
- Test: [how to verify]
```

### Chat Features (Cmd+L)

**Use for:**

- Asking about code patterns
- Debugging issues
- Architecture questions
- Review suggestions
- Documentation

**Example:**

```
@codebase
Why is the GA consent race condition happening?
What's the best way to fix it with hooks?
Show me the pattern you recommend.
```

### Multi-file Edits

**Enable and use for:**

- Refactoring across multiple files
- Moving/renaming components
- Applying patterns consistently

**Example:**

```
Cmd+Shift+P → "Multi-file Edit"
Select Button, Card, Input components
Replace: className patterns for dark mode
```

---

## 📊 Weekly Progress Checklist

### Week 1-2: Foundation

```
✅ Security fixes complete
✅ Bugs resolved
✅ Testing infrastructure set up
✅ First tests written (15% coverage)
✅ CI/CD pipeline configured
```

### Week 3-4: Architecture

```
✅ Custom hooks library created
✅ Context API implemented
✅ Components reorganized
✅ TypeScript strict enabled
✅ JSDoc documentation added
✅ 30% test coverage achieved
```

### Week 5-7: UI/UX

```
✅ Design system components built (30+)
✅ Hero section redesigned
✅ Blog page modernized
✅ Portfolio page enhanced
✅ Dark mode fully functional
✅ All pages responsive
```

### Week 8-9: Content

```
✅ 10+ blog posts with images
✅ 5+ portfolio projects documented
✅ Case study pages created
✅ All images optimized
✅ Content structure finalized
```

### Week 10-11: Features

```
✅ Blog search implemented
✅ A/B testing framework ready
✅ Fonts optimized
✅ Images optimized
✅ Service worker installed
✅ ISR configured
```

### Week 12: Polish

```
✅ E2E tests written
✅ Lighthouse score 90+
✅ Performance audited
✅ Error monitoring active
✅ Final QA complete
✅ Deployed to production
```

---

## 🚀 Quick Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter

# Testing
npm run test             # Run Jest tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:e2e         # Run Playwright tests

# Analysis
npm run analyze          # Bundle analysis
npm run lighthouse       # Run Lighthouse audit

# Git
git add .
git commit -m "feat: [description]"
git push origin main
```

---

## ✅ Success Criteria by Phase

**Phase 1**: Zero security issues, 15% test coverage, CI/CD working
**Phase 2**: TypeScript strict, 30% coverage, reorganized architecture
**Phase 3**: 30+ components, all pages redesigned, dark mode live
**Phase 4**: 10+ blog posts, 5+ portfolios, images optimized
**Phase 5**: Search working, PWA installed, Lighthouse 90+
**Phase 6**: E2E tests passing, monitoring active, production deployed

---

## 📞 Cursor IDE Pro Tips

1. **Use `@codebase` prefix** for context-aware suggestions
2. **Use `@file` to focus** on specific files
3. **Use `Ctrl+K` for quick commands** in code
4. **Use Chat (Cmd+L)** for architectural questions
5. **Enable Composer** for multi-step operations
6. **Pin important files** in sidebar for quick access
7. **Use Code Folding** to hide less relevant code
8. **Set up `.cursor/rules.md`** for consistent AI suggestions

**Start with Phase 1, Day 1. Each day should take 4-8 hours.**

Let's build! 🎉
