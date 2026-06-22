# launcher.mediabubble.co - Technical Roadmap

**Status:** Strategic Planning Phase  
**Date:** June 19, 2026  
**Owner:** Dorgham + Development Team  
**Vision:** Internal operations platform with modular AI-powered tools

---

## 🏗️ ARCHITECTURE OVERVIEW

### Current Stack (Existing)

- **Monorepo:** NX (v23.0.0)
- **Framework:** Next.js (v16.2.9)
- **Frontend:** React 18.2.0 + Tailwind CSS
- **Styling:** Radix UI + Lucide icons
- **i18n:** i18next (Arabic/English support)
- **Hosting:** Vercel
- **Apps:**
  - `apps/brand` - Brand guidelines hub
  - `apps/web-eg` - Egypt market site
  - `apps/web-ae` - UAE market site
- **Shared:** Design system, content pipeline, shared utilities

### Proposed New App (launcher.mediabubble.co)

```
launcher.mediabubble.co
├── /dashboard (Main hub)
├── /tasks (Task Management)
├── /performance (Employee Performance)
├── /time (Time Management)
├── /team (Collaboration Hub)
├── /ai (AI Tools Suite)
├── /prompts (Prompt Generator)
├── /chat (Communication Channel)
├── /automation (Workflow Automation)
└── /api/v1 (Backend APIs)
```

---

## 📋 CORE MODULES (Tool-by-Tool Breakdown)

### 1. **TASK MANAGEMENT APP** ✅

**Purpose:** Distributed task tracking across departments with real-time collaboration

#### Features:

- Create/assign tasks with priority levels (High/Medium/Low)
- Task templates by department
- Progress tracking (0-100%)
- Comments & attachments
- Deadline alerts & notifications
- Task history & audit logs
- Bulk actions (archive, reassign, close)

#### Database Schema:

```typescript
// Tasks
- id: UUID
- title: string
- description: text
- assignee_id: FK (users)
- created_by: FK (users)
- department: enum (9 departments)
- priority: enum (High/Medium/Low)
- status: enum (Backlog/In Progress/Review/Done)
- due_date: timestamp
- completed_at: timestamp
- estimated_hours: decimal
- actual_hours: decimal
- tags: string[]
- attachments: JSON[]
- created_at: timestamp
- updated_at: timestamp

// Task Comments
- id: UUID
- task_id: FK
- user_id: FK
- comment: text
- mentioned_users: UUID[]
- attachments: JSON[]
- created_at: timestamp

// Task Templates
- id: UUID
- name: string
- department: enum
- description: text
- default_priority: enum
- default_tags: string[]
- subtasks: JSON[]
- created_by: FK (users)
```

#### API Endpoints:

```
POST   /api/v1/tasks
GET    /api/v1/tasks
GET    /api/v1/tasks/:id
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
POST   /api/v1/tasks/:id/comments
GET    /api/v1/tasks/search?q=&department=&status=
GET    /api/v1/tasks/templates
POST   /api/v1/tasks/bulk-update
```

#### UI Components:

- Task board (Kanban view)
- List view with filters/sorting
- Task detail modal
- Task creation wizard
- Comment thread
- Attachment upload area
- Timeline/Gantt view (optional)

#### AI Integration:

- Smart task title suggestions
- Automatic priority recommendation based on description
- Duplicate detection
- Deadline risk alerts

---

### 2. **EMPLOYEE PERFORMANCE APP** 📊

**Purpose:** Track metrics, goals, reviews, and engagement by employee/department

#### Features:

- OKR (Objectives & Key Results) tracking
- 360° feedback management
- Performance reviews (quarterly/annual)
- KPI dashboards
- Goal tracking & progress
- Individual contributor metrics
- Department-level analytics
- Historical performance data

#### Database Schema:

```typescript
// Employees
- id: UUID
- user_id: FK (users)
- department: FK (departments)
- role: string
- manager_id: FK (employees)
- hire_date: date
- employment_status: enum (Active/Inactive/On Leave)
- salary_band: string
- created_at: timestamp

// Performance Reviews
- id: UUID
- employee_id: FK
- reviewer_id: FK
- review_period: date range
- rating: enum (Exceeds/Meets/Below)
- feedback: text
- goals_met: JSON[]
- areas_improvement: JSON[]
- created_at: timestamp

// OKRs
- id: UUID
- employee_id: FK
- objective: text
- key_results: JSON[] { metric, target, current }
- quarter: enum (Q1/Q2/Q3/Q4)
- year: integer
- status: enum (On Track/At Risk/Off Track)
- owner_id: FK
- created_at: timestamp

// KPIs
- id: UUID
- employee_id: FK
- metric_name: string
- value: decimal
- target: decimal
- period: enum (Daily/Weekly/Monthly/Quarterly)
- measured_at: timestamp
- source: enum (Manual/Automated)

// 360 Feedback
- id: UUID
- employee_id: FK
- reviewer_id: FK
- category: enum (Communication/Leadership/Technical/etc)
- rating: 1-5
- comment: text
- anonymous: boolean
- created_at: timestamp
```

#### API Endpoints:

```
POST   /api/v1/performance/reviews
GET    /api/v1/performance/reviews/:employee_id
PUT    /api/v1/performance/reviews/:id
POST   /api/v1/performance/okrs
GET    /api/v1/performance/okrs/:employee_id
POST   /api/v1/performance/kpis
GET    /api/v1/performance/kpis/:employee_id/metrics
GET    /api/v1/performance/360-feedback/:employee_id
POST   /api/v1/performance/360-feedback
GET    /api/v1/performance/department-analytics/:dept_id
```

#### UI Components:

- Performance dashboard
- Review form builder
- OKR tracker with progress bars
- KPI charts (line, bar, gauge)
- 360 feedback summary
- Historical comparison charts
- Employee profile card
- Department leaderboard

#### AI Integration:

- Performance insights & trends
- Anomaly detection in metrics
- Feedback sentiment analysis
- Auto-generated performance summaries
- Recommendation for improvement areas

---

### 3. **COLLABORATION HUB** 🤝

**Purpose:** Real-time team coordination, mentions, presence awareness

#### Features:

- User presence (Online/Away/Busy)
- Activity feed (Real-time updates)
- @ mentions system
- Task collaboration
- Shared notes/documents
- Team workspaces
- Permission management

#### Database Schema:

```typescript
// Collaborations
- id: UUID
- created_by: FK (users)
- title: string
- description: text
- members: UUID[]
- status: enum (Active/Archived)
- created_at: timestamp

// Activity Log
- id: UUID
- user_id: FK
- action: enum (created/updated/commented/assigned)
- entity_type: enum (task/document/comment)
- entity_id: UUID
- details: JSON
- timestamp: timestamp

// Presence
- user_id: FK (users)
- status: enum (Online/Away/Busy/Offline)
- last_seen: timestamp
- current_location: string (task/document/page)
- device: string

// Mentions
- id: UUID
- mentioned_user_id: FK
- mentioned_by: FK
- entity_type: enum
- entity_id: UUID
- context: text
- read: boolean
- created_at: timestamp
```

#### API Endpoints:

```
POST   /api/v1/collaboration/workspaces
GET    /api/v1/collaboration/workspaces
PUT    /api/v1/collaboration/workspaces/:id
POST   /api/v1/collaboration/members
GET    /api/v1/collaboration/activity-feed
POST   /api/v1/collaboration/mentions
GET    /api/v1/users/presence
POST   /api/v1/users/presence/update
GET    /api/v1/collaboration/mentions/unread
```

#### UI Components:

- Activity sidebar
- User presence indicator
- Team member list
- Workspace switcher
- Notification bell with count
- Mention notifications
- Real-time typing indicator
- Quick member search

#### AI Integration:

- Smart mention suggestions based on context
- Activity summarization
- Team health indicators
- Engagement metrics

---

### 4. **TIME MANAGEMENT APP** ⏰

**Purpose:** Scheduling, capacity planning, time tracking, availability management

#### Features:

- Calendar integration (Google Calendar sync)
- Time blocking
- Availability slots for meetings
- Time tracking (start/stop timers)
- Capacity planning by department
- Leave management
- Holiday management
- Workload distribution

#### Database Schema:

```typescript
// Time Entries
- id: UUID
- user_id: FK
- task_id: FK (optional)
- date: date
- start_time: timestamp
- end_time: timestamp
- duration_minutes: integer
- description: text
- billable: boolean
- status: enum (Draft/Submitted/Approved)
- created_at: timestamp

// Availability
- id: UUID
- user_id: FK
- date: date
- start_time: time
- end_time: time
- status: enum (Available/Busy/On Leave)
- created_at: timestamp

// Leave Requests
- id: UUID
- user_id: FK
- start_date: date
- end_date: date
- type: enum (Vacation/Sick/Personal/Other)
- reason: text
- approver_id: FK
- status: enum (Pending/Approved/Rejected)
- created_at: timestamp

// Capacity
- id: UUID
- user_id: FK
- week_start: date
- allocated_hours: decimal
- scheduled_hours: decimal
- utilization_percent: decimal
- calculated_at: timestamp

// Holiday Calendar
- id: UUID
- date: date
- name: string
- country: enum (Egypt/UAE)
- is_working_day: boolean
```

#### API Endpoints:

```
POST   /api/v1/time/entries
GET    /api/v1/time/entries/:user_id?date_range=
PUT    /api/v1/time/entries/:id
POST   /api/v1/time/availability
GET    /api/v1/time/availability/:user_id
POST   /api/v1/time/leave-requests
GET    /api/v1/time/capacity/:user_id?week=
GET    /api/v1/time/holidays?country=
POST   /api/v1/time/sync-calendar (Google Calendar)
```

#### UI Components:

- Calendar view (day/week/month)
- Time entry logger
- Availability selector
- Leave request form
- Capacity dashboard
- Workload heat map
- Time tracking timer
- Holiday calendar

#### AI Integration:

- Auto-logging based on calendar
- Optimal meeting time suggestions
- Workload prediction
- Burnout risk detection
- Time estimate recommendations

---

### 5. **AI TOOLS SUITE** 🤖

**Purpose:** Claude, Gemini integrations for content generation, analysis, automation

#### Features:

- AI content generation (blog posts, copy, social media)
- Document analysis
- Code generation & review
- Brainstorming sessions
- Content optimization
- Automated summarization
- SEO optimization suggestions
- Multi-language translation

#### Database Schema:

```typescript
// AI Requests
- id: UUID
- user_id: FK
- ai_provider: enum (Claude/Gemini/Both)
- request_type: enum (Content/Analysis/Code/etc)
- input_text: text
- output_text: text
- tokens_used: integer
- cost: decimal
- status: enum (Processing/Completed/Failed)
- created_at: timestamp

// AI Configurations
- id: UUID
- name: string
- provider: enum
- model: string
- temperature: decimal
- max_tokens: integer
- system_prompt: text
- created_by: FK
- is_public: boolean

// Saved Outputs
- id: UUID
- request_id: FK
- title: string
- content: text
- tags: string[]
- starred: boolean
- created_at: timestamp
```

#### API Endpoints:

```
POST   /api/v1/ai/generate/content
POST   /api/v1/ai/analyze/document
POST   /api/v1/ai/generate/code
POST   /api/v1/ai/brainstorm
POST   /api/v1/ai/optimize/seo
POST   /api/v1/ai/translate
GET    /api/v1/ai/requests/:user_id
GET    /api/v1/ai/outputs/:id
POST   /api/v1/ai/configs
GET    /api/v1/ai/configs
```

#### UI Components:

- AI playground
- Content generator form
- Document analyzer panel
- Code generation interface
- Brainstorm session board
- Output history
- Configuration manager
- Usage analytics

#### AI Integration:

- Claude API for text generation
- Gemini API for multi-modal
- Streaming responses
- Context preservation across sessions
- Usage tracking & cost monitoring

---

### 6. **PROMPT GENERATOR** 🎯

**Purpose:** Build, test, share, and version custom AI prompts with variable templating

#### Features:

- Prompt builder with template variables
- Prompt testing & version control
- Team prompt library
- Prompt performance metrics
- Category/tagging system
- Export & share prompts
- A/B testing prompts
- Usage analytics

#### Database Schema:

```typescript
// Prompts
- id: UUID
- name: string
- description: text
- category: string
- template: text (with {{variables}})
- variables: JSON[] { name, type, default, options }
- created_by: FK
- is_public: boolean
- version: integer
- status: enum (Draft/Active/Archived)
- created_at: timestamp

// Prompt Versions
- id: UUID
- prompt_id: FK
- version: integer
- template: text
- changes: text
- created_by: FK
- created_at: timestamp

// Prompt Execution
- id: UUID
- prompt_id: FK
- user_id: FK
- variables_used: JSON
- ai_provider: enum
- model: string
- input: text
- output: text
- rating: 1-5 (quality)
- execution_time_ms: integer
- cost: decimal
- created_at: timestamp

// Prompt Library
- id: UUID
- title: string
- description: text
- prompts: UUID[]
- owner: FK
- shared_with: UUID[]
- is_public: boolean
```

#### API Endpoints:

```
POST   /api/v1/prompts
GET    /api/v1/prompts
GET    /api/v1/prompts/:id
PUT    /api/v1/prompts/:id
POST   /api/v1/prompts/:id/versions
GET    /api/v1/prompts/:id/versions
POST   /api/v1/prompts/:id/test
GET    /api/v1/prompts/:id/analytics
POST   /api/v1/prompts/library
GET    /api/v1/prompts/search?category=&tag=
```

#### UI Components:

- Prompt editor
- Variable input form
- Test/debug panel
- Version history
- Analytics dashboard
- Library browser
- Prompt comparison tool
- Performance metrics chart

#### AI Integration:

- Live prompt testing with Claude/Gemini
- Suggestion engine for improvements
- Auto-categorization
- Performance optimization recommendations

---

### 7. **COMMUNICATION CHANNEL** 💬

**Purpose:** Internal messaging, team channels, announcements, video calls integration

#### Features:

- Direct messaging (1-on-1)
- Group channels
- Channel notifications
- Message search
- Pinned messages
- Threading & replies
- File sharing
- Emoji reactions
- @channel, @here mentions
- Slack/Teams integration (future)

#### Database Schema:

```typescript
// Channels
- id: UUID
- name: string
- description: text
- type: enum (Public/Private/Direct)
- created_by: FK
- members: UUID[]
- created_at: timestamp
- archived_at: timestamp (nullable)

// Messages
- id: UUID
- channel_id: FK
- user_id: FK
- content: text
- attachments: JSON[]
- reactions: JSON[] { emoji, users[] }
- thread_id: FK (nullable)
- edited_at: timestamp (nullable)
- deleted_at: timestamp (nullable)
- created_at: timestamp

// Notifications
- id: UUID
- user_id: FK
- channel_id: FK
- message_id: FK
- type: enum (Mention/Reply/Reaction)
- read: boolean
- created_at: timestamp
```

#### API Endpoints:

```
POST   /api/v1/channels
GET    /api/v1/channels
PUT    /api/v1/channels/:id
POST   /api/v1/channels/:id/members
POST   /api/v1/messages
GET    /api/v1/channels/:id/messages?limit=50&offset=0
PUT    /api/v1/messages/:id
DELETE /api/v1/messages/:id
POST   /api/v1/messages/:id/reactions
POST   /api/v1/messages/:id/replies
GET    /api/v1/notifications
POST   /api/v1/notifications/:id/mark-read
GET    /api/v1/messages/search?q=&channel_id=
```

#### UI Components:

- Channel sidebar
- Message input area
- Message list
- Reaction picker
- File upload area
- User mention dropdown
- Notification badge
- Search modal
- Thread panel

#### AI Integration:

- Message summarization
- Sentiment analysis
- Spam/toxicity detection
- Smart search suggestions
- Auto-reply for common questions

---

### 8. **WORKFLOW AUTOMATION** ⚡

**Purpose:** Zapier-style automation, triggers, actions, conditional logic for department workflows

#### Features:

- Visual workflow builder
- Triggers (task created, user mentioned, deadline reached)
- Actions (send message, update field, create task)
- Conditional logic (if/then/else)
- Workflow scheduling
- Error handling & retries
- Execution logs
- Template workflows
- Multi-step automation

#### Database Schema:

```typescript
// Workflows
- id: UUID
- name: string
- description: text
- trigger: JSON { type, conditions }
- steps: JSON[] { action, params, conditions }
- enabled: boolean
- created_by: FK
- last_executed_at: timestamp
- execution_count: integer
- success_count: integer
- created_at: timestamp

// Workflow Execution
- id: UUID
- workflow_id: FK
- triggered_by: FK
- trigger_data: JSON
- status: enum (Running/Completed/Failed)
- steps_executed: integer
- error_message: text (nullable)
- execution_time_ms: integer
- created_at: timestamp

// Workflow Templates
- id: UUID
- name: string
- category: enum (HR/Sales/Content/Operations)
- description: text
- workflow_config: JSON
- created_by: FK
- usage_count: integer
```

#### API Endpoints:

```
POST   /api/v1/workflows
GET    /api/v1/workflows
GET    /api/v1/workflows/:id
PUT    /api/v1/workflows/:id
DELETE /api/v1/workflows/:id
POST   /api/v1/workflows/:id/enable
POST   /api/v1/workflows/:id/test
GET    /api/v1/workflows/:id/executions
GET    /api/v1/workflows/templates
POST   /api/v1/workflows/triggers (list available)
POST   /api/v1/workflows/actions (list available)
```

#### UI Components:

- Workflow canvas (drag & drop)
- Trigger selector
- Action builder
- Condition editor
- Step connector
- Execution history
- Error details panel
- Template library
- Test mode UI

#### AI Integration:

- AI workflow suggestions
- Natural language workflow creation
- Automation optimization recommendations
- Bottleneck detection

---

## 🗄️ SHARED DATABASE LAYER

### Core Tables (Required for All Apps)

```typescript
// Users
- id: UUID (PK)
- email: string (UNIQUE)
- name: string
- avatar_url: string
- department_id: FK
- role: enum (Admin/Manager/Contributor/Viewer)
- created_at: timestamp
- updated_at: timestamp

// Departments
- id: UUID (PK)
- name: string
- description: text
- head_id: FK (users)
- team_members: UUID[]
- created_at: timestamp

// Audit Logs
- id: UUID (PK)
- user_id: FK
- entity_type: string
- entity_id: UUID
- action: enum (Create/Update/Delete)
- changes: JSON
- created_at: timestamp

// API Keys & Auth
- id: UUID (PK)
- user_id: FK
- key_hash: string (hashed)
- permissions: string[]
- expires_at: timestamp (nullable)
- created_at: timestamp

// Settings
- id: UUID (PK)
- user_id: FK (nullable, for global settings if null)
- key: string
- value: JSON
- updated_at: timestamp
```

---

## 🔌 INTEGRATION POINTS

### External Services

1. **Google Calendar** (Time Management)
   - Sync availability
   - Create meetings
   - Read events for time blocking

2. **Claude API** (AI Tools)
   - Content generation
   - Analysis
   - Code generation

3. **Gemini API** (AI Tools)
   - Multi-modal processing
   - Image analysis

4. **Email Service** (Notifications)
   - Transactional emails
   - Digests & summaries

5. **Slack/Teams** (Future - Communication)
   - Message sync
   - Notifications

6. **GitHub** (Performance, Automation)
   - Pull request metrics
   - Commit insights

---

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Weeks 1-4)

**Goal:** Core infrastructure & first two apps

1. **Setup launcher.mediabubble.co app in NX**
   - Create Next.js app: `apps/launcher`
   - Setup shared database models
   - Auth & session management
   - Role-based access control (RBAC)

2. **Database Design & Setup**
   - Design schema for all 8 apps
   - Setup database (PostgreSQL)
   - Create migrations
   - Setup connection pooling

3. **Backend API Foundation**
   - Create `/apps/launcher/api` routes
   - Setup middleware (auth, logging, error handling)
   - Create base repository pattern
   - Setup API documentation (OpenAPI/Swagger)

4. **Deploy Task Management App**
   - Create database models & migrations
   - Build API endpoints (CRUD)
   - Create UI components
   - Integration tests

5. **Deploy Time Management (Basic)**
   - Calendar backend
   - Time entry CRUD
   - Basic availability tracking

### Phase 2: Core Apps (Weeks 5-12)

**Goal:** Deploy remaining 6 apps with basic functionality

6. **Employee Performance App**
   - Review management
   - KPI tracking
   - Basic analytics

7. **Collaboration Hub**
   - Activity feeds
   - Mentions system
   - Workspace management

8. **AI Tools Suite**
   - Claude API integration
   - Content generation
   - Output management

9. **Prompt Generator**
   - Prompt CRUD
   - Testing interface
   - Library management

10. **Communication Channel**
    - Channels & messaging
    - Notifications
    - File uploads

11. **Workflow Automation**
    - Trigger system
    - Action builder
    - Execution engine

### Phase 3: Enhancement & Optimization (Weeks 13-16)

**Goal:** AI features, optimization, performance

12. **AI Enhancement Across Apps**
    - Smart suggestions (all apps)
    - Sentiment analysis (comms)
    - Anomaly detection (performance)
    - Auto-categorization (tasks)

13. **Advanced Features**
    - Workflow templates
    - 360 feedback
    - Department analytics
    - Gantt charts

14. **Performance & Scale**
    - Database optimization
    - Caching strategy
    - API rate limiting
    - Load testing

15. **Security Hardening**
    - Penetration testing
    - API security audit
    - Data encryption
    - Compliance checks

---

## 💾 TECH STACK DECISIONS

### Backend

- **Language:** Node.js/TypeScript
- **Framework:** Next.js API routes or Express.js
- **Database:** PostgreSQL (primary), Redis (caching)
- **ORM:** Prisma or TypeORM
- **Validation:** Zod or Joi
- **Logging:** Winston or Pino

### Frontend

- **Framework:** Next.js (existing)
- **UI Library:** Radix UI (existing)
- **Styling:** Tailwind CSS (existing)
- **State Management:** Zustand or TanStack Query
- **Real-time:** Socket.io or WebSockets
- **Charts:** Recharts or Chart.js

### AI Integration

- **Claude:** @anthropic-ai/sdk
- **Gemini:** @google/generative-ai

### DevOps

- **Hosting:** Vercel (existing)
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry or LogRocket
- **Testing:** Jest + Vitest
- **Deployment:** Vercel + database migrations

---

## 📊 ESTIMATED EFFORT & TIMELINE

| Phase       | Duration      | Team Size | Deliverables                        |
| ----------- | ------------- | --------- | ----------------------------------- |
| Foundation  | 4 weeks       | 2-3 devs  | Database, APIs, Task + Time apps    |
| Core Apps   | 8 weeks       | 3-4 devs  | 6 remaining apps                    |
| Enhancement | 4 weeks       | 2-3 devs  | AI features, optimization, security |
| **TOTAL**   | **~4 months** | **3-4**   | **8 fully functional apps**         |

---

## 🎯 SUCCESS METRICS

- **Adoption:** 100% of team using launcher in first month
- **Time Saved:** 20+ hours/week automation benefits
- **Uptime:** 99.9% platform availability
- **Performance:** <2s page load, <200ms API response
- **User Satisfaction:** >4.5/5 stars in feedback
- **Code Coverage:** >80% test coverage

---

## 🔮 Future Enhancements (Post-Launch)

1. **Mobile App** - React Native for iOS/Android
2. **Advanced Analytics** - BI dashboard with Metabase
3. **Slack/Teams Integration** - Native connectors
4. **Video Conferencing** - Jitsi integration
5. **Document Collaboration** - Real-time editing
6. **Project Portfolio Management** - Portfolio view
7. **Budget Tracking** - Financial integration
8. **Client Portal** - External access for clients
9. **ML Predictions** - Burnout, attrition forecasting
10. **API Marketplace** - Third-party integrations

---

## 📌 Next Steps

1. **Review & Approve Roadmap** - Get team alignment
2. **Setup Database** - PostgreSQL, migrations, seeds
3. **Create NX App** - `nx generate @nx/next:app launcher`
4. **Build API Foundation** - Auth, middleware, error handling
5. **Deploy First App** - Task Management MVP
6. **Iterate & Expand** - Follow phase roadmap

---

**Questions?** Let's refine the architecture and start building! 🚀
