-- Design & PM Tools Database Extensions
-- PostgreSQL additions for the new app cluster
-- Add these tables to the existing LAUNCHER_DATABASE_SCHEMA.sql

-- ============================================================================
-- AUTHENTICATION & PERMISSIONS (EXTENSIONS)
-- ============================================================================

-- Clients table (NEW)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email_domain VARCHAR(255), -- e.g., "acme.com" for domain-based invites
  allowed_emails TEXT[], -- specific emails if no domain restriction
  projects UUID[] DEFAULT ARRAY[]::UUID[], -- projects they have access to
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active', -- active, inactive
  UNIQUE(name)
);

CREATE INDEX idx_clients_email_domain ON clients(email_domain);
CREATE INDEX idx_clients_created_by ON clients(created_by);

-- Client invitations (NEW)
CREATE TABLE IF NOT EXISTS client_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member', -- admin, member
  invited_by UUID NOT NULL REFERENCES users(id),
  invited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  accepted_at TIMESTAMP,
  token_hash VARCHAR(255) UNIQUE, -- For email verification link
  token_expires_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, expired
  UNIQUE(client_id, email)
);

CREATE INDEX idx_client_invitations_client_id ON client_invitations(client_id);
CREATE INDEX idx_client_invitations_email ON client_invitations(email);
CREATE INDEX idx_client_invitations_status ON client_invitations(status);

-- Update users table to support clients
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(50) DEFAULT 'internal'; -- internal, client
ALTER TABLE users ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id);

-- Role-based permissions matrix (NEW)
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(50) NOT NULL, -- Admin, Designer, PM, Client, etc
  user_type VARCHAR(50) NOT NULL, -- internal, client
  app_name VARCHAR(100) NOT NULL, -- design_projects, backlog, sprint, etc
  can_create BOOLEAN DEFAULT false,
  can_read BOOLEAN DEFAULT true,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_comment BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role, user_type, app_name)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role);
CREATE INDEX idx_role_permissions_app ON role_permissions(app_name);

-- ============================================================================
-- DESIGN PROJECTS APP
-- ============================================================================

CREATE TABLE IF NOT EXISTS design_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id),
  figma_project_id VARCHAR(255), -- Figma API project ID
  figma_url TEXT, -- Direct link to Figma project
  status VARCHAR(50) DEFAULT 'Discovery', -- Discovery, Wireframes, Mockups, Dev Handoff, Shipped
  phase_progress DECIMAL(3,2) DEFAULT 0.0, -- 0.0 to 1.0
  assigned_designers UUID[] DEFAULT ARRAY[]::UUID[],
  assigned_pms UUID[] DEFAULT ARRAY[]::UUID[],
  assigned_clients UUID[] DEFAULT ARRAY[]::UUID[],
  start_date DATE,
  deadline DATE,
  budget DECIMAL(10,2),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,

  -- Figma sync metadata
  figma_files JSONB DEFAULT NULL, -- { files: [ { id, name, thumbnail_url, last_modified } ] }
  figma_last_synced TIMESTAMP,

  -- Activity tracking
  client_feedback_count INTEGER DEFAULT 0,
  internal_notes_count INTEGER DEFAULT 0
);

CREATE INDEX idx_design_projects_client_id ON design_projects(client_id);
CREATE INDEX idx_design_projects_status ON design_projects(status);
CREATE INDEX idx_design_projects_created_by ON design_projects(created_by);
CREATE INDEX idx_design_projects_deadline ON design_projects(deadline);

-- Figma sync tracking (NEW)
CREATE TABLE IF NOT EXISTS figma_syncs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_project_id UUID NOT NULL REFERENCES design_projects(id) ON DELETE CASCADE,
  sync_type VARCHAR(50) DEFAULT 'auto', -- auto, manual
  synced_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  files_found INTEGER DEFAULT 0,
  files_updated INTEGER DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_figma_syncs_project_id ON figma_syncs(design_project_id);
CREATE INDEX idx_figma_syncs_synced_at ON figma_syncs(synced_at);

-- Design project versions (NEW)
CREATE TABLE IF NOT EXISTS design_project_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_project_id UUID NOT NULL REFERENCES design_projects(id) ON DELETE CASCADE,
  figma_file_id VARCHAR(255),
  figma_version_id VARCHAR(255),
  figma_modified_at TIMESTAMP,
  thumbnail_url TEXT,
  page_list JSONB, -- [ { name, id } ]
  design_phase VARCHAR(50),
  internal_status VARCHAR(255),
  is_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  stored_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_design_versions_project_id ON design_project_versions(design_project_id);

-- ============================================================================
-- DESIGN HANDOFF APP
-- ============================================================================

CREATE TABLE IF NOT EXISTS design_handoffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_project_id UUID NOT NULL REFERENCES design_projects(id) ON DELETE CASCADE,
  submission_number INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, In Review, Client Feedback, Approved, Rejected

  -- Submission
  submitted_by UUID REFERENCES users(id),
  submitted_at TIMESTAMP,
  figma_file_id VARCHAR(255),
  figma_file_url TEXT,
  description TEXT,

  -- Review workflow
  review_rounds JSONB DEFAULT '[]', -- [ { round, feedback: [], reviewer_id, created_at } ]
  current_round INTEGER DEFAULT 0,

  -- Client feedback
  client_feedback JSONB DEFAULT '[]', -- [ { email, comment, annotation, created_at } ]
  client_approved_by UUID REFERENCES users(id),
  client_approved_at TIMESTAMP,

  -- Specs generation
  generated_specs JSONB, -- { colors, typography, components, spacing }
  specs_exported_at TIMESTAMP,
  specs_export_format VARCHAR(50), -- json, css, tailwind

  -- Timeline
  due_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(design_project_id, submission_number)
);

CREATE INDEX idx_design_handoffs_project_id ON design_handoffs(design_project_id);
CREATE INDEX idx_design_handoffs_status ON design_handoffs(status);
CREATE INDEX idx_design_handoffs_submitted_by ON design_handoffs(submitted_by);

-- Design feedback (NEW)
CREATE TABLE IF NOT EXISTS design_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handoff_id UUID NOT NULL REFERENCES design_handoffs(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id),
  feedback_text TEXT NOT NULL,
  annotation_x DECIMAL(5,2), -- Figma canvas coordinates
  annotation_y DECIMAL(5,2),
  annotation_image_url TEXT,
  status VARCHAR(50) DEFAULT 'Unresolved', -- Unresolved, Resolved, Acknowledged
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_design_feedback_handoff_id ON design_feedback(handoff_id);
CREATE INDEX idx_design_feedback_reviewer_id ON design_feedback(reviewer_id);
CREATE INDEX idx_design_feedback_status ON design_feedback(status);

-- ============================================================================
-- DESIGN SYSTEM MANAGER APP
-- ============================================================================

CREATE TABLE IF NOT EXISTS design_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  figma_library_id VARCHAR(255),
  version VARCHAR(50) DEFAULT '1.0',
  last_synced TIMESTAMP,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name)
);

-- Design tokens (NEW)
CREATE TABLE IF NOT EXISTS design_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_id UUID NOT NULL REFERENCES design_systems(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL, -- Color, Typography, Spacing, Shadow, Border, Other
  name VARCHAR(255) NOT NULL,
  value JSONB NOT NULL, -- { hex: "#000" } or { fontSize: 16 } or { size: "16px" }
  figma_token_id VARCHAR(255),
  exported_as JSONB, -- { css: "--token-name", tailwind: "token-name", sass: "$token-name" }
  documentation TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(system_id, category, name)
);

CREATE INDEX idx_design_tokens_system_id ON design_tokens(system_id);
CREATE INDEX idx_design_tokens_category ON design_tokens(category);

-- Design components (NEW)
CREATE TABLE IF NOT EXISTS design_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_id UUID NOT NULL REFERENCES design_systems(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- Form Controls, Layout, Navigation, etc
  figma_component_id VARCHAR(255),
  figma_url TEXT,
  thumbnail_url TEXT,
  documentation TEXT,
  usage_example TEXT, -- Code example (React, Vue, etc)
  status VARCHAR(50) DEFAULT 'Active', -- Draft, Active, Deprecated
  usage_count INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(system_id, name)
);

CREATE INDEX idx_design_components_system_id ON design_components(system_id);
CREATE INDEX idx_design_components_category ON design_components(category);

-- ============================================================================
-- ASSET LIBRARY APP
-- ============================================================================

CREATE TABLE IF NOT EXISTS asset_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- Icons, Illustrations, Photos, Patterns, Mockups
  subcategory VARCHAR(100),
  file_type VARCHAR(50), -- figma, sketch, pdf, png, svg, ai, psd, etc
  file_url TEXT NOT NULL,
  file_size INTEGER,

  -- Metadata
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_by UUID NOT NULL REFERENCES users(id),
  design_project_id UUID REFERENCES design_projects(id),

  -- Versioning
  version INTEGER DEFAULT 1,
  version_history JSONB DEFAULT '[]', -- [ { version, created_at, created_by, change_log } ]

  -- Permissions
  is_public BOOLEAN DEFAULT false,
  allowed_roles VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR[], -- ['Designer', 'PM'] or ['*']
  allowed_client_ids UUID[] DEFAULT ARRAY[]::UUID[], -- specific clients if not public

  -- Usage tracking
  download_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP,
  used_in_projects UUID[] DEFAULT ARRAY[]::UUID[],

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_asset_library_category ON asset_library(category);
CREATE INDEX idx_asset_library_created_by ON asset_library(created_by);
CREATE INDEX idx_asset_library_is_public ON asset_library(is_public);
CREATE INDEX idx_asset_library_tags ON asset_library USING GIN(tags);

-- Asset downloads tracking (NEW)
CREATE TABLE IF NOT EXISTS asset_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES asset_library(id) ON DELETE CASCADE,
  downloaded_by UUID NOT NULL REFERENCES users(id),
  version INTEGER,
  downloaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_asset_downloads_asset_id ON asset_downloads(asset_id);
CREATE INDEX idx_asset_downloads_downloaded_by ON asset_downloads(downloaded_by);

-- ============================================================================
-- PM TOOLS: BACKLOG MANAGER
-- ============================================================================

CREATE TABLE IF NOT EXISTS backlog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id UUID REFERENCES design_projects(id),
  epic_id UUID, -- Self-reference for epics
  story_points DECIMAL(4,1),
  priority VARCHAR(50) DEFAULT 'Medium', -- Critical, High, Medium, Low
  status VARCHAR(50) DEFAULT 'Backlog', -- Backlog, Ready, In Sprint, Done
  assigned_to UUID REFERENCES users(id),
  depends_on UUID[] DEFAULT ARRAY[]::UUID[], -- IDs of dependent items
  acceptance_criteria TEXT[] DEFAULT ARRAY[]::TEXT[],
  estimate_type VARCHAR(50), -- fibonacci, t-shirt, custom
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_backlog_items_project_id ON backlog_items(project_id);
CREATE INDEX idx_backlog_items_status ON backlog_items(status);
CREATE INDEX idx_backlog_items_priority ON backlog_items(priority);
CREATE INDEX idx_backlog_items_assigned_to ON backlog_items(assigned_to);

-- ============================================================================
-- PM TOOLS: SPRINT PLANNER
-- ============================================================================

CREATE TABLE IF NOT EXISTS sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES design_projects(id),
  name VARCHAR(255) NOT NULL,
  goal TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'Planning', -- Planning, Active, Completed
  backlog_items UUID[] DEFAULT ARRAY[]::UUID[],
  capacity_hours DECIMAL(8,2),
  team_members UUID[] DEFAULT ARRAY[]::UUID[],
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_sprints_project_id ON sprints(project_id);
CREATE INDEX idx_sprints_status ON sprints(status);
CREATE INDEX idx_sprints_start_date ON sprints(start_date);

-- Sprint metrics (NEW)
CREATE TABLE IF NOT EXISTS sprint_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sprint_id UUID NOT NULL REFERENCES sprints(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  points_completed INTEGER,
  points_remaining INTEGER,
  items_completed INTEGER,
  items_remaining INTEGER,
  velocity DECIMAL(6,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sprint_id, date)
);

CREATE INDEX idx_sprint_metrics_sprint_id ON sprint_metrics(sprint_id);

-- ============================================================================
-- PM TOOLS: ROADMAP
-- ============================================================================

CREATE TABLE IF NOT EXISTS roadmap_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES design_projects(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  quarter VARCHAR(10), -- Q1, Q2, Q3, Q4, or "Q1 2026"
  epic_id UUID REFERENCES backlog_items(id),
  status VARCHAR(50) DEFAULT 'Planned', -- Planned, In Progress, Launched, Cancelled
  depends_on UUID[] DEFAULT ARRAY[]::UUID[],
  affects_kpi JSONB, -- { kpi: "User Growth", expected_lift: "15%" }
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_roadmap_items_project_id ON roadmap_items(project_id);
CREATE INDEX idx_roadmap_items_quarter ON roadmap_items(quarter);
CREATE INDEX idx_roadmap_items_status ON roadmap_items(status);

-- ============================================================================
-- PM TOOLS: RELEASE MANAGER
-- ============================================================================

CREATE TABLE IF NOT EXISTS releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES design_projects(id),
  version VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Planning', -- Planning, In QA, Ready, Shipped, Rolled Back
  scheduled_date DATE,
  shipped_date TIMESTAMP,
  features UUID[] DEFAULT ARRAY[]::UUID[], -- Backlog item IDs
  hotfixes UUID[] DEFAULT ARRAY[]::UUID[],
  changelog TEXT,
  release_notes TEXT, -- Customer-facing
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, version)
);

CREATE INDEX idx_releases_project_id ON releases(project_id);
CREATE INDEX idx_releases_status ON releases(status);
CREATE INDEX idx_releases_shipped_date ON releases(shipped_date);

-- ============================================================================
-- ENHANCED COMMUNICATION (Updates to existing messages table)
-- ============================================================================

-- Update messages table to support context + visibility
ALTER TABLE messages ADD COLUMN IF NOT EXISTS context_type VARCHAR(50); -- task, design_project, handoff, etc
ALTER TABLE messages ADD COLUMN IF NOT EXISTS context_id UUID;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS visible_to_roles VARCHAR(50)[] DEFAULT ARRAY['*']::VARCHAR[]; -- Who can see
ALTER TABLE messages ADD COLUMN IF NOT EXISTS is_internal_only BOOLEAN DEFAULT false; -- Clients can't see if true

CREATE INDEX idx_messages_context ON messages(context_type, context_id) WHERE context_id IS NOT NULL;
CREATE INDEX idx_messages_visible_roles ON messages USING GIN(visible_to_roles);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Design project status view
CREATE OR REPLACE VIEW design_project_status AS
SELECT
  dp.id,
  dp.name,
  dp.status,
  dp.phase_progress,
  dp.deadline,
  COUNT(DISTINCT dh.id) as handoff_count,
  COUNT(DISTINCT CASE WHEN dh.status = 'Approved' THEN dh.id END) as approved_handoffs,
  c.name as client_name,
  u.name as created_by_name,
  DATEDIFF(DAY, CURRENT_DATE, dp.deadline) as days_to_deadline
FROM design_projects dp
LEFT JOIN design_handoffs dh ON dp.id = dh.design_project_id
LEFT JOIN clients c ON dp.client_id = c.id
LEFT JOIN users u ON dp.created_by = u.id
GROUP BY dp.id, dp.name, dp.status, dp.phase_progress, dp.deadline, c.name, u.name;

-- Backlog velocity view
CREATE OR REPLACE VIEW backlog_velocity AS
SELECT
  DATE_TRUNC('week', s.end_date) as week,
  s.project_id,
  SUM(COALESCE(bi.story_points, 0)) as points_completed,
  COUNT(bi.id) as items_completed
FROM sprints s
LEFT JOIN backlog_items bi ON bi.id = ANY(s.backlog_items) AND bi.status = 'Done'
WHERE s.status = 'Completed'
GROUP BY DATE_TRUNC('week', s.end_date), s.project_id;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Update design_projects updated_at when design_handoffs change
CREATE OR REPLACE FUNCTION update_design_project_on_handoff()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE design_projects
  SET updated_at = CURRENT_TIMESTAMP,
      client_feedback_count = (
        SELECT COUNT(*) FROM design_feedback
        WHERE handoff_id IN (
          SELECT id FROM design_handoffs WHERE design_project_id = NEW.design_project_id
        )
      )
  WHERE id = NEW.design_project_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_design_project_on_handoff
AFTER INSERT OR UPDATE ON design_handoffs
FOR EACH ROW EXECUTE FUNCTION update_design_project_on_handoff();

-- Update asset_library usage count on download
CREATE OR REPLACE FUNCTION update_asset_download_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE asset_library
  SET download_count = download_count + 1,
      last_used_at = CURRENT_TIMESTAMP
  WHERE id = NEW.asset_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_asset_download
AFTER INSERT ON asset_downloads
FOR EACH ROW EXECUTE FUNCTION update_asset_download_count();

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Insert sample permission roles
INSERT INTO role_permissions (role, user_type, app_name, can_create, can_read, can_update, can_delete, can_comment)
VALUES
  ('Admin', 'internal', 'design_projects', true, true, true, true, true),
  ('Admin', 'internal', 'backlog', true, true, true, true, true),
  ('Designer', 'internal', 'design_projects', true, true, true, false, true),
  ('Designer', 'internal', 'backlog', false, true, false, false, false),
  ('PM', 'internal', 'design_projects', false, true, false, false, true),
  ('PM', 'internal', 'backlog', true, true, true, false, true),
  ('Client', 'client', 'design_projects', false, true, false, false, true),
  ('Client', 'client', 'backlog', false, true, false, false, false)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- END OF EXTENSIONS
-- ============================================================================
