# Billing & Usage Metering

**UI:** `/opus/usage`  
**Code:** `lib/opus/billing/`

## Hybrid model

Base plan + included quota + overage (see chat session spec).

| Plan | AI gens/mo | Campaigns/mo |
|------|------------|--------------|
| starter | 500 | 10 |
| professional | 5,000 | 100 |
| enterprise | 100,000 | 1,000 |

## Enforcement

- **80%** — soft warning in API response  
- **100%** — block metered action (402-style error message)  
- Enterprise — unlimited pass-through  

## Functions

- `getUsageSnapshot()` — dashboard data  
- `checkUsage(event)` — pre-flight  
- `consumeUsage(event)` — increment + enforce  

## Future

- Stripe Usage Records + webhooks  
- Per-organization billing when multi-tenant lands  
