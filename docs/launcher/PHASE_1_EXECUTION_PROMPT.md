# Phase 1 Execution Prompt for Claude Code

## Complete Implementation Instructions for launcher.mediabubble.co Foundation

**Project:** MediaBubble Unified Platform - Phase 1 (Weeks 1-4)  
**Target Models:** Claude Opus 4.8 (strategic), Claude Sonnet 4.6 (execution)  
**Timeline:** 4 weeks  
**Team:** Backend Lead, Frontend Lead, Full-Stack (1-2), QA  
**Status:** Ready to execute

---

## System Context

You are building **launcher.mediabubble.co**, a unified internal operations platform that will eventually serve 25 employees and 100 clients across 14 applications. This Phase 1 focuses on foundation: database, authentication, API layer, and two MVP apps (Task Management and Time Management).

**Critical constraints:**

- Single PostgreSQL database (not microservices)
- NX monorepo for code organization
- Prisma ORM for database abstraction
- Next.js 16 for all frontend
- Socket.io for real-time updates
- Event-driven architecture via Redis pub/sub
- Zero breaking changes between phases (schema must be additive)

**Success criteria for Phase 1:**

- > 80% test coverage on API layer
- <2s page load time
- <200ms API response (p95)
- 100% of team can sign up and log in
- Task Management MVP fully functional (Kanban board working)
- Time Management basic (time entry + Google Calendar sync)
- CI/CD pipeline green on every commit
- Database schema immutable (can't undo in production)

---

## Database Implementation

### Reference Files

- **LAUNCHER_DATABASE_SCHEMA.sql** — All 50+ tables with indexes, triggers, views
- **DESIGN_PM_DATABASE_EXTENSIONS.sql** — Tables for Phase 2.5 (read but don't implement yet)
- **CLIENT_PROFILES_BRAND_DNA_ARCHITECTURE.md** — Client profile schema (implement in Phase 2 Week 5)

### Your Job

1. **Import LAUNCHER_DATABASE_SCHEMA.sql exactly as written** — no modifications
2. **Run on PostgreSQL 13+** with connection pooling (20 connections)
3. **Generate Prisma schema** from database (don't write by hand)
   ```bash
   npx prisma introspect
   ```
4. **Create Prisma migrations** for each environment (dev → staging → prod)
5. **Seed initial data** using the SQL seed statements in the schema file
6. **Create ER diagram** for documentation (auto-generate from Prisma)

### What NOT to Do

- Do NOT modify table structures
- Do NOT add columns (only add in Phase 2)
- Do NOT create custom indexes (use provided ones)
- Do NOT denormalize data
- Do NOT create views beyond what's in the schema

---

## Authentication System

### Specification

- Email/password signup (bcrypt hashing)
- JWT tokens for API authentication
- Session management (30-day default expiry)
- Email verification workflow (send confirmation link)
- Password reset flow (temporary reset token)
- Role-based access control (Admin, Manager, Employee)

### Implementation Path

1. **Week 1 - Backend (Backend Lead - 2.5 days)**
   - Create `POST /api/auth/signup` endpoint
   - Create `POST /api/auth/login` endpoint
   - Create `POST /api/auth/logout` endpoint
   - Implement JWT generation + refresh logic
   - Add email verification flow
   - Add password reset flow

2. **Week 2 - Frontend (Frontend Lead - 1.5 days)**
   - Build signup form component
   - Build login form component
   - Implement session check on app load
   - Handle token refresh on 401
   - Build password reset flow UI

3. **Testing (Full-Stack - 1 day)**
   - Unit tests for auth functions
   - Integration tests for signup → login flow
   - Session refresh under token expiry

### API Contracts

```javascript
POST /api/auth/signup
{
  email: "user@mediabubble.co",
  password: "secure_password",
  name: "John Doe"
}
Response: { token, user: { id, email, name, role } }

POST /api/auth/login
{
  email: "user@mediabubble.co",
  password: "secure_password"
}
Response: { token, user: { id, email, name, role } }

POST /api/auth/logout
Response: { message: "Logged out" }

POST /api/auth/refresh
Response: { token, expiresIn }
```

### Security Requirements

- Passwords hashed with bcrypt (10+ rounds)
- JWT secret stored in environment variables
- HTTPS only (enforce in production)
- CORS configured for localhost + staging + production
- Rate limiting: 5 attempts per minute on login

---

## Core API Layer

### Architecture

- **Framework:** Next.js 16 API routes OR Express.js (your choice)
- **ORM:** Prisma for all database access
- **Validation:** Zod schemas on every endpoint
- **Error Handling:** Standardized JSON responses (status, message, data)
- **Logging:** Winston or Pino to file + console
- **Rate Limiting:** Redis-based, 100 req/min per user default

### API Endpoints (Minimum Viable Set)

**Auth** (6 endpoints)

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/verify-email
POST   /api/auth/reset-password
```

**Tasks** (10 endpoints)

```
POST   /api/tasks (create)
GET    /api/tasks (list with filters)
GET    /api/tasks/:id (detail)
PATCH  /api/tasks/:id (update)
DELETE /api/tasks/:id (delete)
GET    /api/tasks/search (full-text search)
PATCH  /api/tasks/:id/status (update status only)
POST   /api/tasks/:id/comments (add comment)
GET    /api/tasks/:id/comments (list comments)
DELETE /api/tasks/:id/comments/:commentId (delete comment)
```

**Time Management** (8 endpoints)

```
POST   /api/time (create entry)
GET    /api/time (list entries)
GET    /api/time/:id (detail)
PATCH  /api/time/:id (update)
DELETE /api/time/:id (delete)
GET    /api/time/calendar (Google Calendar sync)
POST   /api/time/calendar/sync (manual sync)
GET    /api/time/utilization (weekly/monthly stats)
```

**Users** (5 endpoints)

```
GET    /api/users/me (current user)
PATCH  /api/users/me (update profile)
GET    /api/users (list all users)
GET    /api/users/:id (user detail)
PATCH  /api/users/:id/role (change role - admin only)
```

### Implementation Requirements

1. **All endpoints must have:**
   - Zod validation schema
   - Permission check (who can access)
   - Error handling
   - Logging
   - Unit test

2. **Response format:**

   ```javascript
   Success: { status: 200, data: {...}, message: "Success" }
   Error:   { status: 400, error: "error_code", message: "...", details: {...} }
   ```

3. **Test coverage:**
   - 100% of happy paths
   - All error cases (400, 401, 403, 404, 500)
   - Permission boundaries
   - Rate limiting
   - Database constraints

---

## Dashboard Shell & Navigation

### Architecture

- Single-page app with client-side routing (Next.js)
- Protected routes (redirect to login if not authenticated)
- Responsive design (mobile first)
- Dark mode support (Tailwind dark: class)
- Real-time presence (Socket.io)

### Pages (Minimum)

```
/login              → Login form
/signup             → Signup form
/dashboard          → Main hub (navigation, quick stats)
/dashboard/tasks    → Task Management app
/dashboard/time     → Time Management app
/settings           → User profile + preferences
/404                → Not found
```

### Components Required

- Navigation sidebar (collapsible on mobile)
- Top bar (user profile, logout, notifications)
- Task card component
- Task form modal
- Time entry form
- Calendar component
- Loading states
- Error boundaries

### UI/UX Standards

- Use Tailwind CSS + Radix UI
- Follow design system (buttons, inputs, cards, spacing)
- Dark mode parity (every component works in dark mode)
- Accessibility (WCAG 2.1 AA)
- Mobile responsive (<768px, <1024px, >1024px)
- Loading skeletons for data-heavy pages
- Error messages in plain language

---

## Real-Time Infrastructure

### Socket.io Setup

- **Server:** Next.js middleware or separate Node.js server
- **Client:** Socket.io-client in React
- **Authentication:** JWT token in handshake
- **Reconnection:** Auto-reconnect with exponential backoff

### Real-Time Channels

- `/tasks` → task creation, update, deletion
- `/time` → time entry updates
- `/presence` → user online/offline/away status
- `/notifications` → system notifications

### Implementation

1. **Server:** Setup Socket.io server with middleware
2. **Client:** Establish connection on app load
3. **Broadcast:** Emit events when data changes
4. **Consume:** Listen for events and update local state
5. **Graceful fallback:** If Socket fails, fetch data via HTTP

---

## Task Management MVP

### Features (Weeks 3-4)

1. **Kanban Board**
   - 3 columns: Backlog, In Progress, Done
   - Drag-and-drop between columns
   - Real-time sync across clients
   - Column header shows count

2. **Create Task**
   - Title, description, deadline, priority
   - Assign to user(s)
   - Add to project (optional)
   - Save as draft or publish

3. **Task Detail**
   - Show all fields
   - Comments thread
   - Edit inline
   - Delete with confirmation
   - Show created/updated timestamps

4. **Filtering**
   - By assignee
   - By status
   - By deadline (overdue, this week, next week)
   - By priority
   - Full-text search

5. **Bulk Actions**
   - Multi-select tasks
   - Move to status
   - Assign to user
   - Delete

### Database Schema (Already in LAUNCHER_DATABASE_SCHEMA.sql)

```sql
tasks (id, title, description, status, priority, deadline, created_by,
       assigned_to, project_id, created_at, updated_at)
task_comments (id, task_id, user_id, content, created_at)
task_attachments (id, task_id, url, filename, created_at)
```

### API + UI Checklist

- [ ] Create task modal (form + validation)
- [ ] Task list/Kanban component
- [ ] Task detail panel (modal or sidebar)
- [ ] Task card component
- [ ] Comment thread component
- [ ] Filter sidebar
- [ ] Drag-and-drop (react-beautiful-dnd or dnd-kit)
- [ ] Real-time updates via Socket.io
- [ ] Full-text search
- [ ] Pagination (50 tasks per page)

---

## Time Management (Basic)

### Features (Week 3)

1. **Time Entry**
   - Date picker
   - Duration (hours or timer)
   - Task assignment (dropdown)
   - Notes/description
   - Quick buttons (1h, 2h, 4h, custom)

2. **Time List**
   - Week view
   - Daily total
   - Task breakdown
   - Filter by user + date range

3. **Google Calendar Sync**
   - OAuth login (read-only)
   - Fetch user's calendar events
   - Display in calendar view
   - No write-back (Phase 2)

4. **Utilization**
   - Hours tracked this week
   - Hours available (default 40)
   - Utilization % (tracked/available)
   - Weekly/monthly breakdown

### Database Schema (Already in LAUNCHER_DATABASE_SCHEMA.sql)

```sql
time_entries (id, user_id, task_id, date, hours, notes, created_at)
availability (id, user_id, available_hours, date, created_at)
```

### API + UI Checklist

- [ ] Time entry form (date, duration, task select, notes)
- [ ] Quick add buttons
- [ ] Time list (table view)
- [ ] Week/month view toggle
- [ ] Google Calendar OAuth
- [ ] Calendar sync endpoint
- [ ] Utilization calculation
- [ ] Mobile-friendly time entry

---

## Testing Strategy

### Unit Tests (Jest)

- Auth functions (password hashing, token generation)
- API endpoint validators (Zod schemas)
- Permission checks
- Database helpers
- Utility functions

**Target:** >80% coverage on API layer

### Integration Tests (Jest + Supertest)

- Auth flow (signup → login → logout)
- Task CRUD (create → read → update → delete)
- Time entry (create → list → filter)
- Permission boundaries (admin vs employee)
- Real-time updates (Socket.io)

**Target:** 10+ critical user flows

### E2E Tests (Cypress)

- User signup → complete profile → create first task
- Login → view dashboard → filter tasks
- Time entry → log time → see utilization
- Multi-client real-time (open task in 2 browsers, update in one, see in both)

**Target:** 5+ critical workflows

### Performance Testing (k6)

- 100 concurrent users
- Create 1000 tasks
- Page load time <2s
- API response <200ms (p95)

---

## Deployment & CI/CD

### GitHub Actions Workflow

```yaml
on: [push, pull_request]

jobs:
  lint:
    - Run ESLint + Prettier
    - Run TypeScript type check

  test:
    - Run Jest unit tests
    - Run integration tests
    - Generate coverage report

  build:
    - Build Next.js app
    - Build backend

  e2e:
    - Start test environment
    - Run Cypress tests
```

**Requirements:**

- All tests pass before merge
- > 80% coverage required
- Zero TypeScript errors
- Automated deploy to staging on merge to main
- Manual production deploy from GitHub UI

### Environment Setup

```
Development:  .env.local (git ignored)
Staging:      .env.staging (GitHub secrets)
Production:   .env.production (GitHub secrets)

Required vars:
- DATABASE_URL (PostgreSQL connection)
- REDIS_URL (Redis connection)
- JWT_SECRET (secure random string)
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
- NEXTAUTH_SECRET (if using next-auth)
- SENTRY_DSN (error tracking)
```

---

## Week-by-Week Breakdown

### Week 1: Infrastructure & Database

**Backend Lead (2.5 days)**

- [ ] Provision PostgreSQL + Redis
- [ ] Import LAUNCHER_DATABASE_SCHEMA.sql
- [ ] Setup Prisma + generate schema
- [ ] Create migrations (dev/staging/prod)
- [ ] Seed test data
- [ ] Document ER diagram

**Full-Stack (1.5 days)**

- [ ] Setup NX monorepo
- [ ] Configure Next.js + TypeScript
- [ ] Setup Tailwind + Radix UI
- [ ] Configure ESLint + Prettier
- [ ] Setup Jest + testing infrastructure
- [ ] Setup GitHub Actions workflow

**Deliverable:** Infrastructure green, database queryable, CI/CD pipeline working

### Week 2: Auth & API Foundation

**Backend Lead (2.5 days)**

- [ ] Implement auth endpoints (signup, login, refresh)
- [ ] Implement user CRUD endpoints
- [ ] Setup role-based middleware
- [ ] Implement email verification
- [ ] Implement password reset
- [ ] Write auth tests

**Frontend Lead (1.5 days)**

- [ ] Build dashboard shell + navigation
- [ ] Build login/signup forms
- [ ] Implement session check
- [ ] Handle token refresh
- [ ] Build responsive layout
- [ ] Dark mode support

**Full-Stack (1 day)**

- [ ] Implement rate limiting
- [ ] Setup error handling
- [ ] Setup logging
- [ ] API tests (happy path + errors)

**Deliverable:** Auth system working, dashboard shell navigable, CI/CD green

### Week 3: Task Management MVP + Time Management

**Backend + Frontend (2.5 days)**

- [ ] Task CRUD endpoints
- [ ] Task filtering + search
- [ ] Comments system
- [ ] Task form component
- [ ] Kanban board component
- [ ] Task detail view

**Backend (1 day)**

- [ ] Time entry CRUD
- [ ] Utilization calculation
- [ ] Google Calendar OAuth
- [ ] Time filtering

**Frontend (1 day)**

- [ ] Time entry form
- [ ] Week view component
- [ ] Utilization display
- [ ] Calendar integration

**Full-Stack (1 day)**

- [ ] Socket.io real-time setup
- [ ] Real-time task updates
- [ ] Presence system
- [ ] Integration tests

**Deliverable:** Task Management MVP functional (Kanban, CRUD, comments), Time Management basic working

### Week 4: Testing, Optimization, Launch

**Full-Stack + QA (2 days)**

- [ ] Write E2E tests (Cypress)
- [ ] Performance testing (k6)
- [ ] Load testing (100 concurrent users)
- [ ] Lighthouse audit
- [ ] Bug fixes

**Backend (1 day)**

- [ ] Query optimization
- [ ] Missing indexes
- [ ] N+1 query elimination
- [ ] Database performance

**Frontend (1 day)**

- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] CSS minification

**DevOps (0.5 days)**

- [ ] Production deployment setup
- [ ] Monitoring + alerts (Sentry)
- [ ] Backup strategy
- [ ] Rollback procedure

**Documentation (0.5 days)**

- [ ] API documentation
- [ ] Deployment runbook
- [ ] Troubleshooting guide
- [ ] FAQ for team

**Deliverable:** Production-ready, >80% test coverage, <2s load time, 99.9% uptime ready

---

## Quality Gates (Go/No-Go Decisions)

### Gate 1: End of Week 1 (Infrastructure)

**Criteria:**

- [ ] PostgreSQL database responding <100ms
- [ ] Prisma migrations run cleanly
- [ ] CI/CD pipeline green on first commit
- [ ] All dev environment checks passing

**Go Decision:** Proceed to Week 2 if all pass

---

### Gate 2: End of Week 2 (Auth & API)

**Criteria:**

- [ ] User can sign up with email
- [ ] User can log in and receive JWT
- [ ] Protected routes return 401 if not authenticated
- [ ] Dashboard loads after login
- [ ] Dark mode works on all pages

**Go Decision:** Proceed to Week 3 if all pass

---

### Gate 3: End of Week 3 (MVP Apps)

**Criteria:**

- [ ] Create task, view in Kanban, update, delete
- [ ] Time entry creation + retrieval
- [ ] Real-time task updates across clients
- [ ] Google Calendar events display
- [ ] No console errors on main flows

**Go Decision:** Proceed to Week 4 if all pass

---

### Gate 4: End of Week 4 (Production Readiness)

**Criteria:**

- [ ] > 80% test coverage
- [ ] Load test passes (100 concurrent users)
- [ ] Lighthouse performance >90
- [ ] Zero critical production bugs
- [ ] Monitoring & alerts active

**Go Decision:** Launch to team Friday EOD if all pass

---

## Success Metrics (Phase 1 Complete)

### Technical

- ✅ >80% test coverage (unit + integration)
- ✅ <2s page load time (Lighthouse)
- ✅ <200ms API response (p95)
- ✅ 99.9% uptime in staging
- ✅ Zero critical vulnerabilities

### Product

- ✅ 100% of MediaBubble team can log in
- ✅ >50% of team using Task Management weekly
- ✅ >30% of team logging time daily
- ✅ <2 hours support burden per day
- ✅ >4.0/5.0 user satisfaction

### Business

- ✅ Phase 1 delivered on time (4 weeks)
- ✅ Team trained and independent
- ✅ Foundation ready for Phases 2 & 3
- ✅ Cost within budget (~$20-30k dev)

---

## Reference Files to Use

**Architecture & Design:**

- LAUNCHER_TECHNICAL_ROADMAP.md
- LAUNCHER_EXECUTIVE_SUMMARY.md
- LAUNCHER_README.md

**Implementation:**

- LAUNCHER_DATABASE_SCHEMA.sql (import exactly)
- LAUNCHER_IMPLEMENTATION_CHECKLIST.md (for week-by-week tracking)
- IMPLEMENTATION_PHASE_1_DETAILED.md (detailed week breakdown)

**Later Phases:**

- DESIGN_PM_TOOLS_ARCHITECTURE.md (Phase 2.5 reference, don't implement yet)
- DESIGN_PM_DATABASE_EXTENSIONS.sql (Phase 2.5 reference, don't implement yet)
- CLIENT_PROFILES_BRAND_DNA_ARCHITECTURE.md (Phase 2.5 reference)

---

## Critical Rules

1. **Database is immutable** — Once schema ships to production, you can only add columns, never remove or rename
2. **No breaking changes** — API versions must be backward compatible
3. **Test before deploy** — Every endpoint has tests before going to production
4. **Staging mirrors production** — Test everything in staging first
5. **Monitoring from Day 1** — Sentry + uptime monitoring active before launch

---

## Success =

You build a **solid foundation** that:

- ✅ Handles 25 employees without breaking
- ✅ Can scale to 100+ users later
- ✅ Has clean architecture (easy to add Phase 2)
- ✅ Is well-tested (confidence to iterate)
- ✅ Is well-documented (team can maintain)

---

**Status:** Ready for Week 1 Kickoff  
**Monday:** First standup 9:30am Cairo time  
**Friday Week 4:** Production launch 4pm Cairo time

🚀 **Build the foundation. Ship the MVP. Validate the vision.**
