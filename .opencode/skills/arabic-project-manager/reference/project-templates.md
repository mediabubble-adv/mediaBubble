# Project Templates — Reusable Content Briefs

## Template 1: Social Media Post (Single Platform)

```yaml
project_type: social_post
platform: <instagram | tiktok | facebook | linkedin>
format: <reel | carousel | single-image | post>
pillar: <pillar name from content-strategist>
target_audience: <segment from audience-segments>
register: <R1 | R2>
goal: <awareness | consideration | conversion>
primary_keyword: <from seo-optimizer>
secondary_keywords: <list>
hook: <Masri hook line>
body: <content description, 2-3 sentences>
cta: <Masri CTA>
cta_goal: <link | share | comment | save>
visual_notes: <description of visual direction>
culture_notes: <regional, generational, religious context>
length_limit: <character or time limit>
deadline: <date>
```

## Template 2: Article / Blog Post

```yaml
project_type: article
pillar: <pillar name>
target_audience: <segment>
register: R1
goal: <awareness | consideration>
primary_keyword: <from seo-optimizer>
secondary_keywords: <list>
headline: <H1 in Arabic>
meta_title: <50-65 chars>
meta_description: <100-160 chars>
slug: <English transliteration>
word_count: <500-2000>
sections:
  - h2: <heading>
    key_points: <list>
    seo_notes: <keywords to include>
  - h2: <heading>
    key_points: <list>
cta: <Masri CTA for article end>
schema_type: Article
culture_notes: <any cultural considerations>
deadline: <date>
```

## Template 3: Video Script (Reel / TikTok / YouTube Short)

```yaml
project_type: video_script
platform: <instagram | tiktok | youtube>
duration: <15-60 seconds>
pillar: <pillar name>
target_audience: <segment>
register: R2
goal: <awareness>
primary_keyword: <from seo-optimizer>
hook: <first 3 seconds in Masri>
script:
  - time: 0-3s
    visual: <what happens on screen>
    audio: <spoken text in Masri>
  - time: 3-10s
    visual: <what happens>
    audio: <spoken text>
  - time: 10-25s
    visual: <what happens>
    audio: <spoken text>
  - time: 25-30s
    visual: <CTA screen>
    audio: <CTA in Masri>
caption: <full caption in Masri>
hashtags: <3-5 Arabic hashtags>
thumbnail_text: <3-5 words in Arabic>
culture_notes: <humor boundaries, generational fit>
deadline: <date>
```

## Template 4: Multi-Platform Campaign

```yaml
project_type: campaign
campaign_name: <campaign name>
campaign_theme: <seasonal | product | awareness | event>
duration: <7-30 days>
pillar: <primary pillar>
target_audience: <primary segment>
secondary_audience: <optional>
funnel_stage: <awareness + consideration + conversion>
primary_keyword: <from seo-optimizer>
platforms:
  - platform: instagram
    pieces:
      - format: reel
        count: <number>
        register: R2
      - format: carousel
        count: <number>
        register: R2
      - format: story_series
        count: <number>
        register: R2
  - platform: facebook
    pieces:
      - format: post
        count: <number>
        register: R2
      - format: article
        count: <number>
        register: R1
  - platform: linkedin
    pieces:
      - format: article
        count: <number>
        register: R1
calendar:
  - day: 1
    platform: instagram
    format: reel
    content_brief: <brief description>
  - day: 3
    platform: facebook
    format: post
    content_brief: <brief>
  - day: 5
    platform: linkedin
    format: article
    content_brief: <brief>
budget_tier: <low | medium | high>
culture_notes: <campaign-level cultural sensitivity>
kpis:
  primary: <metric>
  secondary: <metrics>
deadline: <date>
```

## Template 5: Landing Page

```yaml
project_type: landing_page
page_name: <page name>
goal: <conversion | lead-gen | information>
pillar: <pillar name>
target_audience: <segment>
register: R1 (with R2 in CTAs and hooks)
primary_keyword: <from seo-optimizer>
secondary_keywords: <list>
meta_title: <50-65 chars Arabic>
meta_description: <100-160 chars Arabic>
slug: <English transliteration>
sections:
  - hero:
      headline: <Masri headline>
      subheadline: <supporting text>
      cta: <primary CTA>
  - benefits:
      items:
        - icon: <icon name>
          title: <benefit title>
          description: <benefit text>
  - proof:
      testimonials: <number>
      stats: <key metrics>
  - form:
      fields: <list of fields>
      cta: <form submit CTA>
  - faq:
      questions: <list of Q&A pairs>
schema_type: LocalBusiness or MedicalBusiness
culture_notes: <regional targeting, religious considerations>
deadline: <date>
```

## Template 6: YouTube Video (Long Form)

```yaml
project_type: youtube_video
duration: <5-15 minutes>
pillar: <pillar name>
target_audience: <segment>
register: R1
goal: <awareness | consideration>
primary_keyword: <from seo-optimizer>
secondary_keywords: <list>
title: <Arabic title - 40-60 chars>
description: <full description in Masri>
tags: <10-15 Arabic tags>
segments:
  - intro: <0-60s, hook and overview>
  - main: <content divided into logical segments with timestamps>
  - conclusion: <summary and CTA>
cta: <subscribe, visit website, book consultation>
thumbnail_text: <3-5 words Arabic>
captions: <Arabic SRT needed? yes/no>
culture_notes: <guest/doctor protocol, religious timing>
deadline: <date>
```
