# Client Profiles + Brand DNA Architecture
## Lightweight Integration for Design & PM Tools

**Module Name:** Client Profiles with Brand DNA + Task Tagging  
**Scope:** Client context in tasks, brand DNA visibility, team/manager tagging  
**Timeline:** Weeks 5-7 (Phase 2)  
**Status:** Simplified - Ready for Implementation

---

## 📋 Overview

Add **lightweight client profiling** to the existing Design Projects and Task Management apps:
- Client profiles store brand DNA (colors, fonts, voice, guidelines)
- Tasks can be tagged with: client, team members, managers
- Design team sees brand context when working
- PMs see who's assigned to what client work
- Foundation for future social media planning (without building it now)

**What this is NOT:** A separate app, a social media planner, or a client portal.  
**What this IS:** Data layer + UI updates to existing apps.

---

## Architecture

```
┌─────────────────────────────────────────┐
│      Task Management App (existing)      │
├─────────────────────────────────────────┤
│                                         │
│  Task Detail                            │
│  ├── Basic fields (title, description)  │
│  ├── Assigned to: [designers, PMs]      │
│  │                                      │
│  ├── [NEW] CLIENT TAG                   │
│  │   └── Shows Brand DNA quickview      │
│  │       (colors, fonts, voice)         │
│  │                                      │
│  ├── [NEW] TAGGED TEAM MEMBERS          │
│  │   └── Multiple checkbox selection    │
│  │                                      │
│  └── [NEW] TAGGED MANAGERS              │
│      └── Multiple checkbox selection    │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    Design Projects App (existing)        │
├─────────────────────────────────────────┤
│                                         │
│  Client Profile Card [NEW]              │
│  ├── Name, contact, email               │
│  │                                      │
│  ├── BRAND DNA (collapsible)            │
│  │   ├── Voice: [text]                  │
│  │   ├── Colors: [color swatches]       │
│  │   ├── Font: [name]                   │
│  │   ├── Do's: [list]                   │
│  │   └── Don'ts: [list]                 │
│  │                                      │
│  └── Assigned team: [list]              │
│                                         │
└─────────────────────────────────────────┘
```

---

## Database Schema

### New Tables (Minimal)

```sql
-- Client Brand DNA (lightweight)
CREATE TABLE brand_dna (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL UNIQUE REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Brand Voice & Guidelines
  brand_voice TEXT, -- "Professional but friendly, clear and direct"
  brand_colors VARCHAR(7)[], -- ['#003399', '#FFFFFF', '#FF6600']
  brand_font VARCHAR(100), -- "Montserrat"
  
  -- Do's & Don'ts
  do_guidelines TEXT[], -- ['Be authentic', 'Use clear language']
  dont_guidelines TEXT[], -- ['Avoid jargon', 'Never rush']
  
  -- Metadata
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brand_dna_client_id ON brand_dna(client_id);
```

### Modified Tables

```sql
-- Add to existing tasks table
ALTER TABLE tasks ADD COLUMN client_id UUID REFERENCES clients(id);
ALTER TABLE tasks ADD COLUMN tagged_team_members UUID[] DEFAULT ARRAY[]::UUID[];
ALTER TABLE tasks ADD COLUMN tagged_managers UUID[] DEFAULT ARRAY[]::UUID[];

CREATE INDEX idx_tasks_client_id ON tasks(client_id);
CREATE INDEX idx_tasks_team_members ON tasks USING GIN(tagged_team_members);
CREATE INDEX idx_tasks_managers ON tasks USING GIN(tagged_managers);

-- Add to existing design_projects table (if not already there)
ALTER TABLE design_projects ADD COLUMN brand_dna_id UUID REFERENCES brand_dna(id);

CREATE INDEX idx_design_projects_brand_dna ON design_projects(brand_dna_id);
```

### No Migrations Needed For:
- Clients table (already exists from Design & PM Tools)
- Tasks table (structure already exists, just adding columns)
- Design Projects table (structure already exists, just adding column)

---

## API Endpoints

### Client Profile Management

**Get client profile:**
```
GET /api/clients/:clientId
Response: {
  id, name, email, contact_person, phone,
  brand_dna: { id, voice, colors, font, do's, don'ts }
}
```

**Update client profile:**
```
PATCH /api/clients/:clientId
Payload: { name, email, contact_person, phone }
```

### Brand DNA Management

**Create/update brand DNA:**
```
POST /api/clients/:clientId/brand-dna
Payload: {
  brand_voice: "Professional, friendly",
  brand_colors: ["#003399", "#FFFFFF"],
  brand_font: "Montserrat",
  do_guidelines: ["Be authentic", "Use clear language"],
  dont_guidelines: ["Avoid jargon", "Never rush"]
}
```

**Get brand DNA:**
```
GET /api/clients/:clientId/brand-dna
Response: { id, voice, colors, font, do's, don'ts }
```

### Task Tagging

**Tag client on task:**
```
PATCH /api/tasks/:taskId/tag-client
Payload: { client_id: "uuid" }
```

**Tag team members on task:**
```
PATCH /api/tasks/:taskId/tag-team
Payload: { user_ids: ["uuid1", "uuid2"] }
```

**Tag managers on task:**
```
PATCH /api/tasks/:taskId/tag-managers
Payload: { user_ids: ["uuid1", "uuid2"] }
```

**Get task with all tags:**
```
GET /api/tasks/:taskId
Response: {
  id, title, description, assignees,
  client: { id, name, brand_dna: {...} },
  tagged_team_members: [...],
  tagged_managers: [...]
}
```

### Filtering

**Get tasks by client:**
```
GET /api/tasks?client_id=uuid
```

**Get tasks assigned to user + tagged with user:**
```
GET /api/tasks?assigned_to=uuid&tagged_team_member=uuid
```

---

## UI Components

### 1. Task Detail Page (Updated)

```
┌──────────────────────────────────────┐
│ Task: Design Homepage Redesign       │
├──────────────────────────────────────┤
│                                      │
│ CLIENT:                              │
│ ┌────────────────────────────────┐  │
│ │ Acme Corp ▼                     │  │ ← Dropdown to select client
│ │ Brand DNA: [View Details ↗]    │  │ ← Shows colors, fonts inline
│ └────────────────────────────────┘  │
│                                      │
│ ASSIGNED TO:                         │
│ ☑ Sarah (Designer)                   │
│ ☑ Ahmed (Designer)                   │
│                                      │
│ TAGGED TEAM MEMBERS: [+ Add]         │
│ ☑ Sarah                              │
│ ☑ Ahmed                              │
│ ☐ Fatima                             │
│                                      │
│ TAGGED MANAGERS: [+ Add]             │
│ ☑ Youssef (Design Lead)              │
│ ☐ Mariam (PM)                        │
│                                      │
└──────────────────────────────────────┘
```

### 2. Brand DNA Quickview (Modal)

```
┌──────────────────────────────────────┐
│ BRAND DNA: Acme Corp          [✕]   │
├──────────────────────────────────────┤
│                                      │
│ VOICE:                               │
│ Professional but friendly, clear and  │
│ direct. Avoid jargon.                │
│                                      │
│ COLORS:                              │
│ ■ #003399 (Primary)                  │
│ ■ #FFFFFF (Light)                    │
│ ■ #FF6600 (Accent)                   │
│                                      │
│ FONT:                                │
│ Montserrat (all headers)             │
│                                      │
│ DO'S:                                │
│ ✓ Be authentic                       │
│ ✓ Use clear language                 │
│ ✓ Show results                       │
│                                      │
│ DON'TS:                              │
│ ✗ Avoid jargon                       │
│ ✗ Never rush messages                │
│ ✗ Be impersonal                      │
│                                      │
│                       [Close]        │
└──────────────────────────────────────┘
```

### 3. Client Profile Page (Updated)

```
┌──────────────────────────────────────┐
│ CLIENT: Acme Corp              [Edit]│
├──────────────────────────────────────┤
│                                      │
│ CONTACT:                             │
│ Name: Ahmed Hassan                   │
│ Email: ahmed@acme.com                │
│ Phone: +20-123-456-7890              │
│                                      │
│ BRAND DNA:  [Edit] [View Full]       │
│ Voice: Professional, friendly        │
│ Colors: ■ #003399 ■ #FFFFFF         │
│ Font: Montserrat                     │
│                                      │
│ TEAM ASSIGNED:                       │
│ Sarah (Designer)                     │
│ Ahmed (Designer)                     │
│ Youssef (PM/Lead)                    │
│                                      │
│ PROJECT STATS:                       │
│ Active Projects: 3                   │
│ Open Tasks: 7                        │
│ In Progress: 2                       │
│ Completed: 12                        │
│                                      │
│ ACTIVE PROJECTS:                     │
│ • Homepage Redesign (In Progress)    │
│ • Mobile App Design (Ready for QA)   │
│ • Email Campaign (Planning)          │
│                                      │
└──────────────────────────────────────┘
```

### 4. Task List/Kanban View (Updated)

```
Cards show client badge + brand color indicator:

┌──────────────────────────────────┐
│ [ACME CORP] Design Homepage      │
│ ■ Brand colors visible in header  │
│ Assigned: Sarah, Ahmed            │
│ Tagged: Sarah, Ahmed, Youssef     │
│ Deadline: July 15                 │
└──────────────────────────────────┘
```

---

## Implementation Timeline

### Week 5: Database + API
- [ ] Add tables (brand_dna) + columns (tasks.client_id, tags)
- [ ] Create migrations
- [ ] Write API endpoints (6 endpoints above)
- [ ] Write tests

**Deliverable:** All CRUD operations working via API

### Week 6: UI Components
- [ ] Update Task Detail page
  - Client dropdown + brand DNA quickview
  - Team member tagging UI
  - Manager tagging UI
- [ ] Build Brand DNA modal
- [ ] Update client profile page

**Deliverable:** Full UI for client + brand DNA management

### Week 7: Integration + Polish
- [ ] Link brand DNA to Design Projects
- [ ] Test tagging workflows
- [ ] Performance optimization (N+1 queries)
- [ ] Bug fixes + refinement

**Deliverable:** Fully integrated, tested, ready for team use

---

## Key Features

### What This Enables

1. **Brand Context:** Design team sees brand colors, fonts, voice when working on client task
2. **Team Visibility:** "Who's working on Acme Corp?" → Filter by client_id
3. **Client Tagging:** Tasks can reference the client for context
4. **Manager Visibility:** PMs see which managers are tagged on each task
5. **Audit Trail:** Can query "all tasks for client X" or "all tasks tagged with manager Y"

### What This Does NOT Do (Yet)

- No client portal / client visibility
- No social media planning
- No automated image generation
- No approval workflows (handled separately in Design Handoff app)
- No bilingual support yet

---

## Data Flow Example

**Scenario: Task assigned to designers for Acme Corp**

```
1. PM creates task: "Design Homepage Redesign"
2. PM selects CLIENT: "Acme Corp"
   → Task now linked to Acme Corp's brand_dna
   → UI shows Acme's colors, fonts, guidelines
   
3. PM tags team: [Sarah, Ahmed] (designers)
   → They see task is for them
   
4. PM tags manager: [Youssef] (PM/Lead)
   → Youssef sees task for oversight
   
5. Designers open task
   → See brand DNA (colors #003399, font Montserrat, voice "professional")
   → Can make decisions aligned with brand
   
6. Task published
   → Shows client badge [ACME CORP]
   → Shows tagged team in task detail
   → Shows tagged managers in activity feed
```

---

## Security & Permissions

**Who can manage Brand DNA:**
- Admin (full)
- Design team lead (can update for assigned projects)
- Not clients (read-only)

**Who can tag on tasks:**
- Task creator/owner
- Assigned manager
- Project manager

**Who can see:**
- Internal team: Full visibility (clients, brand DNA, tags)
- Clients: Their own profile + projects only

---

## Integration with Existing Apps

### With Task Management
- Tasks can reference client + team/manager tags
- Filter tasks by client
- See brand DNA when viewing task

### With Design Projects
- Projects linked to client profile
- Client profile shows all related projects
- Brand DNA available in Design Projects app

### With Design Handoff
- Handoff can reference client brand guidelines
- Can link to client profile

### With Asset Library
- Assets can be tagged with client
- Can filter assets by client

### With Chat (embedded)
- Chat threads in tasks show client context
- Brand DNA visible in project chat

---

## Future Enhancements (Phase 3+)

**These are NOT in Phase 2 scope:**

1. Social Media Planner
   - Use brand DNA as input for content planning
   - Bilingual content creation (EN/AR Masri)
   
2. Client Portal
   - Clients see project progress
   - Clients approve designs
   
3. Brand Compliance Checking
   - Auto-flag designs that violate brand guidelines
   
4. Content Generation
   - Use brand DNA + Claude to generate captions, social posts

---

## Success Metrics (Phase 2 Completion)

- [ ] 100% of clients have brand DNA defined
- [ ] 0 critical bugs in tagging system
- [ ] <100ms load time for task detail with brand DNA
- [ ] 100% of design tasks tagged with client
- [ ] Team adoption: >90% using client/tag features within 2 weeks

---

## Database Size Impact

**New tables:**
- `brand_dna`: 100 rows (one per client) × ~2KB = 200KB

**Modified columns (tasks table):**
- `client_id` (UUID): 16 bytes × 1M tasks = 16MB
- `tagged_team_members` (UUID array): ~50 bytes average × 1M tasks = 50MB
- `tagged_managers` (UUID array): ~50 bytes average × 1M tasks = 50MB

**Total additional storage:** ~120MB (negligible)

---

## Migration Strategy

**No data migration needed** — new columns are nullable with defaults.

**Deployment flow:**
1. Add columns + indexes (backward compatible)
2. Deploy code that writes to new columns
3. Backfill existing tasks with client_id from Design Projects (if applicable)
4. UI updates live

**Rollback:** Remove columns (idempotent, no data loss)

---

## Testing Strategy

**Unit Tests:**
- Brand DNA CRUD
- Task tagging functions
- Permission checks

**Integration Tests:**
- Create task → tag client → retrieve task → verify brand DNA
- Filter tasks by client
- Filter tasks by tagged user

**E2E Tests:**
- PM creates task, tags client + team, designer opens task, sees brand DNA
- Manager portal shows tagged tasks

---

**Status:** Ready for Phase 2 implementation  
**Owner:** Dorgham + Development Team  
**Created:** June 19, 2026
