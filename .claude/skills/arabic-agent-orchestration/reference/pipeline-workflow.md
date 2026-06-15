# Agent Orchestration — Pipeline Workflow Reference

## Standard Arabic Content Pipeline

```
STRATEGIST ──→ CREATOR ──→ QA ──→ TYPOGRAPHY ──→ SEO ──→ PUBLISH
                   ↑                                        │
                   └──────── CULTURAL ADVISOR ───────────────┘
```

| Phase | Agent | Gate | Output |
|-------|-------|------|--------|
| 1. Plan | Content Strategist | Strategy brief approved | Brief |
| 2. Create | Creator | First draft | Draft |
| 3. Review | QA + Cultural Advisor | Both gates green | Reviewed draft |
| 4. Typeset | Typographer | Visual sign-off | Final files |
| 5. Optimize | SEO Optimizer | SEO checklist | Optimized content |
| 6. Publish | Project Manager | All gates green | Published |

## Handoff Protocol

| Transition | Document Passed | Expected Artifact |
|-----------|----------------|-------------------|
| Strategist → Creator | Brief (structured brief template) | Content draft |
| Creator → QA | Draft + Brief | QA report |
| QA → Creator (rejected) | QA report + marked draft | Revised draft |
| QA → Cultural Advisor | QA-approved draft | Cultural advisory |
| QA + Cultural → Typographer | Approved copy | Typeset proofs |
| Typographer + SEO → PM | Final files | Publish command |

## Quality Gates

| Gate | Criteria | Verdict |
|------|----------|---------|
| G0: Brief | Audience defined, platform selected, KPIs set | pass / revise |
| G1: Grammar | No nahw/sarf errors; tashkeel correct in religious text | pass / revise |
| G2: Register | Level matches platform (L1–L5) | pass / revise |
| G3: Cultural | Red lines respected; imagery appropriate | pass / block |
| G4: Typography | Font chosen for target platform; RTL layouts correct | pass / revise |
| G5: SEO | Keywords present; meta tags correct | pass / revise |
