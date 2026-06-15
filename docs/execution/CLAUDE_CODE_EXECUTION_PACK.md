# Claude Code Execution Pack — MOVE FAST

**Purpose:** Everything you need to execute Phase 1-4 in Claude Code without delays  
**Status:** Ready to copy-paste and execute  
**Execution Speed:** 10 weeks (compressed from 14)

---

## HOW TO USE THIS PACK

1. **Read this entire file** (10 min)
2. **Copy the relevant prompt** for your current phase
3. **Paste into Claude Code**
4. **Execute** (Claude will handle the rest)
5. **Move to next phase**

**No back-and-forth. No explanation needed. Just execute.**

---

## PHASE 1 PROMPT (Weeks 1-3): FOUNDATION SETUP

### Copy This Exactly

```
You are the MediaBubble AI Architect executing the OPENCODE reorganization plan.

GOAL: Create foundation structure and build first skill tier

CONTEXT:
- We're consolidating 45 agents → 12 agents (hybrid approach)
- We're building 4-tier skill architecture (Tier 2-4)
- This is Phase 1: Foundation (Weeks 1-3)
- TIMELINE: 3 weeks exactly
- Speed is critical

TASK 1: Create New Folder Structure
==========================================
Location: Find .opencode folder in this codebase
Create this structure:

.opencode/
├── agents/
│   ├── master/
│   │   ├── content-copy-engine.yaml
│   │   ├── intelligence-analytics-engine.yaml
│   │   ├── optimization-allocation-engine.yaml
│   │   ├── monitoring-governance-engine.yaml
│   │   ├── document-workflow-engine.yaml
│   │   └── [reserved].yaml
│   │
│   ├── specialized/
│   │   ├── code-review-agent.yaml
│   │   ├── win-loss-analysis-agent.yaml
│   │   ├── mockup-generator-agent.yaml
│   │   ├── social-engagement-agent.yaml
│   │   ├── sms-notification-agent.yaml
│   │   └── finance-profitability-agent.yaml
│   │
│   └── AGENTS_MANIFEST.yaml (empty, will fill later)
│
├── skills/
│   ├── tier-2-domain/
│   │   ├── arabic-language-master/
│   │   │   ├── SKILL.md
│   │   │   ├── dialects/
│   │   │   │   ├── levantine.md
│   │   │   │   ├── khaliji.md
│   │   │   │   ├── egyptian.md
│   │   │   │   ├── moroccan.md
│   │   │   │   └── msa.md
│   │   │   ├── cultural-context/
│   │   │   │   ├── gcc-business.md
│   │   │   │   ├── levantine-social.md
│   │   │   │   └── global-positioning.md
│   │   │   ├── learning-log/
│   │   │   │   └── successful-patterns.json
│   │   │   └── examples/
│   │   │       └── high-performing-pieces.md
│   │   │
│   │   ├── design-system-master/
│   │   │   ├── SKILL.md
│   │   │   ├── rtl-principles/
│   │   │   ├── cultural-symbolism/
│   │   │   ├── accessibility-standards/
│   │   │   ├── brand-evolution/
│   │   │   └── learning-log/
│   │   │
│   │   └── brand-voice-enforcer/
│   │       ├── SKILL.md
│   │       ├── positioning-framework/
│   │       ├── tone-rules/
│   │       └── compliance-checker/
│   │
│   ├── tier-3-orchestration/
│   ├── tier-4-adaptive/
│   └── SKILLS_MANIFEST.yaml (empty, will fill later)
│
├── testing/
│   ├── agent-tests/
│   ├── skill-tests/
│   └── integration-tests/
│
├── documentation/
│   ├── agent-specs/
│   ├── skill-guides/
│   └── integration-guides/
│
└── README.md (overview)

TASK 2: Build Arabic Language Master Skill (Tier 2)
===================================================
File: .opencode/skills/tier-2-domain/arabic-language-master/SKILL.md

Create comprehensive skill definition with:

1. Metadata:
   name: "Arabic Language Master"
   tier: 2
   power_level: "⭐⭐⭐ Expert"
   version: "1.0.0"
   supports: ["msa", "levantine", "khaliji", "egyptian", "moroccan", "masri"]

2. Capabilities:
   - Translate with dialect & cultural context
   - Business terminology suggestions
   - Sentiment analysis (Arabic-specific)
   - Audience matching (demographic → dialect)
   - Brand voice alignment
   - Learning from past successful translations
   - Code-switching recommendations
   - Engagement predictions

3. Input Schema:
   request_type: "translate|dialect_adapt|cultural_check|business_terminology|sentiment_analysis|audience_match"
   content: string
   source_dialect: string
   target_dialect: string
   context: {...}  (see ENHANCED_SKILLS_ARCHITECTURE.md for full spec)

4. Output Schema:
   primary_translation: string
   alternatives: [3 options]
   cultural_notes: [array]
   business_terminology: [suggestions]
   sentiment_analysis: {...}
   engagement_prediction: percentage
   dialect_authenticity_score: percentage
   previous_success_data: [array]

5. Key Features Implementation:
   - Dialect intelligence matrix (when to code-switch)
   - Cultural radar (warnings before publishing)
   - Business vocabulary database (per industry)
   - Audience demographic profiles
   - Sentiment weight dictionary (Arabic emotional resonance)
   - Success pattern tracker

TASK 3: Create SKILL.md Template
===============================
File: .opencode/skills/SKILL_TEMPLATE.md

Template for any new skill with sections:
- Metadata (name, tier, version)
- Purpose (one paragraph)
- Capabilities (bullet list)
- Input Schema (YAML)
- Output Schema (YAML)
- Example Usage (before/after)
- Implementation Notes
- Testing Checklist

TASK 4: Create Agent Template
=============================
File: .opencode/agents/AGENT_TEMPLATE.yaml

Template for master + specialized agents with:
- metadata
- purpose
- capabilities
- input_schema
- output_schema
- dependencies (which skills/agents it uses)
- approval_gates (manual approval needed?)
- error_handling
- version_info

TASK 5: Create Testing Framework
================================
Location: .opencode/testing/

Create Python test suite:
1. test_agent_syntax.py (validates all agent YAML)
2. test_skill_syntax.py (validates all skill markdown/YAML)
3. test_claude_compatibility.py (checks Claude API compliance)
4. test_cross_references.py (validates all internal links work)

TASK 6: Create Migration Checklist
=================================
File: .opencode/MIGRATION_CHECKLIST.md

Checklist for moving from old structure to new:
- [ ] Backup old .opencode folder
- [ ] Copy old agents to new structure
- [ ] Validate syntax
- [ ] Update references
- [ ] Test all agents
- [ ] Test all skills
- [ ] Cross-validate everything

EXECUTION NOTES:
- Use YAML for all agent definitions
- Use Markdown for all skill definitions
- Create all directories even if empty (will fill in Phase 2)
- Create learning-log directories (will populate in Phase 4)
- Every file needs a header comment with purpose
- All YAML must validate (no syntax errors)
- All Markdown must have proper structure

VALIDATION CHECKLIST:
After completion, verify:
□ All directories created
□ Arabic Language Master skill complete
□ Templates created (skill + agent)
□ Testing framework in place
□ Migration checklist ready
□ README.md explains new structure
□ No syntax errors in any files
□ All internal references valid

DELIVERABLE:
Show me:
1. Tree of new .opencode structure
2. Content of SKILL.md (Arabic Language Master) — full definition
3. Summary of tests created
4. Migration checklist

Let's go.
```

---

## PHASE 2 PROMPT (Weeks 4-6): AGENT CONSOLIDATION

### Copy This Exactly

```
GOAL: Consolidate 45 agents → 20 agents, build remaining Tier 2 skills

CONTEXT:
- Phase 1 complete (structure ready)
- Now consolidating actual agents
- Building Design Master + Brand Voice Enforcer skills
- TIMELINE: 3 weeks
- Speed is critical

TASK 1: Consolidate Master Agents (Groups A-E)
==============================================
Location: .opencode/agents/master/

Group A: Content Generation (4 agents → 1)
Source agents: Social Content Creator, Blog Outliner, Video Caption, Ad Copy
Merge into: content-copy-engine.yaml

Specifications from ENHANCED_SKILLS_ARCHITECTURE.md:
- Input: content_type, platform, subject, audience, tone, language, num_variations
- Output: variations with predictions, metadata, engagement forecast
- Must support: social, blog, video, email, ad, outreach, sequence, brief

Create the YAML with full:
- Metadata
- System prompt (detailed)
- Input schema
- Output schema
- Error handling
- Skill dependencies (uses Arabic Language Master + Design Master later)

Group B: Analytics (5 agents → 1)
Source: Campaign ROI, Email Analytics, Lead Quality, Financial Health, Project Profitability
Merge into: intelligence-analytics-engine.yaml

Group C: Document Generation (4 agents → 1)
Source: Design Brief, Email Sequence, Proposal, Invoice
Merge into: document-workflow-engine.yaml

Group D: Monitoring (5 agents → 1)
Source: Brand Consistency, Performance Monitor, Deal Health, Timeline Risk, Technical Debt
Merge into: monitoring-governance-engine.yaml

Group E: Optimization (7 agents → 1)
Source: Hashtag Optimizer, Budget Allocator, Bid Optimizer, Content Calendar, Audience, CRM, Workload
Merge into: optimization-allocation-engine.yaml

For EACH master agent:
1. Review source agents
2. Extract all capabilities
3. Consolidate into single logic
4. Create unified input/output schema
5. Ensure no functionality loss
6. Add to AGENTS_MANIFEST.yaml
7. Create test file

TASK 2: Organize Specialized Agents
==================================
Location: .opencode/agents/specialized/

From original 45 agents, identify 15 non-consolidatable agents:

Required:
- Code Review Agent (from Dev)
- Win/Loss Analysis Agent (from Sales)
- Mockup Generator Agent (from Design)
- Social Engagement Agent (from Social Media)
- SMS & Notification Agent (from Lead Gen)
- Finance & Profitability Agent (from Finance)
- [9 more dept-specific agents]

For EACH specialized agent:
1. Create YAML with full spec
2. Ensure no overlap with master agents
3. Define clear use cases
4. Add to AGENTS_MANIFEST.yaml

TASK 3: Build Design System Master Skill
=======================================
File: .opencode/skills/tier-2-domain/design-system-master/SKILL.md

Full implementation with:

1. Metadata:
   name: "Design System Master"
   tier: 2
   power_level: "⭐⭐⭐ Expert"
   supports: ["web", "mobile", "print", "social", "video"]
   cultural_focus: "arabic_design_excellence"

2. Capabilities:
   - Intelligent critique (not just style checking)
   - Cultural intelligence (Arabic design principles)
   - RTL-first thinking (accessibility checks)
   - Accessibility automation (WCAG compliance)
   - Competitive benchmarking
   - Engagement forecasting
   - Brand evolution tracking
   - Design system enforcement

3. Full Input/Output Schema (see ENHANCED_SKILLS_ARCHITECTURE.md)

4. Cultural Components:
   - Color meanings in Arabic culture
   - Symbol appropriateness
   - RTL implications
   - Spatial relationship preferences
   - Typography for Arabic fonts

5. Accessibility Components:
   - WCAG AA/AAA checking
   - RTL accessibility (checkbox positioning, etc.)
   - Color contrast validation
   - Touch target sizing

6. Learning System:
   - Track successful designs
   - Remember what worked for which audiences
   - Learn competitive positioning

TASK 4: Build Brand Voice Enforcer Skill
========================================
File: .opencode/skills/tier-2-domain/brand-voice-enforcer/SKILL.md

Full implementation with:

1. Metadata:
   name: "Brand Voice Enforcer"
   tier: 2
   enforces: ["tone", "positioning", "consistency", "cultural_authenticity"]

2. Capabilities:
   - Real-time brand policing
   - Evolution awareness (brand trajectory)
   - Dialect-specific tone validation
   - Competitive differentiation checking
   - Consistency machine (flags deviations)
   - Audience alignment verification
   - Approval automation

3. Input/Output Schema (from ENHANCED_SKILLS_ARCHITECTURE.md)

4. Brand Positioning Framework:
   - Current positioning statement
   - Target audience definition
   - Tone guidelines (formal/casual/inspirational)
   - Cultural values
   - Competitive positioning

5. Compliance Checking:
   - Voice alignment scoring
   - Message positioning scoring
   - Cultural authenticity scoring
   - Consistency with past

TASK 5: Update AGENTS_MANIFEST.yaml
==================================
File: .opencode/agents/AGENTS_MANIFEST.yaml

Registry of all 20 agents with:

```yaml
version: "1.0"
total_agents: 20

master_agents:
  - name: content-copy-engine
    type: universal
    handles: [social, blog, video, email, ad, outreach, sequence, brief]
    from_consolidation: [Social Content Creator, Blog Outliner, Video Caption, Ad Copy]
  
  - name: intelligence-analytics-engine
    ...
  
  [5 master agents total]

specialized_agents:
  - name: code-review-agent
    type: specialized
    department: development
  
  [15 specialized agents total]

dependencies:
  - all agents can call Tier 2 skills
  - orchestration layer ready for Phase 3

testing_status:
  - syntax: ✓
  - references: ✓
  - claude_compatibility: ✓
```

TASK 6: Update SKILLS_MANIFEST.yaml
===================================
File: .opencode/skills/SKILLS_MANIFEST.yaml

Registry of Tier 2 skills:

```yaml
version: "1.0"
total_skills: 3

tier_2_domain_experts:
  - name: arabic-language-master
    power: ⭐⭐⭐
    provides: [translation, dialect_adaptation, cultural_checking, sentiment_analysis]
    
  - name: design-system-master
    power: ⭐⭐⭐
    provides: [critique, accessibility, cultural_validation, engagement_forecast]
    
  - name: brand-voice-enforcer
    power: ⭐⭐⭐
    provides: [compliance_checking, brand_alignment, consistency_validation]

tier_3_orchestration:
  ready_for_phase_3: true
  
tier_4_adaptive:
  foundation_ready: true
```

TASK 7: Create Integration Tests
================================
Location: .opencode/testing/integration-tests/

Create tests that verify:
1. All 20 agents load without syntax errors
2. All agent cross-references work
3. All skills load without errors
4. Agents can call skills (integration)
5. Input/output schemas match
6. Claude API compatibility verified

TASK 8: Run Validation Suite
============================
Execute all tests:
1. test_agent_syntax.py → all 20 agents pass
2. test_skill_syntax.py → all 3 skills pass
3. test_claude_compatibility.py → 100% compliance
4. test_cross_references.py → no broken links
5. test_integration.py → agents ↔ skills work

TASK 9: Create Phase 2 Summary
=============================
File: .opencode/PHASE_2_SUMMARY.md

Document:
- 45 → 20 consolidation complete
- Master agents (5): full specs
- Specialized agents (15): full specs
- Tier 2 skills (3): complete
- All tests passing
- Ready for Phase 3

DELIVERABLE:
After execution, show:
1. AGENTS_MANIFEST.yaml (complete registry)
2. SKILLS_MANIFEST.yaml (complete registry)
3. Test results (all passing)
4. Phase 2 summary (status ready for Phase 3)
5. Any issues encountered + fixes applied

Let's go.
```

---

## PHASE 3 PROMPT (Weeks 7-9): AGENT REFINEMENT + ORCHESTRATION

### Copy This Exactly

```
GOAL: Refine agents (20→12), build Tier 3 orchestration skills, full integration

CONTEXT:
- Phase 1-2 complete (structure + 20 agents + Tier 2 skills ready)
- Now refining agents and adding orchestration layer
- Building orchestration skills that coordinate everything
- TIMELINE: 3 weeks
- Speed is critical

TASK 1: Consolidate Specialized Agents (20→12)
=============================================
From 15 specialized agents, merge the 9 most similar:

Analyze which can consolidate:
- Real-time responders: Social Engagement + SMS + Client Comms → Social Response Agent
- Analysis agents: Win/Loss + some analytics → Strategic Analysis Agent
- [Others based on actual overlap]

Result:
- 5 master agents (unchanged)
- 6 specialized agents (consolidated from 15)
- Total: 11 agents
- + 1 reserved = 12 agents

For EACH consolidation:
1. Review source agents
2. Confirm no functionality loss
3. Create consolidated YAML
4. Update AGENTS_MANIFEST.yaml
5. Test consolidation

TASK 2: Build Arabic Brand Architect (Tier 3)
============================================
File: .opencode/skills/tier-3-orchestration/arabic-brand-architect/SKILL.md

This is ORCHESTRATION SKILL #1

Purpose: Coordinates Arabic Language Master + Design Master + Brand Voice Enforcer
into unified Arabic brand identity

Specification:
1. Input:
   - brand_positioning: string
   - target_regions: [gcc, levant, maghreb]
   - cultural_sensitivity: "high"
   - premium_positioning: boolean

2. Orchestration Process:
   Step 1: Arabic Language Master → creates tone/vocabulary per dialect
   Step 2: Design Master → creates visual language for RTL/cultural context
   Step 3: Brand Voice Enforcer → ensures everything aligns
   Step 4: THIS SKILL → coordinates conflicts, ensures coherence

3. Output:
   - unified_brand_identity
   - language_guidelines (per dialect)
   - design_guidelines (RTL-optimized)
   - messaging_framework (voice + positioning)
   - cultural_playbook (do's and don'ts)
   - examples (fully executed pieces)

4. Coordination Logic:
   - If language + design conflict → resolve by priority
   - If voice doesn't match → apply brand voice rules
   - Ensure all three layers are coherent
   - Output unified brief

5. Learning Integration:
   - Remember what combinations worked
   - Suggest improvements based on past success

TASK 3: Build Content Quality Manager (Tier 3)
============================================
File: .opencode/skills/tier-3-orchestration/content-quality-manager/SKILL.md

This is ORCHESTRATION SKILL #2

Purpose: Ensures content meets ALL standards simultaneously

Orchestration Process:
1. Content & Copy Engine → generates options
2. Arabic Language Master → validates + cultural checks
3. Design Master → ensures visual compliance
4. Brand Voice Enforcer → verifies on-brand
5. THIS SKILL → reconciles feedback, produces final

Input:
- content_type: "email|social|landing_page|video|document"
- content_brief: string
- quality_requirements: array
- target_audience: string

Output:
- final_assets: [approved content]
- quality_score: percentage (0-100)
- ready_to_publish: boolean
- predicted_metrics: [engagement forecast]
- revision_checklist: [if not ready]

Coordination Logic:
- Gather feedback from all skills
- Identify conflicts
- Resolve by quality priority
- Output final assets or revision brief

TASK 4: Update SKILLS_MANIFEST.yaml
===================================
Add Tier 3 skills:

```yaml
tier_3_orchestration:
  - name: arabic-brand-architect
    power: ⭐⭐⭐⭐
    orchestrates: [arabic-language-master, design-system-master, brand-voice-enforcer]
    
  - name: content-quality-manager
    power: ⭐⭐⭐⭐
    orchestrates: [all_agents, all_tier2_skills]
```

TASK 5: Create Integration Architecture
========================================
File: .opencode/INTEGRATION_ARCHITECTURE.md

Document how everything works together:

```
User Request
    ↓
Appropriate Agent (12 total)
    ↓
Tier 2 Skills (validation/enhancement)
    ↓
Tier 3 Skills (orchestration/coordination)
    ↓
Final Output
```

Examples for each content type:
- Email: content-copy-engine → language master → design master → brand enforcer → quality manager
- Social post: content-copy-engine → language master → brand enforcer → quality manager
- Brand identity: No agent → language master → design master → brand enforcer → brand architect

TASK 6: Create Agent-to-Skill Mapping
=====================================
File: .opencode/AGENT_SKILL_MAPPING.yaml

Map which agents use which skills:

```yaml
agents:
  content-copy-engine:
    uses_tier2: [arabic-language-master, brand-voice-enforcer]
    uses_tier3: [content-quality-manager]
  
  intelligence-analytics-engine:
    uses_tier2: [brand-voice-enforcer]
    uses_tier3: [content-quality-manager]
  
  [for each of 12 agents]
```

TASK 7: Create Orchestration Tests
=================================
Location: .opencode/testing/orchestration-tests/

Test that:
1. Tier 3 skills call Tier 2 skills correctly
2. Orchestration skills resolve conflicts
3. Agent → Skill2 → Skill3 pipeline works
4. Final output quality meets standards
5. Learning systems capture patterns

TASK 8: Run Full Integration Suite
==================================
Execute:
1. All Phase 1-2 tests still passing ✓
2. Agent consolidation tests → passing
3. Orchestration tests → passing
4. Integration tests → passing
5. Claude compatibility → 100%

TASK 9: Create Tier 4 Foundation
===============================
File: .opencode/skills/tier-4-adaptive/FOUNDATION.md

Set up structure (don't implement yet):

```
tier-4-adaptive/
├── arabic-excellence-engine/
│   ├── SKILL.md (stub)
│   ├── learning-system/
│   │   ├── pattern-tracker.yaml
│   │   ├── feedback-loop.md
│   │   └── improvement-algorithm.md
│   └── metrics/
│       └── success-tracking.json
│
└── mediabubble-style-guardian/
    ├── SKILL.md (stub)
    ├── brand-evolution-tracker/
    │   └── positioning-history.md
    └── adaptive-recommendations/
        └── framework.md
```

TASK 10: Create Phase 3 Summary
===============================
File: .opencode/PHASE_3_SUMMARY.md

Document:
- 20 → 12 agent consolidation complete
- 6 master agents (optimized)
- 6 specialized agents (refined)
- Tier 2 skills (3): ready
- Tier 3 skills (2): ready + tested
- Full integration verified
- Tier 4 foundation ready
- All tests passing
- Ready for Phase 4

DELIVERABLE:
After execution, show:
1. Updated AGENTS_MANIFEST.yaml (12 agents)
2. Updated SKILLS_MANIFEST.yaml (Tier 2-3)
3. INTEGRATION_ARCHITECTURE.md (how it all works)
4. AGENT_SKILL_MAPPING.yaml (who uses what)
5. All tests passing
6. Phase 3 summary (ready for Phase 4)

Let's go.
```

---

## PHASE 4 PROMPT (Weeks 10+): INTELLIGENCE & LEARNING

### Copy This Exactly

```
GOAL: Implement Tier 4 adaptive skills with learning systems, prepare for exponential improvement

CONTEXT:
- Phases 1-3 complete (12 agents + Tier 2-3 skills fully working)
- Now building learning systems that improve automatically
- Setting up feedback loops and pattern tracking
- TIMELINE: 4 weeks + ongoing
- This is the foundation for exponential improvement

TASK 1: Build Arabic Excellence Engine (Tier 4)
=============================================
File: .opencode/skills/tier-4-adaptive/arabic-excellence-engine/SKILL.md

Full implementation with learning:

1. Metadata:
   name: "Arabic Excellence Engine"
   tier: 4
   power: ⭐⭐⭐⭐⭐ Visionary
   learns: true
   improves: "exponential"

2. Learning System:
   - Tracks every Arabic request + results
   - Analyzes what worked (engagement, sentiment, cultural fit)
   - Identifies patterns for each audience/dialect
   - Applies learnings to future requests
   - Predicts outcomes more accurately each time

3. Feedback Loops:
   - After publishing: collect engagement metrics
   - After month: analyze patterns
   - After quarter: major improvements
   - Continuously: apply learnings

4. Pattern Database:
   - Store successful translations per dialect
   - Store successful tones per audience
   - Store cultural insights that worked
   - Store code-switching patterns that resonated

5. Prediction Engine:
   - For new request: look up similar past requests
   - Review their metrics
   - Apply successful patterns
   - Forecast engagement

6. Version Evolution:
   - Version 1.0: Manual pattern tracking
   - Version 1.1: Automated pattern recognition
   - Version 1.2: Predictive intelligence
   - Version 2.0: Self-optimizing recommendations

Example:
- Month 1: Egyptian email → 5% engagement
- System tracks: This tone + emoji combo = 5%
- Month 2: New Egyptian email (same tone/emoji) → 8.2%
  System adapted based on Month 1 learning
- Month 3: New Egyptian email → 12.5%
  System has learned multiple successful patterns
- Month 6: System now expertly predicts Egyptian preferences
  New requests hit 20%+ engagement immediately

TASK 2: Build MediaBubble Style Guardian (Tier 4)
================================================
File: .opencode/skills/tier-4-adaptive/mediabubble-style-guardian/SKILL.md

Full implementation with evolution tracking:

1. Metadata:
   name: "MediaBubble Style Guardian"
   tier: 4
   tracks: "brand_evolution"
   adapts: "automatically"

2. Brand Evolution Tracking:
   - Observe every published piece
   - Track brand positioning changes
   - Notice market shifts
   - Predict brand direction

3. Automatic Adaptation:
   - If brand becomes more premium → all skills become more sophisticated
   - If brand becomes more playful → all skills adjust tone
   - If brand shifts positioning → all skills adapt messaging

4. Proactive Recommendations:
   - System: "I notice we've moved premium. Should we update typography?"
   - System: "Market shifted. Recommend adjusting audience targeting."
   - System: "Brand evolving. Suggest new tone guidelines."

5. Version Evolution:
   - Version 1.0: Passive tracking
   - Version 1.1: Pattern recognition
   - Version 1.2: Proactive recommendations
   - Version 2.0: Self-implementing improvements

TASK 3: Implement Learning Loops
===============================
File: .opencode/skills/tier-4-adaptive/LEARNING_SYSTEM.md

Technical architecture:

1. Capture:
   - Every request + response stored
   - Every published output + metrics captured
   - User feedback recorded
   - Patterns automatically extracted

2. Analysis:
   - Monthly review of what worked
   - Quarterly deep analysis
   - Annual strategy review
   - Continuous pattern recognition

3. Storage:
   - Pattern database (JSON)
   - Metrics history (time-series)
   - Success patterns (indexed by audience/dialect)
   - Learned rules (explicit + implicit)

4. Application:
   - New requests lookup similar past successes
   - Apply proven patterns automatically
   - Improve predictions over time
   - Increase engagement rates monthly

TASK 4: Create Feedback Collection System
=========================================
File: .opencode/skills/tier-4-adaptive/FEEDBACK_COLLECTION.md

How to gather learning data:

1. After Publishing:
   - Engagement metrics (clicks, views, conversions)
   - Audience response (sentiment, comments)
   - Business impact (sales, leads, brand mentions)
   - Predicted vs actual comparison

2. Monthly Review:
   - What worked well this month?
   - What fell short?
   - New patterns discovered?
   - Recommendations for next month?

3. Storage Format:
   ```json
   {
     "request_id": "unique_id",
     "request_type": "email|social|design|etc",
     "inputs": {...},
     "outputs": {...},
     "metrics": {
       "engagement": 0.87,
       "sentiment": "positive",
       "conversions": 125,
       "predicted_vs_actual": 0.95
     },
     "patterns_identified": [...],
     "successful_elements": [...],
     "learned_for_future": [...]
   }
   ```

TASK 5: Create Metrics Dashboard
===============================
File: .opencode/skills/tier-4-adaptive/METRICS_DASHBOARD.md

What to track:

1. Per Skill:
   - Accuracy of predictions
   - Quality of outputs
   - Engagement improvements
   - Learning curve slope

2. Overall:
   - Time saved (vs manual)
   - Quality improvement (vs baseline)
   - Engagement increase (vs month 1)
   - ROI (cost vs value)

3. Learning Curves:
   - Month 1 baseline
   - Month 2 improvement
   - Month 3 improvement
   - 6-month trend
   - 12-month vision

TASK 6: Create Test Suite for Tier 4
====================================
Location: .opencode/testing/adaptive-tests/

Test:
1. Learning system captures data correctly
2. Pattern recognition works
3. Feedback loops function
4. Predictions improve over time
5. Proactive recommendations trigger appropriately
6. Brand evolution tracking accurate

TASK 7: Create Tier 4 Documentation
===================================
Files:
- How learning systems work
- How to interpret metrics
- How to use proactive recommendations
- How to trust predictions
- What not to do (prevent gaming the system)

TASK 8: Update ALL Manifests
===========================
Files:
- AGENTS_MANIFEST.yaml → add learning status
- SKILLS_MANIFEST.yaml → add Tier 4 skills
- OVERALL_MANIFEST.yaml → complete overview

Final status:
```
AGENTS: 12 (fully optimized)
SKILLS:
  - Tier 2: 3 (expert level)
  - Tier 3: 2 (orchestration)
  - Tier 4: 2 (learning systems)
TOTAL: 19 intelligent components

CAPABILITY: Fully integrated system learning & improving monthly
TIMELINE: Week 10 foundation + ongoing improvement
NEXT: Continuous evolution + exponential improvement
```

TASK 9: Create Phase 4 Summary + Vision
======================================
File: .opencode/PHASE_4_SUMMARY.md

Document:
- Tier 4 skills complete
- Learning systems active
- Feedback loops established
- Metrics dashboard ready
- Vision for exponential improvement
- Roadmap for next 12 months

TASK 10: Create Final Implementation Guide
==========================================
File: .opencode/IMPLEMENTATION_COMPLETE.md

How to use the system now:

1. Day-to-day:
   - Use agents for specific tasks
   - Use Tier 2 skills for validation/enhancement
   - Use Tier 3 skills for coordination
   - Let Tier 4 skills learn automatically

2. Monthly:
   - Review learning dashboard
   - Check pattern improvements
   - Adjust based on market changes
   - Update brand guidelines if needed

3. Quarterly:
   - Deep analysis of learnings
   - Strategic adjustments
   - New pattern detection
   - Celebrate improvements

4. Yearly:
   - Look back at transformation
   - Measure ROI
   - Plan next evolution
   - Celebrate exponential growth

DELIVERABLE:
After execution, show:
1. Complete Tier 4 skill specs (2 skills)
2. Learning system architecture
3. Feedback collection system
4. Metrics dashboard setup
5. All tests passing
6. Complete manifests
7. Phase 4 summary
8. Implementation complete (ready for continuous evolution)

This is it. You now have maximum power skills that learn and improve.
Let's go.
```

---

## QUICK REFERENCE: WHAT TO COPY-PASTE WHEN

### Week 1-3 (Phase 1)
→ Copy **PHASE 1 PROMPT** above
→ Paste into Claude Code
→ Execute

### Week 4-6 (Phase 2)
→ Copy **PHASE 2 PROMPT** above
→ Paste into Claude Code
→ Execute

### Week 7-9 (Phase 3)
→ Copy **PHASE 3 PROMPT** above
→ Paste into Claude Code
→ Execute

### Week 10+ (Phase 4)
→ Copy **PHASE 4 PROMPT** above
→ Paste into Claude Code
→ Execute

---

## IMPORTANT NOTES

**Before each phase:**
1. Copy the entire prompt (all of it)
2. Paste into Claude Code in new window
3. Hit execute
4. Let it run to completion
5. Move to next phase

**Do NOT:**
- Ask questions during execution
- Try to speed it up
- Skip validation
- Mix phases together

**DO:**
- Copy the exact prompt
- Let it execute completely
- Review output
- Move to next phase

---

## Expected Execution Times

| Phase | Duration | Deliverables | Status |
|-------|----------|--------------|--------|
| Phase 1 | 3 weeks | Structure + Tier 2 foundation | Foundation complete |
| Phase 2 | 3 weeks | 20 agents + full Tier 2 | Agents ready |
| Phase 3 | 3 weeks | 12 agents + Tier 3 orchestration | Fully integrated |
| Phase 4 | 4 weeks | Tier 4 learning systems | Learning active |
| **Total** | **10 weeks** | **Complete system ready** | **Go live** |

---

## Success Criteria Per Phase

### Phase 1: ✅
- [ ] Folder structure created
- [ ] Arabic Language Master complete
- [ ] Templates ready
- [ ] Testing framework set up
- [ ] Migration checklist done

### Phase 2: ✅
- [ ] 20 agents consolidated
- [ ] Tier 2 skills (3) complete
- [ ] AGENTS_MANIFEST.yaml filled
- [ ] All tests passing
- [ ] Ready for Phase 3

### Phase 3: ✅
- [ ] 12 agents consolidated (20→12)
- [ ] Tier 3 orchestration complete
- [ ] Full integration tested
- [ ] All manifests updated
- [ ] Ready for Phase 4

### Phase 4: ✅
- [ ] Tier 4 learning systems live
- [ ] Feedback loops active
- [ ] Metrics dashboard ready
- [ ] System learning from data
- [ ] Ready for continuous evolution

---

**YOU'RE READY TO MOVE FAST. NO DELAYS. JUST EXECUTION.**

