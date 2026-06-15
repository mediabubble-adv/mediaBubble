# Service Page Architecture & Component System
**Deep Strategic Planning for MediaBubble Service Pages**  
**Date:** June 10, 2026  
**Status:** Comprehensive Design Blueprint

---

## STRATEGIC OVERVIEW

### The Problem We're Solving

MediaBubble has 15+ distinct services across 4 main pillars. Current approach:
- ❌ Each page built differently (inconsistent)
- ❌ Duplicated components (maintenance nightmare)
- ❌ No clear conversion funnel per service
- ❌ Hard to A/B test
- ❌ Slow to create new pages

### The Solution: Service Page Template System

We'll create **ONE master template** with:
- ✅ Modular, reusable components
- ✅ Consistent conversion architecture
- ✅ Fast page creation (30 min vs 4 hours)
- ✅ Easy A/B testing
- ✅ Scalable for future services

---

## PART 1: THE SERVICE PAGE BLUEPRINT

### Complete Service Page Structure

```
SERVICE PAGE HIERARCHY:

Header Section
├─ Hero / Page Title Section
└─ Breadcrumb Navigation

Content Sections (Modular - Mix & Match)
├─ Problem Statement Section
├─ Why This Service Matters Section
├─ How It Works Section
├─ Features/Benefits Grid
├─ ROI/Results Section
├─ Case Study / Social Proof
├─ Comparison Table (vs competitors/alternatives)
├─ Pricing/Packages Section
├─ Client Testimonials Section
├─ FAQ Accordion Section
├─ Timeline/Process Section
├─ Tools & Technologies Section
└─ Related Services Grid

Bottom CTA Sections
├─ Main CTA (Contact/Consultation)
├─ Secondary CTAs (Related services)
└─ Trust Elements (Certifications, awards)

Footer
└─ Standard footer
```

---

## PART 2: SECTION-BY-SECTION DEEP DIVE

### SECTION 1: HERO / PAGE TITLE
**Purpose:** Immediately clarify what this service does + capture interest  
**Conversion Goal:** Set expectations

```html
HERO SECTION STRUCTURE:
├─ Breadcrumb Navigation
│  └─ Home > Solutions > Web Development > Web Development (current page)
│
├─ Main Hero Content
│  ├─ Page Title (H1)
│  │  └─ "Web Development Services"
│  │
│  ├─ Subtitle / Value Prop
│  │  └─ "Build custom, high-performance websites that convert visitors into customers"
│  │
│  ├─ Hero Image / Video
│  │  ├─ Service-specific hero image
│  │  ├─ OR: Animated video showing service in action
│  │  └─ Alt text for accessibility
│  │
│  └─ Primary CTA Button
│     └─ "Get a Free Consultation" (scrolls to contact form)
│
└─ Optional: Quick Stats Bar
   ├─ "500+ websites launched"
   ├─ "Average conversion lift: +35%"
   └─ "98% client satisfaction"
```

**HTML Component:**
```html
<section class="hero-service">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      <li><a href="/solutions">Solutions</a></li>
      <li><a href="/solutions/web-solutions">Web Solutions</a></li>
      <li aria-current="page">Web Development</li>
    </ol>
  </nav>

  <div class="hero-container">
    <div class="hero-content">
      <h1>Web Development Services</h1>
      <p class="hero-subtitle">
        Build custom, high-performance websites that convert visitors into customers
      </p>
      <button class="btn btn-primary btn-lg">Get a Free Consultation</button>
    </div>

    <div class="hero-media">
      <img 
        src="/images/web-development-hero.jpg" 
        alt="Custom web development for your business"
        loading="lazy"
      />
    </div>
  </div>

  <!-- Optional: Quick Stats -->
  <div class="hero-stats">
    <div class="stat">
      <strong>500+</strong>
      <span>Websites Launched</span>
    </div>
    <div class="stat">
      <strong>+35%</strong>
      <span>Avg Conversion Lift</span>
    </div>
    <div class="stat">
      <strong>98%</strong>
      <span>Client Satisfaction</span>
    </div>
  </div>
</section>
```

**CSS:**
```css
.hero-service {
  padding: 60px 24px;
  background: linear-gradient(135deg, #0D3A7D 0%, #2196F3 100%);
  color: #FFFFFF;
  text-align: center;
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 40px;
}

.hero-content {
  text-align: left;
}

.hero-content h1 {
  font-size: 48px;
  line-height: 1.2;
  margin-bottom: 16px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 32px;
  opacity: 0.95;
}

.hero-media img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat strong {
  font-size: 36px;
  font-weight: 700;
}

.stat span {
  font-size: 14px;
  opacity: 0.9;
}

/* Mobile */
@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero-content h1 {
    font-size: 32px;
  }

  .hero-stats {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

---

### SECTION 2: PROBLEM STATEMENT
**Purpose:** Establish pain points the service solves  
**Conversion Goal:** Build motivation to learn more

```html
PROBLEM SECTION STRUCTURE:
├─ Section Title
│  └─ "Challenges Without [Service]"
│
├─ Problem Cards Grid (3-4 problems)
│  ├─ Card 1:
│  │  ├─ Icon (pain point visual)
│  │  ├─ Problem Title
│  │  ├─ Problem Description
│  │  └─ Example (brief)
│  │
│  ├─ Card 2: [Same structure]
│  └─ Card 3: [Same structure]
│
└─ Transition Text
   └─ "Sound familiar? That's where we come in."
```

**Component Example (Web Development):**
```html
<section class="problems-section">
  <div class="section-container">
    <h2>Common Web Development Challenges</h2>
    <p class="section-intro">
      Without a strategic web development partner, many businesses struggle with...
    </p>

    <div class="problems-grid">
      <!-- Problem Card 1 -->
      <div class="problem-card">
        <div class="problem-icon">
          <svg><!-- Outdated website icon --></svg>
        </div>
        <h3>Outdated Website</h3>
        <p>
          Your website looks like it's from 2015. Visitors leave immediately, 
          and your competitors look more trustworthy.
        </p>
        <p class="problem-impact">Impact: -40% conversion rate</p>
      </div>

      <!-- Problem Card 2 -->
      <div class="problem-card">
        <div class="problem-icon">
          <svg><!-- Slow performance icon --></svg>
        </div>
        <h3>Slow Performance</h3>
        <p>
          Your website takes 5+ seconds to load. Mobile users bounce. 
          Google ranks you lower.
        </p>
        <p class="problem-impact">Impact: -60% mobile traffic</p>
      </div>

      <!-- Problem Card 3 -->
      <div class="problem-card">
        <div class="problem-icon">
          <svg><!-- Not mobile-friendly icon --></svg>
        </div>
        <h3>Not Mobile Friendly</h3>
        <p>
          60% of your visitors use mobile. Your site breaks on phones. 
          They can't navigate or convert.
        </p>
        <p class="problem-impact">Impact: Lost sales</p>
      </div>

      <!-- Problem Card 4 -->
      <div class="problem-card">
        <div class="problem-icon">
          <svg><!-- No integration icon --></svg>
        </div>
        <h3>Disconnected Systems</h3>
        <p>
          Your website doesn't talk to your CRM, analytics, or email platform. 
          Lead tracking is manual & error-prone.
        </p>
        <p class="problem-impact">Impact: Lost leads & data</p>
      </div>
    </div>

    <p class="section-transition">
      <strong>Sound familiar?</strong> That's exactly what we fix.
    </p>
  </div>
</section>
```

**CSS:**
```css
.problems-section {
  padding: 80px 24px;
  background: #F5F5F5;
}

.section-container {
  max-width: 1280px;
  margin: 0 auto;
}

.problems-section h2 {
  font-size: 36px;
  font-weight: 700;
  color: #0D3A7D;
  margin-bottom: 16px;
  text-align: center;
}

.section-intro {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.problem-card {
  background: #FFFFFF;
  padding: 32px;
  border-radius: 12px;
  border-left: 4px solid #FFC107;
  transition: all 300ms ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.problem-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-left-color: #FFB300;
}

.problem-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.problem-icon svg {
  width: 32px;
  height: 32px;
  color: #FFC107;
}

.problem-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #0D3A7D;
  margin-bottom: 12px;
}

.problem-card p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.problem-impact {
  font-weight: 600;
  color: #d32f2f;
  font-size: 13px;
}

.section-transition {
  text-align: center;
  font-size: 18px;
  color: #0D3A7D;
}
```

---

### SECTION 3: HOW IT WORKS / PROCESS
**Purpose:** Show transparent, step-by-step process  
**Conversion Goal:** Build confidence in your methodology

```html
HOW IT WORKS SECTION:
├─ Section Title
│  └─ "Our Process"
│
├─ Timeline/Steps (4-6 steps)
│  ├─ Step 1: Discovery
│  │  ├─ Icon
│  │  ├─ Title
│  │  ├─ Description
│  │  └─ Timeline ("Week 1-2")
│  │
│  ├─ Step 2: Strategy
│  ├─ Step 3: Design
│  ├─ Step 4: Development
│  └─ Step 5: Launch & Optimization
│
└─ Visual Timeline
   └─ Connected line showing progression
```

**HTML Component:**
```html
<section class="process-section">
  <div class="section-container">
    <h2>Our Proven Process</h2>
    <p class="section-intro">
      We follow a tested methodology that ensures results
    </p>

    <div class="timeline">
      <!-- Step 1 -->
      <div class="timeline-step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Discovery & Strategy</h3>
          <p>
            We dive deep into your business, goals, and target audience. 
            Understanding your vision is critical.
          </p>
          <p class="step-duration">Week 1-2</p>
        </div>
      </div>

      <!-- Connector -->
      <div class="timeline-connector"></div>

      <!-- Step 2 -->
      <div class="timeline-step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Design & Planning</h3>
          <p>
            We create wireframes and design mockups. You approve before 
            we write a single line of code.
          </p>
          <p class="step-duration">Week 2-3</p>
        </div>
      </div>

      <!-- Connector -->
      <div class="timeline-connector"></div>

      <!-- Step 3 -->
      <div class="timeline-step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Development & Integration</h3>
          <p>
            We build clean, maintainable code. Full integration with 
            your CRM, analytics, and email platform.
          </p>
          <p class="step-duration">Week 3-5</p>
        </div>
      </div>

      <!-- Connector -->
      <div class="timeline-connector"></div>

      <!-- Step 4 -->
      <div class="timeline-step">
        <div class="step-number">4</div>
        <div class="step-content">
          <h3>Testing & Optimization</h3>
          <p>
            Rigorous QA testing across browsers and devices. We optimize 
            for performance and conversions.
          </p>
          <p class="step-duration">Week 5-6</p>
        </div>
      </div>

      <!-- Connector -->
      <div class="timeline-connector"></div>

      <!-- Step 5 -->
      <div class="timeline-step">
        <div class="step-number">5</div>
        <div class="step-content">
          <h3>Launch & Training</h3>
          <p>
            We deploy to production and train your team. You're never 
            left figuring things out alone.
          </p>
          <p class="step-duration">Week 6-7</p>
        </div>
      </div>
    </div>

    <div class="process-cta">
      <p>Ready to start? Let's schedule your discovery call.</p>
      <button class="btn btn-primary">Schedule Consultation</button>
    </div>
  </div>
</section>
```

**CSS:**
```css
.process-section {
  padding: 80px 24px;
  background: #FFFFFF;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto 48px;
}

.timeline-step {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 32px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFC107 0%, #FFB300 100%);
  color: #0D3A7D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
}

.step-content {
  background: #F5F5F5;
  padding: 32px;
  border-radius: 8px;
  border-left: 4px solid #FFC107;
}

.step-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #0D3A7D;
  margin-bottom: 12px;
}

.step-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.step-duration {
  font-weight: 600;
  color: #FFC107;
  font-size: 13px !important;
  margin-bottom: 0 !important;
}

.timeline-connector {
  position: absolute;
  left: 39px;
  width: 2px;
  height: 60px;
  background: linear-gradient(to bottom, #FFC107, transparent);
  z-index: 0;
}

.timeline-step:last-child .timeline-connector {
  display: none;
}

.process-cta {
  text-align: center;
  padding: 32px;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, transparent);
  border-radius: 12px;
}

/* Mobile */
@media (max-width: 768px) {
  .timeline-step {
    grid-template-columns: 60px 1fr;
    gap: 20px;
  }

  .step-number {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .step-content {
    padding: 20px;
  }
}
```

---

### SECTION 4: FEATURES / BENEFITS GRID
**Purpose:** Detail specific features & benefits  
**Conversion Goal:** Answer "What exactly do I get?"

```html
FEATURES SECTION:
├─ Section Title
│  └─ "What's Included"
│
├─ Feature Cards (6-8 items)
│  ├─ Icon
│  ├─ Feature Name
│  ├─ Feature Description
│  └─ Benefit
│
└─ Optional: Comparison with alternatives
```

**HTML Component:**
```html
<section class="features-section">
  <div class="section-container">
    <h2>What's Included in Our Web Development Service</h2>
    <p class="section-intro">
      Complete, modern web development from strategy to launch
    </p>

    <div class="features-grid">
      <!-- Feature 1 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- Responsive design icon --></svg>
        </div>
        <h3>Responsive Design</h3>
        <p>
          Mobile-first design that works perfectly on all devices. 
          Your visitors have a great experience whether on phone, tablet, or desktop.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- Lightning fast icon --></svg>
        </div>
        <h3>Lightning Fast Performance</h3>
        <p>
          Optimized for speed. Pages load in under 2.5 seconds. 
          Google loves it, and so do your visitors.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- SEO icon --></svg>
        </div>
        <h3>SEO Optimized</h3>
        <p>
          Built with SEO best practices from the ground up. 
          Better rankings, more organic traffic.
        </p>
      </div>

      <!-- Feature 4 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- Security icon --></svg>
        </div>
        <h3>Enterprise Security</h3>
        <p>
          SSL certificates, secure forms, data encryption. 
          Your customers' information is protected.
        </p>
      </div>

      <!-- Feature 5 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- Integration icon --></svg>
        </div>
        <h3>CRM Integration</h3>
        <p>
          Connect to HubSpot, Salesforce, or your preferred CRM. 
          Lead capture is automatic.
        </p>
      </div>

      <!-- Feature 6 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- Analytics icon --></svg>
        </div>
        <h3>Advanced Analytics</h3>
        <p>
          Built-in GA4, heatmaps, and conversion tracking. 
          Know exactly how visitors use your site.
        </p>
      </div>

      <!-- Feature 7 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- Accessibility icon --></svg>
        </div>
        <h3>Accessible Design</h3>
        <p>
          WCAG 2.1 AA compliant. Usable by everyone, including 
          people with disabilities.
        </p>
      </div>

      <!-- Feature 8 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg><!-- Support icon --></svg>
        </div>
        <h3>Ongoing Support</h3>
        <p>
          We don't disappear after launch. Ongoing updates, 
          optimization, and support included.
        </p>
      </div>
    </div>
  </div>
</section>
```

**CSS:**
```css
.features-section {
  padding: 80px 24px;
  background: #FFFFFF;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.feature-card {
  background: #FFFFFF;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid #E0E0E0;
  transition: all 300ms ease;
  text-align: center;
}

.feature-card:hover {
  border-color: #FFC107;
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.15);
  transform: translateY(-4px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(33, 150, 243, 0.1));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.feature-icon svg {
  width: 32px;
  height: 32px;
  color: #FFC107;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #0D3A7D;
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}
```

---

### SECTION 5: CASE STUDY / SOCIAL PROOF
**Purpose:** Show real results  
**Conversion Goal:** Build trust & credibility

```html
CASE STUDY SECTION:
├─ Section Title
│  └─ "Real Results for Real Clients"
│
├─ Case Study Card
│  ├─ Client Logo
│  ├─ Challenge (problem they faced)
│  ├─ Solution (what we did)
│  ├─ Results
│  │  ├─ Metric 1: "+35% conversion rate"
│  │  ├─ Metric 2: "+60% organic traffic"
│  │  └─ Metric 3: "3x ROI"
│  │
│  ├─ Client Quote
│  ├─ Client Name & Title
│  └─ CTA: "View Full Case Study"
│
└─ Alternative: Testimonials Grid (3-4 quotes)
```

**HTML Component:**
```html
<section class="case-study-section">
  <div class="section-container">
    <h2>Real Results for Real Clients</h2>
    <p class="section-intro">
      See how we've helped businesses like yours transform their web presence
    </p>

    <!-- Featured Case Study -->
    <div class="case-study-featured">
      <div class="case-study-image">
        <img src="/images/case-study-1.jpg" alt="Aldau resort website case study" />
      </div>

      <div class="case-study-content">
        <div class="client-logo">
          <img src="/logos/aldau.png" alt="Aldau" />
        </div>

        <h3>Aldau Resort: Increasing Direct Bookings by 45%</h3>

        <div class="case-study-narrative">
          <h4>The Challenge</h4>
          <p>
            Aldau Resort had an outdated website that wasn't converting visitors 
            into bookings. They were relying too heavily on OTAs (Airbnb, Booking.com) 
            and paying 30% commissions.
          </p>

          <h4>Our Solution</h4>
          <p>
            We redesigned their entire website with a modern booking flow, 
            integrated their property management system (PMS), and optimized for 
            mobile conversion. We also set up email remarketing campaigns.
          </p>

          <h4>The Results</h4>
          <div class="case-study-metrics">
            <div class="metric">
              <strong>+45%</strong>
              <span>Direct Bookings</span>
            </div>
            <div class="metric">
              <strong>-30%</strong>
              <span>Commission Fees</span>
            </div>
            <div class="metric">
              <strong>3x</strong>
              <span>ROI (6 months)</span>
            </div>
          </div>

          <blockquote class="client-quote">
            <p>
              "MediaBubble transformed our business. We went from struggling with 
              conversion to getting consistent direct bookings. The entire process 
              was professional and the results speak for themselves."
            </p>
            <footer>
              <strong>Ahmed El-Sayed</strong>
              <span>Owner, Aldau Resort</span>
            </footer>
          </blockquote>

          <a href="/case-studies/aldau" class="btn btn-secondary">Read Full Case Study</a>
        </div>
      </div>
    </div>

    <!-- More Case Studies Grid -->
    <div class="case-studies-grid" style="margin-top: 60px;">
      <!-- Case Study Card 1 -->
      <div class="case-study-card">
        <div class="case-study-card-logo">
          <img src="/logos/shal-hasheesh.png" alt="Shal Hasheesh" />
        </div>
        <h3>Shal Hasheesh Resort</h3>
        <p class="case-study-card-stat">+60% Online Revenue</p>
        <p class="case-study-card-desc">
          Redesigned luxury resort booking experience
        </p>
        <a href="/case-studies/shal-hasheesh" class="link">View Case Study →</a>
      </div>

      <!-- Case Study Card 2 -->
      <div class="case-study-card">
        <div class="case-study-card-logo">
          <img src="/logos/erc.png" alt="ERC" />
        </div>
        <h3>ERC Automotive</h3>
        <p class="case-study-card-stat">+85% Lead Generation</p>
        <p class="case-study-card-desc">
          Custom automotive dealer management system
        </p>
        <a href="/case-studies/erc" class="link">View Case Study →</a>
      </div>

      <!-- Case Study Card 3 -->
      <div class="case-study-card">
        <div class="case-study-card-logo">
          <img src="/logos/selena.png" alt="Selena" />
        </div>
        <h3>Selena Hospitality</h3>
        <p class="case-study-card-stat">+40% Conversion Rate</p>
        <p class="case-study-card-desc">
          Hospitality group expansion & consolidation
        </p>
        <a href="/case-studies/selena" class="link">View Case Study →</a>
      </div>
    </div>
  </div>
</section>
```

**CSS:**
```css
.case-study-section {
  padding: 80px 24px;
  background: #F5F5F5;
}

.case-study-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  background: #FFFFFF;
  padding: 60px;
  border-radius: 16px;
  margin-bottom: 60px;
}

.case-study-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.client-logo {
  height: 60px;
  margin-bottom: 32px;
}

.client-logo img {
  max-height: 100%;
  width: auto;
}

.case-study-content h3 {
  font-size: 28px;
  font-weight: 700;
  color: #0D3A7D;
  margin-bottom: 32px;
  line-height: 1.3;
}

.case-study-narrative h4 {
  font-size: 16px;
  font-weight: 600;
  color: #0D3A7D;
  margin-top: 24px;
  margin-bottom: 12px;
}

.case-study-narrative p {
  font-size: 14px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 16px;
}

.case-study-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.05), transparent);
  border-radius: 8px;
  margin: 24px 0;
}

.metric {
  text-align: center;
}

.metric strong {
  display: block;
  font-size: 32px;
  color: #FFC107;
  font-weight: 700;
  margin-bottom: 4px;
}

.metric span {
  font-size: 13px;
  color: #666;
  font-weight: 600;
}

.client-quote {
  border-left: 4px solid #FFC107;
  padding-left: 24px;
  margin: 32px 0;
  font-style: italic;
}

.client-quote p {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
}

.client-quote footer {
  font-style: normal;
  text-align: left;
}

.client-quote strong {
  display: block;
  font-size: 14px;
  color: #0D3A7D;
  font-weight: 600;
}

.client-quote span {
  font-size: 13px;
  color: #666;
  display: block;
}

.case-studies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.case-study-card {
  background: #FFFFFF;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid #E0E0E0;
  transition: all 300ms ease;
}

.case-study-card:hover {
  border-color: #FFC107;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.case-study-card-logo {
  height: 50px;
  margin-bottom: 20px;
}

.case-study-card-logo img {
  max-height: 100%;
  width: auto;
}

.case-study-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #0D3A7D;
  margin-bottom: 12px;
}

.case-study-card-stat {
  font-size: 16px;
  font-weight: 700;
  color: #FFC107;
  margin-bottom: 8px;
}

.case-study-card-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}

.link {
  color: #FFC107;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.link:hover {
  text-decoration: underline;
}

/* Mobile */
@media (max-width: 768px) {
  .case-study-featured {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px;
  }

  .case-study-metrics {
    grid-template-columns: 1fr;
  }
}
```

---

### SECTION 6: PRICING / PACKAGES
**Purpose:** Show value & options  
**Conversion Goal:** Remove price barriers

```html
PRICING SECTION:
├─ Section Title
│  └─ "Transparent Pricing"
│
├─ Pricing Cards (3 tiers)
│  ├─ Tier 1: Starter
│  │  ├─ Price
│  │  ├─ Description
│  │  ├─ Features list
│  │  └─ CTA
│  │
│  ├─ Tier 2: Professional (FEATURED)
│  │  └─ [Same as Tier 1, but highlighted]
│  │
│  └─ Tier 3: Enterprise
│     └─ [Same structure, custom pricing]
│
└─ FAQ: "What's included in each tier?"
```

**HTML Component:**
```html
<section class="pricing-section">
  <div class="section-container">
    <h2>Simple, Transparent Pricing</h2>
    <p class="section-intro">
      No hidden fees. No surprise charges. Clear packages for every business size.
    </p>

    <div class="pricing-grid">
      <!-- Starter Package -->
      <div class="pricing-card">
        <h3>Starter</h3>
        <p class="pricing-desc">Perfect for small businesses getting online</p>

        <div class="pricing-price">
          <span class="price-amount">$3,500</span>
          <span class="price-note">One-time investment</span>
        </div>

        <ul class="pricing-features">
          <li>✓ 5-page website</li>
          <li>✓ Mobile responsive</li>
          <li>✓ Basic SEO optimization</li>
          <li>✓ Contact form</li>
          <li>✓ SSL certificate</li>
          <li>✓ 1 year hosting</li>
          <li>✓ Email support</li>
        </ul>

        <button class="btn btn-outline">Get Started</button>
        <p class="cta-note">4-week delivery</p>
      </div>

      <!-- Professional Package (Featured) -->
      <div class="pricing-card pricing-card-featured">
        <div class="pricing-badge">Most Popular</div>
        
        <h3>Professional</h3>
        <p class="pricing-desc">Growing businesses that need to convert</p>

        <div class="pricing-price">
          <span class="price-amount">$8,500</span>
          <span class="price-note">One-time investment</span>
        </div>

        <ul class="pricing-features">
          <li>✓ 10-page website</li>
          <li>✓ Advanced responsive design</li>
          <li>✓ Full SEO optimization</li>
          <li>✓ CRM integration</li>
          <li>✓ Analytics setup</li>
          <li>✓ Email campaigns</li>
          <li>✓ 2 years hosting</li>
          <li>✓ Priority support</li>
        </ul>

        <button class="btn btn-primary">Schedule Consultation</button>
        <p class="cta-note">6-week delivery</p>
      </div>

      <!-- Enterprise Package -->
      <div class="pricing-card">
        <h3>Enterprise</h3>
        <p class="pricing-desc">Large-scale implementations & custom needs</p>

        <div class="pricing-price">
          <span class="price-amount">Custom</span>
          <span class="price-note">Based on requirements</span>
        </div>

        <ul class="pricing-features">
          <li>✓ Unlimited pages</li>
          <li>✓ Custom design</li>
          <li>✓ Advanced integrations</li>
          <li>✓ Multi-language support</li>
          <li>✓ Advanced security</li>
          <li>✓ Dedicated account manager</li>
          <li>✓ Ongoing optimization</li>
          <li>✓ 24/7 support</li>
        </ul>

        <button class="btn btn-outline">Contact Us</button>
        <p class="cta-note">Custom timeline</p>
      </div>
    </div>

    <!-- Pricing Comparison Table -->
    <div class="pricing-comparison">
      <h3>Compare All Plans</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Starter</th>
            <th>Professional</th>
            <th>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pages</strong></td>
            <td>5</td>
            <td>10</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td><strong>CRM Integration</strong></td>
            <td>-</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td><strong>Email Campaigns</strong></td>
            <td>-</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td><strong>Support</strong></td>
            <td>Email</td>
            <td>Priority</td>
            <td>24/7</td>
          </tr>
          <!-- More rows... -->
        </tbody>
      </table>
    </div>
  </div>
</section>
```

**CSS:**
```css
.pricing-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #0D3A7D 0%, #2196F3 100%);
  color: #FFFFFF;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
}

.pricing-card {
  background: #FFFFFF;
  color: #333;
  padding: 40px 32px;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 300ms ease;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.pricing-card-featured {
  border-color: #FFC107;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), transparent);
  transform: scale(1.05);
}

.pricing-badge {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: #FFC107;
  color: #0D3A7D;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.pricing-card h3 {
  font-size: 24px;
  font-weight: 700;
  color: #0D3A7D;
  margin-bottom: 8px;
}

.pricing-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}

.pricing-price {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E0E0E0;
}

.price-amount {
  font-size: 36px;
  font-weight: 700;
  color: #0D3A7D;
}

.price-note {
  font-size: 13px;
  color: #666;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
}

.pricing-features li {
  padding: 12px 0;
  border-bottom: 1px solid #F0F0F0;
  font-size: 14px;
  color: #666;
}

.pricing-features li:last-child {
  border-bottom: none;
}

.cta-note {
  font-size: 12px;
  color: #999;
  margin-top: 12px;
  text-align: center;
}

/* Comparison Table */
.pricing-comparison {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 12px;
  overflow-x: auto;
}

.pricing-comparison h3 {
  color: #FFFFFF;
  margin-bottom: 32px;
  text-align: center;
}

.pricing-comparison table {
  width: 100%;
  border-collapse: collapse;
}

.pricing-comparison th,
.pricing-comparison td {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  color: #FFFFFF;
}

.pricing-comparison th {
  font-weight: 600;
  background: rgba(0, 0, 0, 0.2);
}

.pricing-comparison td:first-child,
.pricing-comparison th:first-child {
  text-align: left;
}
```

---

## PART 3: COMPLETE COMPONENT LIBRARY

Now let's define ALL reusable components across the site:

### CORE COMPONENTS

#### 1. BUTTONS (Multiple Variants)
```html
<!-- Button Variants -->
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-ghost">Ghost Button</button>
<button class="btn btn-lg">Large Button</button>
<button class="btn btn-sm">Small Button</button>
<button class="btn" disabled>Disabled</button>
```

#### 2. CARDS (Service, Feature, Testimonial)
```html
<!-- Service Card -->
<div class="card card-service">
  <div class="card-icon">🔍</div>
  <h3>Service Name</h3>
  <p>Service description</p>
  <a href="#" class="card-link">Learn More →</a>
</div>

<!-- Feature Card -->
<div class="card card-feature">
  <div class="feature-icon">✓</div>
  <h4>Feature Name</h4>
  <p>Feature description</p>
</div>

<!-- Testimonial Card -->
<div class="card card-testimonial">
  <div class="testimonial-quote">Quote text</div>
  <div class="testimonial-author">
    <strong>Author Name</strong>
    <span>Title, Company</span>
  </div>
</div>
```

#### 3. SECTION HEADERS
```html
<div class="section-header">
  <h2>Section Title</h2>
  <p class="section-intro">Intro text explaining the section</p>
</div>
```

#### 4. CALL-TO-ACTION BLOCKS
```html
<!-- Simple CTA -->
<div class="cta-block">
  <h3>Ready to get started?</h3>
  <p>Let's discuss how we can help your business</p>
  <button class="btn btn-primary">Schedule Consultation</button>
</div>

<!-- Advanced CTA with form -->
<div class="cta-block cta-with-form">
  <div class="cta-content">
    <h3>Get Your Free Audit</h3>
    <p>Discover what's holding back your website</p>
  </div>
  <form class="cta-form">
    <input type="email" placeholder="Your email" required />
    <button type="submit" class="btn btn-primary">Get Free Audit</button>
  </form>
</div>
```

#### 5. TESTIMONIALS SECTION
```html
<section class="testimonials-section">
  <div class="testimonials-grid">
    <div class="testimonial">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">Quote</p>
      <div class="testimonial-author">
        <img src="/avatar.jpg" alt="Author" class="avatar" />
        <div>
          <strong>Name</strong>
          <span>Title, Company</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### 6. FAQ ACCORDION
```html
<div class="faq-section">
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      What does this service include?
      <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Detailed answer here</p>
    </div>
  </div>
</div>
```

#### 7. COMPARISON TABLE
```html
<table class="comparison-table">
  <thead>
    <tr>
      <th></th>
      <th>Competitor A</th>
      <th>Competitor B</th>
      <th>MediaBubble</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Feature</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓✓</td>
    </tr>
  </tbody>
</table>
```

#### 8. STATS / METRICS BOX
```html
<div class="stats-box">
  <div class="stat">
    <strong class="stat-number">500+</strong>
    <span class="stat-label">Websites Built</span>
  </div>
  <div class="stat">
    <strong class="stat-number">98%</strong>
    <span class="stat-label">Client Satisfaction</span>
  </div>
</div>
```

#### 9. TIMELINE
```html
<div class="timeline">
  <div class="timeline-step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Step Title</h3>
      <p>Step description</p>
    </div>
  </div>
</div>
```

#### 10. ICON GRIDS
```html
<div class="icon-grid">
  <div class="icon-item">
    <div class="icon">📊</div>
    <h4>Icon Name</h4>
    <p>Description</p>
  </div>
</div>
```

---

## PART 4: SERVICE PAGE TEMPLATE ARCHITECTURE

### Complete Template Structure (Reorderable)

```
Service Page = Hero + [Flexible Content Sections] + CTA Sections
```

**Web Development Example:**
```
1. Hero / Page Title
   ├─ Breadcrumb
   ├─ Title: "Web Development Services"
   ├─ Subtitle: Value prop
   └─ Hero Image + CTA

2. Problems Section
   └─ 4 problem cards (Web dev challenges)

3. How It Works Section
   └─ 5-step timeline process

4. Features Section
   └─ 8 feature cards (What's included)

5. Results / ROI Section
   └─ Key metrics about web development impact

6. Case Study
   └─ Featured case study (Aldau Resort)
   └─ 3 smaller case study cards

7. Testimonials
   └─ 3-4 client testimonials

8. FAQ
   └─ 8-10 common questions

9. Pricing
   └─ 3 pricing tiers comparison

10. Tools & Technologies
    └─ Tech stack used (React, Next.js, AWS, etc.)

11. Related Services
    └─ 3-4 related services grid with links

12. Final CTA
    └─ "Ready to start your project?"
```

**SEO / Example:**
```
1. Hero
2. Why SEO Matters (Problem section)
3. Our SEO Strategy (How it works)
4. On-Page, Technical, Off-Page (Features)
5. SEO Results (Before/After data)
6. Case Study
7. Testimonials
8. FAQ
9. SEO Packages
10. Tools Used
11. Related Services
12. CTA
```

### Template Rules

✅ **Always Include:**
- Hero section (establishes service clearly)
- Problem section (builds motivation)
- Solution/Process section (builds confidence)
- Case study/social proof (builds trust)
- CTA (drives conversions)

✅ **Customize Per Service:**
- Hero image/video
- Specific problems
- Specific process
- Specific case studies
- Feature/benefit bullets

⚠️ **Optional (Based on Service Type):**
- Pricing (only if selling packages)
- FAQ (add if >5 common questions)
- Testimonials (if you have them)
- Comparison table (only if comparing to alternatives)
- Timeline (only if sequential/project-based)

---

## PART 5: COMPONENT DESIGN TOKENS

### CSS Variable System (Foundation)

```css
:root {
  /* Colors */
  --color-primary: #0D3A7D;
  --color-secondary: #FFC107;
  --color-accent: #2196F3;
  --color-success: #4CAF50;
  --color-danger: #d32f2f;
  
  /* Text Colors */
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --text-inverse: #FFFFFF;
  
  /* Background Colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --bg-tertiary: #E0E0E0;
  
  /* Spacing (8px base unit) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.2);
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;
  
  /* Breakpoints (mobile-first) */
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;
}
```

### Component Base CSS

```css
/* Base button styles */
.btn {
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.btn-primary {
  background: var(--color-secondary);
  color: var(--color-primary);
}

.btn-primary:hover {
  background: #FFB300;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Base card styles */
.card {
  padding: var(--space-lg);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--bg-tertiary);
  transition: all var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* Base section styles */
.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

section {
  padding: var(--space-3xl) var(--space-md);
}
```

---

## PART 6: SERVICE PAGE CHECKLIST

### Before Publishing Service Page:

**Content Quality:**
- [ ] H1 tag is clear & keyword-rich
- [ ] Intro paragraph (150 chars) captures service value
- [ ] At least 1 case study included
- [ ] All CTAs point to conversion goal
- [ ] 5+ internal links to related services
- [ ] Image alt tags all filled in

**Conversion Optimization:**
- [ ] 3+ CTAs on page (hero, middle, bottom)
- [ ] "Get Free Consultation" button on every CTA
- [ ] Contact form auto-focuses email field
- [ ] Exit-intent modal triggers if applicable
- [ ] GA4 events tracked for all CTAs

**Technical SEO:**
- [ ] Page title optimized (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Schema markup (Service schema)
- [ ] Open Graph tags for social sharing
- [ ] Mobile responsive tested
- [ ] Page speed <3 seconds (LCP)
- [ ] Core Web Vitals all "Good"

**Accessibility:**
- [ ] WCAG 2.1 AA compliant
- [ ] All images have alt text
- [ ] Color contrast ≥4.5:1
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader tested

**Cross-Linking:**
- [ ] Parent service page linked
- [ ] Related services linked
- [ ] Home page navigation includes service
- [ ] Breadcrumb navigation working

---

## PART 7: SERVICE PAGE CREATION WORKFLOW

### Time: 30-45 minutes per page (with template)

```
Step 1: Choose Template (5 min)
├─ Decide which sections to include
└─ Order sections logically

Step 2: Add Content (15 min)
├─ Hero title & subtitle
├─ Problem statements
├─ Process steps
├─ Features list
├─ Case study summary
└─ Pricing (if applicable)

Step 3: Select/Create Assets (10 min)
├─ Hero image
├─ Icons (if needed)
├─ Client logos
└─ Case study images

Step 4: Style with Components (5 min)
├─ Import CSS variable system
├─ Apply component classes
├─ Adjust spacing
└─ Test responsiveness

Step 5: SEO & Analytics (5 min)
├─ Title tags
├─ Meta descriptions
├─ Schema markup
├─ GA4 event tracking

Step 6: QA Review (5-10 min)
├─ Check all links
├─ Test CTAs
├─ Mobile responsive test
├─ Accessibility audit
└─ Browser testing
```

---

## SUMMARY: WHAT WE'VE DESIGNED

✅ **Service Page Blueprint:** Complete structure with optimal flow  
✅ **6 Detailed Section Examples:** Copy-ready HTML/CSS  
✅ **10+ Reusable Components:** Buttons, cards, testimonials, etc.  
✅ **CSS Variable System:** Design tokens for consistency  
✅ **Conversion Architecture:** 3+ CTAs strategically placed  
✅ **Content Checklist:** Pre-launch verification  
✅ **30-Min Creation Workflow:** Speed without sacrificing quality  

**Impact:**
- Build new service pages in 30-45 min (was 4-6 hours)
- 100% consistent styling across all services
- Better conversions (3 strategically-placed CTAs)
- Easy to A/B test individual sections
- Scalable for future services

---

**Ready to start building service pages?** 🚀

Which service should we create first?

