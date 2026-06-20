-- launcher.mediabubble.co — Migration 0003: Finance transactions
-- PostgreSQL 14+
--
-- ADDITIVE ONLY. The Phase-1 Finance module (LAUNCHER_PLAN_V2.md §4.3) needs a
-- ledger the canonical 0001 schema does not provide. Per the immutability rule,
-- this migration only CREATEs a new table — it never alters or drops existing
-- ones.
--
-- Each row keeps its own currency; the app converts to a chosen display
-- currency at read time (see lib/finance/currency.ts). `created_by` is a bare
-- UUID (nullable, no FK) because most rows are company-level software costs
-- with no originating user.

CREATE TABLE transactions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date           DATE NOT NULL,
  category       VARCHAR(100) NOT NULL,
  type           VARCHAR(20) NOT NULL, -- 'inflow' | 'outflow'
  amount         NUMERIC(14, 2) NOT NULL,
  currency       VARCHAR(3) NOT NULL,  -- 'EGP' | 'AED' | 'USD'
  description    VARCHAR(255),
  payment_method VARCHAR(100),
  recurring      BOOLEAN NOT NULL DEFAULT FALSE,
  created_by     UUID,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_transactions_type ON transactions(type);
