# Design & PM Tools Architecture Spec

## launcher.mediabubble.co Extended Ecosystem

**Status:** Architecture Design  
**Date:** June 19, 2026  
**Scope:** Design Team + Project Managers + Client Visibility  
**Users:** 25 employees + 100 clients across 100 design projects

---

## 🎯 Vision

Build an **interconnected product ecosystem** that:

- Serves internal teams (design, PM, operations)
- Gives clients visibility into project progress
- Uses **unified auth with permission-based access** (mediabubble.co emails + invited client emails)
- Embeds **communication everywhere** (not a separate app)
- Manages apps via centralized **App Manager**
- Communicates through **event-driven architecture**

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    launcher.mediabubble.co                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              UNIFIED AUTH LAYER                          │  │
│  │  - Email: mediabubble.co + invited client domains       │  │
│  │  - Role-based access control (RBAC)                     │  │
│  │  - Client profile permissions                            │  │
│  │  - Session management + 2FA                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              APP MANAGER DASHBOARD                       │  │
│  │  - Enable/disable apps per user role                     │  │
│  │  - Permission matrix (who sees what)                     │  │
│  │  - Feature flags & A/B testing                           │  │
│  │  - Activity audit logs                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              APPLICATIONS (8 core + 5 new)               │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  DESIGN CLUSTER:                   PM CLUSTER:           │  │
│  │  • Design Projects                 • Backlog Manager     │  │
│  │  • Design Handoff                  • Sprint Planner      │  │
│  │  • Design System Manager           • Roadmap             │  │
│  │  • Asset Library                   • Release Manager     │  │
│  │                                    • Burndown            │  │
│  │  CORE CLUSTER:                                           │  │
│  │  • Task Management (existing)      + Chat (embedded)     │  │
│  │  • Time Management (existing)      + Events (global)     │  │
│  │  • Performance (existing)          + Notifications       │  │
│  │  • Collaboration (existing)                              │  │
│  │  • AI Tools (existing)                                   │  │
│  │  • Prompts (existing)                                    │  │
│  │  • Workflow Automation (existing)                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              EVENT BUS (Redis pub/sub)                   │  │
│  │  - Task events → Chat, Performance, Notifications       │  │
│  │  - Design events → Handoff, Asset Library               │  │
│  │  - PM events → Roadmap, Burndown, Notifications         │  │
│  │  - Chat subscribes to all important events              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              SHARED SERVICES                             │  │
│  │  - Database (PostgreSQL)                                 │  │
│  │  - File storage (S3/Cloud)                               │  │
│  │  - Search (Elasticsearch optional)                       │  │
│  │  - Cache (Redis)                                         │  │
│  │  - Email/Notifications                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👥 User Model: The Permission Layer

### User Roles & Access

```
INTERNAL USERS (mediabubble.co emails)
├── Admin
│   ├── All apps (design + PM + core)
│   ├── App Manager dashboard
│   ├── User & client management
│   └── System settings
├── Design Team
│   ├── Design Projects, Handoff, System Manager, Asset Library
│   ├── Read-only: Backlog, Sprints, Roadmap
│   ├── Tasks (assigned only)
│   └── Chat (all channels + context threads)
├── Project Managers
│   ├── All PM apps (Backlog, Sprints, Roadmap, Release)
│   ├── Design Projects (read-only, progress tracking)
│   ├── Tasks (all)
│   └── Chat (all channels + context threads)
└── Employees (General)
    ├── Tasks (assigned)
    ├── Time Management
    ├── Performance (own reviews)
    └── Chat (all channels)

CLIENT USERS (Invited emails, optional domain restrictions)
├── Client Admin
│   ├── Design Projects (assigned)
│   ├── Design Handoff (feedback only)
│   ├── Asset Library (public assets only)
│   ├── Roadmap (public items only)
│   ├── Chat (project-specific channels)
│   └── Can manage client team members
└── Client Team Member
    ├── Design Projects (assigned, read-only)
    ├── Design Handoff (feedback only)
    ├── Asset Library (public assets only)
    ├── Roadmap (public items only)
    └── Chat (project-specific channels)
```

### Client Profile Model

```typescript
// Client Profile
{
  id: UUID,
  name: string, // "Acme Corp"
  email_domain: string, // "acme.com" (optional)
  allowed_emails: string[], // Specific emails if domain not set
  projects: UUID[], // Which projects can they see
  team_members: UUID[], // Users in this client account
  created_at: timestamp,
  status: "active" | "inactive",

  // Permissions
  can_comment_on_designs: boolean,
  can_view_roadmap: boolean,
  can_view_asset_library: boolean,
  can_access_chat: boolean,
  read_only_mode: boolean // If true, client can view but not comment
}

// Client Invitation
{
  id: UUID,
  client_id: UUID,
  email: string,
  invited_by: UUID (mediabubble user),
  invited_at: timestamp,
  accepted_at: timestamp,
  role: "admin" | "member", // In client team
  status: "pending" | "accepted" | "rejected"
}
```

---

## 🔐 Auth System (Hybrid Approach)

### Signup Flow

```
User opens launcher.mediabubble.co
    ↓
├─ If mediabubble.co email
│  └─ Direct signup (self-service)
├─ If invited via client profile
│  └─ Accept invitation → Create account
└─ If no invitation
   └─ "Request access" → Admin approval
```

### Auth Database Schema

```typescript
// Users table (existing, enhanced)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  avatar_url TEXT,
  user_type ENUM ('internal', 'client'), // NEW
  client_id UUID REFERENCES clients(id), // NEW - if client user
  role ENUM ('Admin', 'Manager', 'Contributor', 'Viewer'),
  status ENUM ('active', 'inactive', 'suspended'),
  last_login TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

// Client Profiles (NEW)
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email_domain VARCHAR(255), // nullable (optional domain restriction)
  allowed_emails TEXT[], // specific emails if no domain
  projects UUID[] DEFAULT '{}', // projects they can access
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  status ENUM ('active', 'inactive')
);

// Client Invitations (NEW)
CREATE TABLE client_invitations (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  email VARCHAR(255) NOT NULL,
  role ENUM ('admin', 'member') DEFAULT 'member',
  invited_by UUID REFERENCES users(id),
  invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_at TIMESTAMP,
  status ENUM ('pending', 'accepted', 'rejected'),
  UNIQUE(client_id, email)
);

// Permissions Matrix (NEW)
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY,
  role VARCHAR(50) NOT NULL, -- 'Admin', 'Designer', 'PM', 'Client', etc
  user_type ENUM ('internal', 'client'),
  app_name VARCHAR(100), -- 'design_projects', 'backlog', etc
  can_create BOOLEAN DEFAULT false,
  can_read BOOLEAN DEFAULT true,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_comment BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  UNIQUE(role, user_type, app_name)
);
```

### Auth Flow (Sequence Diagram)

```
┌─────────────┐                                      ┌──────────┐
│   Client    │                                      │ Backend  │
└──────┬──────┘                                      └────┬─────┘
       │                                                  │
       │ 1. Click "Sign Up"                              │
       │─────────────────────────────────────────────→   │
       │                                                  │
       │ 2. Check if email matches:                      │
       │    - mediabubble.co domain?                     │
       │    - Invited in client_invitations?             │
       │    - Check role_permissions for email domain    │
       │                                                  │
       │ ← 3. Return auth options                        │
       │      (self-signup / claim invitation / request) │
       │                                                  │
       │ 4. Submit credentials                           │
       │─────────────────────────────────────────────→   │
       │                                                  │
       │ 5. Hash password, create user, assign role      │
       │    based on email domain & invitations           │
       │                                                  │
       │ ← 6. JWT token + refresh token                  │
       │                                                  │
       │ 7. Redirect to /dashboard                       │
       │    (shows only apps they have access to)        │
       │                                                  │
```

---

## 📱 5 New Apps: Design & PM Cluster

### App 1: Design Projects (Figma Sync Hub)

**Purpose:** Project dashboard that syncs Figma, tracks progress, coordinates teams

**Key Features:**

- List all design projects (team view + client view)
- Sync Figma files (name, status, URL, cover image)
- Track design phase (Discovery → Wireframes → Mockups → Dev Handoff → Shipped)
- Assigned designers & clients
- Timeline & milestones
- Real-time Figma file status
- Chat per project (context thread)
- Client access (view progress, request changes)

**Data Model:**

```typescript
CREATE TABLE design_projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id),
  figma_project_id VARCHAR(255), // Figma API ID
  figma_url TEXT,
  status ENUM ('Discovery', 'Wireframes', 'Mockups', 'Dev Handoff', 'Shipped'),
  phase_progress DECIMAL(3,2), // 0.0 to 1.0
  assigned_designers UUID[],
  assigned_pms UUID[],
  start_date DATE,
  deadline DATE,
  budget DECIMAL(10,2),
  created_by UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,

  -- Design history (local copy)
  figma_files JSONB, -- { id, name, thumbnail_url, last_modified }
  figma_last_synced TIMESTAMP,

  -- Comments count for clients
  client_feedback_count INTEGER DEFAULT 0,
  internal_notes_count INTEGER DEFAULT 0
);
```

**API Endpoints:**

```
POST   /api/v1/design-projects (create)
GET    /api/v1/design-projects (list, filtered by client)
GET    /api/v1/design-projects/:id
PUT    /api/v1/design-projects/:id (update status, dates, etc)
POST   /api/v1/design-projects/:id/sync-figma (manual sync)
GET    /api/v1/design-projects/:id/figma-files (get synced files)
POST   /api/v1/design-projects/:id/assign-designer
POST   /api/v1/design-projects/:id/assign-client
```

**Client View:**

- See project status
- View current design phase
- Request feedback round
- Access chat for questions
- See next milestone

**Internal View:**

- Full project management
- Figma file sync status
- Team assignments
- Timeline tracking
- Budget tracking

---

### App 2: Design Handoff (Approval & Specs)

**Purpose:** Structured design review, approval, and spec generation

**Key Features:**

- Design submission form (file + description)
- Feedback collection (annotated Figma → collected in launcher)
- Approval workflow (Designer → PM → Client → Approved)
- Auto-generate design specs (for Dev team)
- Version history
- Export as PDF/Figma specs
- Chat thread per submission

**Data Model:**

```typescript
CREATE TABLE design_handoffs (
  id UUID PRIMARY KEY,
  design_project_id UUID REFERENCES design_projects(id),
  submission_number INTEGER, // 1, 2, 3... for versions
  status ENUM ('Draft', 'In Review', 'Client Feedback', 'Approved', 'Rejected'),

  // Submission
  submitted_by UUID, // Designer
  submitted_at TIMESTAMP,
  figma_file_id VARCHAR(255),
  figma_file_url TEXT,
  description TEXT,

  // Review
  review_rounds JSONB[], // { round, feedback[], reviewer_id, created_at }

  // Client feedback
  client_feedback JSONB[], // { email, comment, annotation, created_at }
  client_approved_by UUID,
  client_approved_at TIMESTAMP,

  // Specs generation
  generated_specs JSONB, // { colors, typography, components, spacing }
  specs_exported_at TIMESTAMP,

  // Timeline
  due_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE design_feedback (
  id UUID PRIMARY KEY,
  handoff_id UUID REFERENCES design_handoffs(id),
  reviewer_id UUID,
  feedback_text TEXT,
  annotation_x DECIMAL(5,2), // Figma coordinates
  annotation_y DECIMAL(5,2),
  annotation_image_url TEXT, // Screenshot of annotation
  status ENUM ('Unresolved', 'Resolved', 'Acknowledged'),
  created_at TIMESTAMP
);
```

**API Endpoints:**

```
POST   /api/v1/design-handoff (create submission)
GET    /api/v1/design-handoff/:id (get submission)
POST   /api/v1/design-handoff/:id/feedback (add feedback)
POST   /api/v1/design-handoff/:id/approve
POST   /api/v1/design-handoff/:id/reject
POST   /api/v1/design-handoff/:id/generate-specs
GET    /api/v1/design-handoff/:id/specs (get generated specs)
POST   /api/v1/design-handoff/:id/export-pdf
```

**Approval Workflow:**

```
Designer uploads → In Review
                    ↓
Internal team reviews → Client Feedback
                       ↓
Client provides feedback → Designer revises
                       ↓
Resubmit → In Review (repeat)
           ↓
Client approves → Approved → Specs generated
```

---

### App 3: Design System Manager

**Purpose:** Centralized design tokens, components, documentation

**Key Features:**

- Design token library (colors, typography, spacing, shadows)
- Component catalog (buttons, cards, forms, etc.)
- Figma → launcher sync (auto-populate from Figma library)
- Documentation per component
- Version control
- Export options (CSS, Tailwind, React)
- Usage analytics (which components most used)
- Chat for design system discussions

**Data Model:**

```typescript
CREATE TABLE design_system (
  id UUID PRIMARY KEY,
  name VARCHAR(255), // "MediaBubble Design System"
  figma_library_id VARCHAR(255),
  version VARCHAR(50),
  last_synced TIMESTAMP,
  created_at TIMESTAMP
);

CREATE TABLE design_tokens (
  id UUID PRIMARY KEY,
  system_id UUID REFERENCES design_system(id),
  category ENUM ('Color', 'Typography', 'Spacing', 'Shadow', 'Border', 'Other'),
  name VARCHAR(255), -- "Primary Blue", "Body Large", etc
  value JSONB, -- { hex: "#000", rgb: "rgb(...)" } or { fontSize: 16, lineHeight: 1.5 }
  figma_token_id VARCHAR(255),
  exported_as JSONB, -- { css: "--primary-blue: #000", tailwind: "primary-blue", etc }
  documentation TEXT,
  version INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE design_components (
  id UUID PRIMARY KEY,
  system_id UUID REFERENCES design_system(id),
  name VARCHAR(255), -- "Button Primary", "Card", etc
  category VARCHAR(100), -- "Form Controls", "Layout", "Navigation"
  figma_component_id VARCHAR(255),
  figma_url TEXT,
  thumbnail_url TEXT,
  documentation TEXT,
  usage_example TEXT, -- React code example
  status ENUM ('Draft', 'Active', 'Deprecated'),
  usage_count INTEGER DEFAULT 0, -- How many projects use this
  version INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**API Endpoints:**

```
GET    /api/v1/design-system (get current system)
POST   /api/v1/design-system/sync-figma (manual sync)
GET    /api/v1/design-tokens (list tokens, filterable)
GET    /api/v1/design-components (list components)
GET    /api/v1/design-components/:id (get component + usage)
POST   /api/v1/design-system/export (export as CSS/Tailwind/etc)
```

---

### App 4: Asset Library (Design File Organization)

**Purpose:** Centralized, searchable asset repository with versioning

**Key Features:**

- Upload design files (Figma, Sketch, Adobe files, images)
- Organize by category/project
- Version control (track revisions)
- Search & filter
- Public vs. internal assets
- Usage rights (who can use what)
- Download tracking
- Chat for asset discussions

**Data Model:**

```typescript
CREATE TABLE asset_library (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- "Icons", "Illustrations", "Photos", "Patterns"
  subcategory VARCHAR(100),
  file_type VARCHAR(50), -- figma, sketch, pdf, png, svg, ai
  file_url TEXT,
  file_size INTEGER,

  // Metadata
  tags TEXT[],
  created_by UUID,
  project_id UUID REFERENCES design_projects(id),

  // Versioning
  version INTEGER DEFAULT 1,
  version_history JSONB[], -- { version, created_at, created_by, change_log }

  // Permissions
  is_public BOOLEAN DEFAULT false,
  allowed_roles VARCHAR(50)[], -- ['Designer', 'PM'] or ['*'] for public

  // Usage tracking
  download_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP,
  used_in_projects UUID[],

  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE asset_downloads (
  id UUID PRIMARY KEY,
  asset_id UUID REFERENCES asset_library(id),
  downloaded_by UUID,
  version INTEGER,
  downloaded_at TIMESTAMP
);
```

**API Endpoints:**

```
POST   /api/v1/assets (upload)
GET    /api/v1/assets (list, searchable, filterable)
GET    /api/v1/assets/:id (get asset + metadata)
PUT    /api/v1/assets/:id (update metadata)
POST   /api/v1/assets/:id/upload-version (new version)
GET    /api/v1/assets/:id/versions (version history)
POST   /api/v1/assets/:id/download (track download)
GET    /api/v1/assets/:id/usage (which projects use this)
```

**Search Features:**

- Full-text search on name, description, tags
- Filter by category, type, project
- Filter by "public" / "internal"
- Sort by date, downloads, usage

---

### App 5-8: PM Cluster (Backlog, Sprint, Roadmap, Release)

These 4 apps form the core PM toolkit:

#### App 5: Backlog Manager

```typescript
// Backlog item = story + estimation + priority
CREATE TABLE backlog_items (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  project_id UUID,
  epic_id UUID, // Group related items
  story_points DECIMAL(4,1), // Fibonacci: 1, 2, 3, 5, 8, 13
  priority ENUM ('Critical', 'High', 'Medium', 'Low'),
  status ENUM ('Backlog', 'Ready', 'In Sprint', 'Done'),
  assigned_to UUID,
  depends_on UUID[], // IDs of other items this depends on
  acceptance_criteria TEXT[],
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

// Features:
- Backlog grooming (estimate, prioritize, add acceptance criteria)
- Dependency tracking (visualize critical path)
- Epic grouping (organize related stories)
- Bulk prioritization (drag & drop re-ordering)
- Chat per story (discuss requirements)
- Velocity tracking (how many points per sprint)
```

#### App 6: Sprint Planner

```typescript
CREATE TABLE sprints (
  id UUID PRIMARY KEY,
  project_id UUID,
  name VARCHAR(255), // "Sprint 12: Authentication"
  goal TEXT,
  start_date DATE,
  end_date DATE,
  status ENUM ('Planning', 'Active', 'Completed'),
  backlog_items UUID[], // items in this sprint
  capacity_hours DECIMAL(8,2), // team capacity
  team_members UUID[], // who's in this sprint
  created_at TIMESTAMP
);

// Features:
- Sprint planning (allocate stories, set capacity)
- Daily standup (auto-generated from task updates)
- Burndown chart (work remaining vs. time)
- Sprint velocity (points completed over time)
- Scope creep warnings (if over capacity)
- Retro notes (what went well, what to improve)
```

#### App 7: Roadmap

```typescript
CREATE TABLE roadmap_items (
  id UUID PRIMARY KEY,
  project_id UUID,
  title VARCHAR(255),
  description TEXT,
  quarter VARCHAR(10), // "Q3 2026"
  epic_id UUID,
  status ENUM ('Planned', 'In Progress', 'Launched', 'Cancelled'),
  depends_on UUID[],
  affects_kpi JSONB, // { kpi: "User Growth", expected_lift: "15%" }
  created_at TIMESTAMP
);

// Features:
- Quarterly planning (what ships when)
- Strategic narrative (why we're building this)
- Dependency visualization (critical path)
- KPI alignment (how does this move metrics)
- Stakeholder view (public, read-only)
- Historical tracking (what shipped when)
```

#### App 8: Release Manager

```typescript
CREATE TABLE releases (
  id UUID PRIMARY KEY,
  project_id UUID,
  version VARCHAR(50), // "1.2.3"
  status ENUM ('Planning', 'In QA', 'Ready', 'Shipped', 'Rolled Back'),
  scheduled_date DATE,
  shipped_date TIMESTAMP,
  features UUID[], // which backlog items are in this release
  hotfixes UUID[],
  changelog TEXT,
  release_notes TEXT,
  created_at TIMESTAMP
);

// Features:
- Release checklist (QA, documentation, announcement)
- Changelog auto-generation (from commits + issues)
- Release notes editor (customer-facing language)
- Go/No-go decision (who signs off)
- Rollback plan (how to revert)
- Post-release analytics (adoption, bugs)
```

---

## 💬 Communication Architecture (The Nervous System)

### Chat Model: Context + Global

**Global Channels:**

```
#announcements    - Company-wide updates
#design-feedback  - Design critique
#product          - Product strategy
#engineering      - Dev team
#client-updates   - For inviting clients
#general          - Watercooler
+ Custom channels per department
```

**Context Threads:**

```
task:123          → Chat about that task
design-project:456 → Design project discussion
handoff:789       → Design feedback
sprint:012        → Sprint planning discussion
roadmap:345       → Roadmap strategy
backlog:678       → Story refinement
```

### Message Model

```typescript
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  channel_id UUID REFERENCES channels(id),
  context_type VARCHAR(50), // 'task', 'design_project', 'sprint', null for global
  context_id UUID, // ID of the task/project/sprint if context_type set
  user_id UUID REFERENCES users(id),
  content TEXT,

  // Reactions & engagement
  reactions JSONB, // { "👍": [user_ids], "❤️": [user_ids] }
  thread_id UUID, // For reply threads
  reply_count INTEGER DEFAULT 0,

  // Visibility (critical for clients)
  visible_to_roles VARCHAR(50)[], // ['Designer', 'PM', 'Client'] or ['*']
  is_internal_only BOOLEAN DEFAULT false, // Clients can't see

  edited_at TIMESTAMP,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID,
  message_id UUID,
  type ENUM ('mention', 'reply', 'reaction', 'assignment'),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP
);
```

### Event Types (What Triggers Notifications)

```
Task Events:
- TaskCreated → Chat auto-log + notify assignee
- TaskAssigned → Notify user
- TaskCompleted → Notify creator
- TaskCommented → Notify watchers

Design Events:
- DesignProjectCreated → Notify team
- HandoffSubmitted → Notify reviewers
- ClientApproved → Notify designer
- AssetsUploaded → Notify team

PM Events:
- BacklogItemEstimated → Update roadmap
- SprintStarted → Send to channel
- SprintCompleted → Auto-generate retro
- ReleaseShipped → Send announcement

Chat Events:
- Mention → Notify mentioned user
- Reply → Notify reply author
- Reaction → Notify message author
```

### How Events Flow

```
1. Design submitted → DesignHandoffSubmitted event
2. Event bus publishes to:
   - Chat service → Log in #design-feedback
   - Notification service → Notify reviewers
   - Design project app → Update submission status
   - Client app → Show in project timeline
3. Client clicks notification → Opens chat in context
4. Client comments → CommentAdded event
5. Event triggers notification to designer
```

---

## 🛠️ App Manager Dashboard

**For Admins only**

### Features:

1. **App Inventory**
   - List all apps (13 total: 8 core + 5 new)
   - Turn on/off per role
   - Feature flags (early access, beta)
   - Usage metrics (daily active users, features used)

2. **Permission Matrix**

   ```
   Role      | Tasks | Design | Backlog | Chat | etc
   --------  |-------|--------|---------|------|-----
   Admin     |  ✓    |   ✓    |   ✓     |  ✓   | ✓
   Designer  |  ✓    |   ✓    |  RO     |  ✓   |
   PM        |  ✓    |  RO    |   ✓     |  ✓   |
   Client    |  X    |  RO    |  RO*    |  ✓*  | (* project-specific)
   ```

3. **User Management**
   - List internal users by role
   - List client profiles + team members
   - Invite new clients
   - Manage permissions per user
   - View activity (who logged in, when)

4. **Settings Per App**
   - Design Projects: Figma API key, sync frequency
   - Design Handoff: Approval workflow steps
   - Backlog: Story point scale, velocity tracking
   - Chat: Retention policy, channel naming
   - Etc.

5. **Audit Logs**
   - Who did what, when
   - Configuration changes
   - Client invitations accepted
   - Sensitive actions (deletes, permission changes)

---

## 🎭 Design History: Store Locally or Link to Figma?

### The Decision

**RECOMMENDATION: Store metadata locally, link to Figma for full files**

#### Why this hybrid approach:

1. **Store Locally:**
   - Project status & phase
   - Figma file list (name, thumbnail, last modified)
   - Design submissions & feedback
   - Version history (which Figma version was approved)
   - Design specs (generated from Figma)
   - Annotations & comments

2. **Link to Figma:**
   - Full design files (don't download full Figma files)
   - Real-time collaboration (always fresh)
   - Comments/version history (Figma source of truth)
   - Components (from Figma library)

#### Database Schema

```typescript
CREATE TABLE design_project_versions (
  id UUID PRIMARY KEY,
  design_project_id UUID,
  figma_file_id VARCHAR(255), // Reference to Figma
  figma_version_id VARCHAR(255), // Figma's version ID
  figma_modified_at TIMESTAMP, // When Figma was last modified

  // What we store locally
  thumbnail_url TEXT, // Figma export
  page_list JSONB, // [ { name, id } ] of Figma pages

  // Status
  design_phase ENUM (...),
  internal_status TEXT,
  is_approved BOOLEAN,
  approved_by UUID,
  approved_at TIMESTAMP,

  created_at TIMESTAMP,
  stored_at TIMESTAMP
);

CREATE TABLE figma_syncs (
  id UUID PRIMARY KEY,
  design_project_id UUID,
  sync_type ENUM ('auto', 'manual'),
  synced_at TIMESTAMP,
  files_found INTEGER,
  files_updated INTEGER,
  last_error TEXT
);
```

#### Sync Strategy

```
Every 6 hours (auto) OR on-demand (manual):
1. Call Figma API → Get file list + metadata
2. Compare with local design_project_versions
3. For NEW/UPDATED files:
   - Save metadata (name, modified_at, version_id)
   - Download thumbnail
   - Extract page list
4. Update design_project_versions table
5. Log sync result

When client/designer clicks on a file:
- Show local metadata + thumbnail
- "View in Figma" button → Opens figma.com/file/...
- Comments → Link to Figma (source of truth)
```

#### Benefits

| Aspect            | Local Storage                | Link to Figma           |
| ----------------- | ---------------------------- | ----------------------- |
| **Speed**         | Fast (cached)                | Load from Figma         |
| **Collaboration** | Old snapshot                 | Real-time, always fresh |
| **Comments**      | Cached locally               | Live in Figma           |
| **Storage**       | ~10MB per project (metadata) | Zero (link only)        |
| **Architecture**  | Complex (sync)               | Simple (redirect)       |
| **Client UX**     | "View in Figma" button       | Same (redirect)         |

---

## 🚀 Implementation Timeline

### Phase 1: Foundation (Weeks 1-4)

- Unified auth system (mediabubble.co + client invites)
- App Manager dashboard
- Chat infrastructure (global + context threads)
- Event bus setup

**Deliverable:** Auth + Chat + App Manager

### Phase 2: Design Tools (Weeks 5-8)

- Design Projects app (Figma sync)
- Design Handoff app
- Design System Manager
- Asset Library

**Deliverable:** All 4 design apps

### Phase 3: PM Tools (Weeks 9-12)

- Backlog Manager
- Sprint Planner
- Roadmap
- Release Manager

**Deliverable:** All 4 PM apps + client visibility

### Phase 4: Integration (Weeks 13-16)

- Event-driven communication
- Notification system
- Client onboarding
- Testing + optimization

**Deliverable:** Full ecosystem live

---

## 📊 Storage & Performance Estimates

### Users: 25 employees + 100 clients (across projects)

### Data Volume

| Entity                  | Count | Size        | Storage    |
| ----------------------- | ----- | ----------- | ---------- |
| Design projects         | 100   | ~500KB each | 50MB       |
| Design files (metadata) | 1,000 | ~50KB each  | 50MB       |
| Messages (chat history) | 100K  | ~5KB each   | 500MB      |
| Design feedback         | 5,000 | ~10KB each  | 50MB       |
| Backlog items           | 2,000 | ~5KB each   | 10MB       |
| Sprints (history)       | 100   | ~100KB each | 10MB       |
| **Total estimate**      | —     | —           | **~700MB** |

### Database Connections

- Peak concurrent: ~50 users
- Connection pool: 20-30 connections
- Cache (Redis): 1GB (messages, sessions, activity feeds)

---

## 🔒 Security Model

### Authentication

- JWT tokens (access + refresh)
- Secure password hashing (bcrypt)
- 2FA for admins (optional)
- Session timeout (8 hours)

### Authorization

- Role-based access control (RBAC)
- Project-level permissions (client can only see their projects)
- Feature toggles (turn off sensitive features for clients)
- Audit logs (all actions logged)

### Data Privacy

- Client data isolated (cannot see other clients)
- Internal-only comments hidden from clients
- Sensitive fields masked (budget, internal notes)
- GDPR-compliant deletion (cascade delete on request)

---

## 📱 Client Experience

### Onboarding

```
1. Admin invites client email
2. Client receives email → Clicks "Accept Invitation"
3. Client creates account (password only)
4. Client logs in → Sees projects they have access to
5. Client can:
   - View design project status
   - Leave feedback on design handoffs
   - See roadmap (public items only)
   - Chat in project channel
   - Download assets
6. Cannot:
   - See internal notes or discussions
   - Modify any content
   - Access other projects or teams
```

### Client Dashboard

```
Your Projects
├── [Project 1] Status: In Design Handoff
│   ├── View designs
│   ├── Leave feedback
│   └── Chat with team
├── [Project 2] Status: Roadmap Planning
│   ├── View roadmap (public items)
│   └── Chat with team
└── [Project 3] Status: Completed
    └── View assets
```

---

## 🎯 Success Metrics

| Metric                         | Target        | Timeline   |
| ------------------------------ | ------------- | ---------- |
| **Team adoption**              | 100% internal | Week 4     |
| **Design projects in system**  | 50/100        | Week 8     |
| **Client accounts created**    | 50/100        | Week 12    |
| **Chat messages**              | 10K/month     | Week 12    |
| **Design handoff submissions** | 100/month     | Week 8     |
| **Backlog items managed**      | 500+          | Week 12    |
| **Page load time**             | <2s           | Production |
| **Uptime**                     | 99.5%         | Production |

---

## 🎓 Next Steps

1. **Approval:** Review this spec with stakeholders
2. **Database:** Run LAUNCHER_DATABASE_SCHEMA.sql + add new tables
3. **Auth:** Implement unified auth + client profiles
4. **Phase 1:** Build App Manager + Chat infrastructure
5. **Phase 2:** Launch Design Projects + Handoff
6. **Iterate:** Gather feedback, refine UX

---

**Questions?** This is a living document — update as requirements evolve.

**Created:** June 19, 2026  
**Status:** Architecture Spec - Ready for Approval  
**Owner:** Dorgham + Development Team
