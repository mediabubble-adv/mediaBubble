# Brief → Campaign Flow

**UI:** `/opus/briefs/new`  
**API:** POST `/api/opus/briefs`  
**Code:** `lib/opus/briefs/service.ts`

## Steps

1. User selects client, goal, audience, budget, channels, platforms  
2. Optional: **Create linked campaign record** (Planning status)  
3. Brief saved to `opus_briefs`  
4. `BriefCreated` event published  
5. Usage: `api_call` incremented  

## Next (Phase 2)

- Claude brief parser via Launcher AI Tools  
- Auto-generate content variants  
- Approval tasks on Kanban  

See session wireframes: [session/07-ui-wireframes.md](../session/07-ui-wireframes.md)
