# Integration Validation Checklist

**Pre-Week 1 API Access & Authentication**

---

## Critical Path: Must Complete Before Week 1 Day 1

### HubSpot API Integration ⭐ (HIGHEST PRIORITY)

**Why critical:** Lead Scoring agent depends 100% on HubSpot contact creation + field mapping

**Validation Steps:**

- [ ] **Get API Key**
  - [ ] Login to HubSpot account (admin access needed)
  - [ ] Navigate to Settings → Integrations → API Key
  - [ ] Generate new private app key
  - [ ] Label it: `MediaBubble_Phase1_Agents`
  - [ ] Copy key to secure vault (1Password/LastPass)

- [ ] **Test Basic Connection**

  ```bash
  curl -X GET "https://api.hubapi.com/crm/v3/objects/contacts" \
    -H "authorization: Bearer YOUR_API_KEY"
  ```

  - [ ] Response: 200 OK (connection works)
  - [ ] Response: 401 Unauthorized (check API key)
  - [ ] Response: 403 Forbidden (check permissions)

- [ ] **Verify Permissions**
  - [ ] Can create contacts? (test endpoint: POST /crm/v3/objects/contacts)
  - [ ] Can read contacts? (test endpoint: GET /crm/v3/objects/contacts)
  - [ ] Can create custom properties? (if needed for lead scoring fields)
  - [ ] Can create activities/notes? (for logging agent actions)

- [ ] **Map Required Fields**
  - [ ] firstname (standard)
  - [ ] lastname (standard)
  - [ ] email (standard)
  - [ ] phone (standard)
  - [ ] company (standard)
  - [ ] jobtitle (standard)
  - [ ] hs_lead_status (custom — create if missing)
  - [ ] hubspotscore (standard — check if enabled)
  - [ ] lead_source (custom — create if missing)
  - [ ] company_size (custom — create if missing)
  - [ ] industry (standard or custom)
  - [ ] budget_signals (custom — create if missing)
  - [ ] timeline_urgency (custom — create if missing)
  - [ ] personalization_angle (custom — create if missing)

- [ ] **Test Field Creation**

  ```bash
  # Example: Create custom field for lead scoring
  curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts/properties" \
    -H "authorization: Bearer YOUR_API_KEY" \
    -H "content-type: application/json" \
    -d '{
      "name": "hs_lead_category",
      "label": "Lead Category",
      "description": "Hot/Warm/Cool/Archive",
      "groupName": "contactinformation",
      "type": "enumeration",
      "options": [
        {"label": "Hot", "value": "hot"},
        {"label": "Warm", "value": "warm"},
        {"label": "Cool", "value": "cool"},
        {"label": "Archive", "value": "archive"}
      ]
    }'
  ```

  - [ ] Response: 200 OK
  - [ ] Field appears in HubSpot UI
  - [ ] Can set field values via API

- [ ] **Test Contact Creation Flow**

  ```bash
  curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts" \
    -H "authorization: Bearer YOUR_API_KEY" \
    -H "content-type: application/json" \
    -d '{
      "properties": {
        "firstname": "Test",
        "lastname": "Lead",
        "email": "test@example.com",
        "company": "Test Corp",
        "jobtitle": "CMO",
        "hs_lead_category": "hot"
      }
    }'
  ```

  - [ ] Response: 201 Created
  - [ ] Contact appears in HubSpot
  - [ ] Custom fields populated correctly

- [ ] **Test Activity Logging**
  - [ ] Create activity/note on contact
  - [ ] Verify activity appears in HubSpot timeline
  - [ ] Test activity timestamps

**Estimated time:** 1-2 hours  
**Owner:** Engineering  
**Deadline:** Week 0, Wednesday

---

### GitHub API Integration (Code Review Agent)

**Why critical:** Code Review agent depends on PR webhooks + diff analysis

**Validation Steps:**

- [ ] **Generate GitHub Personal Access Token**
  - [ ] Login to GitHub (admin access to org)
  - [ ] Settings → Developer settings → Personal access tokens → Tokens (classic)
  - [ ] Generate new token with scopes:
    - [ ] `repo:status` (access to commit status)
    - [ ] `repo:read` (read repositories)
    - [ ] `read:discussion` (read PR discussions)
    - [ ] `gist` (optional)
  - [ ] Label: `MediaBubble_Phase1_CodeReview`
  - [ ] Save to vault

- [ ] **Test Basic Connection**

  ```bash
  curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
    https://api.github.com/user
  ```

  - [ ] Response: 200 OK with your user info
  - [ ] Confirms token is valid

- [ ] **Test PR Access**

  ```bash
  curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
    https://api.github.com/repos/YOUR_ORG/YOUR_REPO/pulls
  ```

  - [ ] Response: 200 OK with list of PRs
  - [ ] Can access all target repos

- [ ] **Test Diff Retrieval**

  ```bash
  # Get specific PR diff
  curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3.diff" \
    https://api.github.com/repos/YOUR_ORG/YOUR_REPO/pulls/PR_NUMBER
  ```

  - [ ] Response: 200 OK with diff content
  - [ ] Diff is parseable

- [ ] **Setup PR Webhook for Real-Time Triggers**
  - [ ] Go to GitHub repo → Settings → Webhooks → Add webhook
  - [ ] Payload URL: `https://your-agent-endpoint.com/github/webhook`
  - [ ] Content type: `application/json`
  - [ ] Events to trigger: `Pull requests`
  - [ ] Active: ☑️
  - [ ] Click "Add webhook"
  - [ ] Test webhook delivery:
    - [ ] Create test PR
    - [ ] Check webhook deliveries in GitHub UI
    - [ ] Verify agent receives and processes

- [ ] **Test Comment Creation**
  ```bash
  # Post comment on PR review
  curl -X POST \
    -H "Authorization: token YOUR_GITHUB_TOKEN" \
    https://api.github.com/repos/YOUR_ORG/YOUR_REPO/pulls/PR_NUMBER/comments \
    -d '{
      "body": "Security: Potential SQL injection. Recommend parameterized queries.",
      "commit_id": "COMMIT_HASH",
      "path": "src/database.js",
      "line": 42
    }'
  ```

  - [ ] Response: 201 Created
  - [ ] Comment appears on PR

**Estimated time:** 1-2 hours  
**Owner:** Engineering  
**Deadline:** Week 0, Wednesday

---

### Adobe Creative Suite API Access (Design Agent)

**Why critical:** Design Variations agent depends on Adobe API for batch resizing

**Validation Steps:**

- [ ] **Check Adobe API Access**
  - [ ] Login to Adobe Developer Console (admin)
  - [ ] Check if organization has API access
  - [ ] If not: Request API access from Adobe (2-3 weeks wait)
  - [ ] Alternative: Use Adobe Firefly API if available

- [ ] **Generate API Credentials**
  - [ ] Adobe Developer Console → Create project → Add APIs
  - [ ] Add: Photoshop API, Lightroom API (if needed)
  - [ ] Generate OAuth credentials (Client ID + Client Secret)
  - [ ] Label: `MediaBubble_Phase1_Design`
  - [ ] Save to vault

- [ ] **Test Authentication**

  ```bash
  curl -X POST \
    https://ims-na1.adobelogin.com/ims/token/v3 \
    -d "grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&scope=openid,AdobeID,read_organizations"
  ```

  - [ ] Response: 200 OK with access token
  - [ ] Token is valid

- [ ] **Test Image Resize API**

  ```bash
  # Example: Resize image to Instagram dimensions
  curl -X POST \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    https://image.adobe.io/ligenesis/image/GenerateFilter \
    -d '{
      "input": {"storage": "dropbox", "path": "design.psd"},
      "output": {"storage": "dropbox", "path": "design-instagram.jpg"},
      "filters": {"resize": {"width": 1080, "height": 1080}}
    }'
  ```

  - [ ] Response: 200 OK with job ID
  - [ ] Output file appears in Dropbox

- [ ] **Test Batch Operations (if supported)**
  - [ ] Verify API supports multiple resize requests
  - [ ] Test with 5-10 images
  - [ ] Check performance (time per image)

- [ ] **Fallback: Identify Alternative**
  - [ ] If Adobe API not available: Can we use ImageMagick CLI instead?
  - [ ] Test ImageMagick installation + resize commands
  - [ ] Falls back gracefully if Adobe API unavailable

**Estimated time:** 2-3 hours (Adobe may need 2-3 weeks for API access)  
**Owner:** Engineering + Adobe account manager  
**Deadline:** Week 0, Monday (to unblock if access needed)

**⚠️ Note:** If Adobe API access is NOT available, Design agent goes to Phase 2. Alternatives:

1. Use ImageMagick for CLI-based resizing (free, immediate)
2. Use Cloudinary API (if you have account)
3. Manual resizing by design team + save Phase 1 for variations only

---

## Secondary Priority: Complete Week 0, Friday

### Marketing Skills Validation (Copy Generator)

- [ ] **Verify `marketing:content-creation` skill availability**
  - [ ] Can invoke skill via Claude API
  - [ ] Test with sample social media copy request
  - [ ] Verify output quality meets brand standards

- [ ] **Test platform-specific copy generation**
  - [ ] LinkedIn copy (professional tone)
  - [ ] Instagram copy (conversational tone)
  - [ ] TikTok copy (hook-first style)
  - [ ] Verify each platform gets appropriate tone

---

### Email API Integration (Nurture Sequences)

- [ ] **If using third-party email platform (HubSpot, Klaviyo, etc.)**
  - [ ] Verify API access for creating automation sequences
  - [ ] Test creating 7-email sequence via API
  - [ ] Verify email scheduling works

---

### Google Ads API (Campaign Optimizer)

**Note:** Not needed until Week 3, but start validation Week 0 if possible

- [ ] **Setup Google Ads API access**
  - [ ] Create Google Cloud project
  - [ ] Enable Google Ads API
  - [ ] Create OAuth 2.0 credentials (Desktop application)
  - [ ] Test authentication

- [ ] **Verify Campaign Access**
  - [ ] Can read campaign data
  - [ ] Can read keyword performance
  - [ ] Can read conversion data
  - [ ] Can update bids (if permissions allow)

---

### Meta Ads API (Campaign Optimizer)

**Note:** Not needed until Week 3, but start validation Week 0 if possible

- [ ] **Setup Meta Marketing API access**
  - [ ] Create Facebook app (Business Manager)
  - [ ] Generate access token with permissions:
    - [ ] `ads_read`
    - [ ] `ads_management`
  - [ ] Test authentication

- [ ] **Verify Campaign Access**
  - [ ] Can read ad account campaigns
  - [ ] Can read ad performance
  - [ ] Can read bid data
  - [ ] Can update bids (test on staging account only)

---

## Nice-to-Have: Week 1 (If Extra Time)

### Airtable/Monday.com API (Project Management)

- [ ] Verify API access for reading project status
- [ ] Test reading task completion data
- [ ] Verify API permissions adequate

---

## Integration Validation Summary

### MUST-HAVE (Before Week 1):

| API     | Purpose                         | Status | Owner       | Deadline |
| ------- | ------------------------------- | ------ | ----------- | -------- |
| HubSpot | Lead contact creation + scoring | ⏳     | Eng         | Wed      |
| GitHub  | PR code review + webhooks       | ⏳     | Eng         | Wed      |
| Adobe   | Design batch resizing           | ⏳     | Eng + Adobe | Mon      |

### SHOULD-HAVE (By Week 1 End):

| API              | Purpose                     | Status | Owner | Deadline |
| ---------------- | --------------------------- | ------ | ----- | -------- |
| Marketing Skills | Social copy generation      | ⏳     | Eng   | Fri      |
| Email API        | Nurture sequence automation | ⏳     | Eng   | Fri      |

### NICE-TO-HAVE (By Week 3):

| API        | Purpose          | Status | Owner | Deadline |
| ---------- | ---------------- | ------ | ----- | -------- |
| Google Ads | Bid optimization | ⏳     | Eng   | Week 3   |
| Meta Ads   | Bid optimization | ⏳     | Eng   | Week 3   |

---

## Validation Failures & Fallbacks

**If HubSpot API fails:**

- ⛔ This blocks Lead Scoring agent
- Fallback: Manual HubSpot entry (defeats purpose)
- Resolution: Contact HubSpot support, escalate to CTO

**If GitHub API fails:**

- ⛔ This blocks Code Review agent
- Fallback: Manual PR review (defeats purpose)
- Resolution: Check GitHub status page, verify org permissions

**If Adobe API unavailable:**

- ⚠️ Design agent moves to Phase 2 OR uses ImageMagick
- Fallback: ImageMagick CLI for resizing
- Resolution: Confirm Adobe API access or implement ImageMagick

**If Marketing skill unavailable:**

- ⚠️ Copy Generator uses generic Claude instead
- Fallback: Use default Claude content generation
- Resolution: Verify skill is loaded, check skill configuration

---

## Sign-Off Checklist

**By End of Week 0:**

- [ ] **HubSpot API:** Validated ✅ / Blocked ⛔ / Fallback ⚠️
- [ ] **GitHub API:** Validated ✅ / Blocked ⛔ / Fallback ⚠️
- [ ] **Adobe API:** Validated ✅ / Not available ⚠️ / Fallback ready
- [ ] **All blockers escalated** to CTO if needed
- [ ] **Fallback plans documented** for any failing integrations
- [ ] **Engineering ready to start** Week 1 Day 1

**Sign-off:** Engineering Lead + CTO

---

## Week 1 Day 1 Kickoff Requirements

| Requirement          | Status | Notes                       |
| -------------------- | ------ | --------------------------- |
| HubSpot API working  | ⏳     | Need this for Phase 1 agent |
| GitHub API working   | ⏳     | Need this for Phase 1 agent |
| Design tools ready   | ⏳     | Adobe OR ImageMagick        |
| Team trained on APIs | ⏳     | Engineering sync Thu PM     |
| Test data prepared   | ⏳     | 5-10 sample leads ready     |
| Monitoring setup     | ⏳     | Error tracking + logging    |

---

**Owner:** Engineering Lead  
**Deadline:** Week 0, Sunday EOD validation complete  
**Status:** READY FOR EXECUTION
