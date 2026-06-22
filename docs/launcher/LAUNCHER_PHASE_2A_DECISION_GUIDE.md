# Launcher Phase 2A — Master Decision Guide

**One-Pager for Quick Reference**  
**Date:** June 21, 2026

---

## THE STRATEGY IN ONE SENTENCE

**Ship analytics + documents + Slack + payments in 4 weeks. Solve coordination problem. Make Launcher undisputable.**

---

## 4 QUESTIONS ANSWERED

### 1. What Are We Building? (Prioritized)

| Week  | Feature             | Why                                                 | Owner   |
| ----- | ------------------- | --------------------------------------------------- | ------- |
| **5** | Analytics Dashboard | Leadership needs visibility. Data-driven decisions. | Owner A |
| **6** | Document Management | File chaos → centralized. Versioning.               | Owner B |
| **7** | Slack Integration   | Notification hub. Keeps people in Launcher.         | Owner C |
| **8** | Payment Automation  | Revenue reconciliation. Zero manual work.           | Owner D |

**Not in Phase 2A (yet):** Resource Planning, Google Workspace, Performance Reviews, L&D.  
**Why?** Analytics + Documents ship first. Resource Planning depends on Analytics data. Sequence matters.

---

### 2. How Do We Know It Works?

**Success = DAU 60% → 75% + Team Says "Actually Useful" (NPS >50)**

| Metric           | Target            | Measurement                  |
| ---------------- | ----------------- | ---------------------------- |
| **DAU**          | 60% → 75%         | Days/week team uses Launcher |
| **Tasks Logged** | 60 → 120 hrs/week | Time entry integration       |
| **Time in App**  | +40%              | Segment analytics            |
| **Error Rate**   | <0.5%             | Sentry                       |
| **Page Load**    | <2s P95           | Lighthouse                   |
| **NPS**          | >50               | Slack polls                  |

**Blockade Metrics** (red-flag if any breach):

- Error rate >5% → halt rollout
- P95 latency >5s → investigate
- DAU drops >10% → revert feature

---

### 3. What's the Schedule?

```
Sprint 0 (June 24–28): Infrastructure
  └─ DB schema, Slack OAuth, S3 setup, feature flags

Week 5 (July 1–5): Analytics
  └─ API + UI + Production Deploy + 50% rollout

Week 6 (July 8–12): Documents
  └─ API + UI + Production Deploy + 100% rollout

Week 7 (July 15–19): Slack
  └─ API + UI + Production Deploy + 100% rollout

Week 8 (July 22–26): Payments
  └─ API + UI + Production Deploy + 100% rollout

Weeks 9–12: Parallel (Resource Planning, Finance, Google Workspace)
```

**Critical Path:** Analytics → Documents → Slack → Payments.  
**Parallelizable:** Finance, Time, CRM (Week 9+) run independently.

---

### 4. What Could Go Wrong?

**Top 3 Risks:**

| Risk                                   | Likelihood | Impact                | Mitigation                                    |
| -------------------------------------- | ---------- | --------------------- | --------------------------------------------- |
| Slack OAuth registration delayed       | Medium     | Week 7 slip           | **Register in Sprint 0. Don't wait.**         |
| Analytics queries slow (large dataset) | Medium     | Dashboard >2s         | **Add DB indexes Week 5. Test with 1M rows.** |
| Feature flag system fails              | Low        | Can't control rollout | **Test locally in Sprint 0.**                 |

**Rollback Trigger:** Error rate >5%. Instant halt. Investigate. Fix on staging. Re-deploy.

---

## FOR EACH ROLE

### Dorgham (Product Lead)

- **Decide:** Which feature ships first if scope overruns? (Answer: Prioritize Analytics > Documents > Slack > Payments)
- **Escalate:** Any blockers that prevent weekly deployment.
- **Track:** Metrics dashboard. DAU trend. Team NPS.
- **Communicate:** Friday all-hands (30 min, all team).

### Engineering Lead

- **Plan:** Sprint 0 infrastructure (5 days, all team).
- **Assign:** One owner per feature (A=Analytics, B=Documents, C=Slack, D=Payments).
- **Unblock:** Remove obstacles daily. Standup 10 AM Cairo.
- **QA:** Each feature deploys Friday. Smoke test checklist.

### Owner A (Analytics)

- **Build:** API endpoints (Mon–Tue) → UI (Wed–Thu) → Deploy (Fri)
- **Target:** All 4 metric sections. Real-time. <2s load.
- **Test:** 50% rollout. Monitor errors 48h.

### Owner B (Documents)

- **Build:** S3 integration (Mon–Tue) → UI (Wed–Thu) → Deploy (Fri)
- **Target:** Upload, version, share, search. Mobile.
- **Test:** 100 files. 3+ versions. 3 users sharing.

### Owner C (Slack)

- **Build:** OAuth (Mon–Tue) → Webhooks (Wed–Thu) → Deploy (Fri)
- **Target:** Notify on Slack. Respond in Launcher. Slash commands.
- **Test:** Task assigned → notification. Message → comment.

### Owner D (Payments)

- **Build:** Webhook (Mon–Tue) → Reconciliation (Wed–Thu) → Deploy (Fri)
- **Target:** Payment → marked paid. <1 min.
- **Test:** Client pays. Invoice auto-updates. Finance sees it.

### Designer

- **Week 5:** Analytics dashboard layout. KPI cards. Charts.
- **Week 6:** Document library. File list. Share modal.
- **Week 7:** Slack connect modal. Integration settings.
- **Week 8:** Polish client portal.

### QA

- **Each Friday:** Smoke test checklist. E2E tests. Mobile.
- **Ongoing:** Monitor error rate. Report issues within 1h.

---

## BEFORE YOU SHIP (Weekly Deployment Checklist)

```
❌ Tests passing (unit + integration)
❌ Staging deploy successful
❌ Smoke test checklist ✅
❌ Feature flag ready
❌ Monitoring alerts on
❌ Rollback procedure ready
❌ Database migration tested + reversible
❌ Team notified
❌ On-call engineer available 48h
❌ Customer success briefed

→ All checked? Deploy to production.
→ Any unchecked? Move to next week.
```

---

## THIS WEEK'S ACTIONS (Starting Monday, June 24)

### Dorgham

- [ ] Schedule kickoff (9 AM Cairo)
- [ ] Assign 4 owners + design + QA
- [ ] Review Architecture + PRD + Execution Plan with team

### Engineering Lead

- [ ] Setup sprint board
- [ ] Setup feature flag system (LaunchDarkly or similar)
- [ ] Verify Slack OAuth portal access

### All Engineers (Sprint 0)

- [ ] Deploy DB schema to staging
- [ ] Register Slack app
- [ ] Setup S3 bucket + CORS
- [ ] Test feature flag locally
- [ ] Smoke test all endpoints by Friday

---

## QUESTIONS? ASK HERE.

| Question                                       | Answer                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| What if Feature X takes longer than 1 week?    | Ship it the next week. Don't slip analytics.                       |
| What if analytics is slow?                     | Add DB indexes. Pre-compute common queries. Use cache.             |
| Can we launch resource planning before week 9? | Only if analytics is complete + working (it needs analytics data). |
| What if a critical bug appears in prod?        | Disable feature flag instantly. Investigate. Re-deploy next day.   |
| Who approves rollback?                         | On-call engineer OR Dorgham (in order of availability).            |
| Do we need A/B testing?                        | Yes. Gradual rollout (10% → 50% → 100%) with error monitoring.     |

---

## REFERENCE DOCUMENTS

- **LAUNCHER_PHASE_2_PRIORITY_SPECS.md** — Full architecture, PRD, UI design
- **LAUNCHER_EXECUTION_PLAN_PHASE_2A.md** — Week-by-week breakdown
- **LAUNCHER_PLAN_V2.md** — Original Phase 2 plan (Finance, Time, CRM)

---

## SUCCESS LOOKS LIKE (End of Week 8)

- ✅ Analytics dashboard live (leadership loves it)
- ✅ Documents centralized (Google Drive archive deleted)
- ✅ Slack notifications working (team stays in Launcher)
- ✅ Payments automated (Finance team has Sunday off)
- ✅ DAU: 60% → 75%
- ✅ Time logged: 60 → 120 hrs/week
- ✅ Team feedback: "This actually solves our problems"
- ✅ Zero critical bugs

**Then:** Week 9 → Resource Planning. Week 12 → Board meeting with metrics.

---

**Version:** 1.0  
**Status:** Ready for Kickoff (Monday, June 24)  
**Owner:** Dorgham + Engineering Lead
