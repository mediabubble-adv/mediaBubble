#!/usr/bin/env bash
# Prisma schema requires DIRECT_URL; Vercel/Prisma Compute often set DATABASE_URL only.
# Bash ${VAR:-default} does not replace an empty string — treat blank as unset.
set -euo pipefail
if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL is not set for this build." >&2
  echo "Launcher Vercel deploys need DATABASE_URL (and usually DIRECT_URL) at build time for prisma migrate deploy." >&2
  echo "From repo root with apps/launcher/.env.local filled: bash apps/launcher/scripts/ship-env-to-vercel.sh" >&2
  echo "Or set Production + Preview env in https://vercel.com/mediabubble/launcher/settings/environment-variables" >&2
  exit 1
fi
if [[ -z "${DIRECT_URL:-}" ]]; then
  export DIRECT_URL="$DATABASE_URL"
fi
