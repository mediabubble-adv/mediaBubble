# Product

## Register

product

## Users

The MediaBubble creative agency team — roughly 25 people across mixed roles:
account managers, creatives, strategists, and operations leads, with a wide
range of technical comfort. The launcher is their daily driver, the place they
open in the morning and return to between client jobs. It runs both in-studio
and remote, and people switch into it from deep client work, so it has to
reorient them fast rather than demand a context rebuild.

Secondary users: clients, who see only the `/portal` surface (magic-link
invoice view), and ops/managers, who lean on the heavier surfaces (finance,
capacity, approvals, leaderboard) for oversight. The platform is scoped to grow
toward ~100 clients and many internal apps, so it is built as one shell that
absorbs new modules rather than a set of separate tools.

## Product Purpose

`launcher.mediabubble.co` is the agency's single internal operations platform.
It consolidates work that was scattered across separate tools into one auditable
home: Task Board, Time Management, CRM, Campaigns, Finance, AI tooling (OPUS +
Prompt Studio), Workflow Automation, team Chat, Gamification/Leaderboard,
Settings, and a client Portal — over a shared Postgres + Prisma schema behind
JWT/RBAC auth.

Two concrete drivers: cost recovery (retire duplicate paid tooling) and
visibility (give ops a truthful, real-time picture of tasks, time, money, and
capacity). Success is adoption: the team treats it as the default hub, managers
get oversight without chasing spreadsheets, and clients get a clean place to see
their invoices.

## Brand Personality

"Obsidian Creative Studio" — **confident, crafted, calm.** A professional studio
tool that respects the user's attention. Deep charcoal canvas, brand-blue as the
working accent, brand-yellow reserved for genuine calls to action, flat
elevation (borders carry hierarchy, not drop shadows). The voice is clear and
direct: plain labels, honest states, no corporate padding and no cutesy
over-familiarity. Motion is felt, not performed.

## Anti-references

- **Enterprise/corporate heaviness.** No Jira/SAP density, cluttered toolbars,
  or joyless gray-on-gray. It should feel light and considered, not
  bureaucratic.
- **Consumer-playful / gamified-cute.** Despite the leaderboard and XP, no
  mascots, confetti, or childish rounded blobs. The gamification stays a quiet
  professional nudge, not a game.
- **Over-designed / flashy.** No heavy motion, decorative glassmorphism, or
  ornament that slows the daily workflow. Craft should be invisible until
  needed.

## Design Principles

1. **Daily driver, not a showpiece.** Optimize for the hundredth visit, not the
   first. Speed and clarity beat spectacle; keyboard-initiated actions stay
   instant.
2. **One home for mixed roles.** Approachable enough for an account manager,
   dense enough for ops — without splitting into two different apps. Progressive
   disclosure over separate surfaces.
3. **Flat elevation, earned motion.** Borders over shadows. Animate only what
   rewards (XP fills), orients (route/state changes), or confirms (press
   feedback); never decoration for its own sake.
4. **Craft is invisible.** Polish should make work frictionless, not announce
   itself. The unseen details (paused toast timers, origin-aware popovers,
   named transitions) compound into trust.
5. **Auditable and honest.** The platform exists to give a truthful picture.
   Surfaces show real states and real numbers — no fake metrics, no empty
   states pretending to be full.

## Accessibility & Inclusion

- **WCAG 2.1 AA** as the baseline: body text ≥4.5:1 against its background,
  keyboard navigation, visible `focus-visible` states, and a
  `prefers-reduced-motion` alternative for every animation (already established
  in the codebase).
- **First-class Arabic / RTL.** The brand system defines a Cairo Arabic
  typeface; the platform is built with bilingual intent. Layouts use logical
  properties and must mirror cleanly; type and numerals stay legible in both
  directions.
- **Do not rely on hue alone.** Status (success/warning/danger, task columns,
  utilization tones) must carry a second signal — icon, label, or shape — for
  color-blind users.
