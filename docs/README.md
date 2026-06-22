# MediaBubble Documentation

Planning, strategy, brand, and execution docs live here. Application code lives in `apps/` and `packages/` at the repository root.

**Onboarding:** Start with the root **[README.md](../README.md)** (install, dev scripts, architecture, env vars, CI). Then use this index for deeper planning docs.

## Master context (AI handoff)

**[CONTEXT.md](./CONTEXT.md)** — Single file covering repo structure, what's built, what's planned, all folders, progress %, and reading order for other AI tools. **Upload this first.**

## Start here

| Doc                                                                                  | Purpose                                                                    |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| [../README.md](../README.md)                                                         | **Monorepo onboarding** — install, apps, packages, scripts, CI, deployment |
| [../apps/launcher/README.md](../apps/launcher/README.md)                             | **MediaBubble Launcher** — DB setup, modules, Vercel ship checklist        |
| [CONTEXT.md](./CONTEXT.md)                                                           | **Full repo context** — structure, progress, plans                         |
| [website/README.md](./website/README.md)                                             | **Website transformation** — audit, phase 1, service pages (Jun 2026)      |
| [opus/README.md](./opus/README.md)                                                   | **OPUS** — autonomous marketing platform inside Launcher                   |
| [getting-started/START_HERE.md](./getting-started/START_HERE.md)                     | OpenCode agent consolidation execution                                     |
| [getting-started/QUICK_DECISION_GUIDE.md](./getting-started/QUICK_DECISION_GUIDE.md) | Three decisions before OpenCode work                                       |
| [app/EXECUTION_SUMMARY.md](./app/EXECUTION_SUMMARY.md)                               | Next.js app audit + 4-phase roadmap                                        |
| [planning/MASTER_ROADMAP.md](./planning/MASTER_ROADMAP.md)                           | Master product / WordPress roadmap                                         |

## Directory map

```
docs/
├── CONTEXT.md           Master AI handoff (upload first)
├── README.md            This index
│
├── website/             Jun 2026 website audits, improvements, service pages
├── launcher/            MediaBubble Launcher — roadmaps, specs, architecture, SQL
├── opus/                OPUS marketing platform — product, architecture, development
├── app/                 Next.js app audits, component library, UI implementation guides
├── tools/               Internal tool prototypes (Prompt Generator)
├── operations/          Deployment checklists, adoption & accountability frameworks
│
├── getting-started/     Entry guides, OpenCode/Cursor quick start, checklists
├── planning/            Roadmaps, master checklists, executive briefs
├── plans/               Dated one-off design/plan documents
├── phases/              Phase 1–3 deliverables
├── execution/           Claude Code copy-paste execution packs & briefs
│
├── brand/               Brand audits, consistency guides, design/product specs
├── business/            Strategy, AI agents, HR, finance, marketing workflows
├── developing/          Website rebuild specs, design system, brand guidelines
├── content/             Site content drafts, copy improvements, i18n notes
├── agents/              Agent specs, skill definitions, audits
├── opencode/            Agent/skill consolidation architecture
├── audits/              Codebase & plan audit reports
├── reference/           Legacy scrape, branding assets, SOPs, taxonomy
├── assets/              design-tokens.css, diagrams, shared assets
└── archive/             Superseded or legacy one-off notes
```

## By topic

### Website (conversion & UX — Jun 2026)

- [website/README.md](./website/README.md) — index for the full bundle
- [website/WEBSITE_IMPROVEMENT_PLAN.md](./website/WEBSITE_IMPROVEMENT_PLAN.md)
- [website/PHASE_1_IMPLEMENTATION_GUIDE.md](./website/PHASE_1_IMPLEMENTATION_GUIDE.md)
- [website/SERVICE_PAGE_ARCHITECTURE.md](./website/SERVICE_PAGE_ARCHITECTURE.md)

### MediaBubble Launcher (internal ops)

- **[launcher/LAUNCHER_COMPREHENSIVE_GUIDE.md](./launcher/LAUNCHER_COMPREHENSIVE_GUIDE.md)** — consolidated guide (26 docs)
- [launcher/LAUNCHER_PLAN_V2.md](./launcher/LAUNCHER_PLAN_V2.md) — Phase 1 status & Phase 2 roadmap
- [launcher/LAUNCHER_ARCHITECTURE.md](./launcher/LAUNCHER_ARCHITECTURE.md) — dashboard shell architecture
- [launcher/WORKSPACE_ECOSYSTEM.md](./launcher/WORKSPACE_ECOSYSTEM.md) — seven-department workspace model
- [launcher/ADVANCED_LAUNCHER_ORCHESTRATION.md](./launcher/ADVANCED_LAUNCHER_ORCHESTRATION.md) — orchestration framework
- [launcher/LAUNCHER_DATABASE_SCHEMA.sql](./launcher/LAUNCHER_DATABASE_SCHEMA.sql) — Prisma schema reference

### OPUS (autonomous marketing)

- [opus/README.md](./opus/README.md) — product overview + folder index
- [opus/product/PRD.md](./opus/product/PRD.md) — product requirements
- [opus/development/README.md](./opus/development/README.md) — implementation guides
- [opus/RETHINK_CLEAN_ARCHITECTURE.md](./opus/RETHINK_CLEAN_ARCHITECTURE.md) — clean-slate strategic rethink
- [opus/STRATEGIC_DECISION_ANALYSIS.md](./opus/STRATEGIC_DECISION_ANALYSIS.md) — continue vs rebuild analysis

### Tools & operations

- [tools/prompt-generator/README.md](./tools/prompt-generator/README.md) — Advanced Prompt Generator
- [operations/DEPLOYMENT_CHECKLIST.md](./operations/DEPLOYMENT_CHECKLIST.md) — pre-launch checklist
- [operations/ADOPTION_ACCOUNTABILITY_SYSTEM.md](./operations/ADOPTION_ACCOUNTABILITY_SYSTEM.md) — adoption framework

### Getting started & IDE guides

- [getting-started/README_START_HERE.md](./getting-started/README_START_HERE.md)
- [getting-started/CURSOR_IDE_EXECUTION_GUIDE.md](./getting-started/CURSOR_IDE_EXECUTION_GUIDE.md)
- [getting-started/CLAUDE_CODE_QUICK_START.md](./getting-started/CLAUDE_CODE_QUICK_START.md)

### Application (Next.js)

- [app/MEDIABUBBLE_APP_AUDIT_REPORT.md](./app/MEDIABUBBLE_APP_AUDIT_REPORT.md)
- [app/COMPONENT_LIBRARY.md](./app/COMPONENT_LIBRARY.md)
- [app/IMPLEMENTATION_PRIORITIES.md](./app/IMPLEMENTATION_PRIORITIES.md)

### Audits

- [audits/COMPREHENSIVE_AUDIT_REPORT.md](./audits/COMPREHENSIVE_AUDIT_REPORT.md)
- [audits/AUDIT_FIX_EXECUTION_PLAN.md](./audits/AUDIT_FIX_EXECUTION_PLAN.md)

### Brand & design system

- [developing/Brand-Guidelines/BRAND_GUIDELINES_V2.0.md](./developing/Brand-Guidelines/BRAND_GUIDELINES_V2.0.md)
- [brand/PRODUCT.md](./brand/PRODUCT.md)
- [brand/DESIGN.md](./brand/DESIGN.md)

### OpenCode / agents

- [opencode/OPENCODE_REORGANIZATION_PLAN.md](./opencode/OPENCODE_REORGANIZATION_PLAN.md)
- [execution/CLAUDE_CODE_IMPLEMENTATION_BRIEF.md](./execution/CLAUDE_CODE_IMPLEMENTATION_BRIEF.md)
- [agents/](./agents/) — skill definitions and phase-1 agent work

### Business, strategy & marketing

- [business/strategy/COMPLETE_STRATEGY_SUMMARY.md](./business/strategy/COMPLETE_STRATEGY_SUMMARY.md)
- [business/ai-agents/AI_CHAT_AGENT_SPECIFICATION.md](./business/ai-agents/AI_CHAT_AGENT_SPECIFICATION.md)
- [business/marketing/MAGNIFIC_ASSET_WORKFLOW.md](./business/marketing/MAGNIFIC_ASSET_WORKFLOW.md)

### Development specs & planning

- [planning/MASTER_DEVELOPMENT_PLAN.md](./planning/MASTER_DEVELOPMENT_PLAN.md)
- [developing/website/MEDIABUBBLE_DEVELOPER_GUIDE.md](./developing/website/MEDIABUBBLE_DEVELOPER_GUIDE.md)
- [developing/Design-System/PHASE_1_DESIGN_SYSTEM_GUIDE.md](./developing/Design-System/PHASE_1_DESIGN_SYSTEM_GUIDE.md)
