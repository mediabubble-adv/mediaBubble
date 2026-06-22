# Automation Triggers

**UI:** `/opus/triggers`  
**Code:** `lib/opus/triggers/`

## Seeded triggers

| Slug | Type | Schedule | Action |
|------|------|----------|--------|
| weekly-social-planning | TIME | Mon 9:00 | GenerateWeeklySocialContentPlan |
| performance-monitoring | TIME | Every 2h 9–17 | ScanCampaignPerformance |
| lead-captured | EVENT | — | SyncLeadToHubSpot |
| high-engagement-boost | DATA | — | BoostHighEngagementCreatives |

## WeeklySocialPlanning flow

1. Fetch plan context  
2. Generate content (usage: ai_generation)  
3. Create review task for Manager  
4. Publish TasksCreated event  

## Manual run

Manager+ can POST `/api/opus/triggers/[id]/run`.

## Future

- node-cron scheduler on server boot  
- Redis distributed locking for Vercel multi-instance  

See also: [integrations/AUTOMATION_SCHEDULING_ENGINE.md](../integrations/AUTOMATION_SCHEDULING_ENGINE.md)
