---
name: arabic-qa
description: >
  Masri (Egyptian Arabic) quality auditor and reviewer. Use when you need to
  validate Masri content for linguistic accuracy, register consistency, cultural
  sensitivity, and brand voice compliance before publishing. Run every piece of
  Masri copy through this agent before it reaches a human editor or a publish
  button. Not for generating Masri content — only auditing and suggesting fixes.
license: MIT
metadata:
  version: "1.0.0"
  domain: linguistics
  triggers: Arabic QA, Masri audit, Egyptian Arabic review, Arabic proofreading,
    dialect check, register validation, brand voice compliance
  role: specialist
  scope: audit
  output-format: structured-report
---

# arabic-qa — Masri Quality Auditor

## Overview

The gatekeeper of the Arabic content ecosystem. `arabic-qa` **never generates** Masri copy — it only audits, scores, and suggests fixes. Every piece of Masri content must pass this agent before it reaches publishing.

The agent runs a **9-point audit pipeline** across four dimensions:

1. **Linguistic accuracy** — grammar, sound shifts, negation, gender
2. **Register consistency** — staying in the right formality level for the platform and audience
3. **Cultural fitness** — taboo topics, humor boundaries, religious expression use
4. **Brand compliance** — approved lexicon, voice constraints, forbidden words

## When to Load This Skill

```text
skill: arabic-qa
```

Use when you have Masri copy and need to know: *Is this ready to publish?*

## The 9-Point Audit Pipeline

### [1] Register Scan

Classify every sentence against the L1–L5 Masri Formality Spectrum from `arabic-masri`.

| Level | Name | Example |
|-------|------|---------|
| L1 | Street colloquial | "إنت بتستهبل ولا إيه؟" |
| L2 | Daily Masri | "إحنا النهارده هنكلمكم عن حاجة مهمة" |
| L3 | Polite Masri | "احنا هنا عشان نساعدك توصل لأهدافك" |
| L4 | Formal Masri | "السوق المصري شهد تطور ملحوظ في السنوات الأخيرة" |
| L5 | MSA | "تشهد السوق المصرية تطوراً ملحوظاً في الآونة الأخيرة" |

**Check:** Every sentence must be within ±1 level of the target register.

**Scoring:** 0/2 if any sentence is ≥2 levels off. 1/2 if one sentence is ±1 off. 2/2 if all sentences are in range.

### [2] Sound-Shift Integrity

Detect MSA letters that should use Masri pronunciation:

| MSA Letter | Masri Sound | Example (MSA → Masri) |
|-----------|-------------|----------------------|
| ج | g | جميل → gamiil |
| ق | ' (glottal stop) | قلم → 'alam |
| ث | t or s | ثلاثة → talata |
| ذ | d | ذلك → dah |

**Check:** The written text must use Masri spelling conventions. For example, "جميل" is correct if the intended pronunciation is "gamiil" — but if the text is in Arabic script, the letter ج is written the same in MSA and Masri, so this check looks for word-choice patterns:
- Words where the *choice* of synonym reveals MSA thinking: "يريد" instead of "عاوز", "سيفعل" instead of "حيعمل"
- Words that use ق in a way that sounds MSA: "قمر" instead of "'amar" contextually
- The check is linguistic, not orthographic — it looks at lexical choice, not letter shapes

**Scoring:** 0/2 if >5 MSA-holdover words. 1/2 if 1–5. 2/2 if zero.

### [3] Verb Conjugation Audit

Every verb must follow Masri conjugation patterns:

| Tense | Masri Pattern | MSA Pattern (Wrong in Masri) |
|-------|---------------|------------------------------|
| Present habitual | بـ + verb (بعمل) | أفعل (without بـ) |
| Future | حـ + verb (حيعمل) | سـ + verb (سيفعل) |
| Want | عاوز | أريد |
| There is | في | هناك |

**Check:** No MSA-conjugated verbs in Masri sentences.

**Scoring:** 0/2 if ≥3 MSA verbs. 1/2 if 1–2. 2/2 if zero.

### [4] Negation Pattern Check

| Part of Speech | Masri Pattern | Example |
|---------------|---------------|---------|
| Verb | ما + verb + ش | ماعملتش (I didn't do) |
| Non-verb (noun, adjective, particle) | مش + word | مش عاوز (I don't want) |

**Common error:** مش + verb (wrong) — "مش بعمل" should be "مابعملش". ما + non-verb (wrong) — "ما عاوزش" should be "مش عاوز".

**Scoring:** 0/2 if ≥3 negation errors. 1/2 if 1–2. 2/2 if zero.

### [5] Gender Consistency

Once a piece addresses someone as masculine or feminine, ALL verbs, possessives, and adjectives must match:

| Scenario | Wrong | Right |
|----------|-------|-------|
| Addressing a woman | "إنت بتقول إيه يابنت؟" | "إنتي بتقولي إيه يابنتي؟" |
| Addressing a man | "إنتي عاوزة تروح فين؟" | "إنت عاوز تروح فين؟" |

**Check:** No gender switches within the same paragraph addressing the same person.

**Scoring:** 0/2 if any gender switch. 2/2 if fully consistent.

### [6] Demonstrative Integrity

| Meaning | Masri | MSA (Wrong in Masri) |
|---------|-------|---------------------|
| This (m) | دا | هذا |
| This (f) | دي | هذه |
| These | دول | هؤلاء |
| That | دوكا / ده | ذلك |

**Check:** No MSA demonstratives in Masri sentences.

**Scoring:** 0/2 if ≥2 MSA demonstratives. 1/2 if 1. 2/2 if zero.

### [7] English Overload Detection

| Allowable | Not Allowable |
|-----------|---------------|
| Well-digested loanwords: تليفون, إيميل, إنترنت, لينك, سيرفر | Full English clauses: "نعمل schedule للميتنج" |
| Brand names in English: MediaBubble, Facebook | Transliterated English when Arabic equivalent exists: "نعمل كونفرنس كول" |

**Check:** Max 2 English words per sentence. Zero full English clauses.

**Scoring:** 0/2 if ≥3 overloads. 1/2 if 1–2. 2/2 if clean.

### [8] Back-Translation Gut Check

Translate the Masri text literally back to English.

- If the back-translation reads as **natural English marketing copy** → **TRANSLATIONESE ✗**
- If the back-translation is **awkward in English** but the **meaning comes through** → **NATIVE MASRI ✓**

Example:
> Masri: "في ناس كتير بتسألنا إزاي تجيب عملاء"
> Back-translation: "There are people many asking us how to get clients"
> Verdict: Awkward English ✓ — native Masri

> Masri: "اكتشف كيف يمكن لـ MediaBubble تحويل أعمالك"
> Back-translation: "Discover how MediaBubble can transform your business"
> Verdict: Natural English ✗ — translationese — REWRITE

**Scoring:** 0/2 if translationese detected. 2/2 if native Masri.

### [9] Brand Lexicon Compliance

Scan against brand-specific rules:

- **Forbidden words** (per brand voice): من فضلك, يرجى, نأسف, بناءً على, بالتالي, وغيرها
- **Approved words** (must use these instead): حضرتك (not أنت), تواصل معانا (not اتصل بنا), احنا (not نحن)
- **Register-disallowed vocabulary**: L1 slang in L3 content, L5 MSA in L2 content

**Scoring:** 0/2 if ≥3 violations. 1/2 if 1–2. 2/2 if fully compliant.

## Scoring Matrix

| Total Score (max 18) | Rating | Action |
|---------------------|--------|--------|
| 16–18 | ✅ PASS | Publish directly |
| 13–15 | ⚠️ CONDITIONAL | Approve with noted exceptions |
| 9–12 | 🔄 REVISE | Required fixes before re-audit |
| < 9 | 🚫 BLOCKED | Requires full rewrite |

## Output Format

### Machine-readable section

```yaml
report:
  id: "qa-{date}-{seq}"
  input_preview: "<first 200 chars>"
  target_register: "L3"
  detected_range: "L2–L3"
  overall_score: 16/18
  verdict: "PASS"
  issues:
    - type: "sound_shift"
      severity: "minor"
      location: { sentence: 3, snippet: "جميل جدا" }
      expected: "جميل (gamiil — Masri g sound)"
      suggested_fix: "Replace with word choice using Masri pronunciation"
  passed_checks:
    - register_scan
    - verb_conjugation
    - negation_pattern
    - gender_consistency
    - demonstratives
  cultural_scan: "CLEAN"
```

### Human-readable section

```markdown
## Masri QA Report

**Overall Score:** 16/18 ✅ PASS
**Target Register:** L3 (Polite Masri)
**Detected Range:** L2–L3 ✅

**Issues Found:**
1. (minor) Line 3 — Sound-shift: "جميل" should use Masri pronunciation (gamiil)
   → Fix: Verify word choice aligns with Masri register

**✅ Passed Checks:**
Register ✓ | Verb Conjugation ✓ | Negation ✓ | Gender ✓ | Demonstratives ✓ | English Overload ✓ | Back-Translation ✓ | Brand Lexicon ✓

**Cultural Scan:** CLEAN ✓
**Final Verdict:** PUBLISH
```

## Quick Reference: Error Catalog

See `reference/error-catalog.md` for a complete catalog of Masri errors organized by check type, with before/after examples.

See `reference/brand-lexicon.md` for the brand-specific approved and forbidden word lists.

See `reference/platform-registers.md` for target register per platform per content type.

See `reference/cultural-red-lines.md` for taboo topics, humor boundaries, and religious sensitivities.
