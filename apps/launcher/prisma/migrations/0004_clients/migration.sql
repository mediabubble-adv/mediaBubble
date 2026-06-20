-- launcher.mediabubble.co — Migration 0004: CRM clients
-- PostgreSQL 14+
--
-- ADDITIVE ONLY. Phase 2 CRM module (LAUNCHER_PLAN_V2.md §6) starts with the
-- client directory from LAUNCHER_DATABASE_SCHEMA.sql. Invoices and quotations
-- land in a follow-up migration once this table is live.

CREATE TABLE clients (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                     VARCHAR(255) NOT NULL,
  allowed_domains          TEXT[] DEFAULT '{}',
  primary_contact_name     VARCHAR(255),
  primary_contact_email    VARCHAR(255),
  primary_contact_phone    VARCHAR(50),
  contract_type            VARCHAR(50) DEFAULT 'retainer',
  monthly_budget           NUMERIC(12, 2),
  vat_number               VARCHAR(100),
  status                   VARCHAR(50) DEFAULT 'active',
  brand_assets_url         TEXT,
  client_portal_enabled    BOOLEAN DEFAULT true,
  invoice_view_enabled     BOOLEAN DEFAULT true,
  content_approval_enabled BOOLEAN DEFAULT true,
  created_at               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at               TIMESTAMP,
  UNIQUE(name)
);

CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_status ON clients(status);
