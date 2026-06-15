# Analytics & Measurement — Arabic SEO Performance

## Google Search Console Setup for Arabic

### Property Configuration
- Add both Arabic and English versions as separate properties (or URL prefix)
- For Arabic script URLs, use the full encoded URL as URL prefix
- Set target country to Egypt for Arabic property
- Verify ownership via DNS record (recommended for ongoing verification)

### Key Reports

**Performance Report (Arabic)**
- Filter by country: Egypt
- Filter by search appearance: Web, Mobile, Video (for YouTube)
- Filter by date: Compare month-over-month and year-over-year
- Track: Total clicks, impressions, average CTR, average position

**Queries Report — Arabic Analysis**
- Identify Masri queries driving traffic (often under-estimated)
- Track queries with high impressions but low CTR (meta description candidate)
- Track queries with high CTR but low position (opportunity to rank higher)
- Group queries by intent (informational, transactional, navigational)

**URL Inspection Tool**
- Test individual Arabic URLs for indexation
- Request indexing for new Arabic content
- Check mobile usability for RTL pages
- Verify canonical and hreflang implementation

---

## Arabic Keyword Tracking

### Rank Tracking Setup

| Tool | Arabic Support | Best For |
|------|---------------|----------|
| Google Search Console (free) | Excellent | Actual query data, not position estimates |
| Google Keyword Planner (free with Ads) | Good | Volume estimates, keyword ideas |
| Ahrefs | Good | Position tracking, competitor analysis, keyword difficulty |
| SEMRush | Good | Position tracking, gap analysis, trend data |
| AccuRanker | Good | Daily position tracking, local tracking for Egypt |
| Manual Google check | Best | Confirming actual position from Egyptian IP |

### Tracking Implementation
1. Identify 20-50 priority Arabic keywords (mix of MSA head terms + Masri long-tail)
2. Set up rank tracking with Egypt as target location
3. Track weekly for first 3 months, then monthly
4. Tag keywords by:
   - Intent (informational, transactional, navigational)
   - Content type (page, article, video, location)
   - Funnel stage (awareness, consideration, conversion)

### Arabic Search Volume Estimation
Search volumes in Google Keyword Planner and other tools are often under-reported for Arabic terms. Use these multipliers:

| Source | Volume Accuracy | Adjustment |
|--------|----------------|------------|
| Google Keyword Planner | 60-80% accurate for Arabic | Reduce by 20% for realistic traffic |
| Ahrefs | 40-60% accurate for Arabic | Use as directional, not absolute |
| SEMRush | 50-70% accurate for Arabic | Cross-reference with Search Console |
| Search Console impressions | 95%+ | This is the ground truth — use for all decisions |

---

## SEO KPIs for Arabic Content

### Monthly Performance Dashboard

| KPI | Arabic-Specific Notes | Benchmark (3 months) | Benchmark (6 months) |
|-----|----------------------|---------------------|---------------------|
| Organic clicks (Arabic) | From Search Console, filter country=Egypt | 1K-5K/mo | 5K-20K/mo |
| Organic impressions (Arabic) | Total Arabic search impressions | 50K-200K/mo | 200K-1M/mo |
| Average CTR (Arabic) | Arabic industry average is 2-4% | 2-3% | 3-5% |
| Average position (Arabic) | Top keywords target position 1-5 | 8-15 | 3-8 |
| Arabic keyword rankings (top 10) | Track top 50 priority keywords | 10 keywords | 25 keywords |
| Arabic featured snippets | Target question-based queries | 0-2 | 3-8 |
| Google Business impressions | Local search visibility | 10K-50K/mo | 50K-200K/mo |
| YouTube search impressions (Arabic) | From YouTube Analytics | 10K-50K/mo | 50K-200K/mo |

### SEO Report Template (Monthly)

```yaml
month: <month>
organic_performance:
  clicks: <total>
  impressions: <total>
  avg_ctr: <%>
  avg_position: <number>
  vs_previous_month: <% change>

top_queries:
  - query: <Arabic query>
    clicks: <number>
    impressions: <number>
    position: <number>
    change: <+/- position>
  - ...

keyword_progress:
  in_top_3: <number>
  in_top_10: <number>
  in_top_20: <number>
  not_ranking: <number>
  new_discovered: <number>

technical_health:
  indexed_arabic_pages: <number>
  pages_with_errors: <number>
  mobile_friendly_arabic: <%>
  core_web_vitals_pass: <%>
  hreflang_errors: <number>

local_seo:
  gbp_impressions: <number>
  gbp_actions: <number>
  review_count: <number>
  avg_rating: <number>
  local_citations_consistent: <%>

youtube:
  search_impressions: <number>
  views_from_search: <number>
  avg_rank_for_targeted: <number>
  subscribers_gained: <number>

recommendations:
  - <action item 1>
  - <action item 2>
  - <action item 3>
```

---

## Competitor SEO Monitoring

### Track Per Competitor
- Keywords they rank for that you don't
- New content published (by pillar, format, platform)
- Backlinks acquired (Arabic backlinks are scarce — high value)
- Google Business Profile changes
- YouTube channel growth

### Competitor Priority List
1. Vezeeta (highest priority — strongest Arabic SEO in healthcare)
2. El-Doctoor (direct competitor in clinic booking)
3. Daily Medical (content-focused competitor)
4. WebTeb (broad Arabic health content)
5. Yadawy (home healthcare, growing presence)

---

## Reporting Cadence

| Report Type | Frequency | Audience | Content |
|-------------|-----------|----------|---------|
| Quick check | Weekly | SEO team | Top keyword positions, new Search Console queries, technical alerts |
| Full report | Monthly | Content + SEO teams | All KPIs, keyword progress, competitor changes, recommendations |
| Strategic review | Quarterly | All stakeholders | Goal progress, content audit, roadmap, budget recommendations |
| Annual audit | Yearly | Executive team | Full SEO health, market position, next year strategy |

## Action Triggers

| Signal | Action | Response Time |
|--------|--------|---------------|
| Keyword dropped 5+ positions | Investigate: competitor change? Algorithm update? Content issue? | 48 hours |
| New competitor ranking for top keyword | Create/update competing content | 1 week |
| Google Search Console error spike | Fix technical issues immediately | 24 hours |
| Arabic search impression decline >20% | Review content freshness, check for seasonality | 1 week |
| High-CTR query not in our content | Create content targeting that query | 2 weeks |
| GBP review volume dropped | Launch new review request campaign | 1 week |
