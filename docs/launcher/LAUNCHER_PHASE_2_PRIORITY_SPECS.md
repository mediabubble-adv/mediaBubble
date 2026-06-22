# Launcher Phase 2 — Priority Specs & Architecture

**Prepared for:** Dorgham & Engineering Team  
**Date:** June 21, 2026  
**Focus:** Most Important Features First + Pro Web Software Design

---

## EXECUTIVE PRIORITY RANKING

### 🔴 CRITICAL (Must ship Phase 2)

1. **Analytics Dashboard** — Business intelligence (1 week)
2. **Resource Planning** — Capacity visibility (2 weeks)
3. **Document Management** — File centralization (1 week)
4. **Enhanced Integrations** — Slack, Email, Google, Payments (3 weeks)

### 🟡 HIGH (Phase 2, but lower priority)

5. Client Portal (upgrade + deploy)
6. Budget & Expense Approvals (Finance enhancement)

### 🟢 NICE-TO-HAVE (Phase 3)

- Workflow Automation Visual Editor
- Performance Reviews
- Asset Library
- L&D System

---

## PART 1: ARCHITECTURE DESIGN (System Overview)

### Data Model Extensions

```
Existing (Phase 1):
├─ User
├─ Task
├─ TimeEntry
├─ Transaction (Finance)
├─ Client
├─ Invoice
├─ Campaign
└─ ChatMessage

New (Phase 2):
├─ Project (parent for tasks)
├─ Sprint (time-boxed project work)
├─ Resource (person-to-project allocation)
├─ ResourceCapacity (hours/week per person)
├─ Department (Finance, Design, Dev, etc.)
├─ Document (files with versioning)
├─ Budget (department budgets)
├─ Expense (expense reports + approvals)
├─ Analytics (computed metrics cache)
└─ Integration (connected accounts: Slack, Gmail, etc.)
```

### API Architecture (RESTful)

```
/api/v1/
├─ /analytics
│  ├─ GET /dashboard (KPIs, trends)
│  ├─ GET /revenue (pipeline, won/lost)
│  ├─ GET /project-health (velocity, on-time %)
│  └─ GET /team-metrics (utilization, output)
│
├─ /resources
│  ├─ GET /capacity (team capacity view)
│  ├─ POST /allocate (assign person to project)
│  ├─ GET /utilization (person utilization %)
│  ├─ GET /bottlenecks (blockers, dependencies)
│  └─ GET /forecasting (if we hire 2 people, what's new capacity?)
│
├─ /documents
│  ├─ POST /upload (file upload to S3)
│  ├─ GET /list (files by project/tag)
│  ├─ GET /:id/versions (file version history)
│  ├─ POST /:id/version (new version)
│  └─ POST /:id/share (sharing + access control)
│
├─ /integrations
│  ├─ POST /slack/connect (OAuth)
│  ├─ POST /gmail/connect (OAuth)
│  ├─ POST /stripe/sync (payments)
│  └─ GET /status (integration health)
│
└─ [Existing endpoints continue]
```

### Frontend Architecture (React Components)

```
components/
├─ dashboard/
│  ├─ AnalyticsDashboard.tsx (KPI grid + charts)
│  ├─ BusinessMetrics.tsx (revenue, pipeline, churn)
│  ├─ ProjectHealth.tsx (velocity, on-time %)
│  ├─ TeamUtilization.tsx (heatmap, capacity)
│  └─ MetricCard.tsx (reusable metric component)
│
├─ resources/
│  ├─ CapacityPlanner.tsx (main view)
│  ├─ AllocationTable.tsx (person → project hours)
│  ├─ UtilizationChart.tsx (per-person bar chart)
│  ├─ BottleneckDashboard.tsx (blockers list)
│  └─ ForecastScenario.tsx (what-if simulator)
│
├─ documents/
│  ├─ DocumentLibrary.tsx (file browser)
│  ├─ FileUpload.tsx (drag-drop)
│  ├─ FileVersions.tsx (version history)
│  ├─ FilePreview.tsx (inline preview)
│  └─ DocumentShare.tsx (access control)
│
├─ integrations/
│  ├─ IntegrationHub.tsx (all connected services)
│  ├─ SlackConnect.tsx (OAuth flow)
│  ├─ GmailConnect.tsx (OAuth flow)
│  ├─ PaymentSync.tsx (auto-reconcile UI)
│  └─ IntegrationStatus.tsx (health checks)
│
├─ ui/
│  ├─ Chart.tsx (recharts wrapper)
│  ├─ Heatmap.tsx (utilization matrix)
│  ├─ DataTable.tsx (sortable, filterable)
│  └─ Skeleton.tsx (loading state)
│
└─ layout/
   ├─ DashboardLayout.tsx (grid container)
   └─ ModuleHeader.tsx (title + filters)
```

### Database Schema (Prisma)

```prisma
model Project {
  id                String      @id @default(cuid())
  name              String
  description       String?
  startDate         DateTime
  endDate           DateTime
  status            String      @default("planning")  // planning, active, done, paused
  budget            Float?
  budgetUsed        Float       @default(0)
  department        Department  @relation(fields: [departmentId], references: [id])
  departmentId      String
  tasks             Task[]
  resources         Resource[]
  documents         Document[]
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

model Resource {
  id                String      @id @default(cuid())
  user              User        @relation(fields: [userId], references: [id])
  userId            String
  project           Project     @relation(fields: [projectId], references: [id])
  projectId         String
  allocatedHours    Float       // hours per week
  actualHours       Float       @default(0)  // sum of time entries
  role              String?     // "Designer", "Developer", "Manager"
  startDate         DateTime
  endDate           DateTime?
  status            String      @default("active")  // active, paused, completed
  createdAt         DateTime    @default(now())

  @@unique([userId, projectId])
}

model Document {
  id                String      @id @default(cuid())
  name              String
  description       String?
  fileUrl           String      // S3 URL
  fileSize          Int
  mimeType          String
  project           Project?    @relation(fields: [projectId], references: [id])
  projectId         String?
  task              Task?       @relation(fields: [taskId], references: [id])
  taskId            String?
  uploadedBy        User        @relation(fields: [uploadedById], references: [id])
  uploadedById      String
  versions          DocumentVersion[]
  sharedWith        DocumentShare[]
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

model DocumentVersion {
  id                String      @id @default(cuid())
  document          Document    @relation(fields: [documentId], references: [id], onDelete: Cascade)
  documentId        String
  version           Int         // 1, 2, 3...
  fileUrl           String      // S3 URL of this version
  fileSize          Int
  changes           String?     // What changed in this version
  uploadedBy        User        @relation(fields: [uploadedById], references: [id])
  uploadedById      String
  createdAt         DateTime    @default(now())
}

model DocumentShare {
  id                String      @id @default(cuid())
  document          Document    @relation(fields: [documentId], references: [id], onDelete: Cascade)
  documentId        String
  sharedWith        User        @relation(fields: [sharedWithId], references: [id])
  sharedWithId      String
  accessLevel       String      @default("view")  // view, comment, edit
  sharedBy          User        @relation("DocumentShareCreator", fields: [sharedById], references: [id])
  sharedById        String
  createdAt         DateTime    @default(now())

  @@unique([documentId, sharedWithId])
}

model ResourceCapacity {
  id                String      @id @default(cuid())
  user              User        @relation(fields: [userId], references: [id])
  userId            String
  totalHoursPerWeek Float       @default(40)
  allocatedHours    Float       @default(0)
  availableHours    Float       // totalHours - allocatedHours
  updatedAt         DateTime    @updatedAt

  @@unique([userId])
}

model Budget {
  id                String      @id @default(cuid())
  department        Department  @relation(fields: [departmentId], references: [id])
  departmentId      String
  period            String      @default("monthly")  // monthly, quarterly, annual
  amount            Float
  spent             Float       @default(0)
  remaining         Float       // amount - spent
  startDate         DateTime
  endDate           DateTime
  createdBy         User        @relation(fields: [createdById], references: [id])
  createdById       String
  createdAt         DateTime    @default(now())
}

model Expense {
  id                String      @id @default(cuid())
  submittedBy       User        @relation("ExpenseSubmitter", fields: [submittedById], references: [id])
  submittedById     String
  amount            Float
  category          String
  description       String
  receiptUrl        String?     // S3 URL
  status            String      @default("pending")  // pending, approved, rejected, reimbursed
  approvedBy        User?       @relation("ExpenseApprover", fields: [approvedById], references: [id])
  approvedById      String?
  submittedAt       DateTime    @default(now())
  approvedAt        DateTime?
  reimbursedAt      DateTime?
}

model Integration {
  id                String      @id @default(cuid())
  type              String      // "slack", "gmail", "stripe", "google_calendar"
  user              User        @relation(fields: [userId], references: [id])
  userId            String
  accessToken       String      // encrypted
  refreshToken      String?     // encrypted
  expiresAt         DateTime?
  status            String      @default("connected")
  lastSyncAt        DateTime?
  syncErrors        Int         @default(0)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  @@unique([type, userId])
}

model AnalyticsCache {
  id                String      @id @default(cuid())
  metric            String      // "revenue_trend", "project_velocity", etc.
  period            String      // "today", "week", "month", "quarter"
  value             Float?
  data              Json?       // For complex metrics (arrays, objects)
  lastUpdated       DateTime    @updatedAt

  @@unique([metric, period])
}
```

### Caching & Real-time Strategy

```
Analytics Dashboard:
├─ Cache: AnalyticsCache table (Redis TTL: 30 min)
├─ Real-time: WebSocket for live KPI updates
├─ Refresh: Every 5 min (background job)
└─ Fallback: Serve from cache if compute fails

Resource Planning:
├─ Cache: Hourly refresh (utilization doesn't change minute-to-minute)
├─ Real-time: On allocation changes
├─ Compute: Aggregate time_entries by person + sum allocated hours
└─ Bottleneck detection: Query dependencies graph

Document Management:
├─ Files: S3 (immutable, versioned)
├─ Metadata: Postgres (fast queries)
├─ Search: Full-text index (Postgres gin)
├─ Preview: Cache thumbnails for PDFs/images

Integrations:
├─ Slack: Webhook (receive) + scheduled fetch (send)
├─ Gmail: Scheduled sync (hourly)
├─ Stripe: Webhook (real-time) + daily reconciliation
├─ Google Calendar: Sync on task/event change
```

---

## PART 2: PRODUCT REQUIREMENTS DOCUMENT (PRD)

### Feature 1: Analytics Dashboard

**Goal:** Leadership gets business health at a glance. Data-driven decisions instead of gut feel.

**User Story:**

```
As a CEO/Finance Lead
I want to see KPIs (revenue, pipeline, project health, team utilization) in one place
So that I can make decisions without asking for reports
```

**Key Metrics:**

- **Revenue Section**
  - Total Revenue (YTD, MTD, WTD)
  - Revenue Trend (7-day, 30-day, 90-day)
  - Invoices Paid vs. Outstanding
  - Cash Flow Forecast (30/60/90 day)

- **Pipeline Section**
  - Opportunities by Stage (lead → proposal → won)
  - Pipeline Value (weighted by probability)
  - Win Rate (this quarter vs. last quarter)
  - Average Deal Size

- **Project Health**
  - On-Time Delivery % (target: >80%)
  - Project Status (on-track, at-risk, delayed)
  - Active Projects (count by department)
  - Velocity (tasks completed this week)

- **Team Utilization**
  - Utilization % by Department (Design, Dev, etc.)
  - Billable vs. Non-billable Hours
  - Team Capacity (total vs. allocated)
  - Top Performers (by output, by XP)

**UI Layout:**

```
┌─ Analytics Dashboard ──────────────────────────┐
│                                               │
│ [Date Range Filter] [Refresh] [Export]        │
│                                               │
│ ┌─────────────────┬──────────────┬──────────┐ │
│ │ Revenue YTD     │ Pipeline Val │ Churn %  │ │
│ │ $45,234         │ $120,000     │ 2.3%     │ │
│ └─────────────────┴──────────────┴──────────┘ │
│                                               │
│ ┌─────────────────────────────────────────────┐
│ │ Revenue Trend (Last 30 days)               │
│ │ [Area Chart showing daily revenue]         │
│ │ ▲ +12% vs. last month                      │
│ └─────────────────────────────────────────────┘
│                                               │
│ ┌──────────────────┬──────────────────────────┐
│ │ Project Health   │ Team Utilization        │
│ │ On-Time: 85%     │ Design: 92%             │
│ │ At-Risk: 2       │ Dev: 78%                │
│ │ Delayed: 1       │ Marketing: 65%          │
│ └──────────────────┴──────────────────────────┘
│                                               │
│ ┌─────────────────────────────────────────────┐
│ │ Top Blockers (If any)                       │
│ │ • Design approval on Q3 Campaign (5 days)   │
│ │ • API spec for mobile app (3 days)          │
│ │ • Client feedback on proposal (2 days)      │
│ └─────────────────────────────────────────────┘
│                                               │
└───────────────────────────────────────────────┘
```

**Acceptance Criteria:**

- [ ] Dashboard loads in <2s
- [ ] All metrics update real-time (WebSocket)
- [ ] Filters work (by date, by department, by project)
- [ ] Export to PDF/CSV
- [ ] Mobile responsive (stacks on phone)
- [ ] Alerts for: revenue drop >10%, overdue projects, team at >90% capacity

---

### Feature 2: Resource Planning

**Goal:** Project managers see team capacity. Can allocate without double-booking. Forecasting works.

**User Story:**

```
As a Project Manager
I want to see who's available for the next 2 weeks
And allocate them to projects without conflicts
So that I can staff projects accurately
```

**Core Views:**

1. **Capacity Overview**
   - Team member list
   - Total hours/week (40 for FT employee)
   - Allocated hours (sum of all project allocations)
   - Available hours (total - allocated)
   - Utilization % (allocated / total)
   - Color coding: <50% (red: underutilized), 50-80% (yellow: good), >80% (green: at capacity), >100% (red: overallocated)

2. **Allocation Matrix**
   - Rows: Team members
   - Columns: Projects
   - Cells: Allocated hours/week
   - Drag-to-allocate (assign hours)
   - Click to edit
   - Date range picker (weeks out)

3. **Bottleneck Detection**
   - Identify tasks blocking other tasks
   - Show: "Task B blocked by Task A (5 days overdue)"
   - Suggest: reassign Task A to top performer or add resource

4. **Forecasting**
   - "If we take on 3 new projects (18 hours/week total), who has capacity?"
   - Scenario planning (hire X more people → new capacity)
   - "On current capacity, when can we deliver?"

**UI Layout:**

```
┌─ Resource Planning ────────────────────────────────────┐
│                                                       │
│ [Week Picker] [Team Filter] [View: Matrix/Timeline]  │
│                                                       │
│ ┌─── Capacity Summary ──────────────────────────────┐ │
│ │ Team Utilization (This Week)                     │ │
│ │ Design: ████████░ 80%  | Available: 8h           │ │
│ │ Dev:    ███░░░░░░ 30%  | Available: 28h          │ │
│ │ Ops:    ████████░ 85%  | Available: 6h           │ │
│ └────────────────────────────────────────────────────┘ │
│                                                       │
│ ┌─── Allocation Matrix ─────────────────────────────┐ │
│ │           │ Q3 Website │ Campaign │ API         │ │
│ │ Alice     │     20h    │   15h    │   5h    82% │ │
│ │ Bob       │     10h    │   -      │  30h   100% │ │
│ │ Carol     │     5h     │   10h    │   -     15% │ │
│ └────────────────────────────────────────────────────┘ │
│                                                       │
│ [+ Allocate Capacity]  [? Forecast Scenario]        │
│                                                       │
│ ┌─── Bottlenecks ───────────────────────────────────┐ │
│ │ • Design Approval (Q3 Campaign) — 5 days overdue │ │
│ │   Suggested: Add Carol (15h available)           │ │
│ │                                                   │ │
│ │ • API Spec (Mobile App) — 3 days overdue        │ │
│ │   Suggested: Hire contractor (time-critical)    │ │
│ └────────────────────────────────────────────────────┘ │
│                                                       │
└─────────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**

- [ ] Real-time capacity view (updates as time entries logged)
- [ ] Allocate via drag-drop or modal
- [ ] Prevent over-allocation (warn if >100%)
- [ ] Show bottleneck risk (if task delayed, show cascading impact)
- [ ] Forecast tool: "If I hire 2 more people, can I take on X new projects?"
- [ ] Mobile: Simplified view (swipeable project cards)

---

### Feature 3: Document Management

**Goal:** All project files in one place. No more Google Drive chaos. Versioning works.

**User Story:**

```
As a Designer
I want to upload design files and see version history
So that I can track what changed and revert if needed
```

**Core Features:**

1. **File Upload**
   - Drag-drop or file picker
   - Link to project/task
   - Auto-tag by file type (design, proposal, contract, etc.)

2. **File Library**
   - Browse by project, folder, type
   - Search (full-text)
   - Sort by: date, name, size
   - Filter: type, project, owner

3. **Version Control**
   - Auto-save versions (upload new file with same name = new version)
   - Version history sidebar (1.0, 1.1, 1.2, etc.)
   - Compare versions (side-by-side diff)
   - Restore to any version

4. **Sharing & Access**
   - Share with link (public, internal only, specific people)
   - Access levels: view, comment, edit
   - Share with task comments (mention: @file.pdf)
   - Expiration dates (link expires after 30 days)

5. **Integrations**
   - Direct upload from Google Drive
   - Embed docs in task descriptions
   - Email files (attach from Launcher)

**UI Layout:**

```
┌─ Document Library ────────────────────────┐
│                                          │
│ [Search] [Folder] [Type Filter]         │
│ [+ Upload] [Create Folder]              │
│                                          │
│ ┌──────────────────────────────────────┐│
│ │ Filename          | Size | Date     ││
│ │ ─────────────────────────────────────││
│ │ Homepage Mockup   | 12MB | Jun 20  ││
│ │   └─ v1.2 (current)  | 12MB | Jun 20 ││
│ │   └─ v1.1           | 11MB | Jun 19 ││
│ │   └─ v1.0           | 10MB | Jun 18 ││
│ │                                     ││
│ │ Brand Guide.pdf   | 5MB  | Jun 15 ││
│ │ Proposal Q3.docx  | 2MB  | Jun 20 ││
│ └──────────────────────────────────────┘│
│                                          │
│ [Selected: Homepage Mockup]             │
│ ┌──────────────────────────────────────┐│
│ │ Preview                              ││
│ │ [Thumbnail of mockup]                ││
│ │                                      ││
│ │ Versions                             ││
│ │ v1.2 (current) — Jun 20              ││
│ │ v1.1 — Jun 19 — Reduced shadows      ││
│ │ v1.0 — Jun 18                        ││
│ │                                      ││
│ │ Shared With                          ││
│ │ • Alice (view)                       ││
│ │ • Bob (edit)                         ││
│ │                                      ││
│ │ [Share Link] [Edit] [Delete]         ││
│ └──────────────────────────────────────┘│
│                                          │
└──────────────────────────────────────────┘
```

**Acceptance Criteria:**

- [ ] Upload works (drag-drop, file picker)
- [ ] Version history works (auto-create on new upload)
- [ ] Search works (full-text on filename + tags)
- [ ] Sharing works (with access levels)
- [ ] Preview works (images, PDFs, video thumbnails)
- [ ] S3 integration works (files stored, not Launcher DB)
- [ ] Quota: 500MB per project

---

### Feature 4: Enhanced Integrations

**Goal:** Team stays in Launcher. External tools feed data in, don't pull users out.

**Integrations to Build:**

1. **Slack (Bidirectional)**
   - Launcher → Slack: Task assignments, approvals needed, project alerts
   - Slack → Launcher: Reply to Slack message → appears as task comment
   - Approvals: Approve invoice from Slack → updates in Launcher
   - Notifications: "Task assigned to you" in Slack

2. **Email (Gmail)**
   - Forward email to Launcher → creates task with email thread
   - Email digests (daily summary)
   - Task updates → email notification

3. **Google Workspace**
   - Google Drive: Link docs from Drive directly in Launcher
   - Google Docs: Embed collaborative documents
   - Google Sheets: Budget sheet linked to Finance module
   - Google Meet: Schedule meetings from task → auto-add to calendar

4. **Payment Sync (Stripe/Fawry)**
   - Webhook: Payment received → auto-mark invoice as paid
   - Daily reconciliation: Match payments to invoices
   - No manual bookkeeping

**Acceptance Criteria:**

- [ ] Slack messages appear in Launcher (read-only)
- [ ] Launcher tasks appear in Slack
- [ ] Approvals work from Slack
- [ ] Email → Launcher task creation works
- [ ] Payment sync is automatic
- [ ] No data loss on connection drop (retry logic)

---

## PART 3: IMPLEMENTATION PLAN

### Phase 2A: Weeks 5–8 (Quick Wins + Ecosystem)

#### Week 5: Analytics Dashboard

**Goal:** Leadership can see business health at a glance.

**Monday–Tuesday:**

- [ ] Design analytics DB schema (AnalyticsCache)
- [ ] Build analytics API endpoints
  - [ ] GET /analytics/dashboard
  - [ ] GET /analytics/revenue
  - [ ] GET /analytics/project-health
  - [ ] GET /analytics/team-metrics
- [ ] Setup caching (Redis, 30-min TTL)
- [ ] Setup background job (update analytics every 5 min)

**Wednesday–Thursday:**

- [ ] Build frontend: Dashboard container + KPI cards
- [ ] Build charts: Revenue trend (area chart), Pipeline (funnel), Utilization (heatmap)
- [ ] Add filters: Date range, department, project
- [ ] Add WebSocket for real-time updates

**Friday:**

- [ ] Deploy to Vercel
- [ ] Test on production data
- [ ] Alert: Revenue drop >10%, overdue projects, capacity >90%
- [ ] Celebrate: Leadership gets first business dashboard 🎉

**Deliverable:** CEO opens Launcher → sees business health in <2s

---

#### Week 6: Document Management

**Goal:** No more Google Drive chaos. Versioning works.

**Monday–Tuesday:**

- [ ] Design document schema (Document, DocumentVersion, DocumentShare)
- [ ] Setup S3 integration (file upload, storage, retrieval)
- [ ] Build upload API
  - [ ] POST /documents/upload (single file)
  - [ ] POST /documents/upload-multiple (batch)
- [ ] Auto-create version on new upload

**Wednesday–Thursday:**

- [ ] Build frontend: File browser, upload zone, version history
- [ ] Build file preview (images, PDFs, video thumbnails)
- [ ] Build version compare (side-by-side diff)
- [ ] Build sharing UI (access levels, expiration)

**Friday:**

- [ ] Deploy to production
- [ ] Test file upload, versioning, sharing
- [ ] Default quota: 500MB per project
- [ ] Celebrate: Design team uploads first file 🎉

**Deliverable:** Upload file → see versions → share with team

---

#### Week 7: Slack Integration (Enhanced)

**Goal:** Slack becomes notification hub. Launcher is where work happens.

**Monday–Tuesday:**

- [ ] Register Slack app (OAuth)
- [ ] Build Slack webhooks (receive events)
- [ ] Setup Slack → Launcher sync (messages, reactions)

**Wednesday–Thursday:**

- [ ] Build Launcher → Slack sync (task assignments, approvals)
- [ ] Slack commands: `/launcher task "Task name"`
- [ ] Slack approvals: "Approve invoice" button in Slack → updates Launcher

**Friday:**

- [ ] Deploy
- [ ] Test: Task assignment → Slack notification
- [ ] Test: Slack message → Launcher comment
- [ ] Celebrate: Team gets Slack as notification hub 🎉

**Deliverable:** Task assigned in Launcher → Slack ping → Comment in Slack → Launcher sees it

---

#### Week 8: Payment Sync + Client Portal Deploy

**Goal:** Invoices are self-serve. Zero manual bookkeeping.

**Monday–Tuesday:**

- [ ] Setup Stripe webhook (or Fawry webhook)
- [ ] Build reconciliation logic (match payment to invoice)
- [ ] Auto-mark invoice as paid on successful payment

**Wednesday–Thursday:**

- [ ] Polish client portal (existing code)
- [ ] Deploy client portal to production
- [ ] Test: Client logs in → sees invoices → pays → Launcher updates

**Friday:**

- [ ] Deploy payment sync
- [ ] Test end-to-end: invoice created → client portal → payment → reconciled in Launcher
- [ ] Celebrate: Cash flow is real-time 🎉

**Deliverable:** Client pays invoice → Launcher auto-reconciles → Finance dashboard updates

---

#### Week 9–12: Parallel Tracks

**Track A: Existing Phase 2 (Finance, Time, CRM, Communication)**

- Continue as planned

**Track B: Resource Planning (Weeks 9–12)**

- Week 9–10: Build capacity planner, allocation matrix, utilization charts
- Week 11–12: Build bottleneck detection, forecasting scenarios

**Track C: Google Workspace Integration (Weeks 9–12)**

- Week 9: Google Drive sync
- Week 10: Google Docs embedding
- Week 11: Google Sheets link (budgets)
- Week 12: Google Calendar (two-way)

---

## PART 4: UI DESIGN PRINCIPLES (Pro Web Software)

### Typography

- **Headlines:** 24px, 600 weight (Segoe UI / Inter)
- **Subheadings:** 16px, 600 weight
- **Body:** 14px, 400 weight
- **Small text:** 12px, 400 weight
- **Data:** 13px monospace (numbers in tables)

### Color Scheme (Dark mode)

- **Background:** #0D0F12 (canvas)
- **Cards:** #121418 (surface)
- **Borders:** #1F2128 (subtle divider)
- **Accent:** #5B00FF (brand purple)
- **Success:** #6BCF7F (green)
- **Warning:** #FFD93D (yellow)
- **Error:** #FF6B6B (red)
- **Text:** #E8E8E8 (primary), #9B9B9B (secondary)

### Component Specs

**Button (Primary)**

```
Background: #5B00FF
Text: #FFFFFF, 600 weight
Padding: 12px 24px
Border radius: 6px
Hover: #6B10FF (10% lighter)
Active: scale(0.98), 200ms transition
States: default, loading (spinner), disabled (50% opacity)
```

**Input Field**

```
Background: #2A2D35
Border: 1px #1F2128
Border radius: 6px
Padding: 12px
Font: 14px, regular
Focus: border #5B00FF, background #2A2D35
Placeholder: #9B9B9B
Error: border #FF6B6B, error text #FF6B6B
```

**Data Table**

```
Header background: #1F2128
Striped rows: alternate #121418 and #0D0F12
Hover row: background #1F2128
Sorting: header text #5B00FF + ↑↓ icon
Pagination: 20 rows/page, "Show more" at bottom
```

**Charts**

```
Background: transparent
Axis: #9B9B9B, 12px
Grid lines: #1F2128 (light)
Tooltip: #2A2D35 background, white text
Colors: #5B00FF (primary), #6BCF7F (success), #FFD93D (warning)
```

### Responsive Design

```
Mobile (<768px):
├─ Single column layout
├─ Cards stack vertically
├─ Sidebar collapses to bottom nav (5 icons)
├─ Tables become card view (one row = one card)
└─ Charts stack (no side-by-side)

Tablet (768px–1200px):
├─ Two column layout
├─ Sidebar still visible (120px)
├─ Charts: 2 per row
└─ Tables: full width with scroll

Desktop (>1200px):
├─ Full layout
├─ 240px sidebar
├─ Charts: grid layout (2–4 per row)
└─ Tables: full width, no scroll
```

### Accessibility (WCAG 2.1 AA)

- [ ] All buttons have aria-labels
- [ ] Form fields linked with labels
- [ ] Color contrast >4.5:1 on text
- [ ] Focus indicators (visible outline)
- [ ] Keyboard navigation (Tab, Arrow keys)
- [ ] Skip to main content link
- [ ] Screen reader tested

---

## PART 5: SUCCESS CRITERIA (Phase 2A Complete)

### Week 5 (Analytics)

- [ ] Dashboard loads in <2s
- [ ] All 4 metric sections populated
- [ ] Real-time updates work (WebSocket)
- [ ] Filters work (date, department)
- [ ] Mobile responsive

### Week 6 (Documents)

- [ ] Upload works (all file types)
- [ ] Versioning works (auto-create v1.0, v1.1)
- [ ] Sharing works (with access levels)
- [ ] Search works (full-text)
- [ ] Mobile: simplified file browser

### Week 7 (Slack)

- [ ] Slack app registered + connected
- [ ] Task assignment → Slack notification
- [ ] Slack message → Launcher comment
- [ ] Slack command `/launcher task` works
- [ ] Approvals work from Slack

### Week 8 (Payment + Portal)

- [ ] Portal deployed + accessible
- [ ] Payment webhook works
- [ ] Auto-reconciliation works
- [ ] Invoice marked paid within 1 minute
- [ ] Dashboard reflects payment immediately

### Overall

- [ ] DAU increase: 60% → 75%
- [ ] Time logged: 60 → 120 hours/week
- [ ] Asana ready to kill (all task work in Launcher)
- [ ] Team feedback: "This is actually useful" (NPS >50)
- [ ] No critical bugs (error rate <0.5%)

---

## NEXT STEPS

### Monday, June 24 (Kickoff)

- [ ] Present Phase 2A plan to team
- [ ] Assign owners (Analytics, Documents, Slack, Payment)
- [ ] Setup sprint board
- [ ] Setup daily standup (10 AM Cairo time)

### Deployment Strategy

- [ ] Feature flags for all new features (launch dark, enable gradually)
- [ ] A/B test analytics dashboard (50% team, 100% leadership first)
- [ ] Gradual rollout: Day 1 (core team) → Day 3 (all team)
- [ ] Monitoring: error rates, page load time, user feedback

### Communication

- [ ] Daily: Standup (what shipped, what's blocked)
- [ ] Weekly: Team Friday video (celebrate wins)
- [ ] Weekly: Usage metrics (DAU, tasks, time logged)

---

**Document Version:** 2.0  
**Status:** Ready for Engineering  
**Owner:** Dorgham + Product Lead  
**Next Review:** Monday, June 24, 2026 (Kickoff meeting)
