# Multi-Tenant Architecture, RBAC & Org Switcher

**Session date:** June 22, 2026

---

## Multi-Tenant Strategy

**Recommended approach:** Shared database + `organizationId` + application-level enforcement (with optional Postgres RLS).

### Why shared DB (not DB-per-tenant)

| Factor | Shared DB + orgId | DB per tenant |
|--------|-------------------|---------------|
| Cost | Lower | Higher |
| Ops complexity | Moderate | High |
| MediaBubble scale | ✅ Fits agency + client orgs | Overkill initially |
| Prisma fit | Native filtering | Connection pooling pain |

### Organization model

```prisma
model Organization {
  id         String   @id @default(uuid())
  name       String
  slug       String   @unique
  // branding, settings, billing fields
  
  users      User[]
  triggers   OpusAutomationTrigger[]
  campaigns  OpusCampaign[]
}
```

All OPUS resources carry `organizationId` with indexes on `(organizationId)` and `(organizationId, type)`.

---

## RBAC

### Roles

| Role | Access |
|------|--------|
| `ADMIN` | Full org control, billing, triggers |
| `MANAGER` | Campaigns, triggers, team management |
| `CONTRIBUTOR` | Content, tasks, limited campaigns |
| `VIEWER` | Read-only dashboards |

### Trigger access

- `/automation/triggers` — **Admin + Manager only**
- API routes protected via middleware

### RBAC middleware pattern

```typescript
// lib/auth/rbac-middleware.ts
export const requireTriggerAccess = createRbacMiddleware(['ADMIN', 'MANAGER']);

export async function GET(request: Request) {
  const middlewareResponse = await requireTriggerAccess(request);
  if (middlewareResponse.status !== 200) return middlewareResponse;

  const user = (request as any).user;
  const triggers = await prisma.opusAutomationTrigger.findMany({
    where: { organizationId: user.organizationId },
  });
  return Response.json({ triggers });
}
```

### Security practices

- Stateless JWT verification on every protected request
- Role check before business logic
- Organization isolation on all queries
- Audit logging for sensitive actions
- Extensible to Campaigns, Reports, Billing modules

---

## Organization Isolation

### Core rule

Every user sees **only their organization's data**. No cross-contamination.

### Implementation

1. `organizationId` on `User`, `OpusAutomationTrigger`, `OpusCampaign`, etc.
2. All Prisma queries filter by `user.organizationId`
3. API routes reject cross-org resource IDs
4. Seed data creates multiple orgs for testing

### Test cases

- User A (Org 1) cannot see Org 2 triggers
- Switching org updates all scoped data
- 403 on unauthorized role access

---

## Organization Switcher UI

**Location:** Header dropdown next to user menu

### Features

- List user's organizations with active indicator
- One-click switch (updates JWT/session context)
- Shows role per org (ADMIN, MANAGER, etc.)
- Create New Organization (Admin)
- Brand-aligned styling with `brand-*` tokens

### Wireframe

```
┌─────────────────────────────────────────┐
│ Settings → Organizations                │
├─────────────────────────────────────────┤
│ Current: MediaBubble Agency (ADMIN)     │
│                                         │
│ Your Organizations                      │
│ • MediaBubble Agency    [Active] [Switch]│
│ • Client: Coral Bay     [Active] [Switch]│
│ • Client: Red Sea       [Trial]  [Switch]│
│                                         │
│ [Create New Organization]               │
└─────────────────────────────────────────┘
```

### Behavior on switch

- Session updates `organizationId`
- All dashboards reload scoped data
- Triggers, campaigns, usage meters refresh

---

## Optional: Prisma RLS Middleware

Future enhancement for defense-in-depth:

- Postgres row-level security policies per `organizationId`
- Prisma middleware injects tenant context
- Belt-and-suspenders with application-level filters

---

## Next Steps

- [ ] Apply RBAC to Campaign and Analytics API routes
- [ ] Full Organization Settings page
- [ ] Prisma RLS middleware (optional hardening)
