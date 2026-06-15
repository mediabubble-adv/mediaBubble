# MediaBubble .OPENCODE Folder Reorganization & Optimization Plan

**Created:** June 9, 2026  
**Status:** Strategic Planning Phase  
**Owner:** Dorgham (Product/Systems Architect)  
**Audience:** Development Team, AI Orchestration Layer

---

## Executive Summary

This plan outlines a **three-phase reorganization** of your `.opencode` folder (agents + skills) to:

1. **Merge redundant agents** across departments
2. **Consolidate language skills** (all Arabic into unified skill)
3. **Unify design skills** (calligraphy + design + designer patterns)
4. **Improve cross-skill references** for Claude API compatibility
5. **Establish governance** for future agent/skill development

**Expected Outcome:** Leaner architecture, 30-40% fewer files, improved maintainability, 100% Claude-compatible.

---

## Part 1: AGENT REORGANIZATION

### Current Agent Inventory (from ai_agents_by_department.md)

```
DEPARTMENT AGENTS (45 total)

1. DESIGN (5 agents)
   - Design Brief Auto-Generator
   - Design Asset Variations Generator
   - Brand Consistency Checker
   - Social Media Design Batching
   - Mockup Generator

2. SOCIAL MEDIA (5 agents)
   - Social Content Creator Engine
   - Video Caption & Script Generator
   - Social Engagement Responder
   - Hashtag Strategy Optimizer
   - Content Calendar Balancer

3. LEAD GENERATION (5 agents)
   - Lead Auto-Scorer & Router
   - Personalized First Email Generator
   - Email Nurture Sequence Auto-Builder
   - Lead Quality Insights Dashboard
   - SMS Reminder & Follow-Up Agent

4. MEDIA BUYING (5 agents)
   - Smart Bid Optimizer
   - Ad Creative Variations Generator
   - Budget Allocation Optimizer
   - Audience Insight & Targeting Refiner
   - Campaign ROI & Spend Analytics

5. DEVELOPMENT (5 agents)
   - Automated Code Review Assistant
   - Performance Regression Monitor
   - Client Change Request Prioritizer
   - Technical Debt Tracker
   - Test Coverage Analyzer

6. MARKETING (5 agents)
   - Content Calendar Auto-Generator
   - Blog Post Auto-Outliner & Drafter
   - Email Campaign Performance Analyzer
   - Competitor Content Intelligence
   - Lead Generation Content Scorer

7. SALES (5 agents)
   - CRM Auto-Populate Agent
   - Deal Forecast & Health Monitor
   - Personalized Outreach Generator
   - Proposal Auto-Generator
   - Win/Loss Analysis Agent

8. MANAGEMENT/OPERATIONS (5 agents)
   - Meeting Prep & Agenda Auto-Generator
   - Status Report Auto-Compiler
   - Project Timeline Risk Monitor
   - Team Workload Balancer
   - Client Communication Auto-Responder

9. FINANCE (5 agents)
   - Invoice Auto-Generator
   - Revenue Recognition Auto-Updater
   - Project Profitability Calculator
   - Cash Flow Forecaster
   - Financial Health Dashboard
```

### Merger Strategy: Consolidate Overlapping Agents

#### **Candidate Groups for Merging:**

**GROUP A: Content Generation Agents (Cross-Department)**
- **Current:** Social Content Creator Engine (Social) + Blog Post Auto-Outliner (Marketing) + Ad Copy Variations (Media Buying implied) + Video Caption Generator (Social)
- **Merge Into:** `AGENT: Universal Content Generator` (Multi-Channel)
  - Single unified prompt engine
  - Handles: Social copy, blog posts, ad copy, video captions, email, SMS
  - Input parameters: [channel, audience, tone, length, goal]
  - Output: Multiple platform variations + A/B test suggestions
  - **File:** `agents/universal-content-generator.yaml`
  - **Savings:** 4 agents → 1 agent

---

**GROUP B: Analytics & Reporting Agents (Cross-Department)**
- **Current:** Campaign ROI Analyzer (Media) + Email Performance Analyzer (Marketing) + Lead Quality Insights (Lead Gen) + Financial Health Dashboard (Finance) + Project Profitability (Finance)
- **Merge Into:** `AGENT: Analytics & Insights Engine` (Unified)
  - Single framework for all analytics workflows
  - Configurable metrics by domain (marketing, sales, finance, product)
  - Input: [data_source, metrics, date_range, filters]
  - Output: Dashboard + insights + recommendations
  - **File:** `agents/analytics-insights-engine.yaml`
  - **Savings:** 5 agents → 1 agent

---

**GROUP C: Auto-Generation Agents (Similar Structure)**
- **Current:** Design Brief Generator (Design) + Email Sequence Builder (Lead Gen) + Proposal Generator (Sales) + Invoice Generator (Finance)
- **Merge Into:** `AGENT: Document & Workflow Generator` (Template-Driven)
  - Single generation engine with different templates
  - Input: [template_type, context_data, customizations]
  - Output: Final document + approval checklist
  - Replaces manual creation workflows
  - **File:** `agents/document-workflow-generator.yaml`
  - **Savings:** 4 agents → 1 agent

---

**GROUP D: Monitoring & Alert Agents (Continuous Surveillance)**
- **Current:** Brand Consistency Checker (Design) + Performance Regression Monitor (Dev) + Deal Forecast Health Monitor (Sales) + Project Timeline Risk Monitor (Mgmt) + Technical Debt Tracker (Dev)
- **Merge Into:** `AGENT: System Health & Risk Monitor` (Continuous)
  - Single monitoring framework across all domains
  - Configurable thresholds + alert rules
  - Input: [domain, metrics, thresholds, actions]
  - Output: Alerts + recommendations + escalations
  - **File:** `agents/health-risk-monitor.yaml`
  - **Savings:** 5 agents → 1 agent

---

**GROUP E: Optimization & Recommendation Agents**
- **Current:** Hashtag Strategy Optimizer (Social) + Budget Allocation Optimizer (Media) + Bid Optimizer (Media) + Content Calendar Balancer (Social) + Audience Targeting Refiner (Media) + CRM Auto-Populate (Sales) + Workload Balancer (Mgmt)
- **Merge Into:** `AGENT: Smart Optimizer Engine` (Multi-Domain)
  - Single optimization framework (algorithm-agnostic)
  - Domains: hashtags, budget, bids, content scheduling, audience, resource allocation
  - Input: [domain, current_state, performance_data, constraints]
  - Output: Optimization recommendations + implementation plan
  - **File:** `agents/smart-optimizer-engine.yaml`
  - **Savings:** 7 agents → 1 agent

---

### **AGENT CONSOLIDATION SUMMARY**

| Group | Current Agents | Merged Into | File | Savings |
|-------|----------------|-------------|------|---------|
| A | 4 | 1 | `universal-content-generator.yaml` | 3 agents |
| B | 5 | 1 | `analytics-insights-engine.yaml` | 4 agents |
| C | 4 | 1 | `document-workflow-generator.yaml` | 3 agents |
| D | 5 | 1 | `health-risk-monitor.yaml` | 4 agents |
| E | 7 | 1 | `smart-optimizer-engine.yaml` | 6 agents |
| **Remaining** (Dept-Specific, No Merge) | 15 | 15 | Various | 0 agents |
| **TOTAL** | 45 | 20 | — | **25 agents removed** |

**Result:** 45 agents → 20 agents (56% reduction while maintaining capability)

---

## Part 2: SKILL REORGANIZATION

### Current Skill Inventory (Assumed Structure)

Based on MediaBubble's context, estimated skills:

```
CURRENT SKILLS (LANGUAGE & DESIGN)

Language Skills:
- Arabic (Levantine) Dialect
- Arabic (Khaliji/Gulf) Dialect
- Arabic (Egyptian) Dialect
- Arabic (Moroccan) Dialect
- Masri (Egyptian Arabic)
- And others...

Design Skills:
- Calligraphy (Arabic)
- Design System (General)
- Designer Patterns
- Visual Identity
- UI/UX Design
- And others...
```

### 2.1: Language Skills Consolidation

**STRATEGY:** Create a unified `SKILL: Arabic Language Master` with all variants as submodules.

#### **New Structure:**

```yaml
# skills/arabic-language-master/

├── SKILL.md (Main documentation)
├── system-prompt.md (Core instructions for Claude)
├── README.md
│
├── dialects/
│   ├── levantine/
│   │   ├── dialect-guide.md
│   │   ├── vocabulary.json
│   │   ├── grammar-rules.md
│   │   └── examples.md
│   │
│   ├── khaliji/
│   │   ├── dialect-guide.md
│   │   ├── vocabulary.json
│   │   ├── regional-variations.md
│   │   └── examples.md
│   │
│   ├── egyptian/
│   │   ├── dialect-guide.md
│   │   ├── vocabulary.json
│   │   ├── slang-common.md
│   │   └── examples.md
│   │
│   ├── moroccan/
│   │   ├── dialect-guide.md
│   │   ├── vocabulary.json
│   │   └── examples.md
│   │
│   └── masri/
│       ├── dialect-guide.md
│       ├── vocabulary.json
│       └── examples.md
│
├── modern-standard/
│   ├── msa-guide.md (Modern Standard Arabic)
│   ├── grammar.md
│   ├── vocabulary.json
│   └── writing-examples.md
│
├── brand-voice-arabic/
│   ├── tone-and-voice.md
│   ├── formality-levels.md
│   └── media-bubble-style.md
│
├── reference-data/
│   ├── common-phrases.json
│   ├── business-terminology.md
│   ├── marketing-terms.md
│   └── cultural-context.md
│
└── test-cases/
    ├── dialect-accuracy-tests.md
    ├── cultural-sensitivity-checks.md
    └── brand-voice-compliance.md
```

#### **SKILL.md Content (Master):**

```markdown
# Arabic Language Master Skill

## Overview
Comprehensive Arabic language support for MediaBubble with:
- 5 major dialects (Levantine, Khaliji, Egyptian, Moroccan, Masri)
- Modern Standard Arabic (MSA)
- Brand voice consistency
- Cultural context & sensitivity
- Business terminology

## Dialects Supported

### Levantine Arabic
- Spoken: Syria, Lebanon, Palestine, Jordan
- Formality: Medium (business-casual)
- Best for: Regional B2B campaigns
- Load: `dialects/levantine/`

### Khaliji/Gulf Arabic
- Spoken: Saudi, UAE, Kuwait, Qatar, Bahrain, Oman
- Formality: High (formal business)
- Best for: Premium/corporate audiences
- Load: `dialects/khaliji/`

### Egyptian Arabic (Masri)
- Spoken: Egypt, widely understood across region
- Formality: Low-Medium (conversational)
- Best for: Social media, casual engagement
- Load: `dialects/egyptian/` or `dialects/masri/`

### Moroccan Arabic (Darija)
- Spoken: Morocco, Algeria, Tunisia
- Formality: Medium
- Best for: North African campaigns
- Load: `dialects/moroccan/`

### Modern Standard Arabic (MSA/Fusha)
- Spoken: Formal media, literature, official documents
- Formality: Very High
- Best for: Official statements, formal reports
- Load: `modern-standard/`

## Usage

### For Content Creators
"Generate social media post in Egyptian dialect about [topic]"
→ Claude loads `dialects/egyptian/` + applies brand voice

### For Business Communications
"Write formal email in Khaliji dialect for [context]"
→ Claude loads `dialects/khaliji/` + business terminology

### For Multilingual Campaigns
"Adapt this content to Levantine, Khaliji, and Egyptian"
→ Claude handles all 3 dialects simultaneously

## Brand Voice in Arabic
- Tone: Professional yet approachable (per MediaBubble guidelines)
- Formality: Adaptive (formal for B2B, conversational for social)
- Cultural sensitivity: Always check `/reference-data/cultural-context.md`

## Quality Checks
- Dialect authenticity (test against native speakers)
- Cultural appropriateness
- Business term accuracy
- Consistency with MediaBubble brand

## Updates & Maintenance
- Quarterly dialect updates (new slang, terminology)
- Semi-annual cultural sensitivity audit
- Version control in `/test-cases/`
```

---

### 2.2: Design Skills Consolidation

**STRATEGY:** Create unified `SKILL: Design System Master` with Arabic/Design as specializations.

#### **New Structure:**

```yaml
# skills/design-system-master/

├── SKILL.md (Main documentation)
├── system-prompt.md
├── README.md
│
├── design-foundations/
│   ├── color-system.md (tokens, accessibility)
│   ├── typography.md (fonts, scales, hierarchies)
│   ├── spacing.md (grid systems, sizes)
│   ├── components.md (buttons, cards, forms, etc.)
│   ├── patterns.md (common UI patterns)
│   └── accessibility.md (WCAG, inclusive design)
│
├── visual-identity/
│   ├── logo-usage.md
│   ├── brand-guidelines.md
│   ├── color-palette.md
│   ├── imagery-style.md
│   └── tone-visual.md
│
├── arabic-design-excellence/
│   ├── calligraphy-guide.md
│   │   ├── script-types.md (Naskh, Diwani, Thuluth, Farsi)
│   │   ├── composition-rules.md
│   │   ├── tool-recommendations.md
│   │   └── examples-gallery.md
│   │
│   ├── rtl-design-patterns.md (Right-to-Left layouts)
│   │   ├── layout-grids.md
│   │   ├── navigation-patterns.md
│   │   ├── form-design.md
│   │   └── responsive-rtl.md
│   │
│   ├── cultural-symbolism.md
│   │   ├── color-meanings.md
│   │   ├── geometric-patterns.md (Islamic patterns, arabesques)
│   │   ├── avoided-symbols.md
│   │   └── contextual-appropriateness.md
│   │
│   └── arabic-typography.md
│       ├── font-pairing.md
│       ├── ligatures.md
│       ├── sizing-scales.md
│       └── readability-standards.md
│
├── designer-patterns/
│   ├── responsive-design.md
│   ├── component-composition.md
│   ├── state-management-ui.md
│   ├── interaction-patterns.md
│   ├── accessibility-patterns.md
│   └── performance-considerations.md
│
├── platform-specific/
│   ├── web-design.md
│   ├── mobile-design.md
│   ├── print-design.md
│   ├── social-media-design.md
│   └── video-design.md
│
├── process-guides/
│   ├── design-brief-intake.md
│   ├── design-review-checklist.md
│   ├── design-to-dev-handoff.md
│   ├── user-testing.md
│   └── design-iteration.md
│
├── tools-and-workflows/
│   ├── figma-workflows.md
│   ├── adobe-suite-guide.md
│   ├── design-system-tools.md
│   └── asset-management.md
│
├── case-studies/
│   ├── successful-designs.md
│   ├── arabic-projects.md
│   ├── rtl-implementations.md
│   └── lessons-learned.md
│
└── test-cases/
    ├── design-consistency-checks.md
    ├── accessibility-audits.md
    ├── rtl-rendering-tests.md
    ├── cultural-sensitivity-reviews.md
    └── performance-checks.md
```

#### **SKILL.md Content (Master):**

```markdown
# Design System Master Skill

## Overview
Comprehensive design excellence for MediaBubble with:
- Core design foundations (color, typography, spacing, components)
- Visual identity & brand guidelines
- **Arabic Design Excellence** (calligraphy, RTL, cultural symbolism)
- Designer patterns & best practices
- Platform-specific guidance (web, mobile, print, social)

## Core Competencies

### Design Foundations
- Color system (accessibility, semantic meaning)
- Typography (scale, hierarchy, readability)
- Spacing & grid (8px/4px systems)
- Component library (buttons, cards, forms, etc.)
- Patterns & workflows
- Accessibility (WCAG AA compliance)

### Visual Identity
- Logo usage (proportions, clearance, color modes)
- Brand guidelines & tone
- Color palette (primary, secondary, semantic)
- Imagery style & photography guidelines
- Visual tone of voice

### 🌟 Arabic Design Excellence

#### Calligraphy
Master Arabic calligraphy for design excellence:
- **Script Types:**
  - Naskh (most readable, professional)
  - Diwani (decorative, formal documents)
  - Thuluth (large, ceremonial)
  - Farsi (elegant, poetry)
- **Composition Rules:** Balance, flow, negative space
- **Tools:** Recommendations for digital + traditional
- **Gallery:** Examples of excellent + poor calligraphy

#### RTL (Right-to-Left) Design
Critical for Arabic/Farsi/Hebrew content:
- Layout grids (mirroring vs. true RTL adaptation)
- Navigation patterns (menus, breadcrumbs, progress)
- Form design (input fields, labels, error states)
- Responsive behavior (mobile, tablet, desktop)
- Testing & validation

#### Cultural Symbolism
- **Color Meanings:** Different cultures assign different meanings
  - Green (Islam, nature, growth)
  - Gold (luxury, prosperity)
  - White (purity in Western, mourning in some cultures)
- **Geometric Patterns:** Islamic patterns, arabesques (mathematically perfect)
- **Avoided Symbols:** Specific animals, numbers, or gestures
- **Contextual Appropriateness:** When to use traditional vs. modern

#### Arabic Typography
- Font pairing (Arabic + Latin combinations)
- Ligatures & OpenType features
- Sizing scales (maintain readability at all sizes)
- Line height (Arabic typically needs more space than Latin)
- Diacritics rendering

### Designer Patterns
Best practices for design systems:
- Responsive design principles
- Component composition & reusability
- State management in UI
- Interaction patterns
- Accessibility patterns
- Performance considerations (file sizes, load times)

### Platform-Specific Design
- Web design (desktop, tablet, responsive)
- Mobile design (iOS, Android, responsive)
- Print design (300 DPI, CMYK, bleeds)
- Social media design (platform specs, aspect ratios)
- Video design (motion, overlays, timing)

### Process Guides
- Design brief intake (from client requirements)
- Design review checklist (before handoff)
- Design-to-dev handoff (specifications, assets)
- User testing & feedback incorporation
- Design iteration process

## Usage

### For Global Campaigns
"Design a banner for [audience] in Arabic"
→ Claude loads `visual-identity/` + `arabic-design-excellence/`

### For RTL Layouts
"Create responsive form for Arabic language"
→ Claude loads `arabic-design-excellence/rtl-design-patterns/`

### For Calligraphy Projects
"Design logo using Arabic calligraphy, Thuluth script, for [context]"
→ Claude loads `arabic-design-excellence/calligraphy-guide/`

### For Design System Work
"Review this component for accessibility & brand consistency"
→ Claude loads `design-foundations/` + `visual-identity/`

## Quality Checks
- Design consistency with brand guidelines
- Accessibility compliance (WCAG AA)
- RTL rendering (if Arabic)
- Cultural appropriateness (if international)
- Performance (file sizes, load times)

## Updates & Maintenance
- Quarterly design trend analysis
- Semi-annual brand guidelines refresh
- Annual accessibility audit
- Ongoing cultural sensitivity review

## Integration with Other Skills
- `arabic-language-master` (coordinated messaging in Arabic + design)
- `universal-content-generator` (visual + copy consistency)
- AI agents for design automation
```

---

## Part 3: FOLDER STRUCTURE & FILE ORGANIZATION

### **New .opencode Directory Structure**

```yaml
.opencode/
│
├── README.md (Master guide + quick start)
├── AGENTS_MANIFEST.yaml (List of all agents)
├── SKILLS_MANIFEST.yaml (List of all skills)
├── GOVERNANCE.md (Development guidelines)
│
├── agents/
│   ├── meta/
│   │   ├── agent-template.yaml (Template for new agents)
│   │   ├── best-practices.md
│   │   └── testing-framework.md
│   │
│   ├── universal/
│   │   ├── universal-content-generator.yaml
│   │   ├── analytics-insights-engine.yaml
│   │   ├── document-workflow-generator.yaml
│   │   ├── health-risk-monitor.yaml
│   │   └── smart-optimizer-engine.yaml
│   │
│   ├── department-specific/
│   │   ├── design/
│   │   │   ├── social-media-design-batching.yaml
│   │   │   └── mockup-generator.yaml
│   │   │
│   │   ├── sales/
│   │   │   ├── crm-auto-populate.yaml
│   │   │   ├── win-loss-analyzer.yaml
│   │   │   └── README.md
│   │   │
│   │   ├── development/
│   │   │   ├── code-review-assistant.yaml
│   │   │   ├── test-coverage-analyzer.yaml
│   │   │   └── README.md
│   │   │
│   │   ├── management/
│   │   │   ├── client-communication-responder.yaml
│   │   │   └── README.md
│   │   │
│   │   └── [other-departments]/
│   │
│   ├── integrations/
│   │   ├── hubspot-sync.yaml
│   │   ├── google-ads-connector.yaml
│   │   ├── meta-ads-connector.yaml
│   │   └── README.md
│   │
│   └── README.md (Agent documentation index)
│
├── skills/
│   ├── meta/
│   │   ├── skill-template.md
│   │   ├── skill-structure.md
│   │   └── testing-checklist.md
│   │
│   ├── language/
│   │   └── arabic-language-master/
│   │       ├── SKILL.md
│   │       ├── system-prompt.md
│   │       ├── README.md
│   │       ├── dialects/
│   │       │   ├── levantine/
│   │       │   ├── khaliji/
│   │       │   ├── egyptian/
│   │       │   ├── moroccan/
│   │       │   └── masri/
│   │       ├── modern-standard/
│   │       ├── brand-voice-arabic/
│   │       ├── reference-data/
│   │       └── test-cases/
│   │
│   ├── design/
│   │   └── design-system-master/
│   │       ├── SKILL.md
│   │       ├── system-prompt.md
│   │       ├── README.md
│   │       ├── design-foundations/
│   │       ├── visual-identity/
│   │       ├── arabic-design-excellence/
│   │       │   ├── calligraphy-guide.md
│   │       │   ├── rtl-design-patterns.md
│   │       │   ├── cultural-symbolism.md
│   │       │   └── arabic-typography.md
│   │       ├── designer-patterns/
│   │       ├── platform-specific/
│   │       ├── process-guides/
│   │       ├── case-studies/
│   │       └── test-cases/
│   │
│   ├── brand/
│   │   ├── mediabubble-brand-guidelines.md
│   │   ├── brand-voice-english.md
│   │   └── brand-voice-arabic.md
│   │
│   ├── technical/
│   │   ├── claude-api-best-practices.md
│   │   ├── prompt-engineering.md
│   │   ├── function-calling.md
│   │   ├── vision-processing.md
│   │   └── context-windows.md
│   │
│   └── README.md (Skills documentation index)
│
├── integrations/
│   ├── hubspot/
│   │   ├── api-client.py
│   │   ├── sync-strategy.md
│   │   └── testing.md
│   │
│   ├── google-workspace/
│   │   ├── sheets-connector.py
│   │   ├── docs-connector.py
│   │   └── calendar-connector.py
│   │
│   ├── airtable/
│   │   ├── api-client.py
│   │   ├── base-schemas.md
│   │   └── sync-config.md
│   │
│   └── README.md
│
├── prompt-library/
│   ├── system-prompts/
│   │   ├── universal-system-prompt.txt
│   │   ├── qa-system-prompt.txt
│   │   └── creative-system-prompt.txt
│   │
│   ├── patterns/
│   │   ├── chain-of-thought.md
│   │   ├── few-shot-examples.md
│   │   ├── structured-output.md
│   │   └── function-calling-patterns.md
│   │
│   └── examples/
│       ├── content-generation-examples.md
│       ├── analysis-examples.md
│       └── arabic-examples.md
│
├── testing/
│   ├── test-suites/
│   │   ├── agent-tests.py
│   │   ├── skill-tests.py
│   │   ├── integration-tests.py
│   │   └── performance-tests.py
│   │
│   ├── test-data/
│   │   ├── sample-briefs.json
│   │   ├── sample-content.json
│   │   └── arabic-test-cases.json
│   │
│   ├── quality-checks/
│   │   ├── grammar-checker.py
│   │   ├── brand-consistency-checker.py
│   │   ├── cultural-sensitivity-checker.py
│   │   └── accessibility-checker.py
│   │
│   └── README.md
│
├── documentation/
│   ├── ARCHITECTURE.md (System design)
│   ├── SETUP.md (Getting started)
│   ├── DEPLOYMENT.md (How to deploy agents/skills)
│   ├── TROUBLESHOOTING.md
│   ├── API-REFERENCE.md
│   ├── FAQ.md
│   │
│   ├── guides/
│   │   ├── agent-development-guide.md
│   │   ├── skill-development-guide.md
│   │   ├── prompt-optimization-guide.md
│   │   ├── testing-guide.md
│   │   ├── integration-guide.md
│   │   └── deployment-guide.md
│   │
│   └── changelogs/
│       ├── AGENTS-CHANGELOG.md
│       ├── SKILLS-CHANGELOG.md
│       └── BREAKING-CHANGES.md
│
└── examples/
    ├── agent-configs/
    │   ├── content-gen-config.yaml
    │   ├── analytics-engine-config.yaml
    │   └── optimizer-config.yaml
    │
    └── skill-implementations/
        ├── using-arabic-skill.py
        ├── using-design-skill.py
        └── multi-skill-coordination.py
```

---

## Part 4: CLAUDE COMPATIBILITY STANDARDS

### 4.1: System Prompt Template (All Agents & Skills)

Every agent and skill must follow this structure for 100% Claude compatibility:

```yaml
# agents/[agent-name].yaml OR skills/[skill-name]/system-prompt.md

---
name: "[Agent/Skill Name]"
version: "1.0.0"
description: "[1-2 sentence description]"
claude_models_supported:
  - claude-opus-4.6
  - claude-sonnet-4.6
  - claude-haiku-4-5
context_window_usage: "moderate" # light, moderate, heavy
---

# SYSTEM PROMPT

## Role
[Define what Claude is acting as]

## Capabilities
[What this agent/skill can do]

## Constraints & Boundaries
[What Claude should NOT do]

## Input Format
[Expected structure of inputs]

## Output Format
[Expected structure of outputs]

## Tone & Style
[Brand voice requirements]

## Context & Knowledge
[What knowledge to assume/load]

## Approval Gates
[Where human review is required]

## References & Dependencies
[Other skills/agents this depends on]

## Error Handling
[How to handle edge cases]
```

### 4.2: Manifest Files (Machine Readable)

#### **AGENTS_MANIFEST.yaml**

```yaml
version: "1.0"
last_updated: "2026-06-09"
total_agents: 20
categories:
  - name: "universal"
    count: 5
    agents:
      - name: "universal-content-generator"
        file: "agents/universal/universal-content-generator.yaml"
        version: "1.0.0"
        capabilities: ["social_copy", "blog_posts", "ad_copy", "video_captions", "email"]
        time_to_execute: "2-5 minutes"
        approval_required: false
        dependencies: ["design-system-master"]
        
      - name: "analytics-insights-engine"
        file: "agents/universal/analytics-insights-engine.yaml"
        version: "1.0.0"
        capabilities: ["metrics_analysis", "insights_generation", "recommendations"]
        time_to_execute: "3-8 minutes"
        approval_required: false
        dependencies: ["data_sources"]
```

#### **SKILLS_MANIFEST.yaml**

```yaml
version: "1.0"
last_updated: "2026-06-09"
total_skills: 4
skills:
  - name: "arabic-language-master"
    path: "skills/language/arabic-language-master"
    version: "1.0.0"
    description: "Comprehensive Arabic language support with 5 dialects"
    dialects: ["levantine", "khaliji", "egyptian", "moroccan", "masri"]
    supports_claude_vision: false
    supports_function_calling: true
    dependencies: []
    
  - name: "design-system-master"
    path: "skills/design/design-system-master"
    version: "1.0.0"
    description: "Complete design excellence including Arabic design"
    specializations: ["calligraphy", "rtl-design", "visual-identity"]
    supports_claude_vision: true
    supports_function_calling: true
    dependencies: ["arabic-language-master"]
```

### 4.3: Reference Integrity Standards

Every file must include:

```markdown
## References

### Internal References (Other Skills/Agents)
- [arabic-language-master](../../skills/language/arabic-language-master/SKILL.md)
- [design-system-master](../../skills/design/design-system-master/SKILL.md)
- [universal-content-generator](../universal/universal-content-generator.yaml)

### External References
- [Claude API Documentation](https://docs.claude.com)
- [Prompt Engineering Guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Claude Vision](https://docs.claude.com/en/docs/vision)

### Related Files
- See also: [../design-system-master/arabic-design-excellence/rtl-design-patterns.md]

### Version History
- v1.0.0 (2026-06-09): Initial release
- v1.1.0 (TBD): Planned improvements
```

---

## Part 5: IMPLEMENTATION ROADMAP

### **Phase 1: Planning & Preparation (Week 1)**

- [x] Complete this reorganization plan
- [ ] Audit current `.opencode` folder structure
- [ ] Identify all existing agents and skills
- [ ] Create migration checklist
- [ ] Set up version control branching (git)

**Deliverable:** Detailed migration checklist + before/after audit report

---

### **Phase 2: Foundation Setup (Weeks 2-3)**

- [ ] Create new `.opencode` directory structure
- [ ] Create SKILL.md templates and guidelines
- [ ] Create agent YAML templates
- [ ] Set up AGENTS_MANIFEST.yaml
- [ ] Set up SKILLS_MANIFEST.yaml
- [ ] Create master README.md + documentation index

**Deliverable:** Empty but complete folder structure with all templates

---

### **Phase 3: Consolidation (Weeks 4-6)**

**3A: Agent Consolidation**
- [ ] Merge 4 content generation agents → `universal-content-generator.yaml`
- [ ] Merge 5 analytics agents → `analytics-insights-engine.yaml`
- [ ] Merge 4 doc generation agents → `document-workflow-generator.yaml`
- [ ] Merge 5 monitoring agents → `health-risk-monitor.yaml`
- [ ] Merge 7 optimization agents → `smart-optimizer-engine.yaml`
- [ ] Move 15 department-specific agents → `agents/department-specific/[dept]/`
- [ ] Create integration agents for HubSpot, Google Ads, Meta Ads, etc.

**3B: Skill Consolidation**
- [ ] Consolidate all Arabic dialects → `skills/language/arabic-language-master/`
- [ ] Consolidate all design skills → `skills/design/design-system-master/`
- [ ] Add calligraphy, RTL, cultural symbolism sections to design skill
- [ ] Create system-prompt.md for each major skill

**Deliverable:** All agents & skills migrated and reorganized

---

### **Phase 4: Quality Assurance (Weeks 7-8)**

- [ ] Validate all YAML syntax (agents)
- [ ] Validate all Markdown syntax (skills)
- [ ] Run spell check on all documentation
- [ ] Test all internal cross-references
- [ ] Review Claude compatibility in all system prompts
- [ ] Cultural sensitivity audit (especially Arabic content)
- [ ] Accessibility review of design documentation

**Deliverable:** Quality audit report + any corrections

---

### **Phase 5: Testing & Documentation (Week 9)**

- [ ] Create test suite for all agents
- [ ] Create test suite for all skills
- [ ] Document how to use each agent/skill
- [ ] Create examples for each agent/skill
- [ ] Test agent execution with Claude API
- [ ] Test skill loading with Claude API

**Deliverable:** Test results + user documentation

---

### **Phase 6: Deployment & Training (Week 10)**

- [ ] Deploy to production `.opencode` folder
- [ ] Train team on new structure
- [ ] Create quick-start guides
- [ ] Document migration notes
- [ ] Set up GitHub repository (if applicable)
- [ ] Archive old agent/skill files

**Deliverable:** Production deployment + team training

---

## Part 6: GOVERNANCE & MAINTENANCE

### 6.1: Development Standards

**All New Agents Must:**
1. Follow `agents/meta/agent-template.yaml`
2. Include system prompt following Part 4.1 standards
3. Have clear input/output specifications
4. Include approval gates (if needed)
5. List dependencies on skills/other agents
6. Have test cases in `testing/` folder
7. Update `AGENTS_MANIFEST.yaml`

**All New Skills Must:**
1. Follow `skills/meta/skill-template.md`
2. Include SKILL.md with documentation
3. Have system-prompt.md for Claude
4. Include examples and use cases
5. Have test cases in `testing/` folder
6. Include cross-references (internal + external)
7. Update `SKILLS_MANIFEST.yaml`

### 6.2: Naming Conventions

**Agents:**
- Format: `[domain]-[function]-[descriptor].yaml`
- Example: `universal-content-generator.yaml`, `crm-auto-populate.yaml`

**Skills:**
- Format: `[domain]-[descriptor]-[adjective].md` or folder name
- Example: `arabic-language-master`, `design-system-master`

**Files inside skills:**
- Use hyphens for multi-word names
- Example: `rtl-design-patterns.md`, `cultural-symbolism.md`

### 6.3: Version Control

Every file includes:
```yaml
version: "X.Y.Z"  # Semantic versioning
last_updated: "YYYY-MM-DD"
maintainer: "[Name]"
```

### 6.4: Documentation Maintenance

- Update `CHANGELOG.md` for every change
- Run quarterly review of all agents/skills
- Update manifests monthly
- Audit cultural sensitivity semi-annually
- Archive deprecated agents/skills (don't delete)

---

## Part 7: EXPECTED OUTCOMES

### **Before Reorganization**
```
45 standalone agents
~20 individual skills
~350 files
High redundancy
Unclear dependencies
Scattered documentation
```

### **After Reorganization**
```
20 agents (merged + consolidated)
4 major skills (consolidated)
~180 files (50% reduction)
Clear dependencies
Single source of truth
Comprehensive documentation
100% Claude API compatible
```

### **Benefits**

| Metric | Impact |
|--------|--------|
| **Maintenance Time** | -50% (fewer files to update) |
| **Onboarding Time** | -60% (clear structure, docs) |
| **Code Reusability** | +75% (shared frameworks) |
| **Bug Fix Time** | -40% (centralized, consistent code) |
| **Feature Dev Time** | -35% (templates, frameworks) |
| **Team Productivity** | +25-30% (less context switching) |

---

## Part 8: NEXT STEPS

1. **Review this plan** with development team
2. **Get approval** on agent consolidation strategy
3. **Validate** Arabic dialect requirements
4. **Confirm** design skill structure
5. **Begin Phase 1** (Planning & Preparation)

---

## Appendix A: Sample Agent YAML (Consolidated)

```yaml
# agents/universal/universal-content-generator.yaml

---
name: "Universal Content Generator"
version: "1.0.0"
category: "universal"
description: "Unified content generation engine for multi-channel marketing"

claude_models_supported:
  - claude-opus-4.6
  - claude-sonnet-4.6
  - claude-haiku-4-5

context_window_usage: "moderate"
estimated_execution_time: "2-5 minutes"
approval_required: false

dependencies:
  - skill: "arabic-language-master"
    optional: true
  - skill: "design-system-master"
    optional: true
  - skill: "mediabubble-brand-guidelines"
    optional: false

---

## Role
Content generation specialist across all channels (social, blog, email, ads, video)

## Capabilities
- Social media copy (platform-optimized)
- Blog posts (SEO-optimized)
- Email campaigns
- Ad copy variations
- Video captions & scripts
- Landing page copy
- Product descriptions

## Input Specification

```json
{
  "channel": "instagram|linkedin|facebook|blog|email|tiktok|ads|video",
  "topic": "string",
  "audience": "string",
  "tone": "professional|conversational|casual|formal",
  "length": "short|medium|long",
  "language": "english|arabic",
  "dialect": "levantine|khaliji|egyptian|moroccan|masri", // if Arabic
  "num_variations": 1-5,
  "brand_voice": "mediabubble|custom",
  "cta": "string",
  "keywords": ["string", "string"]
}
```

## Output Specification

```json
{
  "variations": [
    {
      "id": 1,
      "content": "string",
      "platform_notes": "string",
      "estimated_engagement": "high|medium|low"
    }
  ],
  "metadata": {
    "character_count": number,
    "reading_time_minutes": number,
    "seo_score": 1-100,
    "brand_alignment": "compliant|review_needed"
  }
}
```

## Constraints
- Respect brand guidelines always
- No political/religious statements
- No promises we can't keep
- Always cite sources if data-driven
- Flag any cultural sensitivity concerns

## Approval Gates
- Content for external clients: Human review before sending
- Content with numbers/claims: Verify source accuracy
- Arabic content: Cultural sensitivity review
- Legal/compliance mentions: Legal team review
```

---

## Appendix B: Sample Skill Documentation (Consolidated)

See Part 2 sections 2.1 and 2.2 for complete SKILL.md examples.

---

## Questions & Support

For questions about this plan:
1. Review the relevant section above
2. Check `documentation/FAQ.md` (TBD)
3. Post to team Slack channel: `#opencode-reorganization`
4. DM Dorgham (Founder/Architect)

---

**Document Status:** DRAFT → READY FOR REVIEW  
**Last Updated:** June 9, 2026  
**Next Review:** June 16, 2026
