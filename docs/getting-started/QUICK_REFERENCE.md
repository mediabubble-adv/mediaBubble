# MediaBubble Audit Fixes - Quick Reference

**Created:** June 11, 2026

---

## 🚀 HOW TO USE THIS PLAN

1. Open **Cursor IDE**
2. Open the **AUDIT_FIX_EXECUTION_PLAN.md** file (already created)
3. Copy each "CURSOR PROMPT" one at a time
4. Paste into Cursor's chat window
5. Wait for Cursor to complete
6. Run verification commands
7. Move to next prompt

---

## 📋 CRITICAL FIXES (Must Do First)

### Prompt #1: Fix Duplicate Configs

- **What:** Clean up next.config.js duplication
- **Where:** `apps/web-eg/next.config.js` and `apps/web-ae/next.config.js`
- **Time:** 15 min
- **Test:** `npm run build`

### Prompt #2: Create i18n Files

- **What:** Add missing translation JSONs
- **Where:** `apps/web-*/lib/i18n/`
- **Time:** 15 min
- **Test:** `npm run typecheck`

### Prompt #3: Env Validation

- **What:** Add environment variable validation
- **Where:** `packages/shared/src/env.ts`
- **Time:** 15 min
- **Test:** `npm run typecheck`

**STOP HERE AND TEST**: `npm run build && npm run typecheck`

---

## 📊 HIGH PRIORITY FIXES (4-5 hours after Phase 1)

### Prompt #4: GA4 Consent Detection

- **What:** Fix race condition in analytics
- **Where:** `GoogleAnalytics.tsx` and `CookieConsent.tsx`
- **Time:** 30 min
- **Test:** Accept cookies → GA4 loads immediately

### Prompt #5: Font & Image Optimization

- **What:** Optimize font loading and remote images
- **Where:** `layout.tsx` and `next.config.js`
- **Time:** 20 min
- **Test:** `npm run build`

**TEST**: `npm run build`

---

## 🎨 MEDIUM PRIORITY FIXES (2-3 hours after Phase 2)

### Prompt #6: Z-Index Management

- **What:** Use CSS variables instead of hardcoded values
- **Where:** `CookieConsent.tsx`
- **Time:** 5 min

### Prompt #7: Error Boundary

- **What:** Prevent i18n failures from crashing page
- **Where:** Create `I18nErrorBoundary.tsx`
- **Time:** 20 min

### Prompt #8: Cache Headers

- **What:** Add caching for performance
- **Where:** `next.config.js`
- **Time:** 15 min

**FINAL TEST**: `npm run build && npm run typecheck`

---

## ✅ VERIFICATION COMMANDS

Run these after each phase:

```bash
# After Phase 1 (Critical)
npm run build
npm run typecheck

# After Phase 2 (High Priority)
npm run build
npm run dev  # Manual test: accept cookies, check GA4 loads

# After Phase 3 (Medium Priority)
npm run build
npm run typecheck
```

---

## 📁 FILES CREATED/MODIFIED

### Phase 1

- [ ] `apps/web-eg/next.config.js` - REPLACE
- [ ] `apps/web-ae/next.config.js` - REPLACE
- [ ] `apps/web-eg/lib/i18n/en.json` - CREATE
- [ ] `apps/web-eg/lib/i18n/ar-masri.json` - CREATE
- [ ] `apps/web-ae/lib/i18n/en.json` - CREATE
- [ ] `apps/web-ae/lib/i18n/ar-masri.json` - CREATE
- [ ] `packages/shared/src/env.ts` - CREATE/UPDATE
- [ ] `packages/shared/src/index.ts` - ADD EXPORT

### Phase 2

- [ ] `apps/web-eg/components/GoogleAnalytics.tsx` - REPLACE
- [ ] `apps/web-ae/components/GoogleAnalytics.tsx` - REPLACE
- [ ] `apps/web-eg/components/CookieConsent.tsx` - UPDATE
- [ ] `apps/web-ae/components/CookieConsent.tsx` - UPDATE
- [ ] `apps/web-eg/app/layout.tsx` - UPDATE
- [ ] `apps/web-ae/app/layout.tsx` - UPDATE

### Phase 3

- [ ] `apps/web-eg/components/CookieConsent.tsx` - UPDATE
- [ ] `apps/web-ae/components/CookieConsent.tsx` - UPDATE
- [ ] `apps/web-eg/components/I18nErrorBoundary.tsx` - CREATE
- [ ] `apps/web-ae/components/I18nErrorBoundary.tsx` - CREATE
- [ ] `apps/web-eg/components/I18nLayoutWrapper.tsx` - UPDATE
- [ ] `apps/web-ae/components/I18nLayoutWrapper.tsx` - UPDATE
- [ ] `apps/web-eg/next.config.js` - UPDATE HEADERS
- [ ] `apps/web-ae/next.config.js` - UPDATE HEADERS

---

## 🎯 SUCCESS CRITERIA

After completing all 8 prompts, verify:

✅ All 11 Critical/High/Medium fixes applied  
✅ `npm run build` passes without errors  
✅ `npm run typecheck` passes  
✅ GA4 loads when cookies accepted  
✅ No console errors in dev mode  
✅ All files have correct syntax

---

## ⏱️ TIMELINE

| Phase       | Time         | Effort        | Status        |
| ----------- | ------------ | ------------- | ------------- |
| 1: Critical | 45 min       | 3 prompts     | Next          |
| 2: High     | 1.5 hrs      | 2 prompts     | After Phase 1 |
| 3: Medium   | 1 hr         | 3 prompts     | After Phase 2 |
| Testing     | 30 min       | Verify        | End           |
| **TOTAL**   | **~3.5 hrs** | **8 prompts** | Ready         |

---

## 📞 TROUBLESHOOTING

### `npm run build` fails after Prompt #1

- Check both config files have ONLY ONE `module.exports`
- Search for `<% %>` template syntax (should be removed)
- Ensure no duplicate CSP definitions

### `npm run typecheck` fails after Prompt #2

- Verify i18n files are in correct paths
- Check for JSON syntax errors (use JSON validator)
- Files must be created in: `lib/i18n/` not elsewhere

### GA4 not loading after Prompt #4

- Check CookieConsent dispatches `cookieConsentGranted` event
- Verify GA_ID env var is set
- Check browser console for errors

### Build warnings about unoptimized images

- Verify `remotePatterns` includes all image domains
- Check image formats config

---

## 📌 NOTES

- Each prompt is independent but should be executed in order
- All changes are backwards compatible
- No database changes needed
- No new dependencies required (except Zod for env validation)
- Can rollback individual changes if needed

---

**Ready to execute in Cursor IDE:**

1. Copy AUDIT_FIX_EXECUTION_PLAN.md
2. Use the 8 CURSOR PROMPTS in order
3. Test after each phase
4. Complete in 3-4 hours total

---

**Created:** June 11, 2026  
**Status:** ✅ Ready for Immediate Execution
