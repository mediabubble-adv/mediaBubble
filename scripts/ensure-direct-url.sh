#!/usr/bin/env bash
# Prisma schema requires DIRECT_URL; Vercel/Prisma Compute often set DATABASE_URL only.
# Bash ${VAR:-default} does not replace an empty string — treat blank as unset.
set -euo pipefail
if [[ -z "${DIRECT_URL:-}" ]]; then
  export DIRECT_URL="${DATABASE_URL:?DATABASE_URL is required when DIRECT_URL is unset or empty}"
fi
