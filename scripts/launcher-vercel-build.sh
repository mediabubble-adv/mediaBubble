#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
. "$ROOT/scripts/ensure-direct-url.sh"
prisma migrate deploy --schema apps/launcher/prisma/schema.prisma
prisma generate --schema apps/launcher/prisma/schema.prisma
nx build launcher
