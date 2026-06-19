# MediaBubble Launcher — Plan V2 (Single Source of Truth)

> **Supersedes** the Phase-1 scope in `LAUNCHER_EXECUTIVE_SUMMARY.md`,
> `LAUNCHER_TECHNICAL_ROADMAP.md`, and `LAUNCHER_IMPLEMENTATION_CHECKLIST.md`.
> Those remain valid for Phase 2–3 module specs and the full 8-app vision.
>
> **Target:** `launcher.mediabubble.co`
> **Status:** Phase 1 in progress
> **Reconciled:** 2026-06-19 — merges PRD v1.0 with actual repo state
> **Branch:** `feature/launcher-phase1-foundation`

---

## 0. What changed vs. the old docs

The PRD repositions **Phase 1** away from "Task + Time" to a **finance- and
motivation-first MVP**, because the headline business goals are cost recovery
(kill the duplicate Hostinger tier, ~$25–50/mo) and team engagement.

| | Old docs (Phase 1) | **Plan V2 (this doc)** |
|---|---|---|
| Modules | Task + Time Management | **Task Board + Finance + Gamification** |
| Time Management | Phase 1 | **→ Phase 2** |
| Primary driver | Generic foundation | Cost audit + engagement + auditability |

Everything in the foundation/auth layer carries over unchanged.

---

## 1. Progress snapshot (as of 2026-06-19)

### ✅ Done
- **App scaffold** — Next.js 16, Tailwind, brand fonts, NX `project.json`, ESLint.
- **Prisma schema** — full 37-model schema covering *all 8 apps* (well ahead of plan).
- **Migrations** — `0001_init`, `0002_auth_tokens`.
- **Auth core** — JWT, password hashing, one-time tokens, RBAC
  (Viewer/Contributor/Manager/Admin), Zod schemas. **All unit-tested.**
- **Auth API** — `signup`, `login`, `verify-email`, `request-password-reset`,
  `reset-password`, now DB-backed via the Prisma singleton.
- **API conventions** — standardized `ok/fail/validationError` responses + Zod validation.

### ⚠️ Partial / stubbed
- **Email transport** — no provider yet; non-prod returns the raw token so flows are testable.
- **Uncommitted work** — `lib/db/prisma.ts`, `lib/api/http.ts`, `lib/auth/config.ts`,
  and `app/api/**` are staged-but-uncommitted. **Action: commit these.**

### ❌ Not started (Phase 1 gaps)
- Nav shell: collapsible sidebar (64↔240px), Topbar, `Cmd+K` command palette.
- Auth UI (login/signup pages) + route protection `middleware.ts`.
- Seed data (test users, departments).
- Task Board MVP, Finance MVP, Gamification MVP.

---

## 2. Phase 1 MVP — scope (Weeks 1–4, re-baselined)

### Week 1 — Foundation ✅ (complete)
Scaffold, Prisma baseline, CI. **Done.**

### Week 2 — Auth + API core ✅ (complete, pending commit)
JWT/RBAC/token flows + auth routes + response conventions. **Done.**

### Week 2.5 — Close the foundation (do next, ~2–3 days)
- [ ] Commit the uncommitted auth/db/api files.
- [ ] `middleware.ts` — protect app routes, redirect unauth → `/login`.
- [ ] Session helper: read JWT from cookie, expose `getCurrentUser()`.
- [ ] `prisma/seed.ts` — departments + one user per role + sample data.
- [ ] Auth UI: `/login`, `/signup`, verify + reset password screens.
- [ ] Wire a real email provider (Resend) behind the existing token stubs.

### Week 3 — Nav Shell + Task Board MVP
**Nav Shell (§4.1 PRD)**
- [ ] App layout with collapsible **Sidebar** — 240px expanded / 64px collapsed,
      icon-only + hover tooltips when collapsed, active route uses brand accent,
      footer toggle button. Persist collapsed state (localStorage).
- [ ] **Topbar** — search trigger, user dropdown, notification placeholder.
- [ ] **Command palette (`Cmd+K`)** — modal/backdrop, filters nav links + (later) tasks/invoices.

**Task Board (§4.2 PRD)**
- [ ] API: `POST/GET/GET:id/PUT/DELETE` `tasks`, `POST/GET` `tasks/:id/comments`,
      `tasks/:id/status`, `tasks/assigned-to-me`. (Models already exist.)
- [ ] Kanban board — Backlog / In Progress / Review / Done, glassmorphism surfaces
      (`bg-brand-surface border border-brand-whisper-border`).
- [ ] Drag-and-drop between columns (optimistic update).
- [ ] Inline timer per card — play/pause, pulsing active state, minutes → `time_entries`.

### Week 4 — Finance MVP + Gamification MVP

**Finance (§4.3 PRD)**
- [ ] Data: `transactions` model (Date, Category, Type, Amount, PaymentMethod,
      currency) + software-cost ledger seed (Supabase, Claude, Cursor, Vercel,
      Hostinger ×2, Gmail Workspace, Slack, SendGrid, domain).
- [ ] KPI strip — Total Inflows, Outflows, Net Profit, Operating Burn Rate.
- [ ] **Currency switcher** — EGP `ج.م` / AED `د.إ` / USD `$`, totals via rate table.
- [ ] **SVG cash-flow area chart** — dual-fill (mint inflow / red-orange outflow),
      6-month scale, hover tooltips.
- [ ] **SVG expense donut** — grouped by AI&Dev / Hosting&Servers / Comms / Domains.
- [ ] Ledger table — sortable, filterable, searchable.
- [ ] **AI optimization brief** — text panel flagging the duplicate Hostinger
      `openclaw` ($25/mo) + DB right-sizing. (Static copy first; AI-generated in Phase 3.)

**Gamification (§4.4 PRD)**
- [ ] XP model + `XP_required(L) = L² × 100`; level/avatar/progress card.
- [ ] Hot-streak flame — CSS glow/pulse on active login streak.
- [ ] Top-3 podium (gold/silver/bronze) + ranked table + Global/Department toggle.
- [ ] Achievements grid — locked (grayscale/transparent) vs unlocked (glow + date) + tooltips.

### Phase 1 testing gate
- [ ] Unit tests on new API endpoints (keep the ≥80% bar already set by auth).
- [ ] One Playwright E2E: login → create task → log time → see it on the board.

---

## 3. UI/UX rules (enforced, from PRD §5)
- **Palette** — dark canvas `#0D0F12`, cards `#121418`, borders `#1F2128`,
  inputs `#2A2D35`, text `#E8E8E8`; light theme per PRD. Use existing `brand-*` tokens.
- **RTL number isolation** — wrap phone/currency in `dir="ltr"` + `unicode-bidi: isolate`.
- **Interactive feedback** — `active:scale-[0.98] transition-all duration-200` + hover borders.

---

## 4. Tech decisions to confirm (PRD §6 vs. current repo)

| Topic | PRD says | Repo reality | Recommendation |
|---|---|---|---|
| DB | PostgreSQL + Prisma | Prisma schema ready | ✅ keep; provision Postgres (Supabase/Neon) |
| Realtime | Upstash Redis Pub/Sub + WS bridge on Railway | none yet | Defer to Phase 2 — Task Board ships without realtime first |
| Auth | "Stateless JWT middleware" | JWT core done, no `middleware.ts` | Add middleware in Week 2.5 |
| Email | implied (verify/reset) | stubbed | Wire Resend in Week 2.5 |
| AI brief | dynamic | n/a | Static in Phase 1, AI-generated in Phase 3 |

---

## 5. Immediate next actions (this week)
1. Commit the uncommitted auth/db/api files (foundation isn't in git yet).
2. Add `middleware.ts` + session helper + `prisma/seed.ts`.
3. Build the nav shell (sidebar + topbar + `Cmd+K`) — unblocks every module UI.
4. Provision Postgres and run migrations against it.

---

## 6. Phase 2–3 (unchanged from existing docs, summarized)
- **Phase 2 (Wk 5–12):** CRM, AI Tools + Prompt Studio (Gemini SSE), Communication Hub
  (WebSocket), Workflow Automation, Campaign/Proposal, **+ Time Management (moved here)**.
- **Phase 3 (Wk 13–18):** AI predictions, magic-link client portal (`clients.mediabubble.co`),
  Fawry/Telr payments, WhatsApp invoice/approval automation, perf hardening (WAF, uptime, load).
