# Claude Code Implementation Prompt for MediaBubble App

## 🎯 Master Prompt for Full App Refactor

Copy this prompt and use it with Claude Code to implement the audit recommendations systematically.

---

## PART 1: DESIGN SYSTEM & FOUNDATION

### Prompt 1.1: Create Design Token System

````
You are a senior frontend architect working on MediaBubble's React app.

OBJECTIVE:
Create a complete design token system for MediaBubble that ensures 100% consistency across the entire application. This is the foundation for all future components and styling.

REQUIREMENTS:
1. Create a `src/tokens/` directory with the following structure:
   - colors.ts (all brand colors + semantic colors)
   - typography.ts (font families, sizes, weights, line heights)
   - spacing.ts (8px unit system: xs, sm, md, lg, xl, xxl)
   - shadows.ts (elevation shadow styles)
   - borderRadius.ts (consistent radius values)
   - transitions.ts (animation timing, easing)
   - zIndex.ts (consistent z-index layers)

2. Color Palette Must Include:
   PRIMARY:
   - Brand Blue: #0D3A7D (primary actions, sidebar)
   - Brand Yellow: #FFC107 (CTAs, accents, hover states)

   NEUTRAL:
   - Dark Gray: #1a1a1a (headings, primary text)
   - Medium Gray: #666666 (secondary text)
   - Light Gray: #F5F5F5 (backgrounds)
   - White: #FFFFFF (cards, surfaces)

   STATUS:
   - Success: #4CAF50
   - Error: #F44336
   - Warning: #FFC107
   - Info: #2196F3

   DARK MODE:
   - Dark BG: #0f0f0f
   - Dark Surface: #1a1a1a
   - Dark Elevated: #2a2a2a

3. Typography Must Define:
   - Font Family: [Choose: Inter, Poppins, or system fonts]
   - Font Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 40px
   - Font Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
   - Line Heights: 1.2, 1.3, 1.4, 1.5, 1.6

   Define named scales:
   - h1: 32px, bold, 1.2 lh
   - h2: 24px, bold, 1.3 lh
   - h3: 20px, semibold, 1.4 lh
   - body: 16px, regular, 1.5 lh
   - caption: 12px, regular, 1.4 lh

4. Spacing System (8px baseline):
   - xs: 4px
   - sm: 8px
   - md: 16px
   - lg: 24px
   - xl: 32px
   - xxl: 48px

5. Export as:
   - TypeScript objects (for direct code usage)
   - CSS variables (for global styles)
   - Tailwind config (for Tailwind integration)

DELIVERABLES:
- src/tokens/ directory with all token files
- src/styles/globals.css with CSS variables
- tailwind.config.ts with token mappings
- src/tokens/index.ts with barrel export
- README in tokens/ explaining usage

CODE STYLE:
- TypeScript with proper types
- Immutable const objects
- Semantic naming (e.g., "colorStatusError" not "colorRed")
- JSDoc comments explaining each token
- No hardcoded colors in components after this

EXAMPLES OF TOKEN USAGE:
```tsx
// In components, use tokens only:
import { colors, spacing, typography } from '@/tokens'

const styles = {
  button: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.primary.blue,
    color: colors.neutral.white,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  }
}
````

VERIFICATION:

- [ ] All colors have WCAG AA contrast (4.5:1 for text)
- [ ] Spacing follows 8px unit system
- [ ] Typography scales are readable (16px minimum for body)
- [ ] All exports work in components
- [ ] CSS variables work in browser DevTools
- [ ] Tailwind config integrates properly

```

---

### Prompt 1.2: Set Up Tailwind CSS with Tokens

```

You are configuring Tailwind CSS for MediaBubble to use our new design tokens.

OBJECTIVE:
Configure Tailwind CSS to use the design token system, ensuring all utilities respect brand colors, spacing, and typography.

REQUIREMENTS:

1. Update tailwind.config.ts to:
   - Extend theme with token colors
   - Map spacing scale to Tailwind spacing
   - Define custom typography utilities
   - Add custom color variables
   - Set dark mode strategy

2. Create src/styles/globals.css with:
   - CSS variables from tokens
   - Tailwind directives (@tailwind)
   - Global styles (html, body, fonts)
   - Dark mode color variables

3. Create custom Tailwind utilities:
   - Container queries utilities
   - Elevation (shadow) utilities matching tokens
   - Animation utilities from transitions
   - Custom text utilities (headings: h1, h2, h3, etc.)

EXAMPLE CONFIG:

```ts
// tailwind.config.ts
import { colors, spacing, typography } from "./src/tokens";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        status: colors.status,
      },
      spacing: {
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        xxl: spacing.xxl,
      },
      fontSize: {
        h1: [typography.sizes.h1, { lineHeight: typography.lineHeights.h1 }],
        h2: [typography.sizes.h2, { lineHeight: typography.lineHeights.h2 }],
        body: [
          typography.sizes.body,
          { lineHeight: typography.lineHeights.body },
        ],
      },
    },
  },
};
```

DELIVERABLES:

- Updated tailwind.config.ts
- src/styles/globals.css with CSS variables
- src/styles/index.css with custom utilities
- Documentation on using Tailwind with tokens

VERIFICATION:

- [ ] Tailwind build succeeds
- [ ] Colors match token definitions
- [ ] Spacing utilities work (p-sm, m-md, etc.)
- [ ] Typography utilities render correctly
- [ ] Dark mode works (toggle class on <html>)

```

---

## PART 2: COMPONENT LIBRARY

### Prompt 2.1: Build Button Component

```

You are building MediaBubble's Button component system using tokens.

OBJECTIVE:
Create a flexible, accessible Button component with variants, sizes, and states that follows design tokens and WCAG 2.1 AA standards.

REQUIREMENTS:

1. Create src/components/Button.tsx with:
   - TypeScript interface with all props
   - Variants: primary, secondary, danger, ghost, link
   - Sizes: xs, sm, md, lg
   - States: default, hover, active, disabled, loading
   - Proper ARIA attributes

2. Accessibility Requirements:
   - Keyboard navigable (Tab, Enter, Space)
   - Focus indicators visible (no outline: none)
   - aria-disabled for disabled buttons
   - aria-label for icon-only buttons
   - Semantic <button> element (not <div>)
   - Proper color contrast (4.5:1)

3. Props Interface:
   - variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link'
   - size: 'xs' | 'sm' | 'md' | 'lg'
   - disabled: boolean
   - loading: boolean
   - fullWidth: boolean
   - onClick: () => void
   - children: ReactNode
   - className: string (for overrides)

4. Styling:
   - Use tokens for colors, spacing, typography
   - Consistent padding: md size has 12px vertical, 16px horizontal
   - Rounded corners: 4px (or token value)
   - Transition: 200ms ease-in-out
   - Hover state: 10% darker/lighter

5. Loading State:
   - Show spinner icon when loading={true}
   - Disable button during loading
   - Preserve button width (no layout shift)

EXAMPLE USAGE:

```tsx
<Button
  variant="primary"
  size="md"
  onClick={handleClick}
  disabled={isLoading}
  loading={isLoading}
>
  {isLoading ? "Creating..." : "Create Campaign"}
</Button>
```

DELIVERABLES:

- src/components/Button.tsx
- src/components/Button.stories.tsx (Storybook)
- Test file with unit tests
- CSS/Tailwind styling

VERIFICATION:

- [ ] All variants render correctly
- [ ] All sizes render with proper scaling
- [ ] Focus indicator visible on Tab
- [ ] Loading spinner shows + button disables
- [ ] Color contrast ≥4.5:1
- [ ] Works with mouse, keyboard, screen reader

```

---

### Prompt 2.2: Build Form Components (Input, Select, Textarea, Checkbox)

```

You are building accessible form components for MediaBubble.

OBJECTIVE:
Create a suite of form components (Input, Select, Textarea, Checkbox, Radio) with proper validation, error states, and accessibility.

REQUIREMENTS FOR EACH COMPONENT:

INPUT COMPONENT (src/components/Input.tsx):

- Props: label, placeholder, value, onChange, error, disabled, required, type, helperText
- Validation feedback (color: error red)
- Required indicator (asterisk + bold label)
- Helper text below input
- Placeholder example: "e.g., your@company.com"
- Min height: 40px (touch-friendly)
- Focus: visible ring (2px, brand color)

SELECT COMPONENT (src/components/Select.tsx):

- Props: label, options, value, onChange, error, placeholder, disabled
- Proper <select> element or custom accessible select
- Error state styling
- Required indicator

TEXTAREA COMPONENT (src/components/Textarea.tsx):

- Props: label, value, onChange, error, placeholder, rows, maxLength
- Character counter (optional)
- Resize handle (or disable resize)
- Same accessibility as Input

CHECKBOX COMPONENT (src/components/Checkbox.tsx):

- Props: label, checked, onChange, disabled, required, error
- Custom styled checkbox (square, brand color when checked)
- Label clickable (associated with input)

RADIO COMPONENT (src/components/Radio.tsx):

- Props: label, value, checked, onChange, name
- Circular radio button
- Proper grouping (use RadioGroup wrapper)

UNIVERSAL REQUIREMENTS:

1. All connected to labels (<label for="inputId">)
2. Error messages specific: ❌ "Email already registered. [Sign in instead?]"
3. Helper text: "(We'll never share this)"
4. Disabled state: 50% opacity, cursor: not-allowed
5. Focus state: 2px ring in brand color
6. Touch-friendly: minimum 44px height
7. Validation: Real-time or on blur (not wait until submit)

VALIDATION EXAMPLE:

```tsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const handleEmailChange = (value) => {
  setEmail(value);
  // Real-time validation
  if (value && !isValidEmail(value)) {
    setError("Please enter a valid email");
  } else {
    setError("");
  }
};

<Input
  label="Email Address"
  placeholder="e.g., your@company.com"
  value={email}
  onChange={handleEmailChange}
  error={error}
  required
  helperText="We'll never share this"
/>;
```

DELIVERABLES:

- src/components/Input.tsx
- src/components/Select.tsx
- src/components/Textarea.tsx
- src/components/Checkbox.tsx
- src/components/Radio.tsx
- src/components/RadioGroup.tsx
- Storybook stories for each
- Test files with validation tests

VERIFICATION:

- [ ] Labels properly associated with inputs
- [ ] Tab through all components
- [ ] Error messages are specific and helpful
- [ ] Touch targets are ≥44px
- [ ] Focus indicators visible
- [ ] Screen reader announces labels + errors
- [ ] Validation works in real-time

```

---

### Prompt 2.3: Build Card, Modal, Notification Components

```

You are building layout and feedback components for MediaBubble.

OBJECTIVE:
Create Card, Modal, and Notification (Toast) components that handle loading, empty, and error states with proper accessibility.

CARD COMPONENT (src/components/Card.tsx):

- Props: children, className, header, footer, loading, error, empty
- Background: white, border: 1px light gray, radius: 4px
- Padding: 16px (md spacing)
- Hover: subtle shadow elevation
- Loading state: Show skeleton or overlay spinner
- Error state: Show error message + retry button
- Empty state: Show empty state UI (illustration + message)

EXAMPLE:

```tsx
<Card
  header="Q2 2026 Campaign Performance"
  loading={isLoading}
  error={error}
  empty={!campaigns.length}
>
  {campaigns.map((c) => (
    <CampaignRow key={c.id} campaign={c} />
  ))}
</Card>
```

MODAL COMPONENT (src/components/Modal.tsx):

- Props: isOpen, onClose, title, children, size, action, loading
- Backdrop: dark overlay (50% opacity)
- Dialog: white card, centered on screen
- Sizes: sm (400px), md (600px), lg (800px)
- Close button: X in top-right
- Keyboard: Escape closes modal
- Focus trap: Tab stays within modal
- Semantic: <dialog> or role="dialog"

EXAMPLE:

```tsx
<Modal
  isOpen={showCreateModal}
  onClose={closeModal}
  title="Create New Campaign"
  action={{ label: "Create", onClick: handleCreate }}
>
  <CampaignForm />
</Modal>
```

NOTIFICATION (TOAST) COMPONENT (src/components/Toast.tsx):

- Props: message, type, duration, action, dismissible, position
- Types: success, error, warning, info
- Auto-dismiss: 3000ms (3 seconds)
- Position: top-right (default), top-left, bottom-right, bottom-left
- Dismissible: X button to close
- Icons: ✓ (success), ❌ (error), ⚠️ (warning), ℹ️ (info)
- Queue multiple toasts (don't stack)

EXAMPLE:

```tsx
// Show success toast
showToast({
  message: "✓ Campaign published successfully!",
  type: "success",
  duration: 3000,
  action: { label: "View", onClick: navigateToCampaign },
});

// Show error with retry
showToast({
  message: "❌ Failed to save campaign. ",
  type: "error",
  action: { label: "Retry", onClick: retrySave },
});
```

SKELETON COMPONENT (src/components/Skeleton.tsx):

- Props: width, height, className
- Animated shimmer effect (0.5s pulse)
- Used in loading states
- Match shape of actual content (avatar, text, etc.)

EMPTY STATE COMPONENT (src/components/EmptyState.tsx):

- Props: icon, title, description, action
- Large icon/illustration
- Clear title: "No campaigns yet"
- Description: "Get started by creating your first campaign."
- Primary CTA: "Create First Campaign"

EXAMPLE:

```tsx
<EmptyState
  icon={<PlusIcon />}
  title="No Campaigns Yet"
  description="Get started by creating your first campaign."
  action={{ label: "Create Campaign", onClick: openCreateModal }}
/>
```

DELIVERABLES:

- src/components/Card.tsx
- src/components/Modal.tsx
- src/components/Toast.tsx (provider + hook)
- src/components/Skeleton.tsx
- src/components/EmptyState.tsx
- Storybook stories
- Test files

VERIFICATION:

- [ ] Modal: Escape closes, Tab traps focus
- [ ] Toast: Auto-dismisses after 3s, dismissible manually
- [ ] Skeleton: Shimmer animation smooth
- [ ] EmptyState: Renders icon + message + CTA
- [ ] Card: Loading/error/empty states work
- [ ] All accessible (keyboard navigation, screen reader)

```

---

## PART 3: CONTENT & COPY

### Prompt 3.1: Rewrite Landing Page Copy

```

You are a UX copywriter rewriting MediaBubble's landing page for maximum clarity and conversion.

OBJECTIVE:
Rewrite the landing page with benefit-driven copy, clear value proposition, and compelling CTAs.

CURRENT STATE (Examples):

- Generic headline: "MediaBubble - Comprehensive Marketing Services"
- Vague value prop: "We offer marketing solutions"
- Weak CTAs: "Learn More," "Submit"

TARGET STATE:

- Specific headline with unique value
- Clear metrics/proof points
- Action-oriented CTAs
- Emotional connection
- Social proof

REQUIREMENTS:

1. HERO SECTION (Above the fold):
   Headline: [Must answer: "Why MediaBubble?"]
   - Current: "MediaBubble - Marketing Agency"
   - Better: "Hurghada's #1 Marketing Agency for Business Growth"
   - Even better: "Grow Your Business 2-3X in 12 Months | Proven Strategy + Expert Execution"

   Subheading: [Must answer: "What do you do?"]
   - Current: "We provide comprehensive marketing services"
   - Better: "From strategy to execution—we turn local businesses into market leaders using data-driven campaigns that deliver measurable ROI."

   Three Proof Points (Trust Building):
   - "35% average client growth in 12 months"
   - "92% client retention rate (they stay because we deliver)"
   - "500+ projects delivered across Hurghada"

   CTA Buttons:
   - Primary: "Get Your Free Strategy Audit" (benefit + no friction)
   - Secondary: "View Case Studies & Results" (social proof)

2. VALUE PROPOSITION SECTION:
   "Why Choose MediaBubble?"

   Instead of listing services, show outcomes:
   - ✓ Clients average 2.5x more website traffic
   - ✓ 18-month average client lifetime value (shows sustainability)
   - ✓ Direct access to founders (no account managers)
   - ✓ Transparent reporting (see exactly where every dirham goes)
   - ✓ 60-day performance guarantee or money back

3. SERVICES OVERVIEW:
   Instead of: "We offer SEO, PPC, Social Media..."
   Say: "Everything Your Business Needs to Dominate Online"

   Each service card should show:
   - Icon/illustration
   - Outcome (not feature)
   - Example metric
   - CTA

   SEO Example:
   BEFORE: "Search Engine Optimization - We optimize your website for search engines"
   AFTER:

   ```
   Rank Higher, Get More Customers
   Get found by people searching for your exact services.
   Average client gains 2.5x organic traffic in 6 months.
   [Request SEO Audit]
   ```

4. CASE STUDIES / SOCIAL PROOF:
   Format: "Client Name - Industry - Result"

   Example:

   ```
   Aldau Resort
   Tourism/Hospitality

   "MediaBubble helped us increase bookings by 45% in 6 months.
   Their strategy is transparent and their results speak for themselves."
   — Sarah Hassan, Marketing Director

   Results: 45% booking increase | 3.2x organic traffic | 25% email list growth
   ```

5. FAQ / COMMON OBJECTIONS:
   Q: "How long until we see results?"
   A: "Most clients see improvement in 30 days (faster), measurable impact in 60-90 days. We provide weekly reports so you see progress every step."

   Q: "How much does this cost?"
   A: "Depends on scope. Our audit is free. Plans start at EGP 5,000/month for maintenance, EGP 15,000+ for growth campaigns. Let's discuss your specific goals."

   Q: "What if we're not happy?"
   A: "60-day guarantee. If you're not seeing results, we'll work for free or refund your investment."

6. FINAL CTA SECTION:
   Headline: "Ready to Grow Your Business?"
   Copy: "Let's start with a free, no-pressure strategy call. We'll audit your current marketing and show exactly how we'd help you grow."

   Buttons:
   - [Book Free Strategy Call] (primary)
   - [Send me a proposal] (secondary)

WRITING PRINCIPLES:

- Benefits over features ("2x more traffic" not "advanced SEO optimization")
- Specificity ("35% growth" not "significant growth")
- Social proof throughout ("Trusted by 50+ local businesses")
- Action-oriented CTAs ("Get Audit" not "Learn More")
- Address objections early ("60-day guarantee")
- Human tone ("we," "you," contractions allowed)
- Scannable (short paragraphs, bullet points, clear hierarchy)

DELIVERABLES:

- Rewritten homepage copy (hero, sections, CTAs)
- Service card copy (all 4 pillars)
- Case study templates
- FAQ section
- Email signup copy
- All in Markdown for easy implementation

WORD COUNT TARGETS:

- Hero headline: 8-12 words
- Hero subheading: 20-30 words
- Section headlines: 6-10 words
- Body copy: Short paragraphs (2-3 sentences max)
- CTAs: 3-5 words ("Get Audit" not "Click to learn more")

VERIFICATION:

- [ ] Every headline answers a question
- [ ] Copy includes specific metrics
- [ ] All CTAs are benefit-driven
- [ ] Tone is professional but approachable
- [ ] No jargon (or explained if used)
- [ ] Mobile-friendly (scannable on phones)

```

---

### Prompt 3.2: Rewrite Service Descriptions

```

You are rewriting MediaBubble's service descriptions to emphasize outcomes, not features.

OBJECTIVE:
Transform generic service descriptions into outcome-focused content that shows clients exactly what they'll gain.

REQUIREMENTS FOR EACH SERVICE:

FORMAT:

```
[Service Name] - Focus on Outcome
Benefit-driven copy (40 words)

What's included:
✓ [Specific deliverable]
✓ [Specific deliverable]
✓ [Specific deliverable]
✓ [Specific deliverable]

Average client result: [Specific metric]

[CTA: "Request [Service] Audit"]
```

EXAMPLES:

1. SEO - "Rank Higher, Get More Customers"
   "Get found by people actively searching for your services. Our proven SEO strategy increases organic traffic consistently and delivers new qualified leads every month."

   What's included:
   ✓ Keyword strategy (high-intent keywords only)
   ✓ Technical SEO audit (site health score)
   ✓ On-page optimization (titles, metadata, schemas)
   ✓ Content strategy (topical authority building)
   ✓ Link building (authority growth)
   ✓ Monthly performance reports (see exact ROI)

   Average client result: 2.5x organic traffic in 6 months

2. PPC (Google Ads / Social Ads) - "Reach Customers Ready to Buy"
   "Skip the waiting and get visible immediately. Our PPC experts run highly targeted campaigns that put your ads in front of people ready to buy, maximizing every dirham spent."

   What's included:
   ✓ Campaign strategy (audience + keyword targeting)
   ✓ Ad copywriting (high-converting ads)
   ✓ Landing page optimization (higher conversion rates)
   ✓ Daily budget optimization (no wasted spend)
   ✓ A/B testing (continuous improvement)
   ✓ Weekly performance reports (detailed ROI tracking)

   Average client result: 3:1 ROAS (3 pounds back for every 1 pound spent)

3. Social Media Management - "Build Your Brand Community"
   "Consistent, strategic posts that grow engagement and turn followers into loyal customers. We handle content creation, posting, and community management so you can focus on your business."

   What's included:
   ✓ Content calendar (planned 30 days out)
   ✓ Content creation (3-4 posts per week)
   ✓ Community management (responds to comments/DMs)
   ✓ Hashtag strategy (discoverability optimization)
   ✓ Monthly analytics report (what's working)
   ✓ Strategy reviews (quarterly adjustments)

   Average client result: 150-200% follower growth in 6 months

4. Brand Development - "Become Unforgettable"
   "A strong brand makes you stand out, commands higher prices, and attracts ideal customers. We develop cohesive branding that tells your unique story and resonates with your target market."

   What's included:
   ✓ Brand strategy workshop (positioning, messaging)
   ✓ Logo design & brand identity
   ✓ Brand guidelines (professional brand system)
   ✓ Brand messaging framework (consistent voice)
   ✓ Visual identity system (colors, fonts, imagery)
   ✓ Brand rollout support (implement across all touchpoints)

   Average client result: 20-30% price increase + stronger market position

TONE & STYLE REQUIREMENTS:

- Start with outcome, not feature
- Include specific deliverables (not vague "consulting")
- Add social proof (average results, client metrics)
- Use specific numbers (not "many," "significant")
- Address the "why" (why this service matters)
- Include clear CTA
- Write for the business owner, not the marketing person
- Use benefit language ("get found" not "SEO optimization")

PLATFORM-SPECIFIC NOTES:

- Website: Full descriptions (300-400 words per service)
- Social media: Short version (50-75 words, benefit focus)
- Email: Mid-length (100-150 words, with CTA)
- Sales deck: Short with metrics only

DELIVERABLES:

- Rewritten descriptions for all 4 service pillars
- Short versions for social media
- Email campaign versions
- Sales page copy
- Service comparison chart (if multiple tiers exist)

VERIFICATION:

- [ ] Each description starts with outcome, not feature
- [ ] Includes 3-5 specific deliverables
- [ ] Includes average client metric
- [ ] CTA is benefit-driven ("Get Audit" not "Learn More")
- [ ] No jargon or explained thoroughly
- [ ] Professional but conversational tone
- [ ] Mobile-friendly (scannable)

```

---

## PART 4: USER EXPERIENCE & FLOWS

### Prompt 4.1: Build Onboarding Flow

```

You are designing the onboarding flow for new MediaBubble users.

OBJECTIVE:
Create a smooth, guided 5-step onboarding experience that gets new users to their first campaign within 5 minutes.

REQUIREMENTS:

STEP 1: Welcome Screen (Sign Up / Login)

- Title: "Welcome to MediaBubble Pro"
- Subheading: "Create campaigns, track results, grow your business"
- Input: Email address
- Action: [Sign Up Free] [Already have account? Sign In]
- Progress: 1/5

STEP 2: Account Setup (Profile Information)

- Title: "Tell us about your business"
- Fields:
  - Business name (required)
  - Industry (dropdown)
  - Monthly budget (optional, but helps us recommend services)
  - Current marketing tools (checkboxes: Google Analytics, HubSpot, etc.)
- Progress: 2/5
- Buttons: [Skip] [Next]

STEP 3: Campaign Setup (Main Goal)

- Title: "Create your first campaign"
- Fields:
  - Campaign name (e.g., "Q2 2026 Blog Growth")
  - Service type (radio: SEO, PPC, Social, Branding, Other)
  - Primary goal (dropdown: More traffic, More leads, More sales, Brand awareness)
  - Target metric (e.g., "Increase traffic to 5,000/month")
- Progress: 3/5
- Buttons: [Back] [Next]

STEP 4: Connect Integrations

- Title: "Connect your tools (optional but recommended)"
- Checkboxes:
  - [ ] Google Analytics (shows real traffic data)
  - [ ] Google Search Console (for SEO tracking)
  - [ ] HubSpot (for lead tracking)
  - [ ] Facebook Ads (for social campaign reporting)
- Info: "This helps us provide better insights and automated reporting"
- Progress: 4/5
- Buttons: [Skip] [Next]

STEP 5: Success Confirmation

- Title: "🎉 Campaign Created!"
- Subheading: "Your campaign is live. Here's what's next:"
- Timeline:
  - Day 1: Review your campaign settings & connect integrations
  - Day 3: First performance data arrives
  - Day 7: Strategy recommendations based on early data
- Action buttons:
  - [View Dashboard] (primary)
  - [Schedule Call with Strategist] (secondary)
  - [See Onboarding Guide] (tertiary)
- Progress: 5/5

FORM VALIDATION:

- Email: Real-time validation, show error if invalid
- Business name: Required, min 2 characters
- Campaign name: Required, unique
- Show validation errors immediately (not on submit)
- Success checkmark when valid
- Loading state during form submission

MOBILE OPTIMIZATION:

- Steps stack vertically on mobile
- Progress bar shows current step
- Full-width inputs and buttons
- No horizontal scrolling
- Font size: 16px minimum (prevents iOS zoom)

UX BEST PRACTICES:

- Auto-save form progress (if user closes browser)
- Save draft: "Save and finish later" link
- Progress indicator: Step 2/5 (shows completion)
- No required fields marked with \* (label it clearly instead)
- Clear error messages: ❌ "Business name must be at least 2 characters"
- Loading state: "Creating campaign..." spinner
- Accessibility: Tab through entire flow, screen reader announces steps

SKIPPABLE STEPS:

- Step 2: Can skip account details, use defaults
- Step 4: Can skip integrations (add later in settings)
- Cannot skip Steps 1, 3, 5

ERROR HANDLING:

- If email already exists: "This email is already registered. [Sign in instead?]"
- If campaign creation fails: Show error message, [Retry] button
- Timeout: "This is taking longer than expected. [Try Again]"

SUCCESS TRACKING:

- Record completion metrics
- Track which steps users skip
- Monitor dropout rate (e.g., if many drop at Step 4, improve it)

DELIVERABLES:

- src/pages/onboarding/ directory
- src/components/OnboardingStep.tsx (generic step wrapper)
- src/components/OnboardingForm.tsx (form container)
- Separate components for each step
- Storybook stories showing all steps
- Test file with form validation tests

VERIFICATION:

- [ ] All 5 steps render correctly
- [ ] Form validation works in real-time
- [ ] Can navigate back/forward
- [ ] Mobile layout stacks properly
- [ ] Error messages are specific
- [ ] Loading states work
- [ ] Can tab through entire flow
- [ ] Screen reader announces step progress
- [ ] Auto-save works (check localStorage)

```

---

### Prompt 4.2: Build Loading, Empty, Error States

```

You are designing the loading, empty, and error states for all MediaBubble components.

OBJECTIVE:
Create a consistent user experience for async operations, empty data, and error conditions.

REQUIREMENTS:

LOADING STATE PATTERNS:

1. Skeleton Screens (Preferred for content)
   - Match shape of actual content
   - Subtle shimmer animation
   - Never show "Loading..." text

   Example (Campaign List):

   ```
   [████████] [████] [████]  <- Skeleton campaign row
   [████████] [████] [████]  <- Skeleton campaign row
   [████████] [████] [████]  <- Skeleton campaign row
   ```

2. Progress Bar (For long operations)
   - Indeterminate: animated bar (0-100% over time)
   - Determinate: [=====> ] 45% Complete (if you have ETA)
   - Text: "Generating report... (estimated 30 seconds)"

3. Spinner with Text (For short operations)
   - Centered spinner icon
   - Text below: "Publishing campaign..."
   - Full-page overlay (not just inline)

LOADING STATE RULES:

- [ ] Don't show placeholder text ("Loading...")
- [ ] Show skeleton if response < 2 seconds
- [ ] Show spinner if response < 10 seconds
- [ ] Show error if response > 30 seconds
- [ ] Don't disable UI unless necessary (allow cancel/back)
- [ ] Show estimated wait time if > 5 seconds

EMPTY STATE PATTERN:

Structure:

```
[Large Icon/Illustration]

Title (Bold, 18-20px)
"No campaigns yet"

Description (Gray, secondary color)
"Get started by creating your first campaign.
We'll guide you through setup."

Primary CTA
[Create Your First Campaign]

Optional secondary link
[View Setup Guide]
```

Empty State Examples:

1. Dashboard (No campaigns):

   ```
   🎯 Icon
   No Campaigns Yet
   Create your first campaign to get started.
   We'll handle the rest.
   [Create Campaign]
   ```

2. Reports (No data available):

   ```
   📊 Icon
   No Data Available
   Your campaign needs 7 days of data before
   we can show performance insights.
   [Create Campaign] [View Guide]
   ```

3. Search Results (No matches):

   ```
   🔍 Icon
   No Results Found
   We couldn't find campaigns matching "budget overrun".
   [Clear Search] [View All Campaigns]
   ```

4. Error Loading Data:
   ```
   ⚠️ Icon
   Something Went Wrong
   We couldn't load your campaigns.
   [Try Again] [Contact Support]
   ```

EMPTY STATE RULES:

- [ ] Show icon (illustration or icon)
- [ ] Explain what's missing (don't assume)
- [ ] Show how to fix it (not just "nothing here")
- [ ] Provide primary CTA (create, upload, etc.)
- [ ] Optional: secondary link (guide, help)
- [ ] Use white space effectively (don't feel cramped)

ERROR STATE PATTERN:

Structure:

```
[Error Icon - Usually Red]

Title (Clear error summary)
"Campaign Publication Failed"

Description (Specific, not generic)
"Your campaign has 2 validation errors:
1. Missing campaign name
2. Budget must be at least EGP 5,000"

Recovery Options
[Fix Issues] [Save as Draft] [Contact Support]
```

Error Message Guidelines:

- ❌ "Error 500: Internal Server Error"
- ✓ "We couldn't save your campaign. Please check your internet and try again."
- ❌ "Validation failed"
- ✓ "Campaign name is required. Please enter a name (2-100 characters)."
- ❌ "Database timeout"
- ✓ "This is taking longer than expected. [Try Again]"

Error Categories:

1. User Error (User's fault)
   - Missing required field
   - Invalid email format
   - Budget too low
   - TONE: Helpful, not condescending
   - ACTION: Show what to fix + how

2. Validation Error (Form validation)
   - Email already exists
   - Campaign name too short
   - TONE: Specific + actionable
   - ACTION: Highlight field + show example

3. Network Error (Connection issue)
   - Lost internet connection
   - Request timeout
   - TONE: Reassuring
   - ACTION: [Retry] [Save Draft] [Offline Mode]

4. Server Error (Our fault)
   - 500 Internal Server Error
   - Database down
   - TONE: Apologetic
   - ACTION: [Retry] [Contact Support] [Status Page]

ERROR STATE RULES:

- [ ] Error title is specific (not "Error")
- [ ] Explain what went wrong
- [ ] Suggest how to fix it
- [ ] Don't blame user ("You did X wrong")
- [ ] Offer recovery options
- [ ] Include support contact for serious errors
- [ ] Log error to monitoring (Sentry/Rollbar)

COMPONENTS TO CREATE:

1. LoadingOverlay (Full-page loading)

   ```tsx
   <LoadingOverlay
     show={isLoading}
     message="Publishing campaign..."
     progress={45} // optional
   />
   ```

2. Skeleton (Content placeholder)

   ```tsx
   <Skeleton width="100%" height="40px" />
   <Skeleton width="80%" height="20px" />
   ```

3. EmptyState (No data)

   ```tsx
   <EmptyState
     icon={<CampaignIcon />}
     title="No Campaigns Yet"
     description="Get started by creating your first campaign."
     action={{ label: "Create Campaign", onClick: () => {} }}
   />
   ```

4. ErrorBoundary (Catch React errors)

   ```tsx
   <ErrorBoundary fallback={<ErrorPage />}>
     <Dashboard />
   </ErrorBoundary>
   ```

5. ErrorAlert (Inline error messages)
   ```tsx
   <ErrorAlert
     title="Campaign Publication Failed"
     message="Your campaign has 2 validation errors..."
     actions={[
       { label: "Fix Issues", onClick: () => {} },
       { label: "Contact Support" },
     ]}
   />
   ```

DELIVERABLES:

- src/components/LoadingOverlay.tsx
- src/components/Skeleton.tsx
- src/components/EmptyState.tsx
- src/components/ErrorBoundary.tsx
- src/components/ErrorAlert.tsx
- Storybook stories for all states
- Documentation on when to use each

VERIFICATION:

- [ ] Skeletons match content shape
- [ ] Shimmer animation is subtle (not distracting)
- [ ] Empty states show icon + title + description + CTA
- [ ] Error messages are specific (not generic)
- [ ] All states are keyboard accessible
- [ ] Mobile layout works (scaling and spacing)
- [ ] Color contrast maintained (red for errors is visible)

```

---

## PART 5: ACCESSIBILITY & QUALITY

### Prompt 5.1: Accessibility Compliance & Testing

```

You are implementing WCAG 2.1 Level AA accessibility throughout MediaBubble.

OBJECTIVE:
Ensure the entire app is usable by people with disabilities and compliant with WCAG 2.1 AA standards.

REQUIREMENTS:

1. SEMANTIC HTML
   - Use <button>, <input>, <select> (not <div role="button">)
   - Proper heading hierarchy: H1 → H2 → H3 (never skip levels)
   - Use <label> for form inputs (associated with for="inputId")
   - Use <fieldset> for grouped form inputs
   - Use <nav>, <main>, <footer> landmarks

   EXAMPLE:

   ```tsx
   // ❌ Bad
   <div onClick={handleClick} className="button">Click me</div>

   // ✓ Good
   <button onClick={handleClick}>Click me</button>
   ```

2. COLOR CONTRAST
   - Text: 4.5:1 contrast ratio (normal + large text)
   - Components: 3:1 contrast ratio (borders, icons)
   - Don't rely on color alone (use icons + text)

   TOOLS:
   - WebAIM Contrast Checker: webaim.org/resources/contrastchecker
   - Lighthouse audit in Chrome DevTools
   - axe DevTools browser extension

3. KEYBOARD NAVIGATION
   - Tab through entire app (logical order)
   - Enter/Space activates buttons
   - Escape closes modals/menus
   - Arrow keys navigate lists/tabs
   - Focus indicator always visible (2px ring, brand color)

   EXAMPLE:

   ```css
   /* Always have focus style */
   button:focus {
     outline: 2px solid var(--color-primary-blue);
     outline-offset: 2px;
   }
   ```

4. SCREEN READER SUPPORT
   - Announce dynamic content changes
   - Use aria-label for icon-only buttons
   - Use aria-describedby for help text
   - Use aria-live for notifications
   - Announce errors to screen reader

   EXAMPLE:

   ```tsx
   // Icon-only button
   <button aria-label="Close dialog">
     <XIcon />
   </button>

   // Input with error
   <input aria-describedby="email-error" />
   <span id="email-error" role="alert">
     ❌ Please enter a valid email
   </span>
   ```

5. IMAGE ALT TEXT
   - All <img> have alt attribute
   - Decorative images: alt=""
   - Meaningful images: describe content (not "image of...")

   EXAMPLE:

   ```tsx
   // ❌ Bad
   <img src="graph.png" alt="graph" />

   // ✓ Good
   <img
     src="graph.png"
     alt="Q2 2026 traffic increased 35% month-over-month"
   />
   ```

6. FORM ACCESSIBILITY
   - All inputs have associated labels
   - Required fields marked
   - Error messages linked with aria-describedby
   - Validation happens on blur or real-time

   EXAMPLE:

   ```tsx
   <label htmlFor="email">Email Address *</label>
   <input
     id="email"
     type="email"
     aria-describedby="email-error"
     required
   />
   {error && <span id="email-error">{error}</span>}
   ```

7. MOTION & ANIMATION
   - Respect prefers-reduced-motion
   - No auto-playing videos
   - No flashing content (>3 flashes per second = seizure risk)

   EXAMPLE:

   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation: none !important;
       transition: none !important;
     }
   }
   ```

8. TEXT & READABILITY
   - Font size: minimum 16px for body text
   - Line height: 1.4 or greater
   - Letter spacing: readable (not cramped)
   - Line length: 50-75 characters for readability
   - Avoid justified text (use left-aligned)

ACCESSIBILITY AUDIT CHECKLIST:

Testing Tools:

- [ ] Lighthouse (Chrome DevTools)
- [ ] WAVE (wave.webaim.org)
- [ ] axe DevTools (browser extension)
- [ ] Keyboard-only navigation (Tab through entire app)
- [ ] Screen reader (NVDA on Windows, JAWS, or VoiceOver on Mac)

Manual Tests:

- [ ] Zoom to 200% - layout still works?
- [ ] Disable CSS - content still readable?
- [ ] High contrast mode - visible on dark bg?
- [ ] Tab through page - focus indicator visible?
- [ ] Listen to form labels - screen reader reads them?

Browser DevTools Testing:

1. Open Chrome DevTools
2. Click Lighthouse tab
3. Select "Accessibility"
4. Run audit
5. Fix any failing items

WCAG 2.1 AA Minimum Requirements:

- Lighthouse Accessibility Score: ≥90
- No WCAG level A failures
- All WCAG AA failures fixed
- Keyboard navigation working
- Screen reader testing passed
- Color contrast verified (4.5:1 for text)

DELIVERABLES:

- Accessibility audit report
- Fixed components (semantic HTML, ARIA)
- CSS updates (contrast, motion)
- Accessibility testing documentation
- Component guidelines (accessibility checklist)

VERIFICATION:

- [ ] Lighthouse score ≥90
- [ ] WAVE audit passes (0 errors)
- [ ] Tab through entire app works
- [ ] Screen reader announces content
- [ ] Color contrast ≥4.5:1
- [ ] Keyboard-only navigation works
- [ ] Focus indicators visible
- [ ] Image alt text complete
- [ ] Forms properly labeled

```

---

## PART 6: IMPLEMENTATION CHECKLIST

### Use This Checklist to Track Progress

```

## Phase 1: Foundation (Weeks 1-2)

### Design Tokens

- [ ] Create src/tokens/colors.ts
- [ ] Create src/tokens/typography.ts
- [ ] Create src/tokens/spacing.ts
- [ ] Create src/tokens/shadows.ts
- [ ] Create tailwind.config.ts
- [ ] Create src/styles/globals.css with CSS variables
- [ ] Test: Colors match brand guidelines
- [ ] Test: Tailwind utilities work (p-md, text-h1, etc.)

### Accessibility Audit

- [ ] Run Lighthouse audit
- [ ] Run WAVE audit
- [ ] Test keyboard navigation
- [ ] Check color contrast (all text 4.5:1)
- [ ] Document all accessibility issues
- [ ] Create fix priority list

### Copy Audit

- [ ] Rewrite landing page hero section
- [ ] Rewrite 2 service descriptions (as examples)
- [ ] Create brand voice guide
- [ ] Rewrite all CTAs (benefit-driven)
- [ ] Create copy templates for other team members

---

## Phase 2: Components (Weeks 3-4)

### Button Component

- [ ] Create src/components/Button.tsx
- [ ] All variants: primary, secondary, danger, ghost, link
- [ ] All sizes: xs, sm, md, lg
- [ ] States: default, hover, active, disabled, loading
- [ ] Storybook stories
- [ ] Unit tests
- [ ] Accessibility: focus indicator, keyboard nav

### Form Components

- [ ] Create Input.tsx (with validation)
- [ ] Create Select.tsx
- [ ] Create Textarea.tsx
- [ ] Create Checkbox.tsx
- [ ] Create Radio.tsx
- [ ] All with error states + helper text
- [ ] Storybook stories
- [ ] Unit tests with validation

### Layout Components

- [ ] Create Card.tsx (with loading/error/empty states)
- [ ] Create Modal.tsx (with focus trap + Escape key)
- [ ] Create Toast.tsx (notification system)
- [ ] Create Skeleton.tsx (loading placeholders)
- [ ] Create EmptyState.tsx
- [ ] Storybook stories
- [ ] Integration tests

### Quality

- [ ] All components use design tokens (no hardcoded colors)
- [ ] All components are keyboard accessible
- [ ] All components have proper focus indicators
- [ ] All components tested with screen reader
- [ ] Component prop interfaces documented
- [ ] TypeScript types complete

---

## Phase 3: User Experience (Weeks 5-6)

### Onboarding Flow

- [ ] Create 5-step onboarding
- [ ] Step 1: Welcome + signup
- [ ] Step 2: Account details
- [ ] Step 3: First campaign
- [ ] Step 4: Integrations
- [ ] Step 5: Success confirmation
- [ ] Form validation working
- [ ] Auto-save draft
- [ ] Mobile responsive
- [ ] Accessibility tested

### Loading/Empty/Error States

- [ ] Implement loading overlays
- [ ] Implement skeleton screens
- [ ] Implement empty states (all pages)
- [ ] Implement error boundaries
- [ ] Implement error alerts
- [ ] Consistent messaging across app
- [ ] All states are mobile responsive

### Content Rewrite

- [ ] Rewrite all service descriptions
- [ ] Rewrite all error messages (be specific)
- [ ] Rewrite all form labels (be clear)
- [ ] Add helper text to confusing fields
- [ ] Add placeholder examples (e.g., "your@company.com")
- [ ] Create tooltips for complex features
- [ ] Create FAQ section

---

## Phase 4: Polish & Testing (Weeks 7-8)

### Accessibility Fixes

- [ ] Fix all Lighthouse issues (target ≥90)
- [ ] Fix all WAVE errors
- [ ] Verify all color contrast (4.5:1)
- [ ] Keyboard navigation: tab through all pages
- [ ] Screen reader: test with VoiceOver/NVDA
- [ ] Form labels: all properly associated
- [ ] Images: alt text complete
- [ ] Motion: respect prefers-reduced-motion

### Performance

- [ ] Page load time <2 seconds (Lighthouse)
- [ ] Largest Contentful Paint <2.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] First Input Delay <100ms
- [ ] No unused CSS/JavaScript
- [ ] Images optimized
- [ ] Code splitting configured

### Mobile Optimization

- [ ] Test on iPhone 12/13, iPad, Android
- [ ] Responsive breakpoints working
- [ ] Touch targets ≥44px
- [ ] Hamburger menu functioning
- [ ] Forms readable (16px font minimum)
- [ ] No horizontal scrolling
- [ ] Font scaling works (zoom to 200%)

### Dark Mode (Optional)

- [ ] CSS variables for dark palette
- [ ] Dark colors readable (4.5:1 contrast)
- [ ] System preference detection
- [ ] Toggle in settings
- [ ] All components look good in dark mode

### Testing

- [ ] Unit tests: 80%+ coverage
- [ ] Integration tests: key flows
- [ ] E2E tests: user journeys
- [ ] Accessibility tests: 100% WCAG AA
- [ ] Visual regression tests: components
- [ ] Mobile testing: all devices
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge

### Documentation

- [ ] Component Storybook complete
- [ ] Design tokens documented
- [ ] Accessibility guidelines created
- [ ] Copy guidelines for team
- [ ] Onboarding guide for new users
- [ ] README for setup/development

---

## Success Metrics

After implementation, track these metrics:

| Metric           | Target       | How to Measure      |
| ---------------- | ------------ | ------------------- |
| Lighthouse Score | ≥90          | Chrome DevTools     |
| Accessibility    | 100% WCAG AA | axe audit           |
| Page Load        | <2s          | Lighthouse          |
| Mobile CTR       | +20%         | Analytics           |
| Form Completion  | >70%         | Conversion tracking |
| Support Tickets  | -20%         | Support system      |
| User Activation  | >40%         | Analytics Day 1     |
| Session Duration | +25%         | Analytics           |

---

## Git Workflow for Implementation

When using Claude Code, organize commits by phase:

```bash
# Phase 1: Foundation
git commit -m "feat: implement design token system"
git commit -m "feat: add Tailwind CSS config with tokens"
git commit -m "fix: accessibility audit and fixes"
git commit -m "content: rewrite landing page copy"

# Phase 2: Components
git commit -m "feat: build Button component with all variants"
git commit -m "feat: build Form components (Input, Select, etc.)"
git commit -m "feat: build Card, Modal, Toast components"
git commit -m "test: add component unit tests"

# Phase 3: UX
git commit -m "feat: implement onboarding flow"
git commit -m "feat: add loading, empty, error states"
git commit -m "content: rewrite service descriptions and copy"

# Phase 4: Polish
git commit -m "fix: accessibility compliance (WCAG AA)"
git commit -m "perf: optimize page load and performance"
git commit -m "fix: mobile responsiveness"
git commit -m "feat: dark mode implementation"
git commit -m "test: comprehensive test coverage"
```

---

## Questions to Ask Claude Code

When implementing, ask:

1. **For Foundation Phase:**
   - "Create a complete design token system for MediaBubble using TypeScript"
   - "Set up Tailwind CSS to use our design tokens"
   - "Run WCAG 2.1 AA accessibility audit and tell me what needs fixing"

2. **For Components Phase:**
   - "Build a fully accessible Button component with all variants and sizes"
   - "Create a suite of form components (Input, Select, Textarea, Checkbox)"
   - "Build Card, Modal, Toast, Skeleton, and EmptyState components"

3. **For UX Phase:**
   - "Design and implement a 5-step onboarding flow"
   - "Create loading overlays, skeleton screens, and error states"
   - "Write and implement benefit-driven copy for [service name]"

4. **For Polish Phase:**
   - "Fix all accessibility issues in our app (WCAG 2.1 AA compliance)"
   - "Optimize app for mobile and test responsive design"
   - "Implement dark mode with system preference detection"
   - "Set up comprehensive test coverage for all components"

---

## Files to Create/Update

**New Directories:**

```
src/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   ├── borderRadius.ts
│   ├── transitions.ts
│   ├── zIndex.ts
│   └── index.ts
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Checkbox.tsx
│   ├── Radio.tsx
│   ├── RadioGroup.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── Skeleton.tsx
│   ├── EmptyState.tsx
│   ├── LoadingOverlay.tsx
│   ├── ErrorAlert.tsx
│   ├── ErrorBoundary.tsx
│   └── Button.stories.tsx (Storybook files for all components)
└── pages/
    └── onboarding/
        ├── index.tsx
        ├── steps/
        │   ├── Welcome.tsx
        │   ├── AccountSetup.tsx
        │   ├── CampaignSetup.tsx
        │   ├── Integrations.tsx
        │   └── Success.tsx

styles/
├── globals.css
├── variables.css
└── components.css

__tests__/
├── components/
├── pages/
└── utils/
```

**Update Files:**

- `tailwind.config.ts` — extend with token colors, spacing, fonts
- `next.config.js` — add performance optimizations
- `package.json` — add new dependencies (if needed)
- `.eslintrc.json` — add accessibility rules (eslint-plugin-jsx-a11y)

```

---

## Final Notes

1. **Start with Phase 1** — Design tokens are the foundation. Everything else builds on them.

2. **Test frequently** — Don't wait until Phase 4. Test accessibility, mobile, and functionality continuously.

3. **Get user feedback early** — Test the onboarding flow with real users during Phase 3.

4. **Measure metrics** — Track Lighthouse score, page load time, form completion rate, support tickets.

5. **Document as you go** — Storybook stories, README files, component guidelines.

6. **Iterate, don't perfect** — Ship Phase 1 + 2, get feedback, improve. You don't need everything perfect on day one.

7. **Team training** — Once complete, train your team on:
   - Using design tokens (no hardcoded colors)
   - Component APIs (props, accessibility)
   - Accessibility best practices
   - Copy guidelines and tone of voice

---

## Success Definition

Your app is "done" when:
- ✓ Lighthouse accessibility score ≥90
- ✓ Page load time <2 seconds
- ✓ Mobile responsive (tested on real devices)
- ✓ All components documented in Storybook
- ✓ Copy is benefit-driven and consistent
- ✓ Onboarding is smooth (<5 minutes to first campaign)
- ✓ No hardcoded colors or spacing (all from tokens)
- ✓ Team can build new features using component library
- ✓ Users are happy (measured by support tickets, NPS, activation rate)

---

**Ready to implement? Start with Prompt 1.1 (Design Tokens) and work through sequentially.**

```
