#!/usr/bin/env bash
# Symlink MediaBubble Arabic skills from .claude/skills into .cursor/skills
# so Cursor agents discover the same skill tree as Claude Code.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/.claude/skills"
DEST="$ROOT/.cursor/skills"

mkdir -p "$DEST"

count=0
for d in "$SRC"/arabic-*; do
  [[ -d "$d" ]] || continue
  name="$(basename "$d")"
  link="$DEST/$name"
  target="../../.claude/skills/$name"
  rm -rf "$link"
  ln -s "$target" "$link"
  count=$((count + 1))
done

echo "Linked $count Arabic skills: $DEST -> $SRC"
