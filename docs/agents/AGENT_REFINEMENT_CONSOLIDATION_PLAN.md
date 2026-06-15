# Agent Refinement, Consolidation & Alignment Plan
**MediaBubble AI Agents System v2.0**

---

## Executive Summary

Your current system has **45 agents across 9 departments** with **949 hours/year savings** potential. This refinement plan:
- **Consolidates overlapping agents** (reduce from 45 → 35)
- **Aligns agents with available skills** (technical capability matching)
- **Removes low-ROI agents** (unclear impact or overlapping functionality)
- **Improves agent design** (clearer triggers, better outcomes)

**Target outcome:** 35 high-impact agents with clear skill mappings and measurable ROI.

---

## Part 1: Agent Overlap Analysis & Consolidation

### Design Department (5 → 4 agents)

**CONSOLIDATE: Agent 1 (Design Brief Generator) + Agent 2 (Asset Variations Generator)**
- **Reason:** Both operate on the same artifact (design file) at different stages
- **New Agent: "Design Workflow Orchestrator"**
  - Trigger: Design approved
  - Process: 
    1. Auto-generate brief ✓ (current Agent 1)
    2. Auto-create variations ✓ (current Agent 2)
    3. Auto-generate mockups (current Agent 5)
  - Output: Brief + variations + mockups in one orchestrated flow
  - Skills alignment: `adobe-design-from-template`, `adobe-create-social-variations`, `adobe-resize-photos-and-videos`

**KEEP: Agent 3 (Brand Consistency Checker)**
- High ROI (catches drift early, reduces rework)
- Unique function (validation vs. generation)
- Skills alignment: `design:design-system`, `design:design-critique`

**KEEP: Agent 4 (Social Media Design Batching)**
- High volume (20-30 posts/month)
- Platform-specific complexity
- Skills alignment: `adobe-create-social-variations`, `postiz:postiz`

**RENAME: Agent 5 (Mockup Generator) → Integrate into Orchestrator**
- No longer standalone

**New Agent 5: "Design Trend Monitor"** (add)
- Trigger: Weekly or on-demand
- Process: Analyze competitor design trends, extract inspiration, identify color/style trends
- Skills alignment: `searchfit-seo:competitive-intel` (adapted)
- ROI: Keeps designs fresh, identifies opportunities

---

### Social Media Marketing Department (5 → 4 agents)

**CONSOLIDATE: Agent 1 (Content Creator Engine) + Agent 2 (Video Caption Generator)**
- **Reason:** Both create platform-specific copy; differ only in format (text vs. video)
- **New Agent: "Multi-Format Copy Generator"**
  - Input: Content pillar + media type (text post, video, carousel)
  - Output: Platform-specific copy (LinkedIn, Instagram, TikTok, etc.)
  - Skills alignment: `marketing:content-creation`, `marketing:draft-content`

**KEEP: Agent 3 (Engagement Responder)**
- Real-time function (comments/DMs)
- Different trigger pattern
- Skills alignment: `postiz:postiz` (monitoring)

**KEEP: Agent 4 (Hashtag Strategy Optimizer)**
- Weekly/strategic (not real-time)
- Data-driven (competitor analysis)
- Skills alignment: `searchfit-seo:keyword-clustering` (adapted for hashtags)

**RENAME: Agent 5 (Content Calendar Balancer) → "Content Balance & Scheduling"**
- Clarify it's both strategy + execution

**New Agent 6: "Social Metrics Analyzer"** (add)
- Trigger: Weekly/monthly
- Process: Analyze platform performance by content type, identify winning formats
- Skills alignment: `data:analyze`, `product-management:metrics-review`
- ROI: Optimizes content strategy based on data

---

### Lead Generation Department (5 → 4 agents)

**CONSOLIDATE: Agent 1 (Lead Auto-Scorer) + Agent 2 (Personalized Email Generator)**
- **Reason:** Both operate on same lead, sequential workflow
- **New Agent: "Lead Scoring & Outreach Engine"**
  - Trigger: New lead imported
  - Process: Score → Route → Generate outreach email
  - Skills alignment: `sales:draft-outreach`, `sales:account-research`

**KEEP: Agent 3 (Email Nurture Sequence Builder)**
- Different trigger (qualified but not ready)
- Complex workflow (7-email sequence)
- Skills alignment: `marketing:email-sequence`

**KEEP: Agent 4 (Lead Quality Insights Dashboard)**
- Analytical/reporting function
- Skills alignment: `data:build-dashboard`, `data:analyze`

**RENAME: Agent 5 (SMS Reminder/Follow-up) → "Multi-Channel Persistence"**
- Clarify it handles email + SMS + phone

---

### Media Buying Department (5 → 3 agents) — AGGRESSIVE CONSOLIDATION

**CONSOLIDATE: Agent 1 (Bid Optimizer) + Agent 2 (Creative Variations) + Agent 4 (Audience Targeting)**
- **Reason:** All three are optimization/testing agents; could be unified into one "campaign optimizer"
- **New Agent: "Campaign Performance Optimizer"**
  - Trigger: Campaign running 7+ days
  - Process:
    1. Analyze performance (bids, creatives, audiences)
    2. Identify winning elements (each dimension)
    3. Recommend bid changes + creative tests + audience refinements
  - Skills alignment: `adspirer-ads-agent:campaign-performance`, `adspirer-ads-agent:keyword-research`

**KEEP: Agent 3 (Budget Allocation Optimizer)**
- Strategic/monthly function
- Different decision level (campaign level, not granular optimization)
- Skills alignment: `data:analyze`

**CONSOLIDATE: Agent 5 (Campaign ROI Analytics) → Integrate into Budget Allocator**
- Output of Budget Allocator should include ROI insights

**New Agent 4: "Audience Expansion Engine"** (add)
- Trigger: Winning audience identified
- Process: Create lookalike audiences, suggest new interests
- Skills alignment: `sales:account-research` (audience research)
- ROI: Scale winners without plateau

---

### Development Department (5 → 5 agents) — REFINE, DON'T REDUCE

**REFINE: Agent 1 (Code Review Assistant)**
- Add "test coverage enforcement" check
- Skills alignment: `engineering:code-review`, `engineering:testing-strategy`

**REFINE: Agent 2 (Performance Regression Monitor)**
- Add "CI/CD integration" trigger (not just post-deploy)
- Skills alignment: `engineering:debug` (when regression detected)

**KEEP: Agent 3 (Change Request Prioritizer)**
- Unique function (intake → prioritization)
- Skills alignment: `product-management:write-spec`

**KEEP: Agent 4 (Technical Debt Tracker)**
- Strategic importance (prevents crisis)
- Skills alignment: `engineering:tech-debt`

**KEEP: Agent 5 (Test Coverage Analyzer)**
- Different from Code Review (specific to coverage)
- Skills alignment: `engineering:testing-strategy`

---

### Marketing Department (5 → 4 agents)

**CONSOLIDATE: Agent 1 (Content Calendar Generator) + Agent 2 (Blog Outliner/Drafter)**
- **Reason:** Calendar creation feeds into content creation; could be one workflow
- **New Agent: "Content Production Pipeline"**
  - Trigger: Monthly planning → Week by week → Daily execution
  - Process:
    1. Generate calendar (Agent 1)
    2. For each calendar item: Generate blog outline/draft (Agent 2)
    3. Output: Calendar + 4-5 blog drafts ready for editing
  - Skills alignment: `marketing:campaign-plan`, `marketing:content-creation`

**KEEP: Agent 3 (Email Campaign Performance Analyzer)**
- Real-time analytics (different from calendar planning)
- Skills alignment: `data:analyze`, `marketing:performance-report`

**KEEP: Agent 4 (Competitor Content Intelligence)**
- Weekly/strategic monitoring
- Skills alignment: `searchfit-seo:competitive-brief`

**RENAME: Agent 5 (Lead Generation Content Scorer) → "Content ROI Tracker"**
- Track all content (not just lead-gen focused)

---

### Sales Department (5 → 4 agents)

**CONSOLIDATE: Agent 1 (CRM Auto-Populate) + Agent 3 (Personalized Outreach)**
- **Reason:** Both handle lead/contact data; Outreach can create contact records
- **New Agent: "Sales Workflow Automation"**
  - Trigger: Lead captured (form, email, or manual entry)
  - Process:
    1. Create/update contact in HubSpot
    2. Research prospect
    3. Generate personalized outreach
  - Skills alignment: `sales:draft-outreach`, `sales:account-research`

**KEEP: Agent 2 (Deal Forecast & Health Monitor)**
- Different data source (HubSpot deals, not leads)
- Strategic forecast function
- Skills alignment: `sales:pipeline-review`

**KEEP: Agent 4 (Proposal Auto-Generator)**
- High ROI (2-3 hours saved per proposal)
- Different trigger (deal → proposal stage)
- Skills alignment: `sales:create-an-asset`

**RENAME: Agent 5 (Win/Loss Analysis) → "Deal Intelligence Engine"**
- Add ongoing pattern recognition

---

### Management/Operations Department (5 → 4 agents)

**CONSOLIDATE: Agent 1 (Meeting Prep) + Agent 2 (Status Report Compiler)**
- **Reason:** Both pull from same data sources; meeting materials could feed report
- **New Agent: "Executive Communication Orchestrator"**
  - Trigger: Meeting scheduled OR report due
  - Process:
    1. Gather context (project data, metrics, blockers)
    2. Generate meeting agenda + materials
    3. Generate status report from same data
  - Skills alignment: `operations:status-report`, `engineering:standup`

**KEEP: Agent 3 (Timeline Risk Monitor)**
- Continuous monitoring (not event-based)
- Specialized predictive function
- Skills alignment: `operations:risk-assessment`

**KEEP: Agent 4 (Team Workload Balancer)**
- Different data (resource allocation)
- Monthly cadence
- Skills alignment: `operations:capacity-plan`, `human-resources:org-planning`

**KEEP: Agent 5 (Client Communication Auto-Responder)**
- Real-time function (different from status reports)
- Skills alignment: (custom skill needed)

---

### Finance Department (5 → 5 agents) — REFINE ONLY

**REFINE: Agent 1 (Invoice Generator)**
- Add "PO matching" for corporate clients
- Skills alignment: (custom accounting skill)

**REFINE: Agent 2 (Revenue Recognition)**
- Add "SaaS metrics" (MRR, ARR, churn)
- Skills alignment: `data:analyze`

**KEEP: Agent 3 (Project Profitability Calculator)**
- Critical for pricing decisions
- Skills alignment: `finance:financial-statements`

**KEEP: Agent 4 (Cash Flow Forecaster)**
- Real-time finance function
- Skills alignment: `small-business:cash-flow-snapshot`

**KEEP: Agent 5 (Financial Health Dashboard)**
- Strategic reporting
- Skills alignment: `data:build-dashboard`

---

## Part 2: Final Agent Count & Structure

### Before & After

| Department | Before | After | Consolidated | Removed | Added |
|-----------|--------|-------|--------------|---------|-------|
| Design | 5 | 5 | 2 agents | 1 agent | 1 agent |
| Social Media | 5 | 6 | 2 agents | 0 agents | 1 agent |
| Lead Gen | 5 | 4 | 1 agent | 0 agents | 0 agents |
| Media Buying | 5 | 4 | 3 agents | 1 agent | 1 agent |
| Development | 5 | 5 | 0 agents | 0 agents | 0 agents |
| Marketing | 5 | 4 | 1 agent | 0 agents | 0 agents |
| Sales | 5 | 4 | 1 agent | 0 agents | 0 agents |
| Management | 5 | 4 | 1 agent | 0 agents | 0 agents |
| Finance | 5 | 5 | 0 agents | 0 agents | 0 agents |
| **TOTAL** | **45** | **41** | **12 agents** | **3 agents** | **3 agents** |

---

## Part 3: Low-ROI Agents to Remove or Deprioritize

### Agents with Unclear or Overlapping Value

1. **Media Buying - Agent 5 (Campaign ROI Analytics)** — REMOVE
   - ROI already captured by Budget Allocator
   - Reporting can be generated ad-hoc via dashboard

2. **Social Media - Agent 5 (Content Calendar Balancer)** — INTEGRATE into Multi-Format Copy Generator
   - Calendar creation is strategic; content generation is execution
   - Both should work together

3. **Lead Gen - Agent 5 (SMS Reminder)** → Deprioritize to Phase 3
   - SMS is supplementary (email is primary)
   - Consider implementing after core nurture is working

---

## Part 4: Skills Alignment Matrix

### Design Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Workflow Orchestrator | `adobe-design-from-template` | `adobe-create-social-variations`, `adobe-resize-photos-and-videos` | ✓ Available |
| Brand Consistency Checker | `design:design-system` | `design:design-critique` | ✓ Available |
| Social Media Design Batching | `adobe-create-social-variations` | `postiz:postiz` | ✓ Available |
| Design Trend Monitor | `searchfit-seo:competitive-brief` | (custom research) | ⚠️ Requires adaptation |

### Social Media Marketing Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Multi-Format Copy Generator | `marketing:content-creation` | `marketing:draft-content` | ✓ Available |
| Engagement Responder | `postiz:postiz` | (custom) | ⚠️ Monitoring needs custom tool |
| Hashtag Strategy Optimizer | `searchfit-seo:keyword-clustering` | (custom adaptation) | ⚠️ Needs keyword → hashtag mapper |
| Content Balance & Scheduling | `marketing:campaign-plan` | `product-management:metrics-review` | ✓ Available |
| Social Metrics Analyzer | `data:analyze` | `product-management:metrics-review` | ✓ Available |

### Lead Generation Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Lead Scoring & Outreach Engine | `sales:draft-outreach` | `sales:account-research` | ✓ Available |
| Email Nurture Sequence Builder | `marketing:email-sequence` | (custom) | ✓ Available |
| Lead Quality Insights Dashboard | `data:build-dashboard` | `data:analyze` | ✓ Available |
| Multi-Channel Persistence | (custom) | (custom) | ⚠️ Needs SMS/phone integration |

### Media Buying Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Campaign Performance Optimizer | `adspirer-ads-agent:campaign-performance` | `adspirer-ads-agent:keyword-research` | ✓ Available |
| Budget Allocation Optimizer | `data:analyze` | (custom) | ✓ Available |
| Audience Expansion Engine | `sales:account-research` | (custom lookalike logic) | ⚠️ Requires platform-specific API |

### Development Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Automated Code Review | `engineering:code-review` | `engineering:testing-strategy` | ✓ Available |
| Performance Regression Monitor | `engineering:debug` | (custom metrics) | ⚠️ Needs CI/CD integration |
| Change Request Prioritizer | `product-management:write-spec` | (custom) | ✓ Available |
| Technical Debt Tracker | `engineering:tech-debt` | (custom) | ✓ Available |
| Test Coverage Analyzer | `engineering:testing-strategy` | (custom) | ✓ Available |

### Marketing Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Content Production Pipeline | `marketing:content-creation` | `marketing:campaign-plan` | ✓ Available |
| Email Campaign Performance Analyzer | `data:analyze` | `marketing:performance-report` | ✓ Available |
| Competitor Content Intelligence | `searchfit-seo:competitive-brief` | (custom) | ✓ Available |
| Content ROI Tracker | `data:analyze` | (custom lead tracking) | ⚠️ Needs GTM integration |

### Sales Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Sales Workflow Automation | `sales:draft-outreach` | `sales:account-research` | ✓ Available |
| Deal Forecast & Health Monitor | `sales:pipeline-review` | (custom HubSpot logic) | ⚠️ Needs HubSpot API |
| Proposal Auto-Generator | `sales:create-an-asset` | (custom) | ✓ Available |
| Deal Intelligence Engine | (custom) | `sales:competitive-intelligence` | ⚠️ Needs custom rules |

### Management/Operations Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Executive Communication Orchestrator | `operations:status-report` | `engineering:standup` | ✓ Available |
| Project Timeline Risk Monitor | `operations:risk-assessment` | (custom) | ✓ Available |
| Team Workload Balancer | `operations:capacity-plan` | `human-resources:org-planning` | ✓ Available |
| Client Communication Auto-Responder | (custom) | `customer-support:draft-response` | ⚠️ Needs ticket system integration |

### Finance Department

| Agent | Primary Skill | Secondary Skills | Status |
|-------|--------------|------------------|--------|
| Invoice Generator | (custom accounting) | (custom) | ⚠️ Needs accounting software integration |
| Revenue Recognition Auto-Updater | `data:analyze` | (custom SaaS metrics) | ⚠️ Needs GL integration |
| Project Profitability Calculator | `finance:financial-statements` | (custom time tracking) | ✓ Available |
| Cash Flow Forecaster | `small-business:cash-flow-snapshot` | (custom) | ✓ Available |
| Financial Health Dashboard | `data:build-dashboard` | (custom metrics) | ✓ Available |

---

## Part 5: Implementation Roadmap (Updated)

### Phase 1: Foundation (Weeks 1-4) — 9 Agents
Focus on highest ROI + best skill alignment

- [x] Design: Workflow Orchestrator (combines 3 agents)
- [x] Social Media: Multi-Format Copy Generator (combines 2 agents)
- [x] Lead Gen: Lead Scoring & Outreach Engine (combines 2 agents)
- [x] Media Buying: Campaign Performance Optimizer (combines 3 agents)
- [x] Development: Automated Code Review (refine existing)
- [x] Marketing: Content Production Pipeline (combines 2 agents)
- [x] Sales: Sales Workflow Automation (combines 2 agents)
- [x] Management: Executive Communication Orchestrator (combines 2 agents)
- [x] Finance: Invoice Generator (refine existing)

**Skills to prioritize:** All marked ✓ Available

### Phase 2: Enhancement (Weeks 5-8) — 11 Agents
Add specialized agents + refine Phase 1

- [x] Design: Brand Consistency Checker (refine)
- [x] Design: Design Trend Monitor (new)
- [x] Social Media: Engagement Responder (refine)
- [x] Social Media: Hashtag Strategy Optimizer (refine)
- [x] Social Media: Social Metrics Analyzer (new)
- [x] Lead Gen: Email Nurture Sequence Builder (existing)
- [x] Lead Gen: Lead Quality Insights Dashboard (refine)
- [x] Media Buying: Budget Allocation Optimizer (existing)
- [x] Media Buying: Audience Expansion Engine (new)
- [x] Marketing: Competitor Content Intelligence (refine)
- [x] Marketing: Content ROI Tracker (refine)

**Skills to prioritize:** Hashtag Strategy needs keyword clustering adaptation

### Phase 3: Optimization (Weeks 9-12) — 21 Agents
Complete remaining agents + custom integrations

- [x] Dev: Performance Regression Monitor, Change Request Prioritizer, Tech Debt, Test Coverage
- [x] Sales: Deal Forecast & Health Monitor, Proposal Generator, Deal Intelligence
- [x] Management: Timeline Risk Monitor, Workload Balancer, Communication Responder
- [x] Finance: Revenue Recognition, Profitability, Cash Flow, Dashboard
- [x] Lead Gen: SMS/Multi-Channel Persistence (deprioritize if low ROI)

**Skills to create:** HubSpot integrations, accounting software hooks, ticket system connections

---

## Part 6: Custom Skills to Build

### Priority 1: Must-Have for Phase 1

1. **hashtag-strategy-optimizer**
   - Input: Trending topics, competitor hashtags, past performance
   - Output: Ranked hashtag sets by content type
   - Maps to: `searchfit-seo:keyword-clustering`

2. **hubspot-deal-sync**
   - Input: Email, calendar, form data
   - Output: HubSpot records + activities
   - Dependency: HubSpot API access

3. **campaign-optimizer-unified**
   - Input: Google Ads, Meta, LinkedIn campaign data
   - Output: Bid changes, creative recommendations, audience adjustments
   - Maps to: `adspirer-ads-agent:campaign-performance`

### Priority 2: Nice-to-Have for Phase 2

1. **sms-engagement-engine**
   - Input: Lead engagement signals
   - Output: SMS templates + sending triggers
   - Integration: Twilio or similar

2. **design-trend-monitor**
   - Input: Competitor websites, design websites (Dribbble, etc.)
   - Output: Trend report + color/style analysis
   - Integration: Web scraping + CV analysis

3. **ticket-system-responder**
   - Input: Support tickets (Intercom, Zendesk)
   - Output: Auto-acknowledgment + routing
   - Integration: Ticket system API

### Priority 3: Strategic for Phase 3

1. **revenue-recognition-engine**
   - SaaS-specific accounting (MRR, ARR, churn)
   - Integration: QuickBooks/Xero

2. **lookalike-audience-builder**
   - Create lookalike audiences from winners
   - Integration: Google Ads, Meta Ads APIs

3. **win-loss-analysis-engine**
   - Pattern recognition from closed deals
   - Integration: HubSpot + custom logic

---

## Part 7: Success Metrics (Refined)

### Per Agent Measurement

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Time Saved | Baseline → +30% | Before/after time logs per function |
| Quality (Error Rate) | <10% needing revision | Count of outputs needing human edit |
| Adoption | >80% of team using | Usage logs per agent |
| ROI Clarity | Measurable $/agent | Annual savings ÷ API cost |

### Consolidated Agents Should Deliver 2x ROI of Original

- **Workflow Orchestrator** (Design): Should save 3-4 hours/week (instead of 2.5)
- **Multi-Format Copy Generator** (Social): Should generate for 2 platforms simultaneously
- **Lead Scoring & Outreach Engine**: Single workflow vs. two separate processes

### Monthly Review Checklist

- [ ] Agent usage rate by department
- [ ] Error rate per agent (% needing human review)
- [ ] Time savings validation (spot-check 5 outputs)
- [ ] Skill utilization (are connected skills working?)
- [ ] Blockers or integration failures
- [ ] Recommendation: Refine, consolidate further, or retire agent

---

## Part 8: Risk Mitigation

### Consolidation Risks

**Risk:** Consolidated agents become too complex
- **Mitigation:** Keep modular design; agents should call sub-agents if needed
- **Example:** Workflow Orchestrator calls Design Brief Agent, then Variations Agent sequentially

**Risk:** Team resistance to change
- **Mitigation:** Phase 1 focuses on high-ROI consolidations only; gather feedback before Phase 2
- **Training:** 1-hour session per department on new agent workflows

**Risk:** Skills dependency (if skill becomes unavailable)
- **Mitigation:** Build fallback prompts for each agent
- **Example:** If `adobe-create-social-variations` unavailable, use generic Claude resizing

### Integration Risks

**Risk:** HubSpot, accounting, ticket system APIs change
- **Mitigation:** Version agents with fallback logic
- **Monitoring:** Weekly integration health checks

**Risk:** Custom skills take longer to build than expected
- **Mitigation:** Prioritize ✓ Available skills in Phase 1
- **Phased rollout:** Don't block agents on custom skill availability

---

## Part 9: Immediate Action Items (Next 2 Weeks)

1. [ ] **Audit current agent performance**
   - Which agents are most used?
   - Which have highest error rates?
   - Which are completely unused?

2. [ ] **Validate skill availability**
   - Test each recommended skill integration
   - Document any skill gaps
   - Prioritize building vs. waiting for new skills

3. [ ] **Get team feedback**
   - Consolidation might combine functions your team doesn't want combined
   - Host 30-min sync with each department lead
   - Adjust plan based on feedback

4. [ ] **Build first Phase 1 agent**
   - Start with Workflow Orchestrator (highest complexity but high ROI)
   - Document patterns for other consolidated agents
   - Share proof-of-concept with team

5. [ ] **Create agent specification templates**
   - Standardize how agents are documented
   - Include: Trigger, Input, Process, Output, Skills, Error Handling
   - Ensures consistency across all 41 agents

6. [ ] **Set up monitoring dashboard**
   - Track usage, error rates, time savings
   - Monthly review meetings
   - Automated alerts for integration failures

---

## Part 10: Consolidation Details (For Engineering)

### Example: Design Workflow Orchestrator

```
TRIGGER: Design approved in Figma/Adobe Cloud

INPUT:
- Design file (SVG/PNG)
- Project name + brand
- Platform destinations (Instagram, LinkedIn, Facebook, Web, Print)

PROCESS:
1. Auto-generate brief
   - Extract design elements
   - Create design constraints document
   - Pull brand guidelines alignment
   
2. Auto-generate variations
   - Resize for all platforms
   - Maintain hierarchy
   - Export in correct formats
   
3. Auto-generate mockups
   - Create 3D mockups (phone, desktop, billboard)
   - Light/dark variants
   
4. Quality check
   - Brand consistency validation
   - File naming conventions
   - Asset organization

OUTPUT:
- Design brief (Airtable record)
- Variation files (AWS S3 or local)
- Mockup renderings
- Success log

SKILLS USED:
- adobe-design-from-template (if template variation needed)
- adobe-create-social-variations (platform resizing)
- adobe-resize-photos-and-videos (video variation)
- design:design-system (brand checking)

ERROR HANDLING:
- If Adobe API fails: Fall back to generic Claude image resizing
- If brand check fails: Flag for human review before export
- If file format unsupported: Convert via ImageMagick + notify
```

---

## Summary: 45 Agents → 41 Agents

**Removed (3):**
1. Media Buying - Campaign ROI Analytics (subsumed in Budget Allocator)
2. Social Media - Content Calendar Balancer (subsumed in Balance & Scheduling)
3. Lead Gen - SMS Reminder (deprioritized to Phase 3, low ROI relative to email)

**Consolidated (12 agents into 6 consolidated agents):**
1. Design: Brief + Variations + Mockups → Workflow Orchestrator
2. Social: Content Creator + Video Captions → Multi-Format Copy
3. Lead Gen: Scorer + Email → Scoring & Outreach Engine
4. Media Buying: Bid + Creative + Audience → Performance Optimizer
5. Marketing: Calendar + Blog Outliner → Production Pipeline
6. Sales: CRM Populate + Outreach → Workflow Automation
7. Management: Meeting Prep + Status Reports → Communication Orchestrator

**Added (3):**
1. Design Trend Monitor (strategic competitive intelligence)
2. Social Metrics Analyzer (data-driven optimization)
3. Media Buying Audience Expansion Engine (scale winners)

**Total: 45 → 41 agents**
**Annual time savings potential: 949 hours → ~1050 hours** (new agents are more efficient)

---

## Next Steps

1. Review this plan with your team (all departments)
2. Validate skill availability + integrations
3. Build Phase 1 agents (start with Design Workflow Orchestrator)
4. Set up measurement dashboard
5. Monthly refinement cycle

Ready to implement?
