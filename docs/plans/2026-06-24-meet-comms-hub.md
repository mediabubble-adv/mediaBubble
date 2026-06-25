# Meet (Communication Hub) Implementation Plan

**Goal:** Embed Meet (renamed from Chat) everywhere in Launcher with rail + bubble shell, channels + DMs, Manager-gated `#channel` creation, and live task/achievement feed cards with react + reply.

**Architecture:** Extract `MeetPanel` + `MeetProvider` from existing `lib/comms` stack; extend `channels.type` with `DM` and `Activity`; `lib/meet/feed-bridge.ts` posts system messages to seeded `#studio` via Meet Bot; reuse `messages.reactions` + `thread_id` and Redis realtime.

**Tech Stack:** Next.js 16 App Router, Prisma (`channels`, `messages`), Zod (`lib/comms/schemas`), Redis pub/sub + `useCommsRealtime`, Tailwind, existing RBAC (`Manager`+).

---

### Task 1: Rename Chat → Meet (routes + nav)

**Files:**
- Create: `apps/launcher/app/(app)/meet/page.tsx`, `meet-dashboard.tsx` (move from chat)
- Create: `apps/launcher/app/(app)/chat/page.tsx` → redirect to `/meet`
- Modify: `apps/launcher/app/(app)/_shell/nav.ts` — label Meet, href `/meet`
- Modify: `apps/launcher/lib/dashboard/modules.ts` — `meet` module entry
- Modify: `apps/launcher/README.md` route table

**Steps:**
1. Copy `chat/` → `meet/`; rename `ChatDashboard` → `MeetDashboard` (or alias export).
2. Add `redirect('/meet')` in `chat/page.tsx`.
3. Update nav + dashboard module id (`chat` → `meet`; alias old id in prefs migration if needed).
4. Page metadata: title **Meeting Room**; description *Channels, DMs & live studio updates*.

**Verify:** `npm run test:launcher`; manual `/meet` loads; `/chat` redirects.

---

### Task 2: Extract MeetPanel + types

**Files:**
- Create: `apps/launcher/components/meet/meet-panel.tsx`
- Create: `apps/launcher/components/meet/types.ts`
- Modify: `apps/launcher/app/(app)/meet/meet-dashboard.tsx` — thin wrapper around `MeetPanel`

**Steps:**
1. Move channel list, message list, composer, realtime hook from `chat-dashboard.tsx` into `MeetPanel`.
2. Props: `variant: 'embedded' | 'page'`, `initialChannels`, `currentUserId`.
3. Keep all `/api/comms/*` fetch paths unchanged.

**Verify:** `/meet` behavior unchanged after extract.

---

### Task 3: MeetProvider + global shell

**Files:**
- Create: `apps/launcher/components/meet/meet-provider.tsx`
- Create: `apps/launcher/components/meet/meet-rail.tsx`
- Create: `apps/launcher/components/meet/meet-bubble.tsx`
- Modify: `apps/launcher/app/(app)/layout.tsx` — wrap children with `MeetProvider`
- Modify: `apps/launcher/app/(app)/_shell/app-shell.tsx` — rail slot + `--meet-width` on main
- Modify: `apps/launcher/app/globals.css` — optional meet rail width tokens

**Steps:**
1. Provider holds: open/collapsed, selected channel, unread map, shared realtime subscription.
2. `MeetRail`: visible `lg+`; collapse to 48px strip with unread badge.
3. `MeetBubble`: hidden `lg+`; FAB + sheet below `lg`.
4. Persist open/collapsed in user prefs (`lib/dashboard/prefs.ts` or new `meet_prefs` JSON key).

**Verify:** Open Tasks with rail visible; post message; navigate to CRM — connection stays, unread updates.

---

### Task 4: Schema — DM + Activity channel types

**Files:**
- Create: `apps/launcher/prisma/migrations/YYYYMMDD_meet_dm_activity/migration.sql`
- Modify: `apps/launcher/prisma/schema.prisma` — document `channels.type` values
- Modify: `apps/launcher/lib/comms/schemas.ts` — `CHANNEL_TYPES` += `DM`, `Activity`
- Modify: `apps/launcher/lib/comms/access.ts` — DM visibility (members only); Activity public read
- Modify: `apps/launcher/lib/comms/access.test.ts`

**Steps:**
1. No new tables v1 — `type` string column already exists.
2. Add `dm_key` optional unique column OR enforce pair uniqueness in app layer (`lib/meet/dm.ts`).
3. Update `channelListWhere` to include user's DMs and Activity channel.

**Verify:** `npm run test:launcher`

---

### Task 5: APIs — DM + Manager-only channel create

**Files:**
- Create: `apps/launcher/app/api/meet/dm/route.ts`
- Create: `apps/launcher/lib/meet/dm.ts` + `dm.test.ts`
- Modify: `apps/launcher/app/api/comms/channels/route.ts` — Manager+ for Public/Private POST
- Modify: `apps/launcher/lib/comms/channels.ts` — serialize `type`, `dm_key`

**Steps:**
1. `POST /api/meet/dm` body `{ user_id }` → find/create DM, return channel.
2. Reject self-DM, validate active user.
3. Tighten channel POST: `hasAtLeast(me.role, 'Manager')` for Public/Private.

**Verify:** Unit tests for DM key; Manager can create `#foo`; Contributor cannot create Public channel.

---

### Task 6: Seed Activity channel + Meet Bot

**Files:**
- Modify: `apps/launcher/prisma/seed.ts` — Meet Bot user, `#studio` Activity channel
- Create: `apps/launcher/lib/meet/constants.ts` — `MEET_BOT_USER_ID`, `STUDIO_CHANNEL_SLUG`

**Steps:**
1. Idempotent seed: bot user + `#studio` channel (`type: Activity`, `created_by` bot).
2. Document env override for bot UUID in production.

**Verify:** `npm run db:seed`; channel appears in GET `/api/comms/channels`.

---

### Task 7: Feed bridge (tasks + achievements)

**Files:**
- Create: `apps/launcher/lib/meet/feed-bridge.ts` + `feed-bridge.test.ts`
- Create: `apps/launcher/lib/meet/format-feed-card.ts`
- Modify: `apps/launcher/lib/tasks/activity.ts` or task API routes — call bridge after record
- Modify: `apps/launcher/app/(app)/leaderboard/leaderboard-dashboard.tsx` or server — achievement unlock hook (minimal v1: 1–2 achievements)

**Steps:**
1. `publishFeedCard({ source, eventType, actorId, title, href, xpDelta? })`.
2. Creates message as Meet Bot in `#studio` with `attachments.kind = feed_card`.
3. Hook: `subtask_completed`, `status_changed` (→ Done).
4. Achievement: when unlock condition newly true, post once (debounce via message payload `entity_id`).

**Verify:** Complete task in UI → card in Activity; realtime updates rail.

---

### Task 8: React + reply on feed cards

**Files:**
- Modify: `apps/launcher/components/meet/meet-panel.tsx` — render `feed_card` attachment layout
- Modify: `apps/launcher/app/api/comms/channels/[id]/messages/route.ts` — allow thread replies
- Create or extend: `apps/launcher/app/api/comms/messages/[id]/reactions/route.ts` (PATCH reactions JSON)

**Steps:**
1. UI: feed card shows actor avatar, text, link, optional `+XP`, reaction bar.
2. Thread button → sets `thread_id` on reply POST (existing field).
3. Reactions: merge into `messages.reactions` JSON; broadcast `message.updated`.

**Verify:** React on feed card; reply in thread; appears under card.

---

### Task 9: Meet UI polish + Activity tab

**Files:**
- Modify: `apps/launcher/components/meet/meet-panel.tsx` — tabs Channels | DMs | Activity
- Modify: `apps/launcher/components/meet/meet-rail.tsx` — section headers, unread counts

**Steps:**
1. Activity tab selects `#studio` channel.
2. Manager-only “New channel” on `/meet` page variant.
3. DM member picker (search active users).

**Verify:** Manual walkthrough per design spec.

---

### Task 10: Docs + CONTEXT

**Files:**
- Modify: `docs/CONTEXT.md` — Meet summary + env vars
- Modify: `apps/launcher/README.md`

**Verify:** `npm run test:launcher` full suite.

---

## Acceptance criteria

- [ ] Meet rail on desktop and bubble on mobile on all `(app)` routes
- [ ] `/chat` redirects to `/meet`; nav says **Meet**
- [ ] Manager can create Public/Private `#channels`; Contributor can open DM
- [ ] Task completion appears in Activity within seconds; react + reply work
- [ ] Leaderboard name unchanged; achievement card links to profile/leaderboard
- [ ] All launcher unit tests pass

## Deferred checklist (do not implement in this plan)

- [ ] Presence / custom status
- [ ] Bots / scheduled digests
- [ ] OPUS / CRM feed sources
- [ ] Client-facing channels
