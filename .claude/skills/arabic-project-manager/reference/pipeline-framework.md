# Pipeline Framework — Agent Roles & Handoffs

## Agent Roles Summary

| Agent | Core Function | Input | Output |
|-------|--------------|-------|--------|
| arabic-content-strategist | Strategic planning | Business brief, market context | Pillar map, audience segments, editorial calendar |
| arabic-seo-optimizer | SEO recommendations | Keyword brief, content URL | Keyword framework, on-page/tech/local/YouTube SEO specs |
| arabic-creator | Content writing | Creative brief, SEO specs | Platform-native Masri content (copy, scripts, posts) |
| arabic-cultural-advisor | Cultural review | Content draft, target demographics | Cultural assessment, sensitivities flagged |
| arabic-qa | Quality audit | Content draft, brand guidelines | Audit report, error catalog, score, pass/fail |
| arabic-typography | Typography & RTL spec | Design brief, content length | Font spec, RTL layout spec, component specs |
| arabic-calligraphy | Calligraphy & branding | Brand brief, logo context | Script recommendations, logo integration guide |

## Handoff Protocols

### Handoff 1: Strategist → SEO

**Trigger:** Strategy plan approved
**Deliverable:** Content brief with target audience, topic, pillar, platform, goal
**SEO input needed:** Target keyword, content type, page URL (if exists)
**Output received:** Keyword framework, on-page SEO specs, meta tag templates
**Validation:** Keywords align with strategy, search volume confirmed, competition assessed

### Handoff 2: SEO → Creator

**Trigger:** Keyword framework delivered
**Deliverable:** Creative brief containing: topic, platform, format, register (R1/R2), CTAs, SEO keywords (primary + secondary), target audience, pillar reference, content length
**Creator input needed:** Platform specifics, word/character limits, tone samples
**Output received:** Draft content in specified format
**Validation:** Content matches brief, keywords integrated naturally, length correct

### Handoff 3: Creator → Cultural Advisor

**Trigger:** Draft content complete
**Deliverable:** Content draft + target audience profile + platform context
**Cultural advisor input needed:** Regional targeting, generational focus, sensitivity level
**Output received:** Cultural assessment (norms, humor, religious, regional fit)
**Validation:** No high-severity flags, humor appropriate, regional references correct

### Handoff 4: Cultural Advisor → QA

**Trigger:** Cultural clearance obtained
**Deliverable:** Content draft + cultural assessment results
**QA input needed:** Brand guidelines, register requirements, platform specs
**Output received:** QA audit report with score and error catalog
**Validation:** Score ≥ 80%, no high-severity errors, register compliant

### Handoff 5: QA → Typography

**Trigger:** QA pass obtained
**Deliverable:** Final content + visual requirements (layout, font, RTL needs)
**Typography input needed:** Platform/delivery format, existing design system context
**Output received:** RTL layout spec, font spec, component specs
**Validation:** Font weights available, RTL layout tested, logical properties used

### Handoff 6: Typography → Publish

**Trigger:** All specs complete
**Deliverable:** Complete content package: final copy, SEO metadata, visual specs, cultural clearance, QA certificate
**Publishing check:** All 4 quality gates passed, final approval obtained

## Communication Template Per Handoff

```yaml
handoff:
  from: <agent name>
  to: <agent name>
  project: <project ID>
  phase: <phase number>
  deliverables:
    - file: <deliverable path or reference>
      type: <brief | draft | report | spec>
      description: <description>
  context: <any additional context for next agent>
  deadline: <date>
  priority: <high | medium | low>
  notes: <optional instructions>
```

## Escalation Protocol

| Scenario | Action |
|----------|--------|
| QA fails (score < 80%) | Return to creator with error report. Cap at 2 revision rounds before escalating. |
| Cultural advisor flags high-severity issue | Pause pipeline. Flag to project owner for decision. Do not proceed without resolution. |
| Blocked by missing input | Route status report to project owner. Suggest resolution timeline. |
| Timeline at risk | Early warning at 50% time mark. Re-estimate. Adjust scope or resources. |
| Cross-agent disagreement | Facilitate alignment session. If unresolved, escalate to project owner with both positions documented. |
