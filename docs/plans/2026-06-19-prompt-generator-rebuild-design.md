# Prompt Generator Rebuild — Design

**Date:** 2026-06-19
**App:** `apps/brand` (mediaBubble Brand Guidelines)
**Status:** Validated, ready for implementation

## Goal

Replace the existing 5-tab "Brand AI Prompts" page with a rebuilt, three-pane
Prompt Generator that auto-populates from real brand data and produces
brand-compliant AI prompts for image and video models.

## Decisions (locked)

| Decision    | Choice                                                |
| ----------- | ----------------------------------------------------- |
| Direction   | Full rebuild to spec (retire old tab UI)              |
| Persistence | **Client-side only** (localStorage) — no backend      |
| Modes       | **Image + Video**                                     |
| Salvage     | Port validator scoring + template strings; rebuild UI |

### Explicitly out of scope

No database, no auth/permissions (Admin/Editor/Viewer), no audit log, no server
API, no org-shared templates. The spec's "backend phase" assumes infrastructure
that **does not exist** in this repo (the monorepo is three frontend Next.js
apps with no DB/auth/API). Those are a separate future project.

## Source of truth (real brand DNA)

From `apps/brand/components/constants.ts` — not the spec's stale values:

- **mediaBubble**, Hurghada agency. Tagline: "Strategic creative that fills
  rooms and grows brands."
- Brand Blue `#2196F3` (primary), Dark Blue `#1565C0`, Brand Yellow `#FFC107`
  (accent/CTA), Mint `#1AD191`, Deep Charcoal `#0D0F12`.
- Fonts: Poppins (display), Inter (body), JetBrains Mono (code).
- CSS-variable theming (`--color-brand-*`), dark mode + RTL Masri i18n already wired.

## Architecture

**Swap point:** `BrandGuidelinesApp.tsx` — `case 'prompts'` renders
`<PromptGeneratorPage />` instead of `<PromptsPage />`. Nothing else in the app
changes. Retired: `PromptsPage`, `InteractivePromptBuilder`,
`PromptTemplateLibrary`, `UseCaseExamples`, `BrandDNAFoundation`.
`PromptValidator` scoring is extracted (not deleted).

```
apps/brand/components/prompt-generator/
  PromptGeneratorPage.tsx      # owns state, 3-pane shell
  panes/
    ConfigPane.tsx             # LEFT: mode, subcategory, controls
    PreviewPane.tsx            # CENTER: live prompt, actions, validation
    ContextPane.tsx            # RIGHT: brand DNA, presets, help
  controls/
    ModeSwitch.tsx             # Image | Video
    ChipGroup.tsx              # reusable selectable chips
    LightingSystem.tsx         # 3 tiers
    ModelSelector.tsx          # model list switches by mode
  lib/
    brand-dna.ts               # constants.ts -> typed BrandDNA
    prompt-composer.ts         # pure compose(config, dna, model) -> text
    validator.ts               # ported scoring
    templates.ts               # ported template strings, typed
    persistence.ts             # localStorage: history + saved templates
    types.ts
```

**Principles:** zero new dependencies; colors via CSS vars (dark mode free);
all strings via `useI18n()` `t()` (Masri/RTL); brand DNA from `constants.ts`
only (no hardcoded hexes).

## Layout & data flow

Desktop grid `[config 320px | preview 1fr | context 340px]`; stacks to tabs on
mobile; RTL via logical properties.

- **ConfigPane** — `ModeSwitch`; Image: subcategory chips (product, character,
  landscape, marketing) + composition + lighting + color emphasis; Video:
  camera (shot, movement), motion intensity, duration, pacing + lighting;
  `ModelSelector` (Image: Midjourney/Flux/Grok · Video: Runway/Kling).
- **PreviewPane** — live composed prompt (JetBrains Mono), model-specific
  formatting, action bar (Copy, Export `.txt`/`.json`, Share link, Save
  template), inline validation badge, safe-zone hints.
- **ContextPane** — Brand DNA auto-filled (swatches, voice, negative-prompt
  anti-values) with "Edit in Colors/Voice →" deep-links (`setActiveTab`),
  recommended presets, contextual help.

Data flow is one-directional: `config` state → `prompt-composer` (pure) →
preview text → `validator` scores it. Composed prompt + score are derived
(`useMemo`), never stored.

## State & persistence

```ts
type Mode = "image" | "video";
type GeneratorConfig = {
  mode: Mode;
  subcategory: string;
  composition: { orientation: string; density: string };
  camera?: { shot: string; movement: string; motion: string; duration: string };
  lighting: "soft" | "studio" | "dramatic";
  model: string;
  colorEmphasis: string[]; // brand color ids
};
```

localStorage namespaced `mb.promptgen.*`:

- `savedTemplates`: `{id, name, config, createdAt}[]`
- `history`: last 25 generated prompts (FIFO cap)
- share link: config serialized → base64 in URL hash, versioned (`v:1`)

## Error handling

- localStorage wrapped in try/catch (quota/private mode) → degrade to in-memory,
  one-line "saving unavailable" notice, never crash.
- Malformed/old share link or template → ignore, default config, toast.
- Clipboard failure → fallback selectable textarea.
- `prompt-composer` is total: every config yields valid text; unknown model →
  default formatter.

## Testing

- Unit: `prompt-composer` (snapshot per mode×model), `validator` thresholds,
  `persistence` round-trip + corrupt-data, share-link encode/decode/version-skew.
- Component: pane render, mode switch swaps model list, dark mode + RTL, copy/export.
- A11y: keyboard nav, focus order, WCAG AA contrast.
