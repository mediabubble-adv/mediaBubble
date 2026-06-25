# Meet — Internal Communication Hub (Design)

**Status:** Approved for implementation  
**Date:** 2026-06-24  
**Product:** MediaBubble Launcher (`apps/launcher`)  
**Audience:** Internal staff only (~25); no client access in v1

---

## Summary

Rename **Chat** to **Meet** and evolve it from a standalone `/chat` page into an **embedded communication and information center** available on every Launcher module. Meet combines Slack-style **channels + DMs** with a **live activity feed** (tasks, achievements) where staff can **react and reply** in threads.

**Leaderboard** keeps its name; gamification surfaces quietly in Meet feed cards (XP line, link to profile) — no mascots or gamey module renaming.

---

## Decisions (locked)

| Topic | Decision |
|--------|----------|
| Shell UX | **C — Both:** persistent right rail on desktop (`lg+`); floating bubble + sheet below `lg` |
| Audience | **A — Internal only** |
| v1 must-haves | Global shell + channels + DMs; live activity feeds + react/reply; Manager `#channel` creation + membership |
| v1 deferred | Presence/custom status; bots/digests; OPUS/CRM feeds; full product rebrand beyond Chat→Meet |
| Product name | **Meet** (nav/shell); **Meeting Room** (page title); route `/meet`; `/chat` redirects |
| Gamification | Leaderboard unchanged; achievement/task events post to Meet Activity channel |

---

## Problem

Today comms live only at `/chat` (“Communication Hub”). Task activity, notifications, and team awareness are fragmented. Staff must context-switch to see what happened. The June 2026 architecture doc already targets **embedded communication + event bus** — this design implements the first slice.

---

## Goals

1. **Everywhere:** Open Meet from Tasks, CRM, OPUS, etc. without leaving the module.
2. **Awareness:** Task completions and key gamification moments appear in a team-visible Activity stream.
3. **Conversation:** React and thread-reply on feed cards like normal messages.
4. **Governance:** Managers create/archive `#channels` and manage private membership; anyone can DM a colleague.

## Non-goals (v1)

- Video/voice calls (avoid Google Meet confusion via subtitle: *Channels, DMs & live studio updates*)
- Client portal / external guests in channels
- Online presence indicators and custom status text
- Configurable bots, scheduled digests, per-event routing rules
- Replacing in-app `notifications` table — Meet complements it

---

## Architecture

### Shell layer

```
┌─────────────────────────────────────────────────────────────┐
│ AppShell (sidebar + main)                                   │
│  ┌──────────────────────────────┬────────────────────────┐│
│  │ Module content               │ MeetRail (lg+, 360px)    ││
│  │ Tasks / CRM / …              │ or collapsed strip     ││
│  └──────────────────────────────┴────────────────────────┘│
│                                    MeetBubble (< lg)        │
└─────────────────────────────────────────────────────────────┘
         MeetProvider — shared state, one WS/SSE connection
```

- **`MeetProvider`** in `(app)/layout.tsx` (inside `AppShell`): channels, DMs, selection, unread, drafts, realtime status.
- **CSS variable `--meet-width`** on main content when rail open (default 360px; collapsed 48px).
- **`MeetPanel`:** extracted from `chat-dashboard.tsx` — channel list, messages, composer.
- **`/meet`:** full Meeting Room page; same panel, more width.

### Channel model (extends existing `channels`)

| `type` | Visibility | Created by |
|--------|------------|------------|
| `Public` | All staff | Manager+ |
| `Private` | `members[]` | Manager+ |
| `DM` | Exactly two `members` | Any Contributor+ |
| `Activity` | All staff (system) | Seed / system only |

Existing tables: `channels`, `messages` (already has `reactions` JSON, `thread_id`, `attachments` JSON).

**DM uniqueness:** Application-level guard — one DM channel per unordered pair of user IDs (store `dm_key` = sorted UUIDs joined, or query before create).

**Default Activity channel:** `#studio` (slug `studio`), `type: Activity`, seeded in `prisma/seed.ts`. Not archivable.

### RBAC changes

Current: Contributor+ can create Public channels; Manager for Private.

**v1 target:**
- **Manager+** — create/archive Public & Private channels; edit membership
- **Contributor+** — post in accessible channels; create DMs; react/reply
- **Activity channel** — all staff read; Meet Bot + bridge post; staff react/reply

Update `POST /api/comms/channels` to require Manager+ for Public/Private creation (aligns with brainstorm).

### Live activity feed

**Event bridge** (`lib/meet/feed-bridge.ts`):

1. Subscribe to domain events (v1: hook after `recordTaskActivity` for selected types).
2. Render human-readable text + structured `attachments` on a system message.

```json
{
  "kind": "feed_card",
  "source": "task",
  "event_type": "subtask_completed",
  "entity_id": "<task-uuid>",
  "href": "/tasks/<parent-id>",
  "actor_id": "<user-uuid>",
  "xp_delta": 15
}
```

**Meet Bot:** One `users` row (e.g. `meet-bot@mediabubble.internal`, system flag or fixed UUID in env). Posts to `#studio`.

**v1 feed sources:**

| Source | Trigger | Example card |
|--------|---------|--------------|
| Tasks | `task_activity`: status→Done, subtask_completed | “Yasser completed *Website sprint*” |
| Gamification | Achievement rule fires (hook from leaderboard logic) | “Sara unlocked *Streak Keeper* · +100 XP” |

**React + reply:** Use `messages.reactions` and `thread_id` — no new tables in v1.

**Realtime:** Publish `message.created` on `COMMS_GLOBAL_REDIS_KEY` so rail, bubble, and `/meet` update together (existing `lib/comms/realtime`).

### Gamification integration

- Feed cards may include optional `xp_delta` in attachment JSON — single quiet line in UI.
- Link to `/leaderboard` or `/profile` from card.
- No confetti, sounds, or module rename to game terms (`PRODUCT.md`).

---

## UX

### Meet shell (desktop)

- Collapsible right rail; default open for first visit, preference stored (dashboard prefs pattern).
- Sections: **Channels** | **DMs** | **Activity** (pinned `#studio`).
- Unread badge per channel/DM; total badge on bubble/collapse strip.

### Meet shell (mobile)

- FAB bottom-right; opens sheet with same three sections.
- Does not shrink main content.

### Full page `/meet`

- Page title: **Meeting Room**
- Subtitle: *Channels, DMs & live studio updates*
- Manager actions: **New channel** (name, public/private, members)

### Navigation updates

| Before | After |
|--------|-------|
| `/chat` | `/meet` (301 redirect) |
| Nav: Chat | Nav: Meet |
| `modules.ts` id `chat` | id `meet` (migrate prefs alias) |
| metadata title Communication Hub | Meeting Room |

Icon: keep `MessageSquare` or use `Users`/`Radio` — design polish optional.

---

## Data flow

```
Task API → recordTaskActivity()
         → meetFeedBridge.publishTaskActivity()
         → prisma.messages.create (Meet Bot, #studio)
         → broadcastMessageCreated()
         → Redis → WS/SSE → MeetProvider → UI
```

DM flow:

```
User picks colleague → POST /api/meet/dm { user_id }
                    → find or create DM channel
                    → return channel id → MeetPanel selects it
```

---

## Error handling

- Bridge failures: log server-side; do not fail parent task/comment request.
- Realtime down: existing SSE fallback (`use-comms-realtime`); show disconnected indicator in shell.
- DM with self: 400.
- Duplicate DM: return existing channel.

---

## Testing

- **Unit:** `lib/meet/feed-bridge.ts`, DM key helper, channel RBAC updates in `lib/comms/access.test.ts`
- **Existing:** extend `lib/comms/schemas.test.ts` for `DM` type
- **Manual:** open Meet rail from `/tasks`; complete task; see card in Activity; react + thread reply
- **CI:** `npm run test:launcher`

---

## Phased delivery

1. **Rename + extract** — `/meet`, MeetPanel, redirect `/chat`
2. **Global shell** — MeetProvider, MeetRail, MeetBubble
3. **DMs + Manager channels** — types, APIs, RBAC
4. **Activity feed** — seed `#studio`, Meet Bot, task bridge, achievement hook

---

## Future (post-v1)

- Presence + custom status (`user_presence` table + heartbeat)
- Bots: digest, OPUS campaign alerts, CRM payment reminders
- Per-channel notification preferences
- Client read-only project channels (portal)

---

## References

- Existing comms: `apps/launcher/lib/comms/`, `app/api/comms/`
- Realtime: `pnpm run ws:launcher`, `REDIS_URL`, `NEXT_PUBLIC_COMMS_WS_URL`
- Architecture vision: `docs/launcher/DESIGN_PM_TOOLS_ARCHITECTURE.md`
- Product tone: `PRODUCT.md`
