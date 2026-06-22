# 🚀 Launcher Strategic Pivot — ONE PAGER

**The Play:** Turn Launcher into MediaBubble's #1 employee software  
**Timeline:** 4 weeks to MVP, 12 weeks to full platform  
**Impact:** 20-30% velocity boost, $0 cost per employee, unified team OS

---

## THE SHIFT

| BEFORE                         | AFTER                          |
| ------------------------------ | ------------------------------ |
| 5 different tools per employee | 1 login → do all work          |
| Slack chaos for work           | Contextual task comments       |
| Duplicate Asana + Launcher     | Single source of truth         |
| Silent blockers                | Blocker visibility dashboard   |
| "Is that done?" ping messages  | Status in Launcher (real-time) |

---

## WHAT WE HAVE vs. WHAT'S MISSING

### ✅ DONE (Ready to Ship)

- **Auth + RBAC** — Production-ready JWT + 4 roles
- **Database** — 37 models (all 8 apps covered)
- **Task Board** — Kanban + DnD + timer + comments
- **Finance** — Ledger + KPIs + cash-flow charts
- **Gamification** — XP/levels + leaderboard + streaks
- **Time** — Timesheet + leave + capacity + calendar
- **CRM** — Clients + invoices + quotes
- **AI Tools** — Prompt Studio
- **Communication** — Channels + Redis Pub/Sub
- **Automation** — Triggers + templates
- **Campaigns** — Proposal workflow
- **Testing** — 134 unit tests + E2E smoke test

### ❌ CRITICAL GAPS

1. **Not deployed yet** (lives locally only)
2. **No onboarding flow** (employees confused on Day 1)
3. **No mobile support** (50% want to work from phone)
4. **Modules marked "Live" but incomplete**
5. **No error handling or loading states**

---

## 4-WEEK SPRINT PLAN

### Week 1: DEPLOY + LAND

- **Mon:** Vercel live + DNS wired
- **Tue:** Onboarding flow (quick tour → create task)
- **Wed:** Seed team (9 employees + 27 tasks)
- **Thu:** Slack integration (daily digest + `/launcher` command)
- **Fri:** Mobile optimization + settings

**Checkpoint:** Launcher live; team logging in; first tasks created

---

### Week 2: CORE LOOP (Task → Time → XP)

- **Mon–Tue:** Task timer + real-time KPI update
- **Wed–Thu:** XP reward + level up + notification toast
- **Fri:** Comments + @-mentions + blocker tagging

**Checkpoint:** Employees feel work → outcome (see XP, see KPI move)

---

### Week 3: TEAM VISIBILITY

- **Mon–Tue:** Task Board filters (my team, this week, by status)
- **Wed–Thu:** Leaderboard deep-dive + kanban polish
- **Fri:** Settings: notification frequency + email digest

**Checkpoint:** Managers see team velocity; 70% DAU

---

### Week 4: MOBILE + POLISH

- **Mon–Tue:** Mobile task creation + timer (quick tap)
- **Wed–Thu:** Push notifications + onboarding video (Loom 5 min)
- **Fri:** Settings module complete (profile, integrations)

**Checkpoint:** 80% DAU; 50% mobile usage; new hires onboarded in <2 hours

---

## QUICK WINS (DO THIS WEEK)

### 🟡 Day 1: Deploy

```bash
# Vercel project + launcher.mediabubble.co DNS live
# Supabase production database connected
# Dorgham logs in → creates task → logs time → sees XP
# Impact: App no longer "local only"
```

### 🟡 Day 2–3: Onboarding

```
Welcome slide (2 sentences)
  ↓
Quick tour (sidebar, tasks, inbox)
  ↓
"Create your first task"
  ↓
"Next: log time on this task"
```

### 🟡 Day 4: Team Seed

```
9 employees (1 per department)
27 tasks (3 per person)
Slack webhook: daily digest
Slack command: /launcher task "Task name"
```

### 🟡 Day 5: Mobile

```
Kanban mobile-responsive
Timer big button
Settings form
```

---

## SUCCESS METRICS (Track Weekly)

| What                | Week 1 | Week 4 | Target     | Owner   |
| ------------------- | ------ | ------ | ---------- | ------- |
| Daily Active Users  | 50%    | 90%    | >85%       | Product |
| Avg sessions/day    | 1.2    | 2.5    | >2.5       | Product |
| Tasks created/week  | 15     | 80     | >100       | All     |
| Time entries logged | 20     | 120    | >80% hours | All     |
| Error rate          | <2%    | <0.5%  | <0.1%      | Eng     |
| Page load time      | <3s    | <2s    | <1.5s      | Eng     |

---

## DEPARTMENT PLAYBOOKS (How They Use Launcher)

### 🎨 **Design:** Daily → Check reviews | Weekly → Log design hours | See XP grow

### 📱 **Dev:** Daily → Sprint tasks | Weekly → Bugs vs features | Track hours per feature

### 📊 **Finance:** Daily → Invoices | Weekly → KPI dashboard | Export ledger

### 📢 **Marketing:** Daily → Campaign board | Weekly → Design requests | Track ROI hours

### 👔 **Sales:** Daily → Quotations pending | Weekly → Quote → Invoice | Track pipeline

### ⚙️ **Ops:** Daily → Approve timesheets | Weekly → Team capacity | Payroll export

### 👨‍💼 **Leadership:** Daily → Dashboard (blockers, velocity) | Weekly → Standup + board review | Monthly → Business metrics

---

## EMPLOYEE JOURNEY (Day 1 → Week 4)

```
Day 1: "Welcome to Launcher" → Create first task
  ↓
Day 2–3: Log time → See XP grow → Level up 🎉
  ↓
Day 4–5: Comment on task → See team collaboration
  ↓
Week 2: Check team board → See blockers → Unblock teammate
  ↓
Week 3: Check leaderboard → See top performers → Want to rank
  ↓
Week 4: Launcher is daily habit; team coordinates here, not Slack
```

---

## COMPETITIVE ADVANTAGE

### vs. Asana/Monday

- ✅ Built-in gamification (native engagement, not add-on)
- ✅ Finance dashboard (business metrics in one place)
- ✅ Unified communication (no Slack tab-switching)
- ✅ Full time tracking (not separate tool)
- ✅ Cost: $0 per employee (internal tool)

### vs. Slack

- ✅ Work execution (tasks, approvals, accountability)
- ✅ Persistent (not messages that scroll away)
- ✅ Structured (not chaotic threads)
- ✅ Async-friendly (no "hey did you see my message?")

---

## RISKS & SAFETY NETS

| Risk                            | Safety Net                                            |
| ------------------------------- | ----------------------------------------------------- |
| "Not another tool" fatigue      | Week 1: 3-min task + immediate XP reward              |
| Data gets stale                 | Week 2: Auto-reminders to update status               |
| Mobile broken, kills adoption   | Week 4: Comprehensive QA + test on 3 devices          |
| Team wants Slack integration    | Phase 2: Zapier + `/launcher` command ready           |
| Blockers become culture blocker | Week 3: "Blocker champions" award for fast unblocking |

---

## INVESTMENT REQUIRED

### Engineering Time (4 weeks)

- **Week 1:** Deploy + onboarding (4 days)
- **Week 2:** Core loop (3 days)
- **Week 3:** Team visibility (2 days)
- **Week 4:** Mobile + polish (3 days)
- **Contingency:** 2 days

**Total:** ~2 people × 4 weeks = 320 engineer-hours

### Infrastructure Cost

- **Vercel:** $20/month
- **Supabase:** $100/month (production tier)
- **Redis (Upstash):** $15/month
- **Total:** $135/month (~$1.80 per employee/month)

---

## THE ASK (Board Approval)

### ✅ APPROVE

1. **Phase 1 roadmap** (4 weeks, shipping MVP)
2. **Resource allocation** (1 product lead + 2 engineers dedicated)
3. **Budget** ($500/month infrastructure)
4. **Team launch date** (Monday, June 24)

### 🎯 BY END OF MONTH

- Launcher live + 80% team active
- Core loop working (task → time → XP)
- First "quick wins" report (tasks shipped, hours tracked, cost impact)

### 📈 BY END OF QUARTER

- All task work in Launcher (kill Asana)
- All time tracked in Launcher (kill Google Forms)
- All invoices in Launcher (consolidate billing)
- Team communication in Launcher (Slack = notifications only)

---

## BOTTOM LINE

**Launcher isn't a task app. It's the operating system for MediaBubble's delivery engine.**

One login. One source of truth. One team, shipping faster.

---

**Next Step:** Kickoff Monday, June 24 @ 10 AM  
**Questions?** Contact Dorgham or Product Lead
