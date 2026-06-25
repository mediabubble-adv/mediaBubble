# Profile, Settings & Meet Sidebar Implementation Plan

**Goal:** Add internal-team profile fields (bio + social links), refactor Settings into a grouped left-nav shell, and unify Meet’s sidebar with channels on top and online teammates at the bottom.

**Architecture:** Prisma columns on `users`; Zod validation in `lib/profile/schemas.ts`; extend `PATCH /api/settings/profile`; presence via existing `user_presence.last_seen` + heartbeat from `AppShell`; extract `MeetSidebar` replacing tab-based channel picker.

**Tech Stack:** Next.js 16 App Router, Prisma, Zod, Tailwind (`launcher-surface`), existing RBAC (`Manager`+ for Team tab).

---

### Task 1: Schema — bio & social URLs

**Files:**
- Create: `apps/launcher/prisma/migrations/20260625120000_user_profile_social/migration.sql`
- Modify: `apps/launcher/prisma/schema.prisma` — add columns on `users`

**Steps:**
1. Add nullable columns: `bio`, `linkedin_url`, `instagram_url`, `behance_url`, `website_url` (`VarChar(500)`).
2. Run `npm run db:migrate` locally.

**Verify:** `npm run db:generate`; Prisma client includes new fields.

---

### Task 2: Profile validation lib

**Files:**
- Create: `apps/launcher/lib/profile/schemas.ts`
- Create: `apps/launcher/lib/profile/schemas.test.ts`

**Steps:**
1. `profilePatchSchema`: optional `name`, `bio` (max 500), four URL fields (https only, max 500, empty string → null).
2. Optional hostname hints: `linkedin.com`, `instagram.com`, `behance.net` (warn-level or strict per field).
3. Unit tests: valid URLs, reject `http://`, overlong bio, empty-to-null.

**Verify:** `npm run test:launcher -- --testPathPattern=profile/schemas`

---

### Task 3: Extend profile API

**Files:**
- Modify: `apps/launcher/app/api/settings/profile/route.ts`
- Modify: `apps/launcher/app/(app)/profile/page.tsx` — select new fields

**Steps:**
1. Replace inline Zod with `profilePatchSchema` from `lib/profile/schemas.ts`.
2. PATCH persists `bio` + social URLs; return all profile fields in response.
3. Server page loads new columns for `ProfileView`.

**Verify:** Manual PATCH via devtools; `npm run test:launcher`.

---

### Task 4: Profile UI — bio & social

**Files:**
- Modify: `apps/launcher/components/account/profile-form.tsx`
- Modify: `apps/launcher/app/(app)/profile/profile-view.tsx`

**Steps:**
1. Add **About you** card: `Textarea` bio, 500-char counter, helper copy (*visible to teammates*).
2. Add **Links** card: four `Input` fields with Lucide/platform labels (LinkedIn, Instagram, Behance, Globe for website).
3. Extend save handler to PATCH all dirty fields in one request.
4. Show filled links as icon buttons on identity strip (read-only preview).
5. Add footer link: *Password & workspace → Settings*.

**Verify:** Edit bio + links on `/profile`; refresh persists; invalid URL shows toast.

---

### Task 5: Settings — grouped side nav shell

**Files:**
- Create: `apps/launcher/components/settings/settings-shell.tsx`
- Modify: `apps/launcher/app/(app)/settings/settings-dashboard.tsx`
- Modify: `apps/launcher/app/(app)/settings/page.tsx` — use `PageFrame` if not already

**Steps:**
1. `SettingsShell`: left nav with section labels **Account**, **Workspace**, **Admin** (Admin hidden unless `hasAtLeast(role, 'Manager')`).
2. Nav items: Security, Workspace prefs, Team (admin only).
3. Remove `profile` tab and `ProfileForm` from settings.
4. Sync tab to `?tab=security|workspace|team` via `useSearchParams` + `router.replace`.
5. Security panel: short link to `/profile` for name, avatar, bio, links.
6. Full width: drop `max-w-2xl` wrapper; use `PageFrame` + `PageHeader` (Settings2 icon).
7. Content cards use `launcher-surface` + bordered headers (match profile polish).

**Verify:** `/settings`, `/settings?tab=team` (Manager); Contributor does not see Admin group.

---

### Task 6: Presence — lib & APIs

**Files:**
- Create: `apps/launcher/lib/presence/constants.ts` — `ONLINE_WINDOW_MS = 5 * 60 * 1000`
- Create: `apps/launcher/lib/presence/online.ts` + `online.test.ts`
- Create: `apps/launcher/app/api/presence/heartbeat/route.ts`
- Create: `apps/launcher/app/api/presence/online/route.ts`

**Steps:**
1. `upsertPresence(db, userId)`: `user_presence.upsert` set `last_seen = now()`, `status = 'Online'`.
2. `listOnlineUsers(db)`: active users where `last_seen` within window, join `users` for `id, name, avatar_url, role`.
3. `POST /api/presence/heartbeat` — auth required, calls upsert.
4. `GET /api/presence/online` — returns sorted online teammates (exclude self optional).
5. Tests: window boundary (4 min online, 6 min offline).

**Verify:** `npm run test:launcher -- --testPathPattern=presence`

---

### Task 7: Presence heartbeat client

**Files:**
- Create: `apps/launcher/components/presence/presence-heartbeat.tsx`
- Modify: `apps/launcher/app/(app)/layout.tsx` — mount inside `MeetProvider`

**Steps:**
1. On mount + `pathname` change: `POST /api/presence/heartbeat`.
2. `setInterval` 60s while `document.visibilityState === 'visible'`.
3. Pause when hidden (`visibilitychange`).

**Verify:** Two browsers; user B appears in `GET /api/presence/online` within 5 min of user A activity.

---

### Task 8: Meet sidebar — unified layout

**Files:**
- Create: `apps/launcher/components/meet/meet-sidebar.tsx`
- Modify: `apps/launcher/components/meet/meet-provider.tsx` — use `MeetSidebar`, remove tab state from panel
- Modify: `apps/launcher/lib/meet/constants.ts` — optional section labels

**Steps:**
1. Extract sidebar from `MeetPanel`: channels list, DM section, online footer.
2. **Channels:** filter Public/Private + pin `#studio` (Activity) first with small "Activity" label.
3. **DMs:** section header + `[+]` opens teammate select (existing `/api/meet/dm`); list DM channels.
4. **Online now:** fixed bottom section; fetch `/api/presence/online`; green dot + name; click → start/open DM.
5. Remove `MeetTab` tab bar and `tab`/`setTab` from context (or keep only for legacy if needed).
6. Scroll: middle flex-1 overflow; online footer `shrink-0` with top border.
7. Wire `MeetRail` + bubble to same `MeetSidebar`.

**Verify:** `/meet` and embedded rail show channels → DMs → online; selecting channel loads messages.

---

### Task 9: Meet members API — online flag

**Files:**
- Modify: `apps/launcher/app/api/meet/members/route.ts`

**Steps:**
1. Join `user_presence` or call `isOnline(last_seen)` helper.
2. Return `{ id, name, email, online: boolean }` for DM picker sorting (online first).

**Verify:** DM picker lists online teammates at top.

---

### Task 10: Tests, seed & docs

**Files:**
- Modify: `apps/launcher/prisma/seed.ts` — optional sample bio/links on demo users
- Modify: `docs/CONTEXT.md` — profile fields + presence heartbeat summary
- Modify: `apps/launcher/README.md` — settings tabs + presence env note (none required)

**Steps:**
1. Full suite: `npm run test:launcher`.
2. Manual walkthrough: profile save, settings nav, meet online list.

**Verify:** 171+ tests pass; checklist below.

---

## Acceptance criteria

- [ ] `/profile` edits bio + LinkedIn/Instagram/Behance/website; internal-only copy shown
- [ ] `/settings` uses left grouped nav; no Profile tab; Security links to `/profile`
- [ ] Team tab visible only to Manager+
- [ ] Meet sidebar: channels (Activity pinned) → DMs → Online now; no tab bar
- [ ] Online list updates within 5 min of Launcher activity
- [ ] `npm run test:launcher` passes

## Suggested implementation order

1. Tasks 1–4 (profile data + UI)  
2. Tasks 5 (settings shell)  
3. Tasks 6–7 (presence)  
4. Tasks 8–9 (Meet sidebar)  
5. Task 10 (docs + seed)

## Deferred

- [ ] `/profile/[userId]` teammate view with bio preview  
- [ ] Custom presence status (Away/Busy/message)  
- [ ] Profile link icons in Meet message author hover card
