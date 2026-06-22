# Launcher Execution Plan — Phase 2A (Weeks 5–12)

**Status:** Ready for Engineering  
**Owner:** Dorgham + Engineering Lead  
**Updated:** June 21, 2026

---

## CRITICAL PATH OVERVIEW

```
Week 5     [Analytics]          Delivers business intelligence
Week 6     [Documents]          Delivers file centralization
Week 7     [Slack]              Delivers notification hub
Week 8     [Payments + Portal]   Delivers revenue automation

Weeks 9–12 [Parallel Tracks A, B, C]
├─ Track A: Phase 2 Features (Finance, Time, CRM)
├─ Track B: Resource Planning (Capacity, Allocation, Bottlenecks)
└─ Track C: Google Workspace Integration
```

**Critical Dependencies:**

- Analytics framework must ship before Resource Planning (uses analytics data)
- Database schema deployed before Week 5 (sprint 0: database migration)
- Slack OAuth registered before Week 7 (registration takes 1–2 days)
- Vercel environment configured before Week 5 (deploy pipeline ready)

---

## SPRINT 0 (June 24–28) — PREP & INFRASTRUCTURE

### Goal

Lock down database schema, deployment pipeline, and external integrations.

### Monday, June 24 (Kickoff)

**Morning (9–11 AM Cairo):**

- [ ] Team standup + roadmap review (30 min)
- [ ] Assign owners: Analytics (Owner A), Documents (Owner B), Slack (Owner C), Payment (Owner D)
- [ ] Review PRD + Architecture (1 hour, all team)
- [ ] Q&A session (30 min)

**Afternoon (2–5 PM Cairo):**

- [ ] Database migration: Deploy new Prisma schema
  - [ ] Create migration file (`npx prisma migrate dev --name phase_2a_schema`)
  - [ ] Test on local development environment
  - [ ] Test on staging database
  - [ ] Document rollback procedure
- [ ] Setup feature flags infrastructure
  - [ ] Create feature flag provider (e.g., LaunchDarkly, Unleash, or basic ENV-based)
  - [ ] Flag all Phase 2A features as "disabled by default"
- [ ] Slack app registration
  - [ ] Register app on Slack dev portal
  - [ ] Get OAuth credentials
  - [ ] Whitelist `http://localhost:3000/api/slack/oauth` for local testing
- [ ] Vercel environment setup
  - [ ] Add Phase 2A env vars (S3 bucket, Redis, etc.)
  - [ ] Test deployment pipeline on staging

**Deliverable:** Database schema live on staging, feature flags working, Slack app registered, deployment pipeline green.

---

### Tuesday–Wednesday (June 25–26)

**Owner A (Analytics Lead):**

- [ ] Setup analytics API infrastructure
  - [ ] Create `/api/v1/analytics/*` route structure
  - [ ] Setup Redis client + caching logic
  - [ ] Create background job worker (cron: every 5 min)
- [ ] Implement first endpoint: `GET /api/v1/analytics/dashboard`
  - [ ] Query database for KPIs
  - [ ] Cache result in Redis
  - [ ] Return response format (JSON)
- [ ] Test API with Postman/curl

**Owner B (Documents Lead):**

- [ ] Setup S3 integration
  - [ ] Create AWS IAM policy for S3 upload
  - [ ] Configure CORS on S3 bucket
  - [ ] Test file upload from Node.js
- [ ] Implement `/api/v1/documents/upload` endpoint
  - [ ] Multipart form handler
  - [ ] File validation (type, size)
  - [ ] S3 upload logic
- [ ] Create Document + DocumentVersion models in database (already in schema)

**Owner C (Slack Lead):**

- [ ] Register Slack app webhooks
  - [ ] Setup event subscriptions (message, reaction_added)
  - [ ] Setup slash commands (`/launcher task`)
  - [ ] Test webhook in local environment
- [ ] Implement Slack OAuth flow
  - [ ] Create `/api/slack/oauth` endpoint
  - [ ] Store access token (encrypted in Integration table)
  - [ ] Test OAuth flow

**Owner D (Payment Lead):**

- [ ] Setup Stripe webhook (or Fawry, depending on region)
  - [ ] Create webhook endpoint `/api/webhooks/stripe`
  - [ ] Verify webhook signature
  - [ ] Test with Stripe CLI (`stripe listen`)
- [ ] Implement invoice reconciliation logic
  - [ ] Query unpaid invoices
  - [ ] Match payments to invoices
  - [ ] Mark as paid

**Deliverable:** Each owner has 1 working API endpoint. No UI yet.

---

### Thursday–Friday (June 27–28)

**All Teams:**

- [ ] Code review + merge to main
- [ ] Deployment to staging
- [ ] Smoke test all endpoints
- [ ] Document any blockers
- [ ] Celebrate end of Sprint 0 🎉

**Friday Standup (4 PM Cairo):**

- 5-min update per owner
- Any blockers? → Escalate to Dorgham
- Plan next sprint (Week 5)

**Deliverable:** All Phase 2A infrastructure live on staging, ready for feature development.

---

## WEEK 5 (July 1–5) — ANALYTICS DASHBOARD

### Goal

Leadership sees business health at a glance. All KPI cards + filters working.

### Sprint Planning (Monday Morning)

**Acceptance Criteria (from PRD):**

- [ ] Dashboard loads in <2s
- [ ] All 4 metric sections populated (Revenue, Pipeline, Project Health, Team Utilization)
- [ ] Real-time updates work (WebSocket)
- [ ] Filters work (date range, department, project)
- [ ] Mobile responsive
- [ ] Deployment to production on Friday

---

### Owner A: Backend (Analytics API)

**Monday–Tuesday:**

```
API Endpoints to Implement:
├─ GET /api/v1/analytics/dashboard (aggregate endpoint)
├─ GET /api/v1/analytics/revenue (revenue KPIs + trend)
├─ GET /api/v1/analytics/project-health (on-time %, velocity)
└─ GET /api/v1/analytics/team-metrics (utilization by dept)

Each endpoint:
├─ Query data from Postgres
├─ Cache in Redis (30-min TTL)
├─ Return JSON
└─ Handle errors gracefully
```

**Checklist:**

- [ ] `GET /api/v1/analytics/revenue`
  - [ ] Query transactions (sum by date)
  - [ ] Query invoices (outstanding amount)
  - [ ] Query cash flow table (if exists)
  - [ ] Return: { totalRevenue, trend7d, trend30d, invoicesPaid, outstandingAmount }
  - [ ] Test with curl

- [ ] `GET /api/v1/analytics/project-health`
  - [ ] Query tasks (completed count, overdue count)
  - [ ] Calculate on-time % (tasks completed on time / total)
  - [ ] Return: { onTimePercent, activeProjectCount, atRiskCount, delayedCount, velocity }
  - [ ] Test with curl

- [ ] `GET /api/v1/analytics/team-metrics`
  - [ ] Query time entries (sum by department)
  - [ ] Query project allocations
  - [ ] Calculate utilization % per department
  - [ ] Return: { departments: [{ name, utilization%, billableHours, nonBillableHours }] }
  - [ ] Test with curl

- [ ] Background job: Update AnalyticsCache every 5 minutes
  - [ ] Create scheduled job (e.g., node-cron or Bull queue)
  - [ ] Run all 4 analytics queries
  - [ ] Store in AnalyticsCache table
  - [ ] Log any failures

**Deliverable:** All analytics endpoints return data. Caching works. No UI yet.

---

### Owner A: Frontend (Analytics Dashboard UI)

**Wednesday–Thursday:**

```
React Components to Build:
├─ components/dashboard/AnalyticsDashboard.tsx (main container)
├─ components/dashboard/MetricCard.tsx (KPI card, reusable)
├─ components/dashboard/BusinessMetrics.tsx (revenue section)
├─ components/dashboard/ProjectHealth.tsx (project section)
├─ components/dashboard/TeamUtilization.tsx (team section)
└─ components/dashboard/TopBlockers.tsx (blockers list)
```

**Checklist:**

- [ ] Setup analytics service (fetch from API)
  - [ ] Create `lib/analytics.ts`
  - [ ] Implement useAnalytics hook
  - [ ] Add error handling + loading states
  - [ ] Add real-time refresh (poll every 30s)

- [ ] Build AnalyticsDashboard container
  - [ ] Grid layout (4 columns on desktop, 1 on mobile)
  - [ ] Date range filter dropdown
  - [ ] Department filter dropdown
  - [ ] "Refresh" button
  - [ ] Responsive grid

- [ ] Build MetricCard component
  - [ ] Props: title, value, unit, trend, trendPercent, color
  - [ ] Display value + trend (e.g., "+12% vs last month")
  - [ ] Color coding: green (good), yellow (ok), red (bad)

- [ ] Build metric sections
  - [ ] Revenue: 3 cards (Total YTD, Revenue Trend, Invoices Status)
  - [ ] Pipeline: Funnel chart (lead → proposal → won)
  - [ ] Project Health: 3 cards (On-Time %, At-Risk Count, Velocity)
  - [ ] Team Utilization: Heatmap (Design 80%, Dev 30%, Ops 85%)

- [ ] Add charts
  - [ ] Revenue Trend: Area chart (recharts) showing daily revenue
  - [ ] Pipeline Funnel: Funnel chart (recharts)
  - [ ] Utilization Heatmap: Grid chart with color coding

- [ ] Test on mobile (responsive)
  - [ ] Cards stack vertically on <768px
  - [ ] Charts resize to fit screen
  - [ ] Filters still accessible

**Deliverable:** Dashboard UI complete. Connects to API. Real-time updates work.

---

### Owner A: QA & Deployment

**Friday:**

- [ ] End-to-end testing
  - [ ] Load dashboard
  - [ ] Verify all KPIs populate within 2s
  - [ ] Test filters (date, department)
  - [ ] Test mobile on iPhone
  - [ ] Test on slow network (Lighthouse)
- [ ] Performance optimization
  - [ ] Check Lighthouse score (target >90)
  - [ ] Optimize images/bundle size if needed
  - [ ] Test on 3G network (throttled)
- [ ] Deploy to production
  - [ ] Merge to main
  - [ ] Deploy via Vercel
  - [ ] Smoke test on production
  - [ ] Monitor errors (Sentry)

**Deliverable:** Analytics Dashboard live in production. DAU increase expected: 60% → 65%.

---

### Deployment Checklist (Week 5 Friday)

- [ ] Feature flag `analytics_dashboard` enabled for 50% of team
- [ ] A/B test: 50% team vs 50% leadership (see if feedback differs)
- [ ] Error monitoring configured (Sentry alerts)
- [ ] Load test: Can dashboard handle 100 concurrent users?
- [ ] Monitoring dashboards live (Datadog/custom)
- [ ] Rollback procedure documented + tested
- [ ] Team trained (1 hour webinar on new dashboard)

---

## WEEK 6 (July 8–12) — DOCUMENT MANAGEMENT

### Goal

All project files in one place. Versioning works. No more Google Drive chaos.

### Owner B: Backend (Document API)

**Monday–Tuesday:**

```
API Endpoints to Implement:
├─ POST /api/v1/documents/upload (single file)
├─ GET /api/v1/documents (file list, paginated)
├─ GET /api/v1/documents/:id (file details + versions)
├─ POST /api/v1/documents/:id/share (share with user)
├─ POST /api/v1/documents/:id/version (new version)
├─ GET /api/v1/documents/search (full-text search)
└─ DELETE /api/v1/documents/:id (soft delete)
```

**Checklist:**

- [ ] S3 integration (already done Sprint 0)
  - [ ] Verify file upload works
  - [ ] Test file retrieval
  - [ ] Verify CORS headers

- [ ] Implement file upload endpoint
  - [ ] Accept multipart/form-data
  - [ ] Validate file type + size (max 500MB per project)
  - [ ] Upload to S3 with unique key
  - [ ] Create Document record in Postgres
  - [ ] Auto-create DocumentVersion v1.0
  - [ ] Return: { documentId, versionId, fileUrl }

- [ ] Implement file list endpoint
  - [ ] Filter by project, type, owner
  - [ ] Sort by date, name, size
  - [ ] Pagination (20 per page)
  - [ ] Return: { documents: [{id, name, size, uploadedAt, owner}], total }

- [ ] Implement version control
  - [ ] Auto-create new version on upload (same name = new version)
  - [ ] Get version history: GET /api/v1/documents/:id/versions
  - [ ] Restore to version: POST /api/v1/documents/:id/restore/:versionId

- [ ] Implement sharing
  - [ ] Share with user: POST /api/v1/documents/:id/share
  - [ ] Access levels: view, comment, edit
  - [ ] Revoke access: DELETE /api/v1/documents/:id/share/:userId
  - [ ] Return: { shareId, sharedWith, accessLevel }

- [ ] Implement full-text search
  - [ ] Index filename + tags in Postgres
  - [ ] Search API: GET /api/v1/documents/search?q=mockup
  - [ ] Return matching documents

- [ ] Test all endpoints with curl

**Deliverable:** All document API endpoints tested and working.

---

### Owner B: Frontend (Document UI)

**Wednesday–Thursday:**

```
React Components to Build:
├─ components/documents/DocumentLibrary.tsx (main container)
├─ components/documents/FileUpload.tsx (drag-drop zone)
├─ components/documents/FileList.tsx (table/grid view)
├─ components/documents/FileDetails.tsx (sidebar: preview + versions)
├─ components/documents/FileVersions.tsx (version history)
├─ components/documents/FileShare.tsx (sharing modal)
└─ components/documents/FilePreview.tsx (image/PDF preview)
```

**Checklist:**

- [ ] Setup document service
  - [ ] Create `lib/documents.ts`
  - [ ] Implement useDocuments hook
  - [ ] Add error handling

- [ ] Build DocumentLibrary container
  - [ ] Search bar (full-text search)
  - [ ] Filter: Type (design, proposal, contract, etc.)
  - [ ] Filter: Project dropdown
  - [ ] "Upload" button
  - [ ] File list table or grid

- [ ] Build FileUpload component
  - [ ] Drag-drop zone
  - [ ] File picker fallback
  - [ ] Progress bar during upload
  - [ ] Error message if upload fails
  - [ ] Success message + link to file

- [ ] Build FileList component
  - [ ] Table: Filename | Size | Uploaded By | Date
  - [ ] Sorting: Click column header to sort
  - [ ] Selection: Click row to select
  - [ ] Right-click context menu: View, Share, Delete
  - [ ] Pagination: Show 20 per page

- [ ] Build FileDetails sidebar
  - [ ] Show file preview (image, PDF thumbnail)
  - [ ] Show file metadata (size, uploaded by, date)
  - [ ] Show version history (list of versions)
  - [ ] "Download" button
  - [ ] "Share" button (opens modal)
  - [ ] "Delete" button

- [ ] Build FileVersions component
  - [ ] List all versions (v1.0, v1.1, v1.2, etc.)
  - [ ] Show changelog for each version (if user filled it)
  - [ ] "Restore to this version" button
  - [ ] "Compare with current" button (side-by-side diff)

- [ ] Build FileShare modal
  - [ ] Share link generation
  - [ ] Access level selector: view / comment / edit
  - [ ] Expiration date picker
  - [ ] List of people already shared with
  - [ ] Revoke access button per person

- [ ] Build FilePreview component
  - [ ] Image preview (img tag)
  - [ ] PDF preview (pdf.js library)
  - [ ] Video thumbnail (video tag)
  - [ ] Fallback for unsupported types (download link)

- [ ] Test on mobile
  - [ ] Simplified file list (card view instead of table)
  - [ ] Touch-friendly upload button
  - [ ] Mobile-optimized sidebar

**Deliverable:** Document Library UI complete and functional.

---

### Owner B: QA & Deployment

**Friday:**

- [ ] End-to-end testing
  - [ ] Upload file
  - [ ] See it in list
  - [ ] Download it
  - [ ] Upload new version
  - [ ] See version history
  - [ ] Share with teammate
  - [ ] Search for file
- [ ] Performance test
  - [ ] Upload 100MB file
  - [ ] List 1000 files (pagination works)
  - [ ] Search 1000 files (fast)
- [ ] Deploy to production
  - [ ] Feature flag `document_management` enabled for 50% of team
  - [ ] Gradual rollout (increase to 100% if no errors)

**Deliverable:** Document Management live in production. File chaos eliminated.

---

## WEEK 7 (July 15–19) — SLACK INTEGRATION

### Goal

Slack becomes notification hub. Launcher is where work happens.

### Owner C: Backend (Slack API)

**Monday–Tuesday:**

```
Slack Webhooks to Implement:
├─ Receive: message posted → create Launcher task
├─ Receive: reaction added → log reaction in task comment
├─ Receive: app_mention → respond with task status
├─ Send: task assigned → notify in Slack
├─ Send: approval needed → prompt in Slack
└─ Send: project alert → notify in Slack
```

**Checklist:**

- [ ] Slack OAuth (already registered Sprint 0)
  - [ ] Verify OAuth redirect works
  - [ ] Store access token encrypted in Integration table
  - [ ] Test token refresh logic

- [ ] Setup webhook handler
  - [ ] Create `/api/webhooks/slack` endpoint
  - [ ] Verify Slack signature (security)
  - [ ] Handle event types: message, reaction, app_mention
  - [ ] Implement exponential backoff for retries

- [ ] Implement incoming webhooks
  - [ ] Message → Task: Forward Slack message to Launcher as task comment
  - [ ] Reaction → Task: "👍 " on Slack message = task completion
  - [ ] Mention → Response: "@launcher status task-id" → reply with task status
- [ ] Implement outgoing webhooks
  - [ ] Task assigned → Slack notification: "You're assigned: Task Name"
  - [ ] Approval needed → Slack button: "Approve" / "Reject"
  - [ ] Project alert → Slack message: "Q3 Campaign: Design review overdue by 5 days"

- [ ] Slack commands
  - [ ] `/launcher task "Task name"` → Creates task in Launcher
  - [ ] `/launcher status task-id` → Shows task status
  - [ ] `/launcher assign task-id @user` → Assigns task to user

- [ ] Test locally
  - [ ] Use Slack CLI or ngrok to test locally
  - [ ] Test each webhook type
  - [ ] Test error handling (malformed payload, etc.)

**Deliverable:** All Slack integrations working in staging.

---

### Owner C: Frontend (Slack Connection UI)

**Wednesday–Thursday:**

```
React Components to Build:
├─ components/integrations/IntegrationHub.tsx (all integrations)
├─ components/integrations/SlackConnect.tsx (OAuth flow)
├─ components/integrations/IntegrationStatus.tsx (connection health)
└─ components/settings/Notifications.tsx (notification preferences)
```

**Checklist:**

- [ ] Build IntegrationHub
  - [ ] List all integrations (Slack, Gmail, Google Workspace, Stripe)
  - [ ] Status indicator (connected, disconnected, error)
  - [ ] Connect/disconnect buttons
  - [ ] Settings for each integration

- [ ] Build SlackConnect component
  - [ ] "Connect to Slack" button
  - [ ] OAuth flow (redirect to Slack login)
  - [ ] On success: Show "Connected as @username"
  - [ ] On error: Show error message + retry button
  - [ ] Permissions requested (message, reaction, app_mention)

- [ ] Build IntegrationStatus component
  - [ ] Show connection status (✅ Connected, ❌ Disconnected, ⚠️ Error)
  - [ ] Last sync time
  - [ ] Error log (if any)
  - [ ] Retry button

- [ ] Build notification settings
  - [ ] Toggle: "Notify me on Slack when task assigned"
  - [ ] Toggle: "Notify me on Slack when approval needed"
  - [ ] Toggle: "Notify me on Slack for project alerts"
  - [ ] Channel picker: Which Slack channel to notify?

- [ ] Test OAuth flow
  - [ ] Desktop: Full OAuth flow works
  - [ ] Mobile: OAuth flow works (redirect back to app)
  - [ ] Error handling: Show error if OAuth fails

**Deliverable:** Slack Connect UI built and tested.

---

### Owner C: QA & Deployment

**Friday:**

- [ ] End-to-end Slack tests
  - [ ] User connects Launcher to Slack
  - [ ] Create task in Launcher → Slack notification appears
  - [ ] Reply to notification in Slack → Appears as comment in Launcher
  - [ ] Use `/launcher task` command → Task created in Launcher
  - [ ] Receive approval in Slack → Click button → Launcher updated
- [ ] Deploy to production
  - [ ] Feature flag `slack_integration` enabled
  - [ ] Rollout to 50% of team first
  - [ ] Monitor for errors

**Deliverable:** Slack Integration live. Slack = notification hub.

---

## WEEK 8 (July 22–26) — PAYMENT SYNC + CLIENT PORTAL DEPLOY

### Goal

Invoices are self-serve. Payments reconcile automatically. Zero manual bookkeeping.

### Owner D: Backend (Payment Reconciliation)

**Monday–Tuesday:**

```
Stripe/Fawry Webhook Handler:
├─ Listen for: payment_intent.succeeded
├─ Find matching invoice
├─ Mark invoice as paid
├─ Update cash flow
└─ Notify Finance team
```

**Checklist:**

- [ ] Stripe webhook (already setup Sprint 0)
  - [ ] Verify webhook signature
  - [ ] Parse payment_intent event
  - [ ] Extract: amount, currency, payment_id

- [ ] Implement reconciliation logic
  - [ ] Query Invoice table: WHERE status = "pending"
  - [ ] Match payment amount to invoice amount
  - [ ] Match customer email to invoice customer_email
  - [ ] Mark invoice as paid
  - [ ] Update Transaction ledger
  - [ ] Update cash flow forecast

- [ ] Handle edge cases
  - [ ] Partial payment: Set status to "partially paid"
  - [ ] Overpayment: Create credit note
  - [ ] Payment mismatch: Alert Finance team

- [ ] Daily reconciliation job
  - [ ] Run every day at 9 AM Cairo time
  - [ ] Check if any "pending" invoices have payments in Stripe/Fawry
  - [ ] Mark as paid if found
  - [ ] Generate daily reconciliation report

- [ ] Test with test credentials
  - [ ] Stripe: Use test_payment_intent (doesn't actually charge)
  - [ ] Fawry: Use test environment

**Deliverable:** Payment reconciliation working. Invoices auto-marked as paid.

---

### Owner D: Frontend (Client Portal Deploy)

**Wednesday–Thursday:**

Assuming client portal already exists from Phase 1, we just deploy + polish:

- [ ] Review existing client portal code
  - [ ] Responsive design
  - [ ] Mobile optimized
  - [ ] Accessibility (WCAG 2.1 AA)

- [ ] Polish UI
  - [ ] Apply brand colors (dark blue sidebar)
  - [ ] Consistent typography
  - [ ] Consistent spacing
  - [ ] Dark mode support

- [ ] Features to verify
  - [ ] Client login (email + password)
  - [ ] View invoices
  - [ ] Pay invoice (Stripe/Fawry integration)
  - [ ] View project status (optional)
  - [ ] Download invoice PDF

- [ ] Test on production
  - [ ] Create test invoice
  - [ ] Test payment flow
  - [ ] Verify invoice marked as paid after payment
  - [ ] Verify Launcher updates in real-time

- [ ] Deploy to production
  - [ ] Domain configured (clients.mediabubble.co or similar)
  - [ ] SSL certificate installed
  - [ ] DNS configured
  - [ ] Test client login + payment

**Deliverable:** Client Portal live. Clients can pay self-serve.

---

### Owner D: QA & Deployment

**Friday:**

- [ ] End-to-end payment flow
  - [ ] Admin creates invoice
  - [ ] Client receives email with portal link
  - [ ] Client logs in
  - [ ] Client clicks "Pay Now"
  - [ ] Client enters card details
  - [ ] Payment processed
  - [ ] Invoice marked as paid in Launcher
  - [ ] Admin sees payment in dashboard
  - [ ] Client sees "Paid" status
- [ ] Deploy to production
  - [ ] Enable client portal for all projects
  - [ ] Enable payment reconciliation
  - [ ] Monitor for errors

**Deliverable:** End-to-end payment automation live. Finance headache eliminated.

---

## WEEKS 9–12 (PARALLEL TRACKS)

### Track A: Existing Phase 2 Features (Finance, Time, CRM, Communication)

Continue as per original LAUNCHER_PLAN_V2.md. No changes to plan.

### Track B: Resource Planning (Weeks 9–12)

**Week 9–10:** Build capacity planner + allocation matrix  
**Week 11–12:** Build bottleneck detection + forecasting

### Track C: Google Workspace Integration (Weeks 9–12)

**Week 9:** Google Drive sync  
**Week 10:** Google Docs embedding  
**Week 11:** Google Sheets link (budgets)  
**Week 12:** Google Calendar (two-way)

---

## DEPLOYMENT PLAYBOOK

### Feature Flag Strategy

```
Phase 1: Dark Deploy (0% users)
├─ Code deployed but flag disabled
├─ Only accessible to developers
└─ Duration: 1 day

Phase 2: Staged Rollout (10% users)
├─ Enable for 10% of team (core team)
├─ Monitor errors, performance
├─ Duration: 1–2 days

Phase 3: Expand (50% users)
├─ Enable for 50% of team
├─ Gather feedback from mixed cohort
├─ Duration: 1–2 days

Phase 4: Full Rollout (100% users)
├─ Enable for everyone
├─ Monitor metrics closely
└─ Duration: Ongoing
```

### Monitoring Checklist

- [ ] Error rate <0.5% (Sentry)
- [ ] P95 page load <2s (Lighthouse)
- [ ] Uptime >99.5% (UptimeRobot)
- [ ] DAU increasing (Analytics)
- [ ] User feedback positive (Slack #feedback)
- [ ] No data loss incidents (CloudWatch)

### Rollback Procedure

```
IF error_rate > 5% OR p95_latency > 5s:
  1. Disable feature flag immediately
  2. Page oncall engineer
  3. Investigate error in Sentry
  4. Fix + test in staging
  5. Re-enable with 10% rollout
```

---

## TEAM STRUCTURE

### Week 5 (Analytics)

- **Owner A (Analytics):** 1 engineer (full-time)
- **Support:** 1 designer (UI/UX), 1 QA

### Week 6 (Documents)

- **Owner B (Documents):** 1 engineer (full-time)
- **Support:** 1 designer (UI/UX), 1 QA

### Week 7 (Slack)

- **Owner C (Slack):** 1 engineer (full-time)
- **Support:** 1 designer (UI/UX), 1 QA

### Week 8 (Payments)

- **Owner D (Payments):** 1 engineer (full-time)
- **Support:** 1 designer (UI/UX), 1 QA

### Weeks 9–12

- **Track A (Finance/Time/CRM):** 2 engineers
- **Track B (Resource Planning):** 2 engineers
- **Track C (Google Workspace):** 1 engineer

**Total:** 6–8 engineers, 2 designers, 2 QA

---

## DAILY STANDUP TEMPLATE

**When:** 10 AM Cairo time (Monday–Friday)  
**Duration:** 15 minutes  
**Format:**

```
Owner A:
- Yesterday: [What shipped / what got done]
- Today: [What ships today]
- Blockers: [Any blockers? Need help?]

Owner B:
- Yesterday: [...]
- Today: [...]
- Blockers: [...]

[Repeat for all owners]

Dorgham (Product):
- Watch list: [Any things to keep eye on?]
- Risks: [Any risks surfaced?]
- Action items: [Any decisions needed?]
```

---

## SUCCESS METRICS (Phase 2A Complete)

### Week 5 (Analytics)

- [ ] DAU increase: 60% → 65%
- [ ] Page load <2s
- [ ] All KPI cards populated
- [ ] Filters working
- [ ] Mobile responsive
- [ ] Error rate <0.5%

### Week 6 (Documents)

- [ ] File uploads working (100 files tested)
- [ ] Versioning working (3+ versions tested)
- [ ] Search fast (results in <1s)
- [ ] Sharing working (tested with 3 users)
- [ ] Mobile UX tested

### Week 7 (Slack)

- [ ] Slack notification working (task assigned → notification)
- [ ] Slack comment working (message in Slack → appears in Launcher)
- [ ] Slash command working (`/launcher task`)
- [ ] Approvals working (click button in Slack → Launcher updated)

### Week 8 (Payments)

- [ ] Invoice created → payment processed → marked as paid (automated)
- [ ] Client portal live + accessible
- [ ] Payment reconciliation <1 min (from payment to marked paid)
- [ ] Zero manual bookkeeping

### Overall (Phase 2A)

- [ ] DAU: 60% → 75% (+25%)
- [ ] Time logged: 60 hours/week → 120 hours/week (+100%)
- [ ] Team feedback: NPS >50
- [ ] No critical bugs (error rate <0.5%)
- [ ] Asana ready to kill (all task work in Launcher)

---

## RISK MITIGATION

| Risk                                    | Impact                 | Likelihood | Mitigation                                                   |
| --------------------------------------- | ---------------------- | ---------- | ------------------------------------------------------------ |
| Slack OAuth registration delayed        | Week 7 slip            | Medium     | Register app in Sprint 0, don't wait for Week 7              |
| S3 upload fails at scale (>500MB)       | Documents don't upload | Medium     | Test with 100MB + 1GB files in Sprint 0                      |
| Analytics queries slow (large datasets) | Dashboard >2s load     | Medium     | Add indexes on frequently queried columns; test with 1M rows |
| Payment webhook misses payments         | Revenue not recorded   | Low        | Implement daily reconciliation job as fallback               |
| Slack integration breaks existing flow  | User confusion         | Low        | Feature flag + gradual rollout; document changes             |
| Feature flag system not working         | Can't control rollout  | Low        | Test feature flag locally in Sprint 0                        |

---

## COMMUNICATION PLAN

### Weekly All-Hands (Friday, 4 PM Cairo)

- **Duration:** 30 minutes
- **Attendees:** All team + leadership
- **Agenda:**
  - 5 min: Sprint recap (what shipped)
  - 5 min: Metrics (DAU, error rate, NPS)
  - 5 min: Wins + learnings
  - 5 min: Challenges + next week
  - 10 min: Q&A

### Weekly Leadership Briefing (Friday, 3 PM Cairo)

- **Attendees:** Dorgham, engineering lead, product lead
- **Agenda:**
  - Risk assessment
  - Budget/timeline status
  - Escalations needed
  - Plan adjustments

### Daily Slack Updates

- **Channel:** #launcher-phase2a
- **Format:** Each owner posts brief update (5 min read)
- **Frequency:** EOD (5 PM Cairo)

---

## FINAL CHECKLIST (Before Each Deployment)

- [ ] All tests passing (unit + integration)
- [ ] Staging deploy successful
- [ ] Smoke test checklist completed
- [ ] Feature flag ready to toggle
- [ ] Monitoring alerts configured
- [ ] Rollback procedure tested
- [ ] Database migration tested + rollback tested
- [ ] Team notified of changes
- [ ] On-call engineer available for 48 hours post-deploy
- [ ] Customer success team briefed (for impact on workflows)

---

**Document Version:** 1.0  
**Status:** Ready for Execution  
**Next Update:** Monday, June 24, 2026 (Post-Kickoff)
