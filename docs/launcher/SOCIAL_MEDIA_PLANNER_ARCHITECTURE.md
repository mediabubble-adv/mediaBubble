# Social Media Planner & Brand DNA Architecture

## MediaBubble Platform Extension

**Module Name:** Social Media Planner + Brand DNA Management  
**Scope:** Client profiles integration, bilingual content planning, AI-assisted workflows  
**Timeline:** Weeks 6-9 (Phase 2)  
**Status:** Design Phase

---

## Executive Overview

The Social Media Planner enables MediaBubble to create, schedule, and execute social media campaigns for clients with:

1. **Brand DNA Repository** - Store client brand identity (voice, values, visual guidelines)
2. **Bilingual Planning** - English + Egyptian Arabic (Masri dialect) content
3. **AI-Assisted Creation** - Generate content ideas, captions, hashtags
4. **Human-in-Loop Generation** - AI proposes, employees review/approve → triggers image generation
5. **Content Calendar** - Visual planning across platforms (Instagram, Facebook, TikTok, LinkedIn, Twitter/X)
6. **Approval Workflows** - Client approval before posting
7. **Performance Analytics** - Track engagement per platform

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Social Media Planner                       │
├─────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Brand DNA    │  │ Content      │  │ Calendar &   │       │
│  │ Manager      │  │ Planner      │  │ Scheduler    │       │
│  │              │  │              │  │              │       │
│  │ - Voice      │  │ - AI Ideas   │  │ - Multi-     │       │
│  │ - Values     │  │ - Bilingual  │  │   platform   │       │
│  │ - Visuals    │  │ - Captions   │  │ - Approval   │       │
│  │ - Guidelines │  │ - Hashtags   │  │ - Scheduling │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         ▲                    ▲                    ▲            │
│         │                    │                    │            │
│    Client Profiles      Human-in-Loop       Publishing        │
│    & Brand Assets       Review Tasks        & Analytics        │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Image Gen    │  │ Workflow     │  │ Analytics &  │       │
│  │ Tasks        │  │ Engine       │  │ Reporting    │       │
│  │              │  │              │  │              │       │
│  │ - Prompt     │  │ - Triggers   │  │ - Reach      │       │
│  │   queues     │  │ - Actions    │  │ - Engagement │       │
│  │ - Employee   │  │ - Approval   │  │ - Sentiment  │       │
│  │   assignments│  │   gates      │  │ - ROI        │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Module 1: Brand DNA Manager

### Purpose

Store and manage client brand identity to ensure consistency across all social media content.

### Data Model

```sql
-- Brand DNA for each client profile
CREATE TABLE brand_dna (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),

  -- Brand Voice
  brand_voice_en TEXT, -- English brand voice guide
  brand_voice_ar TEXT, -- Arabic/Masri brand voice guide
  brand_tone VARCHAR(50), -- Professional, Casual, Friendly, Authoritative, etc

  -- Brand Values
  values TEXT[], -- ['Innovation', 'Authenticity', 'Sustainability']
  mission_en TEXT,
  mission_ar TEXT,
  vision_en TEXT,
  vision_ar TEXT,

  -- Visual Guidelines
  primary_color VARCHAR(7), -- Hex color
  secondary_colors VARCHAR(7)[], -- Array of hex colors
  logo_url TEXT,
  brand_font_primary VARCHAR(100),
  brand_font_secondary VARCHAR(100),
  style_guide_url TEXT, -- Link to full PDF/Figma

  -- Audience Profile
  target_audience_en TEXT,
  target_audience_ar TEXT,
  audience_segments JSONB, -- { demographics, interests, pain_points }

  -- Do's & Don'ts
  do_guidelines TEXT[],
  dont_guidelines TEXT[],

  -- Hashtags & Keywords
  branded_hashtags TEXT[],
  campaign_hashtags TEXT[],
  seo_keywords TEXT[],

  -- Language Preferences
  default_language VARCHAR(2), -- 'en' or 'ar'
  support_bilingual BOOLEAN DEFAULT true,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(client_id)
);

-- Brand DNA versions for audit trail
CREATE TABLE brand_dna_versions (
  id UUID PRIMARY KEY,
  brand_dna_id UUID REFERENCES brand_dna(id),
  version_number INTEGER,
  changes JSONB, -- What changed
  changed_by UUID REFERENCES users(id),
  changed_at TIMESTAMP,
  reason VARCHAR(255) -- Why it changed
);
```

### API Endpoints

**Endpoints:**

- `POST /api/social/brand-dna` - Create Brand DNA
- `GET /api/social/brand-dna/:clientId` - Get Brand DNA
- `PATCH /api/social/brand-dna/:id` - Update Brand DNA
- `GET /api/social/brand-dna/:id/versions` - Version history
- `POST /api/social/brand-dna/:id/versions/:versionId/restore` - Restore version

### UI Components

**Brand DNA Manager Page:**

- Tab 1: Brand Voice (English + Arabic)
  - Text editor for brand voice descriptions
  - Tone selector (dropdown)
  - Example captions for each tone
- Tab 2: Brand Values
  - Mission/Vision statements (bilingual)
  - Value tags with descriptions
  - Visual icons for each value
- Tab 3: Visual Guidelines
  - Color picker (primary + secondary)
  - Logo upload
  - Font selector
  - Link to Figma/PDF style guide
- Tab 4: Audience Profile
  - Target audience description (bilingual)
  - Audience segments (JSON editor or form)
  - Demographics breakdown
- Tab 5: Guidelines
  - Do's & Don'ts lists (editable)
  - Hashtags management
  - Keywords & SEO terms
- Version History sidebar
  - Show all changes with timestamps
  - Restore previous versions with confirmation

---

## Module 2: Content Planner (Bilingual)

### Purpose

Plan social media content across platforms in English and Egyptian Arabic (Masri dialect).

### Data Model

```sql
-- Content pieces (individual posts)
CREATE TABLE social_content (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  campaign_id UUID REFERENCES social_campaigns(id),

  -- Content Metadata
  platform VARCHAR(50), -- 'instagram', 'facebook', 'tiktok', 'linkedin', 'twitter'
  content_type VARCHAR(50), -- 'image', 'video', 'carousel', 'reel', 'text'

  -- English Content
  title_en VARCHAR(255),
  caption_en TEXT,
  hashtags_en TEXT[],
  cta_en VARCHAR(100), -- Call to action

  -- Arabic (Masri) Content
  title_ar VARCHAR(255),
  caption_ar TEXT,
  hashtags_ar TEXT[],
  cta_ar VARCHAR(100),

  -- Media
  media_urls TEXT[], -- Image or video URLs
  thumbnail_url TEXT,
  alt_text_en VARCHAR(255),
  alt_text_ar VARCHAR(255),

  -- Scheduling
  scheduled_date DATE,
  scheduled_time TIME,
  timezone VARCHAR(50), -- 'Africa/Cairo' for Egypt

  -- Status Workflow
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Awaiting Review, Approved, Scheduled, Published, Failed
  created_by UUID REFERENCES users(id),
  reviewed_by UUID REFERENCES users(id),
  client_approved_by UUID REFERENCES users(id), -- Client approval

  -- Analytics
  published_at TIMESTAMP,
  reach INTEGER DEFAULT 0,
  engagement INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,

  -- Approval
  needs_client_approval BOOLEAN DEFAULT true,
  client_approval_deadline TIMESTAMP,
  client_feedback TEXT,

  -- Image Generation
  image_generation_status VARCHAR(50), -- 'Not Needed', 'Pending', 'Generated', 'Approved'
  image_generation_prompt TEXT, -- AI-generated prompt for image tool
  generated_image_url TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns group related content
CREATE TABLE social_campaigns (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  brand_dna_id UUID REFERENCES brand_dna(id),

  -- Campaign Details
  start_date DATE,
  end_date DATE,
  objective VARCHAR(100), -- 'Awareness', 'Traffic', 'Leads', 'Sales', 'Community'
  budget DECIMAL(10,2),

  -- Platforms
  platforms VARCHAR(50)[], -- ['instagram', 'facebook', 'tiktok']

  -- Status
  status VARCHAR(50) DEFAULT 'Planning', -- Planning, Active, Paused, Completed

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content approval workflow
CREATE TABLE social_approvals (
  id UUID PRIMARY KEY,
  content_id UUID NOT NULL REFERENCES social_content(id),
  approver_id UUID NOT NULL REFERENCES users(id),
  approval_type VARCHAR(50), -- 'internal', 'client'

  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Approved, Rejected
  feedback TEXT,
  requested_changes JSONB,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,

  UNIQUE(content_id, approver_id)
);
```

### API Endpoints

**Content CRUD:**

- `POST /api/social/content` - Create content
- `GET /api/social/content/:clientId` - List content with filters
- `GET /api/social/content/:id` - Get content detail
- `PATCH /api/social/content/:id` - Update content
- `DELETE /api/social/content/:id` - Delete content

**Bilingual:**

- `POST /api/social/content/:id/translate` - Auto-translate caption (EN ↔ AR)
- `GET /api/social/content/:id/language-check` - Validate Arabic/Masri spelling

**Campaign:**

- `POST /api/social/campaigns` - Create campaign
- `GET /api/social/campaigns/:clientId` - List campaigns
- `PATCH /api/social/campaigns/:id` - Update campaign

**Approval:**

- `POST /api/social/approvals` - Submit for approval
- `PATCH /api/social/approvals/:id/approve` - Approve content
- `PATCH /api/social/approvals/:id/reject` - Reject with feedback
- `GET /api/social/content/:id/approval-status` - Check approval status

### UI Components

**Content Planner Page:**

- Content Calendar (visual grid)
  - X-axis: Days (or weeks)
  - Y-axis: Platforms (Instagram, Facebook, TikTok, etc)
  - Cards show content preview with language indicator (EN/AR/both)
- Content Editor
  - Tab for English (title, caption, hashtags, CTA)
  - Tab for Arabic/Masri (same fields)
  - Side-by-side preview
  - Character counter per platform
- Media & Generation
  - Upload media button
  - AI-suggested images section
  - "Generate image" button → triggers task
- Scheduling
  - Date/time picker with timezone
  - Optimal posting time suggestions per platform
  - Bulk schedule action
- Approval Workflow
  - "Submit for Review" button
  - Approval status badges
  - Client feedback section
  - Revision request UI

**Content Calendar View:**

- Week/Month view selector
- Drag-and-drop to reschedule
- Color-coding by platform
- Filter by language (EN/AR/Bilingual)
- Filter by status (Draft/Review/Approved/Published)

---

## Module 3: Image Generation Task System

### Purpose

Create human-in-loop workflow where AI proposes image captions, employees review, then trigger automated image generation.

### Data Model

```sql
-- Image generation task queue
CREATE TABLE image_generation_tasks (
  id UUID PRIMARY KEY,
  content_id UUID NOT NULL REFERENCES social_content(id),

  -- AI-Generated Prompt
  ai_generated_prompt TEXT, -- Claude-generated prompt
  prompt_confidence DECIMAL(3,2), -- 0.0-1.0 confidence score

  -- Task Status
  status VARCHAR(50) DEFAULT 'Awaiting Review', -- Awaiting Review, Approved, Rejected, Generating, Complete, Failed

  -- Human Review
  assigned_to UUID REFERENCES users(id), -- Designer/content person
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  review_feedback TEXT,

  -- Generation
  generation_attempt INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  image_generation_provider VARCHAR(50), -- 'midjourney', 'dall-e', 'firefly', 'stable-diffusion'
  generated_image_url TEXT,
  generation_cost DECIMAL(5,2), -- Track cost per image

  -- Approval
  approved_for_posting BOOLEAN DEFAULT false,
  approved_at TIMESTAMP,
  approved_by UUID REFERENCES users(id),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Image generation queue for batch processing
CREATE TABLE image_generation_queue (
  id UUID PRIMARY KEY,
  task_id UUID REFERENCES image_generation_tasks(id),

  status VARCHAR(50) DEFAULT 'Queued', -- Queued, Processing, Complete, Error
  position_in_queue INTEGER,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processing_started_at TIMESTAMP,
  completed_at TIMESTAMP,
  error_message TEXT
);

-- Image versions & A/B test support
CREATE TABLE image_variations (
  id UUID PRIMARY KEY,
  task_id UUID REFERENCES image_generation_tasks(id),

  variation_number INTEGER, -- 1, 2, 3 (multiple versions per task)
  image_url TEXT,
  generation_seed INTEGER, -- For reproducibility

  performance_metrics JSONB, -- { reach, engagement, ctr }
  preferred BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Workflow

```
1. Content Planner creates social content
   ↓
2. AI generates image caption/prompt (Claude)
   - Context: Brand DNA + platform + content
   - Output: Detailed image generation prompt
   ↓
3. Task created: "Approve image prompt"
   - Assigned to: Designer / Content Lead
   - They review AI prompt
   ↓
4. Designer Decision
   ┌─────────────────────────────────┐
   │  Approve? or Revise?            │
   └─────────────────────────────────┘
       ↓                    ↓
   APPROVE              REVISE
   (proceed)         (return to step 2)
       ↓
5. Image generation triggered
   - Use approved prompt
   - Firefly / Midjourney / DALL-E
   - Generate 3 variations
   ↓
6. Review generated images
   - Select preferred version
   - Or re-generate with tweaks
   ↓
7. Approve for posting
   - Image attached to content
   - Content now "Ready to Publish"
   ↓
8. Publish to platform(s)
```

### API Endpoints

**Task Management:**

- `POST /api/social/image-tasks` - Create task from content
- `GET /api/social/image-tasks` - List tasks (with filters: assigned_to, status)
- `PATCH /api/social/image-tasks/:id/assign` - Assign to employee
- `PATCH /api/social/image-tasks/:id/approve` - Approve prompt
- `PATCH /api/social/image-tasks/:id/reject` - Reject + provide feedback
- `PATCH /api/social/image-tasks/:id/generate` - Trigger image generation

**Generation:**

- `POST /api/social/image-tasks/:id/generate-variations` - Create 3 variations
- `PATCH /api/social/image-tasks/:id/select-variation` - Mark as preferred
- `GET /api/social/image-tasks/:id/queue-status` - Check generation status

**Analytics:**

- `GET /api/social/image-tasks/performance` - Performance by task/employee

### UI Components

**Image Generation Dashboard:**

- Task list (My Tasks tab)
  - Shows assigned tasks
  - Status: Awaiting Review, Approved, Generating, Complete
  - Platform icons showing which platforms need images
- Task Detail View
  - Content preview (title, caption, platform)
  - AI-generated prompt (highlighted)
  - Edit prompt option
  - Approve / Reject buttons
- Generation Status
  - Real-time progress bar
  - Queue position indicator
  - Estimated completion time
- Image Variations View
  - Show 3 generated images side-by-side
  - Select preferred option
  - View stats per variation
  - Re-generate button

**Manager Dashboard:**

- Image generation pipeline view
  - Backlog: X tasks awaiting review
  - In Review: Y tasks being reviewed by employees
  - Generating: Z tasks in generation queue
  - Complete: N tasks with images approved
- Employee workload
  - Who has most pending tasks
  - Average task completion time
  - Quality metrics (rejection rate, re-generations)
- Cost tracking
  - Total cost spent on image generation
  - Cost per campaign
  - Cost per employee

---

## Module 4: Calendar & Scheduler

### Purpose

Visual planning across platforms with approval gates and scheduling.

### Features

**Calendar View:**

- Week/Month view with platform columns
- Drag-and-drop to reschedule
- Color-coding by status (Draft/Review/Approved/Published)
- Platform-specific indicators (Instagram = 📷, TikTok = 🎬, etc)

**Scheduling:**

- Optimal posting times per platform
  - Instagram: 6-9pm weekdays
  - TikTok: 6pm-12am
  - LinkedIn: 8-10am weekdays
  - Facebook: 1-3pm and 7-11pm
- Time zone aware
  - Store timezone per campaign
  - Convert scheduling times automatically
- Bulk actions
  - Schedule multiple posts at once
  - Clone previous campaign calendar

**Approval Gate:**

- Status workflow: Draft → Awaiting Review → Approved → Scheduled → Published
- Client approval required
  - Content visible to client in separate portal
  - Client feedback + approval
- Editor/Manager approval
  - Internal team reviews content
  - Brand DNA compliance check

### API Endpoints

- `GET /api/social/calendar/:clientId` - Calendar view data
- `POST /api/social/content/:id/schedule` - Schedule content
- `PATCH /api/social/content/:id/reschedule` - Reschedule
- `POST /api/social/content/bulk-schedule` - Schedule multiple
- `GET /api/social/calendar/optimal-times` - Get posting time suggestions

---

## Module 5: Workflow Integration

### Events Published to Event Bus

```javascript
// When content is created
{
  type: 'social.content.created',
  content_id: 'uuid',
  client_id: 'uuid',
  platforms: ['instagram', 'facebook'],
  requires_image_generation: true
}

// When image task approved
{
  type: 'social.image_task.approved',
  task_id: 'uuid',
  prompt: 'AI-generated image prompt',
  platforms: ['instagram', 'facebook']
}

// When image generated
{
  type: 'social.image.generated',
  task_id: 'uuid',
  image_url: 'https://...',
  variations: ['url1', 'url2', 'url3']
}

// When content approved for posting
{
  type: 'social.content.approved_for_posting',
  content_id: 'uuid',
  scheduled_time: '2026-07-15T18:00:00'
}

// When content published
{
  type: 'social.content.published',
  content_id: 'uuid',
  platforms: ['instagram', 'facebook'],
  published_at: '2026-07-15T18:00:00'
}

// Analytics events
{
  type: 'social.content.metrics_updated',
  content_id: 'uuid',
  reach: 5000,
  engagement: 250,
  clicks: 45
}
```

### Workflow Automation Triggers

**Auto-assign image task:**

```
WHEN: social.content.created AND platform IN (instagram, facebook, tiktok)
AND requires_image_generation = true
THEN:
- Create image_generation_task
- Assign to: Designer team (round-robin)
- Set deadline: 24 hours
- Send notification: "New image task assigned"
```

**Auto-schedule after approval:**

```
WHEN: social.content.approved_for_posting
THEN:
- Update status to 'Scheduled'
- Send to platform scheduler
- Set reminder: 1 hour before posting
```

**Re-queue if generation fails:**

```
WHEN: image_generation_task.status = 'Failed'
AND generation_attempt < max_attempts
THEN:
- Increment generation_attempt
- Move back to Queued
- Add to queue with lower priority
```

---

## Module 6: Bilingual Support (English + Egyptian Arabic Masri)

### Language Features

**Content Creation:**

- Bilingual editor with side-by-side views
- Auto-translate caption (EN → AR) using Claude
  - Prompt includes Brand DNA voice
  - Masri dialect guidelines

**Platform-Specific Handling:**

- English: Primary for global platforms (LinkedIn, Twitter)
- Arabic: Primary for Egyptian audience (Instagram, Facebook)
- Bilingual: Use both for maximum reach
  - Carousel posts with EN/AR versions
  - Stories rotation EN → AR

**Character Limits:**

- Platform-specific character limits per language
  - Instagram caption: 2,200 chars
  - Tweet: 280 chars (EN) vs ~140 chars (AR due to script width)
  - Facebook: No limit but ~125 chars visible
- Character counter shows EN and AR separately

**Hashtag Strategy:**

- English hashtags: #BrandName, #Product, #Campaign
- Arabic hashtags: #اسم_العلامة, #المنتج, #الحملة
- Trending hashtags per market
  - Egyptian trends different from Gulf
  - Real-time trending feed integration

**Alphabet/Script Notes:**

- Arabic Masri dialect:
  - Mix of Modern Standard Arabic (MSA) + Egyptian colloquial
  - Avoid purely MSA for social media (sounds formal)
  - Use Masri for authenticity with Egyptian audience

**Content Calendar Language Filter:**

- Filter by: English only / Arabic only / Bilingual
- Bulk action to convert: Single-language → Bilingual

### Database Additions

```sql
ALTER TABLE social_content ADD COLUMN language_version VARCHAR(50);
  -- 'en_only', 'ar_only', 'bilingual'

ALTER TABLE social_content ADD COLUMN masri_dialect_check BOOLEAN;
  -- Verify Arabic content is Masri (not MSA)

ALTER TABLE brand_dna ADD COLUMN masri_examples TEXT[];
  -- Example Masri phrases in brand voice

ALTER TABLE social_approvals ADD COLUMN language_approved VARCHAR(50)[];
  -- ['en', 'ar'] - which languages approved
```

---

## Implementation Timeline

### Week 6: Brand DNA & Content Planner Core

- [ ] Database schema (Brand DNA, Content, Campaigns)
- [ ] Brand DNA Manager UI
- [ ] Content Editor (basic bilingual)
- [ ] API endpoints for CRUD

### Week 7: Calendar & Scheduling

- [ ] Calendar view component
- [ ] Scheduling logic with optimal times
- [ ] Approval workflow UI
- [ ] Client approval portal

### Week 8: Image Generation System

- [ ] Image task creation from content
- [ ] Task assignment workflow
- [ ] AI prompt generation (Claude integration)
- [ ] Mock image generation endpoint

### Week 9: Integration & Polish

- [ ] Connect to Workflow Automation
- [ ] Event publishing to event bus
- [ ] Bilingual support testing (EN/AR)
- [ ] Performance analytics dashboards
- [ ] Employee training materials

---

## Database Extensions Required

```sql
-- Add to DESIGN_PM_DATABASE_EXTENSIONS.sql

-- Brand DNA
CREATE TABLE brand_dna (...)
CREATE TABLE brand_dna_versions (...)

-- Social Content
CREATE TABLE social_campaigns (...)
CREATE TABLE social_content (...)
CREATE TABLE social_approvals (...)

-- Image Generation
CREATE TABLE image_generation_tasks (...)
CREATE TABLE image_generation_queue (...)
CREATE TABLE image_variations (...)

-- Indexes
CREATE INDEX idx_brand_dna_client_id ON brand_dna(client_id);
CREATE INDEX idx_social_content_client_id ON social_content(client_id);
CREATE INDEX idx_social_content_status ON social_content(status);
CREATE INDEX idx_image_tasks_assigned_to ON image_generation_tasks(assigned_to);
CREATE INDEX idx_image_tasks_status ON image_generation_tasks(status);
```

---

## Integration Points

### With Design & PM Tools

- **Design Projects** → Social Media content
  - Link design assets to social posts
  - Generate social variations from design files
- **Asset Library** → Brand assets
  - Logo + color palette from Asset Library
  - Auto-populate Brand DNA from stored assets

### With Workflow Automation

- Trigger image generation task on content creation
- Auto-schedule posts after approval
- Send notifications on task assignment

### With AI Tools Suite

- Claude API for:
  - Caption generation (EN)
  - Auto-translation to Masri Arabic
  - Hashtag suggestions
  - Image prompts from content
- Image generation:
  - Firefly API for image generation
  - DALL-E as fallback
  - Midjourney for premium quality

### With Task Management

- Image generation tasks appear in Task Management
- Assigned to employees
- Tracked with deadline/priority

---

## Success Metrics

### Phase 2.5 Completion (Week 9)

- [ ] 100% of client profiles have Brand DNA
- [ ] 50+ social content pieces drafted
- [ ] 20+ image generation tasks completed
- [ ] 0 critical bugs in bilingual handling
- [ ] <2s content calendar load time

### 3-Month Usage

- [ ] 200+ social posts published via planner
- [ ] 50% of images generated via automation (vs manual)
- [ ] Average approval time: <24 hours
- [ ] Employee utilization: 100% on assigned tasks
- [ ] Client satisfaction: >4.5/5 on content quality

---

## Security & Compliance

### Permissions

- Designers: Can create content, assign image tasks
- Project Managers: Can view/approve content
- Clients: Can view assigned posts, provide approval
- Admin: Full access

### Data Privacy

- Client Brand DNA: Encrypted, client-only access
- Content: Client-scoped visibility
- Image costs: Tracked per client for billing
- Audit log: All edits/approvals logged

---

## Future Enhancements (Phase 3+)

1. **Social Listening** - Monitor competitor/industry trends
2. **Influencer Management** - Partner with influencers on campaigns
3. **Multi-language Support** - Add French, Spanish, Italian
4. **Paid Ads Integration** - Create ads from social content
5. **Native Platform APIs** - Direct scheduling to Instagram/Facebook/TikTok
6. **AI Copywriting** - Generate multiple caption variations A/B test
7. **Sentiment Analysis** - Auto-moderate comments, detect brand risks
8. **Community Management** - Reply to comments/DMs from planner

---

**Status:** Ready for Phase 2 Implementation  
**Owner:** Dorgham + Social Media Team  
**Created:** June 19, 2026
