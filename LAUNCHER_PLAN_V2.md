# MediaBubble Launcher — Plan V2 (Single Source of Truth)

> **Supersedes** the Phase-1 scope in `LAUNCHER_EXECUTIVE_SUMMARY.md`,
> `LAUNCHER_TECHNICAL_ROADMAP.md`, and `LAUNCHER_IMPLEMENTATION_CHECKLIST.md`.
> Those remain valid for Phase 2–3 module specs and the full 8-app vision.
>
> **Target:** `launcher.mediabubble.co`
> **Status:** Phase 1 complete — shipping / Phase 2 next
> **Reconciled:** 2026-06-20 — post-merge snapshot (PR #19 → `master`)
> **Branch:** `master`

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

## 1. Progress snapshot (as of 2026-06-20)

### ✅ Done (Phase 1)
- **App scaffold** — Next.js 16, Tailwind, brand fonts, NX `project.json`, ESLint, typecheck.
- **Prisma schema** — full 37-model schema covering *all 8 apps* (well ahead of plan).
- **Migrations** — `0001_init`, `0002_auth_tokens`, `0003_finance`; deployed to Supabase.
- **Auth core + API + UI** — JWT, RBAC, signup/login/verify/reset, Resend email, auth screens.
- **Route protection** — `proxy.ts` (replaces `middleware.ts` for Next.js 16 builder).
- **Nav shell** — collapsible sidebar, topbar, `Cmd+K` command palette.
- **Task Board MVP** — Kanban API + UI, DnD, inline timer, comments.
- **Finance MVP** — ledger, KPIs, currency switcher, charts, AI optimization brief.
- **Gamification MVP** — XP/levels, streak, leaderboard, achievements.
- **Seed** — `prisma/seed.ts` (departments, 4 RBAC users, software-cost ledger).
- **Supabase env** — root `db:*` scripts source `apps/launcher/.env.local` (`DIRECT_URL` for migrations).
- **Testing gate** — 74 Jest unit tests; Playwright E2E (login → task → timer → drag).

### ⚠️ Partial / ops remaining
- **Production deploy** — Vercel project + `launcher.mediabubble.co` DNS not wired yet.
- **CI** — GitHub Actions builds `web-eg`/`web-ae`/`brand` but not `launcher` yet.
- **Redis** — deferred; not required for Phase 1 modules.

### ❌ Not started (Phase 2)
- Time Management (full module), CRM, AI Tools + Prompt Studio, Communication Hub,
  Workflow Automation, Campaign/Proposal.

---

## 2. Phase 1 MVP — scope (Weeks 1–4, re-baselined)

### Week 1 — Foundation ✅ (complete)
Scaffold, Prisma baseline, CI. **Done.**

### Week 2 — Auth + API core ✅ (complete)
JWT/RBAC/token flows + auth routes + response conventions. **Done.**

### Week 2.5 — Close the foundation ✅ (complete)
- [x] Auth/db/api committed to git.
- [x] Route protection — `proxy.ts` (Next.js 16; replaces `middleware.ts`).
- [x] Session helper: read JWT from cookie, `getCurrentUser()`.
- [x] `prisma/seed.ts` — departments + one user per role + finance sample data.
- [x] Auth UI: `/login`, `/signup`, verify + reset password screens.
- [x] Resend email for verify/reset flows.

### Week 3 — Nav Shell + Task Board MVP ✅ (complete)
**Nav Shell (§4.1 PRD)**
- [x] App layout with collapsible **Sidebar** — 240px expanded / 64px collapsed,
      icon-only + hover tooltips when collapsed, active route uses brand accent,
      footer toggle button. Persist collapsed state (localStorage).
- [x] **Topbar** — search trigger, user dropdown, notification placeholder.
- [x] **Command palette (`Cmd+K`)** — modal/backdrop, filters nav links + (later) tasks/invoices.

**Task Board (§4.2 PRD)**
- [x] API: `POST/GET/GET:id/PUT/DELETE` `tasks`, `POST/GET` `tasks/:id/comments`,
      `tasks/:id/status`, `tasks/assigned-to-me`.
- [x] Kanban board — Backlog / In Progress / Review / Done, glassmorphism surfaces.
- [x] Drag-and-drop between columns (optimistic update).
- [x] Inline timer per card — play/pause, pulsing active state, minutes → `time_entries`.

### Week 4 — Finance MVP + Gamification MVP ✅ (complete)

**Finance (§4.3 PRD)**
- [x] Data: `transactions` model + software-cost ledger seed.
- [x] KPI strip — Total Inflows, Outflows, Net Profit, Operating Burn Rate.
- [x] **Currency switcher** — EGP / AED / USD, totals via rate table.
- [x] **SVG cash-flow area chart** — dual-fill, 6-month scale, hover tooltips.
- [x] **SVG expense donut** — grouped by category.
- [x] Ledger table — sortable, filterable, searchable.
- [x] **AI optimization brief** — static copy flagging duplicate Hostinger tier.

**Gamification (§4.4 PRD)**
- [x] XP model + `XP_required(L) = L² × 100`; level/avatar/progress card.
- [x] Hot-streak flame — CSS glow/pulse on active login streak.
- [x] Top-3 podium + ranked table + Global/Department toggle.
- [x] Achievements grid — locked vs unlocked states + tooltips.

### Phase 1 testing gate ✅ (complete)
- [x] Unit tests on new API endpoints (74 tests, auth + tasks + finance libs).
- [x] One Playwright E2E: login → create task → log time → drag on the board.

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
| DB | PostgreSQL + Prisma | ✅ Supabase + Prisma, migrations deployed | Keep; add prod Vercel env + `db:deploy` on release |
| Realtime | Upstash Redis Pub/Sub + WS bridge on Railway | none yet | Defer to Phase 2 — Task Board ships without realtime first |
| Auth | "Stateless JWT middleware" | ✅ JWT + `proxy.ts` route gate | Keep; no session table |
| Email | implied (verify/reset) | ✅ Resend wired (`RESEND_API_KEY`) | Set key on Vercel for prod |
| AI brief | dynamic | static copy in Finance UI | AI-generated in Phase 3 |

---

## 5. Immediate next actions (Phase 1 → Phase 2 handoff)
1. **Ship** — Vercel project for `apps/launcher`, env vars, `launcher.mediabubble.co` DNS.
2. **CI** — add `launcher` to the GitHub Actions build matrix (+ optional `test:launcher`).
3. **Phase 2 kickoff** — Time Management module first (schema exists; board timer is a slice).
4. Update stale docs as modules land (`apps/launcher/README.md` refreshed 2026-06-20).

---

## 6. Phase 2–3 (unchanged from existing docs, summarized)
- **Phase 2 (Wk 5–12):** CRM, AI Tools + Prompt Studio (Gemini SSE), Communication Hub
  (WebSocket), Workflow Automation, Campaign/Proposal, **+ Time Management (moved here)**.
- **Phase 3 (Wk 13–18):** AI predictions, magic-link client portal (`clients.mediabubble.co`),
  Fawry/Telr payments, WhatsApp invoice/approval automation, perf hardening (WAF, uptime, load).
