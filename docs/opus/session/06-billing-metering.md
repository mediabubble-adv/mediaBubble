# Stripe Billing & Usage Metering

**Session date:** June 22, 2026

---

## Organization Billing Architecture

### Use cases

1. **Internal** — MediaBubble agency usage (one main org)
2. **Client upsells** — White-label / "Managed OPUS" per client org
3. **Tiered plans** — Starter, Professional, Enterprise

### Stack

- **Stripe Billing** — subscriptions, usage records, invoicing
- **Prisma + PostgreSQL** — org-scoped billing state
- **Upstash Redis** — rate limiting, webhook dedup
- **Vercel** — serverless webhook handler

---

## Stripe Integration Flow

### 1. Organization onboarding

- Admin creates org → create Stripe Customer (if not exists)
- Default Starter plan with trial

### 2. Subscription management

- `/settings/billing` — pricing table
- Upgrade/downgrade via Stripe Checkout Session
- Customer Portal link for self-service

### 3. Webhook handling

- Single endpoint: `/api/stripe/webhook`
- Route events by `organizationId` in Stripe metadata
- Update `Organization` (status, `currentPeriodEnd`)
- Trigger internal events on downgrade (limit enforcement)

### 4. Organization billing fields

```prisma
model Organization {
  id                   String   @id @default(uuid())
  name                 String
  slug                 String   @unique
  stripeCustomerId     String?  @unique
  stripeSubscriptionId String?
  plan                 Plan     @default(STARTER)
  status               SubscriptionStatus @default(ACTIVE)
  currentPeriodEnd     DateTime?
}

enum Plan {
  STARTER
  PROFESSIONAL
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  TRIAL
}
```

---

## Usage Metering Strategy

**Recommended:** Hybrid tiered + event metering

| Strategy | Fit |
|----------|-----|
| Pure usage-based | Low — unpredictable for agencies |
| Tiered quotas | Strong — predictable billing |
| Event-based metering | Excellent — bill high-value actions |
| **Hybrid (chosen)** | Best — base fee + included quota + overage |

### Pricing tiers (session proposal)

| Tier | Monthly | Included quota | Overage |
|------|---------|----------------|---------|
| Starter | $999 | 500 AI gens, 10 campaigns | $0.50/gen, $50/campaign |
| Professional | $2,999 | 5,000 gens, 100 campaigns | $0.30/gen, $30/campaign |
| Enterprise | Custom | Unlimited + dedicated support | Volume discounts |

### Metered events

1. **AI Content Generation** — highest cost (Claude)
2. **Campaign Launches** — Meta/Google publishing
3. **Advanced Optimizations** — budget reallocation, A/B tests
4. **API Calls** — future public API

---

## Technical Implementation

### Metering service

**Path:** `lib/opus/billing/metering.ts`

- Track usage via `OrganizationUsage` model
- Atomic increments (Prisma + Redis for concurrency)
- Daily aggregation cron job

```prisma
model OrganizationUsage {
  id                String   @id @default(uuid())
  organizationId    String
  organization      Organization @relation(...)
  periodStart       DateTime
  periodEnd         DateTime
  aiGenerations     Int      @default(0)
  campaignsLaunched Int      @default(0)
  apiCalls          Int      @default(0)
  optimizations     Int      @default(0)
  lastUpdated       DateTime @updatedAt

  @@unique([organizationId, periodStart])
}
```

### Stripe usage records

- Report usage daily or on key events
- `stripe.subscriptionItems.createUsageRecord()`
- Automatic invoicing at period end

### Usage enforcement

| Level | Behavior |
|-------|----------|
| 80% quota | Soft warning (in-app + email) |
| 100% quota | Block new metered actions |
| Enterprise | Grace period configurable |

**Enforcement path:** `lib/opus/billing/enforcement.ts`

- Check quota before Claude call, campaign launch, etc.
- Return 402 Payment Required or friendly upgrade CTA

### Usage dashboard

**Route:** `/settings/billing/usage`

- Gauges: AI generations, campaigns, API calls
- Progress bars vs plan limits
- Overage warnings
- Upgrade CTA when approaching limits

---

## Session Implementation Claims

| Item | Claimed status |
|------|----------------|
| Stripe Usage Records integration | ✅ Implemented |
| Usage enforcement logic | ✅ Implemented |
| Usage dashboard UI | ✅ Implemented |
| Stripe Webhook Handler | ⏳ Next priority |

---

## Security & Compliance

- **PCI:** Never store card details (Stripe handles)
- **Org isolation:** Webhooks validate `organizationId`
- **Audit log:** All billing events logged with user + org
- **GDPR:** Data export/deletion per org

---

## Open Items

- [ ] Stripe Webhook Handler (subscription lifecycle)
- [ ] Customer Portal integration
- [ ] Dunning (failed payment handling)
- [ ] Invoice email notifications
