# OPUS Operations

## Environment

No OPUS-specific env vars required for Phase 1 foundation.

Future (Phase 2):

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`  
- `UPSTASH_REDIS_REST_URL` for distributed cron locks  
- Meta / Google OAuth tokens per workspace  

## Deploy

OPUS ships with Launcher — same Vercel project (`apps/launcher`).

After deploy:

```bash
pnpm run db:deploy:ci   # applies 0008_opus on production
```

## Monitoring

- Trigger runs: `opus_trigger_runs` table  
- Usage: `opus_usage_periods`  
- Events: in-process history (Redis log in Phase 2)  

See [Launcher README](../../../apps/launcher/README.md) for full ops context.
