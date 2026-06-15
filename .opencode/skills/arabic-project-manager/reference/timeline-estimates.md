# Timeline Estimates — Content Production Durations

## Content Type Time Estimates

| Content Type | Strategy Phase | Creation Phase | Review Phase | Publishing Phase | Total (Working Days) |
|-------------|---------------|---------------|-------------|------------------|---------------------|
| Single social post (Reel) | 0.5 | 1 | 0.5 | 0.5 | **2.5 days** |
| Single social post (carousel) | 0.5 | 1 | 0.5 | 0.5 | **2.5 days** |
| Single social post (text/image) | 0.5 | 0.5 | 0.25 | 0.25 | **1.5 days** |
| Article / blog post (short, <1000w) | 1 | 2 | 1 | 0.5 | **4.5 days** |
| Article / blog post (long, 1000-2000w) | 1 | 3 | 1.5 | 0.5 | **6 days** |
| Video script (Reel/TikTok, <60s) | 0.5 | 1.5 | 1 | 0.5 | **3.5 days** |
| Video script (YouTube, 5-15min) | 1 | 3 | 1.5 | 0.5 | **6 days** |
| Landing page | 1.5 | 3 | 1.5 | 1 | **7 days** |
| Multi-platform campaign (3 platforms) | 2 | 5 | 2 | 1 | **10 days** |
| Seasonal campaign (full season) | 3 | 8 | 3 | 2 | **16 days** |
| Whitepaper / report | 3 | 5 | 2 | 1 | **11 days** |
| Email newsletter | 0.5 | 1 | 0.5 | 0.25 | **2.25 days** |

## Stage Duration Breakdown

### Strategy Phase
| Activity | Duration | Depends On |
|----------|----------|------------|
| Brief intake | 0.5 day | Client/project owner |
| Content strategist work | 0.5-2 days | Brief clarity |
| SEO keyword research | 0.5-1 day | Content strategist output |
| **Gate 1 review** | **0.25 day** | Strategy + SEO outputs |

### Creation Phase
| Activity | Duration | Depends On |
|----------|----------|------------|
| Creative brief preparation | 0.25-0.5 day | Gate 1 pass |
| First draft | 0.5-3 days (varies by type) | Creative brief |
| First revision cycle (if needed) | 0.25-0.5 day | Feedback |
| Second revision cycle (if needed) | 0.25-0.5 day | Feedback |
| **Gate 2 review** | **0.25 day** | Final draft |

### Review Phase
| Activity | Duration | Depends On |
|----------|----------|------------|
| Cultural advisor review | 0.5 day | Gate 2 pass |
| QA audit | 0.5 day | Cultural clearance |
| Revisions from review feedback | 0.5 day | QA/cultural feedback |
| **Gate 3 review** | **0.25 day** | QA report + cultural clearance |

### Publishing Phase
| Activity | Duration | Depends On |
|----------|----------|------------|
| Typography / visual spec (if needed) | 0.5-1 day | Gate 3 pass |
| SEO metadata final check | 0.25 day | Content finalized |
| Publishing setup | 0.25-0.5 day | All specs complete |
| **Gate 4 review (final approval)** | **0.25 day** | Everything complete |

## Risk Factors & Buffer

| Risk Factor | Time Impact | Mitigation |
|-------------|-------------|------------|
| Unclear brief | +1-3 days | Invest in brief quality upfront |
| Multiple revision rounds | +1-2 days per round | Cap at 2 rounds, escalate after |
| Cultural sensitivity issues | +0.5-2 days | Pre-brief cultural advisor early |
| QA fails (score <80%) | +1-2 days | Include in estimate for first project |
| Ramadan / Eid schedule disruption | +3-5 days | Plan around religious calendar |
| New content type (first time) | +50% of estimate | Double estimate for first instance |
| Stakeholder approval delay | +1-5 days | Set clear approval deadlines |

## Buffer Recommendations

| Project Size | Buffer |
|-------------|--------|
| Single piece of content | +25% of total estimate |
| Small campaign (2-5 pieces) | +30% of total estimate |
| Large campaign (6+ pieces) | +40% of total estimate |
| First project of this type | +50% of total estimate |

## Timeline Template

```yaml
timeline:
  project: <project ID>
  content_type: <content type>
  start_date: <date>
  target_end_date: <date>
  total_working_days: <number>
  buffer_days: <number>
  projected_end_date: <date>
  risk_level: <low | medium | high>
  phases:
    - phase: 1_strategy
      start: <date>
      end: <date>
      duration: <days>
      depends_on: client_brief
    - phase: 2_creation
      start: <date>
      end: <date>
      duration: <days>
      depends_on: gate_1
    - phase: 3_review
      start: <date>
      end: <date>
      duration: <days>
      depends_on: gate_2
    - phase: 4_publishing
      start: <date>
      end: <date>
      duration: <days>
      depends_on: gate_3
  milestones:
    - milestone: Gate 1 (Strategy approved)
      date: <date>
    - milestone: Gate 2 (Draft complete)
      date: <date>
    - milestone: Gate 3 (QA passed)
      date: <date>
    - milestone: Gate 4 (Ready to publish)
      date: <date>
```
