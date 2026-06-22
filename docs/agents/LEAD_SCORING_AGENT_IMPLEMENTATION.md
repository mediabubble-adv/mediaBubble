# Lead Scoring & Outreach Engine — Implementation Guide

**Phase 1 Agent #1 (Week 1, Day 1)**

---

## Overview

This agent combines two functions into one seamless workflow:

1. **Lead Scoring:** Evaluate lead quality against ICP (Ideal Customer Profile)
2. **Personalized Outreach:** Research prospect + generate email

**Input:** Lead data (name, company, role, source, budget signals, timeframe)  
**Output:** Scored lead + routed to correct bucket + personalized email draft + HubSpot contact

**Time savings:** 30 min/lead × 50+ leads/month = 25+ hours/month = 300 hours/year

---

## Architecture

```
Lead Input (Form/API/Manual)
    ↓
1. Extract Lead Data
    ├─ Name, email, phone
    ├─ Company, industry, size
    ├─ Role, seniority
    ├─ Budget signals
    └─ Timeframe indicators
    ↓
2. Score Against ICP
    ├─ Company fit (size, industry, revenue)
    ├─ Role fit (decision maker vs. influencer)
    ├─ Budget fit (have budget signals?)
    ├─ Timeline fit (immediate vs. future?)
    └─ Score: 0-100
    ↓
3. Route Lead
    ├─ >85: Hot → Sales immediately
    ├─ 60-85: Warm → Nurture sequence
    ├─ 30-59: Cool → Long-term drip
    └─ <30: Archive
    ↓
4. Research Prospect
    ├─ Company (size, industry, funding, recent news)
    ├─ Role (typical responsibilities, challenges)
    └─ Recent signals (job change, company updates)
    ↓
5. Generate Email
    ├─ Personalization (company-specific or role-specific)
    ├─ Value prop (tailored to their likely needs)
    ├─ 3-5 variations
    ├─ CTA (clear ask)
    └─ Subject line options
    ↓
6. Create HubSpot Contact
    ├─ Contact record
    ├─ Company association
    ├─ Lead score in CRM
    ├─ Email draft attached
    └─ Activity logged
    ↓
Output: Lead Scored + Routed + Email Ready + Contact Created
```

---

## Phase 1: Lead Scoring

### Step 1: Define ICP Scoring Rules

**Company Fit (0-30 points)**

```
Company Size:
  - 10-100 employees: +10 (sweet spot)
  - 100-1000: +8
  - 1000+: +5
  - <10: +2

Industry (if applicable):
  - Target industry: +10
  - Adjacent industry: +5
  - Other: +0

Revenue Signals:
  - Recent funding: +5
  - Recent hiring: +5
  - IPO/acquisition signal: +5
```

**Role Fit (0-30 points)**

```
Seniority:
  - C-level (CEO, CMO, CTO): +15
  - Director/VP: +12
  - Manager: +8
  - Individual Contributor: +3
  - Other: +0

Decision-Making Authority:
  - Budget owner: +10
  - Technical decision maker: +5
  - Influencer (no budget): +3

Role Relevance:
  - Perfect match: +5
  - Adjacent: +2
  - Unknown: +0
```

**Budget Signals (0-20 points)**

```
Explicit Budget Mentioned:
  - Yes, with amount: +20
  - Yes, no amount: +15
  - No mention: +0

Budget Timeline:
  - This quarter: +10
  - This year: +5
  - Unknown: +0
```

**Timeline/Urgency (0-20 points)**

```
Timeline Mentioned:
  - Immediate need (this month): +20
  - Near-term (3 months): +15
  - Future (6+ months): +5
  - Not mentioned: +0

Buying Signals:
  - Actively evaluating: +10
  - Researching: +5
  - Just exploring: +0
```

**Source Quality (0-Adjustment)**

```
Lead Source Quality Baseline:
  - Referral: Start at +10 (high trust)
  - Inbound: Start at +0
  - Outbound: Start at -5 (cold)
  - Paid ads: Start at -5
```

**Final Score Calculation:**

```
Total Score = Company Fit + Role Fit + Budget Signals + Timeline + Source Adjustment

Scoring Buckets:
  - 85-100: Hot Lead
  - 60-84: Warm Lead
  - 30-59: Cool Lead
  - 0-29: Archive/Maybe Later
```

### Step 2: Implement Scoring Logic

**Pseudocode:**

```python
def score_lead(lead_data, icp):
    """
    Score a lead against ICP.

    Args:
        lead_data: {name, company, role, budget, timeline, source}
        icp: {target_size, target_industries, decision_makers, budget_avg}

    Returns:
        {score: 0-100, category: 'Hot/Warm/Cool/Archive', reasoning: str}
    """

    score = 0
    reasoning = []

    # Company Fit (0-30)
    if lead_data['company_size'] in ['10-100', '100-1000']:
        score += 10
        reasoning.append(f"Company size: {lead_data['company_size']} (optimal)")

    if lead_data['industry'] in icp['target_industries']:
        score += 10
        reasoning.append(f"Target industry: {lead_data['industry']}")

    if lead_data.get('recent_funding') or lead_data.get('recent_hiring'):
        score += 5
        reasoning.append("Growth signals detected")

    # Role Fit (0-30)
    if lead_data['role'] in icp['decision_makers']:
        score += 15
        reasoning.append(f"Decision maker role: {lead_data['role']}")
    elif lead_data['seniority'] == 'Director/VP':
        score += 8
        reasoning.append("Leadership role")

    # Budget Signals (0-20)
    if lead_data.get('budget_mentioned'):
        score += 15 if lead_data.get('budget_amount') else 12
        reasoning.append("Budget identified")

    if lead_data.get('budget_timeline') == 'This quarter':
        score += 10
        reasoning.append("Immediate budget timeline")

    # Timeline/Urgency (0-20)
    if lead_data.get('urgency') == 'High':
        score += 20
        reasoning.append("High urgency signals")
    elif lead_data.get('urgency') == 'Medium':
        score += 10
        reasoning.append("Medium urgency signals")

    # Source adjustment
    if lead_data['source'] == 'Referral':
        score += 10
        reasoning.append("Referral source (high trust)")
    elif lead_data['source'] == 'Outbound':
        score -= 5
        reasoning.append("Cold outreach (discount 5 points)")

    # Categorize
    if score >= 85:
        category = 'Hot'
    elif score >= 60:
        category = 'Warm'
    elif score >= 30:
        category = 'Cool'
    else:
        category = 'Archive'

    return {
        'score': score,
        'category': category,
        'reasoning': ' | '.join(reasoning),
        'recommended_action': route_lead(category)
    }

def route_lead(category):
    """Route lead based on score category."""
    routing = {
        'Hot': {'action': 'Send to Sales Now', 'timing': '<1 hour'},
        'Warm': {'action': 'Nurture Sequence', 'timing': 'Week 1'},
        'Cool': {'action': 'Long-term Drip', 'timing': 'Month 1'},
        'Archive': {'action': 'Store for Later', 'timing': 'Revisit in 6mo'}
    }
    return routing[category]
```

### Step 3: Test Scoring with Sample Leads

**Test Case 1: Hot Lead**

```
Input:
  - Name: Sarah Chen
  - Company: TechCorp Inc (500 employees, Series B funded)
  - Role: CMO (Chief Marketing Officer)
  - Budget: "We have $50k allocated this quarter"
  - Timeline: "Need to start in 30 days"
  - Source: Referral from existing client

Expected Output:
  - Score: 92 (Company +10, Role +15, Budget +20, Timeline +20, Source +10, Adjustment -3)
  - Category: Hot
  - Action: Send to Sales immediately
  - Routing: Direct to Sarah's assigned AE
```

**Test Case 2: Warm Lead**

```
Input:
  - Name: James Rodriguez
  - Company: MidCorp LLC (80 employees, bootstrap)
  - Role: Director of Marketing
  - Budget: Not mentioned
  - Timeline: "We're evaluating options for Q4"
  - Source: Inbound from website

Expected Output:
  - Score: 68 (Company +8, Role +12, Budget +0, Timeline +8, Source +10)
  - Category: Warm
  - Action: Add to nurture sequence
  - Routing: Email sequence, 48-hour follow-up
```

**Test Case 3: Cool Lead**

```
Input:
  - Name: Alex Johnson
  - Company: StartupXYZ (5 employees, unfunded)
  - Role: Founder
  - Budget: "Don't have budget now"
  - Timeline: "Maybe next year"
  - Source: Outbound email

Expected Output:
  - Score: 35 (Company +2, Role +15, Budget +0, Timeline +5, Source -5, Adjustment -5 for bootstrap)
  - Category: Cool
  - Action: Long-term drip campaign
  - Routing: Automated monthly email, revisit in 6 months
```

---

## Phase 2: Prospect Research

### Step 1: Research Questions

For each lead, answer:

**Company Research:**

1. What's the company size and growth trajectory?
2. What industry are they in?
3. Are there recent funding announcements or hiring?
4. What are their main products/services?
5. Who are their likely competitors?

**Role Research:**

1. What does this role typically own (budget, strategy, execution)?
2. What are the common pain points for this role?
3. Is this a decision maker or influencer?
4. What's their likely buying authority?

**Personalization Hooks:**

1. What's a recent company announcement we can reference?
2. What challenge does their industry typically face?
3. How does our solution map to their likely needs?

### Step 2: Research Sources (In Order of Quality)

**Primary Research (Best):**

1. LinkedIn company page → Growth signals, recent hires, employee count
2. Company website → About section, customer logos, blog posts
3. LinkedIn profile → Role history, connections, recent activity
4. Recent news → Funding, acquisitions, expansion announcements

**Secondary Research (Good):**

1. Crunchbase → Funding history, company metrics
2. Hunter.io → Email verification, company structure
3. Apollo.io → Enrich company data
4. ZoomInfo → Company intelligence

**Tertiary Research (Fallback):**

1. Google search → Recent news, awards, announcements
2. Twitter/LinkedIn search → What's the company talking about?

### Step 3: Extract Personalization Angle

**Personalization Framework:**

```
IF company_has_recent_funding:
    angle = "Congratulations on your funding! We help companies like yours scale their [function]"

ELIF company_expanding_to_new_market:
    angle = "Saw you just expanded to [market]. We help companies in that space [specific value]"

ELIF role_has_common_challenge:
    angle = "[Role title]s at [industry] often struggle with [pain point]. Here's how we help..."

ELIF company_in_target_industry:
    angle = "We specialize in helping [industry] companies with [specific outcome]"

ELSE:
    angle = "We help companies like yours improve [generic value prop]"
```

---

## Phase 3: Email Generation

### Step 1: Email Template Structure

**Subject Lines (Test A/B):**

```
Option 1 (Curiosity): "Quick question on [company name]'s [recent announcement]?"
Option 2 (Benefit): "[Specific outcome] for [role name]s at [industry]?"
Option 3 (Personal): "Hey [first name], [specific reference]"
```

**Email Body:**

```
Hi [first_name],

[PERSONALIZATION - 1-2 sentences]
"Saw you just [company update]..." OR "Quick note on [specific challenge in their industry]..."

[VALUE PROP - 1 sentence]
"We help [target audience] [specific outcome] by [key differentiator]."

[SOCIAL PROOF - Optional, 1 sentence]
"Companies like [similar company] use us to [outcome]."

[SPECIFIC CTA - 1 sentence]
"Quick question: how are you currently handling [relevant topic]?"

[CLOSE - 1 sentence]
"Would love to chat for 15 min — what's your availability next week?"

Thanks,
[Name]
[Title]
[Company]
[Phone]
```

### Step 2: Personalization Variables

**Company-Level:**

- Company name (for reference)
- Recent funding/hiring (credibility)
- Industry (for pain point relevance)
- Company size (for comparison to similar companies)

**Role-Level:**

- Role title (for relevance)
- Seniority (for tone adjustment)
- Common pain points (for value prop)

**Relationship-Level:**

- Source (adjust opening tone)
- Budget signals (adjust urgency)
- Timeline (adjust CTA)

### Step 3: Generate Variations

For each lead, create 3-5 email variations:

**Variation 1: Personalized Angle**

- Uses specific company signal (funding, news, expansion)
- Highest relevance but requires research

**Variation 2: Role-Based**

- Focuses on common pain points for their role
- Good if no company signal found

**Variation 3: Industry-Based**

- Focuses on industry trends/challenges
- Fallback if no company/role signal found

**Variation 4: Curiosity-Based**

- Asks genuine question about their approach
- Good for initiating dialogue

**Variation 5: Direct Ask**

- Clear value prop + direct ask for meeting
- Good if budget signals present

---

## Phase 4: HubSpot Integration

### Step 1: Contact Creation Logic

```python
def create_hubspot_contact(lead_data, email_draft, score_result):
    """
    Create contact in HubSpot with full context.
    """

    hubspot_contact = {
        # Core contact info
        'firstname': lead_data['first_name'],
        'lastname': lead_data['last_name'],
        'email': lead_data['email'],
        'phone': lead_data.get('phone', ''),

        # Company info
        'company': lead_data['company_name'],
        'jobtitle': lead_data['role'],

        # Lead scoring
        'hs_lead_status': score_result['category'],  # Hot, Warm, Cool, Archive
        'hubspotscore': score_result['score'],
        'lead_source': lead_data['source'],

        # Notes
        'notes': score_result['reasoning'],

        # Custom fields
        'company_size': lead_data['company_size'],
        'industry': lead_data['industry'],
        'budget_signals': lead_data.get('budget_mentioned', False),
        'timeline_urgency': lead_data.get('urgency', 'Unknown'),
        'personalization_angle': email_draft['angle'],

        # Outreach prep
        'email_draft_sent': False,
        'outreach_ready': True,
        'recommended_email_variation': email_draft['best_variation']
    }

    # Create contact via HubSpot API
    response = hubspot_api.create_contact(hubspot_contact)

    return response
```

### Step 2: Activity Logging

```python
def log_activity(hubspot_contact_id, lead_data, score_result, email_draft):
    """Log the scoring and research activity."""

    activity = {
        'contact_id': hubspot_contact_id,
        'activity_type': 'Lead Scoring & Outreach Prep',
        'timestamp': datetime.now(),
        'details': {
            'score': score_result['score'],
            'category': score_result['category'],
            'reasoning': score_result['reasoning'],
            'email_variations_created': len(email_draft['variations']),
            'personalization_angle': email_draft['angle'],
            'recommended_action': score_result['recommended_action']
        }
    }

    hubspot_api.log_activity(activity)
```

### Step 3: Routing & Next Step Assignment

```python
def assign_next_steps(contact_id, score_result):
    """Assign next steps based on lead category."""

    routing = {
        'Hot': {
            'assigned_to': 'sales_team',
            'action': 'Send personalized email + call within 1 hour',
            'follow_up': 'If no response in 48h, phone call'
        },
        'Warm': {
            'assigned_to': 'automation',
            'action': 'Send personalized email + add to nurture sequence',
            'follow_up': '48 hour follow-up email'
        },
        'Cool': {
            'assigned_to': 'automation',
            'action': 'Add to long-term drip campaign',
            'follow_up': 'Monthly emails, revisit in 6 months'
        },
        'Archive': {
            'assigned_to': 'crm',
            'action': 'Archive for later',
            'follow_up': 'Quarterly review'
        }
    }

    next_steps = routing[score_result['category']]
    hubspot_api.assign_next_steps(contact_id, next_steps)
```

---

## Full Workflow: End-to-End Example

**Input:** New lead from website form

```json
{
  "first_name": "Sarah",
  "last_name": "Chen",
  "email": "sarah@techcorp.com",
  "company_name": "TechCorp Inc",
  "role": "Chief Marketing Officer",
  "company_size": "500",
  "industry": "B2B SaaS",
  "budget_mentioned": true,
  "budget_amount": 50000,
  "budget_timeline": "Q3",
  "urgency": "High",
  "source": "Referral - Alex Johnson"
}
```

**Process:**

1. **Score Lead**
   - Company: +10 (500 employees, right size)
   - Role: +15 (CMO, decision maker)
   - Budget: +20 (explicit amount, this quarter)
   - Timeline: +20 (immediate)
   - Source: +10 (referral)
   - **Total: 95 (Hot Lead)**

2. **Research Prospect**
   - TechCorp just closed Series B funding ($25M)
   - Expanding into EU market
   - Sarah joined 6 months ago from competitor
   - **Personalization angle:** "Congrats on the Series B + EU expansion"

3. **Generate Email**
   - **Subject:** "Sarah, congrats on TechCorp's Series B!"
   - **Body:**

     ```
     Hi Sarah,

     Saw TechCorp just closed a Series B – congrats!
     We help B2B SaaS companies scale their marketing
     efficiency during growth phases like yours.

     Quick question: how are you approaching
     attribution across your new EU markets?

     Would love to chat for 15 min next week.

     Best,
     [Sales rep]
     ```

4. **Create HubSpot Contact**
   - Contact created with score: 95
   - Category: Hot Lead
   - Email draft attached
   - Activity logged

5. **Route & Assign**
   - **Assignment:** Sales team (immediate)
   - **Action:** Send email + call within 1 hour
   - **Follow-up:** Phone if no response in 48 hours

**Output:** Sarah is now in HubSpot as a Hot lead, with personalized email ready to send, and sales has her on their radar for immediate outreach.

---

## Success Criteria

**Accuracy:**

- ✅ Lead scores correlate to actual conversion (Hot > Warm > Cool)
- ✅ <5% mislabeling (Hot lead that should be Warm, etc.)
- ✅ Personalization hooks match lead research

**Performance:**

- ✅ Score + research + email generation: <1 min per lead
- ✅ HubSpot contact creation: <5 sec
- ✅ Routing assignment: <2 sec

**Adoption:**

- ✅ Sales team uses 80%+ of email drafts (with minimal edits)
- ✅ Lead routing is accurate enough to trust
- ✅ Time saved: 30 min/lead validated

---

## Week 1 Execution

**Monday-Tuesday:**

- [ ] Define ICP scoring rules with Sales team
- [ ] Implement scoring logic
- [ ] Test with 10 historical leads
- [ ] Validate scores match actual outcomes

**Wednesday-Thursday:**

- [ ] Implement research + personalization logic
- [ ] Implement email generation
- [ ] Generate email variations for 10 test leads

**Friday:**

- [ ] Full end-to-end testing with 5 new real leads
- [ ] Sales team feedback on email quality + personalization
- [ ] Deploy to staging for Week 1 launch

---

## Next: Integration Validation & API Setup

(See INTEGRATION_VALIDATION_CHECKLIST.md)

---

**Status:** READY FOR CODING

Team: Assign this to engineering Week 1, Day 1.
Sales: Prepare ICP scoring criteria by Wednesday.
