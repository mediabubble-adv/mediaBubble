#!/usr/bin/env bash
# Push launcher env vars to Vercel (production + preview + development).
# Run from repo root: bash apps/launcher/scripts/ship-env-to-vercel.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LAUNCHER="$ROOT/apps/launcher"
cd "$LAUNCHER"

if ! command -v vercel >/dev/null; then
  echo "Install Vercel CLI: npm i -g vercel@latest" >&2
  exit 1
fi

read_env() {
  local key="$1"
  local file="$2"
  [[ -f "$file" ]] || return 1
  local line val
  line="$(grep -E "^${key}=" "$file" | head -1 || true)"
  [[ -n "$line" ]] || return 1
  val="${line#*=}"
  val="${val%\"}"
  val="${val#\"}"
  val="${val%\'}"
  val="${val#\'}"
  if [[ -z "$val" || "$val" == *"[PROJECT_REF]"* || "$val" == "change-me-in-production" ]]; then
    return 1
  fi
  printf '%s' "$val"
}

add_sensitive() {
  local key="$1"
  local val="$2"
  for env in production preview development; do
    printf '%s' "$val" | vercel env add "$key" "$env" --yes --sensitive --force
    echo "  ✓ $key ($env)"
  done
}

add_plain() {
  local key="$1"
  local val="$2"
  local env="$3"
  vercel env add "$key" "$env" --value "$val" --yes --force --no-sensitive
  echo "  ✓ $key ($env)"
}

echo "→ Syncing env to mediabubble/launcher …"

for key in DATABASE_URL DIRECT_URL; do
  val="$(read_env "$key" "$LAUNCHER/prisma/.env" || read_env "$key" "$LAUNCHER/.env.local" || true)"
  if [[ -z "${val:-}" && "$key" == "DIRECT_URL" ]]; then
    val="$(read_env DATABASE_URL "$LAUNCHER/prisma/.env" || read_env DATABASE_URL "$LAUNCHER/.env.local" || true)"
  fi
  if [[ -z "${val:-}" ]]; then
    echo "  ✗ $key missing — set in apps/launcher/.env.local or prisma/.env" >&2
    exit 1
  fi
  add_sensitive "$key" "$val"
done

for key in JWT_SECRET RESEND_API_KEY GEMINI_API_KEY; do
  val="$(read_env "$key" "$LAUNCHER/.env.local" || true)"
  [[ -z "${val:-}" ]] && continue
  add_sensitive "$key" "$val"
done

if ! read_env JWT_SECRET "$LAUNCHER/.env.local" >/dev/null 2>&1; then
  echo "  ! JWT_SECRET not in .env.local — generate for production:"
  echo "    openssl rand -base64 48 | vercel env add JWT_SECRET production --yes --sensitive"
fi

add_plain NEXT_PUBLIC_SITE_URL "https://launcher.mediabubble.co" production
add_plain NEXT_PUBLIC_SITE_URL "https://launcher.mediabubble.co" preview
add_plain NEXT_PUBLIC_SITE_URL "http://localhost:3003" development

echo "Done. Redeploy: git push origin master  (or: cd apps/launcher && vercel --prod)"
