# MediaBubble Unified Platform - Complete App Catalog
## All 14 Applications Specification

**Platform:** launcher.mediabubble.co  
**Total Apps:** 12 (8 core + 4 design/PM)  
**Users:** 25 employees + 100 clients  
**Status:** Complete Architecture Defined  
**Last Updated:** June 19, 2026

---

## Platform Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  launcher.mediabubble.co                      │
│                 (Unified App Launcher)                        │
├─────────────────────────────────────────────────────────────┤
│                                                                │
│  PHASE 1: CORE INTERNAL (Weeks 1-4)                          │
│  ─────────────────────────────────────────────────────        │
│  ✅ 1. Task Management         ✅ 5. AI Tools Suite          │
│  ✅ 2. Time Management         ✅ 6. Prompt Generator        │
│  ✅ 3. Employee Performance    ✅ 7. Communication Channels  │
│  ✅ 4. Collaboration Hub       ✅ 8. Workflow Automation     │
│                                                                │
│  PHASE 2.5: DESIGN + PM TOOLS (Weeks 5-12)                  │
│  ─────────────────────────────────────────────────────        │
│  ✅ 9.  Design Projects        ✅ 12. Sprint Planner         │
│  ✅ 10. Design Handoff         ✅ 13. Roadmap               │
│  ✅ 11. Design System Manager  ✅ 14. Release Manager        │
│  ✅ 15. Asset Library                                        │
│                                                                │
│  + CLIENT PROFILES + BRAND DNA (lightweight tagging)         │
│                                                                │
│  ALL INTEGRATED VIA:                                          │
│  • Single Authentication (internal + client invites)         │
│  • Unified Dashboard Navigation                              │
│  • Event-Driven Architecture                                 │
│  • Embedded Communication (Chat as feature)                  │
│  • Role-Based Access Control                                 │
│                                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## App Catalog (12 Core Apps + Client Profiles/Brand DNA)

### CORE INTERNAL APPS (8)

#### 1. Task Management
**Purpose:** Distributed task tracking with Kanban board  
**Users:** 25 employees  
**Key Features:**
- Kanban board (Backlog → In Progress → Done)
- Task templates (6 pre-built)
- Assign to users with deadlines
- Comment threads
- Deadline tracking + late alerts
- Bulk actions

**Tech:** Next.js, Prisma, PostgreSQL, Socket.io  
**Timeline:** Week 3 (MVP)  
**Status:** Core MVP deliverable

**API:** 10+ CRUD endpoints + filters/search

---

#### 2. Time Management
**Purpose:** Time tracking + calendar integration  
**Users:** 25 employees  
**Key Features:**
- Time entry logging (daily timer or manual)
- Google Calendar sync (read-only)
- Week view with total hours
- Availability + capacity planning
- Leave requests + vacation tracking
- Utilization % calculations

**Tech:** Next.js, Google Calendar API, PostgreSQL  
**Timeline:** Week 3 (basic)  
**Status:** Phase 1 MVP with Phase 2 enhancements

**API:** 8+ endpoints for time entries, calendar, availability

---

#### 3. Employee Performance
**Purpose:** Performance reviews, OKRs, KPIs  
**Users:** 25 employees + managers  
**Key Features:**
- Performance reviews (quarterly/annual)
- OKR tracking (aligned to company goals)
- KPI dashboards per employee
- 360° feedback system
- Goals + accomplishments
- Historical comparison (year-over-year)
- Analytics & insights

**Tech:** Next.js, Recharts, PostgreSQL  
**Timeline:** Week 5-6  
**Status:** Phase 2 core app

**API:** 12+ endpoints for reviews, OKRs, KPIs, feedback

---

#### 4. Collaboration Hub
**Purpose:** Team coordination + activity feeds  
**Users:** 25 employees  
**Key Features:**
- Activity feeds (what team is working on)
- User presence (online/offline/away)
- @ mentions with notifications
- Team workspaces
- Notification center
- Quick search (across all data)
- Trending content

**Tech:** Next.js, Socket.io, Redis, PostgreSQL  
**Timeline:** Week 7  
**Status:** Phase 2 core app

**API:** 6+ endpoints for feeds, presence, mentions, search

---

#### 5. AI Tools Suite
**Purpose:** AI-powered content generation  
**Users:** 25 employees  
**Key Features:**
- Content generation (Claude API)
- Document analysis (PDF summary, extraction)
- Code generation (snippets, debugging help)
- Brainstorming assistant
- Multi-language support
- Output saving + versioning
- Usage tracking (tokens, costs)

**Tech:** Next.js, Claude API, Gemini API, PostgreSQL  
**Timeline:** Week 8  
**Status:** Phase 2 core app

**API:** 8+ endpoints for content gen, analysis, brainstorming

---

#### 6. Prompt Generator
**Purpose:** Build and test custom AI prompts  
**Users:** 25 employees (non-technical)  
**Key Features:**
- Visual prompt builder (drag-and-drop)
- Variable templating ({{name}}, {{context}})
- Testing interface with sample inputs
- Version control + rollback
- Performance analytics (which prompts get best results)
- Prompt library + sharing
- A/B testing framework

**Tech:** Next.js, Claude API, PostgreSQL  
**Timeline:** Week 8  
**Status:** Phase 2 core app

**API:** 10+ endpoints for prompts, testing, versioning, analytics

---

#### 7. Communication Channels
**Purpose:** Internal messaging system  
**Users:** 25 employees  
**Key Features:**
- Public/private channels
- Direct messaging (1:1)
- Threading + replies
- Emoji reactions
- File sharing
- Message search + pinned messages
- Notifications + mentions
- Integrated with task/project context

**Tech:** Next.js, Socket.io, PostgreSQL, Redis  
**Timeline:** Week 9  
**Status:** Phase 2 core app

**API:** 12+ endpoints for channels, messages, files, search

---

#### 8. Workflow Automation
**Purpose:** No-code automation engine  
**Users:** 25 employees (power users)  
**Key Features:**
- Visual workflow builder
- 10+ triggers (task created, time logged, review completed, etc)
- 20+ actions (create task, send message, update field, etc)
- Conditional logic (if/then branching)
- Scheduling (cron expressions)
- Execution logs + debugging
- 20+ pre-built templates
- Error handling + retries

**Tech:** Next.js, Node.js, PostgreSQL, Redis, Temporal/Bull  
**Timeline:** Week 10-11  
**Status:** Phase 2 core app

**API:** 15+ endpoints for workflows, triggers, actions, execution

---

### DESIGN & PROJECT MANAGEMENT APPS (5)

#### 9. Design Projects
**Purpose:** Figma sync hub for design project management  
**Users:** 25 employees + 100 clients  
**Key Features:**
- Project dashboard with phases (Discovery → Shipped)
- Team assignment (designers, PMs, clients)
- Figma file sync (every 6 hours or on-demand)
- Real-time file status
- Client visibility + project progress
- Phase tracking + milestones
- Comments + feedback threads
- Deadline management

**Tech:** Next.js, Figma API, PostgreSQL, WebSocket  
**Timeline:** Week 6-7  
**Status:** Phase 2.5 app

**API:** 12+ endpoints for projects, files, sync, permissions

---

#### 10. Design Handoff
**Purpose:** Design approval + spec generation  
**Users:** 25 employees + 100 clients  
**Key Features:**
- Submission workflow (draft → review → approval)
- Annotation + feedback collection
- Multi-round review cycles
- Auto-generated specs (colors, typography, spacing, components)
- Client sign-off
- Specs export (CSS, Tailwind, JSON)
- Version history + rollback
- Design to dev handoff

**Tech:** Next.js, Figma API, PostgreSQL  
**Timeline:** Week 6-7  
**Status:** Phase 2.5 app

**API:** 10+ endpoints for handoffs, feedback, specs, export

---

#### 11. Design System Manager
**Purpose:** Token library + component catalog  
**Users:** 25 employees  
**Key Features:**
- Design tokens (colors, typography, spacing, shadows)
- Component library (Button, Input, Card, etc)
- Usage tracking (which projects use which components)
- Token versioning + releases
- Export formats (CSS, Tailwind, Sass, JSON)
- Component documentation + examples
- Figma sync for components
- Deprecated component warnings

**Tech:** Next.js, Figma API, PostgreSQL  
**Timeline:** Week 6-7  
**Status:** Phase 2.5 app

**API:** 10+ endpoints for tokens, components, exports

---

#### 12. Asset Library
**Purpose:** Centralized brand + project asset repository  
**Users:** 25 employees + 100 clients  
**Key Features:**
- Asset categorization (Icons, Illustrations, Photos, Patterns)
- Version control + history
- Usage tracking (which projects use asset)
- Permission controls (public, team, client-specific)
- Advanced search + tagging
- Download analytics
- Asset sharing with clients
- Expiration management (deprecate old assets)

**Tech:** Next.js, Cloud Storage, PostgreSQL  
**Timeline:** Week 6-7  
**Status:** Phase 2.5 app

**API:** 10+ endpoints for assets, versions, permissions, search

---

#### 13. Backlog Manager
**Purpose:** Product backlog organization + grooming  
**Users:** 25 employees (PMs + team leads)  
**Key Features:**
- Epic + story hierarchy
- Story points (Fibonacci estimation)
- Priority ranking
- Status tracking (Backlog → Ready → In Sprint → Done)
- Acceptance criteria + tasks
- Dependencies tracking
- Team assignments
- Bulk operations

**Tech:** Next.js, PostgreSQL  
**Timeline:** Week 8-9  
**Status:** Phase 2.5 app

**API:** 10+ endpoints for items, epics, dependencies, bulk ops

---

#### 14. Sprint Planner
**Purpose:** Sprint execution + tracking  
**Users:** 25 employees (PMs + teams)  
**Key Features:**
- Sprint creation + goal setting
- Backlog item dragging (add to sprint)
- Capacity planning (hours per person)
- Team assignments
- Burndown charts (points completed vs days)
- Sprint metrics (velocity, completion rate)
- Daily standup support
- Retrospective automation

**Tech:** Next.js, Recharts, PostgreSQL  
**Timeline:** Week 8-9  
**Status:** Phase 2.5 app

**API:** 10+ endpoints for sprints, items, metrics, updates

---

#### 15. Roadmap
**Purpose:** Strategic product roadmap visualization  
**Users:** 25 employees (leadership + PMs)  
**Key Features:**
- Quarterly roadmap view
- Epic tracking + status
- Dependencies mapping
- KPI impact (estimated lift per feature)
- Timeline + milestones
- Leadership visibility
- Stakeholder updates
- Prioritization framework

**Tech:** Next.js, Mermaid/D3 charts, PostgreSQL  
**Timeline:** Week 8-9  
**Status:** Phase 2.5 app

**API:** 8+ endpoints for roadmap items, epics, metrics

---

#### 16. Release Manager
**Purpose:** Release planning + shipping  
**Users:** 25 employees (PMs + ops)  
**Key Features:**
- Release versioning (semantic)
- Feature + hotfix tracking
- QA status + sign-off
- Release notes generation
- Deployment scheduling
- Rollback procedures
- Post-release analytics
- Incident tracking

**Tech:** Next.js, PostgreSQL  
**Timeline:** Week 8-9  
**Status:** Phase 2.5 app

**API:** 10+ endpoints for releases, features, QA, deployment

---

### BRAND & TAGGING SYSTEM (Integrated into existing apps)

#### Client Profiles + Brand DNA (Not a separate app)
**Purpose:** Add client context to tasks and design work  
**Users:** 25 employees  
**Key Features:**

**Part A: Client Profiles (lightweight)**
- Client name, contact, email
- **Brand DNA:** Voice, colors, fonts, do's/don'ts
- Linked to Design Projects
- Team assignments per client

**Part B: Task Tagging**
- Tag task with CLIENT (shows brand DNA in task detail)
- Tag task with TEAM MEMBERS (multiple selection)
- Tag task with MANAGERS (multiple selection)
- Filter tasks by client or tagged user

**Part C: Brand DNA Integration**
- Design team sees brand guidelines when opening task
- Color swatches, fonts, voice guidelines in quickview
- Dropdown to select client from task detail
- Brand DNA managed in Client Profile page

**Tech:** Next.js, PostgreSQL (minimal schema additions)  
**Timeline:** Weeks 5-7 (Phase 2)  
**Status:** Lightweight feature, not a separate app

**API:** 6 endpoints (client profile, brand DNA, task tagging)

**Future Extensions (Phase 3+):**
- Social Media Planner (if client demand exists)
- Client portal (if needed)
- Content generation with brand DNA as input

---

## System Features (Across All Apps)

### Authentication & Access Control
- **Internal Users:** mediabubble.co emails (25 people)
- **Client Users:** Invited emails (100 people)
- **Roles:** Admin, Designer, PM, Employee, Client Admin, Client Member
- **Permissions:** Role-based per app (create, read, update, delete, comment)
- **SSO Ready:** OIDC/SAML for enterprise

### Communication
- **Global Channels:** #announcements, #design-feedback, #pm-updates, etc.
- **Context Threads:** Chat attached to tasks, projects, sprints, design handoffs
- **Direct Messages:** 1:1 communication
- **Notifications:** In-app + email for mentions, approvals, deadlines

### Event-Driven Architecture
- **Redis Pub/Sub** for inter-app communication
- **30+ Event Types:** task created, time logged, content approved, image generated, etc.
- **Real-time Updates:** WebSocket for live feeds, presence, notifications
- **Audit Logging:** All actions logged with user, timestamp, change details

### Data & Privacy
- **Client Isolation:** Clients see only their projects/data
- **Audit Trail:** All edits/approvals logged
- **Encryption:** PII at rest + in transit
- **Compliance:** GDPR-compliant deletion, data retention policies
- **Backups:** Daily automated, 30-day retention

### Analytics & Reporting
- **Built-in Dashboards:** Usage metrics, adoption rates, performance
- **Export:** CSV/PDF reports for stakeholders
- **KPI Tracking:** Team productivity, campaign performance, adoption rates

---

## Timeline Summary

| Phase | Weeks | Apps | Launch |
|-------|-------|------|--------|
| **Phase 1** | 1-4 | Task, Time | Week 4 (MVP) |
| **Phase 2** | 5-12 | +6 core apps | Week 12 |
| **Phase 2.5** | 5-12 | Design, PM (+ Client Profiles/Brand DNA) | Week 12 |
| **Phase 3** | 13-16 | Optimization, hardening | Week 16 (Full) |

**Total Duration:** 16 weeks (4 months)  
**Team:** 3-4 developers  
**Cost:** $135-175k Year 1

---

## Success Metrics

### Adoption
- Week 4: 100% team can log in
- Week 8: >50% using Task Management weekly
- Week 12: >80% daily active users
- Week 16: >90% team adoption

### Quality
- >80% test coverage
- <2s page load time
- <200ms API response (p95)
- 99.9% uptime
- Zero critical vulnerabilities

### Business
- 20-25 hours/week saved (automation)
- $52-65k Year 1 savings
- 2.5-3.5 month payback period
- >4.5/5 user satisfaction

---

## Integration Matrix

| From → To | Task | Time | Performance | Collab | AI | Prompts | Comms | Workflows | Design | Handoff | System | Asset | Backlog | Sprint | Roadmap | Release | Social |
|-----------|------|------|-------------|--------|----|---------| ------|-----------|--------|---------|--------|-------|---------|--------|---------|---------|--------|
| **Task** | — | link | assign | mention | gen | use | post | trigger | link | link | — | — | — | — | — | — | content |
| **Time** | log | — | input | feed | — | — | — | trigger | — | — | — | — | — | estimate | — | — | — |
| **Performance** | assign | log | — | feed | — | — | post | trigger | — | — | — | — | — | — | — | — | — |
| **Collab** | mention | — | — | — | — | — | mention | — | — | — | — | — | — | — | — | — | — |
| **AI** | assist | — | assist | assist | — | input | draft | — | image | — | — | — | — | — | — | — | caption |
| **Prompts** | assist | — | — | — | use | — | — | — | — | — | — | — | — | — | — | — | — |
| **Comms** | thread | — | discuss | — | mention | — | — | — | feedback | feedback | — | — | discuss | discuss | discuss | — | feedback |
| **Workflows** | trigger | trigger | trigger | — | trigger | — | notify | — | trigger | trigger | — | — | trigger | trigger | — | trigger | trigger |
| **Design** | reference | — | review | discuss | visualize | — | feedback | — | — | reference | library | reference | — | — | roadmap | release | asset |
| **Handoff** | reference | — | review | discuss | — | — | feedback | — | source | — | library | reference | — | — | — | — | —  |
| **System** | reference | — | — | — | — | — | — | — | use | use | — | reference | — | — | — | — | brand |
| **Asset** | — | — | — | — | — | — | — | — | use | use | reference | — | — | — | — | — | use |
| **Backlog** | — | estimate | — | — | — | — | — | — | design | — | — | — | — | reference | reference | reference | — |
| **Sprint** | schedule | capacity | — | — | — | — | — | — | — | — | — | — | pull | — | reference | reference | — |
| **Roadmap** | — | — | — | — | — | — | — | — | — | — | — | — | reference | reference | — | reference | — |
| **Release** | deliver | — | — | — | — | — | — | — | ship | ship | — | — | features | features | schedule | — | — |
| **Social** | content | — | — | — | create | create | post | trigger | asset | — | brand | asset | — | — | — | — | — |

Legend: `—` = no direct integration | `link` = can reference | `mention` = can @ or thread | `trigger` = can trigger workflow | `use` = can consume data | `feedback` = comment/approval thread | `reference` = can link to

---

## Document Checklist

✅ **Completed Architecture Documents:**
1. LAUNCHER_EXECUTIVE_SUMMARY.md - Business case & ROI
2. LAUNCHER_TECHNICAL_ROADMAP.md - Tech architecture
3. LAUNCHER_DATABASE_SCHEMA.sql - Database schema (50+ tables)
4. LAUNCHER_IMPLEMENTATION_CHECKLIST.md - 16-week execution
5. LAUNCHER_README.md - Navigation guide
6. DESIGN_PM_TOOLS_ARCHITECTURE.md - Design & PM tools
7. DESIGN_PM_DATABASE_EXTENSIONS.sql - Design/PM database
8. IMPLEMENTATION_PHASE_1_DETAILED.md - Week 1-4 breakdown
9. SOCIAL_MEDIA_PLANNER_ARCHITECTURE.md - **NEW: Social media + Brand DNA**
10. COMPLETE_APP_CATALOG.md - This document (comprehensive app list)
11. PROJECT_SUMMARY.md - Master reference

**Total:** 11 comprehensive documents  
**Total Content:** ~26,000 words + 3,000 lines SQL  
**Status:** Complete platform specification ready for implementation

---

## Next Actions

1. **Stakeholder Approval** (This Week)
   - Review PROJECT_SUMMARY.md
   - Approve architecture & timeline
   - Confirm budget & team

2. **Team Preparation** (Week 1)
   - Allocate 3-4 developers
   - Provision infrastructure
   - Schedule kickoff

3. **Phase 1 Execution** (Weeks 1-4)
   - Database + Auth (Week 1)
   - API Foundation (Week 2)
   - Task & Time MVP (Week 3)
   - Launch (Week 4)

4. **Parallel Phase 2.5** (Weeks 6-9)
   - Design tools + Social Media Planner
   - Brand DNA + Content Planner
   - Image generation tasks
   - Integration

---

**Status:** Ready for Production Implementation  
**Created:** June 19, 2026  
**Owner:** Dorgham + Development Team

🚀 **14 Apps. 1 Platform. 4 Months. Ready to build.**
