---
target: leaderboard
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-06-23T03-05-18Z
slug: cher-app-app-leaderboard-leaderboard-dashboard-tsx
---
# Critique: Team Leaderboard (`apps/launcher/app/(app)/leaderboard/leaderboard-dashboard.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | XP, level, progress, "You" badge, unlocked count all visible |
| 2 | Match System / Real World | 3 | Medals + "streak" read naturally; "-200 needed" breaks real-world logic |
| 3 | User Control and Freedom | 3 | Global/Department toggle; little else to control (acceptable) |
| 4 | Consistency and Standards | 2 | Off-brand colors (blue-500 glow, raw hex golds); invalid Tailwind classes |
| 5 | Error Prevention | 2 | `progressPercent` clamped but `needed` is not — negative value shown |
| 6 | Recognition Rather Than Recall | 4 | Everything labeled; icons paired with text; inline achievement descriptions |
| 7 | Flexibility and Efficiency | 3 | Only a 2-way filter; no table sort/search, no keyboard accelerators |
| 8 | Aesthetic and Minimalist Design | 3 | Clean overall; perpetual animations + broken 3rd podium add noise |
| 9 | Error Recovery | 2 | No empty-state row when the table has no users |
| 10 | Help and Documentation | 3 | Achievement descriptions teach the XP system inline |
| **Total** | | **28/40** | **Good (lower band) — solid foundation, real bugs to fix** |

## Anti-Patterns Verdict

**Does this look AI-generated?** Mostly no. The data is honest (real progress stats, genuine locked states), `tabular-nums` is used consistently, and the IA is sensible. But two things pull it toward the **gamified-cute anti-reference the brief explicitly rejects**: a perpetually `animate-bounce`-ing "1" badge and an `animate-pulse` flame with an always-on glow. That is the Duolingo-cute register, not "confident, crafted, calm."

**Deterministic scan:** `detect.mjs` returned 1 finding — `bounce-easing` (`animate-bounce`) at line 296.

**Browser evidence (caught what the detector missed):** computed-style inspection of the rendered podium revealed two invalid Tailwind classes silently dropping to `auto`:
- 3rd-place pedestal `h-18` -> `height: auto` (2nd = 96px, 1st = 128px). Pedestal collapses to a sliver.
- 3rd-place rank badge `h-4.5 w-4.5` -> `auto`/`auto` (2nd = 20px, 1st = 24px). Badge is unsized.

## Overall Impression

Strong, honest skeleton — clear hierarchy, real numbers, inline teaching — but the **centerpiece is visibly broken**: the 3rd-place pedestal collapses and floats below its avatar, so the one moment meant to feel rewarding looks like a rendering error. Paired with a math bug that prints "-200 needed for Level 2," the page undercuts the "auditable and honest" principle exactly where it should motivate. Fix the two bugs and dial back the perpetual motion, and this jumps a full band.

## What's Working

1. **Honest, legible data.** Achievements show true progress (`3/4 days`, `300/1,000 XP`) and real locked states (Lock icon + 60% opacity). `tabular-nums` everywhere keeps numbers aligned.
2. **Recognition over recall.** Rank uses medals AND numbers; achievements pair icon + title + description + stat. Nothing requires memory.
3. **Sensible IA.** Personal card -> streak -> podium -> rankings -> achievements is a natural "me to everyone" narrative.

## Priority Issues

- **[P1] 3rd-place podium collapses (invalid Tailwind classes).** `h-18`, `h-4.5`, `w-4.5` aren't in the scale, so they render `auto`. Fix: valid values — pedestal `h-16` or `h-[72px]`, badge `h-4 w-4` or `h-[18px] w-[18px]`. Verify 1st > 2nd > 3rd. -> `$impeccable polish`
- **[P1] Negative XP copy: "-200 needed for Level 2."** `needed` isn't clamped. Fix: `Math.max(0, needed)`, show "Ready to level up" at 0; reconcile stored `level` with `xp`. -> `$impeccable harden`
- **[P2] Perpetual, unguarded motion.** `animate-bounce` (banned) + `animate-pulse`, no reduced-motion alternative; reads gamified-cute. Fix: drop bounce, make flame static or pulse only on increment, guard with reduced-motion. -> `$impeccable animate`
- **[P2] Off-token colors.** Glow uses Tailwind blue-500 not brand `#2196F3`; golds are raw `#CA8A04`/`amber-700`/`slate-400`. Fix: semantic tokens. -> `$impeccable colorize`
- **[P3] Podium fights "flat elevation."** Gradient fills + glow shadows contradict borders-over-shadows. Fix: flat tinted fills + borders; height carries hierarchy. -> `$impeccable quieter`

## Persona Red Flags

**Sam (Accessibility):** bounce/pulse with no reduced-motion alternative; decorative labels at `text-muted-foreground/40–/50` likely fail 3:1; golds lean on hue.
**Riley (Stress Tester):** empty `data` -> empty rankings table with no message; high-XP Level-1 user prints negative "needed."
**Maya (Mixed-Comfort Agency Teammate, project persona):** broken 3rd pedestal reads as "buggy tool," eroding trust in a visibility platform.

## Minor Observations

- No sortable columns for a growing team.
- Achievement id `streak_3` but copy says "4+ day streak."
- `currentUser` undefined silently hides the whole top card with no fallback.

## Questions to Consider

- Is the leaderboard meant to be the one "celebration" surface, or should it match the calm flat system?
- Should level be derived from XP at read time so they can't disagree?
- What's a brand-honest "win" moment without bounce/pulse — a one-time reveal on rank change?
