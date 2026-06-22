# OPUS UI Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/opus` | `opus-hub.tsx` | Command center, quick actions |
| `/opus/briefs/new` | `brief-builder.tsx` | 5-field brief form |
| `/opus/triggers` | `triggers-dashboard.tsx` | Trigger list + run + history |
| `/opus/usage` | `usage-dashboard.tsx` | Quota meters |
| `/opus/campaigns/[id]/performance` | `performance-view.tsx` | ROAS, platform split, insights |

## Navigation

OPUS added to main sidebar via `app/(app)/_shell/nav.ts` (Sparkles icon).

## Design

Uses Launcher design system: `Card`, `Badge`, `Button`, `brand-*` tokens via existing globals.

Wireframes: [session/07-ui-wireframes.md](../session/07-ui-wireframes.md)
