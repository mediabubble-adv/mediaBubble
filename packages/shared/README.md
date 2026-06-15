# @mediabubble/shared

Shared utilities, API clients, security helpers, and the i18n framework for MediaBubble apps.

## Import rules

| Context | Import from |
|---------|-------------|
| Client components (`'use client'`) | `@mediabubble/shared/client` |
| Server Components, API routes | `@mediabubble/shared/server` or specific subpaths |
| Next.js `middleware.ts` | `@mediabubble/shared/csp-middleware` |

Avoid the root `@mediabubble/shared` barrel in client code — it can pull server-only modules (HubSpot, Resend, rate limiting) into the browser bundle.

## Subpath exports

| Subpath | Module | Purpose |
|---------|--------|---------|
| `./client` | `client.ts` | `useI18n()`, theme provider, browser hooks, GA4 |
| `./server` | `server.ts` | Server-safe barrel |
| `./csp-middleware` | `csp-middleware.cjs` + `csp-middleware.d.ts` | `createCspMiddleware` for nonce CSP |
| `./hubspot-client` | HubSpot CRM helpers |
| `./resend-client` | Resend email helpers |
| `./ui/marketing-kicker` | Marketing kicker CSS class names |

Common `.cjs` files (imported from app config, not always as package subpaths):

- `security-headers.cjs` — production CSP / security headers for `next.config.js`
- `rate-limit.cjs`, `env.cjs`, `ga4-events.cjs`

## CSP middleware example

```ts
// apps/web-eg/middleware.ts (same pattern in web-ae, brand)
import { createCspMiddleware } from '@mediabubble/shared/csp-middleware'

export const middleware = createCspMiddleware()

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

`config.matcher` must stay a **literal array** in each middleware file.

## TypeScript path aliases

`tsconfig.base.json` maps `@mediabubble/shared/*` into this package. Each app `tsconfig.json` redeclares `paths` — when adding a subpath, mirror it in `apps/web-eg`, `apps/web-ae`, and `apps/brand`.

## See also

- Root [README.md](../../README.md) — monorepo onboarding
- [docs/CONTEXT.md](../../docs/CONTEXT.md) — master handoff (§4.4 middleware)
