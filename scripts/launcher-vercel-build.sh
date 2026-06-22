#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

VERCEL_ENV="${VERCEL_ENV:-production}"
SCHEMA="apps/launcher/prisma/schema.prisma"

if [[ -n "${DATABASE_URL:-}" ]]; then
  # shellcheck source=scripts/ensure-direct-url.sh
  . "$ROOT/scripts/ensure-direct-url.sh"
  npx prisma migrate deploy --schema "$SCHEMA"
elif [[ "$VERCEL_ENV" == "production" ]]; then
  echo "ERROR: DATABASE_URL is not set for this build." >&2
  echo "Launcher production deploys need DATABASE_URL (and usually DIRECT_URL) for prisma migrate deploy." >&2
  echo "From repo root with apps/launcher/prisma/.env filled: bash apps/launcher/scripts/ship-env-to-vercel.sh" >&2
  echo "Or set Production env in https://vercel.com/mediabubble/launcher/settings/environment-variables" >&2
  exit 1
else
  echo "WARN: DATABASE_URL not set for VERCEL_ENV=$VERCEL_ENV — skipping prisma migrate deploy (Preview/Development)."
  echo "      Preview DB env: bash apps/launcher/scripts/ship-env-to-vercel.sh or Vercel dashboard → Preview."
fi

npx prisma generate --schema "$SCHEMA"
npx nx build launcher
