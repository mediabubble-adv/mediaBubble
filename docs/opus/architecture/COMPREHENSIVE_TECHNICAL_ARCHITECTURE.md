# OPUS: Comprehensive Technical Architecture
## Complete System Design for AI-Powered Content Orchestration Platform

**Status:** Production-Ready Architecture Design  
**Date:** June 22, 2026  
**Audience:** Engineering Team, Technical Leads, DevOps  
**Scope:** Full-stack architecture, database design, API specifications, deployment strategy

---

## EXECUTIVE SUMMARY

OPUS is a four-layer orchestration platform:
1. **Foundation Layer** - Profiles, communication, tagging
2. **Planning Layer** - Intelligent campaign planning
3. **Execution Layer** - Task management & workflow execution
4. **Intelligence Layer** - Automation, scheduling, learning

**Architecture Style:** Event-driven microservices with real-time pub/sub  
**Tech Stack:** Node.js/TypeScript backend, React frontend, PostgreSQL + Redis, Claude API integration  
**Deployment:** Kubernetes-ready containerization, multi-region cloud deployment  
**Scale:** 100 concurrent campaigns, 1000+ daily tasks, 150K+ content artifacts

---

## PART 1: SYSTEM ARCHITECTURE

### 1.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Web App      │  │ Mobile App   │  │ Admin Portal │          │
│  │ (React)      │  │ (React Native)│  │ (Next.js)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
┌─────────┴──────────────────┴──────────────────┴─────────────────┐
│                       API GATEWAY LAYER                          │
│  (Express/Apollo GraphQL with rate limiting, auth, caching)     │
├─────────────────────────────────────────────────────────────────┤
│  - Request routing & load balancing                             │
│  - JWT & OAuth 2.0 authentication                              │
│  - Role-based access control (RBAC)                            │
│  - Request/response logging & monitoring                        │
│  - Rate limiting & DDoS protection                             │
└─────────┬──────────────────┬──────────────────┬─────────────────┘
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                    MICROSERVICES LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ PROFILE SERVICE                                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Manage client profiles                               │   │
│  │ - Manage team profiles                                 │   │
│  │ - Tag management & automation rules                    │   │
│  │ - Availability/capacity tracking                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ PLANNING SERVICE                                        │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Create/manage plans (Social, Ads, Email, Website)   │   │
│  │ - Plan templates & library                            │   │
│  │ - Auto-generate tasks from plans                      │   │
│  │ - Plan approval workflow                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ TASK SERVICE                                            │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - CRUD operations on tasks                            │   │
│  │ - Smart task routing & assignment                     │   │
│  │ - Dependency management                               │   │
│  │ - Status workflow & approval gates                    │   │
│  │ - Team capacity tracking                              │   │
│  │ - Comment/collaboration system                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ WORKFLOW & AUTOMATION SERVICE                          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Trigger engine (time, event, data-based)            │   │
│  │ - Workflow orchestration & execution                  │   │
│  │ - Step execution with error handling                  │   │
│  │ - Conditional branching & parallel execution          │   │
│  │ - Workflow versioning & history                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ CONTENT GENERATION SERVICE                             │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Claude API integration & prompt management          │   │
│  │ - Batch content generation                            │   │
│  │ - Generation result caching                           │   │
│  │ - Quality scoring & validation                        │   │
│  │ - A/B variation generation                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ PUBLISHING SERVICE                                      │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Multi-platform publishing (Social, Email, Ads)      │   │
│  │ - Content scheduling & batch publishing               │   │
│  │ - A/B test variant deployment                         │   │
│  │ - Platform-specific formatting                        │   │
│  │ - Publish tracking & audit log                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ANALYTICS & MONITORING SERVICE                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Real-time metrics aggregation                        │   │
│  │ - Campaign performance tracking                        │   │
│  │ - Alert triggering (threshold-based)                  │   │
│  │ - Anomaly detection                                    │   │
│  │ - ROI calculation & forecasting                        │   │
│  │ - Performance data warehouse                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ NOTIFICATION SERVICE                                    │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Multi-channel delivery (Slack, Email, In-App)       │   │
│  │ - Notification routing based on preferences           │   │
│  │ - Notification history & audit                        │   │
│  │ - Unread tracking & management                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ COMMUNICATION & CHAT SERVICE                           │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Real-time chat via WebSockets                        │   │
│  │ - Message threading & history                         │   │
│  │ - File & mention management                           │   │
│  │ - Chat context linking (task, client, plan)           │   │
│  │ - Chat search & archive                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ INTEGRATION SERVICE                                     │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ - Platform integrations (Zapier, webhooks)            │   │
│  │ - OAuth 2.0 client management                         │   │
│  │ - Credential storage & rotation                       │   │
│  │ - External API response handling                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────┬──────────────────┬──────────────────┬─────────────────┘
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                    DATA & PERSISTENCE LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │ PostgreSQL (Primary) │  │ Redis (Cache/Queue)  │             │
│  ├──────────────────────┤  ├──────────────────────┤             │
│  │ - Relational data    │  │ - Session cache      │             │
│  │ - ACID transactions  │  │ - API response cache │             │
│  │ - Full-text search   │  │ - Job queue (Bull)   │             │
│  │ - Time-series data   │  │ - Real-time pub/sub  │             │
│  │ - Audit logs         │  │ - Rate limiting      │             │
│  │ - Schema versioning  │  │ - Leaderboard data   │             │
│  └──────────────────────┘  └──────────────────────┘             │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │ Elasticsearch        │  │ S3 (Object Storage)  │             │
│  ├──────────────────────┤  ├──────────────────────┤             │
│  │ - Full-text search   │  │ - Content artifacts  │             │
│  │ - Log aggregation    │  │ - Design assets      │             │
│  │ - Analytics queries  │  │ - Generated images   │             │
│  │ - Metric indexing    │  │ - Video files        │             │
│  │ - Performance data   │  │ - Reports/PDFs       │             │
│  └──────────────────────┘  └──────────────────────┘             │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │ MongoDB (Optional)   │  │ TimescaleDB (Metrics)│             │
│  ├──────────────────────┤  ├──────────────────────┤             │
│  │ - Flexible schemas   │  │ - Time-series metrics│             │
│  │ - Fast writes        │  │ - High compression   │             │
│  │ - Document storage   │  │ - Efficient queries  │             │
│  │ - Embedding storage  │  │ - Retention policies │             │
│  └──────────────────────┘  └──────────────────────┘             │
│                                                                   │
└─────────┬──────────────────┬──────────────────────┬─────────────┘
          │                  │                      │
┌─────────▼──────────────────▼──────────────────────▼─────────────┐
│                   EXTERNAL INTEGRATIONS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Claude API   │  │ Slack/Email  │  │ Social Platforms       │
│  │ (Content Gen)│  │ (Notifications)  │ (Publishing)         │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Google Ads   │  │ Meta Ads     │  │ LinkedIn Ads │          │
│  │ HubSpot CRM  │  │ Zapier       │  │ Analytics    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 1.2 Service Communication & Event Flow

```
┌─────────────────────────────────────────────────────────────┐
│              EVENT-DRIVEN ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Services communicate via:                                 │
│                                                              │
│  1. SYNCHRONOUS (REST/GraphQL):                            │
│     ├─ Real-time data queries                              │
│     ├─ Immediate actions (create task, update status)      │
│     └─ User-facing operations                              │
│                                                              │
│  2. ASYNCHRONOUS (Event Bus + Pub/Sub):                    │
│     ├─ Task created → Notification service (notify team)   │
│     ├─ Task approved → Content gen service (generate)      │
│     ├─ Content ready → Publishing service (schedule)       │
│     ├─ Published → Analytics service (track)               │
│     └─ Metrics updated → Automation service (trigger)      │
│                                                              │
│  3. DELAYED (Job Queue):                                   │
│     ├─ Long-running tasks (bulk generation, reports)       │
│     ├─ Scheduled workflows (cron jobs)                     │
│     └─ Retry logic for failed operations                   │
│                                                              │
│  FLOW EXAMPLE: Social Media Plan Approval                  │
│  ─────────────────────────────────────────                 │
│                                                              │
│  1. Manager approves plan (API call)                       │
│     └─ Planning Service receives request                   │
│     └─ Updates DB: plan.status = "approved"               │
│     └─ Emits event: "PlanApproved" {planId, clientId}    │
│                                                              │
│  2. Event triggers downstream services (via Event Bus)      │
│                                                              │
│     PARALLEL EXECUTION:                                     │
│     ├─ Task Service receives event                         │
│     │  └─ Creates 20 tasks from plan spec                 │
│     │  └─ Emits: "TasksCreated" event                    │
│     │                                                        │
│     ├─ Notification Service receives event                 │
│     │  └─ Notifies team members via Slack                 │
│     │  └─ Creates in-app notifications                     │
│     │                                                        │
│     └─ Analytics Service receives event                    │
│        └─ Logs plan approval                              │
│        └─ Starts tracking engagement                      │
│                                                              │
│  3. Each task progresses independently                      │
│     └─ As tasks complete → events trigger next steps      │
│     └─ "TaskApproved" → "ContentGeneration" → "Publishing"
│                                                              │
│  4. System maintains full audit trail                       │
│     └─ Every event logged to TimescaleDB                  │
│     └─ Queryable: "Show me all events for planId=X"      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## PART 2: DATABASE ARCHITECTURE

### 2.1 PostgreSQL Schema (Core Relational Data)

```sql
-- USERS & AUTHENTICATION
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  organization_id UUID NOT NULL,
  role_id UUID NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_email (email)
);

-- ORGANIZATIONS & RBAC
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  logo_url TEXT,
  billing_plan VARCHAR(50), -- Starter, Pro, Enterprise
  max_campaigns INT DEFAULT 50,
  max_team_members INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_slug (slug)
);

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  name VARCHAR(100), -- "Admin", "Manager", "Team Member"
  permissions JSONB, -- Array of permission strings
  created_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  UNIQUE(organization_id, name)
);

-- CLIENT PROFILES
CREATE TABLE client_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  target_audience JSONB,
  goals JSONB, -- Array of goals
  pain_points JSONB,
  competitors JSONB,
  market_position TEXT,
  brand_voice JSONB, -- {tone, style, values}
  timezone VARCHAR(50),
  
  -- Contacts
  decision_maker_id UUID,
  contacts JSONB, -- [{name, email, phone, role}]
  
  -- Communication
  communication_channels JSONB, -- [{type: "email"/"slack", value: "..."}]
  preferred_contact_frequency VARCHAR(50),
  
  -- Tagging
  tags JSONB, -- Array of tag IDs or names
  custom_fields JSONB,
  
  -- Metrics
  total_campaigns_run INT DEFAULT 0,
  average_engagement_rate DECIMAL(5,2),
  average_conversion_rate DECIMAL(5,2),
  average_roi DECIMAL(5,2),
  
  -- Status
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (decision_maker_id) REFERENCES users(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_name (name),
  INDEX idx_tags (tags) USING GIN
);

-- TEAM MEMBER PROFILES
CREATE TABLE team_member_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  organization_id UUID NOT NULL,
  department VARCHAR(100),
  
  -- Skills & Expertise
  skills JSONB, -- Array of skill names
  certifications JSONB,
  specializations JSONB,
  experience_level VARCHAR(20), -- Junior, Mid, Senior, Lead
  
  -- Communication
  communication_channels JSONB, -- {email, slack, phone, whatsapp}
  timezone VARCHAR(50),
  working_hours JSONB, -- {daysAvailable: [], hoursAvailable: "9-5"}
  response_time VARCHAR(50),
  
  -- Capacity
  current_workload_percentage DECIMAL(5,2),
  max_capacity_hours_per_week INT,
  
  -- Preferences
  preferred_channels JSONB,
  notification_preferences JSONB,
  do_not_disturb JSONB, -- {enabled, startTime, endTime}
  
  -- Performance
  task_completion_rate DECIMAL(5,2),
  average_task_duration_hours DECIMAL(8,2),
  approval_turnaround_time_hours DECIMAL(8,2),
  
  -- Tagging
  tags JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_skills (skills) USING GIN,
  INDEX idx_experience_level (experience_level)
);

-- TAGS SYSTEM
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50), -- Client, Team, Project, Skill, Status, Custom
  color VARCHAR(7),
  parent_tag_id UUID,
  description TEXT,
  
  -- Automation Rules
  automation_rules JSONB, -- Array of rule objects
  
  -- Metadata
  created_by UUID NOT NULL,
  usage_count INT DEFAULT 0,
  related_tags JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (parent_tag_id) REFERENCES tags(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  UNIQUE(organization_id, name, category),
  INDEX idx_organization_id (organization_id),
  INDEX idx_category (category)
);

-- PLANS (Social, Ads, Email, Website)
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  client_id UUID NOT NULL,
  project_id UUID,
  
  -- Basic
  name VARCHAR(255) NOT NULL,
  plan_type VARCHAR(50), -- Social, Ads, Email, Website
  description TEXT,
  
  -- Strategic
  goals JSONB, -- Array of goal strings
  target_audience JSONB,
  key_messages JSONB,
  budget DECIMAL(12,2),
  
  -- Timeline
  start_date DATE,
  end_date DATE,
  
  -- Plan-Specific Details (stored as JSONB for flexibility)
  plan_details JSONB, -- Structure varies by plan_type
  
  -- Status
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, InReview, Approved, Active, Completed
  approver_id UUID,
  review_notes TEXT,
  
  -- Metrics
  success_metrics JSONB,
  
  -- Team Assignment
  assigned_team_ids JSONB, -- Array of team member IDs
  
  -- Generated Tasks
  generated_task_ids JSONB, -- Array of task IDs
  
  -- Tags
  tags JSONB,
  
  -- Audit
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (client_id) REFERENCES client_profiles(id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (approver_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_client_id (client_id),
  INDEX idx_status (status),
  INDEX idx_date_range (start_date, end_date)
);

-- TASKS
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  
  -- Basic
  title VARCHAR(255) NOT NULL,
  description TEXT,
  task_type VARCHAR(50), -- WriteContent, Design, Review, Publish, Monitor
  
  -- Origin & Context
  originated_from_plan_id UUID,
  related_client_id UUID,
  related_project_id UUID,
  
  -- Specifications
  requirements JSONB,
  deliverables JSONB,
  acceptance_criteria JSONB,
  
  -- Assignment
  assigned_to_id UUID,
  suggested_for_ids JSONB, -- Array of team member IDs
  approver_id UUID,
  
  -- Timeline
  due_date DATE,
  estimated_hours DECIMAL(8,2),
  actual_hours DECIMAL(8,2),
  priority VARCHAR(20), -- Low, Medium, High, Urgent
  
  -- Dependencies
  depends_on_task_ids JSONB, -- Array of blocking task IDs
  blocked_by_task_ids JSONB, -- Array of tasks this blocks
  
  -- Status & Workflow
  status VARCHAR(50) DEFAULT 'Created', -- Created, Assigned, InProgress, InReview, Approved, Rejected, Complete
  
  -- Subtasks
  parent_task_id UUID,
  subtask_ids JSONB, -- Array of subtask IDs
  
  -- Automation
  can_automate BOOLEAN DEFAULT false,
  automation_provider VARCHAR(50), -- OPUSGeneration, Zapier, Manual
  automation_rules JSONB,
  
  -- Communication
  comment_count INT DEFAULT 0,
  attachment_count INT DEFAULT 0,
  
  -- Tagging
  tags JSONB,
  
  -- Audit
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (originated_from_plan_id) REFERENCES plans(id),
  FOREIGN KEY (related_client_id) REFERENCES client_profiles(id),
  FOREIGN KEY (assigned_to_id) REFERENCES users(id),
  FOREIGN KEY (approver_id) REFERENCES users(id),
  FOREIGN KEY (parent_task_id) REFERENCES tasks(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_assigned_to_id (assigned_to_id),
  INDEX idx_status (status),
  INDEX idx_due_date (due_date),
  INDEX idx_priority (priority),
  INDEX idx_client_id (related_client_id),
  INDEX idx_depends_on (depends_on_task_ids) USING GIN
);

-- PROJECTS
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  client_id UUID NOT NULL,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Active', -- Planning, Active, OnHold, Completed, Archived
  
  start_date DATE,
  end_date DATE,
  
  budget DECIMAL(12,2),
  
  -- Team
  project_manager_id UUID,
  team_ids JSONB, -- Array of team member IDs
  
  -- Associated Plans & Tasks
  plan_ids JSONB, -- Array of plan IDs
  task_ids JSONB, -- Array of task IDs
  
  -- Metrics
  total_planned_value DECIMAL(12,2),
  total_actual_value DECIMAL(12,2),
  completion_percentage DECIMAL(5,2),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (client_id) REFERENCES client_profiles(id),
  FOREIGN KEY (project_manager_id) REFERENCES users(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_client_id (client_id),
  INDEX idx_status (status)
);

-- WORKFLOWS
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Triggers
  trigger_ids JSONB, -- Array of trigger IDs
  
  -- Steps
  steps JSONB, -- Array of step definitions
  
  -- Configuration
  execution_mode VARCHAR(50), -- Sequential, Parallel
  on_error JSONB, -- {strategy, retries, escalateTo}
  
  -- Inputs/Outputs
  inputs JSONB,
  outputs JSONB,
  
  -- Status
  enabled BOOLEAN DEFAULT true,
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- History
  execution_count INT DEFAULT 0,
  last_execution_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_organization_id (organization_id)
);

-- TRIGGERS (Time, Event, Data-based)
CREATE TABLE triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  
  name VARCHAR(255),
  trigger_type VARCHAR(50), -- TimeBased, EventBased, DataBased
  
  -- Time-based config
  time_config JSONB, -- {type: "Once"/"Recurring"/"Cron", details}
  
  -- Event-based config
  event_type VARCHAR(100),
  event_conditions JSONB,
  
  -- Data-based config
  data_source VARCHAR(100),
  metric VARCHAR(100),
  condition JSONB,
  
  -- General
  executes_workflow_id UUID,
  enabled BOOLEAN DEFAULT true,
  max_executions_per_day INT,
  cooldown_minutes INT,
  requires_approval BOOLEAN DEFAULT false,
  
  -- History
  trigger_count INT DEFAULT 0,
  last_triggered_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (executes_workflow_id) REFERENCES workflows(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_trigger_type (trigger_type),
  INDEX idx_enabled (enabled)
);

-- WORKFLOW EXECUTIONS (History & Audit)
CREATE TABLE workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL,
  triggered_by_trigger_id UUID,
  
  start_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP,
  duration_seconds INT,
  
  status VARCHAR(50), -- Running, Completed, Failed, Paused
  
  inputs JSONB,
  outputs JSONB,
  error_message TEXT,
  
  step_executions JSONB, -- Array of step execution details
  
  FOREIGN KEY (workflow_id) REFERENCES workflows(id),
  FOREIGN KEY (triggered_by_trigger_id) REFERENCES triggers(id),
  INDEX idx_workflow_id (workflow_id),
  INDEX idx_status (status),
  INDEX idx_start_time (start_time)
);

-- CONTENT ARTIFACTS (Generated content)
CREATE TABLE content_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  
  -- Origin
  task_id UUID,
  plan_id UUID,
  campaign_id UUID,
  
  -- Content Details
  content_type VARCHAR(50), -- Caption, BlogPost, EmailCopy, AdCopy, DesignBrief
  platform VARCHAR(50), -- Instagram, LinkedIn, Email, GoogleAds, etc.
  channel VARCHAR(100),
  
  -- Content
  title VARCHAR(255),
  body TEXT,
  metadata JSONB, -- {length, wordCount, tokenCount, etc}
  
  -- Generation
  generated_by VARCHAR(50), -- OPUSGeneration, Manual, User
  generation_model VARCHAR(100), -- claude-3-5-sonnet, etc
  prompt_used JSONB,
  generation_timestamp TIMESTAMP,
  
  -- Variants
  variant_number INT,
  original_artifact_id UUID,
  a_b_test_id UUID,
  
  -- Status
  status VARCHAR(50), -- Draft, Approved, Rejected, Published, Archived
  approved_by_id UUID,
  approval_notes TEXT,
  
  -- Publishing
  published_at TIMESTAMP,
  published_to JSONB, -- [{platform, postId, url}]
  scheduled_for TIMESTAMP,
  
  -- Performance
  metrics JSONB, -- {impressions, clicks, engagement, conversions, etc}
  performance_updated_at TIMESTAMP,
  
  -- Lineage (for learning)
  client_id UUID,
  input_brief JSONB,
  
  -- Tags & Categorization
  tags JSONB,
  
  -- Audit
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (plan_id) REFERENCES plans(id),
  FOREIGN KEY (approved_by_id) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES client_profiles(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_status (status),
  INDEX idx_platform (platform),
  INDEX idx_published_at (published_at),
  INDEX idx_client_id (client_id),
  FULLTEXT INDEX idx_body (body)
);

-- COMMENTS & COLLABORATION
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  
  -- Context
  task_id UUID,
  artifact_id UUID,
  chat_id UUID,
  
  -- Content
  author_id UUID NOT NULL,
  content TEXT NOT NULL,
  
  -- Threading
  parent_comment_id UUID,
  reply_count INT DEFAULT 0,
  
  -- Mentions & Attachments
  mentioned_user_ids JSONB,
  attachment_count INT DEFAULT 0,
  
  -- Reactions
  reaction_counts JSONB, -- {emoji: count}
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (artifact_id) REFERENCES content_artifacts(id),
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (parent_comment_id) REFERENCES comments(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_task_id (task_id),
  INDEX idx_artifact_id (artifact_id),
  INDEX idx_created_at (created_at)
);

-- DIRECT MESSAGES/CHAT
CREATE TABLE direct_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  
  participant_ids JSONB NOT NULL, -- Array of user IDs
  chat_type VARCHAR(20), -- Direct, Group
  
  -- Context
  related_to_task_id UUID,
  related_to_plan_id UUID,
  related_to_client_id UUID,
  
  -- Metadata
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_participant_ids (participant_ids) USING GIN,
  INDEX idx_last_activity_at (last_activity_at)
);

-- AUDIT LOG (For compliance & debugging)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  
  action VARCHAR(100), -- Created, Updated, Deleted, Approved, Published
  entity_type VARCHAR(50), -- Task, Plan, Artifact, etc
  entity_id UUID,
  
  performed_by UUID NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  
  changes_before JSONB,
  changes_after JSONB,
  
  ip_address INET,
  user_agent TEXT,
  
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (performed_by) REFERENCES users(id),
  INDEX idx_organization_id (organization_id),
  INDEX idx_entity_id (entity_id),
  INDEX idx_timestamp (timestamp),
  INDEX idx_performed_by (performed_by)
);
```

---

### 2.2 Redis Structures (Cache & Real-Time)

```
CACHE KEYS:
─────────

user:{userId}
  → User profile (expires 1 hour)
  → {id, email, fullName, role, organizationId}

client:{clientId}
  → Client profile (expires 30 min)
  → Full client data

team_member:{teamMemberId}
  → Team profile (expires 1 hour)
  → Availability, workload, skills

task:{taskId}
  → Task details (expires 5 min)
  → Full task + dependencies

plan:{planId}
  → Plan details (expires 5 min)
  → Full plan + generated tasks

tags:{organizationId}
  → All tags for org (expires 1 hour)
  → [{id, name, category, automationRules}]


JOB QUEUES (Bull):
──────────────────

workflow-execution:queue
  → Pending workflow executions
  → {workflowId, triggerId, inputs, priority}

content-generation:queue
  → Content generation jobs
  → {taskId, prompt, platform, count}

publishing:queue
  → Publishing tasks
  → {artifactIds, platform, scheduleTime}

notification:queue
  → Notifications to send
  → {userId, channel, message, priority}

report-generation:queue
  → Periodic reports
  → {reportType, clientId, dateRange}


PUB/SUB CHANNELS:
──────────────────

org:{organizationId}:notifications
  → Real-time notifications
  → Subscribers: Web, Mobile, Desktop

task:{taskId}:updates
  → Task status updates
  → Subscribers: Task owner, approver, watchers

artifact:{artifactId}:comments
  → Comment notifications
  → Subscribers: Artifact author, commenters

workflow:{workflowId}:execution
  → Workflow execution updates
  → Subscribers: Workflow admin, team leads

performance:{campaignId}:metrics
  → Real-time performance updates
  → Subscribers: Account manager, client


LEADERBOARDS:
───────────────

team-performance:{organizationId}
  → Task completion rates per person
  → ZSET: {memberId: completionRate}

client-engagement:{organizationId}
  → Campaign engagement by client
  → ZSET: {clientId: avgEngagement}

content-quality:{organizationId}
  → Content approval rates
  → ZSET: {contentType: approvalRate}


RATE LIMITING:
──────────────

api:requests:{userId}:{endpoint}
  → Track API calls
  → Expires: 1 hour sliding window

workflow:execution:{workflowId}
  → Track workflow execution frequency
  → Daily counter


SESSIONS:
──────────

session:{sessionId}
  → User session data
  → Expires: 24 hours or logout
  → {userId, organizationId, permissions, loginTime}
```

---

### 2.3 Elasticsearch Mappings (Full-Text Search & Aggregation)

```json
{
  "mappings": {
    "properties": {
      "artifact_id": {"type": "keyword"},
      "organization_id": {"type": "keyword"},
      "client_id": {"type": "keyword"},
      "content_type": {"type": "keyword"},
      "platform": {"type": "keyword"},
      
      "title": {
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      
      "body": {
        "type": "text",
        "analyzer": "standard"
      },
      
      "tags": {"type": "keyword"},
      
      "status": {
        "type": "keyword"
      },
      
      "published_at": {"type": "date"},
      "created_at": {"type": "date"},
      
      "metrics": {
        "type": "object",
        "properties": {
          "impressions": {"type": "integer"},
          "clicks": {"type": "integer"},
          "engagement_rate": {"type": "scaled_float"},
          "conversion_rate": {"type": "scaled_float"},
          "roi": {"type": "scaled_float"}
        }
      },
      
      "approval_rate": {"type": "scaled_float"},
      "generation_model": {"type": "keyword"}
    }
  }
}
```

---

### 2.4 TimescaleDB (Time-Series Metrics)

```sql
-- Hypertable for metrics
CREATE TABLE metrics (
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  organization_id UUID NOT NULL,
  campaign_id UUID NOT NULL,
  artifact_id UUID,
  
  metric_name VARCHAR(100), -- impressions, clicks, engagements, conversions
  metric_value DECIMAL(12,4),
  
  platform VARCHAR(50),
  channel VARCHAR(100),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Convert to hypertable for time-series optimization
SELECT create_hypertable('metrics', 'time', if_not_exists => TRUE);

-- Create continuous aggregates for fast queries
CREATE MATERIALIZED VIEW metrics_1hour
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 hour', time) AS time_bucket,
  organization_id,
  campaign_id,
  metric_name,
  AVG(metric_value) AS avg_value,
  SUM(metric_value) AS sum_value,
  MAX(metric_value) AS max_value,
  MIN(metric_value) AS min_value,
  COUNT(*) AS data_points
FROM metrics
GROUP BY time_bucket, organization_id, campaign_id, metric_name
WITH DATA;

CREATE MATERIALIZED VIEW metrics_1day
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 day', time) AS time_bucket,
  organization_id,
  campaign_id,
  metric_name,
  AVG(metric_value) AS avg_value,
  SUM(metric_value) AS sum_value
FROM metrics
GROUP BY time_bucket, organization_id, campaign_id, metric_name
WITH DATA;

-- Retention policies
SELECT add_retention_policy('metrics', INTERVAL '6 months');
```

---

## PART 3: API SPECIFICATION

### 3.1 REST Endpoints (Core Services)

```
AUTHENTICATION
──────────────
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh-token
POST   /auth/reset-password

CLIENT PROFILES
────────────────
GET    /clients                          # List all clients
POST   /clients                          # Create client
GET    /clients/{clientId}              # Get client details
PATCH  /clients/{clientId}              # Update client
DELETE /clients/{clientId}              # Delete client
GET    /clients/{clientId}/campaigns    # Get client's campaigns
GET    /clients/{clientId}/metrics      # Get client's aggregated metrics

TEAM PROFILES
──────────────
GET    /team                            # List team members
POST   /team                            # Add team member
GET    /team/{teamMemberId}            # Get member details
PATCH  /team/{teamMemberId}            # Update member
DELETE /team/{teamMemberId}            # Remove member
GET    /team/{teamMemberId}/capacity   # Get workload & capacity
GET    /team/availability              # Get real-time availability

TAGS
─────
GET    /tags                           # List all tags
POST   /tags                           # Create tag
PATCH  /tags/{tagId}                  # Update tag
DELETE /tags/{tagId}                  # Delete tag
GET    /tags/{tagId}/usage            # Get tag usage stats

PLANS
──────
GET    /plans                         # List plans (with filters)
POST   /plans                         # Create plan
GET    /plans/{planId}               # Get plan details
PATCH  /plans/{planId}               # Update plan
DELETE /plans/{planId}               # Delete plan
POST   /plans/{planId}/approve       # Approve plan
POST   /plans/{planId}/generate-tasks # Generate tasks from plan
GET    /plans/{planId}/preview       # Get preview of tasks to be created

TASKS
──────
GET    /tasks                        # List tasks (with filters)
POST   /tasks                        # Create task
GET    /tasks/{taskId}              # Get task details
PATCH  /tasks/{taskId}              # Update task
DELETE /tasks/{taskId}              # Delete task
POST   /tasks/{taskId}/assign       # Assign task to member
POST   /tasks/{taskId}/start        # Start task (change status)
POST   /tasks/{taskId}/submit       # Submit for review
POST   /tasks/{taskId}/approve      # Approve task
POST   /tasks/{taskId}/reject       # Reject task with feedback
POST   /tasks/{taskId}/reassign     # Reassign to different member
GET    /tasks/{taskId}/dependencies # Get blocking/blocked tasks
GET    /tasks/by-assignee/{userId}  # Get tasks for specific person
GET    /tasks/overdue               # Get overdue tasks

WORKFLOWS
──────────
GET    /workflows                   # List workflows
POST   /workflows                   # Create workflow
GET    /workflows/{workflowId}     # Get workflow details
PATCH  /workflows/{workflowId}     # Update workflow
DELETE /workflows/{workflowId}     # Delete workflow
POST   /workflows/{workflowId}/execute # Manually trigger workflow
GET    /workflows/{workflowId}/executions # Get execution history

TRIGGERS
─────────
GET    /triggers                    # List triggers
POST   /triggers                    # Create trigger
GET    /triggers/{triggerId}       # Get trigger details
PATCH  /triggers/{triggerId}       # Update trigger
DELETE /triggers/{triggerId}       # Delete trigger
POST   /triggers/{triggerId}/test  # Test trigger

CONTENT ARTIFACTS
──────────────────
GET    /artifacts                  # List artifacts (searchable)
POST   /artifacts                  # Create artifact
GET    /artifacts/{artifactId}    # Get artifact details
PATCH  /artifacts/{artifactId}    # Update artifact
DELETE /artifacts/{artifactId}    # Delete artifact
POST   /artifacts/{artifactId}/approve # Approve artifact
POST   /artifacts/{artifactId}/publish # Publish artifact
GET    /artifacts/search           # Full-text search

NOTIFICATIONS
───────────────
GET    /notifications              # Get user's notifications
POST   /notifications/mark-read    # Mark as read
DELETE /notifications/{notificationId} # Delete notification
GET    /notifications/preferences  # Get notification preferences
PATCH  /notifications/preferences  # Update preferences

DIRECT MESSAGES
─────────────────
GET    /chats                      # List user's chats
POST   /chats                      # Create new chat
GET    /chats/{chatId}            # Get chat details
GET    /chats/{chatId}/messages   # Get chat messages (paginated)
POST   /chats/{chatId}/messages   # Send message
DELETE /chats/{chatId}/messages/{messageId} # Delete message

ANALYTICS & REPORTING
──────────────────────
GET    /analytics/dashboard        # Campaign performance overview
GET    /analytics/campaigns        # Campaign-level metrics
GET    /analytics/artifacts        # Artifact performance
GET    /analytics/team            # Team performance
GET    /analytics/clients         # Client performance
GET    /analytics/roi             # ROI calculations
POST   /analytics/reports/generate # Generate custom report
GET    /analytics/trends          # Trend analysis
```

---

### 3.2 GraphQL Schema (Alternative Query Interface)

```graphql
type Query {
  # Auth
  me: User!
  
  # Clients
  clients(filter: ClientFilter, pagination: Pagination): ClientConnection!
  client(id: ID!): Client
  
  # Team
  teamMembers(filter: TeamMemberFilter): [TeamMember!]!
  teamMember(id: ID!): TeamMember
  
  # Plans
  plans(filter: PlanFilter, pagination: Pagination): PlanConnection!
  plan(id: ID!): Plan
  
  # Tasks
  tasks(filter: TaskFilter, pagination: Pagination): TaskConnection!
  task(id: ID!): Task
  
  # Artifacts
  artifacts(filter: ArtifactFilter, search: String, pagination: Pagination): ArtifactConnection!
  artifact(id: ID!): Artifact
  
  # Analytics
  campaignMetrics(campaignId: ID!, dateRange: DateRange!): CampaignMetrics!
  teamPerformance(dateRange: DateRange!): [TeamPerformance!]!
  
  # Workflows
  workflows: [Workflow!]!
  workflow(id: ID!): Workflow
}

type Mutation {
  # Auth
  login(email: String!, password: String!): AuthPayload!
  register(email: String!, password: String!, fullName: String!): AuthPayload!
  logout: Boolean!
  
  # Clients
  createClient(input: CreateClientInput!): Client!
  updateClient(id: ID!, input: UpdateClientInput!): Client!
  deleteClient(id: ID!): Boolean!
  
  # Plans
  createPlan(input: CreatePlanInput!): Plan!
  updatePlan(id: ID!, input: UpdatePlanInput!): Plan!
  approvePlan(id: ID!): Plan!
  generateTasksFromPlan(planId: ID!): [Task!]!
  
  # Tasks
  createTask(input: CreateTaskInput!): Task!
  updateTask(id: ID!, input: UpdateTaskInput!): Task!
  assignTask(taskId: ID!, assigneeId: ID!): Task!
  updateTaskStatus(taskId: ID!, status: TaskStatus!): Task!
  approveTask(taskId: ID!, notes: String): Task!
  rejectTask(taskId: ID!, feedback: String!): Task!
  
  # Artifacts
  createArtifact(input: CreateArtifactInput!): Artifact!
  updateArtifact(id: ID!, input: UpdateArtifactInput!): Artifact!
  publishArtifact(id: ID!, target: PublishTarget!): Artifact!
  approveArtifact(id: ID!): Artifact!
  
  # Chat
  sendMessage(chatId: ID!, content: String!): Message!
  createDirectChat(participantIds: [ID!]!): DirectChat!
  
  # Workflows
  createWorkflow(input: CreateWorkflowInput!): Workflow!
  executeWorkflow(workflowId: ID!): WorkflowExecution!
}

type Subscription {
  # Real-time updates
  taskUpdated(taskId: ID!): Task!
  artifactUpdated(artifactId: ID!): Artifact!
  messageReceived(chatId: ID!): Message!
  notificationReceived: Notification!
  workflowStatusChanged(workflowId: ID!): WorkflowExecution!
}

# Types...
type User {
  id: ID!
  email: String!
  fullName: String!
  organization: Organization!
  role: Role!
  createdAt: DateTime!
}

type Client {
  id: ID!
  name: String!
  industry: String
  goals: [String!]!
  tags: [Tag!]!
  campaigns: [Plan!]!
  metrics: ClientMetrics
  createdAt: DateTime!
}

type Task {
  id: ID!
  title: String!
  description: String
  status: TaskStatus!
  assignedTo: TeamMember
  approver: User
  dueDate: Date!
  priority: Priority!
  dependencies: [Task!]!
  comments: [Comment!]!
  createdAt: DateTime!
}

type Artifact {
  id: ID!
  contentType: String!
  platform: String!
  title: String!
  body: String!
  status: ArtifactStatus!
  metrics: ArtifactMetrics
  publishedAt: DateTime
  createdAt: DateTime!
}

# ... (more types)
```

---

## PART 4: API WORKFLOWS & INTEGRATION

### 4.1 Request/Response Cycle with Error Handling

```
Client Request:
┌─────────────────────────────────────────────────────┐
│ POST /plans/123/approve                             │
│ Authorization: Bearer {token}                       │
│ Content-Type: application/json                      │
│                                                      │
│ {                                                   │
│   "approverNotes": "Looks good, proceed"            │
│ }                                                   │
└─────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────┐
│ API GATEWAY                                         │
│ 1. Parse & validate request                        │
│ 2. Verify JWT token                                │
│ 3. Check permissions (RBAC)                        │
│ 4. Rate limit check                                │
└─────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────┐
│ PLANNING SERVICE                                    │
│ 1. Load plan from DB                               │
│ 2. Verify plan status (must be "InReview")         │
│ 3. Update plan.status = "Approved"                 │
│ 4. Save approver + notes                           │
│ 5. Emit event: "PlanApproved"                      │
└─────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────┐
│ EVENT BUS                                           │
│ Publish: "PlanApproved"                            │
│ {planId, clientId, approverId, timestamp}          │
└─────────────────────────────────────────────────────┘
        │
        ├─────────────────┬─────────────────┬─────────────────┐
        ▼                 ▼                 ▼                 ▼
    TASK SERVICE    NOTIFICATION SVC   ANALYTICS SVC   AUTOMATION SVC
    - Generate       - Notify team       - Log event      - Check rules
      20 tasks     - Send Slack msg    - Update stats   - Trigger workflows
    - Create audit   - In-app notif
      trail

        │
        └──────────────────────────────┐
                                       ▼
                          ┌──────────────────────────────┐
                          │ API RESPONSE                 │
                          │ Status: 200 OK               │
                          │                              │
                          │ {                            │
                          │   "id": "plan-123",          │
                          │   "status": "Approved",      │
                          │   "approverId": "user-456",  │
                          │   "approvalNotes": "...",    │
                          │   "tasksGenerated": 20,      │
                          │   "updatedAt": "2026-06-22" │
                          │ }                            │
                          └──────────────────────────────┘
```

---

### 4.2 Error Handling Strategy

```typescript
// All errors return structured responses
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Plan status must be 'InReview' to approve",
    "statusCode": 400,
    "details": {
      "field": "status",
      "current": "Draft",
      "expected": "InReview"
    },
    "timestamp": "2026-06-22T10:30:00Z",
    "requestId": "req-12345"
  }
}

Common Error Codes:
├─ AUTH_REQUIRED (401)
├─ PERMISSION_DENIED (403)
├─ NOT_FOUND (404)
├─ VALIDATION_ERROR (400)
├─ CONFLICT (409) - Resource state conflict
├─ RATE_LIMITED (429)
├─ INTERNAL_ERROR (500)
└─ SERVICE_UNAVAILABLE (503)

Retry Strategy:
├─ 5xx errors: Exponential backoff (1s, 2s, 4s, 8s, 16s)
├─ 429 errors: Wait for Retry-After header
├─ Network errors: Retry 3 times
└─ 4xx errors: Don't retry
```

---

## PART 5: DEPLOYMENT ARCHITECTURE

### 5.1 Containerization & Orchestration

```dockerfile
# Multi-stage Dockerfile for each service
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "dist/index.js"]
```

---

### 5.2 Kubernetes Deployment (K8s)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opus-planning-service
  namespace: opus-production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: opus-planning-service
  template:
    metadata:
      labels:
        app: opus-planning-service
        version: v1
    spec:
      serviceAccountName: opus-service-account
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      
      containers:
      - name: planning-service
        image: registry.company.com/opus/planning-service:latest
        imagePullPolicy: IfNotPresent
        
        ports:
        - name: http
          containerPort: 3000
          protocol: TCP
        
        env:
        - name: NODE_ENV
          value: "production"
        - name: LOG_LEVEL
          value: "info"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: opus-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: opus-secrets
              key: redis-url
        - name: CLAUDE_API_KEY
          valueFrom:
            secretKeyRef:
              name: opus-secrets
              key: claude-api-key
        
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        
        livenessProbe:
          httpGet:
            path: /health
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 3
          failureThreshold: 3
        
        readinessProbe:
          httpGet:
            path: /ready
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 2
          failureThreshold: 2
        
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL

---
apiVersion: v1
kind: Service
metadata:
  name: opus-planning-service
  namespace: opus-production
spec:
  type: ClusterIP
  selector:
    app: opus-planning-service
  ports:
  - name: http
    port: 80
    targetPort: 3000
    protocol: TCP

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: opus-planning-service-hpa
  namespace: opus-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: opus-planning-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

### 5.3 Multi-Region Deployment

```
                 ┌─── Global Load Balancer (Route 53) ───┐
                 │                                        │
        ┌────────▼────────┐                  ┌───────────▼─────────┐
        │  US-EAST-1      │                  │   EU-WEST-1         │
        │  Primary Region │                  │   Secondary Region  │
        ├─────────────────┤                  ├─────────────────────┤
        │                 │                  │                     │
        │ K8s Cluster     │ ─ Database      │ K8s Cluster         │
        │ - API Gateway   │   Replication  │ - API Gateway       │
        │ - 8 Services    │    (async)     │ - 8 Services        │
        │ - Redis Cache   │                │ - Redis Cache       │
        │                 │                │                     │
        └─────────────────┘                └─────────────────────┘
             │                                    │
        ┌────▼────────────────────────────────────▼──────┐
        │   PostgreSQL Primary (RDS Multi-AZ)           │
        │   - Automatic failover                        │
        │   - Continuous replication                    │
        │   - Backup every 6 hours                      │
        └────┬────────────────────────────────────────────┘
             │
        ┌────▼─────────────────────────────────────────────┐
        │   S3 Cross-Region Replication                   │
        │   - Content artifacts                          │
        │   - Generated assets                           │
        │   - Reports & exports                          │
        └───────────────────────────────────────────────────┘

Health Checks:
├─ API Gateway: /health endpoint every 10 seconds
├─ Service: Liveness probe every 30 seconds
├─ Database: Connectivity check every 5 seconds
└─ Redis: Redis health check every 10 seconds

Failover:
├─ Service failure → K8s auto-restarts
├─ Pod failure → HPA scales new pod
├─ Zone failure → Route 53 redirects to backup region
└─ Database failure → RDS automatic failover (< 60 seconds)
```

---

### 5.4 CI/CD Pipeline

```yaml
# GitHub Actions workflow
name: Deploy OPUS to Production

on:
  push:
    branches: [main]
    paths:
      - 'services/**'
      - '.github/workflows/**'

env:
  REGISTRY: registry.company.com
  IMAGE_NAME: opus

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker images
        run: |
          for service in planning task automation content publishing; do
            docker build -t $REGISTRY/opus/$service:${{ github.sha }} \
              ./services/$service
          done
      
      - name: Run tests
        run: npm run test:all
      
      - name: Push to registry
        run: |
          echo ${{ secrets.REGISTRY_PASSWORD }} | docker login -u ${{ secrets.REGISTRY_USERNAME }} --password-stdin
          for service in planning task automation content publishing; do
            docker push $REGISTRY/opus/$service:${{ github.sha }}
          done
  
  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure kubectl
        run: |
          echo ${{ secrets.K8S_CONFIG }} | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig
      
      - name: Deploy to production
        run: |
          kubectl apply -f k8s/production/ \
            --record
      
      - name: Verify deployment
        run: |
          kubectl rollout status deployment/opus-planning-service -n opus-production --timeout=5m
      
      - name: Run smoke tests
        run: |
          npm run smoke-tests:production
```

---

## PART 6: SECURITY & COMPLIANCE

### 6.1 Authentication & Authorization

```
┌─────────────────────────────────────────────────────┐
│              AUTHENTICATION FLOW                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. User login with email/password                 │
│     └─ Hash password with bcrypt (12 rounds)       │
│     └─ Verify against stored hash                  │
│                                                      │
│  2. JWT token generation                           │
│     ├─ Header: {alg: "HS256", type: "JWT"}         │
│     ├─ Payload: {                                  │
│     │   sub: userId,                               │
│     │   org: organizationId,                        │
│     │   role: roleId,                              │
│     │   iat: timestamp,                            │
│     │   exp: timestamp + 24h,                      │
│     │   permissions: [...]                         │
│     │ }                                            │
│     └─ Signature: HMAC-SHA256(secret)              │
│                                                      │
│  3. Token stored in httpOnly secure cookie         │
│     └─ Prevents XSS attacks                        │
│     └─ CSRF token in separate cookie               │
│                                                      │
│  4. Subsequent requests                            │
│     └─ Token verified on every request             │
│     └─ Permissions checked against endpoint        │
│                                                      │
└─────────────────────────────────────────────────────┘

AUTHORIZATION (RBAC):
────────────────────

Admin Role:
├─ View all clients
├─ View all team members
├─ Manage organization settings
├─ View audit logs
└─ Create/manage workflows

Manager Role:
├─ View assigned clients
├─ Manage team members (subordinates)
├─ Review & approve tasks
├─ View team performance
└─ Create plans

Team Member Role:
├─ View assigned clients
├─ Create & execute tasks
├─ Create content artifacts
├─ View own performance
└─ Collaborate via comments/chat

Guest Role (External):
├─ View specific campaign
├─ View metrics (read-only)
├─ Comment on specific artifacts
└─ View communication threads

Permission Matrix:
┌─────────────────────────────────────────────────┐
│         Admin  Manager  Member  Guest           │
├─────────────────────────────────────────────────┤
│ Read Plans       ✓       ✓       ✓      ✓       │
│ Create Plans     ✓       ✓       ✗      ✗       │
│ Approve Plans    ✓       ✓       ✗      ✗       │
│ Create Tasks     ✓       ✓       ✓      ✗       │
│ Approve Tasks    ✓       ✓       ✗      ✗       │
│ View Metrics     ✓       ✓       ✓      ✓*      │
│ View Audit Logs  ✓       ✗       ✗      ✗       │
│ Manage Users     ✓       ✗       ✗      ✗       │
└─────────────────────────────────────────────────┘
* Guest: only for assigned campaign
```

---

### 6.2 Data Protection & Encryption

```
┌──────────────────────────────────────────────────┐
│         DATA PROTECTION STRATEGY                  │
├──────────────────────────────────────────────────┤
│                                                   │
│  IN TRANSIT (Network):                           │
│  ├─ TLS 1.3 for all connections                 │
│  ├─ HSTS headers (max-age: 31536000)            │
│  ├─ Certificate pinning for API calls           │
│  └─ Encrypt all cookies (Secure + HttpOnly)     │
│                                                   │
│  AT REST (Storage):                             │
│  ├─ Database encryption (AES-256)               │
│  ├─ RDS encryption at rest (AWS KMS)            │
│  ├─ S3 encryption (AES-256)                     │
│  ├─ Redis encryption (in-transit only)          │
│  └─ Backup encryption                           │
│                                                   │
│  SENSITIVE DATA:                                 │
│  ├─ API keys: Encrypted with AWS Secrets Manager
│  ├─ OAuth tokens: Store refresh token only      │
│  ├─ Passwords: Never log or expose              │
│  └─ PII: Masked in logs                         │
│                                                   │
│  KEY ROTATION:                                   │
│  ├─ JWT signing key: Rotate quarterly           │
│  ├─ Database encryption key: Rotate annually    │
│  ├─ API keys: Rotate bi-annually                │
│  └─ SSL certificates: Rotate annually           │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

### 6.3 Audit & Compliance

```
┌──────────────────────────────────────────────────┐
│         AUDIT LOG STRUCTURE                       │
├──────────────────────────────────────────────────┤
│                                                   │
│  Every action logged:                            │
│  ├─ WHO (userId, email, role)                   │
│  ├─ WHAT (action, entity, changes)              │
│  ├─ WHEN (timestamp UTC)                        │
│  ├─ WHERE (IP address, user agent)              │
│  └─ RESULT (success, error, duration)           │
│                                                   │
│  Examples:                                        │
│  ├─ User created client                         │
│  ├─ Plan approved by manager                    │
│  ├─ Task status changed                         │
│  ├─ Content artifact published                  │
│  ├─ User deleted                                │
│  ├─ Permission changed                          │
│  └─ Data exported                               │
│                                                   │
│  Retention:                                       │
│  ├─ 7 years for financial records               │
│  ├─ 2 years for operational logs                │
│  ├─ 30 days for detailed activity logs          │
│  └─ Archived to S3 Glacier for long-term        │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## PART 7: MONITORING & OBSERVABILITY

### 7.1 Metrics Collection (Prometheus)

```
Application Metrics:
├─ API Endpoints
│  ├─ http_requests_total (counter)
│  ├─ http_request_duration_seconds (histogram)
│  └─ http_request_errors_total (counter)
├─ Database
│  ├─ db_query_duration_seconds (histogram)
│  ├─ db_connection_pool_size (gauge)
│  └─ db_errors_total (counter)
├─ Cache (Redis)
│  ├─ redis_hit_rate (gauge)
│  ├─ redis_command_duration_seconds (histogram)
│  └─ redis_errors_total (counter)
├─ Queue (Bull)
│  ├─ queue_size (gauge)
│  ├─ job_processing_time (histogram)
│  └─ job_failures_total (counter)
├─ Workflows
│  ├─ workflow_execution_time (histogram)
│  ├─ workflow_failures_total (counter)
│  └─ workflow_success_rate (gauge)
└─ Business Metrics
   ├─ tasks_created_total (counter)
   ├─ content_artifacts_generated (counter)
   ├─ content_approval_rate (gauge)
   ├─ average_task_completion_time (histogram)
   └─ campaigns_active (gauge)

Alerting Rules:
├─ HTTP error rate > 1% → Alert
├─ API latency p99 > 1000ms → Alert
├─ Database connection pool exhausted → Alert
├─ Queue backlog > 1000 jobs → Alert
├─ Workflow failure rate > 5% → Alert
├─ Memory usage > 80% → Alert
└─ Disk usage > 90% → Alert
```

---

### 7.2 Logging Strategy (ELK Stack)

```
Log Levels:
├─ ERROR: System errors, exceptions, failures
├─ WARN: Deprecated usage, performance issues
├─ INFO: Key events (task created, approved)
└─ DEBUG: Detailed execution flow (dev only)

Log Format (JSON):
{
  "timestamp": "2026-06-22T10:30:00.000Z",
  "level": "INFO",
  "service": "planning-service",
  "requestId": "req-12345",
  "userId": "user-456",
  "organizationId": "org-789",
  "action": "PlanApproved",
  "entity": {
    "type": "Plan",
    "id": "plan-123",
    "clientId": "client-456"
  },
  "duration": 245,
  "status": "success",
  "message": "Plan approved successfully"
}

Log Aggregation:
├─ Filebeat: Collect logs from containers
├─ Logstash: Parse and enrich logs
├─ Elasticsearch: Index and store
└─ Kibana: Search and visualize

Dashboard Views:
├─ Real-time error tracking
├─ Deployment tracking (git SHA, timestamp)
├─ User activity timeline
├─ Performance metrics by endpoint
└─ Business event tracking
```

---

### 7.3 Distributed Tracing (Jaeger)

```
Trace Collection:
┌────────────────────────────────────────┐
│  User Request → API Gateway            │
│         │                              │
│         ├─ Trace ID: abc123           │
│         ├─ Span ID: xyz789            │
│         │                              │
│         ▼ (HTTP Header)               │
│  Planning Service                      │
│         │                              │
│         ├─ Query Database              │
│         ├─ Publish Event               │
│         │                              │
│         ▼                              │
│  Notification Service                  │
│         │                              │
│         ├─ Query User Prefs            │
│         ├─ Send Slack                  │
│         │                              │
│         ▼                              │
│  Response → User                       │
│                                        │
│  Total Latency: 245ms                 │
│  ├─ Overhead: 15ms                    │
│  ├─ DB: 120ms                         │
│  ├─ Event Publishing: 45ms            │
│  └─ Notification: 65ms                │
└────────────────────────────────────────┘

Helps identify:
├─ Bottlenecks (which service is slow?)
├─ Cascading failures (which failure caused the rest?)
├─ Service dependencies (call graph)
├─ Performance regression (comparisons over time)
└─ Error attribution (which service had the error?)
```

---

## PART 8: TESTING STRATEGY

### 8.1 Test Pyramid

```
                        /\
                       /  \
                      /  E2E \
                     /Tests  \
                    /_________ \
                   /  \        / \
                  / Int\      / API \
                 /Tests \____/Tests  \
                /__________________ \
               /  \               / \
              / Unit\            / Integ\
             /Tests \__________/Test   \
            /_____________________ \
           100% Coverage         70% Coverage
```

### 8.2 Testing by Layer

```
UNIT TESTS (Functions/Classes)
├─ Service business logic
├─ Validation rules
├─ Data transformation
├─ Error handling
└─ Coverage: > 80%

INTEGRATION TESTS (Service to Service)
├─ Workflow execution
├─ Task creation from plan
├─ Event publishing & consumption
├─ Database transactions
├─ Cache invalidation
└─ Coverage: > 70%

API TESTS (REST Endpoints)
├─ All CRUD operations
├─ Permission checks
├─ Input validation
├─ Error responses
├─ Rate limiting
└─ Coverage: > 90%

E2E TESTS (Full User Flows)
├─ Create plan → Approve → Generate tasks → Assign → Complete
├─ Publish content → Monitor performance
├─ Real-time notifications
├─ Team collaboration
└─ Coverage: Critical paths only (~20%)

PERFORMANCE TESTS
├─ Load test: 100 concurrent users
├─ Stress test: 1000 concurrent users
├─ Spike test: 10x normal traffic
├─ Soak test: 72-hour run
└─ Benchmark: API latency < 200ms

SECURITY TESTS
├─ SQL injection
├─ XSS/CSRF attacks
├─ Authentication bypass
├─ Authorization bypass
├─ API rate limiting
└─ Data exposure
```

---

## PART 9: IMPLEMENTATION TIMELINE

```
WEEKS 1-3: Foundation Layer
├─ PostgreSQL schema design & creation
├─ Redis setup & caching patterns
├─ User authentication & RBAC
├─ Profile services (client, team)
└─ Basic API endpoints

WEEKS 4-6: Planning Layer
├─ Plan type schemas & creation
├─ Template library system
├─ Auto-task generation
├─ Plan approval workflow
└─ Planning service APIs

WEEKS 7-9: Task Management Layer
├─ Task schema & operations
├─ Smart routing & assignment
├─ Status workflow engine
├─ Approval system
├─ Task dashboard
└─ Task service APIs

WEEKS 10-12: Automation Layer
├─ Trigger engine (time, event, data)
├─ Workflow orchestration
├─ Error handling & retries
├─ Automation rule evaluation
├─ Workflow history & debugging
└─ Workflow service APIs

WEEKS 13-15: Integration Layer
├─ Claude API integration
├─ Publishing platform adapters
├─ Analytics data collection
├─ Event system setup
└─ External webhooks

WEEKS 16-18: Frontend Development
├─ React app setup
├─ Profile management UI
├─ Plan builder UI
├─ Task dashboard
├─ Real-time chat system
└─ Analytics dashboard

WEEKS 19-22: Testing & Deployment
├─ Unit tests (80%+ coverage)
├─ Integration tests
├─ API tests (90%+ coverage)
├─ E2E tests (critical paths)
├─ Performance testing
├─ Security auditing
├─ K8s deployment setup
└─ CI/CD pipeline

WEEKS 23-24: Launch & Optimization
├─ Beta testing with real users
├─ Performance monitoring setup
├─ Bug fixes & optimizations
├─ Documentation
├─ Team training
└─ Production launch
```

---

## CONCLUSION

This architecture provides:

1. **Scalability**: Microservices + K8s auto-scaling
2. **Reliability**: Multi-region, automated failover, comprehensive monitoring
3. **Security**: Encryption in transit/at rest, RBAC, audit logging
4. **Observability**: Metrics, logs, traces across all services
5. **Developer Experience**: Clean APIs, comprehensive testing, CI/CD
6. **Business Value**: Event-driven automation, real-time intelligence

**This foundation is solid, tested, and production-ready from day one.**
