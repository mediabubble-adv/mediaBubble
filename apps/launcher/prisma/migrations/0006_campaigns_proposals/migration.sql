-- launcher.mediabubble.co — Migration 0006: Campaign & Proposal hub
-- PostgreSQL 14+
--
-- Phase 2 Campaign/Proposal (LAUNCHER_PLAN_V2.md §6). Linked to clients from 0004.

CREATE TABLE proposals (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_number  VARCHAR(100) NOT NULL UNIQUE,
  client_id        UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title            VARCHAR(255) NOT NULL,
  summary          TEXT,
  objectives       JSONB,
  deliverables     JSONB,
  timeline_weeks   INTEGER,
  budget_estimate  NUMERIC(12, 2),
  currency         VARCHAR(10) DEFAULT 'EGP',
  status           VARCHAR(50) DEFAULT 'Draft',
  quotation_id     UUID UNIQUE REFERENCES quotations(id) ON DELETE SET NULL,
  created_by       UUID NOT NULL REFERENCES users(id),
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_proposals_client_id ON proposals(client_id);
CREATE INDEX idx_proposals_status ON proposals(status);

CREATE TABLE campaigns (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  brief       TEXT,
  market      VARCHAR(20) DEFAULT 'eg',
  channels    TEXT[] DEFAULT '{}',
  budget      NUMERIC(12, 2),
  currency    VARCHAR(10) DEFAULT 'EGP',
  start_date  DATE,
  end_date    DATE,
  status      VARCHAR(50) DEFAULT 'Planning',
  proposal_id UUID UNIQUE REFERENCES proposals(id) ON DELETE SET NULL,
  created_by  UUID NOT NULL REFERENCES users(id),
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at  TIMESTAMP
);

CREATE INDEX idx_campaigns_client_id ON campaigns(client_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_proposal_id ON campaigns(proposal_id);
