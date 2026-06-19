-- launcher.mediabubble.co — Migration 0002: Auth tokens
-- PostgreSQL 14+
--
-- ADDITIVE ONLY. The Week 2 auth spec (email verification + password reset)
-- needs token storage that the canonical 0001 schema does not provide. Per the
-- immutability rule, this migration only CREATEs new tables — it never alters
-- or drops existing ones.
--
-- Stateless JWT access tokens need no storage. These tables back the two
-- one-time-token flows; refresh-token rotation (if added later) gets its own
-- additive migration.

-- Email verification tokens (POST /api/auth/verify-email)
CREATE TABLE email_verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL UNIQUE, -- store a hash, never the raw token
  expires_at TIMESTAMP NOT NULL,
  consumed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);
CREATE INDEX idx_email_verification_tokens_expires_at ON email_verification_tokens(expires_at);

-- Password reset tokens (POST /api/auth/reset-password)
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL UNIQUE, -- store a hash, never the raw token
  expires_at TIMESTAMP NOT NULL,
  consumed_at TIMESTAMP,
  requested_ip INET,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
