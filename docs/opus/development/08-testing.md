# OPUS Testing

## Unit tests

```
apps/launcher/lib/opus/
├── event-bus.test.ts
├── schemas.test.ts
└── billing/plans.test.ts
```

Run:

```bash
nx run launcher:test --testPathPattern=opus
```

## Manual QA checklist

- [ ] `/opus` summary loads without 401  
- [ ] Brief creation with active client succeeds  
- [ ] Manager can run Weekly Social Planning trigger  
- [ ] Contributor gets 403 on trigger run  
- [ ] Usage page shows seeded professional plan usage  
- [ ] Performance page loads for seeded campaign  

## Integration (future)

- Playwright E2E for brief → campaign → performance path  
- Trigger run with real task board assertion  
