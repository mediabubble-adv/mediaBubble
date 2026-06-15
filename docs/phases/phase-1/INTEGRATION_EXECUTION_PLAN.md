# Integration Validation Execution Plan
**Week 0: Pre-Launch API Setup**

**Timeline:** Monday - Friday  
**Owner:** Engineering Lead + CTO  
**Critical Path:** Must complete before Week 1 Day 1

---

## Monday: HubSpot API Validation

### Task 1.1: Secure API Key (30 min)

**Step 1: Login to HubSpot**
- URL: https://app.hubspot.com
- Use admin account (if you don't have one, request from HubSpot admin)
- Navigate to: Settings (gear icon, bottom left) → Integrations → Private Apps

**Step 2: Create New Private App**
- Click "Create app"
- Name: `MediaBubble_Phase1_Agents`
- Description: "Phase 1 AI agent integrations for lead scoring, sales workflow, invoicing"

**Step 3: Set Scopes**
Check these permissions:
- ✅ `crm.objects.contacts.read` (read contacts)
- ✅ `crm.objects.contacts.write` (create/update contacts)
- ✅ `crm.objects.companies.read` (read company data)
- ✅ `crm.objects.companies.write` (update company data)
- ✅ `crm.objects.deals.read` (read deals for invoicing)
- ✅ `crm.objects.activities.write` (log activities)
- ✅ `crm.objects.custom_objects.read` (if using custom fields)
- ✅ `crm.objects.custom_objects.write` (if creating custom fields)

**Step 4: Generate Token**
- Click "Show token"
- Copy the token (it's long, like 40+ characters)
- **IMPORTANT:** Save to secure vault (1Password, LastPass, or .env file)
- Label it: `HUBSPOT_API_KEY`

**Step 5: Verify Token**
Run this curl command:
```bash
curl -X GET "https://api.hubapi.com/crm/v3/objects/contacts?limit=1" \
  -H "authorization: Bearer YOUR_API_KEY_HERE"
```

Expected response:
```json
{
  "results": [...],
  "paging": {...}
}
```

✅ **Success:** You get contact data back  
❌ **Failure:** `401 Unauthorized` = wrong token, `403 Forbidden` = missing scopes

**Assigned to:** Engineering Lead  
**Time:** 30 min  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 1.2: Map Required HubSpot Fields (1 hour)

**Step 1: List Standard Fields**
Run this command:
```bash
curl -X GET "https://api.hubapi.com/crm/v3/objects/contacts/model" \
  -H "authorization: Bearer YOUR_API_KEY_HERE"
```

Save the response. Note which fields exist:
- `firstname` ✅ (standard)
- `lastname` ✅ (standard)
- `email` ✅ (standard)
- `phone` ✅ (standard)
- `company` ✅ (standard)
- `jobtitle` ✅ (standard)
- `hs_lead_status` ❓ (check if exists)

**Step 2: List Custom Fields**
In HubSpot UI:
- Settings → Objects → Contacts → Properties
- Look for:
  - `hs_lead_category` (should NOT exist yet — you'll create it)
  - `hubspotscore` (check if enabled)
  - `lead_source` (check if exists)

**Step 3: Create Missing Custom Fields**
For each missing field, run:

```bash
# Example: Create hs_lead_category field
curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts/properties" \
  -H "authorization: Bearer YOUR_API_KEY_HERE" \
  -H "content-type: application/json" \
  -d '{
    "name": "hs_lead_category",
    "label": "Lead Category",
    "description": "Hot/Warm/Cool/Archive - auto-scored by AI agent",
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

Repeat for:
- `lead_source` (text field)
- `company_size` (text field)
- `industry` (text field)
- `budget_signals` (boolean field)
- `timeline_urgency` (enumeration: Immediate/Soon/Future/Unknown)
- `personalization_angle` (text field)

✅ **Success:** Fields appear in HubSpot UI within 5 min  
❌ **Failure:** API returns 400 error = syntax issue, check field definition

**Assigned to:** Engineering Lead  
**Time:** 1 hour  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 1.3: Test Full Contact Creation Flow (1 hour)

**Step 1: Create Test Contact**
```bash
curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts" \
  -H "authorization: Bearer YOUR_API_KEY_HERE" \
  -H "content-type: application/json" \
  -d '{
    "properties": {
      "firstname": "Test",
      "lastname": "Lead",
      "email": "test.lead@example.com",
      "company": "Test Corp Inc",
      "jobtitle": "CMO",
      "hs_lead_category": "hot",
      "lead_source": "api_test",
      "company_size": "500",
      "industry": "B2B SaaS",
      "budget_signals": true,
      "timeline_urgency": "Immediate"
    }
  }'
```

Expected response:
```json
{
  "id": "12345",
  "properties": {...},
  "createdAt": "2025-XX-XX..."
}
```

✅ **Success:** Contact ID returned (copy it)  
❌ **Failure:** 400 error = field name wrong, 401 = auth issue

**Step 2: Verify Contact in HubSpot UI**
- Login to HubSpot
- Contacts → Search for "test.lead@example.com"
- Verify: All fields populated correctly

✅ **Success:** Test contact visible with all data  
❌ **Failure:** Contact missing or fields empty = field mapping issue

**Step 3: Test Activity Logging**
```bash
curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts/12345/associations/v2/batch/archive" \
  -H "authorization: Bearer YOUR_API_KEY_HERE" \
  -d '...notes...'
```

Or use built-in HubSpot notes API:
```bash
curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts/12345" \
  -H "authorization: Bearer YOUR_API_KEY_HERE" \
  -H "content-type: application/json" \
  -d '{
    "properties": {
      "notes": "AI agent test: Lead scoring validation"
    }
  }'
```

✅ **Success:** Note appears in contact timeline  
❌ **Failure:** Note not visible = API issue or permission missing

**Assigned to:** Engineering Lead  
**Time:** 1 hour  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 1.4: Load Test (30 min)

**Step 1: Batch Create 10 Test Contacts**
```bash
# Create 10 contacts in rapid succession
for i in {1..10}; do
  curl -X POST "https://api.hubapi.com/crm/v3/objects/contacts" \
    -H "authorization: Bearer YOUR_API_KEY_HERE" \
    -H "content-type: application/json" \
    -d "{
      \"properties\": {
        \"firstname\": \"TestBatch\",
        \"lastname\": \"Lead$i\",
        \"email\": \"test.batch$i@example.com\",
        \"company\": \"Test Batch Corp\"
      }
    }" &
done
wait
```

✅ **Success:** All 10 contacts created  
❌ **Failure:** Rate limit error (429) = implement backoff/queue

**Step 2: Verify Performance**
- Time to create 10 contacts: [X] seconds
- Target: <2 sec per contact (20 sec for 10)
- If slower: Check API quota, rate limits

**Assigned to:** Engineering Lead  
**Time:** 30 min  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Monday Completion Checkpoint

- [ ] HubSpot API key secured + stored
- [ ] All required custom fields created
- [ ] Test contact created + verified in UI
- [ ] Activity logging working
- [ ] Load test passed (10 contacts, <20 sec)
- [ ] Engineering ready for Tuesday

**If ALL ✅:** Proceed to GitHub Tuesday  
**If ANY ❌:** Escalate to CTO, debug, don't proceed until fixed

---

## Tuesday: GitHub API Validation

### Task 2.1: Generate GitHub Token (30 min)

**Step 1: Login to GitHub**
- URL: https://github.com/settings/tokens (requires login)
- Click "Generate new token" → "Generate new token (classic)"

**Step 2: Configure Scopes**
Token name: `MediaBubble_Phase1_CodeReview`

Scopes needed:
- ✅ `repo:status` (commit status)
- ✅ `repo:read` (read repos)
- ✅ `read:discussion` (read PR discussions)
- ⚠️ `repo:write` (only if agent will auto-approve — else skip)

**Step 3: Generate + Save**
- Click "Generate token"
- Copy token immediately (you can't see it again)
- Save to vault: `GITHUB_API_TOKEN`

**Assigned to:** Engineering Lead  
**Time:** 30 min  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 2.2: Test Basic Connection (30 min)

**Step 1: Verify Token**
```bash
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/user
```

Expected response:
```json
{
  "login": "your-username",
  "id": 12345,
  ...
}
```

✅ **Success:** Your user info returned  
❌ **Failure:** 401 error = token invalid, 403 = wrong scopes

**Step 2: Test Repo Access**
```bash
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_ORG/YOUR_REPO/pulls?state=open
```

Expected: List of open PRs

✅ **Success:** Can see PRs  
❌ **Failure:** 404 = repo wrong, 403 = permission missing

**Assigned to:** Engineering Lead  
**Time:** 30 min  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 2.3: Test PR Webhook Setup (1 hour)

**Step 1: Create GitHub Webhook**
- Go to repo → Settings → Webhooks → Add webhook
- Payload URL: `https://your-agent-endpoint.com/github/webhook`
- Content type: `application/json`
- Events: Check "Pull requests"
- Active: ✅
- Click "Add webhook"

**Step 2: Test Webhook**
- Create a test PR in the repo
- In GitHub webhook UI, check "Recent Deliveries"
- Should see POST request to your endpoint

✅ **Success:** Webhook delivery shows 200 response  
❌ **Failure:** 5xx response or timeout = endpoint not reachable, check URL

**Step 3: Verify Agent Receives**
- Agent should log: "Received PR webhook for #[PR_NUMBER]"
- Check agent logs for webhook events

**Assigned to:** Engineering Lead  
**Time:** 1 hour  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 2.4: Test Diff Retrieval & Comment (1 hour)

**Step 1: Get PR Diff**
```bash
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3.diff" \
  https://api.github.com/repos/YOUR_ORG/YOUR_REPO/pulls/PR_NUMBER
```

Expected: Raw diff format

✅ **Success:** Diff is parseable  
❌ **Failure:** 404 = PR doesn't exist, 401 = auth issue

**Step 2: Post Test Comment**
```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_ORG/YOUR_REPO/issues/PR_NUMBER/comments \
  -d '{"body": "Test comment from agent"}'
```

Expected response:
```json
{
  "id": 123456,
  "body": "Test comment from agent",
  ...
}
```

✅ **Success:** Comment appears on PR  
❌ **Failure:** 422 = PR closed, 403 = permission missing

**Assigned to:** Engineering Lead  
**Time:** 1 hour  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Tuesday Completion Checkpoint

- [ ] GitHub token generated + stored
- [ ] Basic API connection verified
- [ ] Webhook configured + tested
- [ ] Can retrieve PR diff
- [ ] Can post comments on PR
- [ ] Engineering ready for Wednesday

**If ALL ✅:** Proceed to Adobe Wednesday  
**If ANY ❌:** Debug, don't proceed until fixed

---

## Wednesday: Adobe API Validation (or Fallback)

### Task 3.1: Check Adobe API Access (1 hour)

**Step 1: Login to Adobe Developer Console**
- URL: https://developer.adobe.com/console
- Sign in with Adobe account (needs admin)
- Select organization

**Step 2: Check for Existing Projects**
- Projects & Apps section
- Look for any project with Photoshop or Lightroom API enabled

**Step 3a: IF Already Have API Access**
- Go to project → Service Accounts
- Create new credentials
- Download as JSON
- Save securely: `ADOBE_API_CREDENTIALS.json`
- Continue to Task 3.2

**Step 3b: IF NO API Access Yet**
- Need to request from Adobe (2-3 week wait)
- OR use ImageMagick fallback (immediate)
- **DECISION:** Are you waiting for Adobe or using ImageMagick?

**Assigned to:** CTO + Engineering Lead  
**Time:** 1 hour  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 3.2A: Adobe API Test (If Available) (1.5 hours)

**Step 1: Authenticate**
```bash
curl -X POST https://ims-na1.adobelogin.com/ims/token/v3 \
  -d "grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&scope=openid,AdobeID,read_organizations"
```

Expected: Access token

✅ **Success:** Token returned  
❌ **Failure:** 400 = credentials wrong, 401 = client ID invalid

**Step 2: Test Image Resize**
```bash
curl -X POST https://image.adobe.io/ligenesis/image/GenerateFilter \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "input": {"storage": "dropbox", "path": "test.psd"},
    "output": {"storage": "dropbox", "path": "test-1080x1080.jpg"},
    "filters": {"resize": {"width": 1080, "height": 1080}}
  }'
```

✅ **Success:** Job ID returned, output file appears in Dropbox  
❌ **Failure:** Check Adobe API docs for error codes

**Step 3: Test with Multiple Sizes**
Create batch of 5 resizes:
- 1080x1080 (Instagram square)
- 1080x1350 (Instagram feed)
- 1200x627 (LinkedIn)
- 1920x1080 (Web)
- 3000x3000 (Print prep)

✅ **Success:** All 5 complete in <60 sec  
❌ **Failure:** Check rate limits, adjust batch size

**Assigned to:** Engineering Lead  
**Time:** 1.5 hours  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Task 3.2B: ImageMagick Fallback (If No Adobe) (1 hour)

**Step 1: Install ImageMagick**
```bash
# On Mac:
brew install imagemagick

# On Linux:
sudo apt-get install imagemagick

# Verify:
convert --version
```

✅ **Success:** ImageMagick installed, version shows  
❌ **Failure:** Check system package manager

**Step 2: Test Basic Resize**
```bash
# Create a test image, then resize it
convert test.jpg -resize 1080x1080 test-1080x1080.jpg

# Verify:
identify test-1080x1080.jpg
# Should show: 1080x1080 JPEG
```

✅ **Success:** Image resized correctly  
❌ **Failure:** Check ImageMagick permissions

**Step 3: Test Batch Resize**
```bash
# Resize to 5 different sizes
for size in "1080x1080" "1080x1350" "1200x627" "1920x1080" "3000x3000"; do
  convert test.jpg -resize $size test-$size.jpg
done

# Time it:
time for size in "1080x1080" "1080x1350" "1200x627" "1920x1080" "3000x3000"; do
  convert test.jpg -resize $size test-$size.jpg
done
```

✅ **Success:** All 5 images created in <5 sec  
❌ **Failure:** Adjust ImageMagick settings for performance

**Step 4: Integrate into Agent**
- Agent uses ImageMagick instead of Adobe API
- `convert` command in agent codebase
- No additional cost, immediate availability

**Assigned to:** Engineering Lead  
**Time:** 1 hour  
**Status:** [ ] TODO [ ] IN PROGRESS [ ] DONE

---

### Wednesday Completion Checkpoint

**If Adobe API Available:**
- [ ] API credentials secured
- [ ] Authentication working
- [ ] Single image resize successful
- [ ] Batch resize (5 images) successful
- [ ] Performance acceptable (<60 sec for 5)

**If Using ImageMagick:**
- [ ] ImageMagick installed
- [ ] Single image resize successful
- [ ] Batch resize (5 images) successful
- [ ] Performance good (<5 sec for 5)

**Either way:** Ready for next agent (Thursday)

---

## Thursday: Secondary APIs (If Time)

### Task 4.1: Google Ads API (Optional, for Week 3 Campaign Optimizer)

(Skip if running behind schedule — this is Week 3, not Week 1)

**Setup:**
- Create Google Cloud project
- Enable Google Ads API
- Generate OAuth credentials

**Test:**
- Authenticate
- Retrieve campaign list
- Retrieve keyword performance

**Assigned to:** Engineering Lead (if time)  
**Time:** 2 hours  
**Status:** [ ] TODO [ ] SKIPPED (OK to skip)

---

### Task 4.2: Meta Ads API (Optional, for Week 3 Campaign Optimizer)

(Skip if running behind schedule — this is Week 3, not Week 1)

**Setup:**
- Create Facebook app
- Generate access token
- Test authentication

**Test:**
- Retrieve ad account campaigns
- Retrieve ad performance
- Retrieve bid data

**Assigned to:** Engineering Lead (if time)  
**Time:** 2 hours  
**Status:** [ ] TODO [ ] SKIPPED (OK to skip)

---

## Friday: Final Sign-Off

### Task 5.1: Integration Status Report (1 hour)

**Checklist:**

| Integration | Status | Notes |
|-------------|--------|-------|
| HubSpot | ✅/⚠️/❌ | [Pass/Fallback/Blocked] |
| GitHub | ✅/⚠️/❌ | [Pass/Fallback/Blocked] |
| Adobe/ImageMagick | ✅/⚠️/❌ | [Adobe/ImageMagick/Blocked] |
| Google Ads | ✅/⚠️/⏭ | [Pass/Fallback/Deferred to Week 3] |
| Meta Ads | ✅/⚠️/⏭ | [Pass/Fallback/Deferred to Week 3] |

**Blockers:**
- [List any ❌ items with resolution plan]

**Fallbacks Used:**
- [List any ⚠️ items and what fallback was chosen]

**Ready for Week 1?**
- All MUST-HAVE integrations: ✅
- Engineering confidence: ✅
- Test data ready: ✅
- Monitoring dashboard ready: ✅
- **GO DECISION:** YES / NO

**Assigned to:** Engineering Lead + CTO  
**Time:** 1 hour  
**Status:** [ ] TODO [ ] DONE

---

### Task 5.2: Team Briefing (30 min)

**Present to:**
- Engineering team
- All 9 department heads
- CTO

**Cover:**
- Integration status (all working)
- API keys secured (where stored, access policy)
- Fallbacks chosen (Adobe vs ImageMagick, etc.)
- Week 1 readiness
- What to watch for (error alerts, performance)

**Assigned to:** CTO  
**Time:** 30 min  
**Status:** [ ] TODO [ ] DONE

---

## Success Criteria (End of Week 0)

### MUST HAVE (Block Week 1 if missing):
- ✅ HubSpot API working 100%
- ✅ GitHub API working 100%
- ✅ Design resizing (Adobe or ImageMagick) working 100%
- ✅ All custom fields created in HubSpot
- ✅ Webhooks tested and working
- ✅ Engineering team trained + confident

### NICE TO HAVE (Can defer to later):
- Google Ads API (Week 3 needed)
- Meta Ads API (Week 3 needed)
- Secondary platform integrations

### MUST NOT HAPPEN:
- ❌ Proceed to Week 1 with ❌ integration (will fail immediately)
- ❌ Unknown fallbacks (make decisions now, not during Week 1)
- ❌ Untested APIs (test everything before Week 1 launch)

---

## Escalation Path

**If blocked:**
- Step 1: Engineering Lead troubleshoots (30 min)
- Step 2: CTO reviews approach (15 min)
- Step 3: Contact vendor (Adobe, GitHub, HubSpot) if needed
- Step 4: Use fallback (ImageMagick instead of Adobe, etc.)

**Do NOT proceed to Week 1 with unresolved integrations.**

---

## Final Checklist (Friday EOD)

- [ ] **HubSpot:** Status = PASS / FALLBACK / BLOCKED
- [ ] **GitHub:** Status = PASS / FALLBACK / BLOCKED
- [ ] **Design API:** Status = Adobe PASS / ImageMagick PASS / BLOCKED
- [ ] **All credentials:** Secured in vault
- [ ] **Test data:** 5-10 sample leads ready
- [ ] **Engineering team:** Briefed + ready
- [ ] **Monitoring dashboard:** Template created
- [ ] **Week 1 launch:** APPROVED / DEFER

**Sign-off by:** CTO  
**Date:** Friday EOD Week 0

---

**Status: READY FOR EXECUTION**

Start Monday. Report daily progress. Do not proceed to Week 1 until all MUST-HAVE items are ✅.
