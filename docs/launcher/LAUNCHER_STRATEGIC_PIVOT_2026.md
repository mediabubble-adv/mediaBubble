# MediaBubble Launcher — Strategic Pivot to #1 Employee Software

**Prepared for:** Dorgham & MediaBubble Leadership  
**Date:** June 21, 2026  
**Status:** Strategic Repositioning Plan  
**Target:** Launcher as Central Hub for All Employee Work

---

## EXECUTIVE SUMMARY

### The Shift

**From:** Generic project management tool with 9 modules scattered across departments  
**To:** **Single unified platform** where every MediaBubble employee logs in once and does all their work

### Why This Matters

1. **Cost Recovery** — Kill duplicate Hostinger tiers (~$25–50/mo saved per employee workflow consolidation)
2. **Team Alignment** — All 9 departments see the same tasks, timelines, blockers, dependencies
3. **Project Velocity** — Real-time visibility into what's blocking delivery, who's bottlenecked, where to unblock
4. **Employee Engagement** — Gamification + celebration of wins keeps team motivated across time zones (Hurghada + remote)
5. **Knowledge Continuity** — Everything is in Launcher; no tribal knowledge in Slack/email/spreadsheets

### The Bet

**Launcher is not a task app.** It's the **operating system for MediaBubble's delivery engine.** Every project, campaign, invoice, deliverable, and team interaction happens here.

---

## CURRENT STATE AUDIT (as of June 21, 2026)

### ✅ What We Have (The Good)

| Component             | Status   | Quality                                                               |
| --------------------- | -------- | --------------------------------------------------------------------- |
| **Auth + RBAC**       | Complete | Production-ready; JWT + session + 4 user roles                        |
| **Database Schema**   | Complete | 37 models covering all 8 apps; migrations 0001–0007 deployed          |
| **Nav Shell**         | Complete | Collapsible sidebar, topbar, Cmd+K search                             |
| **Task Board MVP**    | Complete | Kanban + DnD + inline timer + comments; 80% feature parity with Asana |
| **Finance Dashboard** | Complete | Ledger, KPIs, currency switcher, cash-flow charts                     |
| **Gamification**      | Complete | XP/levels, streaks, leaderboard, achievements                         |
| **Time Management**   | Complete | Timesheet, leave, availability, capacity, calendar                    |
| **CRM**               | Complete | Clients, invoices, quotations; quote→invoice conversion               |
| **AI Tools**          | Complete | Prompt Studio with variable substitution (Gemini when keyed)          |
| **Communication**     | Complete | Channels, messages, Redis Pub/Sub + WebSocket                         |
| **Automation**        | Complete | Triggers, steps, templates, manual test runs                          |
| **Campaigns**         | Complete | Pitch proposals, launch integration with CRM quotations               |
| **Testing**           | Partial  | 134 Jest unit tests; Playwright E2E (login→task→timer→drag)           |

### ❌ What's Missing (The Gaps)

| Gap                       | Impact                                            | Priority    |
| ------------------------- | ------------------------------------------------- | ----------- |
| **Production Deployment** | Can't use app yet; lives only locally             | 🔴 CRITICAL |
| **Dashboard Clarity**     | Modules marked "Live" but aren't fully functional | 🔴 CRITICAL |
| **User Onboarding**       | No intro, no "get started" flow                   | 🔴 CRITICAL |
| **Settings Module**       | Profile/preferences placeholder only              | 🟡 HIGH     |
| **Mobile Optimization**   | Not responsive; touch targets too small           | 🟡 HIGH     |
| **Error Handling**        | Silent failures; no user feedback                 | 🟡 HIGH     |
| **Loading States**        | No skeleton screens or progress indicators        | 🟡 HIGH     |
| **Search Across Apps**    | Cmd+K search doesn't work; limited to nav         | 🟠 MEDIUM   |
| **Google Calendar Sync**  | Time module disconnected from Google Cal          | 🟠 MEDIUM   |
| **AI Brief Automation**   | Finance brief is static; should be dynamic        | 🟠 MEDIUM   |
| **Client Portal**         | Magic-link portal built locally; not deployed     | 🟠 MEDIUM   |
| **Payment Gateway**       | Fawry/Telr not wired for invoice payment          | 🟠 MEDIUM   |
| **Workflow Canvas**       | Visual automation editor missing                  | 🟠 MEDIUM   |
| **Documentation**         | No API docs, component library, runbooks          | 🟠 MEDIUM   |

---

## THE STRATEGIC PIVOT: 3-PILLAR REPOSITIONING

### Pillar 1: LAUNCHER AS THE OPERATING SYSTEM

**Current Mental Model (Wrong):**  
"Launcher is a task app. Oh, and it has time tracking, CRM, finance. Pick which module you need."

**New Mental Model (Right):**  
"Launcher is where I (the employee) do my job. I don't log into Slack for projects. I don't email Excel sheets. I don't ping people on WhatsApp for approvals. All of that happens in Launcher."

### Pillar 2: TEAM CONNECTIVITY

**Current Mental Model (Wrong):**  
"Launcher manages individual tasks. Team collaboration is in Chat/Slack."

**New Mental Model (Right):**  
"In Launcher, the team stays connected through work. Every task has comments. Every project shows blockers. Every department sees what others are shipping."

### Pillar 3: DELIVERY ACCOUNTABILITY

**Current Mental Model (Wrong):**  
"We have a task app, but no one uses it consistently. Actual deadlines live in people's heads."

**New Mental Model (Right):**  
"Launcher is the source of truth for what gets shipped and when. No surprises. Leadership sees blockers in real-time."

---

## PHASE 1-3 ROADMAP (12 Weeks)

### Phase 1: Week 1–4 (Shipping DONE Status)

**Goal:** Launcher is functional, deployed, and where work happens.

#### Week 1: Deploy + Onboarding

- [ ] Vercel deployment: `launcher.mediabubble.co` live
- [ ] Supabase production DB wired
- [ ] Onboarding flow (quick tour → create first task)
- [ ] Seed 9-person team

**Ship:** Launcher live; employees can log in

#### Week 2: Core Loop (Task → Time → Celebrate)

- [ ] Task creation from homepage
- [ ] Inline task timer with visual feedback
- [ ] Time entry → Dashboard KPI update (real-time)
- [ ] XP reward + notification when task complete
- [ ] Comment on tasks (blocking, questions, context)

**Ship:** Employees can create task → log time → see impact

#### Week 3: Team Visibility

- [ ] Task Board filter: "My team's tasks this week"
- [ ] Blocker tagging ("waiting on design", "blocked by API")
- [ ] Leaderboard: "Top performers this week"
- [ ] Weekly digest email: team stats
- [ ] Slack integration: `/launcher task` command

**Ship:** Managers can see team velocity; blockers visible

#### Week 4: Mobile + Onboarding

- [ ] Mobile-responsive Kanban
- [ ] Mobile time entry (quick tap)
- [ ] Push notifications
- [ ] Onboarding video (5 min)
- [ ] Settings module: profile, notifications

**Ship:** Employees can work from mobile; onboarding self-serve

---

### Phase 2: Week 5–12 (Ecosystem Integration)

**Goal:** All department workflows flow through Launcher.

#### Week 5–6: Finance Module

- [ ] Invoice creation → Payment link (Fawry) → Tracking
- [ ] Quotation approval workflow
- [ ] Real-time KPI updates
- [ ] Dynamic AI brief
- [ ] Ledger: sortable, filterable, exportable

**Ship:** Finance team runs invoicing from Launcher

#### Week 7–8: Time Management + Leave

- [ ] Timesheet submission → Manager approval
- [ ] Leave request → Capacity impact notification
- [ ] Availability view
- [ ] Google Calendar sync
- [ ] Capacity planning

**Ship:** HR manages leave/capacity; payroll automated

#### Week 9–10: CRM + Campaigns

- [ ] Client onboarding workflow
- [ ] Quote → Invoice → Payment (end-to-end)
- [ ] Campaign proposal workflow
- [ ] Client portal: invoice view

**Ship:** Sales + Marketing don't need external CRM

#### Week 11–12: Communication Hub

- [ ] Channels per project
- [ ] Threaded discussions
- [ ] File sharing (linked to tasks/invoices/campaigns)
- [ ] Cross-module search

**Ship:** Async communication shifts from Slack to Launcher

---

### Phase 3: Week 13–18 (Advanced Capabilities)

- Workflow automation visual editor
- AI predictions (blockers, burnout, churn risk)
- Team celebration + retrospective insights
- Slack/WhatsApp integration for approvals

---

## SUCCESS METRICS

### User Adoption

| Metric              | Week 1 | Week 4 | Week 8 | Target        |
| ------------------- | ------ | ------ | ------ | ------------- |
| Daily Active Users  | 50%    | 90%    | 95%    | >85%          |
| Avg sessions/day    | 1.2    | 2.5    | 3+     | >2.5          |
| Tasks created/week  | 15     | 80     | 150+   | >100          |
| Time entries logged | 20     | 120    | 200+   | >80% of hours |

### Business Impact

| Metric                          | Baseline | Week 4   | Week 12  |
| ------------------------------- | -------- | -------- | -------- |
| Time in Launcher vs Slack/Email | 0h       | 2–3h/day | 4–5h/day |
| Duplicate tools killed          | 0        | 1–2      | 3+       |
| On-time delivery %              | 65%      | 75%      | 85%      |

---

## QUICK WINS (Do This Week)

### Week 1, Day 1: Deploy + First User

- [ ] Vercel: Deploy to `launcher.mediabubble.co`
- [ ] DNS: Wire up domain
- [ ] Supabase: Connect production database
- [ ] First login: Dorgham creates 1 task, logs 30 min, sees XP
- [ ] Slack alert: "Launcher is live!"

**Effort:** 4 hours  
**Impact:** App is live; team sees it's real

### Week 1, Day 2–3: Onboarding Flow

- [ ] "Welcome to Launcher" (2 sentences)
- [ ] Quick tour (sidebar, tasks, inbox, team)
- [ ] CTA: "Create your first task"
- [ ] Post-create: "Next step: log time"

**Effort:** 6 hours  
**Impact:** New employees → first task in 5 minutes

### Week 1, Day 4: Team Seed + Slack Integration

- [ ] Seed database: 9 employees (1 per dept)
- [ ] Each employee: 3 tasks assigned
- [ ] Slack webhook: daily digest
- [ ] Slack command: `/launcher task "Task name"`

**Effort:** 3 hours  
**Impact:** Launcher appears in Slack; team sees it's not empty

### Week 1, Day 5: Mobile + Settings

- [ ] Mobile Kanban: 3 columns stacked
- [ ] Mobile timer: Big button, visual feedback
- [ ] Settings: profile, time zone, notifications
- [ ] Team updates time zone

**Effort:** 4 hours  
**Impact:** Work from anywhere; settings aren't placeholder

### Week 2, Day 1–2: Task → Time → XP Loop

- [ ] Task detail: show cumulative time logged
- [ ] Inline timer: Click → timer starts; click again → logged
- [ ] Time entry → Dashboard KPI update (real-time)
- [ ] Complete task → Toast: "🎉 You earned 50 XP!"
- [ ] Leaderboard updates in real-time

**Effort:** 5 hours  
**Impact:** Work → outcome connection (visible XP, KPI impact)

### Week 2, Day 3–5: Comments + Blocking

- [ ] Task comment field
- [ ] @-mention teammates
- [ ] "Blocked by" tag (design, approval, API spec)
- [ ] Blocker notification
- [ ] Dashboard blocker count

**Effort:** 6 hours  
**Impact:** Blockers visible; no more silent blockers

---

## DEPARTMENTS & LAUNCHER WORKFLOWS

### 🎨 Design (2 people)

- Daily: Check task board → see pending design reviews
- Weekly: Create design tasks → estimate → log time → done → see XP
- Blocker: Comment "Waiting on copywriting" → Tag marketing
- Time: Log hours per design task

### 📱 Development (2 people)

- Daily: Sprint tasks → log time → see progress
- Weekly: Task Board: bugs vs features vs tech debt
- Blocker: "Design hasn't approved" → Tag design
- Time: Exact hours per feature

### 📊 Finance (1 person)

- Daily: Check Invoices → See overdue → Send link
- Weekly: KPI dashboard → Cash flow → Revenue trend
- Blocker: Auto-flag unpaid invoices after 5 days
- Reports: Export ledger for tax

### 📢 Marketing (1 person)

- Daily: Campaign board → Check deliverables ready
- Weekly: Campaigns created → Send to design → Track → Launch
- Blocker: Copy ready? Asset ready? Client approval?
- Time: Campaign hours (ROI calculation)

### 👔 Sales (1 person)

- Daily: Inbox → Pending quotations
- Weekly: Quotations → Sent → Track → Convert to invoice
- Blocker: Finance approval needed?
- Time: Sales call → Quote → Follow-up

### ⚙️ Operations (1 person)

- Daily: Time & leave dashboard → Approve timesheets
- Weekly: Team capacity view → Who has bandwidth?
- Blocker: Overtime detected?
- Reports: Payroll export

### 👨‍💼 CEO/Leadership (2 people)

- Daily: Dashboard → Top blockers, projects at risk, top performers
- Weekly: All-hands standup → Review board
- Monthly: Business review → Cash flow, project health, engagement
- Reports: Burn rate, delivery rate, utilization

---

## RISKS & MITIGATIONS

| Risk                     | Impact               | Mitigation                                          |
| ------------------------ | -------------------- | --------------------------------------------------- |
| **Adoption fatigue**     | Low DAU              | Week 1: 3-minute task creation; show XP immediately |
| **Data quality**         | Stale data; no trust | Week 2: Auto-reminders; highlight stale tasks       |
| **Mobile broken**        | Reduced engagement   | Week 4: Comprehensive QA; test on 3+ devices        |
| **Integration friction** | Parallel workflows   | Phase 2: Zapier integrations                        |
| **Blocker culture**      | Team feels paralyzed | Week 3: "Blocker champions" recognition             |
| **Security concern**     | Trust issue          | Week 1: Document RBAC clearly                       |

---

## SUMMARY: WHY LAUNCHER, WHY NOW

### The Problem

- Slack for work (messy threads)
- Email for approvals (easy to miss)
- Spreadsheets for finance (no real-time)
- Asana/Monday (expensive; duplicate with Launcher)
- Google Calendar (disconnected from tasks)

**Result:** Duplicate tools, tribal knowledge, hidden blockers, no single source of truth.

### The Solution

Launcher as the **unified operating system**. Every employee:

1. Logs in once (not 5 apps)
2. Sees all their work (tasks, approvals, time, projects)
3. Collaborates in context (comments, not Slack threads)
4. Stays engaged (XP, leaderboard, team wins)
5. Drives delivery (blockers visible, dependencies tracked, velocity tracked)

### The Outcome (Week 4)

- 85%+ daily active users
- All task work in Launcher
- All time tracked in Launcher
- All invoices in Launcher
- Team communicates in Launcher (Slack = notifications only)
- Cost: $0 per employee
- Impact: 20–30% delivery velocity boost

---

## NEXT STEPS

### By EOD Tomorrow (June 22)

- [ ] Approve Phase 1 roadmap (4 weeks)
- [ ] Assign product lead (daily execution)
- [ ] Assign engineering lead (build quick wins)
- [ ] Schedule kickoff: Monday June 24

### By End of Week (June 24)

- [ ] Vercel deployment live
- [ ] Onboarding flow merged
- [ ] Team seed created (9 employees)
- [ ] First 3 employees logging in

### By End of Month (June 30)

- [ ] 80%+ daily active users
- [ ] Core loop complete (task → time → XP)
- [ ] Blockers tagged and visible
- [ ] First "quick wins" report

---

**Prepared by:** Claude (Agent-driven analysis)  
**Data sources:** LAUNCHER_AUDIT_REPORT.md, LAUNCHER_PLAN_V2.md, codebase inspection  
**For questions:** Contact Dorgham or Product Lead
