# Quality Gates — Pipeline Checkpoints

## Gate 1: Strategy & SEO Approval

**Trigger:** Strategy plan + keyword framework delivered
**Gatekeeper:** Project manager (this agent)

### Checklist
- [ ] Content pillar selected and justified
- [ ] Target audience segment identified and profiled
- [ ] Platform(s) selected with rationale
- [ ] Content format selected (article, Reel, carousel, video, etc.)
- [ ] Register (R1, R2, or both) assigned
- [ ] Target keyword identified (primary + 3-5 secondary)
- [ ] Keyword search intent matches content type
- [ ] Funnel stage (awareness, consideration, conversion) defined
- [ ] Success KPI defined
- [ ] Timeline milestone set

### Pass Criteria
All 10 items checked — proceed to Creation phase.

---

## Gate 2: Content Draft Complete

**Trigger:** Draft content received from arabic-creator
**Gatekeeper:** Project manager (this agent)

### Checklist
- [ ] Content matches the brief (topic, angle, length)
- [ ] Target keywords integrated naturally (not stuffed)
- [ ] Correct register used (R1 or R2 as assigned)
- [ ] Platform format requirements met (character limits, aspect ratios, etc.)
- [ ] CTA aligns with funnel stage goal
- [ ] Brand voice consistent (Masri level, tone)
- [ ] No missing sections or placeholders
- [ ] All platform variants delivered (if multi-platform)
- [ ] Content length conforms to spec
- [ ] First revision review completed (if applicable)

### Pass Criteria
All 10 items checked — proceed to Cultural Review & QA.

### Revision Rules
- Maximum 2 revision rounds per content piece
- Each round requires creator to address ALL feedback from previous round
- After 2 rounds, escalate to project owner for scope/quality decision

---

## Gate 3: Cultural & Quality Clearance

**Trigger:** Cultural assessment + QA audit report received
**Gatekeeper:** Project manager (this agent)

### Cultural Assessment Checks
- [ ] Cultural norms respected (family, face, hierarchy, hospitality)
- [ ] Regional references correct (if region-specific content)
- [ ] Religious sensitivities respected (Muslim + Christian)
- [ ] Humor appropriate for target audience and platform
- [ ] Generational communication style correct
- [ ] No high-severity cultural flags

### QA Audit Checks
- [ ] Linguistic accuracy score ≥ 80%
- [ ] Register compliance score ≥ 80%
- [ ] Brand voice compliance score ≥ 80%
- [ ] Cultural sensitivity score ≥ 80%
- [ ] Spelling & grammar: no errors in primary copy
- [ ] Red line check: no violations
- [ ] Overall QA score ≥ 80%

### Pass Criteria
- Cultural: No high-severity flags. Medium flags have resolution plan.
- QA: Overall score ≥ 80% AND no high-severity errors.
- Both criteria must pass.

### Scoring Rubric

| Score Range | Grade | Action |
|-------------|-------|--------|
| 90-100% | A | Pass — proceed |
| 80-89% | B | Pass — minor corrections recommended |
| 70-79% | C | Conditional pass — must fix all medium+ issues |
| 60-69% | D | Fail — return to creator, 1 revision attempt |
| < 60% | F | Fail — return to creator, requires full rewrite |

### Fail Action
If QA fails: Return content to arabic-creator with full error report and audit breakdown. Creator must address every error. Project manager tracks the revision. After 2 failed QA attempts, escalate.

---

## Gate 4: Publishing Readiness

**Trigger:** Typography/visual specs delivered (if applicable) + final metadata
**Gatekeeper:** Project manager (this agent)

### Final Checklist
- [ ] Content finalized (no pending revisions)
- [ ] SEO meta tags complete and correct (title, description)
- [ ] Image alt text provided in Arabic (if applicable)
- [ ] Schema markup prepared (if applicable)
- [ ] RTL layout verified (if visual component)
- [ ] Font spec confirmed (Cairo weights, line-height, sizes)
- [ ] Cultural clearance certificate attached
- [ ] QA certificate attached (score documented)
- [ ] Publishing platform confirmed
- [ ] Publishing schedule confirmed
- [ ] Final approval obtained from project owner

### Pass Criteria
All 11 items checked — project is ready to publish.

---

## Certificate Template

```yaml
quality_certificate:
  project: <project ID>
  content_type: <content type>
  final_qa_score: <percentage>
  cultural_clearance: <pass | conditional>
  visual_spec_complete: <yes | no>
  seo_metadata_complete: <yes | no>
  gates_passed:
    gate_1_strategy: <pass | fail>
    gate_2_creation: <pass | fail>
    gate_3_quality: <pass | fail>
    gate_4_publishing: <pass | fail>
  approved_by: <project owner>
  date: <date>
  valid_until: <date or evergreen>
```
