# OPUS: Phased Foundation Architecture
## Building Layers Strategically (Not Generation First)

**Status:** Phased Implementation Strategy  
**Date:** June 22, 2026  
**Philosophy:** Foundation layers → Planning layer → Task orchestration → Automation  
**Not:** Jump to generation without proper structure

---

## WHY THIS SEQUENCE MATTERS

**Bad approach:** Build prompt generator first, then figure out how to organize outputs.  
**Result:** Orphaned content, no clear ownership, untrackable workflows.

**Good approach:** Build layers that make orchestration *possible*, then generate at the end.  
**Result:** Every piece of content has context, ownership, and a clear workflow path.

---

## LAYER 1: PROFILES & COMMUNICATION FOUNDATION
### Weeks 1-3 (MVP)

### 1.1 Client Profile System

**What to store:**
```typescript
ClientProfile = {
  id: string,
  name: string,
  industry: string,
  targetAudience: string,
  
  // Strategic Context
  goals: string[], // "Increase brand awareness", "Generate leads", etc.
  painPoints: string[],
  competitors: string[],
  marketPosition: string,
  brandVoice: string,
  
  // Operational
  decisionMaker: TeamMember,
  contacts: Contact[],
  communicationChannels: Channel[], // Email, Slack, WhatsApp, etc.
  preferredContactFrequency: string, // Weekly, bi-weekly, etc.
  timezone: string,
  
  // Tagging System (Critical)
  tags: Tag[], // See section 1.3
  customFields: Record<string, any>,
  
  // Activity
  createdAt: date,
  lastContactedAt: date,
  activeProjects: Project[],
  
  // Metrics (For Later)
  totalCampaignsRun: number,
  averageCampaignPerformance: {
    engagement: number,
    conversions: number,
    roi: number
  }
}
```

**Why this structure:**
- Goals + painPoints + competitors = auto-enrichment data for briefs
- communicationChannels = where to notify about plan approval/updates
- tags = intelligent filtering and grouping (see 1.3)
- metrics = future ML recommendations ("similar clients got X results")

---

### 1.2 Team Profile System

**What to store:**
```typescript
TeamMemberProfile = {
  id: string,
  name: string,
  role: "Creative" | "SEO" | "PPC" | "Account Manager" | "Manager" | "Admin",
  department: string,
  
  // Skills & Expertise
  skills: Skill[], // "Social media copywriting", "Google Ads", etc.
  certifications: string[],
  specializations: string[],
  experienceLevel: "Junior" | "Mid" | "Senior" | "Lead",
  
  // Communication & Availability
  communicationChannels: {
    email: string,
    slack: string,
    phone: string,
    whatsapp: string,
    teams: string,
    // Add more as needed
  },
  workingHours: {
    timezone: string,
    daysAvailable: string[], // Mon-Fri
    hoursAvailable: string, // "9-5"
  },
  responseTime: string, // "1 hour", "4 hours", "next day"
  
  // Capacity & Allocation
  currentWorkload: number, // % of capacity
  maxCapacity: number, // Hours per week
  currentProjects: Project[],
  
  // Preferences
  preferredChannels: Channel[],
  notificationPreferences: {
    appNotifications: boolean,
    emailNotifications: boolean,
    slackNotifications: boolean,
    // ...
  },
  doNotDisturb: {
    enabled: boolean,
    startTime: time,
    endTime: time,
  },
  
  // Tagging System
  tags: Tag[],
  
  // Performance
  taskCompletionRate: number,
  averageTaskDuration: number,
  approvalTurnaroundTime: number,
}
```

**Why this structure:**
- skills + experienceLevel = automatic task routing (don't send PPC to social team)
- communicationChannels = send notifications through preferred medium
- workingHours + timezone = schedule tasks considering availability
- maxCapacity = prevent overallocation
- notificationPreferences = respect communication style
- taskCompletionRate = ML learns who's reliable for urgent work

---

### 1.3 Powerful Tagging System (The Glue)

This is where most tools fail. Tags need to be:
- Multi-dimensional (not just one category)
- User-created (flexible, not rigid)
- Filterable at scale (searchable)
- Connected to automation (rule-based actions)

**Implementation:**

```typescript
Tag = {
  id: string,
  name: string,
  category: "Client" | "Team" | "Project" | "Skill" | "Status" | "Custom",
  color: string,
  
  // Hierarchy (optional)
  parentTag: Tag | null, // "Social Media" can be parent of "Instagram", "TikTok", "LinkedIn"
  
  // Automation Rules
  automationRules: AutomationRule[], // "When task has tag X, do Y"
  
  // Metadata
  description: string,
  createdBy: TeamMember,
  usageCount: number, // How many profiles/tasks use this tag
  relatedTags: Tag[], // "Suggested tags when you use this"
}

// Examples of tags you'd create:
Tags = {
  // Client Tags
  ClientTags: [
    Tag("B2B", "Client"),
    Tag("E-commerce", "Client"),
    Tag("SaaS", "Client"),
    Tag("High-Priority", "Client"),
    Tag("New", "Client"),
    Tag("Long-Term", "Client"),
  ],
  
  // Skill Tags
  SkillTags: [
    Tag("SEO", "Skill"),
    Tag("Content Writing", "Skill"),
    Tag("Social Media", "Skill", { parentTag: "Social Media" }),
    Tag("Instagram Strategy", "Skill", { parentTag: "Social Media" }),
    Tag("Google Ads", "Skill"),
    Tag("Video Editing", "Skill"),
  ],
  
  // Status Tags
  StatusTags: [
    Tag("Urgent", "Status"),
    Tag("Blocked", "Status"),
    Tag("In Review", "Status"),
    Tag("Ready to Publish", "Status"),
  ],
  
  // Custom Tags (Client-Specific)
  CustomTags: [
    Tag("Q3 Campaign", "Custom"),
    Tag("Black Friday Push", "Custom"),
    Tag("Brand Refresh", "Custom"),
  ]
}
```

**Why this matters:**
- Search: "Show me all tasks for B2B + E-commerce clients in Q3"
- Routing: "When task has tag SEO + Urgent, route to senior SEO person"
- Analytics: "Which skill types deliver highest ROI?"
- Templates: "Reuse plans from similar (tagged) clients"

---

### 1.4 Direct Chat System

**What to include:**
```typescript
DirectChat = {
  id: string,
  participants: TeamMember[], // 1-1 or group
  type: "Direct" | "Group",
  
  // Context
  relatedTo: {
    client: ClientProfile | null,
    project: Project | null,
    task: Task | null,
    plan: Plan | null,
  },
  
  messages: Message[],
  
  // Features
  pinnedMessages: Message[], // Important context stays visible
  attachments: Attachment[],
  reactions: Reaction[],
  
  // Threading
  threads: Thread[], // Reply to specific message without cluttering
  
  // Integration
  canMentionSlack: boolean, // Send to Slack alongside app
  canMentionEmail: boolean, // Send to email alongside app
  
  // Notifications
  unreadCount: number,
  lastActivity: datetime,
}

Message = {
  id: string,
  author: TeamMember,
  content: string,
  timestamp: datetime,
  
  // Context Links
  mentionedPeople: TeamMember[],
  mentionedTasks: Task[],
  mentionedClients: ClientProfile[],
  attachedFiles: File[],
  
  // Actions
  reactions: Emoji[],
  replies: Message[], // Threading
}
```

**Why this structure:**
- Pinned messages = important context (brief updates, deadlines) stay visible
- Threading = conversations don't get lost in 100-message dumps
- Context links = jump from chat → task → client profile → plan
- Mentions = alert people through their preferred channels

---

## LAYER 2: INTELLIGENT PLANNING SYSTEM
### Weeks 4-6 (Building on Layer 1)

### 2.1 Plan Types (Not Generic Planning)

Each plan type has different structure because they solve different problems:

```typescript
// Social Media Plan
SocialMediaPlan = {
  id: string,
  client: ClientProfile,
  dateRange: { start: date, end: date },
  
  // Strategic Foundation
  goals: string[], // "Increase engagement", "Drive traffic", etc.
  targetAudience: Audience,
  keyMessages: string[],
  
  // Channel Breakdown
  channels: {
    instagram: ChannelPlan,
    linkedin: ChannelPlan,
    tiktok: ChannelPlan,
    twitter: ChannelPlan,
    // ...
  },
  
  // Detailed Strategy
  contentPillars: string[], // "Educational", "Behind-the-scenes", "Promotional"
  postingFrequency: { channel: Channel, frequency: string }[],
  bestTimes: { channel: Channel, times: string[] }[],
  
  // Content Specifications
  contentTypes: string[], // "Reels", "Carousels", "Stories", "Threads"
  estimatedOutputs: {
    totalPosts: number,
    videosNeeded: number,
    designsNeeded: number,
  },
  
  // Budget & Resources
  budget: number,
  assignedTeamMembers: TeamMember[],
  
  // Approval & Status
  status: "Draft" | "In Review" | "Approved" | "Active" | "Completed",
  approver: TeamMember,
  reviewNotes: string,
  
  // Metrics & Success
  successMetrics: {
    engagementTarget: number,
    reachTarget: number,
    conversionTarget: number,
  },
  
  // Generated Tasks (Connected to Layer 3)
  generatedTasks: Task[],
}

ChannelPlan = {
  channel: "Instagram" | "LinkedIn" | "TikTok" | etc.,
  strategy: string,
  contentPillars: string[],
  postingSchedule: {
    frequency: string, // "3x weekly"
    bestDays: string[],
    bestTimes: string[],
  },
  contentTypes: string[],
  estimatedPosts: number,
}

// Ads Plan
AdsPlan = {
  id: string,
  client: ClientProfile,
  platform: "Google Ads" | "Meta Ads" | "LinkedIn Ads" | "TikTok Ads",
  dateRange: { start: date, end: date },
  
  // Strategic
  objective: string, // "Lead generation", "Traffic", "Conversions"
  targetAudience: Audience,
  budgetTotal: number,
  budgetPerDay: number,
  
  // Campaign Structure
  campaigns: CampaignGroup[], // Each campaign has different audience/message
  
  // Ad Specifications
  adFormats: string[], // "Image", "Video", "Carousel"
  estimatedAdVariations: number,
  landingPageRequirements: string[],
  
  // Success Metrics
  targetMetrics: {
    cpc: number,
    cpm: number,
    conversionRate: number,
    roas: number,
  },
  
  // Team Assignment
  assignedPPCSpecialist: TeamMember,
  
  // Generated Tasks
  generatedTasks: Task[],
}

CampaignGroup = {
  name: string,
  targetAudience: Audience,
  messaging: string,
  budgetAllocation: number,
  adVariations: number,
}

// Email Campaign Plan
EmailCampaignPlan = {
  id: string,
  client: ClientProfile,
  dateRange: { start: date, end: date },
  
  // Strategy
  objective: string, // "Nurture", "Promotion", "Re-engagement"
  targetSegments: Audience[],
  
  // Email Sequence
  emailSequence: {
    sequenceNumber: number,
    trigger: string, // "Day 1 after signup"
    subject: string,
    goal: string,
    estimatedLength: string,
  }[],
  
  // Specification
  totalEmailsNeeded: number,
  designsNeeded: number,
  
  // Success Metrics
  targetOpenRate: number,
  targetClickRate: number,
  targetConversionRate: number,
  
  // Team & Approval
  assignedContentCreator: TeamMember,
  approver: TeamMember,
  
  // Generated Tasks
  generatedTasks: Task[],
}

// Website/Landing Page Plan
WebsitePlan = {
  id: string,
  client: ClientProfile,
  
  // Scope
  projectType: "New Website" | "Redesign" | "Landing Page" | "Conversion Optimization",
  numberOfPages: number,
  
  // Strategic
  goals: string[],
  keyMessaging: string[],
  targetAudience: Audience,
  
  // Page Breakdown
  pages: PageSpec[],
  
  // Design Specification
  designSystemReference: string, // Link to brand guidelines
  colorPalette: string[],
  typography: string[],
  
  // Features & Functionality
  requiredFeatures: string[], // "Contact form", "Newsletter signup", "Product filter"
  integrations: string[], // "HubSpot", "Google Analytics", "Stripe"
  
  // Content Requirement
  totalContentPieces: number,
  pagesCopyNeeded: number,
  
  // Timeline & Resources
  launchDate: date,
  assignedDesigner: TeamMember,
  assignedDeveloper: TeamMember,
  projectManager: TeamMember,
  
  // Success Metrics
  targetMetrics: {
    pageLoadTime: string,
    conversionRate: number,
    bounceRate: number,
  },
  
  // Generated Tasks
  generatedTasks: Task[],
}

PageSpec = {
  pageName: string,
  purpose: string, // "Home", "Product", "Pricing", "Contact", "Thank you"
  keyElements: string[], // "Hero", "CTA", "Testimonials", "Form"
  contentRequirements: string[],
  designNotes: string,
}
```

**Why separate plan types:**
- Each has different success metrics
- Each generates different task types
- Each requires different team expertise
- Future: AI can learn patterns for each type

---

### 2.2 Plan Creation Workflow (Intelligent, Not Blank Form)

```
User selects: "Create Social Media Plan"
↓
OPUS asks 10 strategic questions:
├─ What's your main goal?
├─ Which platforms matter most?
├─ Who's your audience?
├─ What's your posting frequency?
├─ Do you have existing brand voice?
├─ What's your content strategy?
├─ Budget constraints?
├─ Who should approve?
└─ What success looks like?
↓
OPUS auto-fills plan structure with answers
↓
Shows preview: "This plan requires 45 social posts, 8 videos, 3 designers, 2-week timeline"
↓
User reviews & adjusts
↓
Approver reviews
↓
Plan approved → Auto-generate tasks (Layer 3)
```

**Key feature:** Each question connects to client profile data.  
"Who's your audience?" might be pre-filled from client profile's targetAudience.

---

### 2.3 Plan Template Library

```
Reusable Templates = {
  "Q3 B2B Tech Campaign": {
    socialMediaPlan: { /* pre-configured */ },
    adsPlan: { /* pre-configured */ },
    emailCampaignPlan: { /* pre-configured */ },
    websitePlan: null,
  },
  
  "E-commerce Product Launch": {
    socialMediaPlan: { /* pre-configured */ },
    adsPlan: { /* pre-configured */ },
    emailCampaignPlan: { /* pre-configured */ },
    websitePlan: { /* pre-configured */ },
  },
  
  "SaaS Lead Generation": {
    socialMediaPlan: { /* pre-configured */ },
    adsPlan: { /* pre-configured */ },
    emailCampaignPlan: { /* pre-configured */ },
    websitePlan: { /* pre-configured */ },
  },
}
```

**Why:**
- New client? Pick similar template, customize
- Faster than blank form
- Consistent with proven approaches
- Future: ML learns which templates work for which client types

---

## LAYER 3: INTELLIGENT TASK MANAGEMENT
### Weeks 7-9 (Building on Layers 1 & 2)

### 3.1 Task Structure (Everything Traces Back to Plan)

```typescript
Task = {
  id: string,
  title: string,
  description: string,
  
  // Origin & Context
  originatedFrom: Plan, // Critical: task knows its parent plan
  relatedClient: ClientProfile,
  relatedProject: Project,
  
  // Task Details
  type: TaskType, // "Create content", "Design", "Approve", "Publish", "Report"
  subtasks: Task[], // Hierarchical
  
  // Specifications (Detailed Brief)
  requirements: Requirement[], // See 3.2
  deliverables: Deliverable[],
  acceptanceCriteria: string[],
  
  // Assignment
  assignedTo: TeamMember | null,
  suggestedFor: TeamMember[], // AI-recommended based on skills
  approver: TeamMember | null,
  
  // Timeline
  dueDate: date,
  estimatedHours: number,
  priority: "Low" | "Medium" | "High" | "Urgent",
  dependencies: Task[], // This task waits for other tasks
  
  // Status & Workflow
  status: "Created" | "Assigned" | "In Progress" | "In Review" | "Approved" | "Rejected" | "Complete",
  
  // Tagging
  tags: Tag[],
  
  // Communication
  comments: Comment[], // Threaded discussion
  attachments: Attachment[],
  
  // Automation
  automationRules: AutomationRule[], // See 3.3
  canAutomate: boolean,
  automationProvider: "OPUS Generation" | "Zapier" | "Manual",
  
  // Metrics
  createdAt: datetime,
  completedAt: datetime | null,
  actualHours: number | null,
  approvalTurnaroundTime: number | null,
}

TaskType = 
  | "Write Content"
  | "Design Graphics"
  | "Edit Video"
  | "Generate Copy"
  | "Create Landing Page"
  | "Research Competitors"
  | "Review & Approve"
  | "Publish Content"
  | "Monitor Performance"
  | "Report Results"
  | "Coordinate Team"
  | "Custom"

Requirement = {
  category: string, // "Format", "Tone", "Length", "Brand Guidelines", "SEO"
  specification: string,
  example: string | null,
}

Deliverable = {
  name: string,
  format: string, // ".docx", ".jpg", ".mp4", ".html"
  description: string,
  checklistItems: string[],
}

AutomationRule = {
  condition: string, // "status == 'Created' AND assignedTo == null"
  action: string, // "notify team", "assign to next available", "run content generation"
  actionDetails: object,
}
```

---

### 3.2 Intelligent Task Generation from Plans

**When plan is approved:**

```
Social Media Plan approved
↓
System generates tasks:
├─ FOR EACH CHANNEL:
│  ├─ "Create Instagram content calendar" (assigned to Social Media lead)
│  ├─ "Write 15 Instagram captions" (assigned to copywriter)
│  ├─ "Design 15 Instagram posts" (assigned to designer)
│  ├─ "Review Instagram content" (assigned to manager)
│  └─ "Schedule posts to Instagram" (assigned to social coordinator)
│
├─ FOR OVERALL PLAN:
│  ├─ "Monitor social media performance" (recurring, assigned to analytics)
│  └─ "Weekly social media report" (recurring, assigned to account manager)
│
└─ SUBTASKS FOR EACH:
   ├─ "Week 1: Create captions for posts 1-3"
   ├─ "Week 2: Create captions for posts 4-6"
   └─ ... etc
```

**Each task has:**
- Clear assignment based on skills (from team profile tags)
- Specific deliverable requirements
- Dependencies (captions written before design can start)
- Clear deadline (calculated from plan timeline)
- Approval workflow

---

### 3.3 Task Routing & Automation

**Routing Logic:**
```
New task "Write 15 Instagram captions"
↓
System checks:
├─ Required skill: "Copywriting" + "Social Media"
├─ Required experience: "Mid" or higher
├─ Current workload: < 80% capacity
├─ Availability: Working hours match task urgency
├─ Track record: Has approved other captions
└─ Tags: Look for team members tagged "Instagram Expert" + "Copywriter"
↓
Ranked list: [Person A (90% match), Person B (75% match), Person C (60% match)]
↓
Offer to Person A first
└─ If declines or no response in 2 hours → Person B
```

**Automation Triggers:**
```
Task status changes:
├─ "In Review" → Send to approver through preferred channel
├─ "Approved" → If next task is ready, assign it
├─ "Rejected" → Notify creator with feedback, reopen
└─ "Complete" → Check if dependent tasks can start

If task is automatable:
├─ "Write captions" → Trigger OPUS content generation
├─ "Design graphics" → Trigger image generation tool
├─ "Publish content" → Automatically schedule to platform
└─ Notify team only if revision needed
```

---

### 3.4 Task Status Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ OPUS Task Manager: Q3 E-commerce Campaign                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Plan: "Summer Sale Campaign"              Status: Active   │
│                                                             │
│ Tasks Breakdown                     Team Status            │
│ ████████████░░░░░░░ 48% Complete   1 person overloaded   │
│                                      3 tasks blocked       │
│ 23 Complete                          2 tasks in review    │
│ 15 In Progress                                             │
│ 8 In Review                         Action Items:        │
│ 7 Not Started                       → Approve 2 reviews  │
│ 2 Blocked                           → Resolve dependency │
│ 1 Rejected                          → Reassign overloaded │
│                                                             │
│ Critical Path                       Team Workload        │
│ Design → Copy → Review → Publish   Sarah (Content):     │
│ Due: June 28                        ████████░░ 80%      │
│                                     Mike (Design):       │
│ Overdue Tasks: 0                    ████████████ 120%   │
│ At Risk: 3                          Alex (Review):       │
│ On Track: 19                        ██░░░░░░░░ 20%      │
│                                                             │
│ Coming Due This Week                Communications      │
│ • 5 tasks due tomorrow             • 7 slack messages   │
│ • 2 tasks due Thu                  • 3 pending approvals│
│ • 1 task due Friday                • 12 comments        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## LAYER 4: AUTOMATION & ORCHESTRATION
### Weeks 10-12 (Connecting All Layers)

### 4.1 Automation Triggers (When Things Happen Automatically)

```
TRIGGER 1: Plan Approved
├─ Generate all tasks
├─ Notify assigned team members
├─ Set up calendar events for deadlines
└─ Create content generation batches

TRIGGER 2: Task Status Changes to "In Progress"
├─ Start timer (for time tracking)
├─ Notify approver (heads up, review coming)
└─ If dependent task is ready, start assignment process

TRIGGER 3: Task Status Changes to "Approved"
├─ If next task ready → assign it
├─ If can auto-run → run it (content generation, scheduling)
├─ Update client communication (progress update)
└─ Check if entire plan is complete

TRIGGER 4: Task Status Changes to "Complete"
├─ Mark deliverable as delivered
├─ Update timeline (release resources for next task)
├─ Notify client if relevant
└─ Collect performance baseline for learning

TRIGGER 5: Task is Rejected
├─ Reopen task
├─ Notify creator with feedback
├─ Update timeline estimate
└─ Log lesson for quality improvement

TRIGGER 6: Task Not Started by 50% of Timeline
├─ Alert assignee
├─ Offer help
├─ Check if blocked or overallocated
└─ Escalate if needed
```

---

### 4.2 Integration Points (Connecting to External Tools)

```
Content Generation Triggers:
├─ "Write captions" task approved → Call Claude API with:
│  ├─ Client tone from profile
│  ├─ Platform specifications (Instagram = short, LinkedIn = professional)
│  ├─ Content pillar from plan
│  ├─ Target audience from plan
│  └─ Brand voice from client profile
│  ↓ Result: Generated captions in task
│
├─ "Design graphics" task approved → Call image generation with:
│  ├─ Brand colors from client profile
│  ├─ Format from task spec
│  ├─ Copy from completed caption task
│  └─ Design guidelines from client profile
│  ↓ Result: Generated images in task
│
└─ "Edit video" task → Notify video editor, wait for completion

Publishing Triggers:
├─ "Social posts" task approved → Auto-schedule using:
│  ├─ Best times from social plan
│  ├─ Calendar integrations (don't post during client downtime)
│  └─ Post batching (if 5 posts, spread them across week)
│
├─ "Email campaign" task approved → Auto-send sequence using:
│  ├─ Email platform integration (HubSpot, Mailchimp)
│  ├─ Timing from email plan
│  └─ Segmentation from client profile
│
└─ "Website updates" task → Notify dev, wait for deployment

Reporting Triggers:
├─ Weekly → Run "Weekly report" task automatically
│  ├─ Pull metrics from all active campaigns
│  ├─ Compile into structured format
│  └─ Notify account manager
│
└─ Monthly → Run "Monthly summary" task
   ├─ Trend analysis
   ├─ ROI calculation
   └─ Recommendations for next month
```

---

## LAYER DEPENDENCIES

```
Layer 1 (Profiles) MUST come first
├─ Team profiles = who's available, their skills, their channels
├─ Client profiles = goals, tone, audience, preferences
└─ Tags = how to filter and route everything

Layer 2 (Planning) builds on Layer 1
├─ Plans use client profile data (goals, audience, tone)
├─ Plans assign to team based on skills
├─ Plans use tags to categorize

Layer 3 (Tasks) builds on Layers 1 & 2
├─ Tasks originate from plans
├─ Tasks route based on team skills
├─ Tasks use tags for automation rules

Layer 4 (Automation) orchestrates Layers 1-3
├─ Automation routes tasks based on team availability
├─ Automation triggers on status changes
├─ Automation integrates external tools
```

---

## IMPLEMENTATION SEQUENCE

```
WEEK 1-3: PROFILES & FOUNDATION
├─ Client profile schema + CRUD
├─ Team profile schema + CRUD
├─ Tag system (creation, filtering, automation rules)
├─ Direct chat (simple message threading)
└─ MVP UI: Profile management, chat, tag creation

WEEK 4-6: PLANNING LAYER
├─ Plan type schemas (Social, Ads, Email, Website)
├─ Plan creation workflow (guided interview)
├─ Plan template library
├─ Auto-task generation from plans
└─ MVP UI: Plan builder with preview, template selector

WEEK 7-9: TASK MANAGEMENT
├─ Task schema (full structure with dependencies)
├─ Task assignment logic (skill-based routing)
├─ Task status workflow
├─ Approval system
├─ Dashboard with task overview
└─ MVP UI: Task creation, assignment, status tracking, comments

WEEK 10-12: AUTOMATION & ORCHESTRATION
├─ Automation trigger engine
├─ Integration framework for external tools
├─ Content generation hooks (Claude API)
├─ Publishing hooks (Zapier, direct integrations)
├─ Reporting automation
└─ MVP UI: Automation rules editor, integration config

RESULT: Fully functional foundation system ready for generation layer
```

---

## Why This Sequence Wins

### Versus Starting with Generation:
```
Bad Path: Generation First
└─ Build prompt generator
   └─ Generate 150 pieces
      └─ Now what? Who owns it? Where does it go?
         └─ No clear workflow, no ownership, scattered outputs

Good Path: Foundation First
└─ Build profiles (know who's involved, their skills, availability)
   └─ Build planning (know what we're building, why, success metrics)
      └─ Build tasks (know who does what, when, with what approval)
         └─ Build automation (generation happens *within* clear task context)
            └─ Every output has origin, ownership, approval, timeline
```

### The Competitive Advantage:
1. **Traceable:** Every task → every deliverable → every output has lineage
2. **Accountable:** Every person knows their responsibility and capacity
3. **Automatable:** Clear task boundaries = clear automation points
4. **Scalable:** Add clients by cloning their profile & templates, not by adding complexity
5. **Intelligent:** System learns which teams deliver best for which client types

---

## MVP Launch Timeline

**Week 12 End State:**
- Teams can create plans that automatically spawn tasks
- Tasks route to right people based on skills
- People get notified through preferred channels
- Status changes trigger next steps automatically
- Approvers can review & approve with feedback
- System is ready for content generation integrations

**First Real Campaign (Week 13+):**
- Account manager creates plan for actual client
- Tasks generated automatically
- Team executes (may be manual initially, or auto where ready)
- System learns what works
- Metrics collected
- Iterate

**By Month 6:**
- OPUS has data on which team does what well
- Can predict task duration, quality, time to completion
- Can recommend best team for new tasks
- Foundation system is rock-solid, ready for advanced features

---

## This Foundation Enables

Once these 4 layers work, you can add:
- **Content generation** (runs inside task context, not standalone)
- **Performance analytics** (measures campaign → plan → task success)
- **Team intelligence** (learns which people excel at what)
- **Client intelligence** (learns which approaches work for which client types)
- **Predictive modeling** (recommends plans based on similar past clients)
- **White-label** (resell to agencies)
- **Agency pricing** (charge per active campaign, per team member, per output)

Without this foundation, all of that is impossible.

**Start here. Build it right. Everything else becomes possible.**
