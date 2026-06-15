# Brief Templates — Structured Intake Forms

Use these templates to provide briefs to `arabic-creator`. Fill in as many fields as possible.

## Standard Brief Form

```yaml
brief:
  platform: ""           # facebook | instagram | linkedin | tiktok | email | landing | whatsapp | blog
  content_type: ""       # ad | post | article | caption | script | sequence | section | opener | testimonial
  audience:
    primary: ""          # hotel_owners | restaurant_managers | tourists | etc.
    age_range: ""        # 25-35 | 35-55 | etc.
    language_comfort: "" # masri_native | arab_wide | bilingual
  goal: ""               # awareness | lead_gen | conversion | education | entertainment | engagement
  tone: ""               # professional_warm | bold | friendly | authoritative | playful
  register: ""           # L2 | L3 | L4 (leave empty for auto-detect)
  key_message: ""        # Single sentence: what's the core message?
  offer: ""              # What are you offering?
  cta_type: ""           # book | subscribe | contact | buy | learn | register | download | share
  brand_voice: ""        # R1 (aspirational) | R2 (energetic)
  gender: ""             # masculine | feminine | neutral
  length: ""             # short (<50w) | medium (50-150w) | long (150-300w)
  variants: 0            # 0 | 2 | 3 (number of A/B variants)
  reference_text: ""     # Optional: source text to adapt
  keywords: []           # Optional: SEO keywords
  cultural_notes: ""     # Optional: timing, events, sensitivities
```

## Quick Brief (Minimal Required)

```
platform: facebook
goal: lead_generation
key_message: AI marketing saves time
offer: Free consultation
```

The agent infers all missing fields from defaults.

## Platform-Specific Brief Templates

### Facebook / Instagram Ad

```yaml
brief:
  platform: "facebook"  # or instagram
  content_type: "ad"
  audience:
    primary: "hotel_owners"
    age_range: "30-55"
  goal: "lead_gen"
  tone: "professional_warm"
  key_message: "AI marketing system saves you 10+ hours/week and doubles bookings"
  offer: "Free 30-minute consultation"
  cta_type: "book"
  brand_voice: "R2"
  length: "medium"
  variants: 2
  keywords: ["تسويق فنادق", "ذكاء اصطناعي"]
```

### LinkedIn Thought Leadership

```yaml
brief:
  platform: "linkedin"
  content_type: "article"
  audience:
    primary: "hotel_general_managers"
    age_range: "35-55"
  goal: "education"
  tone: "authoritative"
  register: "L4"
  key_message: "AI is fundamentally changing hotel marketing in Egypt"
  offer: "Free whitepaper on AI hotel marketing"
  cta_type: "download"
  brand_voice: "R1"
  length: "long"
  variants: 0
```

### TikTok Brand Awareness

```yaml
brief:
  platform: "tiktok"
  content_type: "script"
  audience:
    primary: "young_travelers"
    age_range: "18-30"
  goal: "awareness"
  tone: "playful"
  register: "L2"
  key_message: "Hotels using AI get more bookings"
  offer: "Follow for more tips"
  cta_type: "subscribe"
  brand_voice: "R2"
  length: "short"
  variants: 0
```

### Email Sequence (Lead Nurture)

```yaml
brief:
  platform: "email"
  content_type: "sequence"
  audience:
    primary: "warm_leads"
    age_range: "25-55"
  goal: "conversion"
  tone: "professional_warm"
  key_message: "Here's how our AI system works and what it delivers"
  offer: "Demo booking"
  cta_type: "book"
  brand_voice: "R1"
  length: "medium"
  variants: 0
  sequence_position: 2  # email #2 of 4
  sequence_total: 4
```

### Sales WhatsApp Opener

```yaml
brief:
  platform: "whatsapp"
  content_type: "opener"
  audience:
    primary: "warm_lead_from_event"
    age_range: "30-55"
  goal: "appointment"
  tone: "friendly"
  key_message: "Met you at the Hurghada Business Forum"
  offer: "Coffee meeting"
  cta_type: "contact"
  brand_voice: "R1"
  gender: "masculine"
  length: "short"
  variants: 0
```

### Landing Page Hero Section

```yaml
brief:
  platform: "landing"
  content_type: "section"
  section: "hero"
  audience:
    primary: "business_owners"
    age_range: "30-55"
  goal: "conversion"
  tone: "bold"
  key_message: "AI-powered marketing for Egyptian businesses"
  offer: "Free trial"
  cta_type: "register"
  brand_voice: "R2"
  length: "short"
  variants: 2
```

### Blog Post (SEO + Engagement)

```yaml
brief:
  platform: "blog"
  content_type: "listicle"
  audience:
    primary: "small_business_owners"
    age_range: "25-50"
  goal: "education"
  tone: "friendly"
  register: "mixed"
  key_message: "5 ways AI can improve your marketing without hiring more people"
  offer: "Subscribe for more tips"
  cta_type: "subscribe"
  brand_voice: "R2"
  length: "long"
  variants: 0
  keywords: ["ذكاء اصطناعي في التسويق", "تسويق للشركات الصغيرة مصر"]
```
