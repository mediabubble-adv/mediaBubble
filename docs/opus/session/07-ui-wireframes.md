# UI Wireframes & Workflow Designs

**Session date:** June 22, 2026  
**Design system:** `@mediabubble/design-system`, `brand-*` tokens, bilingual EN + Masri

---

## OPUS App Pages — Wireframe Index

| # | Page | Route |
|---|------|-------|
| 1 | OPUS Dashboard | `/` or `/campaigns` hub |
| 2 | Trigger Management | `/automation/triggers` |
| 3 | Usage Dashboard | `/settings/billing/usage` |
| 4 | Campaign Brief Builder | `/campaigns/new` |
| 5 | Campaign Dashboard | `/campaigns/[id]` |
| 6 | Organization Settings | `/settings/organizations` |
| 7 | Weekly Planning Preview | `/automation/workflows/weekly-social` |

---

## 1. OPUS Dashboard (Command Center)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  MediaBubble Launcher                                      [Org Switcher ▼] │
├──────────────────────────────────────────────────────────────────────────────┤
│  OPUS Command Center                                                         │
│                                                                              │
│  ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐ │
│  │ Active Campaigns    │   │ This Month Usage    │   │ Performance Score   │ │
│  │  • Q3 Launch (Live) │   │ AI Gens: 342/500    │   │ 94% ↑               │ │
│  │  • Summer Promo     │   │ Campaigns: 8/10     │   │ ROAS: 4.8x         │ │
│  └─────────────────────┘   └─────────────────────┘   └─────────────────────┘ │
│                                                                              │
│  Recent Activity                                                             │
│  • Weekly Social Plan Generated → Monday 9:12 AM                            │
│  • Lead from Meta Ad synced to HubSpot → 2 min ago                          │
│  • Budget reallocated on winning creative → Yesterday                       │
│                                                                              │
│  Quick Actions                                                               │
│  [New Brief]  [Run Weekly Planning]  [View Reports]  [Manage Triggers]      │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Trigger Management

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  OPUS Automation → Triggers                                 [New Trigger +] │
├──────────────────────────────────────────────────────────────────────────────┤
│  Filter: All ▼   Enabled Only   Time   Event   Data                         │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ Name                    │ Type   │ Schedule / Condition       │ Status  │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ WeeklySocialPlanning    │ Time   │ Every Mon 9:00 AM          │ Active  │ │
│  │ PerformanceMonitoring   │ Time   │ Every 2h (9-17)            │ Active  │ │
│  │ LeadCaptured            │ Event  │ New lead from Meta/Google  │ Active  │ │
│  │ HighEngagementBoost     │ Data   │ engagement > 5% for 3d     │ Paused  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [Edit] [Run Now] [Disable] [Delete]                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Usage Dashboard

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Billing → Usage                          MediaBubble Agency (Professional) │
├──────────────────────────────────────────────────────────────────────────────┤
│  Current Period: June 2026                                                   │
│                                                                              │
│  ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐ │
│  │ AI Generations      │   │ Campaigns Launched  │   │ API Calls           │ │
│  │ 342 / 5,000         │   │ 8 / 100             │   │ 1,284 / 10,000      │ │
│  │ ████████░░░░ 68%    │   │ ███░░░░░░░░ 8%      │   │ █████░░░░░░ 12%     │ │
│  └─────────────────────┘   └─────────────────────┘   └─────────────────────┘ │
│                                                                              │
│  Status: Healthy — 32 days remaining                                         │
│  [Upgrade to Enterprise]                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Campaign Brief Builder (5-Step Wizard)

Refined layout with progress indicator and conversion-focused CTAs.

**Steps:**

1. **Campaign Basics** — name, goal (awareness / lead gen / conversions)
2. **Audience & Budget** — target audience, budget, timeline
3. **Platforms & Channels** — Meta, Google, Email, LinkedIn toggles
4. **Key Messages** — bullet points, brand voice notes
5. **Review & Launch** — summary, Generate Content / Save Draft / Create Campaign

**Primary CTA:** brand yellow buttons, bilingual labels

---

## 5. Campaign Dashboard

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Campaigns → Q3 Product Launch                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│  Status: LIVE   Spend: $2,340 / $8,500   ROAS: 4.2x                         │
│                                                                              │
│  Impressions: 45.2K   Clicks: 2.8K   CTR: 6.2%   Conversions: 156           │
│                                                                              │
│  Top Platforms: Meta 82%   Google 41%                                        │
│                                                                              │
│  [Pause Campaign]  [Edit Brief]  [View Full Report]                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Campaign Performance Review

Detailed analytics view with platform breakdown.

**Key metrics:** Impressions, Clicks, CTR, Conversions, CPA, ROAS  
**Platform split:** Meta vs Google side-by-side cards  
**Trend chart:** 14-day performance (Recharts in implementation)  
**Top assets:** Ranked with Scale / Pause actions  
**AI insights:** Auto recommendations (scale winners, pause underperformers, budget reallocation)

**Sample data (session mock):**

- Period: June 1 – June 22, 2026
- Spend: $2,847 / $8,500
- ROAS: 4.8x
- Top asset: Carousel Ad A — CTR 9.4%, ROAS 6.2x → Scale Budget +25%

**Actions:** Pause Underperformers, Scale Winners, Export Report, Full History

---

## 7. Weekly Social Planning Workflow

### Overview

| Field | Value |
|-------|-------|
| Name | WeeklySocialPlanning |
| Trigger | Every Monday 9:00 AM (Africa/Cairo) |
| Output | 15–25 social posts across platforms |

### Six-step flow

```
Step 1: Fetch Plan Context
  └─ Pull approved social plan; alert AM if missing

Step 2: Generate Content (Parallel)
  ├─ Instagram: 8 posts (Feed + Stories + Reels)
  ├─ LinkedIn: 5 posts
  ├─ TikTok: 5 Reels
  └─ Facebook: 4–6 variants

Step 3: Create Review Tasks
  └─ Assign to Social Specialist, Content Lead (due tomorrow 2 PM)

Step 4: Wait for Approval (24h timeout)
  └─ Reject → regenerate; timeout → escalate to Manager

Step 5: Schedule Posts
  └─ Best posting times, UTM tracking, spread across week

Step 6: Send Summary & Log
  └─ Notify AM + Client; update usage metering
```

### UI states

**Scheduled card:**
```
Weekly Social Planning
Next Run: Tomorrow 9:00 AM     Status: Scheduled
Last Run: Jun 16 — Generated 22 posts — Approved
```

**In progress:**
```
Step 2/6: Generating Content (68% complete)
Instagram: 8/8   LinkedIn: 5/5   TikTok: 3/5
[ View Generated Posts ]   [ Cancel Workflow ]
```

**Approval queue:**
```
Review Weekly Content — 22 Posts
Instagram (8)   [Approve All]   [Reject 2]
[ Bulk Approve ]   [ Send for Final Approval ]
```

---

## Design Guidelines (All Pages)

- Use `brand-*` tokens exclusively
- Sidebar: "Campaigns" top-level (Briefs, Active, Reports)
- Dashboard cards mirror finance/CRM style
- Bilingual toggle + RTL from day one
- Conversion CTAs: "Book Strategy Call" on success screens
- Mobile-responsive (stacked cards, simplified metrics)

---

## Implementation Priority

1. Campaign Brief Builder (5-step wizard)
2. Campaign Performance Review (Recharts + server actions)
3. Weekly Social Planning approval gallery
4. Trigger Management (if not already built)
5. Usage Dashboard
