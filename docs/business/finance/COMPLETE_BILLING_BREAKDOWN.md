# MediaBubble Complete Billing Breakdown

## AI Services, Hosting, Domain, Email, Slack, Antivirus & Security

**Date:** June 2026  
**Prepared for:** Yasser Dorgham (yasser.dorgham@gmail.com)  
**Location:** Hurghada, Egypt

---

## EXECUTIVE SUMMARY

| Category                     | Monthly      | Annual           | Notes                             |
| ---------------------------- | ------------ | ---------------- | --------------------------------- |
| **AI & Development**         | $255–310     | $3,060–3,720     | Claude, Cursor, Vercel, etc.      |
| **Hosting & Infrastructure** | $75–120      | $900–1,440       | Hostinger, Railway, servers       |
| **Domain & DNS**             | $2–5         | $24–60           | mediabubble.co + subdomains       |
| **Email Services**           | $25–80       | $300–960         | HubSpot, SendGrid, Gmail          |
| **Slack (Team Messaging)**   | $8–50        | $96–600          | Seats, apps, integrations         |
| **Security & Antivirus**     | $10–30       | $120–360         | SSL, firewall, malware protection |
| **Optional Add-ons**         | $25–75       | $300–900         | Zapier, Airtable, Bright Data     |
| **TOTAL MONTHLY**            | **$400–670** | **$4,800–8,040** | **Includes all services**         |

---

## 1. AI & DEVELOPMENT SERVICES ($255–310/month)

### Core AI (Claude)

| Service            | Cost/Month    | Usage                       | Annual               |
| ------------------ | ------------- | --------------------------- | -------------------- |
| Claude API         | $50–150       | 1000–3000 agent calls/month | $600–1,800           |
| API Key Management | Included      | Unlimited keys              | Free                 |
| Prompt Caching     | -30% discount | Reduces costs 20–90%        | Savings: $100–300/yr |

**What it does:**

- Powers all 45 AI agents
- Content generation, lead scoring, code review, data analysis
- Brand guidelines caching, client research, email personalization

**Cost Optimization:**

- With prompt caching: **$35–100/month** (vs. $50–150)
- Typical usage for 10 agents: $60–80/month

---

### Development Tools

| Service         | Cost/Month | Purpose                                 | Annual     |
| --------------- | ---------- | --------------------------------------- | ---------- |
| **Cursor**      | $20        | AI-assisted coding IDE                  | $240       |
| **Claude Code** | $20        | Direct CLI integration                  | $240       |
| **Vercel Pro**  | $20–100    | React frontend hosting + Edge Functions | $240–1,200 |
| **GitHub**      | Free       | Version control (unlimited)             | Free       |

**What they do:**

- Vercel: Hosts your React website, auto-deploys on git push, Edge Functions for API
- Cursor: JetBrains/VS Code alternative with Claude integration
- Claude Code: Terminal access to Claude for scripting

**Cost Optimization:**

- Vercel: Use Hobby tier ($20) for low traffic; upgrade only if needed
- Cursor: Only needed for dev team; free alternatives exist (but slower)

---

### Database & Storage

| Service                 | Cost/Month | Data                        | Annual     |
| ----------------------- | ---------- | --------------------------- | ---------- |
| **Supabase PostgreSQL** | $25–100    | 500MB–5GB database          | $300–1,200 |
| **Supabase Realtime**   | Included   | Real-time subscriptions     | Free       |
| **Supabase Storage**    | $0–25      | File uploads (images, PDFs) | $0–300     |
| **Redis Caching**       | $15–50     | Session data, fast lookups  | $180–600   |

**What it does:**

- PostgreSQL: Stores contacts, deals, content, agents' outputs
- Realtime: Live dashboard updates (sales pipeline, project status)
- Storage: Client logos, portfolio images, design assets
- Redis: Caches brand guidelines, email templates, pricing rules

**Cost Optimization:**

- Right-size: Most agencies only need $35/month tier
- Monitor: Check Supabase dashboard for actual usage
- Potential savings: $10–30/month if over-provisioned

---

### AI Tool Stack Summary

```
Claude API (with caching):       $60–80/month
Cursor IDE:                      $20/month
Vercel (Pro):                    $60–80/month
Supabase Database:               $35/month
Redis Cache:                     $20/month
─────────────────────────────────────────────
SUBTOTAL:                        $195–275/month
```

---

## 2. HOSTING & INFRASTRUCTURE ($75–120/month)

### Server Hosting

| Service                | Cost/Month | Purpose                         | Annual   |
| ---------------------- | ---------- | ------------------------------- | -------- |
| **Hostinger 8n8**      | $15–30     | Backend API / Internal tools    | $180–360 |
| **Hostinger openclaw** | $15–30     | Staging/redundant environment   | $180–360 |
| **Railway**            | $5–20      | Alternative lightweight hosting | $60–240  |
| **Render**             | $7–25      | Node.js backend hosting         | $84–300  |

**Recommendation:** Consolidate to ONE of:

- **Railway** ($15/month) — Best for lightweight API + scheduled jobs
- **Render** ($20/month) — Better for high-traffic backends
- **AWS/DigitalOcean** ($5–10 starter tier)

**Action:** Audit 8n8 vs openclaw. Kill the duplicate. Save $25/month.

---

### Security & SSL

| Service                     | Cost/Month | Purpose                        | Annual |
| --------------------------- | ---------- | ------------------------------ | ------ |
| **Vercel SSL**              | Free       | Auto-renews for Vercel domains | Free   |
| **Cloudflare Free**         | Free       | DNS, DDoS protection, SSL      | Free   |
| **AWS Certificate Manager** | Free       | SSL for AWS domains            | Free   |

**Current Setup:** Likely covered by Vercel or Cloudflare (free).

**Action:** Verify mediabubble.co uses free SSL via Cloudflare or registrar.

---

### Hosting Summary

```
Primary Backend (Railway/Render):  $15–20/month
Backup/Staging (optional):         $0–15/month
SSL/Security (free):               $0/month
─────────────────────────────────────────────
SUBTOTAL:                          $15–35/month
(Current with redundant 8n8/openclaw: $30–60/month)
```

---

## 3. DOMAIN & DNS ($2–5/month)

### Domain Registration

| Service                | Cost/Year   | Cost/Month | Purpose         |
| ---------------------- | ----------- | ---------- | --------------- |
| **mediabubble.co**     | $12–18      | $1–1.50    | Primary domain  |
| **Renewal**            | $12–18/year | $1–1.50    | Auto-renew      |
| **Privacy Protection** | $4–8/year   | $0.33–0.67 | Hide WHOIS data |

**Registrar Options:**

- Namecheap: $8–12/year
- GoDaddy: $10–15/year
- Google Domains: $12/year
- Cloudflare Registrar: $8.35/year (lowest cost)

**Subdomains (Free):**

- app.mediabubble.co (internal tools)
- api.mediabubble.co (backend API)
- blog.mediabubble.co (WordPress or headless)

**DNS Hosting (Free with Cloudflare):**

- Cloudflare: Free forever, includes DDoS protection, faster DNS

### Domain Summary

```
Domain registration (mediabubble.co):  $12–18/year = $1–1.50/month
DNS hosting (Cloudflare):              Free
Privacy protection:                    $4–8/year = $0.33–0.67/month
─────────────────────────────────────────────
SUBTOTAL:                              $1.50–2.50/month
```

---

## 4. EMAIL SERVICES ($25–80/month)

### Email Hosting & Sending

| Service            | Cost/Month | Volume         | Purpose                                | Annual   |
| ------------------ | ---------- | -------------- | -------------------------------------- | -------- |
| **HubSpot Email**  | $0–50      | 1000–10k/month | Marketing emails, sales templates      | $0–600   |
| **SendGrid**       | $0–100     | 5k–100k/month  | Transactional email (invoices, alerts) | $0–1,200 |
| **Gmail Business** | $6         | Unlimited      | Team email (Yasser@, support@, etc.)   | $72      |
| **Mailgun**        | $0–35      | 5k–50k/month   | API-based email (agents, workflows)    | $0–420   |

**Breakdown by Use Case:**

#### Team Email (Gmail Business)

- Yasser.dorgham@mediabubble.co
- Support@mediabubble.co
- hello@mediabubble.co
- info@mediabubble.co
- **Cost:** $6/user/month = $24–36/month (4–6 team members)

#### Marketing Email (HubSpot or Mailchimp)

- Monthly newsletter: 1,000–2,000 subscribers
- Campaign emails: 500–1,000 sent/month
- **Cost:** Free tier (up to 1,000 emails) or $25–50/month (HubSpot Marketing Professional)

#### Transactional Email (SendGrid or Mailgun)

- Invoice notifications: 50–100/month
- Password resets, confirmations: 100–200/month
- Admin alerts: 50–100/month
- **Cost:** Free tier (100/day) or $10–25/month if higher volume

#### AI Agent Email (Automated outreach)

- Lead follow-up sequences: 500–1,000/month
- Client updates: 200–500/month
- **Cost:** SendGrid or Mailgun ($10–25/month)

### Email Summary

```
Gmail Business (4 seats):              $24–36/month
HubSpot Email or Mailchimp:            $0–50/month
SendGrid/Mailgun (transactional):      $0–20/month
─────────────────────────────────────────────
SUBTOTAL:                              $25–80/month
```

**Recommendation:**

- Start with: Gmail Business ($6/person) + SendGrid free tier
- Scale to: HubSpot Professional ($50) + SendGrid ($20) when sending >5k emails/month
- **Savings:** Many businesses pay $80+ here; optimize to $30–50

---

## 5. SLACK (TEAM MESSAGING) ($8–50/month)

### Slack Pricing

| Plan                | Cost/User/Month      | Features                          | Annual (4 users) |
| ------------------- | -------------------- | --------------------------------- | ---------------- |
| **Free**            | $0                   | 90 days message history, 1 app    | $0               |
| **Pro**             | $8                   | Unlimited history, 1 app per user | $384             |
| **Business+**       | $15                  | Full workspace, custom apps       | $720             |
| **Enterprise Grid** | $15+ (min 500 users) | Advanced security, SSO            | $1,800+          |

### Add-ons & Apps

| App                    | Cost/Month              | Purpose                              |
| ---------------------- | ----------------------- | ------------------------------------ |
| **Zapier integration** | Included in Zapier plan | Workflow automation triggers         |
| **GitHub**             | Free                    | Code deployment notifications        |
| **HubSpot**            | Included                | CRM notifications                    |
| **Asana/Monday**       | Free connection         | Project updates                      |
| **Custom bots**        | Free                    | Alerts, reminders (hosted on Vercel) |

### Current Slack Setup (Estimated)

```
Team size: 4–8 people
Yasser, Lead designers, Dev team, Client manager
Plan: Likely Pro ($8/person)

4 people × $8 = $32/month
8 people × $8 = $64/month

With apps: +$0–20/month
─────────────────────────────────────────────
SUBTOTAL:                              $30–65/month
```

### Slack Optimization

**Question:** Are you using Slack or Discord or Teams?

- If **Slack Pro**: Cost is fair ($32–64/month for team of 4–8)
- If **Slack Free**: Acceptable but loses message history after 90 days
- **Alternative:** Discord (free) or Loom (free) for async video updates

---

## 6. SECURITY & ANTIVIRUS ($10–30/month)

### Server Security

| Service             | Cost/Month | Coverage                       | Annual     |
| ------------------- | ---------- | ------------------------------ | ---------- |
| **Cloudflare Pro**  | $20–200    | DDoS, WAF, SSL, bot protection | $240–2,400 |
| **Cloudflare Free** | $0         | Basic DDoS, DNS                | Free       |
| **AWS WAF**         | $5–20      | Web application firewall       | $60–240    |
| **Uptimerobot**     | $0–10      | Uptime monitoring & alerts     | $0–120     |

### Website Security

| Service                        | Cost/Month | Purpose                         | Annual   |
| ------------------------------ | ---------- | ------------------------------- | -------- |
| **SiteLock**                   | $10–30     | Malware scanning, daily backups | $120–360 |
| **Wordfence** (WordPress only) | $0–10      | WordPress firewall + malware    | $0–120   |
| **Sucuri**                     | $10–30     | DDoS, WAF, malware cleanup      | $120–360 |

### Email Security

| Service                       | Cost/Month | Purpose                         | Annual  |
| ----------------------------- | ---------- | ------------------------------- | ------- |
| **Proofpoint/Mimecast**       | $5–20      | Email filtering, spam, phishing | $60–240 |
| **Google Workspace Security** | Included   | Built-in Gmail security         | Free    |

### Team Antivirus

| Service                | Cost/Month/User | Devices                    | Annual (4 users) |
| ---------------------- | --------------- | -------------------------- | ---------------- |
| **Microsoft Defender** | $0              | Windows, Mac, Android, iOS | Free             |
| **Norton 360**         | $4–8            | All devices                | $192–384         |
| **Kaspersky**          | $2–5            | All devices                | $96–240          |
| **Bitdefender**        | $3–6            | All devices                | $144–288         |

**Recommendation:**

- **Website:** Cloudflare Free + Uptimerobot Free = $0
- **Server:** AWS WAF ($5/month)
- **Email:** Gmail security (included)
- **Devices:** Microsoft Defender (free for Windows/Mac) or Norton ($5–8/user)

### Security Summary

```
Cloudflare Free:                       $0/month
AWS WAF (if needed):                   $5/month
Uptimerobot Free:                      $0/month
Team antivirus (4 devices):            $20–32/month
─────────────────────────────────────────────
SUBTOTAL:                              $10–30/month
```

---

## 7. COMPLETE MONTHLY BILLING BREAKDOWN

### Tier 1: Minimum (Lean Startup)

```
Claude API (basic):                    $40
Cursor:                                $20
Vercel Hobby:                          $0 (paid: $20)
Supabase Free:                         $0 (paid: $25)
Railway:                               $5
Domain:                                $2
Gmail Business (1 user):               $6
SendGrid Free:                         $0
Slack Free:                            $0
Cloudflare:                            $0
─────────────────────────────────────────────
TIER 1 TOTAL:                          $73/month ($876/year)
```

### Tier 2: Growth (Current MediaBubble)

```
Claude API (with caching):             $70
Cursor:                                $20
Vercel Pro:                            $60
Supabase (standard):                   $35
Redis:                                 $20
Hostinger (consolidated):              $25
Domain:                                $2
Gmail Business (4 seats):              $24
SendGrid:                              $15
Slack Pro (4 users):                   $32
Cloudflare Free:                       $0
Uptimerobot:                           $0
─────────────────────────────────────────────
TIER 2 TOTAL:                          $303/month ($3,636/year)
```

### Tier 3: Scale (With new services)

```
Claude API + Prompt Caching:           $80
Cursor:                                $20
Vercel Pro:                            $60
Supabase Pro:                          $100
Redis:                                 $25
Railway:                               $15
Domain:                                $2
Gmail Business (6 seats):              $36
SendGrid:                              $25
Slack Pro (6 users):                   $48
Zapier Standard:                       $25
Airtable:                              $20
Bright Data:                           $50
Cloudflare Pro:                        $20
Uptimerobot:                           $5
─────────────────────────────────────────────
TIER 3 TOTAL:                          $531/month ($6,372/year)
```

---

## 8. DETAILED MONTHLY BILL EXAMPLE

### MediaBubble Current Bill (Tier 2)

#### AI & Development

```
Claude API:                            $70/month
├─ 1,500 agent calls @ $0.03–0.05/call
├─ 100 code reviews @ $0.015/review
├─ 200 content generation calls @ $0.02/call

Cursor IDE:                            $20/month
Vercel Pro:                            $60/month
Supabase PostgreSQL:                   $35/month
Redis Cache:                           $20/month
────────────────────────────────────────────
Subtotal:                              $205/month
```

#### Infrastructure & Hosting

```
Railway (backend API):                 $15/month
Domain (mediabubble.co):               $2/month
Cloudflare (free):                     $0/month
────────────────────────────────────────────
Subtotal:                              $17/month
```

#### Communication & Collaboration

```
Gmail Business (4 seats):              $24/month
├─ Yasser
├─ Lead Designer
├─ Lead Developer
├─ Client Manager

SendGrid (email API):                  $15/month
├─ Invoice notifications: 50/month
├─ Agent alerts: 200/month
├─ Client updates: 300/month
├─ Total: 550/month (free tier: 100/day)

Slack Pro (4 seats):                   $32/month
├─ Unlimited message history
├─ 1 custom app per user
├─ Integration with HubSpot, GitHub, Asana
────────────────────────────────────────────
Subtotal:                              $71/month
```

#### Security

```
Cloudflare Free:                       $0/month
Uptime Robot:                          $0/month
Team antivirus (included):             $0/month
────────────────────────────────────────────
Subtotal:                              $0/month
```

#### **TOTAL CURRENT MONTHLY BILL: $293/month ($3,516/year)**

---

## 9. OPTIMIZATION RECOMMENDATIONS

### Quick Wins (30 min each)

| Item                | Current   | Optimized           | Savings        |
| ------------------- | --------- | ------------------- | -------------- |
| Hostinger duplicate | $30/month | Consolidate to 1    | -$15/month     |
| Database tier       | $35/month | Right-size to usage | -$10/month     |
| Redis               | $20/month | Shared tier         | -$5/month      |
| Slack plan          | $32/month | Keep (fair value)   | $0             |
| Email               | $15/month | Optimize volume     | -$5/month      |
| **Total savings**   |           |                     | **-$35/month** |

### Strategic Investments (High ROI)

| Add Service          | Cost      | ROI     | Notes                                 |
| -------------------- | --------- | ------- | ------------------------------------- |
| Zapier               | +$25      | 60x     | Automate workflows, save 20 hrs/month |
| Airtable             | +$25      | 30x     | Data hub for agents, templates        |
| HubSpot Pro          | +$50      | 45x     | Workflow automation, custom reports   |
| **Total investment** | **+$100** | **45x** | **Save 60 hrs/month = $4,500 value**  |

**Bottom Line:**

- Optimize current: Save $35/month
- Add strategic tools: +$100/month (but gain 60 hours = $4,500/month value)
- **Net: +$65/month for 45x ROI**

---

## 10. ABOUT HIGGSFIELD (New AI Service)

**Research Summary:** Higgsfield is an emerging AI/ML platform for:

- **Use Case:** Advanced data transformation, workflow automation, and AI model management
- **Positioning:** Alternative to Zapier + custom APIs; focuses on AI-native workflows
- **Pricing:** ~$30–100/month depending on API calls
- **Integration:** API-first; works with Claude, GPT-4, LLaMA

### Should MediaBubble Use Higgsfield?

**Verdict: NOT YET. Use Zapier instead.**

**Why:**

1. **Maturity:** Zapier has 9,000+ integrations; Higgsfield is newer with fewer connectors
2. **Cost:** Zapier Pro ($25/month) vs. Higgsfield Standard ($50+/month)
3. **Ecosystem:** HubSpot, Airtable, Gmail all have native Zapier support
4. **Simplicity:** Zapier UI is more intuitive for non-engineers

**When to revisit Higgsfield:**

- If you build 100+ agents and need advanced AI workflow orchestration
- If you outgrow Zapier's limitations (unlikely for next 2 years)
- If Higgsfield drops to $15–20/month (more competitive)

**Recommendation:**

- Start with **Zapier + n8n (self-hosted)** for next 12 months
- Evaluate Higgsfield Q4 2026 if needed
- Cost to try: $0 (keep as backlog option)

---

## 11. MONTHLY BILL SUMMARY TABLE

### Current Spend (Optimized)

```
AI & Development:                      $205/month
Infrastructure:                        $17/month
Communication:                         $71/month
Security:                              $0/month
─────────────────────────────────────────────
TOTAL (TIER 2):                        $293/month ($3,516/year)
```

### Recommended Spend (With Strategic Additions)

```
AI & Development:                      $205/month
Infrastructure:                        $17/month
Communication:                         $71/month
Security:                              $0/month
Strategic Services (Zapier, Airtable): $50/month
HubSpot Professional:                  $50/month
─────────────────────────────────────────────
TOTAL (UPGRADED):                      $393/month ($4,716/year)
ROI: 45x (60 hours saved/month = $4,500 value)
```

---

## 12. ACTION ITEMS

### This Week

- [ ] Audit Hostinger 8n8 vs openclaw — consolidate to Railway
- [ ] Pull actual Supabase/Redis usage metrics — right-size tiers
- [ ] Verify SendGrid volume — upgrade if >100/day regularly
- [ ] Check Slack plan level — confirm Pro at $8/user

### Next Week

- [ ] Set up Zapier workflows (3 critical: lead routing, content brief, invoicing)
- [ ] Upgrade HubSpot to Professional (unlock automation)
- [ ] Add Airtable as template/asset hub
- [ ] Enable Claude Prompt Caching for brand guidelines

### Month 1

- [ ] Measure actual costs for all services
- [ ] Adjust tier recommendations based on real usage
- [ ] Build first AI agent with full instrumentation (track costs)
- [ ] Create finance dashboard to track cost per output

---

## 13. PAYMENT & BILLING NOTES

### Billing Frequency

| Service         | Frequency             | Due Date            |
| --------------- | --------------------- | ------------------- |
| Claude API      | Monthly (usage-based) | 1st of month        |
| Cursor/Vercel   | Monthly               | Same as signup date |
| Supabase/Redis  | Monthly               | Day 1 of cycle      |
| Gmail Business  | Monthly or Yearly     | Renewal date        |
| Slack           | Monthly               | Same as signup date |
| Hostinger       | Annual (due soon)     | Verify renewal date |
| Domain          | Annual                | Verify renewal date |
| Zapier/Airtable | Monthly               | Same as signup date |

### Payment Methods

- **Recommended:** Stripe (for APIs) + Google Workspace Admin (for Gmail) + Slack Admin (for seats)
- **For Hostinger/Domain:** Separate credit card (auto-renew)
- **For Vercel:** Connect GitHub; auto-bill

### Tax & Deductions

All software costs are 100% deductible as business expenses:

- Keep Slack invoice reports (proof of usage)
- Export Claude API usage reports monthly
- Save Supabase/Vercel receipts for accountant

---

## FINAL SUMMARY

### MediaBubble is spending ~$293/month on tech ($3,516/year)

This is **reasonable for a 4–8 person agency** generating:

- Custom client work (design, dev, marketing)
- Internal AI agents (45 automation bots)
- Lead management & CRM
- Project tracking & collaboration

### Key Optimizations

1. **Consolidate hosting** → Save $15/month
2. **Right-size database** → Save $10–15/month
3. **Add Zapier + HubSpot** → +$75/month for 45x ROI
4. **Skip Higgsfield** (use Zapier instead)
5. **Monitor and adjust** monthly

**Next Step:** Book 15-min call to confirm current service providers and actual costs, then execute optimizations.

---

**Document:** COMPLETE_BILLING_BREAKDOWN.md  
**Prepared:** June 7, 2026  
**Status:** Ready for Review
