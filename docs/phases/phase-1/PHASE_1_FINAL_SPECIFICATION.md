# Phase 1 Final Specification

**MediaBubble AI Agents — 9-Agent Foundation System**
**Weeks 1-4 Implementation**

---

## Phase 1 Agents (LOCKED)

### Agent 1: Lead Scoring & Outreach Engine

**Department:** Lead Generation  
**Consolidation:** Lead Auto-Scorer + Personalized Email Generator  
**Priority:** 🔴 P0 (Highest ROI, lowest risk)

**Trigger:** New lead imported (form, API, manual entry)

**Process:**

1. Extract lead data (company, role, budget signals, timeframe)
2. Score against ICP (Ideal Customer Profile)
3. Route based on score:
   - > 85: Hot lead → Sales immediately
   - 60-85: Warm lead → Nurture sequence
   - 30-59: Cool lead → Long-term drip
   - <30: Archive
4. Research prospect (company, role, recent news)
5. Generate personalized outreach email (2-3 variations)
6. Create HubSpot contact record with all data

**Output:**

- Lead scored + routed
- Contact created in HubSpot
- Email draft ready for sales approval
- Rationale documented

**Skills Used:**

- `sales:draft-outreach` ✅
- `sales:account-research` ✅

**Time Saved:**

- Per lead: 30 min (research + scoring + writing)
- Volume: 50+ leads/month
- Annual: 250+ hours

**Success Criteria:**

- <1 min per lead to score
- > 80% email personalization relevance
- > 70% sales team adoption by end of Week 1
- <5% error rate (bad routing)

**Start:** Week 1, Day 1

---

### Agent 2: Automated Code Review

**Department:** Development  
**Consolidation:** None (standalone)  
**Priority:** 🔴 P0 (Highest ROI, proven)

**Trigger:** PR submitted to GitHub/GitLab

**Process:**

1. Analyze code diff
2. Check for:
   - Security issues (SQL injection, XSS, auth bugs)
   - Performance issues (N+1 queries, memory leaks)
   - Code quality (naming, unused variables, style)
   - Test coverage (new code tested?)
3. Generate review comments with code snippets
4. Auto-approve if:
   - No critical issues
   - <5 medium issues
   - All tests passing
5. Flag for human review if issues found

**Output:**

- PR comments (auto-formatted)
- Approval or review request
- Summary of issues found

**Skills Used:**

- `engineering:code-review` ✅
- `engineering:testing-strategy` ✅

**Time Saved:**

- Per PR: 30 min (initial review)
- Volume: 10+ PRs/week
- Annual: 260+ hours

**Success Criteria:**

- <2 min initial review
- > 80% of issues caught before merge
- <10% false positives
- > 60% team adoption by end of Week 1

**Start:** Week 1, Day 2

---

### Agent 3: Sales Workflow Automation

**Department:** Sales  
**Consolidation:** CRM Auto-Populate + Personalized Outreach  
**Priority:** 🔴 P0 (Highest ROI, straightforward)

**Trigger:** Lead captured (form submission, email received, calendar event)

**Process:**

1. Parse source (form, email, calendar invite)
2. Extract contact info (name, company, email, phone, role)
3. Create/update HubSpot contact
4. Research prospect (company, industry, recent signals)
5. Generate personalized outreach (email or message)
6. Log activity with all context
7. Set follow-up reminder

**Output:**

- Contact created/updated in HubSpot
- Outreach email drafted (ready for sales to send)
- Activity logged with context
- Next step recommended

**Skills Used:**

- `sales:draft-outreach` ✅
- `sales:account-research` ✅

**Time Saved:**

- Per lead: 20 min (data entry + research + writing)
- Volume: 30-50 leads/week
- Annual: 520+ hours

**Success Criteria:**

- <3 min workflow per lead
- > 85% accurate contact data extraction
- Personalization >85% relevant
- Sales time on data entry: <5 min/week (vs. 2 hours current)

**Start:** Week 1, Day 1

---

### Agent 4: Multi-Format Copy Generator

**Department:** Social Media Marketing  
**Consolidation:** Social Content Creator Engine + Video Caption Generator  
**Priority:** 🟡 P1 (High ROI, skills ready)

**Trigger:**

- Content calendar day reached, OR
- Video/reel uploaded

**Process:**

1. Analyze content pillar/media type
2. Extract key message/benefit
3. Generate platform-specific copy:
   - LinkedIn: 130-180 chars (professional)
   - Instagram: 1-2 sentences (conversational)
   - Facebook: 2-3 sentences (personal)
   - TikTok: Hook (first 3 sec) + caption
4. Generate 3-5 variations per platform
5. Create relevant CTAs
6. Suggest hashtags (platform-specific)
7. Generate text overlays (for video)

**Output:**

- Copy options (platform-specific)
- Hashtag suggestions
- CTA options
- Text overlay specs (for designer)

**Skills Used:**

- `marketing:content-creation` ✅
- `marketing:draft-content` ✅

**Time Saved:**

- Per post: 30 min writing
- Volume: 5 posts/week
- Annual: 130+ hours

**Success Criteria:**

- <5 min generation per post
- > 80% on-brand copy (less revision needed)
- > 3 variations generated per post
- > 70% team adoption by end of Week 2

**Start:** Week 2, Day 1

---

### Agent 5: Campaign Performance Optimizer

**Department:** Media Buying  
**Consolidation:** Smart Bid Optimizer + Ad Creative Variations + Audience Refinement  
**Priority:** 🟡 P1 (High ROI, needs coordination)

**Note:** Consolidated but with phased rollout:

- **Week 3:** Bid optimization only (most mature)
- **Week 4:** Creative + audience recommendations (if time permits)

**Trigger:** Campaign running 7+ days (nightly run)

**Process:**

1. Pull last 7 days of campaign data (Google, Meta, LinkedIn)
2. Analyze performance:
   - CPC trends
   - CTR (up or down?)
   - Conversion rate by audience/placement
3. Calculate optimal bids:
   - Top performers: Bid up 10-15%
   - Middle: Maintain or +5%
   - Poor: Reduce 20-30% or pause
4. Generate bid recommendations
5. Create approval queue (human review before changes)
6. Track ROAS vs. target

**Output (Week 3):**

- Bid change recommendations
- Reasoning for each change
- Expected ROAS impact
- Approval queue

**Output (Week 4, if ready):**

- Creative test recommendations
- Audience refinement suggestions

**Skills Used:**

- `adspirer-ads-agent:campaign-performance` ✅

**Time Saved:**

- Per campaign: 30 min daily optimization
- Volume: 5-10 campaigns
- Annual: 260+ hours

**Success Criteria:**

- Week 3: Bid analysis <2 min, >80% accuracy
- ROAS improvement >10% within 30 days
- <5% incorrect bid changes
- > 60% media team adoption

**Start:** Week 3, Day 1

---

### Agent 6: Executive Communication Orchestrator

**Department:** Management/Operations  
**Consolidation:** Meeting Prep + Status Report Compiler  
**Priority:** 🟡 P1 (High ROI, but split for safety)

**Note:** Phased rollout to reduce complexity:

- **Week 2:** Status reports only (lower risk, clear ROI)
- **Week 4:** Meeting prep integration (if status reports working well)

**Trigger (Week 2):** Report due (weekly or monthly)

**Process (Status Reports):**

1. Pull project data (Asana/Monday/Jira)
2. Aggregate accomplishments this period
3. Identify in-progress items + blockers
4. Calculate on-time delivery rate
5. Categorize status (Green/Yellow/Red)
6. Generate narrative:
   - What shipped
   - What's in progress
   - Risks & blockers
   - Recommended actions
7. Format as email-ready summary

**Output (Week 2):**

- Status report (narrative format)
- Email-ready summary
- Metric highlights

**Trigger (Week 4, if ready):** Meeting scheduled 2 days prior

**Process (Meeting Prep):**

1. Pull meeting context (attendees, topic)
2. Gather supporting data
3. Generate agenda (by meeting type)
4. Prepare materials (customer: timeline + deliverables, team: sprint status)

**Output (Week 4):**

- Meeting agenda
- Supporting documents

**Skills Used:**

- `operations:status-report` ✅
- `engineering:standup` ✅

**Time Saved:**

- Status report: 1-2 hours → 20 min
- Meeting prep: 1-2 hours → 30 min
- Annual: 200+ hours

**Success Criteria:**

- Week 2: Report generation <20 min, >80% accuracy
- Week 4: Meeting prep <30 min, clear agendas
- > 75% team adoption

**Start (Week 2):** Day 1 (status reports)  
**Start (Week 4):** Day 1 (meeting prep, if ready)

---

### Agent 7: Design Workflow Orchestrator

**Department:** Design  
**Consolidation:** Design Brief Generator + Design Asset Variations Generator + Mockup Generator  
**Priority:** 🟡 P1 (High ROI, but phased for complexity)

**Note:** Phased rollout:

- **Week 2:** Variations generation (proven, lowest risk)
- **Week 3:** Brief generation (medium complexity)
- **Week 4:** Mockup generation (if time permits)

**Trigger:** Design approved in Adobe/Figma

**Process (Week 2 - Variations):**

1. Analyze approved design (Claude vision)
2. Extract design elements (colors, typography, layout)
3. Generate platform-specific variations:
   - Instagram (1080x1080, 1080x1350, 1080x608)
   - LinkedIn (1200x627, 1200x1500)
   - Facebook (1200x628, 1080x1350)
   - Print (300 DPI, CMYK)
   - Web (PNG/WebP, retina)
4. Apply responsive adjustments
5. Batch export with naming conventions

**Process (Week 3 - Brief, if on track):**

1. Extract design direction from brief
2. Pull brand guidelines
3. Generate design constraints document
4. Cross-reference with existing designs

**Process (Week 4 - Mockups, if on track):**

1. Generate 3D mockups (phone, desktop, billboard)
2. Light/dark variants
3. Add reflections + shadows

**Output (Week 2):**

- Variation files (all platforms)
- Ready-to-publish assets

**Output (Week 3):**

- Design brief document
- Constraints + references

**Output (Week 4):**

- Mockup renderings
- Multiple angles/contexts

**Skills Used:**

- `adobe-design-from-template` ✅
- `adobe-create-social-variations` ✅
- `adobe-resize-photos-and-videos` ✅

**Time Saved:**

- Variations: 2-4 hours → 15 min
- Brief: 30 min → 5 min
- Mockups: 1-2 hours → 15 min
- Annual: 200+ hours

**Success Criteria:**

- Week 2: Variations <20 min, zero manual resizing
- Week 3: Brief generation <10 min, >80% accuracy
- Week 4: Mockups <20 min, professional quality
- > 70% team adoption

**Start (Week 2):** Day 3

---

### Agent 8: Invoice Generator

**Department:** Finance  
**Consolidation:** None (standalone)  
**Priority:** 🟡 P1 (Highest ROI if integration works)

**Note:** Delayed to Week 2 pending QB/Xero integration validation

**Trigger:** Service delivered OR deal reached payment milestone

**Process:**

1. Extract invoice details:
   - Client name, address, PO
   - Service/deliverables
   - Hours worked (from timesheets) or fixed price
   - Tax calculation
2. Generate invoice:
   - Professional template
   - Company branding
   - Line items
   - Due date (30 days standard)
   - Payment instructions
3. Create PDF + email draft
4. Flag for review (1-2 min QA)
5. Sync with accounting software

**Output:**

- Invoice PDF
- Email draft
- Accounting record created

**Skills Used:**

- Custom accounting integration (QB/Xero API)

**Time Saved:**

- Per invoice: 1-2 hours → 5 min
- Volume: 3/week
- Annual: 156+ hours

**Success Criteria:**

- <5 min generation
- <2% error rate (typos, calculation)
- QB/Xero sync working reliably
- Finance adoption >90%

**Start:** Week 2, Day 3 (after integration validation)

---

### Agent 9: Content Production Pipeline

**Department:** Marketing  
**Consolidation:** Content Calendar Auto-Generator + Blog Post Auto-Outliner/Drafter  
**Priority:** 🟢 P2 (High ROI, but complexity warrants careful rollout)

**Note:** Phased rollout:

- **Week 3:** Calendar generation only (lower risk)
- **Week 4:** Blog drafting (if calendar generation working well)

**Trigger (Week 3):** Month start OR new calendar created

**Process (Calendar):**

1. Analyze past 3 months performance
2. Identify winning content types
3. Build balanced calendar:
   - Blog: 40% (SEO, authority)
   - Email: 30% (conversion)
   - Social: 20% (engagement)
   - Webinars/case studies: 10%
4. Assign content pillars
5. Add promotion dates
6. Export as Google Sheet + Asana

**Output (Week 3):**

- Content calendar (month view)
- Topic list + dates
- Content mix analysis

**Trigger (Week 4, if ready):** Blog topic selected

**Process (Blog Drafting):**

1. SEO research (top 10 ranking articles)
2. Identify gaps + long-tail keywords
3. Create outline:
   - Hook + problem statement
   - 3-5 main sections
   - Examples + case studies
   - CTA
4. Draft full blog (1500-2500 words)
5. Generate meta description
6. Suggest image brief

**Output (Week 4):**

- Blog draft (Google Doc)
- Meta description
- Image brief

**Skills Used:**

- `marketing:content-creation` ✅
- `marketing:campaign-plan` ✅

**Time Saved:**

- Calendar: 4 hours → 30 min
- Blog draft: 3-4 hours → 1 hour
- Annual: 200+ hours

**Success Criteria:**

- Week 3: Calendar <30 min, balanced mix
- Week 4: Draft <1 hour, SEO optimized
- > 80% of blogs need <2 hours editing (vs. 4+ current)
- > 70% team adoption

**Start (Week 3):** Day 2

---

## Phase 1 Timeline (Weeks 1-4)

### Week 1: Foundation (Days 1-5)

**Agents:** Lead Scoring & Outreach + Sales Workflow Automation + Code Review

| Day     | Agent                   | Focus                           | Deliverable                            |
| ------- | ----------------------- | ------------------------------- | -------------------------------------- |
| Mon-Tue | Lead Scoring & Outreach | Architecture + API setup        | Spec complete, HubSpot connected       |
| Tue-Wed | Sales Workflow          | Architecture + contact logic    | Contact creation + email draft working |
| Wed-Thu | Code Review             | GitHub integration + rule setup | PR analysis pipeline ready             |
| Thu-Fri | All 3                   | Testing + team training         | Staging tests with 5-10 real examples  |

**End of Week 1 Validation:**

- [ ] Lead scoring <1 min per lead
- [ ] Sales workflow creates contact + email in <3 min
- [ ] Code review <2 min per PR
- [ ] All 3 deployed to staging
- [ ] Team training complete

---

### Week 2: Expansion (Days 8-12)

**Agents:** Multi-Format Copy + Design Variations + Status Reports + Invoice Setup

| Day     | Agent             | Focus                          | Deliverable                                  |
| ------- | ----------------- | ------------------------------ | -------------------------------------------- |
| Mon     | Copy Generator    | Template setup + testing       | Platform-specific copy working               |
| Tue     | Design Variations | Adobe API + batch export       | Variations generated for 3 test designs      |
| Wed     | Status Reports    | Data aggregation + reporting   | Report generation <20 min                    |
| Thu-Fri | Invoice           | QB/Xero integration validation | If ready, staging test; if not, plan Phase 2 |

**End of Week 2 Validation:**

- [ ] Copy generation <5 min, >3 variations
- [ ] Design variations <20 min, ready-to-publish
- [ ] Status reports <20 min, email-ready
- [ ] Invoice integration validated (or moved to Phase 2)
- [ ] All 5-6 agents deployed to staging

---

### Week 3: Optimization (Days 15-19)

**Agents:** Campaign Performance (Bids) + Design Brief + Calendar Generation

| Day     | Agent              | Focus                             | Deliverable                 |
| ------- | ------------------ | --------------------------------- | --------------------------- |
| Mon-Tue | Campaign Optimizer | Google/Meta/LinkedIn API setup    | Bid analysis pipeline ready |
| Tue-Wed | Design Brief       | Design constraint extraction      | Brief generation <10 min    |
| Thu-Fri | Content Calendar   | Performance analysis + templating | Calendar generation <30 min |

**End of Week 3 Validation:**

- [ ] Campaign bid analysis <2 min
- [ ] Design brief <10 min, >80% accurate
- [ ] Content calendar <30 min, balanced
- [ ] All 8 agents ready

---

### Week 4: Polish & Launch (Days 22-26)

**Agents:** Blog Drafting + Meeting Prep + Final Testing

| Day     | Agent         | Focus                                 | Deliverable                           |
| ------- | ------------- | ------------------------------------- | ------------------------------------- |
| Mon     | Blog Drafting | SEO research + drafting pipeline      | Draft generation <1 hour, 1500+ words |
| Tue-Wed | Meeting Prep  | Data gathering + agenda templates     | Prep <30 min, stakeholder-specific    |
| Thu-Fri | All 9         | Production testing + monitoring setup | Ready to launch to production         |

**End of Week 4 Validation:**

- [ ] All 9 agents <10% error rate
- [ ] Team adoption >60% across departments
- [ ] Monitoring dashboard live
- [ ] Go/No-go decision for production launch

---

## Success Metrics (Week 4 End Gate)

| Metric               | Target                    | Owner       |
| -------------------- | ------------------------- | ----------- |
| Time saved per agent | >80% of baseline          | Finance     |
| Error rate           | <10%                      | Product     |
| Team adoption        | >60% across departments   | Product     |
| API reliability      | >99% uptime               | Engineering |
| Documentation        | Complete for all 9 agents | Engineering |

**Go/No-Go Decision:**

- **GO** if: All agents <10% error, >60% adoption, no critical issues
- **NO-GO** if: >2 agents >15% error or <40% adoption → fix in Phase 2
- **PARTIAL** if: 1 agent problematic → deploy 8, iterate on 1

---

## Critical Path Dependencies

### Must Complete Before Week 1:

- [ ] HubSpot API credentials + testing
- [ ] GitHub API setup
- [ ] Team access + permissions

### Must Complete Before Week 2:

- [ ] Adobe Creative Suite API access
- [ ] Marketing skills validation
- [ ] QB/Xero integration scoping (if doing invoices)

### Must Complete Before Week 3:

- [ ] Google Ads API access
- [ ] Meta Ads API access
- [ ] LinkedIn Ads API access

### Must Complete Before Week 4:

- [ ] Monitoring dashboard infrastructure
- [ ] Production deployment pipeline

---

## Risk Mitigation

### High Risk: Campaign Performance Optimizer

**Risk:** Multi-platform coordination complexity
**Mitigation:** Start with bid optimization only (Week 3), add creative/audience testing in Week 4 if on track

### High Risk: Design Workflow Orchestrator

**Risk:** Consolidating 3 complex workflows
**Mitigation:** Start with variations only (Week 2), add brief generation in Week 3, mockups in Week 4

### Medium Risk: Invoice Generator

**Risk:** QB/Xero integration not ready
**Mitigation:** Validate integration in Week 1; if not ready, move to Phase 2, replace with simpler agent

### Medium Risk: Content Production Pipeline

**Risk:** Blog drafting quality varies
**Mitigation:** Start with calendar only (Week 3), validate with 3 drafts in Week 4 before full rollout

---

## Phase 1 Rollout Decision

**Recommended Approach:**

1. **Launch 6 agents immediately** (Weeks 1-2):
   - Lead Scoring & Outreach
   - Sales Workflow Automation
   - Code Review
   - Multi-Format Copy
   - Design Variations
   - Status Reports

2. **Validate + launch 3 agents** (Weeks 3-4):
   - Campaign Performance (bids only)
   - Design Brief
   - Content Calendar

3. **Conditional launch**:
   - Invoice Generator (if QB/Xero ready)
   - Blog Drafting (if calendar generation working)
   - Meeting Prep (if status reports stable)

---

## What Happens in Phase 2?

**If Phase 1 succeeds** (all agents <10% error, >60% adoption):

- Week 5-8: Deploy 11 enhancement agents
- Custom skill development (hashtag optimizer, design trends, metrics analyzer)
- Expand existing agents (campaign creative testing, design mockups, blog drafting)

**If Phase 1 has issues** (1-2 agents >15% error):

- Week 5-6: Fix problematic agents
- Week 7-8: Deploy Phase 2 agents
- Adjust timeline as needed

---

**Status: LOCKED**

All 9 Phase 1 agents finalized. Ready to begin implementation Week 1.

Next step: Share this spec with all 9 department heads for feedback + kickoff meeting.
