# OPUS: Advanced Automation & Scheduling Engine
## The Nervous System - Making Everything Move

**Status:** Automation Architecture  
**Date:** June 22, 2026  
**Purpose:** Time-based + event-based + intelligent automation that creates self-operating workflows

---

## THE PROBLEM WITH SIMPLE AUTOMATION

**Bad automation:** "If task approved, send notification"  
**Problem:** Single-action, no memory, no learning, breaks easily

**Good automation:** Multi-step workflows that chain tasks, remember context, adapt based on results

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│          OPUS Automation & Scheduling Engine             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Trigger Layer (What starts automation)                 │
│  ├─ Time-Based Triggers (Cron, specific times, dates)  │
│  ├─ Event-Based Triggers (Status changes, mentions)    │
│  ├─ Data-Based Triggers (Metrics cross threshold)      │
│  └─ Manual Triggers (User clicks "run")                │
│                                                          │
│  Workflow Engine (How automation flows)                 │
│  ├─ Conditional Logic (If X, then Y, else Z)          │
│  ├─ Parallel Execution (Run multiple tasks at once)    │
│  ├─ Sequential Execution (Wait for step 1 before 2)    │
│  ├─ Waiting States (Pause for approval, then continue) │
│  └─ Error Handling (What happens if step fails)        │
│                                                          │
│  Action Layer (What actually happens)                   │
│  ├─ Content Generation (Claude API)                    │
│  ├─ Task Management (Create, assign, update tasks)     │
│  ├─ Publishing (Schedule posts, send emails)           │
│  ├─ Notifications (Slack, email, in-app)               │
│  ├─ Data Operations (Query, aggregate, calculate)      │
│  └─ External Integrations (Zapier, webhooks)           │
│                                                          │
│  Learning Layer (How automation improves)               │
│  ├─ Success Tracking (Did this workflow work?)         │
│  ├─ Performance Metrics (How well did it work?)        │
│  ├─ Pattern Recognition (What works for which clients?)│
│  └─ Auto-Optimization (Adjust workflow based on data)  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## LAYER 1: TRIGGER SYSTEM (What Starts Workflows)

### 1.1 Time-Based Triggers

```typescript
TimeTrigger = {
  id: string,
  name: string,
  
  // Scheduling Options
  type: "Once" | "Recurring" | "Cron",
  
  // Once: Run one time at specific time
  once: {
    date: date,
    time: time,
    timezone: string,
  },
  
  // Recurring: Daily, Weekly, Monthly
  recurring: {
    frequency: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly",
    daysOfWeek: string[], // Mon, Tue, Wed...
    daysOfMonth: number[], // 1, 15, 30...
    time: time,
    timezone: string,
    endDate: date | null, // When does recurrence stop?
  },
  
  // Cron: Advanced scheduling
  // Example: "0 9 * * MON-FRI" = every weekday at 9am
  cron: {
    expression: string,
    timezone: string,
  },
  
  // Execution Context
  executesWorkflow: Workflow,
  
  // Status
  enabled: boolean,
  lastExecuted: datetime | null,
  nextExecution: datetime,
  executionCount: number,
  
  // History
  executionHistory: {
    timestamp: datetime,
    status: "Success" | "Failed" | "Skipped",
    duration: number,
    result: object,
    errorMessage: string | null,
  }[],
}

// Examples:
TimeTriggers = {
  // Every Monday at 9am - generate weekly social plan
  WeeklySocialPlanning: {
    recurring: {
      frequency: "Weekly",
      daysOfWeek: ["Monday"],
      time: "09:00",
    },
    executesWorkflow: "GenerateWeeklySocialContentPlan",
  },
  
  // Every 1st of month at 8am - create monthly report
  MonthlyReporting: {
    recurring: {
      frequency: "Monthly",
      daysOfMonth: [1],
      time: "08:00",
    },
    executesWorkflow: "GenerateMonthlyReport",
  },
  
  // Every weekday at 6pm - publish pre-scheduled content
  DailyPublishing: {
    recurring: {
      frequency: "Daily",
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      time: "18:00",
    },
    executesWorkflow: "PublishScheduledContent",
  },
  
  // Every 2 hours during business hours
  PerformanceMonitoring: {
    cron: "0 */2 9-17 * * MON-FRI",
    executesWorkflow: "MonitorCampaignPerformance",
  },
  
  // One-time: Launch date
  CampaignLaunch: {
    once: {
      date: "2026-07-01",
      time: "10:00",
    },
    executesWorkflow: "LaunchSummerCampaign",
  },
}
```

---

### 1.2 Event-Based Triggers

```typescript
EventTrigger = {
  id: string,
  name: string,
  
  // What triggers this
  eventType: EventType,
  eventCondition: Condition[], // Can have multiple conditions
  
  // Action when triggered
  executesWorkflow: Workflow,
  
  // Scope
  appliesTo: "All" | "Specific" | "Filtered",
  specificItems: EntityReference[], // Specific clients, teams, etc.
  filter: Filter, // Tag-based filtering
  
  // Execution Rules
  maxExecutionsPerDay: number | null, // Prevent runaway automation
  cooldownMinutes: number, // Don't trigger again for X minutes
  requiresApproval: boolean, // Wait for human approval?
  
  // Status
  enabled: boolean,
  triggerCount: number,
  lastTriggered: datetime | null,
  
  // History
  triggerHistory: {
    timestamp: datetime,
    entity: EntityReference,
    workflowExecuted: Workflow,
    status: "Success" | "Failed" | "Pending Approval",
    result: object,
  }[],
}

EventType = 
  | "TaskStatusChanged"
  | "TaskApproved"
  | "TaskRejected"
  | "TaskCreated"
  | "TaskAssigned"
  | "TaskOverdue"
  | "PlanApproved"
  | "PlanCreated"
  | "CommentAdded"
  | "MentionedInChat"
  | "PerformanceThresholdCrossed"
  | "CampaignLaunched"
  | "ContentPublished"
  | "Custom"

Condition = {
  field: string, // "status", "assignedTo", "priority", "tags", "performance"
  operator: "==" | "!=" | ">" | "<" | "contains" | "in",
  value: any,
  
  // Conditional logic
  AND: Condition[] | null, // All must match
  OR: Condition[] | null, // Any can match
}

// Examples:
EventTriggers = {
  // When social media task approved → generate content
  SocialTaskApproved: {
    eventType: "TaskApproved",
    eventCondition: [
      {
        field: "tags",
        operator: "contains",
        value: "Social Media",
      }
    ],
    executesWorkflow: "GenerateSocialContent",
  },
  
  // When email task rejected → notify creator and reopen
  EmailTaskRejected: {
    eventType: "TaskRejected",
    eventCondition: [
      {
        field: "tags",
        operator: "contains",
        value: "Email",
      }
    ],
    executesWorkflow: "NotifyRejectionAndReopen",
  },
  
  // When task overdue by 1 day → escalate
  TaskOverdueEscalation: {
    eventType: "TaskOverdue",
    eventCondition: [
      {
        field: "priority",
        operator: "==",
        value: "High",
      }
    ],
    executesWorkflow: "EscalateToManager",
    cooldownMinutes: 1440, // Don't escalate twice per day
  },
  
  // When plan approved → auto-create all tasks
  PlanApprovedAutomation: {
    eventType: "PlanApproved",
    executesWorkflow: "GenerateTasksFromPlan",
    requiresApproval: false,
  },
  
  // When campaign performance drops below 2% engagement → alert
  PerformanceAlert: {
    eventType: "PerformanceThresholdCrossed",
    eventCondition: [
      {
        field: "engagementRate",
        operator: "<",
        value: 0.02,
      }
    ],
    executesWorkflow: "AlertPerformanceDrop",
  },
  
  // When client tags includes "E-commerce" AND plan created → suggest template
  TemplateRecommendation: {
    eventType: "PlanCreated",
    eventCondition: [
      {
        field: "client.tags",
        operator: "contains",
        value: "E-commerce",
      }
    ],
    executesWorkflow: "SuggestEcommerceTemplate",
  },
}
```

---

### 1.3 Data-Based Triggers

```typescript
DataTrigger = {
  id: string,
  name: string,
  
  // What data to monitor
  dataSource: string, // "Campaign Metrics", "Task Metrics", "Team Capacity"
  metric: string, // "engagement_rate", "conversion_rate", "team_utilization"
  
  // Threshold condition
  condition: {
    operator: ">" | "<" | "==" | "within_range",
    threshold: number,
    compareToTarget: boolean, // Compare to plan's target metric
  },
  
  // Check frequency
  checkEvery: {
    value: number,
    unit: "minutes" | "hours" | "days",
  },
  
  // Only trigger if sustained
  sustainedFor: {
    value: number,
    unit: "minutes" | "hours" | "days",
  } | null,
  
  // Workflow to execute
  executesWorkflow: Workflow,
  
  // Execution context
  appliesTo: "All" | "Filtered",
  filter: Filter | null,
  
  // Status
  enabled: boolean,
  lastChecked: datetime,
  lastTriggered: datetime | null,
  currentValue: number,
}

// Examples:
DataTriggers = {
  // If engagement rate > 5% for 3 days → boost budget
  HighEngagementBudgetBoost: {
    dataSource: "Campaign Metrics",
    metric: "engagement_rate",
    condition: {
      operator: ">",
      threshold: 0.05,
    },
    sustainedFor: {
      value: 3,
      unit: "days",
    },
    checkEvery: {
      value: 1,
      unit: "hours",
    },
    executesWorkflow: "BoostCampaignBudget",
  },
  
  // If CTR < 1% → pause and regenerate ads
  LowCTRRecovery: {
    dataSource: "Campaign Metrics",
    metric: "click_through_rate",
    condition: {
      operator: "<",
      threshold: 0.01,
    },
    sustainedFor: {
      value: 2,
      unit: "days",
    },
    checkEvery: {
      value: 3,
      unit: "hours",
    },
    executesWorkflow: "PauseAndRegenerateAds",
  },
  
  // If team utilization > 90% → alert manager
  TeamOverloadAlert: {
    dataSource: "Team Capacity",
    metric: "utilization_percentage",
    condition: {
      operator: ">",
      threshold: 0.9,
    },
    checkEvery: {
      value: 1,
      unit: "hours",
    },
    executesWorkflow: "NotifyManagerOfOverload",
  },
  
  // If performance 20% below target → trigger review
  PerformanceReview: {
    dataSource: "Campaign Metrics",
    metric: "conversion_rate",
    condition: {
      operator: "<",
      compareToTarget: true, // 20% below plan's target
    },
    sustainedFor: {
      value: 5,
      unit: "days",
    },
    checkEvery: {
      value: 4,
      unit: "hours",
    },
    executesWorkflow: "InitiatePerformanceReview",
  },
}
```

---

## LAYER 2: WORKFLOW ENGINE (How Automation Flows)

### 2.1 Workflow Structure

```typescript
Workflow = {
  id: string,
  name: string,
  description: string,
  
  // What triggers this workflow
  triggers: (TimeTrigger | EventTrigger | DataTrigger)[],
  
  // Steps in the workflow
  steps: WorkflowStep[],
  
  // Flow control
  executionMode: "Sequential" | "Parallel", // Steps in order or all at once?
  
  // Error handling
  onError: {
    strategy: "Stop" | "Continue" | "Retry" | "Escalate",
    retries: number,
    retryDelayMinutes: number,
    escalateTo: TeamMember | null,
  },
  
  // Input/Output
  inputs: WorkflowInput[], // Variables workflow receives
  outputs: WorkflowOutput[], // Variables workflow produces
  
  // Status & History
  enabled: boolean,
  createdBy: TeamMember,
  createdAt: datetime,
  lastModified: datetime,
  executionHistory: WorkflowExecution[],
  
  // Tags for organization
  tags: Tag[],
  
  // Documentation
  documentation: string,
}

WorkflowStep = {
  id: string,
  stepNumber: number,
  name: string,
  description: string,
  
  // Type of action
  action: ActionType,
  actionConfig: object, // Config specific to action type
  
  // Conditional execution
  condition: Condition[] | null, // Only run if condition met
  
  // What to do if step fails
  onFailure: "Stop" | "Continue" | "Retry" | "RunAlternate",
  alternateStep: WorkflowStep | null,
  
  // Timing
  waitForApproval: boolean, // Pause and wait for human to approve?
  approver: TeamMember | null,
  timeout: {
    value: number,
    unit: "minutes" | "hours",
  } | null,
  
  // Input/Output
  inputMapping: { [key: string]: string }, // Map workflow inputs to step inputs
  outputMapping: { [key: string]: string }, // Map step outputs to workflow outputs
  
  // History
  executionHistory: StepExecution[],
}

ActionType =
  | "GenerateContent" // Call Claude API
  | "CreateTask" // Create task in task manager
  | "UpdateTask" // Update task status/content
  | "AssignTask" // Assign to team member
  | "PublishContent" // Publish to platform
  | "SendNotification" // Slack, email, etc.
  | "QueryData" // Fetch data
  | "AggregateMetrics" // Combine metrics
  | "CompareData" // Compare current vs. expected
  | "SendEmail" // Email campaign
  | "UpdateDatabase" // Store results
  | "CallWebhook" // External API
  | "Branch" // Conditional branching
  | "Pause" // Wait for specific time
  | "Log" // Log for debugging
  | "Custom" // Custom code execution

WorkflowInput = {
  name: string,
  type: "string" | "number" | "date" | "object" | "array",
  required: boolean,
  defaultValue: any | null,
}

WorkflowOutput = {
  name: string,
  type: "string" | "number" | "date" | "object" | "array",
  description: string,
}

WorkflowExecution = {
  id: string,
  startTime: datetime,
  endTime: datetime | null,
  status: "Running" | "Completed" | "Failed" | "Paused",
  triggeredBy: Trigger,
  stepExecutions: StepExecution[],
  inputs: object,
  outputs: object,
  error: string | null,
}

StepExecution = {
  id: string,
  stepId: string,
  startTime: datetime,
  endTime: datetime | null,
  status: "Pending" | "Running" | "Completed" | "Failed" | "Waiting for Approval",
  input: object,
  output: object,
  error: string | null,
  result: object,
}
```

---

### 2.2 Workflow Examples

#### Workflow 1: Weekly Social Content Pipeline

```
Name: "Generate & Schedule Weekly Social Content"
Trigger: Every Monday at 9:00 AM
Steps:

STEP 1: Get This Week's Plan
├─ Action: QueryData
├─ Query: "Get approved social plan for this week"
├─ Output: weeklyPlan

STEP 2: Branch - Do We Have Plan?
├─ Condition: weeklyPlan != null
├─ If YES → Continue to Step 3
└─ If NO → Skip to Step 7 (send alert)

STEP 3: Generate Content (Parallel execution)
├─ For each social platform (Instagram, LinkedIn, TikTok, Twitter):
│  ├─ Action: GenerateContent
│  ├─ Input:
│  │  ├─ Platform: (Instagram/LinkedIn/etc)
│  │  ├─ ContentPillar: weeklyPlan.pillar
│  │  ├─ Tone: client.brandVoice
│  │  ├─ Audience: weeklyPlan.targetAudience
│  │  └─ Count: weeklyPlan.platforms[platform].postsThisWeek
│  └─ Output: generatedPosts[platform]

STEP 4: Create Review Tasks (Parallel)
├─ For each platform:
│  ├─ Action: CreateTask
│  ├─ Input:
│  │  ├─ Title: "Review [Platform] posts for this week"
│  │  ├─ Description: Generated posts attached
│  │  ├─ AssignedTo: team member tagged "[Platform] specialist"
│  │  ├─ DueDate: Tomorrow at 2pm
│  │  └─ Approver: account manager
│  └─ Output: reviewTasks[platform]

STEP 5: Wait for Approval
├─ Action: WaitForApproval
├─ Wait for all reviewTasks to be approved
├─ Timeout: 24 hours
├─ OnTimeout: "Send reminder to reviewer"

STEP 6: Schedule Posts
├─ Condition: All tasks approved
├─ Action: PublishContent
├─ Input:
│  ├─ Platform: [each platform]
│  ├─ Content: approved generatedPosts
│  ├─ ScheduleTimes: weeklyPlan.bestTimes[platform]
│  └─ ScheduleDates: dates for this week
├─ Output: scheduledPosts

STEP 7: Send Summary
├─ Action: SendNotification
├─ To: [account manager, client contact]
├─ Message: "This week's social content scheduled: X posts across Y platforms"
├─ Attachment: Schedule summary

STEP 8: Log Execution
├─ Action: Log
├─ Log: {
│    workflow: "Weekly Social Content",
│    timestamp: now,
│    postsGenerated: count,
│    platformsCovered: array,
│    status: "Complete"
│  }

END WORKFLOW
```

---

#### Workflow 2: Performance-Based Content Regeneration

```
Name: "Detect & Regenerate Underperforming Content"
Trigger: Data trigger (engagement < 2% for 3 hours)
Steps:

STEP 1: Get Current Campaign Metrics
├─ Action: QueryData
├─ Query: "Get last 3 hours of campaign performance"
├─ Output: metrics

STEP 2: Identify Underperformers
├─ Action: CompareData
├─ Compare: metrics vs. plan.targetMetrics
├─ Filter: Only items < 70% of target
├─ Output: underperformingContent

STEP 3: Branch - Any Problems?
├─ Condition: underperformingContent.length > 0
├─ If YES → Continue
└─ If NO → End workflow (no issues)

STEP 4: Analyze Root Cause
├─ Action: GenerateContent (Analytical)
├─ Input: 
│  ├─ FailedContent: underperformingContent
│  ├─ TargetMetrics: plan.targetMetrics
│  ├─ Audience: client.targetAudience
│  └─ CompetitorLandscape: competitor analysis
├─ Prompt: "Analyze why this content underperformed. What should we change?"
├─ Output: analysis {
│    rootCauses: ["copy too long", "headline not compelling"],
│    recommendations: ["make copy shorter", "use power words"],
│    newVariations: [suggested alternatives]
│  }

STEP 5: Generate New Variations
├─ Action: GenerateContent
├─ Input:
│  ├─ OriginalContent: underperformingContent
│  ├─ Changes: analysis.recommendations
│  ├─ Tone: client.brandVoice
│  └─ Platform: original platform
├─ Output: newVariations

STEP 6: Create Regeneration Task
├─ Action: CreateTask
├─ Input:
│  ├─ Title: "Review regenerated content for [client]"
│  ├─ Priority: High
│  ├─ Description: "Original performed at X%, below target of Y%. New variations:"
│  ├─ Attachments: originalContent, newVariations, analysis
│  ├─ AssignedTo: platform specialist
│  ├─ DueDate: 2 hours
│  └─ Approver: manager
├─ Output: reviewTask

STEP 7: Wait for Approval
├─ Action: WaitForApproval
├─ Timeout: 2 hours
├─ OnTimeout: Escalate

STEP 8: Publish New Content
├─ Condition: Task approved
├─ Action: PublishContent
├─ Input:
│  ├─ Content: approved newVariations
│  ├─ Platform: underperformingContent.platform
│  ├─ ScheduleMode: Immediate or staggered
│  └─ ReplaceOriginal: false (A/B test)

STEP 9: Monitor New Content
├─ Action: SetDataTrigger
├─ New trigger: "Monitor these specific posts for 6 hours"
├─ If improved → End successfully
├─ If still poor → Trigger this workflow again (Step 4)

STEP 10: Send Report
├─ Action: SendNotification
├─ To: Account manager, client
├─ Message: "Detected underperformance, regenerated content, publishing now"
├─ Include: metrics comparison, new content, timeline

END WORKFLOW
```

---

#### Workflow 3: Weekly Performance Review & Recommendations

```
Name: "Weekly Campaign Review & Recommendations"
Trigger: Every Friday at 5:00 PM
Steps:

STEP 1: Fetch Weekly Metrics
├─ Action: QueryData
├─ Query: "Get all active campaigns, last 7 days metrics"
├─ Output: campaignMetrics []

STEP 2: Aggregate Data
├─ Action: AggregateMetrics
├─ Input: campaignMetrics
├─ Aggregations:
│  ├─ Total reach
│  ├─ Total engagement
│  ├─ Average CTR
│  ├─ Total conversions
│  ├─ Average ROAS
│  └─ Cost per result
├─ Output: weeklyStats

STEP 3: Compare to Targets
├─ Action: CompareData
├─ Compare: weeklyStats vs. plan.targetMetrics
├─ Calculate: % of target achieved
├─ Output: performanceAnalysis {
│    channelPerformance: [{channel, achieved%, trend}],
│    topPerformers: [best 3 content pieces],
│    underperformers: [worst 3 content pieces],
│    opportunities: [quick wins to improve],
│  }

STEP 4: Generate AI Recommendations
├─ Action: GenerateContent (Strategic Analysis)
├─ Input:
│  ├─ PerformanceData: performanceAnalysis
│  ├─ Campaign: campaign context
│  ├─ ClientHistory: past campaign results
│  └─ Competitors: competitor benchmarks
├─ Prompt: "Given this week's performance, what 3 things should we do next week?"
├─ Output: recommendations {
│    whatWorked: ["reels getting 5% engagement"],
│    whatDidntWork: ["text-only posts getting < 1%"],
│    nextSteps: [
│      "Increase reels to 60% of weekly content",
│      "Test carousel posts with CTAs",
│      "Boost Tuesday posts at 2pm (highest engagement time)"
│    ],
│    rationale: detailed explanation
│  }

STEP 5: Create Review Task
├─ Action: CreateTask
├─ Input:
│  ├─ Title: "Weekly Review: [Client] Campaign Performance"
│  ├─ Description: performanceAnalysis + recommendations
│  ├─ AssignedTo: account manager
│  ├─ DueDate: Monday 9am
│  ├─ Priority: Medium
│  └─ RelatedClient: campaign.client
├─ Output: reviewTask

STEP 6: Send Client Report
├─ Action: SendEmail
├─ To: client.contacts
├─ Template: "Weekly Performance Report"
├─ Content:
│  ├─ This week's metrics (vs. target)
│  ├─ Top performing content
│  ├─ Key insights
│  ├─ Recommendations
│  └─ Plan for next week
├─ Attachment: Detailed metrics PDF

STEP 7: Send Team Summary
├─ Action: SendNotification
├─ To: #campaign-channel (Slack)
├─ Message: "Weekly review complete. [X] campaigns reviewed, recommendations posted"
├─ Include: Quick summary of top 3 recommendations

STEP 8: Log & Store
├─ Action: UpdateDatabase
├─ Store:
│  ├─ Weekly performance snapshot
│  ├─ Recommendations
│  ├─ Team performance
│  └─ ROI tracking

END WORKFLOW
```

---

## LAYER 3: ACTION TYPES (What Actually Happens)

### 3.1 Content Generation Actions

```typescript
GenerateContentAction = {
  type: "GenerateContent",
  
  config: {
    model: "claude-3-5-sonnet", // Which Claude model
    
    // Context
    clientProfile: ClientProfile,
    platformContext: string, // "Instagram", "LinkedIn", "Email", etc.
    contentType: string, // "Caption", "Article", "Ad Copy", etc.
    
    // Specifications
    tone: string, // "Professional", "Casual", "Witty"
    length: string, // "Short (50 words)", "Medium (150 words)"
    targetAudience: string,
    keyMessages: string[],
    
    // Constraints
    includeCTA: boolean,
    hashtagCount: number | null,
    emojisAllowed: boolean,
    
    // Generation
    count: number, // Generate N variations
    temperature: number, // 0.3 (deterministic) to 1.0 (creative)
    
    // Output
    formatOutput: "Markdown" | "JSON" | "HTML",
  },
  
  // Results
  outputs: {
    generatedContent: string[],
    tokens_used: number,
    generation_time: number,
  }
}

// In workflow:
STEP: GenerateContent
├─ Action: GenerateContent
├─ Config:
│  ├─ clientProfile: task.relatedClient
│  ├─ platformContext: "Instagram"
│  ├─ contentType: "Caption"
│  ├─ tone: client.brandVoice.tone
│  ├─ length: "Short"
│  ├─ targetAudience: "18-35, fashion-interested"
│  ├─ keyMessages: ["New collection launch", "Limited time"]
│  ├─ count: 5
│  └─ temperature: 0.7
└─ Output: generatedCaptions[]
```

---

### 3.2 Task Management Actions

```typescript
CreateTaskAction = {
  type: "CreateTask",
  
  config: {
    title: string,
    description: string,
    taskType: TaskType,
    
    // Assignment
    assignedTo: TeamMember | "AutoRoute", // Auto-route based on skills
    suggestedFor: TeamMember[] | null,
    approver: TeamMember | "Manager",
    
    // Timeline
    dueDate: date,
    priority: "Low" | "Medium" | "High" | "Urgent",
    
    // Context
    relatedClient: ClientProfile,
    relatedPlan: Plan | null,
    originatedFromWorkflow: Workflow,
    
    // Specifications
    requirements: Requirement[],
    acceptanceCriteria: string[],
    tags: Tag[],
    
    // Dependencies
    dependsOn: Task[] | null,
    blockedBy: Task[] | null,
  },
  
  outputs: {
    createdTask: Task,
    assignmentStatus: "Assigned" | "Pending" | "Needs Reassignment",
  }
}

UpdateTaskAction = {
  type: "UpdateTask",
  
  config: {
    taskId: string,
    updates: {
      status?: string,
      assignedTo?: TeamMember,
      dueDate?: date,
      description?: string,
      tags?: Tag[],
      customFields?: { [key: string]: any },
    },
  },
  
  outputs: {
    updatedTask: Task,
    changesApplied: string[],
  }
}

AssignTaskAction = {
  type: "AssignTask",
  
  config: {
    taskId: string,
    
    // Assignment strategy
    strategy: "Specific" | "AutoRoute" | "RoundRobin" | "Available",
    
    specificAssignee: TeamMember | null,
    
    // Routing criteria (if AutoRoute)
    requiredSkills: string[],
    requiredExperience: "Any" | "Junior" | "Mid" | "Senior",
    availabilityConstraint: "FullDay" | "PartDay" | "Anytime",
    
    // Notification
    notifyAssignee: boolean,
    notificationChannel: "Slack" | "Email" | "InApp" | "All",
  },
  
  outputs: {
    assignedTo: TeamMember,
    alternativeOptions: TeamMember[],
    notificationSent: boolean,
  }
}
```

---

### 3.3 Publishing Actions

```typescript
PublishContentAction = {
  type: "PublishContent",
  
  config: {
    platform: "Instagram" | "LinkedIn" | "Twitter" | "Facebook" | "TikTok" | "Email",
    
    content: {
      text: string,
      images: File[] | null,
      video: File | null,
      links: Link[] | null,
    },
    
    // Scheduling
    publishMode: "Immediate" | "Scheduled" | "Queue",
    scheduleTime: datetime | null,
    scheduleOptimal: boolean, // Use platform's best time
    
    // Targeting (Platform-specific)
    targetAudience: string | null,
    
    // Engagement
    includeCTA: boolean,
    enableComments: boolean,
    enableSharing: boolean,
    
    // Tracking
    trackMetrics: boolean,
    trackingTags: string[],
    utmParameters: object | null,
  },
  
  outputs: {
    publishedContent: {
      postId: string,
      platform: string,
      publishedAt: datetime,
      url: string,
    }[],
    scheduledFor: datetime | null,
  }
}
```

---

### 3.4 Notification Actions

```typescript
SendNotificationAction = {
  type: "SendNotification",
  
  config: {
    // Recipients
    recipients: TeamMember[] | TeamMember["communicationChannels"],
    
    // Channel
    channels: ("Slack" | "Email" | "InApp" | "SMS")[] | "Preferred",
    
    // Content
    title: string,
    message: string,
    icon: string | null,
    priority: "Normal" | "High" | "Urgent",
    
    // Context
    relatedEntity: Task | Plan | Campaign | null,
    actionButton: {
      label: string,
      link: string,
    } | null,
    
    // Delivery
    sendDelay: {
      value: number,
      unit: "minutes" | "hours",
    } | null, // Wait before sending
  },
  
  outputs: {
    notificationsSent: number,
    deliveredTo: {
      channel: string,
      recipient: string,
      status: "Sent" | "Failed" | "Bounced",
    }[],
  }
}

SendEmailAction = {
  type: "SendEmail",
  
  config: {
    recipients: string[], // Email addresses
    
    // Email content
    subject: string,
    template: string | null, // Pre-built template name
    customHtml: string | null,
    
    // Variables for template
    variables: { [key: string]: any },
    
    // Attachments
    attachments: {
      filename: string,
      content: File | base64,
    }[] | null,
    
    // Tracking
    trackOpens: boolean,
    trackClicks: boolean,
    utm_source: string | null,
    
    // Scheduling
    sendAt: datetime | null,
    
    // Follow-up
    autoFollowupOnNoOpen: {
      enabled: boolean,
      delayHours: number,
    } | null,
  },
  
  outputs: {
    emailsSent: number,
    recipients: string[],
    messageIds: string[],
  }
}
```

---

## LAYER 4: LEARNING & OPTIMIZATION

### 4.1 Workflow Success Tracking

```typescript
WorkflowPerformance = {
  workflowId: string,
  
  // Execution Stats
  totalExecutions: number,
  successfulExecutions: number,
  failedExecutions: number,
  successRate: number, // %
  
  // Timing
  averageExecutionTime: number, // minutes
  fastestExecution: number,
  slowestExecution: number,
  
  // Specific Outcomes (Example: Content generation workflow)
  contentQuality: {
    approvalRate: number, // % of generated content approved on first try
    revisionRate: number, // % requiring changes
    averageRevisionsPerContent: number,
  },
  
  // Business Impact
  businessResults: {
    totalOutputsGenerated: number,
    totalPublished: number,
    averageEngagementRate: number,
    averageConversionRate: number,
    totalROI: number,
  },
  
  // Issues
  commonErrors: {
    error: string,
    frequency: number,
  }[],
  
  // Timeline
  createdAt: datetime,
  lastExecuted: datetime,
  executionHistory: WorkflowExecution[],
}

// System learns:
// - Which workflows work for which client types
// - Which workflows generate best ROI
// - Which workflows have highest approval rates
// - When workflows fail and why
// - Which steps take longest and could be optimized
```

---

## COMPLETE AUTOMATION EXAMPLE: E-COMMERCE PRODUCT LAUNCH

### Trigger: Admin clicks "Launch Q3 Campaign"

```
DAY 0 (Launch Day - 10:00 AM)
│
├─ WORKFLOW 1: Campaign Setup (Immediate)
│  ├─ Create project
│  ├─ Create communication channel
│  ├─ Notify team
│  └─ Generate marketing calendar
│
├─ WORKFLOW 2: Content Generation (Parallel, 30 min)
│  ├─ Generate 50 social media captions
│  ├─ Generate 10 email copy variations
│  ├─ Generate 5 ad headlines per platform
│  └─ Create tasks for review
│
└─ WORKFLOW 3: Design Requests (Parallel, 30 min)
   ├─ Create design tasks for graphics
   ├─ Create design tasks for email templates
   ├─ Assign to designers
   └─ Set due dates for next day

DAY 1 (Review & Approval - Business Hours)
│
├─ WORKFLOW 4: Content Review (Sequential)
│  ├─ Team reviews generated content
│  ├─ System tracks approval rate
│  ├─ Rejected items → regeneration workflow
│  └─ Approved items → published queue
│
├─ WORKFLOW 5: Design Review (Sequential)
│  ├─ Designs delivered
│  ├─ Manager approves
│  └─ Approved designs attach to content
│
└─ WORKFLOW 6: Campaign Setup (After approvals)
   ├─ Create platform-specific posts
   ├─ Prepare email sequences
   ├─ Setup ad campaigns
   └─ Generate preview links

DAY 2 (Launch - Specific Times Per Platform)
│
├─ WORKFLOW 7: Content Publishing (Time-based, Parallel)
│  ├─ 8:00 AM - Instagram posts (3x daily, best times)
│  ├─ 9:00 AM - LinkedIn posts
│  ├─ 9:30 AM - Email blast (morning audience)
│  ├─ 11:00 AM - TikTok posts
│  ├─ 2:00 PM - Instagram stories
│  ├─ 3:00 PM - Email 2 (afternoon re-engagement)
│  └─ 5:00 PM - Ads go live across platforms
│
├─ WORKFLOW 8: Launch Monitoring (Immediate)
│  ├─ Track metrics every 15 minutes
│  ├─ Alert if engagement < 1%
│  ├─ Alert if errors detected
│  └─ Send real-time updates to Slack
│
└─ WORKFLOW 9: Team Notifications (Throughout day)
   └─ Status updates to team & client every 2 hours

DAYS 3-7 (Optimization)
│
├─ WORKFLOW 10: Daily Monitoring (Data-triggered)
│  ├─ Check metrics every hour
│  ├─ Identify underperformers
│  └─ Trigger regeneration for bottom 10%
│
├─ WORKFLOW 11: A/B Testing (Event-triggered)
│  ├─ If engagement > 3% on post type X
│  ├─ Increase X in content mix
│  └─ Create new variations of X
│
├─ WORKFLOW 12: Budget Optimization (Data-triggered)
│  ├─ If ROAS > 3x, increase ad budget
│  ├─ If ROAS < 1x, pause and regenerate
│  └─ Reallocate budget to winners
│
└─ WORKFLOW 13: Daily Reports (Time-triggered - 5:00 PM)
   ├─ Compile day's performance
   ├─ Identify trends
   ├─ Make recommendations
   └─ Send to client & team

WEEK 2+ (Sustained Operations)
│
├─ WORKFLOW 14: Weekly Review (Every Friday 5 PM)
│  ├─ Comprehensive performance analysis
│  ├─ ROI calculation
│  ├─ Strategy recommendations
│  └─ Plan next week's content
│
├─ WORKFLOW 15: Content Refresh (If performance dips)
│  ├─ Regenerate underperforming content
│  ├─ Test new angles
│  └─ Update campaign strategy
│
└─ WORKFLOW 16: Team Retrospective (Weekly)
   ├─ What worked?
   ├─ What didn't?
   └─ What to improve next campaign?
```

**Result:** 
- Campaign runs mostly on autopilot
- Team focuses on strategy, not execution
- System continuously optimizes
- Every decision is data-driven
- Client sees updates without asking

---

## ADVANCED FEATURES

### Conditional Branching

```
If engagement > target:
  └─ Boost budget 20%

Else if engagement < 50% of target:
  └─ Pause ads, regenerate content, re-launch

Else if engagement 50-75% of target:
  └─ Run weekly optimization, don't change budget

Else if engagement 75-90% of target:
  └─ Small budget increase (5%), monitor closely

Else:
  └─ Maintain current settings, celebrate success
```

### Parallel vs. Sequential Execution

```
PARALLEL (All run at same time):
├─ Generate Instagram content
├─ Generate LinkedIn content
├─ Generate Email content
└─ Generate Ad copy
(Total time: ~5 min)

SEQUENTIAL (Wait for each):
├─ Generate content
├─ Wait for approval
├─ Create tasks
├─ Wait for design
├─ Create publishing tasks
└─ Wait for final approval
(Total time: ~2-3 days)

MIXED (Smart combination):
├─ PARALLEL: Generate content for all platforms
├─ PARALLEL: Create review tasks for all platforms
├─ WAIT: All approvals
├─ PARALLEL: Publish when ready
(Total time: ~1 day, optimized)
```

### Error Handling

```
If step fails:

Option 1: STOP
└─ Entire workflow stops
└─ Admin notified
└─ Manual intervention required

Option 2: CONTINUE
└─ Log error
└─ Skip this step
└─ Continue with next step

Option 3: RETRY
└─ Retry step 3 times
└─ Wait 5 minutes between retries
└─ If still fails, escalate

Option 4: ESCALATE
└─ Notify manager
└─ Create task for manual resolution
└─ Workflow pauses
└─ Resumes when task complete
```

---

## LAUNCH ROADMAP

```
WEEK 10: Automation Engine Foundation
├─ Trigger system (time + event)
├─ Workflow builder UI
└─ Basic action library (5-10 actions)

WEEK 11: Advanced Workflows
├─ Conditional logic
├─ Parallel execution
├─ Approval workflows
└─ Complex automation examples

WEEK 12: Learning & Optimization
├─ Performance tracking
├─ Success metrics dashboard
├─ Auto-optimization engine
└─ Recommendation system

WEEK 13: Full Integration
├─ Connect to content generation
├─ Connect to task manager
├─ Connect to publishing platforms
└─ Connect to analytics

RESULT: Self-operating system ready for real campaigns
```

---

## THE POWER OF THIS APPROACH

**Without automation:**
- Account manager: 40 hours/week on manual tasks
- Creative team: 30 hours/week on reviews and revisions
- Publishing: 10 hours/week on scheduling
- Reporting: 8 hours/week on metrics
- **Total: 88 hours/week per campaign**

**With OPUS automation:**
- System handles: Content generation, task routing, publishing, monitoring, optimization
- Team focuses on: Strategy, quality review, creative direction, client communication
- **Total: 15-20 hours/week per campaign**
- **Savings: 70 hours/week = 3.5 team members freed up**

**Financial impact:**
- 3.5 people @ $60K/year = $210K savings
- Plus: Faster execution, better results, 24/7 monitoring
- **Annual value: $250K+**

This is why automation is worth building properly.
