# Profile, Settings & Meet Sidebar — Design

**Status:** Approved for implementation  
**Date:** 2026-06-25  
**Product:** MediaBubble Launcher (`apps/launcher`)  
**Audience:** Internal staff only (~25)

---

## Summary

Enrich **Profile** with biography and professional social links; refactor **Settings** into a full-width shell with grouped left navigation; redesign **Meet** sidebar as a unified column (channels → DMs → online users) with Launcher-wide presence.

---

## Locked decisions

| Topic | Decision |
|--------|----------|
| Profile visibility | Internal teammates only |
| Edit location | `/profile` owns identity; Settings drops Profile tab |
| Social fields v1 | LinkedIn, Instagram, Behance, Website (https URLs, optional) |
| Bio | Plain text, 500 chars, internal only |
| Online definition | Active in Launcher within 5 minutes (`user_presence.last_seen`) |
| Meet sidebar | Unified scroll: Channels (Activity pinned) → DMs → Online now footer; remove tab bar |
| Settings shell | Full `PageFrame` width; grouped left nav (Account / Workspace / Admin) |

---

## Data model

**`users` additions:**

- `bio` — `VarChar(500)`, nullable  
- `linkedin_url`, `instagram_url`, `behance_url`, `website_url` — `VarChar(500)`, nullable  

**Presence:** reuse `user_presence` (`last_seen`, `status`). Online = `last_seen` within 5 minutes and `users.status = active`.

---

## Profile (`/profile`)

1. Identity strip (avatar, name, email, badges)  
2. Stats row (unchanged)  
3. **About you** — bio textarea + char counter  
4. **Links** — four URL inputs with platform icons  
5. Session card (sign out)  

Single save for name + bio + links; avatar uploads immediately. Link to Settings for password/workspace.

---

## Settings (`/settings`)

Left sidebar groups:

- **Account** → Security (password)  
- **Workspace** → Preferences (timezone, date format, language)  
- **Admin** (Manager+) → Team  

URL: `/settings?tab=security|workspace|team`. Security panel links to `/profile` for identity fields.

---

## Meet sidebar

```
#studio (Activity)
#channel …
─────────────
DIRECT MESSAGES  [+]
  peer names …
─────────────
ONLINE NOW (n)
  ● Name …
```

Extract `MeetSidebar` from `meet-provider.tsx`. Presence poll every 60s + on route change via `PresenceHeartbeat` in app shell.

---

## Non-goals (v1)

- Client portal exposure of bio/social  
- OAuth social connect  
- Custom presence status (Away/Busy/text)  
- Public `/profile/[id]` page (optional follow-up)
