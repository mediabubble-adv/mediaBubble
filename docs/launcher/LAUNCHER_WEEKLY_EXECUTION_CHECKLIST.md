# LAUNCHER PIVOT — Weekly Execution Checklist

**Prepared for:** Engineering Team + Product Lead  
**Timeline:** Week 1–4 Sprint (June 24 – July 21, 2026)

---

## WEEK 1: DEPLOY + ONBOARD (June 24–28)

### ✅ MONDAY, JUNE 24 — Vercel Deploy + DNS

**Before 10 AM**

- [ ] Create Vercel project: `launcher`
- [ ] Connect GitHub: `apps/launcher` directory
- [ ] Environment variables set:
  - [ ] `DATABASE_URL` (Supabase prod)
  - [ ] `DIRECT_URL` (Supabase prod, for migrations)
  - [ ] `JWT_SECRET` (same as local)
  - [ ] `RESEND_API_KEY`
  - [ ] `NEXT_PUBLIC_SITE_URL=https://launcher.mediabubble.co`
  - [ ] `REDIS_URL` (if using prod Redis)
- [ ] Deploy branch: `main`
- [ ] Verify build succeeds

**10 AM Kickoff Meeting**

- Announce Launcher goes live today
- Explain why (this is the operating system, not a task app)
- Demo: create task → log time → see XP

**Before 5 PM**

- [ ] DNS: Point `launcher.mediabubble.co` to Vercel deployment
- [ ] Verify SSL certificate auto-provisioned
- [ ] Test login: https://launcher.mediabubble.co → login form appears
- [ ] Test auth: Sign in as test user → redirect to dashboard

**By EOD**

- [ ] Slack announcement: "Launcher is LIVE 🚀 Log in here: launcher.mediabubble.co"
- [ ] Dorgham first user: creates task, logs time, sees XP
- [ ] Screenshot: Dorgham's first task + XP badge
- [ ] Post to Slack: celebration 🎉

---

### ✅ TUESDAY, JUNE 25 — Onboarding Flow

**Sprint Start (9 AM)**

- [ ] Pull latest `main` branch
- [ ] Verify no console errors on homepage

**Build Onboarding (9 AM–12 PM)**

- [ ] Route: `/onboarding` (created users redirect here on first login)
- [ ] Slide 1: "Welcome to Launcher"
  - Headline: "Launcher is where you do your job"
  - Subheading: "One app for all your work"
  - CTA: "Let's get started" (next slide)
- [ ] Slide 2: Quick Tour (2 min)
  - Sidebar: "Everything you need is here"
  - Your tasks: "Work assigned to you"
  - Inbox: "Approvals & notifications"
  - Team: "See what your team is shipping"
  - Navigation: Back / Next / Skip
- [ ] Slide 3: Create Your First Task
  - Task name input
  - Description (optional)
  - Assigned to: (auto = you)
  - CTA: "Create task"
- [ ] Post-create: Slide 4
  - "🎉 You created your first task!"
  - "Next step: log time and see your XP grow"
  - CTA: "Go to task" (opens task detail)
- [ ] Mark onboarding complete
- [ ] Set user: `onboarded = true` in DB

**Test Onboarding (12 PM–1 PM)**

- [ ] Fresh user signup → onboarding flow
- [ ] Test all 4 slides
- [ ] Test "Skip" button → lands on dashboard
- [ ] Test "Create task" → task appears on board

**Deploy Onboarding (1 PM)**

- [ ] Commit to git
- [ ] Deploy to Vercel
- [ ] Verify on production

**By EOD**

- [ ] Test with 1 new employee: sign up → onboarding → create task
- [ ] Screenshot: onboarding flow working
- [ ] Post to Slack: "Onboarding ready; new employees get guided tour"

---

### ✅ WEDNESDAY, JUNE 26 — Team Seed + Roles

**Sprint Start (9 AM)**

- [ ] Verify Vercel + DNS still working
- [ ] Fresh login test

**Seed Database (9 AM–11 AM)**

- [ ] Extend `prisma/seed.ts` (if needed):

  ```sql
  -- Create 9 department heads (1 per department)
  Design → userId: des-001, email: design@mediabubble.co
  Dev → userId: dev-001, email: dev@mediabubble.co
  Finance → userId: fin-001, email: finance@mediabubble.co
  Marketing → userId: mkt-001, email: marketing@mediabubble.co
  Sales → userid: sal-001, email: sales@mediabubble.co
  Ops → userid: ops-001, email: ops@mediabubble.co
  CEO → userid: ceo-001, email: ceo@mediabubble.co
  ```

- [ ] Create test passwords (temp; have them reset on first login)
- [ ] Create 27 sample tasks (3 per person):
  - Design: "Homepage mockup", "Brand guideline", "Client logo"
  - Dev: "API auth endpoint", "Task CRUD routes", "Fix mobile layout"
  - Finance: "Invoice #001", "Ledger reconciliation", "Expense report"
  - Marketing: "Copy for campaign", "Social media deck", "Email sequence"
  - Sales: "Follow up ABC Corp", "Quotation XYZ Ltd", "Contract review"
  - Ops: "Approve timesheets", "Capacity planning", "Onboard new hire"
  - CEO: "Review project status", "Leadership team sync", "Investor update"

- [ ] Distribute credentials (Slack DM to each person):
  ```
  Welcome to Launcher!
  Email: [email]
  Temp password: [password]
  You'll be asked to reset on first login.
  Log in here: https://launcher.mediabubble.co
  ```

**Test Seed (11 AM–12 PM)**

- [ ] Each of 9 users can log in
- [ ] Each user sees their 3 assigned tasks
- [ ] Task details load correctly

**Slack Integration Setup (12 PM–2 PM)**

- [ ] Create Slack webhook (incoming):
  - Route: `/api/webhooks/slack/digest`
  - Payload: Daily digest (tasks due, approvals pending)
  - Post at 8 AM Cairo time
- [ ] Test webhook: manually trigger → Slack message appears
- [ ] Create Slack slash command:
  - Command: `/launcher`
  - Subcommands:
    - `/launcher task "Task name"` → creates task in Launcher
    - `/launcher status` → shows user's today's tasks
  - Verify commands work

**Deploy Team Seed (2 PM)**

- [ ] Commit seed changes
- [ ] Deploy to Vercel
- [ ] Verify 9 users can log in

**By EOD**

- [ ] All 9 team members logged in at least once
- [ ] Screenshot: Task board with 27 tasks
- [ ] Slack webhook working (daily digest test)
- [ ] Slack commands working (`/launcher task`)

---

### ✅ THURSDAY, JUNE 27 — Mobile Optimization

**Sprint Start (9 AM)**

- [ ] Verify all 9 users still active

**Mobile Kanban (9 AM–11 AM)**

- [ ] Make task board responsive:
  - Desktop (1200px+): 4 columns side-by-side
  - Tablet (768px–1199px): 2 columns + scroll
  - Mobile (<768px): 1 column + swipe between columns
- [ ] Test on 3 devices: iPhone 13, iPad, Android
- [ ] Touch targets: >48px (tap comfort)
- [ ] No horizontal scroll (adjust column widths)

**Mobile Timer (11 AM–12 PM)**

- [ ] Time entry button: big + centered
- [ ] On mobile: show timer in large font
- [ ] Start/stop: visual feedback (button pulse)
- [ ] Sound notification: ding when timer completes (if enabled)

**Settings Module (12 PM–2 PM)**

- [ ] Profile tab:
  - Avatar (Gravatar if email exists)
  - Name, email, title
  - Department
  - Role
  - Time zone (critical for time tracking)
  - "Edit" button → update form
- [ ] Notifications tab:
  - Email digest frequency (daily, weekly, none)
  - Push notifications (on/off)
  - Mention notifications (on/off)
  - Approval notifications (on/off)
- [ ] Preferences tab:
  - Dark/light mode
  - Sidebar collapsed (default position)
  - Task board view (kanban vs. list vs. calendar)
  - Currency for finances (EGP/USD/AED)

**Test Settings (2 PM–3 PM)**

- [ ] Each user updates time zone
- [ ] Verify time zone persists (check DB)
- [ ] Toggle dark mode → page updates
- [ ] Change sidebar preference → persists

**Deploy Mobile (3 PM)**

- [ ] Commit mobile changes
- [ ] Deploy to Vercel
- [ ] QA on production devices

**By EOD**

- [ ] Mobile Kanban works on phone
- [ ] Timer big + accessible
- [ ] Settings saved for all 9 users
- [ ] Screenshots: mobile kanban, mobile timer

---

### ✅ FRIDAY, JUNE 28 — Polish + Celebrate

**Sprint Start (9 AM)**

- [ ] All systems up: Vercel, DNS, Slack, mobile working
- [ ] Team active all week

**Polishing (9 AM–12 PM)**

- [ ] Check console for errors (fix any)
- [ ] Verify all buttons have hover states
- [ ] Check transitions (smooth, not janky)
- [ ] Test on slow network (3G) → verify load states
- [ ] Verify all links work
- [ ] Check Slack integration still posting

**Launch Report (12 PM–1 PM)**

- [ ] Metrics this week:
  - [ ] 9/9 team members logged in
  - [ ] 27/27 tasks created
  - [ ] DAU: 50% (this week was seeded)
  - [ ] Mobile conversion: 20% (test devices)
  - [ ] Zero critical errors
- [ ] Screenshot: dashboard with 27 tasks
- [ ] Post to Slack + all-hands: "Week 1 ✅ Complete"

**Celebrate (2 PM)**

- [ ] All-hands announcement: "Launcher Week 1 shipped! Next week: core loop (time → XP)"
- [ ] Recognize: Product lead, engineers, team for quick adoption
- [ ] Screenshot: team using Launcher → post to #launches channel

**By EOD**

- [ ] Week 1 complete
- [ ] Checkpoint passed: Launcher live, team onboarded, first tasks in system
- [ ] Hand off to Week 2 leads

---

## WEEK 2: CORE LOOP (July 1–5)

### Goal: Task → Time → XP (Employees see work → outcome)

- [ ] **Monday–Tuesday:** Task timer + real-time KPI update
  - Inline timer: click start → click stop → time logged to task + DB
  - Dashboard KPIs update live (total inflows, outflows, profit change)
  - Example: Complete task (30 min work) → see XP bar move, level up notification
- [ ] **Wednesday–Thursday:** XP reward notifications
  - Task completion → Toast: "🎉 You earned 50 XP! (Level 5 → 6)"
  - Leaderboard updates (see your rank in real-time)
  - Streak tracking (consecutive days logged)
- [ ] **Friday:** Comments + @-mentions
  - Add comment to task
  - @-mention teammate
  - Mentioned person gets Slack notification + in-app inbox

**Checkpoint (EOD Friday):** 50% team logging time daily; XP engagement visible

---

## WEEK 3: TEAM VISIBILITY (July 8–12)

### Goal: Managers see velocity; blockers are visible

- [ ] **Monday–Tuesday:** Task Board filters
  - Filter by: assignee, status, due date, department, team
  - Save filter views (My Team, This Week, Urgent)
- [ ] **Wednesday–Thursday:** Blocker tagging
  - Tag on task: "Blocked by: Design", "Waiting on: Finance approval"
  - Blocker dashboard: show all blockers by team, by priority
- [ ] **Friday:** Leaderboard
  - By XP (individuals)
  - By team velocity (tasks completed per day)
  - By best blocker unlocker (who resolved most blockers)

**Checkpoint (EOD Friday):** 70% DAU; Managers running standup from Launcher board

---

## WEEK 4: MOBILE + COMPLETE (July 15–19)

### Goal: 80% DAU; employees work from mobile; Settings done

- [ ] **Monday–Tuesday:** Mobile task creation
  - Form on mobile: task name, description (simplified)
  - Assign to self (one tap)
  - Set due date (date picker)
  - Create → task appears on board instantly
- [ ] **Wednesday–Thursday:** Push notifications
  - Task assigned → push
  - Blocker tag → push
  - Approval needed → push
  - Test on iOS + Android
- [ ] **Friday:** Settings complete + onboarding video
  - Settings all 3 tabs working
  - Onboarding video (Loom, 5 min): "Your first day in Launcher"
  - Video: create task, log time, see XP, comment on task
  - New employees watch video on onboarding

**Checkpoint (EOD Friday):** 80% DAU; 50% mobile usage; new hires self-onboarded via video

---

## SUCCESS CRITERIA (Track Daily)

### Daily Standup (10 AM Cairo Time)

**Report:**

- [ ] DAU (daily active users) — target: Week 1: 50%, Week 2: 60%, Week 3: 70%, Week 4: 80%
- [ ] Tasks created — target: Week 1: 27 (seeded), Week 2: 40+, Week 3: 60+, Week 4: 80+
- [ ] Time entries — target: Week 1: 20, Week 2: 60, Week 3: 120, Week 4: 150+
- [ ] Errors last 24h — target: <1 critical per day
- [ ] Page load time — target: <2s average
- [ ] Blockers this sprint — anything preventing shipping?

**Owners:**

- Product Lead: metrics, user feedback
- Eng Lead: performance, bugs, deployment

---

## DEPLOYMENT CHECKLIST (Each Week)

**Before Deploy:**

- [ ] Code review: 2 approvals minimum
- [ ] Tests pass: Jest + Playwright
- [ ] No console errors (localhost)
- [ ] Vercel preview deployment works
- [ ] Database migrations tested locally

**Deploy:**

- [ ] Deploy to Vercel `main` branch
- [ ] Monitor errors (Sentry/logs) for 1 hour
- [ ] Verify key pages load (<2s)
- [ ] Verify auth flow works
- [ ] Verify Slack integrations fire

**Post-Deploy:**

- [ ] Announce in Slack: "New Launcher version live (feat: X, fix: Y)"
- [ ] Send feedback survey: "What should we improve?"

---

## ESCALATION PATHS

**If Vercel Down:**

- Notify team immediately (Slack)
- Revert last deployment
- Investigate root cause
- Deploy fix
- Post-mortem within 24h

**If Database Issues:**

- Failover to backup
- Notify all team members (downtime message in Slack)
- Restore from last good backup
- Verify data integrity

**If Adoption Stalls (<50% by end of Week 2):**

- 1-on-1 with each team member: "What's blocking you?"
- Adjust onboarding flow if needed
- Offer office hours (10 min demo sessions)
- Celebrate early adopters (recognition in Slack)

---

## RESOURCES

- **Vercel dashboard:** https://vercel.com/
- **Supabase console:** https://app.supabase.com/
- **GitHub:** apps/launcher
- **Slack channel:** #launcher-dev
- **Drive folder:** MediaBubble/Launcher/ (docs, screenshots, feedback)

---

## HANDOFF TEMPLATE (End of Each Week)

**To:** Next week's team lead  
**Date:** [Friday EOD]

**What Shipped:**

- Feature 1
- Feature 2
- Metrics: DAU%, tasks, time entries

**What's in Progress:**

- Feature X (50% done; blocker: Y)
- Feature Z (starting Monday)

**Blockers:**

- None / [Specific blocker + plan]

**Next Week's Priorities:**

- [Top 3 by Monday 9 AM]

**Known Issues:**

- [List any; severity + plan]

---

**Questions?** Contact Product Lead  
**Last Updated:** June 21, 2026  
**Next Review:** End of Week 1 (June 28)
