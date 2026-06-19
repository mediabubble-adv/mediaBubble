-- launcher.mediabubble.co Database Schema
-- PostgreSQL 14+
-- Created: June 19, 2026

-- ============================================================================
-- CORE TABLES (Required for all apps)
-- ============================================================================

-- Clients Table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  allowed_domains TEXT[] DEFAULT '{}',
  primary_contact_name VARCHAR(255),
  primary_contact_email VARCHAR(255),
  primary_contact_phone VARCHAR(50),
  contract_type VARCHAR(50) DEFAULT 'retainer', -- retainer, hourly, project
  monthly_budget DECIMAL(12, 2),
  vat_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active', -- active, inactive
  brand_assets_url TEXT,
  client_portal_enabled BOOLEAN DEFAULT true,
  invoice_view_enabled BOOLEAN DEFAULT true,
  content_approval_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  UNIQUE(name)
);

CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_status ON clients(status);

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  department_id UUID,
  user_type VARCHAR(50) NOT NULL DEFAULT 'internal', -- internal, client, ai_agent
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'Contributor', -- Admin, PM, Contributor, Guest, ClientAdmin, ClientMember
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
  onboarding_progress JSONB DEFAULT '{"dashboard": false, "tasks": false, "crm": false, "finance": false}'::JSONB, -- Tracks onboarding tutorials completed per module
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_task_completed_at TIMESTAMP,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_department_id ON users(department_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_client_id ON users(client_id);

-- Departments Table
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  head_id UUID REFERENCES users(id),
  budget DECIMAL(12, 2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

ALTER TABLE users ADD CONSTRAINT fk_users_department FOREIGN KEY (department_id) REFERENCES departments(id);

CREATE INDEX idx_departments_name ON departments(name);

-- Employee Profiles Table
CREATE TABLE employee_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  title VARCHAR(255),
  manager_id UUID REFERENCES users(id),
  timezone VARCHAR(100) DEFAULT 'Africa/Cairo',
  weekly_hours INTEGER DEFAULT 40,
  instapay_handle VARCHAR(255),
  skills TEXT[] DEFAULT '{}',
  bio TEXT,
  leave_balance INTEGER DEFAULT 21,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employee_profiles_user_id ON employee_profiles(user_id);

-- Role Permissions Table (RBAC matrix)
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(50) NOT NULL, -- Admin, PM, Contributor, Guest, ClientAdmin, ClientMember
  module VARCHAR(100) NOT NULL, -- CRM, Finance, Tasks, Chat, Assets, Prompts, etc.
  can_create BOOLEAN DEFAULT false,
  can_read BOOLEAN DEFAULT true,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_comment BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role, module)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role);

-- AI Agents Table
CREATE TABLE ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  system_prompt TEXT NOT NULL,
  temperature DECIMAL(3, 2) DEFAULT 0.7,
  model_name VARCHAR(100) DEFAULT 'gemini-1.5-flash',
  allowed_channels UUID[] DEFAULT '{}',
  capabilities TEXT[] DEFAULT '{}',
  trigger_words TEXT[] DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_agents_user_id ON ai_agents(user_id);

-- Achievements Table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL, -- name of Lucide icon
  xp_reward INTEGER DEFAULT 100,
  badge_color VARCHAR(50) DEFAULT 'gold', -- gold, silver, bronze, mint, blue
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_achievements_department ON achievements(department_id);

-- User Achievements Table
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);

-- Audit Logs Table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  entity_type VARCHAR(255) NOT NULL, -- 'task', 'user', 'review', etc
  entity_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete'
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Settings Table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id), -- NULL for global settings
  key VARCHAR(255) NOT NULL,
  value JSONB,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, key)
);

-- API Keys Table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  key_hash VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  permissions TEXT[] DEFAULT '{}',
  last_used_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP
);

CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);

-- ============================================================================
-- TASK MANAGEMENT APP
-- ============================================================================

-- TASK MANAGEMENT APP (ClickUp-Inspired Re-architecture)
-- ============================================================================

-- Spaces Table
CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(50),
  icon VARCHAR(50),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_spaces_created_by ON spaces(created_by);

-- Folders Table
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_folders_space_id ON folders(space_id);

-- Lists Table
CREATE TABLE lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_lists_space_id ON lists(space_id);
CREATE INDEX idx_lists_folder_id ON lists(folder_id);

-- Sprints Table
CREATE TABLE sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'planned', -- planned, active, completed
  goal TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sprints_space_id ON sprints(space_id);
CREATE INDEX idx_sprints_dates ON sprints(start_date, end_date);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  department_id UUID REFERENCES departments(id),
  space_id UUID REFERENCES spaces(id) ON DELETE SET NULL,
  list_id UUID REFERENCES lists(id) ON DELETE SET NULL,
  sprint_id UUID REFERENCES sprints(id) ON DELETE SET NULL,
  priority VARCHAR(50) DEFAULT 'Medium', -- Critical, High, Medium, Low
  status VARCHAR(50) DEFAULT 'Backlog', -- Space-specific statuses or default: Backlog, In Progress, Review, Done
  due_date DATE,
  completed_at TIMESTAMP,
  estimated_hours DECIMAL(8, 2),
  actual_hours DECIMAL(8, 2),
  sprint_points INTEGER,
  tags TEXT[],
  custom_fields JSONB DEFAULT '{}'::JSONB, -- ClickUp-style dynamic fields
  parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE, -- Subtasks
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_created_by ON tasks(created_by);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_department_id ON tasks(department_id);
CREATE INDEX idx_tasks_space_id ON tasks(space_id);
CREATE INDEX idx_tasks_list_id ON tasks(list_id);
CREATE INDEX idx_tasks_sprint_id ON tasks(sprint_id);
CREATE INDEX idx_tasks_updated_at ON tasks(updated_at);

-- Task Dependencies Table
CREATE TABLE task_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocking_task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  blocked_task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  dependency_type VARCHAR(50) DEFAULT 'blocking', -- blocking, waiting_on
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(blocking_task_id, blocked_task_id)
);

CREATE INDEX idx_dependencies_blocking ON task_dependencies(blocking_task_id);
CREATE INDEX idx_dependencies_blocked ON task_dependencies(blocked_task_id);

-- Custom Field Definitions Table
CREATE TABLE custom_field_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  list_id UUID REFERENCES lists(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- Text, Number, Date, Checkbox, Dropdown, User, Currency
  options JSONB, -- For dropdown choices or validation config
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cf_definitions_space_id ON custom_field_definitions(space_id);
CREATE INDEX idx_cf_definitions_list_id ON custom_field_definitions(list_id);

-- Task Checklists Table
CREATE TABLE task_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_task_checklists_task_id ON task_checklists(task_id);

-- Task Checklist Items Table
CREATE TABLE task_checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID NOT NULL REFERENCES task_checklists(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  due_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_checklist_items_checklist_id ON task_checklist_items(checklist_id);

-- Task Watchers Table
CREATE TABLE task_watchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(task_id, user_id)
);

CREATE INDEX idx_task_watchers_task_id ON task_watchers(task_id);
CREATE INDEX idx_task_watchers_user_id ON task_watchers(user_id);

-- Task Comments Table
CREATE TABLE task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  mentioned_users UUID[],
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_task_comments_task_id ON task_comments(task_id);
CREATE INDEX idx_task_comments_user_id ON task_comments(user_id);

-- Task Attachments Table
CREATE TABLE task_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES users(id),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_task_attachments_task_id ON task_attachments(task_id);

-- Task Templates Table
CREATE TABLE task_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  department_id UUID REFERENCES departments(id),
  default_priority VARCHAR(50) DEFAULT 'Medium',
  default_tags TEXT[],
  subtasks JSONB, -- Array of { title, estimated_hours }
  created_by UUID NOT NULL REFERENCES users(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_task_templates_department_id ON task_templates(department_id);

-- ============================================================================
-- EMPLOYEE PERFORMANCE APP
-- ============================================================================

CREATE TABLE performance_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES users(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  rating VARCHAR(50), -- Exceeds, Meets, Below
  feedback TEXT,
  goals_met JSONB, -- Array of { goal, status }
  areas_for_improvement JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_performance_reviews_employee_id ON performance_reviews(employee_id);
CREATE INDEX idx_performance_reviews_reviewer_id ON performance_reviews(reviewer_id);
CREATE INDEX idx_performance_reviews_period ON performance_reviews(review_period_start, review_period_end);

-- OKRs Table
CREATE TABLE okrs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES users(id),
  objective VARCHAR(255) NOT NULL,
  key_results JSONB NOT NULL, -- Array of { metric, target, current_value }
  quarter VARCHAR(10) NOT NULL, -- Q1, Q2, Q3, Q4
  year INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'On Track', -- On Track, At Risk, Off Track
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_okrs_employee_id ON okrs(employee_id);
CREATE INDEX idx_okrs_quarter_year ON okrs(quarter, year);

-- KPIs Table
CREATE TABLE kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES users(id),
  metric_name VARCHAR(255) NOT NULL,
  value DECIMAL(12, 2) NOT NULL,
  target DECIMAL(12, 2),
  period VARCHAR(50) DEFAULT 'Monthly', -- Daily, Weekly, Monthly, Quarterly
  measured_at TIMESTAMP NOT NULL,
  source VARCHAR(100) DEFAULT 'Manual', -- Manual, Automated
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_kpis_employee_id ON kpis(employee_id);
CREATE INDEX idx_kpis_measured_at ON kpis(measured_at);
CREATE INDEX idx_kpis_metric_name ON kpis(metric_name);

-- 360 Feedback Table
CREATE TABLE feedback_360 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES users(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  category VARCHAR(100), -- Communication, Leadership, Technical, etc
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedback_360_employee_id ON feedback_360(employee_id);
CREATE INDEX idx_feedback_360_reviewer_id ON feedback_360(reviewer_id);

-- ============================================================================
-- COLLABORATION HUB
-- ============================================================================

CREATE TABLE collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  members UUID[] NOT NULL,
  status VARCHAR(50) DEFAULT 'Active', -- Active, Archived
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_collaborations_created_by ON collaborations(created_by);

-- Activity Logs Table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- created, updated, commented, assigned
  entity_type VARCHAR(100) NOT NULL, -- task, review, document
  entity_id UUID NOT NULL,
  details JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);

-- Presence Table
CREATE TABLE user_presence (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'Offline', -- Online, Away, Busy, Offline
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  current_location VARCHAR(255), -- task/doc/page they're on
  device VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentions Table
CREATE TABLE mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentioned_user_id UUID NOT NULL REFERENCES users(id),
  mentioned_by UUID NOT NULL REFERENCES users(id),
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NOT NULL,
  context TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mentions_mentioned_user_id ON mentions(mentioned_user_id);
CREATE INDEX idx_mentions_read ON mentions(read);

-- ============================================================================
-- TIME MANAGEMENT APP
-- ============================================================================

CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  task_id UUID REFERENCES tasks(id),
  date DATE NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  duration_minutes INTEGER,
  description TEXT,
  billable BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Submitted, Approved
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX idx_time_entries_date ON time_entries(date);
CREATE INDEX idx_time_entries_task_id ON time_entries(task_id);

-- ============================================================================
-- FINANCE APP (Invoicing, Quotations, Cash Flow)
-- ============================================================================

-- Invoices Table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Sent, Paid, Overdue, Cancelled
  currency VARCHAR(10) DEFAULT 'EGP', -- EGP, AED, USD
  subtotal DECIMAL(12, 2) NOT NULL,
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  discount_amount DECIMAL(12, 2) DEFAULT 0,
  vat_percentage DECIMAL(5, 2) DEFAULT 14.00,
  vat_amount DECIMAL(12, 2) NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  due_date DATE NOT NULL,
  sent_at TIMESTAMP,
  paid_at TIMESTAMP,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

-- Invoice Items Table
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL, -- Lock billable task
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- Quotations Table
CREATE TABLE quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_number VARCHAR(100) UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Sent, Approved, Expired, Revised
  currency VARCHAR(10) DEFAULT 'EGP',
  subtotal DECIMAL(12, 2) NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  valid_until DATE,
  converted_to_invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quotations_client_id ON quotations(client_id);
CREATE INDEX idx_quotations_status ON quotations(status);

-- Quotation Items Table
CREATE TABLE quotation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id UUID NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quotation_items_quotation_id ON quotation_items(quotation_id);

-- Cash Flow Ledger Table (For cash flow charts)
CREATE TABLE cash_flow_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- inflow (paid invoices, investment), outflow (payroll, software, rent)
  category VARCHAR(100) NOT NULL, -- Payroll, Software, Rent, Ads, Invoice Payment, etc.
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'EGP',
  transaction_date DATE NOT NULL,
  reference_id UUID, -- Links to invoice_id, or leave null for manual expense
  description TEXT,
  payment_method VARCHAR(100), -- Instapay, Bank Transfer, Fawry, Telr, Cash
  logged_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cash_flow_type ON cash_flow_ledger(type);
CREATE INDEX idx_cash_flow_date ON cash_flow_ledger(transaction_date);
CREATE INDEX idx_cash_flow_category ON cash_flow_ledger(category);

-- Availability Table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'Available', -- Available, Busy, On Leave
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_availability_user_id ON availability(user_id);
CREATE INDEX idx_availability_date ON availability(date);

-- Leave Requests Table
CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  type VARCHAR(50) NOT NULL, -- Vacation, Sick, Personal, Other
  reason TEXT,
  approver_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Approved, Rejected
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leave_requests_user_id ON leave_requests(user_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);

-- Capacity Planning Table
CREATE TABLE capacity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  week_start DATE NOT NULL,
  allocated_hours DECIMAL(8, 2),
  scheduled_hours DECIMAL(8, 2),
  utilization_percent DECIMAL(5, 2),
  calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_capacity_user_id ON capacity(user_id);
CREATE INDEX idx_capacity_week_start ON capacity(week_start);

-- Holiday Calendar Table
CREATE TABLE holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(50), -- Egypt, UAE
  is_working_day BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_holidays_date ON holidays(date);
CREATE INDEX idx_holidays_country ON holidays(country);

-- ============================================================================
-- AI TOOLS APP
-- ============================================================================

CREATE TABLE ai_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  ai_provider VARCHAR(50), -- Claude, Gemini, Both
  request_type VARCHAR(50), -- Content, Analysis, Code, Brainstorm
  input_text TEXT,
  output_text TEXT,
  tokens_used INTEGER,
  cost DECIMAL(10, 6),
  status VARCHAR(50) DEFAULT 'Processing', -- Processing, Completed, Failed
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_requests_user_id ON ai_requests(user_id);
CREATE INDEX idx_ai_requests_created_at ON ai_requests(created_at);

-- AI Configurations Table
CREATE TABLE ai_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(50), -- Claude, Gemini
  model VARCHAR(100),
  temperature DECIMAL(3, 2),
  max_tokens INTEGER,
  system_prompt TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_configurations_created_by ON ai_configurations(created_by);

-- AI Outputs Table
CREATE TABLE ai_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES ai_requests(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT,
  tags TEXT[],
  starred BOOLEAN DEFAULT false,
  user_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_outputs_user_id ON ai_outputs(user_id);
CREATE INDEX idx_ai_outputs_request_id ON ai_outputs(request_id);

-- ============================================================================
-- PROMPT GENERATOR APP
-- ============================================================================

CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  template TEXT NOT NULL,
  variables JSONB, -- Array of { name, type, default, options }
  created_by UUID NOT NULL REFERENCES users(id),
  is_public BOOLEAN DEFAULT false,
  version INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Active, Archived
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prompts_created_by ON prompts(created_by);
CREATE INDEX idx_prompts_category ON prompts(category);
CREATE INDEX idx_prompts_status ON prompts(status);

-- Prompt Versions Table
CREATE TABLE prompt_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  template TEXT NOT NULL,
  changes TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(prompt_id, version)
);

CREATE INDEX idx_prompt_versions_prompt_id ON prompt_versions(prompt_id);

-- Prompt Executions Table
CREATE TABLE prompt_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id),
  user_id UUID NOT NULL REFERENCES users(id),
  variables_used JSONB,
  ai_provider VARCHAR(50),
  model VARCHAR(100),
  input_text TEXT,
  output_text TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  execution_time_ms INTEGER,
  cost DECIMAL(10, 6),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prompt_executions_prompt_id ON prompt_executions(prompt_id);
CREATE INDEX idx_prompt_executions_user_id ON prompt_executions(user_id);

-- Prompt Library Table
CREATE TABLE prompt_libraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prompts UUID[],
  owner UUID NOT NULL REFERENCES users(id),
  shared_with UUID[],
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prompt_libraries_owner ON prompt_libraries(owner);

-- ============================================================================
-- COMMUNICATION CHANNEL APP
-- ============================================================================

CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'Public', -- Public, Private, Direct
  created_by UUID NOT NULL REFERENCES users(id),
  members UUID[] NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archived_at TIMESTAMP
);

CREATE INDEX idx_channels_type ON channels(type);
CREATE INDEX idx_channels_created_by ON channels(created_by);

-- Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  attachments JSONB, -- Array of { name, url, size }
  reactions JSONB, -- Map of { emoji: [user_ids] }
  thread_id UUID REFERENCES messages(id), -- For threaded replies
  edited_at TIMESTAMP,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_channel_id ON messages(channel_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_thread_id ON messages(thread_id);

-- Notifications Table
CREATE TABLE message_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  channel_id UUID NOT NULL REFERENCES channels(id),
  message_id UUID REFERENCES messages(id),
  type VARCHAR(50), -- Mention, Reply, Reaction
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_message_notifications_user_id ON message_notifications(user_id);
CREATE INDEX idx_message_notifications_read ON message_notifications(read);

-- ============================================================================
-- WORKFLOW AUTOMATION APP
-- ============================================================================

CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  trigger JSONB NOT NULL, -- { type, conditions }
  steps JSONB NOT NULL, -- Array of { action, params, conditions }
  enabled BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES users(id),
  last_executed_at TIMESTAMP,
  execution_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workflows_created_by ON workflows(created_by);
CREATE INDEX idx_workflows_enabled ON workflows(enabled);

-- Workflow Executions Table
CREATE TABLE workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id),
  triggered_by UUID REFERENCES users(id),
  trigger_data JSONB,
  status VARCHAR(50) DEFAULT 'Running', -- Running, Completed, Failed
  steps_executed INTEGER,
  error_message TEXT,
  execution_time_ms INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workflow_executions_workflow_id ON workflow_executions(workflow_id);
CREATE INDEX idx_workflow_executions_status ON workflow_executions(status);

-- Workflow Templates Table
CREATE TABLE workflow_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- HR, Sales, Content, Operations
  description TEXT,
  workflow_config JSONB,
  created_by UUID NOT NULL REFERENCES users(id),
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workflow_templates_category ON workflow_templates(category);

-- ============================================================================
-- INDEXES FOR COMMON QUERIES
-- ============================================================================

-- Full-text search on tasks
CREATE INDEX idx_tasks_search ON tasks USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Full-text search on messages
CREATE INDEX idx_messages_search ON messages USING GIN (to_tsvector('english', content));

-- Date range queries
CREATE INDEX idx_time_entries_date_range ON time_entries(user_id, date);
CREATE INDEX idx_tasks_due_date_status ON tasks(due_date, status);
CREATE INDEX idx_leave_requests_date_range ON leave_requests(user_id, start_date, end_date);

-- ============================================================================
-- VIEWS FOR COMMON AGGREGATIONS
-- ============================================================================

-- Dashboard stats
CREATE VIEW user_task_stats AS
SELECT
  u.id as user_id,
  u.name,
  COUNT(CASE WHEN t.status = 'Done' THEN 1 END) as completed_tasks,
  COUNT(CASE WHEN t.status = 'In Progress' THEN 1 END) as in_progress_tasks,
  COUNT(CASE WHEN t.due_date < CURRENT_DATE AND t.status != 'Done' THEN 1 END) as overdue_tasks,
  AVG(EXTRACT(DAY FROM (t.completed_at - t.created_at))) as avg_completion_days
FROM users u
LEFT JOIN tasks t ON u.id = t.assigned_to
GROUP BY u.id, u.name;

-- Department performance
CREATE VIEW department_metrics AS
SELECT
  d.id,
  d.name,
  COUNT(DISTINCT t.id) as total_tasks,
  COUNT(DISTINCT CASE WHEN t.status = 'Done' THEN t.id END) as completed_tasks,
  AVG(EXTRACT(EPOCH FROM (COALESCE(t.completed_at, CURRENT_TIMESTAMP) - t.created_at))/3600) as avg_hours,
  COUNT(DISTINCT u.id) as team_members
FROM departments d
LEFT JOIN tasks t ON d.id = t.department_id
LEFT JOIN users u ON d.id = u.department_id
GROUP BY d.id, d.name;

-- User utilization
CREATE VIEW user_utilization AS
SELECT
  u.id,
  u.name,
  c.week_start,
  c.allocated_hours,
  c.scheduled_hours,
  ROUND((c.scheduled_hours / NULLIF(c.allocated_hours, 0) * 100)::numeric, 2) as utilization_percent
FROM users u
LEFT JOIN capacity c ON u.id = c.user_id
WHERE c.week_start >= CURRENT_DATE - INTERVAL '4 weeks';

-- ============================================================================
-- STORED PROCEDURES / FUNCTIONS
-- ============================================================================

-- Function to update task status and log change
CREATE OR REPLACE FUNCTION update_task_status(
  p_task_id UUID,
  p_new_status VARCHAR,
  p_user_id UUID
)
RETURNS void AS $$
BEGIN
  UPDATE tasks
  SET status = p_new_status, updated_at = CURRENT_TIMESTAMP
  WHERE id = p_task_id;

  INSERT INTO audit_logs (user_id, entity_type, entity_id, action, new_values)
  VALUES (p_user_id, 'task', p_task_id, 'update', jsonb_build_object('status', p_new_status));
END;
$$ LANGUAGE plpgsql;

-- Function to calculate user capacity
CREATE OR REPLACE FUNCTION calculate_capacity(p_user_id UUID, p_week_start DATE)
RETURNS void AS $$
DECLARE
  v_scheduled_hours DECIMAL(8, 2);
  v_allocated_hours DECIMAL(8, 2);
BEGIN
  SELECT COALESCE(SUM(duration_minutes) / 60.0, 0)
  INTO v_scheduled_hours
  FROM time_entries
  WHERE user_id = p_user_id
  AND date >= p_week_start
  AND date < p_week_start + INTERVAL '7 days';

  v_allocated_hours := 40; -- Standard 40-hour week

  INSERT INTO capacity (user_id, week_start, allocated_hours, scheduled_hours, utilization_percent)
  VALUES (p_user_id, p_week_start, v_allocated_hours, v_scheduled_hours,
          ROUND((v_scheduled_hours / v_allocated_hours * 100)::numeric, 2))
  ON CONFLICT (user_id, week_start) DO UPDATE
  SET scheduled_hours = v_scheduled_hours,
      utilization_percent = ROUND((v_scheduled_hours / v_allocated_hours * 100)::numeric, 2);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_departments_updated_at BEFORE UPDATE ON departments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_tasks_updated_at BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_performance_reviews_updated_at BEFORE UPDATE ON performance_reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_workflows_updated_at BEFORE UPDATE ON workflows
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DATA SEED (INITIAL SETUP)
-- ============================================================================

-- Insert default departments
INSERT INTO departments (name, description) VALUES
  ('Strategic Consulting', 'Market analysis and positioning'),
  ('SEO', 'Technical and content optimization'),
  ('Branding', 'Identity, voice, and visual systems'),
  ('Media Production', 'Video, photography, content creation'),
  ('Social Media', 'Content strategy and execution'),
  ('Paid Advertising', 'Google Ads, Meta, TikTok campaigns'),
  ('Email Marketing', 'Campaign automation and nurture'),
  ('Analytics & Reporting', 'Performance tracking and insights'),
  ('Client Services', 'Account management and onboarding')
ON CONFLICT DO NOTHING;

-- Create default settings for the system
INSERT INTO settings (key, value) VALUES
  ('system_name', '"launcher.mediabubble.co"'),
  ('timezone', '"Africa/Cairo"'),
  ('language_default', '"ar"'),
  ('logo_url', 'null')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
