# Phase 1 Training Materials

**Department-Specific Agent Usage Guides**

---

## LEAD GENERATION: Lead Scoring & Outreach Engine

### What It Does (30 sec elevator pitch)

You submit a lead (name, company, role, budget signals). The agent:

1. Scores the lead (0-100 scale)
2. Researches their company
3. Drafts 3-5 personalized emails
4. Creates HubSpot contact
5. Routes to appropriate bucket (Hot/Warm/Cool/Archive)

**Result:** 30 minutes of work → 1 minute, email ready to send

---

### How to Use It

**Step 1: Submit Lead Data**
Source can be:

- Form submission (web form auto-feeds)
- Email forward (with details)
- Manual entry (Slack command or form)

**Minimum data needed:**

- Name, email, company
- Role/title
- **Optional but recommended:**
  - Company size
  - Industry
  - Budget signals ("we have $50k budgeted")
  - Timeline ("need this month")
  - Source (referral, paid ad, organic)

**Step 2: Agent Processes (automatic)**

- Scores against MediaBubble ICP
- Researches company + role
- Generates personalized emails
- Creates HubSpot contact
- Logs activity

**Step 3: You Review & Send**

- Agent outputs email draft (review takes 30 sec)
- Minor edits if needed (add personal note, adjust tone)
- Send via HubSpot or email
- Mark as sent in system

**Step 4: Agent Auto-Routes**

- Hot leads → Sales immediately
- Warm leads → Nurture sequence (auto-triggered)
- Cool leads → Long-term drip (auto-triggered)
- Archive → Revisit in 6 months

---

### What to Expect

**Best Case (Good ICP match):**

- Score: 85-100 (Hot)
- Email: Highly personalized with company signal
- Time: 1-2 min review
- Action: Sales calls within 1 hour

**Good Case (Fair ICP match):**

- Score: 60-84 (Warm)
- Email: Role-based personalization
- Time: 2-3 min review (minor tweaks)
- Action: Nurture sequence auto-starts

**Average Case (Weak ICP match):**

- Score: 30-59 (Cool)
- Email: Generic or industry-based
- Time: 3-5 min review (significant edits if sending)
- Action: Long-term drip (monthly emails)

**Poor Case (Bad fit):**

- Score: 0-29 (Archive)
- Email: Generic
- Action: Auto-archived, revisit in 6 months

---

### Error Scenarios & Fixes

**Agent says "Score: 22 (Archive)" but you think it's Hot:**

- Check: Did you provide budget signals + timeline?
- Missing data = lower score
- Re-submit with complete data

**Email is too generic:**

- Check: Did company have recent news/updates?
- If not found automatically, add note: "Just closed Series B"
- Agent will re-research with hint

**Wrong company research:**

- Tell us in Slack: "Score #123 researched wrong company"
- We'll refine the research logic

**Email tone is off:**

- Edit before sending (agent provides variations to choose from)
- Give feedback: "Make more/less formal"
- We'll adjust for future leads

---

### Weekly Cadence

- **Monday morning:** Check queue of leads from weekend
- **Wednesday afternoon:** Scoring snapshot (how many Hot/Warm/Cool from this week?)
- **Friday:** Weekly feedback round (did emails convert? Any tweaks needed?)

---

## SALES: Sales Workflow Automation

### What It Does (30 sec)

You capture a lead (form, meeting, email). The agent:

1. Creates contact in HubSpot
2. Researches prospect company
3. Drafts personalized email
4. Logs activity with full context
5. Sets next step reminder

**Result:** 20 minutes of manual CRM entry + research → 3 minutes, contact ready

---

### How to Use It

**Data entry to avoid:**

- DON'T manually type contacts into HubSpot
- DON'T spend 15 min researching LinkedIn
- DON'T draft emails from scratch
- Agent does all of it

**What you DO:**

1. Lead comes in (form, inbound email, LinkedIn)
2. Forward/paste to agent input
3. Agent creates contact + email draft in HubSpot
4. You review email (takes 30 sec)
5. You send (or let automation send)

**Best practice:**

- Always include company name (so agent can research)
- If you know timeline/budget, add it ("needs this quarter, has $30k")
- If it's a referral, mention it ("ref'd by Sarah at TechCorp")

---

### What to Expect

**Perfect workflow:**

1. Lead fills form on website
2. Agent auto-populates HubSpot contact
3. Email draft appears in "Drafts" folder
4. You see notification: "New lead ready to contact: Sarah Chen, CMO at TechCorp"
5. Click "Send" or edit first

**Expected time savings:**

- Before: 20 min (data entry, research, draft email)
- After: 3 min (review + send)
- Per week: 6-8 leads × 17 min saved = 1.5-2 hours

---

### Troubleshooting

**Contact created but no email draft:**

- Check HubSpot (might be in company/contact creation queue)
- Refresh page
- If still missing, ping engineering

**Email too generic:**

- Agent couldn't find company research
- Check if company name was correct
- Add more context: "Series B company, 200 people, just hired marketing team"
- Agent will re-research

**Contact data wrong (name, email):**

- Agent extracted wrong info
- Tell us in Slack which lead #
- We'll refine extraction logic

---

### Weekly Sync

- **Monday 10am:** Workflow health check (any blockers?)
- **Friday 2pm:** Sales feedback (how are emails performing?)

---

## DEVELOPMENT: Automated Code Review

### What It Does (30 sec)

You submit PR to GitHub. The agent:

1. Analyzes code diff
2. Checks for security issues (SQL injection, XSS)
3. Checks performance (N+1 queries, memory leaks)
4. Validates style + naming conventions
5. Checks test coverage
6. Posts PR comments with specific fixes

**Result:** 30 min code review → 2 min initial review (human review still needed for logic)

---

### How to Use It

**Best practice:**

1. Create PR normally
2. Agent auto-comments within 30 sec
3. Review comments before merging
4. If agent found issues, fix them
5. If agent is wrong, add comment "disagree because..." and merge anyway

**Trust the agent on:**

- ✅ Security issues (always fix)
- ✅ Test coverage (require tests)
- ✅ Code style violations (should fix)
- ✅ Obvious bugs (unused variables, typos)

**Override the agent on:**

- ⚠️ Architecture decisions (it's automated, might miss context)
- ⚠️ Business logic (it can't understand intent)
- ⚠️ Refactor opportunities (might be lower priority)

---

### What to Expect

**Good PR (passes review):**

```
✅ Agent review:
- No security issues
- Tests added
- Follows style guide
```

- Auto-approved? NO (human merge still required)
- But: signals confidence ("likely safe to merge")

**Bad PR (needs fixes):**

```
⚠️ Agent review:
- SQL injection risk in query (line 42)
- Missing test for error case
- Variable 'x' should be 'userCount'
```

- Agent blocks? NO (you decide to merge anyway if you want)
- But: flags specific issues to fix

---

### Weekly Cadence

- **Daily:** Agent reviews all PRs automatically
- **Friday afternoon:** Review agent accuracy (any false positives/negatives?)

---

## DESIGN: Design Workflow Orchestrator

### What It Does (30 sec)

You approve a design. The agent:

1. Generates variations (Instagram, LinkedIn, Facebook, Print, Web)
2. Auto-resizes to correct dimensions
3. Exports ready-to-publish files
4. Extracts design brief + constraints
5. Creates 3D mockups (optional)

**Result:** 3-4 hours manual resizing → 15 min batch export

---

### How to Use It

**Step 1: Design is approved**

- Finalize design in Adobe/Figma
- Save as master file

**Step 2: Submit to agent**

- Tell agent: "Batch variations for this design"
- List platforms needed (Instagram, LinkedIn, etc.)
- Agent handles the rest

**Step 3: Review outputs**

- Check: Are dimensions correct?
- Check: Is hierarchy preserved?
- Check: Are file names correct?
- If all ✅: ready to publish

**Step 4: Publish**

- Download files from cloud
- Upload to each platform

---

### What to Expect

**Perfect output:**

- Instagram: 1080x1080, 1080x1350, 1080x608 ✅
- LinkedIn: 1200x627, 1200x1500 ✅
- Facebook: 1200x628, 1080x1350 ✅
- Print: 300 DPI, CMYK ✅
- Web: PNG + WebP, 2x/3x retina ✅
- All files named correctly ✅

**Most common issue:**

- Aspect ratio changes break hierarchy
- Tell us if output looks bad
- We'll adjust resizing algorithm

---

### Weekly Cadence

- **Daily:** Agent generates variations as designs are approved
- **Thursday afternoon:** Design feedback round (any output quality issues?)

---

## FINANCE: Invoice Generator

### What It Does (30 sec)

Service is delivered. The agent:

1. Pulls deal data (service, price, client)
2. Pulls timesheet data (hours worked)
3. Calculates tax, applies discounts
4. Generates professional invoice PDF
5. Creates email draft
6. Syncs with QuickBooks

**Result:** 1-2 hours manual invoice creation → 5 min review + send

---

### How to Use It

**Step 1: Service delivered**

- Timesheet is logged
- Deal is marked "Completed" in HubSpot

**Step 2: Agent auto-generates invoice**

- Pulls from HubSpot deal + timesheet
- Generates PDF in email-ready format
- Creates QB record

**Step 3: You review (5 min)**

- Check: Client name correct?
- Check: Services listed correctly?
- Check: Amount matches deal?
- Check: Tax calculated correctly?

**Step 4: Send + sync**

- Send email to client
- Agent syncs with QB automatically

---

### What to Expect

**Perfect invoice:**

- Client info: ✅
- Invoice items: ✅
- Amounts: ✅
- Tax: ✅
- Due date: ✅
- Professional formatting: ✅

**Most common issues:**

- Tax calculation wrong (verify QB settings)
- Invoice items don't match scope (make sure deal = services delivered)
- Client email wrong (verify HubSpot contact)

---

### Weekly Cadence

- **Daily:** Agent generates invoices as services are delivered
- **Friday 4pm:** Check QB sync is working

---

## MANAGEMENT: Executive Communication Orchestrator

### What It Does (30 sec)

Status report due. The agent:

1. Pulls project data from Asana/Jira
2. Aggregates accomplishments
3. Flags blockers + risks
4. Calculates on-time delivery rate
5. Generates report narrative

**Result:** 1.5 hours manual compilation → 20 min review + send

---

### How to Use It

**Step 1: Friday 3pm (for Monday report)**

- Trigger agent: "Generate status report"
- Agent pulls all project data

**Step 2: You review (20 min)**

- Does narrative match reality?
- Are blockers accurately described?
- Are metrics correct?

**Step 3: Send**

- Email to leadership
- Agent auto-formats for easy reading

---

### What to Expect

**Good report:**

- Accomplishments clear
- Blockers specific + actionable
- Metrics accurate
- Tone professional

**Most common issue:**

- Agent pulls Asana data but misses verbal updates
- Add note: "Also completed X (not in Asana)"
- Agent will incorporate next time

---

## MARKETING: Content Production Pipeline

### What It Does (30 sec)

Month starts. The agent:

1. Analyzes past 3 months performance
2. Identifies winning content types
3. Generates balanced content calendar
4. (Phase 2) Drafts SEO-optimized blog posts

**Result:** 4 hours manual calendar planning → 30 min review + customize

---

### How to Use It

**Step 1: Month start**

- Trigger: "Generate content calendar for [month]"
- Agent analyzes past performance

**Step 2: Review calendar**

- Does mix make sense? (40% blog, 30% email, 20% social, 10% webinars)
- Are topics relevant?
- Are dates realistic?

**Step 3: Customize**

- Swap topics if needed
- Add seasonal/promotional content
- Assign to team members

**Step 4: Use for monthly planning**

- Content dates locked
- Blog topics assigned
- Social pillars defined

---

### What to Expect

**Good calendar:**

- Balanced across content types
- Topics reflect past winners
- Dates are realistic
- Pillar variety is strong

**Most common tweaks:**

- Move webinar earlier (more lead-gen needed)
- Add product-focused content (sales push coming)
- Swap blog topics (based on market changes)

---

## SOCIAL MEDIA: Multi-Format Copy Generator

### What It Does (30 sec)

Content calendar day arrives. The agent:

1. Analyzes content pillar
2. Extracts key message
3. Generates platform-specific copy (LinkedIn, Instagram, TikTok)
4. Creates 3-5 variations
5. Suggests hashtags + CTAs

**Result:** 30 min copy writing → 5 min variation selection + send

---

### How to Use It

**Step 1: Content day**

- Agent sees calendar item due
- Agent generates 3-5 copy options per platform

**Step 2: You review**

- Pick best variation (or blend 2 options)
- Check: Brand voice matches?
- Check: CTA is clear?

**Step 3: Post**

- Copy is ready to publish
- Just paste + hit post

---

### What to Expect

**LinkedIn variation:**

- Professional tone ✅
- Value prop clear ✅
- CTA appropriate ✅
- 130-180 chars ✅

**Instagram variation:**

- Conversational tone ✅
- Hook strong ✅
- 1-2 sentences ✅

**TikTok variation:**

- Hook in first 3 sec ✅
- Caption short + punchy ✅

**Most common issue:**

- Agent doesn't know latest brand update
- Add note: "We just announced X, work that in"
- Agent will regen if you resubmit

---

## CAMPAIGN OPTIMIZER: Smart Bid & Creative Manager

### What It Does (30 sec)

Campaign running 7+ days. The agent (nightly):

1. Analyzes ad performance (bids, CTR, ROAS)
2. Identifies top/bottom performers
3. Recommends bid changes
4. Suggests creative tests
5. Recommends audience refinements

**Result:** 30 min daily optimization → 2 min review of recommendations

---

### How to Use It

**Step 1: Agent analyzes (automatic, nightly)**

- Pulls data from Google/Meta/LinkedIn
- Analyzes performance trends
- Generates recommendations

**Step 2: You review recommendations (morning)**

- Bid up winners? ✅ (likely)
- Bid down losers? ✅ (likely)
- Test new creative? ⚠️ (review first)
- Expand winning audience? ⚠️ (review first)

**Step 3: Approve changes**

- Click "Apply recommendations"
- Or cherry-pick specific changes

**Step 4: Monitor impact**

- Next day: New data comes in
- Agent tracks ROAS improvement

---

### What to Expect

**Good recommendation:**

- Top performer getting bid increase (10-15%)
- ROAS forecasted to improve
- Recommendation aligns with campaign goal

**Risky recommendation:**

- New audience expansion (always test)
- Creative refresh (test with small budget)
- Budget shift between campaigns (verify won't hurt others)

---

---

## Common Questions Across All Agents

**Q: What if the agent is wrong?**
A: It's optional. You still make final call. Tell us feedback and we'll refine.

**Q: Can I edit agent outputs?**
A: YES! Please do. Agent provides starting point, you finish.

**Q: How long does agent take?**
A: Most agents: <2 min per output (except designs which batch).

**Q: What if I don't trust the agent?**
A: Test on non-critical work first. Build confidence gradually.

**Q: How do I give feedback?**
A: Slack: #phase-1-agents channel. Or direct message engineering.

**Q: Will the agent get better?**
A: YES. Every feedback loop improves accuracy for next person.

---

## Weekly Sync Format

**Every Thursday 2pm (15 min):**

1. **Quick wins:** What worked great this week?
2. **Issues:** What broke or surprised you?
3. **Feedback:** How should we refine this agent?
4. **Metrics:** How much time did you save?

---

**Print this guide. Keep it handy. Use it as reference first week.**

Questions? Slack #phase-1-agents or ping engineering.
