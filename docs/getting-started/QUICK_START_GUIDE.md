# Quick Start: Implementation with Claude Code

## 🚀 Get Started in 5 Minutes

This guide shows you exactly how to use Claude Code to implement the audit recommendations.

---

## Step 1: Copy the Main Prompt

Go to **CLAUDE_CODE_IMPLEMENTATION_PROMPT.md** in your MediaBubble folder.

**Select this section:**
```
PART 1: DESIGN SYSTEM & FOUNDATION
→ Prompt 1.1: Create Design Token System
```

Copy the entire prompt (from "You are a senior frontend architect..." to the end of that section).

---

## Step 2: Open Claude Code

1. Open Claude Code on your machine
2. Navigate to your MediaBubble React project folder
3. Click **New Task** or **Start Chat**
4. Paste the prompt you copied

---

## Step 3: Run the First Prompt

Paste this simplified version if you want quick results:

```
You are creating a complete design token system for MediaBubble.

Create these files in src/tokens/:
1. colors.ts — All brand colors (primary blue #0D3A7D, yellow #FFC107, status colors)
2. typography.ts — Font scales (h1-body) with sizes and weights
3. spacing.ts — 8px unit system (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
4. shadows.ts — Elevation shadows
5. transitions.ts — Animation timing (200ms, 300ms, 400ms)
6. index.ts — Export all tokens

Also create:
- tailwind.config.ts using these tokens
- src/styles/globals.css with CSS variables
- Documentation on usage

Requirements:
- TypeScript types
- All colors have 4.5:1 contrast ratio minimum
- Semantic naming (colorStatusError not colorRed)
- JSDoc comments
- Export as JavaScript objects AND CSS variables AND Tailwind config

Start with the colors.ts file.
```

---

## Step 4: Let Claude Code Work

Claude will:
1. Create the token files
2. Show you the code in the chat
3. Ask clarifying questions if needed
4. Generate the files

When done, Claude will say something like:
```
✓ Created src/tokens/colors.ts (45 lines)
✓ Created src/tokens/typography.ts (38 lines)
✓ Created tailwind.config.ts (62 lines)

All tokens are exported from src/tokens/index.ts
Test with: import { colors, spacing } from '@/tokens'
```

---

## Step 5: Copy Files to Your Project

1. Claude will show the code in the chat
2. You can either:
   - **Option A:** Let Claude write directly to your files (if you have file access set up)
   - **Option B:** Copy-paste the code from the chat into your project
   - **Option C:** Ask Claude to generate a ZIP file

**Recommended:** Let Claude write directly:
```
"Go ahead and create these files in my project directory."
```

---

## Step 6: Test in Your App

After Claude creates the files:

```bash
# Test import
npm start

# In your browser console, check:
window.__TOKENS__ = (check if tokens loaded)
```

Then ask Claude:
```
"Test the tokens system. 
1. Import { colors, spacing } in a component
2. Create a styled button using tokens
3. Show me it works in a Storybook story"
```

---

## 🎯 Recommended Order to Execute Prompts

### Phase 1 (Foundation) - Week 1
1. **Prompt 1.1:** Create Design Token System ← START HERE
2. **Prompt 1.2:** Set Up Tailwind CSS with Tokens
3. **Prompt 5.1:** Accessibility Compliance & Testing (audit part)

### Phase 2 (Components) - Week 2-3
4. **Prompt 2.1:** Build Button Component
5. **Prompt 2.2:** Build Form Components
6. **Prompt 2.3:** Build Card, Modal, Toast

### Phase 3 (UX) - Week 4
7. **Prompt 3.1:** Rewrite Landing Page Copy
8. **Prompt 3.2:** Rewrite Service Descriptions
9. **Prompt 4.1:** Build Onboarding Flow

### Phase 4 (Polish) - Week 5
10. **Prompt 4.2:** Build Loading, Empty, Error States
11. **Prompt 5.1:** Full Accessibility Compliance

---

## 💡 Pro Tips for Claude Code

### Tip 1: Ask for Storybook Stories
After creating components, ask:
```
"Create Storybook stories for the Button component.
Show all variants (primary, secondary, danger, ghost, link)
and all sizes (xs, sm, md, lg)."
```

### Tip 2: Ask for Tests
```
"Write unit tests for the Button component using Jest.
Test onClick handler, disabled state, loading state, and accessibility."
```

### Tip 3: Ask for Documentation
```
"Create a README in src/tokens/ explaining how to:
1. Use tokens in components
2. Add new tokens
3. Update theme colors"
```

### Tip 4: Ask for Examples
```
"Show me 5 complete component examples using the Button, Input, 
and Card components with the design tokens."
```

### Tip 5: Ask for Git Workflow
```
"Generate git commit messages for these changes."
```

Example response:
```
git add src/tokens/
git commit -m "feat: implement design token system (colors, typography, spacing)"

git add tailwind.config.ts src/styles/
git commit -m "feat: add Tailwind CSS config with token integration"

git add src/components/Button.tsx src/components/Button.stories.tsx
git commit -m "feat: build Button component with all variants and states"
```

---

## 🔧 Running Prompts Sequentially

**Session 1: Foundation (1-2 hours)**
```
User: "Let's build MediaBubble's design system. 
Start with Prompt 1.1 from CLAUDE_CODE_IMPLEMENTATION_PROMPT.md"

Claude: [Creates token system]

User: "Great! Now run Prompt 1.2 to set up Tailwind CSS."

Claude: [Creates Tailwind config]

User: "Perfect. Let's test it with a simple button component. 
Can you create a basic Button component using these tokens?"

Claude: [Creates Button]
```

**Session 2: Components (2-3 hours)**
```
User: "Let's build the form components. Run Prompt 2.2"

Claude: [Creates Input, Select, Textarea, Checkbox, Radio]

User: "Add Storybook stories for all of them"

Claude: [Adds stories]
```

---

## ⚡ Quick Fixes (Ask Claude)

If something doesn't work:

```
"The colors.ts file has a TypeScript error. 
Let's fix it. [Describe the error]"

Claude: [Fixes the issue]
```

Or:

```
"The Button component styles don't match the tokens. 
Rewrite it to use the design tokens correctly."

Claude: [Updates Button.tsx]
```

---

## 📊 Tracking Progress

Print this and check off as you go:

```
PHASE 1: FOUNDATION
□ Prompt 1.1 - Design Tokens (colors, typography, spacing)
□ Prompt 1.2 - Tailwind CSS Config
□ Test tokens in a component
□ Commit to git

PHASE 2: COMPONENTS
□ Prompt 2.1 - Button Component
□ Prompt 2.2 - Form Components (Input, Select, Textarea, etc.)
□ Prompt 2.3 - Card, Modal, Toast, Skeleton
□ Create Storybook stories
□ Write unit tests
□ Commit to git

PHASE 3: UX
□ Prompt 3.1 - Rewrite Landing Page Copy
□ Prompt 3.2 - Rewrite Service Descriptions
□ Prompt 4.1 - Onboarding Flow
□ Test on mobile
□ Commit to git

PHASE 4: POLISH
□ Prompt 4.2 - Loading, Empty, Error States
□ Prompt 5.1 - Accessibility Compliance
□ Run Lighthouse audit
□ Test on real devices
□ Commit to git

DONE ✓
```

---

## 🎓 Example: Complete Session with Claude Code

Here's what a real session looks like:

**You:**
```
I want to implement the design token system for MediaBubble. 
Use the "Create Design Token System" prompt from my project docs.
```

**Claude Code:**
```
I'll create a complete design token system for MediaBubble.
Let me start with the color palette...

[Creates src/tokens/colors.ts with brand colors]
[Creates src/tokens/typography.ts with font scales]
[Creates src/tokens/spacing.ts with spacing system]
[Creates src/tokens/index.ts with barrel export]
[Creates tailwind.config.ts]
[Creates src/styles/globals.css with CSS variables]

✓ Design token system created!
✓ All colors have proper contrast ratios
✓ Exported as TypeScript objects, CSS variables, and Tailwind config
✓ Ready to use in components

Next: Should I create a Button component using these tokens?
```

**You:**
```
Yes! Create the Button component with all variants and sizes.
```

**Claude Code:**
```
[Creates src/components/Button.tsx with all variants]
[Creates src/components/Button.stories.tsx for Storybook]
[Creates Button unit tests]

✓ Button component with variants: primary, secondary, danger, ghost, link
✓ All sizes: xs, sm, md, lg
✓ All states: default, hover, disabled, loading
✓ Fully accessible (WCAG 2.1 AA)

Test it:
1. Import Button from '@/components/Button'
2. Use: <Button variant="primary" size="md">Click me</Button>

Want me to add more components?
```

**You:**
```
Create the form components next (Input, Select, Textarea, Checkbox).
```

**Claude Code:**
```
[Creates all form components with validation]
[Creates Storybook stories]
[Adds unit tests]

✓ Form components complete
✓ Real-time validation
✓ Error states with specific messages
✓ Accessible (labels, ARIA)

Example:
<Input 
  label="Email" 
  placeholder="your@company.com"
  error={error}
  onChange={handleChange}
/>
```

---

## ❓ Common Questions

**Q: Can Claude Code write files directly to my computer?**
A: Yes! When Claude asks "Should I write these files?", say "Yes, write them to my src/ directory."

**Q: How long does each prompt take?**
A: 
- Phase 1 (Foundation): 1-2 hours
- Phase 2 (Components): 2-3 hours
- Phase 3 (UX): 2-3 hours
- Phase 4 (Polish): 2-3 hours
- **Total: ~8-10 hours**

**Q: Do I need to review Claude's code?**
A: Yes! Review each file before committing:
- Check types are correct
- Verify styles use tokens (no hardcoded colors)
- Check accessibility (ARIA, semantic HTML)
- Test in browser

**Q: Can I ask Claude to fix things?**
A: Absolutely! If something doesn't work:
```
"The Button component isn't using the tokens correctly. 
The primary variant should use colors.primary.blue, not a hardcoded color.
Fix it."
```

**Q: Should I commit after each prompt?**
A: Yes! Makes it easier to roll back if needed:
```
git commit -m "feat: create design token system"
git commit -m "feat: add Button component"
git commit -m "feat: add form components"
```

---

## 🎯 Success Looks Like

After following this guide, you'll have:

✓ Complete design token system (colors, typography, spacing)  
✓ Tailwind CSS configured with tokens  
✓ Component library (Button, Input, Card, Modal, etc.)  
✓ Storybook documentation  
✓ Unit tests  
✓ Onboarding flow  
✓ Loading, empty, and error states  
✓ Benefit-driven copy on landing page and services  
✓ WCAG 2.1 AA accessibility compliance  
✓ Mobile responsive design  

**Total time: ~8-10 hours of Claude Code work**

---

## 📞 Need Help?

If you get stuck:

1. **Claude Code is confused:** Ask more specifically
   ```
   "I want Button component to use colors.primary.blue for the primary variant.
    Show me the exact code in Button.tsx"
   ```

2. **Something broke:** Show Claude the error
   ```
   "I'm getting this error: [error message]
    How do I fix it?"
   ```

3. **Want to change direction:** Just ask
   ```
   "Let's skip dark mode for now and focus on mobile optimization instead."
   ```

4. **Check progress:** Ask Claude
   ```
   "How much of the design system is complete?"
   ```

---

## 🚀 Go Build!

You're ready to start. Open Claude Code and run **Prompt 1.1** from **CLAUDE_CODE_IMPLEMENTATION_PROMPT.md**.

Let Claude create the foundation, then build from there.

**Estimated completion: 3-4 weeks (with parallel work)**

Good luck! 🎉

