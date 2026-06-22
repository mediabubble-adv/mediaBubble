# OPUS Documentation Hub

**Status:** Implemented in Launcher (Phase 0–1) · Docs reorganized June 2026

---

## Essential Reading

1. **[Who, pain, and value](./product/WHO-PAIN-VALUE.md)** — why OPUS exists  
2. **[Master README](./README.md)** — folder map + code locations  
3. **[Development guide](./development/README.md)** — how to build and test  
4. **[Session synthesis](./CHAT_SESSION_INDEX.md)** — planning conversation distilled  

---

## Folder Map

| Folder | Contents |
|--------|----------|
| [product/](./product/) | PRD, value prop, delivery summary |
| [architecture/](./architecture/) | System design, scalability |
| [integrations/](./integrations/) | Meta, Google, automation engine |
| [development/](./development/) | 8 implementation guides |
| [operations/](./operations/) | Deploy and env |
| [roadmap/](./roadmap/) | 3-year strategic plan |
| [session/](./session/) | Deduplicated chat topics |
| [archive/](./archive/) | Raw chat export |

---

## What Was Implemented (from chat specs)

| Feature | Location |
|---------|----------|
| Event bus + workflows | `apps/launcher/lib/opus/` |
| Brief builder | `/opus/briefs/new` |
| Automation triggers | `/opus/triggers` |
| Usage metering | `/opus/usage` |
| Performance review | `/opus/campaigns/[id]/performance` |
| Command center | `/opus` |
| Prisma schema | migration `0008_opus` |

**Not yet:** Stripe webhooks, live Meta/Google publish, Redis cron, multi-tenant orgs — Phase 2.

---

## Raw Planning Export

[`archive/chat-raw-export-2026-06-22.md`](./archive/chat-raw-export-2026-06-22.md) — original 6,966-line transcript (duplicated blocks). Prefer organized docs above.
