-- Client portal magic-link tokens (Phase 3 slice 1)

CREATE TABLE client_portal_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  email       VARCHAR(255) NOT NULL,
  token_hash  VARCHAR(255) NOT NULL UNIQUE,
  expires_at  TIMESTAMP NOT NULL,
  used_at     TIMESTAMP,
  created_by  UUID NOT NULL REFERENCES users(id) ON DELETE NO ACTION,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_client_portal_tokens_client_id ON client_portal_tokens(client_id);
CREATE INDEX idx_client_portal_tokens_expires_at ON client_portal_tokens(expires_at);
