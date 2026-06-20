-- launcher.mediabubble.co — Migration 0005: CRM invoices + quotations
-- PostgreSQL 14+
--
-- Phase 2 CRM slice 2 (LAUNCHER_PLAN_V2.md §5). Linked to clients from 0004.

CREATE TABLE invoices (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number      VARCHAR(100) NOT NULL UNIQUE,
  client_id           UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  status              VARCHAR(50) DEFAULT 'Draft',
  currency            VARCHAR(10) DEFAULT 'EGP',
  subtotal            NUMERIC(12, 2) NOT NULL,
  discount_percentage NUMERIC(5, 2) DEFAULT 0,
  discount_amount     NUMERIC(12, 2) DEFAULT 0,
  vat_percentage      NUMERIC(5, 2) DEFAULT 14.00,
  vat_amount          NUMERIC(12, 2) NOT NULL,
  total               NUMERIC(12, 2) NOT NULL,
  due_date            DATE NOT NULL,
  sent_at             TIMESTAMP,
  paid_at             TIMESTAMP,
  created_by          UUID NOT NULL REFERENCES users(id),
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at          TIMESTAMP
);

CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

CREATE TABLE invoice_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id  UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity    NUMERIC(10, 2) NOT NULL DEFAULT 1,
  unit_price  NUMERIC(12, 2) NOT NULL,
  amount      NUMERIC(12, 2) NOT NULL,
  task_id     UUID REFERENCES tasks(id) ON DELETE SET NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);

CREATE TABLE quotations (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_number        VARCHAR(100) NOT NULL UNIQUE,
  client_id               UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  status                  VARCHAR(50) DEFAULT 'Draft',
  currency                VARCHAR(10) DEFAULT 'EGP',
  subtotal                NUMERIC(12, 2) NOT NULL,
  total                   NUMERIC(12, 2) NOT NULL,
  valid_until             DATE,
  converted_to_invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  created_by              UUID NOT NULL REFERENCES users(id),
  created_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quotations_client_id ON quotations(client_id);
CREATE INDEX idx_quotations_status ON quotations(status);

CREATE TABLE quotation_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id UUID NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  description  TEXT NOT NULL,
  quantity     NUMERIC(10, 2) NOT NULL DEFAULT 1,
  unit_price   NUMERIC(12, 2) NOT NULL,
  amount       NUMERIC(12, 2) NOT NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quotation_items_quotation_id ON quotation_items(quotation_id);
