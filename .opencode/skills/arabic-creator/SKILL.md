---
name: arabic-creator
description: >
  Masri (Egyptian Arabic) content generator for marketing platforms. Use when you
  need to produce platform-native Masri copy from a structured brief — social
  media posts, advertisements, emails, blog content, landing page sections, and
  sales scripts. Generates copy in the correct register for each platform, applies
  copywriting frameworks, enforces brand voice constraints, and runs a self-check
  before outputting. Always passes output through arabic-qa before publishing.
license: MIT
metadata:
  version: "1.0.0"
  domain: linguistics
  triggers: Masri content, Egyptian copywriting, Arabic ads, Arabic social media,
    Arab marketing, Masri blog, Egyptian email, brand content
  role: specialist
  scope: generation
  output-format: markdown
---

# arabic-creator — Masri Content Generator

## Overview

The production engine of the Arabic content ecosystem. Takes a structured brief and outputs ready-to-publish Masri copy across 8 content types. Every output includes a self-check report and should be passed to `arabic-qa` for formal audit before publishing.

**This agent does not publish.** It generates content and hands off to `arabic-qa` (audit) → `arabic-project-manager` (workflow routing).

## When to Load This Skill

```text
skill: arabic-creator
```

Use when you need Masri copy from a brief — ads, social posts, emails, sales scripts.

## Brief Intake Format

Provide a structured brief. Include as many fields as possible:

```yaml
brief:
  platform: "facebook"              # facebook | instagram | linkedin | tiktok
                                    # | email | landing | whatsapp | blog
  content_type: "ad"                # ad | post | article | caption | script
                                    # | sequence | section | opener | testimonial
  audience:
    primary: "hotel_owners"         # Who are you talking to?
    age_range: "35-55"              # Age bracket
    language_comfort: "masri_native" # masri_native | arab_wide | bilingual
  goal: "lead_generation"           # awareness | lead_gen | conversion
                                    # | education | entertainment | engagement
  tone: "professional_warm"         # professional_warm | bold | friendly | authoritative | playful
  register: "L3"                    # L2 | L3 | L4 (auto-sets from platform if empty)
  key_message: "AI-powered marketing saves time and doubles bookings"
  offer: "Free consultation — 30 minutes"
  cta_type: "book"                  # book | subscribe | contact | buy | learn
                                    # | register | download | share
  brand_voice: "R2"                 # R1 (aspirational) | R2 (energetic) per brand guidelines
  gender: "masculine"               # masculine | feminine | neutral
  length: "medium"                  # short (<50w) | medium (50-150w) | long (150-300w)
  variants: 2                       # 0 = single, 2+ = generate A/B test variants
  reference_text: ""                # Optional English/Arabic source to adapt from
  keywords: []                      # Optional SEO keywords to include
  cultural_notes: ""                # Optional timing/event context (Ramadan, Eid, etc.)
```

**Minimal brief (all that's required):**

```
platform: facebook
goal: lead_generation
key_message: AI marketing saves time
offer: Free consultation
```

The agent will infer defaults for missing fields.

## Content Type Selection

The agent selects the appropriate structure based on platform + content_type:

| Platform | Available Types | Default Structure |
|----------|----------------|-------------------|
| facebook | ad, post, event, engagement | 4-Part Ad or Social Hook |
| instagram | caption, carousel, reel-script, story | Social Hook |
| linkedin | article, post, poll, dm | AIDA or Thought Leadership |
| tiktok | script, hook-set, trend-adaptation | Social Hook |
| email | sequence, newsletter, promo, cold-outreach | AIDA |
| landing | hero, features, testimonials, pricing, footer | PAS or AIDA |
| whatsapp | opener, follow-up, objection-handler, closer | Conversational |
| blog | long-form, listicle, how-to, case-study | Listicle or Storytelling |

## Copywriting Frameworks

### 4-Part Ad Structure
Best for: Social ads, Facebook/Instagram promotions, conversions

```
Part 1: HOOK — Grab attention with a relatable problem or provocative question
Part 2: PROBLEM — Name the pain in daily Masri
Part 3: SOLUTION — Your offer in benefit-focused Masri
Part 4: PROOF + CTA — Social proof + what to do next
```

### AIDA Structure
Best for: Email sequences, landing pages, longer-form content

```
Attention: Stop them with a compelling headline
Interest: Build curiosity with specifics and benefits
Desire: Make them want it — emotions, proof, urgency
Action: Clear, low-friction CTA
```

### PAS Structure
Best for: Pain-point marketing, service pages, problem/solution content

```
Problem: State the problem clearly (in their words)
Agitation: Make it hurt — what does this problem cost them?
Solution: Your offer as the natural answer
```

### Storytelling Structure
Best for: Brand content, case studies, about pages, testimonials

```
Character: Who is this about? (Relatable to the audience)
Conflict: What challenge did they face?
Resolution: How did your solution help?
Lesson: What does this mean for the reader?
CTA: What should they do now?
```

### Listicle Structure
Best for: Blog posts, educational content, social carousels

```
Hook: What will they learn? Why should they care?
List: 3–7 items, each with a short explanation
CTA: What to do with this knowledge
```

### Social Hook Structure
Best for: TikTok, Instagram, short-form content

```
0–2s: Hook — Provocative question or relatable statement
2–15s: Body — Key message with personality
15–20s: Payoff + CTA — The takeaway + what to do
```

### Conversational Structure
Best for: WhatsApp, DMs, sales outreach

```
Greeting: Warm, personal, uses their name
Who you are: Brief intro (1 sentence)
Why them: Relevance to their situation
Soft CTA: Low-pressure next step
```

## Register Selection by Platform

If not specified in the brief, the agent auto-selects:

| Platform | Default Register | Why |
|----------|-----------------|-----|
| Facebook | L2–L3 | Mixed-age audience, broad reach |
| Instagram | L2 | Visual-first, younger skew |
| LinkedIn | L3–L4 | Professional audience |
| TikTok | L1–L2 | Youth, entertainment |
| Email | L3 | Direct-to-inbox, mixed audience |
| Landing page | L3 | First impression, credibility |
| WhatsApp | L2–L3 | Personal, conversational |
| Blog | L3 | Educational, informational |

## Self-Check Before Output

Before returning any content, the creator runs an internal pre-flight:

1. **Register consistency** — every sentence within ±1 of target
2. **Grammar scan** — MSA holdovers, wrong negation, gender switches
3. **Sound-shift audit** — every applicable word uses Masri pronunciation
4. **Platform constraints** — character count fits, hashtag count ok, emoji rules met
5. **Brand lexicon** — scan against approved and forbidden lists
6. **Back-translation gut check** — reads as native Masri, not translationese

Each check passes or fails. The self-check summary is appended to every output.

## Output Format

```yaml
content:
  variant_id: "A"
  platform: "facebook"
  content_type: "ad"
  register: "L3"
  framework: "4-part ad"
  body: |
    في ناس كتير بتسألنا: إزاي أجيب عملاء للفندق من غير ما أدفع فلوس كتير في الإعلانات؟

    الإجابة بسيطة: نظام MediaBubble للذكاء الاصطناعي. بيشتغل ٢٤ ساعة — يكتبلك بوستات،
    يرد على العملاء، ويحسن إعلاناتك وانت نايم.

    شغّلنا مع ٥٠+ فندق في الغردقة. النتايج ظهرت من أول شهر.

    عاوز تجرب؟ سجل بياناتك واحنا نكلمك. الاستشارة مجاناً 🤝
  hashtags:
    - "تسويق_فنادق"
    - "الغردقة"
    - "MediaBubble"
  character_count: 287
  structure:
    hook: "في ناس كتير بتسألنا..."
    problem: "من غير ما أدفع فلوس كتير..."
    solution: "نظام MediaBubble..."
    proof: "شغّلنا مع ٥٠+ فندق..."
    cta: "عاوز تجرب؟ سجل بياناتك..."
  self_check:
    register: "PASS"
    grammar: "PASS"
    sound_shift: "PASS"
    platform: "PASS"
    brand_lexicon: "PASS"
    back_translation: "PASS"
    overall: "PASS"
metadata:
  brief_id: "{brief-id}"
  variant_count: 2
  variant_a_hook: "في ناس كتير بتسألنا..."
  variant_b_hook: "تعبت من إنك تشتغل طول اليوم ومفيش نتيجة؟"
```

## Usage Examples

### Minimal Brief → Facebook Ad

**Brief:**
```
platform: facebook
goal: lead_generation
key_message: AI marketing saves hotels time and doubles bookings
offer: Free consultation
```

**Output:** Facebook ad in L3 Masri using 4-Part Ad structure with hook, problem, solution, proof+CTA. Includes 3-4 hashtags and a self-check summary.

### LinkedIn Thought Leadership

**Brief:**
```
platform: linkedin
content_type: article
goal: education
audience: hotel general managers
tone: authoritative
key_message: AI is transforming hotel marketing in Egypt
register: L4
length: long
```

**Output:** LinkedIn article in L4 Formal Masri with data points, industry context, and a soft CTA for consultation.

### Instagram Reel Script

**Brief:**
```
platform: instagram
content_type: reel-script
goal: awareness
audience: young travelers 22-35
tone: playful
register: L2
key_message: Hotels using AI get more bookings
length: short
```

**Output:** 20-second reel script in L2 Daily Masri with hook (0–2s), body (2–15s), payoff+CTA (15–20s).

## Reference Files

See `reference/brief-templates.md` for complete brief intake forms per content type.
See `reference/content-structures.md` for all 8 frameworks with full Masri examples.
See `reference/platform-specs.md` for per-platform character limits, emoji rules, and timing.
See `reference/seasonal-hooks.md` for Ramadan, Eid, Black Friday, and seasonal content.
See `reference/cta-library.md` for 30+ Masri CTAs organized by goal and register.
See `reference/brand-voice-matrix.md` for R1/R2 register mapping.
