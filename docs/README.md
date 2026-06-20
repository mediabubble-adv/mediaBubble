# MediaBubble Documentation

Planning, strategy, brand, and execution docs live here. Application code lives in `apps/` and `packages/` at the repository root.

**Onboarding:** Start with the root **[README.md](../README.md)** (install, dev scripts, architecture, env vars, CI). Then use this index for deeper planning docs.

## Master context (AI handoff)

**[CONTEXT.md](./CONTEXT.md)** — Single file covering repo structure, what’s built, what’s planned, all folders, progress %, and reading order for other AI tools. **Upload this first.**

## Start here

| Doc | Purpose |
|-----|---------|
| [../README.md](../README.md) | **Monorepo onboarding** — install, apps, packages, scripts, CI, deployment |
| [../apps/launcher/README.md](../apps/launcher/README.md) | **MediaBubble Launcher** — DB setup, modules, Vercel ship checklist |
| [CONTEXT.md](./CONTEXT.md) | **Full repo context** — structure, progress, plans |
| [website/README.md](./website/README.md) | **Website transformation** — audit, phase 1, service pages (Jun 2026) |
| [getting-started/START_HERE.md](./getting-started/START_HERE.md) | OpenCode agent consolidation execution |
| [getting-started/QUICK_DECISION_GUIDE.md](./getting-started/QUICK_DECISION_GUIDE.md) | Three decisions before OpenCode work |
| [app/EXECUTION_SUMMARY.md](./app/EXECUTION_SUMMARY.md) | Next.js app audit + 4-phase roadmap |
| [planning/MASTER_ROADMAP.md](./planning/MASTER_ROADMAP.md) | Master product / WordPress roadmap |

## Directory map

```
docs/
├── website/             Website audits, improvements, menus, service-page architecture
├── getting-started/     Entry guides, OpenCode/Cursor quick start, checklists
├── app/                 App audits, component library, implementation guides
├── brand/               Brand audits and consistency guides
├── opencode/            Agent/skill consolidation architecture
├── agents/              Agent specs, skill definitions, audits
├── phases/              Phase 1–3 deliverables
├── execution/           Claude Code copy-paste execution packs & briefs
├── planning/            Roadmaps, master checklists, product/design briefs
├── business/            Strategy, AI agents, HR, finance, marketing workflows
├── developing/          Website rebuild specs, design system, brand guidelines, image standards
├── content/             Site content drafts, copy improvements
├── reference/           Legacy scrape, branding assets, taxonomy YAML
├── assets/              design-tokens.css, diagrams, shared assets
└── archive/             Superseded or legacy one-off notes
```

## By topic

### Website (conversion & UX — Jun 2026)
- [website/README.md](./website/README.md) — index for the full bundle
- [website/WEBSITE_IMPROVEMENT_PLAN.md](./website/WEBSITE_IMPROVEMENT_PLAN.md) — Website improvement plan
- [website/WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md](./website/WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md) — Website audit & improvement plan
- [website/PHASE_1_IMPLEMENTATION_GUIDE.md](./website/PHASE_1_IMPLEMENTATION_GUIDE.md) — Phase 1 implementation guide
- [website/SERVICE_PAGE_ARCHITECTURE.md](./website/SERVICE_PAGE_ARCHITECTURE.md) — Service page template architecture
- [website/BEFORE_AFTER_COMPARISON.md](./website/BEFORE_AFTER_COMPARISON.md) — Before/after site comparison

### Getting Started & IDE Guides
- [getting-started/README_START_HERE.md](./getting-started/README_START_HERE.md) — Website improvement start here
- [getting-started/EXECUTION_START_HERE.md](./getting-started/EXECUTION_START_HERE.md) — Audit execution start here guide
- [getting-started/CURSOR_IDE_EXECUTION_GUIDE.md](./getting-started/CURSOR_IDE_EXECUTION_GUIDE.md) — Cursor IDE execution guide
- [getting-started/CLAUDE_CODE_QUICK_START.md](./getting-started/CLAUDE_CODE_QUICK_START.md) — Claude Code quick start reference
- [getting-started/QUICK_IMPLEMENTATION_CHECKLIST.md](./getting-started/QUICK_IMPLEMENTATION_CHECKLIST.md) — Quick implementation checklist
- [getting-started/QUICK_REFERENCE.md](./getting-started/QUICK_REFERENCE.md) — Audit fixes quick reference
- [getting-started/README_PLAN_OVERVIEW.md](./getting-started/README_PLAN_OVERVIEW.md) — Development plan overview

### Application (Next.js)
- [app/MEDIABUBBLE_APP_AUDIT_REPORT.md](./app/MEDIABUBBLE_APP_AUDIT_REPORT.md) — App audit report
- [app/COMPONENT_LIBRARY.md](./app/COMPONENT_LIBRARY.md) — Component library overview
- [app/IMPLEMENTATION_PRIORITIES.md](./app/IMPLEMENTATION_PRIORITIES.md) — Next.js implementation priorities
- [app/SIDEBAR_IMPLEMENTATION_GUIDE.md](./app/SIDEBAR_IMPLEMENTATION_GUIDE.md) — Sidebar implementation guide
- [app/HEADER_SCROLL_IMPLEMENTATION_GUIDE.md](./app/HEADER_SCROLL_IMPLEMENTATION_GUIDE.md) — Header scroll behavior implementation guide

### Audits
- [audits/COMPREHENSIVE_AUDIT_REPORT.md](./audits/COMPREHENSIVE_AUDIT_REPORT.md) — Comprehensive codebase audit report
- [audits/AUDIT_FIX_EXECUTION_PLAN.md](./audits/AUDIT_FIX_EXECUTION_PLAN.md) — Critical fixes execution plan
- [audits/AUDIT_SUMMARY_QUICK_START.md](./audits/AUDIT_SUMMARY_QUICK_START.md) — Audit summary quick start
- [audits/BUGS_VERIFICATION_REPORT.md](./audits/BUGS_VERIFICATION_REPORT.md) — Complete bugs verification report
- [audits/PLAN_VERIFICATION_REPORT.md](./audits/PLAN_VERIFICATION_REPORT.md) — Development plan verification report

### Brand & Design system
- [developing/Brand-Guidelines/BRAND_GUIDELINES_V2.0.md](./developing/Brand-Guidelines/BRAND_GUIDELINES_V2.0.md) — Brand guidelines V2
- [developing/Brand-Guidelines/MAGNIFIC_PEOPLE_COLOR_GUIDELINES.md](./developing/Brand-Guidelines/MAGNIFIC_PEOPLE_COLOR_GUIDELINES.md) — Magnific people outfit color guidelines
- [brand/](./brand/) — brand audits and consistency roadmaps

### OpenCode / agents
- [opencode/OPENCODE_REORGANIZATION_PLAN.md](./opencode/OPENCODE_REORGANIZATION_PLAN.md) — Agent consolidation plan
- [execution/CLAUDE_CODE_IMPLEMENTATION_BRIEF.md](./execution/CLAUDE_CODE_IMPLEMENTATION_BRIEF.md) — Claude Code implementation brief
- [execution/CLAUDE_CODE_EXECUTION_PACK.md](./execution/CLAUDE_CODE_EXECUTION_PACK.md) — Claude Code execution prompts pack
- [agents/](./agents/) — skill definitions and phase-1 agent work

### Business, Strategy & Marketing
- [business/strategy/COMPLETE_STRATEGY_SUMMARY.md](./business/strategy/COMPLETE_STRATEGY_SUMMARY.md) — 52-week complete business strategy
- [business/strategy/PROJECT_KICKOFF_SUMMARY.md](./business/strategy/PROJECT_KICKOFF_SUMMARY.md) — Strategy project kickoff
- [business/ai-agents/AI_CHAT_AGENT_SPECIFICATION.md](./business/ai-agents/AI_CHAT_AGENT_SPECIFICATION.md) — 24/7 AI chat lead agent spec
- [business/marketing/MAGNIFIC_ASSET_WORKFLOW.md](./business/marketing/MAGNIFIC_ASSET_WORKFLOW.md) — Design asset generation workflow (Magnific + AI)
- [business/marketing/MAGNIFIC_GENERATION_WORKFLOW.md](./business/marketing/MAGNIFIC_GENERATION_WORKFLOW.md) — Asset generation workflow
- [business/marketing/ACTUAL_GENERATION_WORKFLOW.md](./business/marketing/ACTUAL_GENERATION_WORKFLOW.md) — Actual generation workflow & options
- [business/marketing/ENHANCED_ASSET_LIST_WITH_PROMPTS.md](./business/marketing/ENHANCED_ASSET_LIST_WITH_PROMPTS.md) — Asset list & generation prompts
- [business/marketing/BATCH_1_GENERATION_LOG.md](./business/marketing/BATCH_1_GENERATION_LOG.md) — Batch 1 heroes generation log
- [business/marketing/BATCH_1_REIMAGINED_PROMPTS.md](./business/marketing/BATCH_1_REIMAGINED_PROMPTS.md) — Batch 1 reimagined prompts
- [business/marketing/GENERATION_STATUS_UPDATE.md](./business/marketing/GENERATION_STATUS_UPDATE.md) — Batch 1 technical status update
- [business/marketing/QUICK_GENERATION_GUIDE.md](./business/marketing/QUICK_GENERATION_GUIDE.md) — Manual generation & upscaling guide

### Content
- [content/COPY_IMPROVEMENTS.md](./content/COPY_IMPROVEMENTS.md) — Copy & CTA improvements

### Development specs & Planning
- [planning/MASTER_DEVELOPMENT_PLAN.md](./planning/MASTER_DEVELOPMENT_PLAN.md) — Master development plan (12 Weeks)
- [planning/IMPLEMENTATION_CHECKLIST.md](./planning/IMPLEMENTATION_CHECKLIST.md) — Master implementation checklist
- [developing/IMAGE_OPTIMIZATION_STANDARDS.md](./developing/IMAGE_OPTIMIZATION_STANDARDS.md) — Image file size & dimension standards
- [developing/website/MEDIABUBBLE_DEVELOPER_GUIDE.md](./developing/website/MEDIABUBBLE_DEVELOPER_GUIDE.md) — Website developer guide
- [developing/Design-System/PHASE_1_DESIGN_SYSTEM_GUIDE.md](./developing/Design-System/PHASE_1_DESIGN_SYSTEM_GUIDE.md) — Design system guide

