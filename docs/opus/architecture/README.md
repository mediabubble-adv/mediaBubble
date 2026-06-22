# OPUS Architecture Documentation

| Document | Contents |
|----------|----------|
| [ARCHITECTURE_WITH_DIAGRAMS.md](./ARCHITECTURE_WITH_DIAGRAMS.md) | System overview, 12 microservices, diagrams |
| [COMPREHENSIVE_TECHNICAL_ARCHITECTURE.md](./COMPREHENSIVE_TECHNICAL_ARCHITECTURE.md) | Deep technical spec |
| [PHASED_FOUNDATION.md](./PHASED_FOUNDATION.md) | Phase 0–3 foundation rollout |
| [SCALABILITY_ANALYSIS.md](./SCALABILITY_ANALYSIS.md) | Scale limits, cost, bottlenecks |

## Launcher Integration (Implemented)

OPUS is **not** a separate `apps/opus` deployable in this repo. It extends Launcher:

```
apps/launcher/
├── lib/opus/           # Services (event bus, triggers, briefs, billing, metrics)
├── app/(app)/opus/     # UI pages
└── app/api/opus/       # REST API
```

Pragmatic path: monolith-first with service boundaries in code; extract microservices when scale requires K8s deployment per original architecture docs.
