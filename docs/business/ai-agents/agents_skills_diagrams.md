# MediaBubble AI Agents Skills Architecture - Mermaid Diagrams

**Visual Skills Framework, Progression Pathways & Development Models**

---

## 1. FIVE-LEVEL SKILLS PROGRESSION FRAMEWORK

```mermaid
graph TD
    L1["<b>LEVEL 1: FOUNDATIONAL</b><br/>Learning & Guided Practice<br/><br/>✓ Understands concepts<br/>✓ Follows processes<br/>✓ Makes mistakes<br/>✓ Asks questions<br/><br/>Timeline: 3-6 months"]

    L2["<b>LEVEL 2: COMPETENT</b><br/>Independent Execution<br/><br/>✓ Works independently<br/>✓ Consistent quality<br/>✓ Best practices<br/>✓ Mentors others<br/><br/>Timeline: 6-12 months"]

    L3["<b>LEVEL 3: ADVANCED</b><br/>Complex Problem-Solving<br/><br/>✓ Solves complex issues<br/>✓ Makes design decisions<br/>✓ Mentors regularly<br/>✓ Process improvement<br/><br/>Timeline: 12-18 months"]

    L4["<b>LEVEL 4: LEAD</b><br/>Strategic Leadership<br/><br/>✓ Sets direction<br/>✓ Leads specialists<br/>✓ Designs systems<br/>✓ Cross-team influence<br/><br/>Timeline: 18-24 months"]

    L5["<b>LEVEL 5: EXPERT</b><br/>Visionary Leadership<br/><br/>✓ Sets strategy<br/>✓ Breaks new ground<br/>✓ Industry recognized<br/>✓ Shapes direction<br/><br/>Timeline: 3-5+ years"]

    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5

    style L1 fill:#c8e6c9
    style L2 fill:#81c784
    style L3 fill:#558b2f
    style L4 fill:#fbc02d
    style L5 fill:#ff6f00
```

---

## 2. UNIVERSAL SKILLS (All 287 Agents)

```mermaid
graph TD
    A["UNIVERSAL SKILLS<br/>(All 287 Agents)<br/>5-Level Progression"]

    B["1. Core Communication<br/>Clarity • Listening<br/>Adaptation • Rapport"]

    C["2. Process Adherence<br/>Workflows • Quality gates<br/>Escalation • Compliance"]

    D["3. Quality Consciousness<br/>Standards • Self-checks<br/>Improvement • Mastery"]

    E["4. Collaboration<br/>Teamwork • Support<br/>Culture • Goals"]

    F["5. Continuous Learning<br/>Growth • Feedback<br/>Development • Currency"]

    G["6. Ethical Conduct<br/>Confidentiality • Ethics<br/>Responsibility • Integrity"]

    H["7. Problem-Solving<br/>Analysis • Root cause<br/>Solutions • Innovation"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H

    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#bbdefb
    style D fill:#bbdefb
    style E fill:#bbdefb
    style F fill:#bbdefb
    style G fill:#bbdefb
    style H fill:#bbdefb
```

---

## 3. DESIGN DEPARTMENT SKILLS (6 Core Skills)

```mermaid
graph TD
    A["DESIGN DEPARTMENT<br/>33 Agents"]

    B["1. Visual Design<br/>Fundamentals<br/>Color • Typography<br/>Layout • Accessibility"]

    C["2. Design Systems<br/>Components • Tokens<br/>Patterns • Scalability"]

    D["3. User Experience<br/>Research • IA<br/>Interaction • Testing"]

    E["4. Design Tools<br/>Figma • Prototyping<br/>Documentation • Workflows"]

    F["5. Communication<br/>Storytelling • Presenting<br/>Documentation • Critique"]

    G["6. Cross-functional<br/>Collaboration<br/>Dev handoff • Product<br/>Client • Agile"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    B -.->|"L1-L5"| H["LEVELS<br/>1: Basic<br/>2: Independent<br/>3: Advanced<br/>4: Leadership<br/>5: Expert"]

    style A fill:#f3e5f5
    style B fill:#f3e5f5
    style C fill:#f3e5f5
    style D fill:#f3e5f5
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style G fill:#f3e5f5
    style H fill:#e1bee7
```

---

## 4. SOCIAL MEDIA DEPARTMENT SKILLS (6 Core Skills)

```mermaid
graph TD
    A["SOCIAL MEDIA DEPT<br/>50 Agents"]

    B["1. Content Creation<br/>Writing • Storytelling<br/>Video • Multimedia"]

    C["2. Platform Expertise<br/>Features • Algorithm<br/>Trends • Optimization"]

    D["3. Audience Engagement<br/>Community mgmt<br/>Relationship • Crisis"]

    E["4. Analytics & Data<br/>Metrics • Analysis<br/>Insights • Optimization"]

    F["5. Multilingual Fluency<br/>Arabic • English<br/>Dialect • Cultural"]

    G["6. Campaign Strategy<br/>Planning • Goals<br/>Timeline • ROI"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    style A fill:#fce4ec
    style B fill:#fce4ec
    style C fill:#fce4ec
    style D fill:#fce4ec
    style E fill:#fce4ec
    style F fill:#fce4ec
    style G fill:#fce4ec
```

---

## 5. DEVELOPMENT DEPARTMENT SKILLS (6 Core Skills)

```mermaid
graph TD
    A["DEVELOPMENT DEPT<br/>45 Agents"]

    B["1. Programming Language<br/>Syntax • Idioms<br/>Optimization • Advanced"]

    C["2. System Architecture<br/>Design patterns<br/>Scalability • Database"]

    D["3. Software Quality<br/>Testing • Code review<br/>Documentation • Performance"]

    E["4. Problem-Solving<br/>Root cause • Debug<br/>Performance • Complexity"]

    F["5. Collaboration<br/>Documentation • PRs<br/>Design • Discussions"]

    G["6. Continuous Learning<br/>New frameworks<br/>Trends • Tools • Patterns"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    style A fill:#e8f5e9
    style B fill:#e8f5e9
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#e8f5e9
    style F fill:#e8f5e9
    style G fill:#e8f5e9
```

---

## 6. FINANCE DEPARTMENT SKILLS (6 Core Skills)

```mermaid
graph TD
    A["FINANCE DEPT<br/>28 Agents"]

    B["1. Financial Accounting<br/>Transactions • Reconciliation<br/>Reporting • Audit"]

    C["2. Data Analysis<br/>Reports • Analysis<br/>Modeling • Forecasting"]

    D["3. Budget Management<br/>Preparation • Tracking<br/>Forecasting • Optimization"]

    E["4. Compliance & Controls<br/>Regulatory • Controls<br/>Documentation • Audit"]

    F["5. Problem-Solving<br/>Issue identification<br/>Root cause • Solutions"]

    G["6. Communication<br/>Financial communication<br/>Executive reporting"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    style A fill:#ffe0b2
    style B fill:#ffe0b2
    style C fill:#ffe0b2
    style D fill:#ffe0b2
    style E fill:#ffe0b2
    style F fill:#ffe0b2
    style G fill:#ffe0b2
```

---

## 7. MANAGER SKILLS HIERARCHY

```mermaid
graph TD
    A["SPECIALIST SKILLS<br/>(Tier 5)<br/>Domain Expertise<br/>Execution Focus"]

    B["TEAM MANAGER SKILLS<br/>(Tier 4)<br/>+ Talent Development<br/>+ Performance Management<br/>+ Team Leadership<br/>+ Delegation"]

    C["SENIOR MANAGER SKILLS<br/>(Tier 3)<br/>+ Strategic Thinking<br/>+ Leadership Development<br/>+ Policy & Standards<br/>+ Cross-Dept Influence"]

    D["DIRECTOR SKILLS<br/>(Tier 2)<br/>+ Strategic Leadership<br/>+ Executive Presence<br/>+ P&L Management<br/>+ Org Design"]

    E["CEO SKILLS<br/>(Tier 1)<br/>+ Visionary Leadership<br/>+ Business Model Design<br/>+ Stakeholder Mgmt<br/>+ Decision-Making"]

    A --> B
    B --> C
    C --> D
    D --> E

    style A fill:#fce4ec
    style B fill:#e8f5e9
    style C fill:#f3e5f5
    style D fill:#fff3e0
    style E fill:#e1f5ff
```

---

## 8. CAREER PATHWAYS (IC Track vs Management Track)

```mermaid
graph TD
    A["Specialist<br/>Level 1"]

    B1["IC Track<br/>Senior Specialist"]
    B2["Management Track<br/>Team Manager"]

    C1["Lead Specialist"]
    C2["Senior Manager"]

    D1["Principal Specialist"]
    D2["Director"]

    E1["Distinguished Specialist"]
    E2["CEO/Executive"]

    F["Dual Track Option:<br/>Can move between tracks"]

    A --> B1
    A --> B2

    B1 --> C1
    B2 --> C2

    C1 --> D1
    C2 --> D2

    D1 --> E1
    D2 --> E2

    B1 -.-> |"Experience"| B2
    B2 -.-> |"Return to IC"| C1

    F -.-> A

    style A fill:#c8e6c9
    style B1 fill:#81c784
    style B2 fill:#81c784
    style C1 fill:#558b2f
    style C2 fill:#558b2f
    style D1 fill:#fbc02d
    style D2 fill:#fbc02d
    style E1 fill:#ff6f00
    style E2 fill:#ff6f00
    style F fill:#b3e5fc
```

---

## 9. SKILLS ASSESSMENT METHODOLOGY (360-Degree)

```mermaid
graph TD
    A["AGENT SKILLS<br/>ASSESSMENT"]

    B["Self-Assessment<br/>Agent evaluates<br/>own skills"]

    C["Manager Assessment<br/>Direct manager<br/>rates agent"]

    D["Peer Assessment<br/>Colleagues<br/>provide feedback"]

    E["Portfolio Review<br/>Work samples<br/>& evidence"]

    F["Skill Test<br/>Practical demonstration<br/>of mastery"]

    G["FINAL LEVEL<br/>CERTIFICATION<br/>L1-L5"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F

    B --> G
    C --> G
    D --> G
    E --> G
    F --> G

    H["Timeline:<br/>6 weeks"]

    H -.-> G

    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#bbdefb
    style D fill:#bbdefb
    style E fill:#bbdefb
    style F fill:#bbdefb
    style G fill:#1e88e5
    style H fill:#81d4fa
```

---

## 10. SKILL DEVELOPMENT TIMELINE BY LEVEL

```mermaid
graph LR
    L1["<b>Level 1</b><br/>Foundational<br/>0-3 months"]
    L2["<b>Level 2</b><br/>Competent<br/>3-9 months"]
    L3["<b>Level 3</b><br/>Advanced<br/>9-21 months"]
    L4["<b>Level 4</b><br/>Lead<br/>21-45 months"]
    L5["<b>Level 5</b><br/>Expert<br/>45+ months"]

    L1 -->|"3-6 mo"| L2
    L2 -->|"6-12 mo"| L3
    L3 -->|"12-18 mo"| L4
    L4 -->|"18-24 mo"| L5

    style L1 fill:#c8e6c9
    style L2 fill:#81c784
    style L3 fill:#558b2f
    style L4 fill:#fbc02d
    style L5 fill:#ff6f00
```

---

## 11. DESIGN SPECIALIST SKILL PROGRESSION

```mermaid
graph TD
    A["WEB UI DESIGNER<br/>4 specialists"]

    L1["L1: Basic principles<br/>Follows guidelines<br/>Simple layouts"]
    L2["L2: Responsive design<br/>Independent work<br/>Good UX"]
    L3["L3: Advanced systems<br/>Complex interactions<br/>Mentoring"]
    L4["L4: Design system<br/>Standards setting<br/>Cross-team"]
    L5["L5: Industry-defining<br/>Breakthrough work<br/>Thought leadership"]

    A --> L1
    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5

    style L1 fill:#c8e6c9
    style L2 fill:#81c784
    style L3 fill:#558b2f
    style L4 fill:#fbc02d
    style L5 fill:#ff6f00
```

---

## 12. SOCIAL MEDIA SPECIALIST SKILL PROGRESSION

```mermaid
graph TD
    A["SEO CONTENT<br/>CREATOR<br/>4 specialists"]

    L1["L1: Basic keywords<br/>Solid writing<br/>Follows SEO guides"]
    L2["L2: Independent optimization<br/>High-performing content<br/>Best practices"]
    L3["L3: Complex strategy<br/>Content innovation<br/>Mentoring others"]
    L4["L4: Content leadership<br/>Strategy setting<br/>Cross-team influence"]
    L5["L5: Brand voice<br/>Industry thought leader<br/>Awards/recognition"]

    A --> L1
    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5

    style L1 fill:#c8e6c9
    style L2 fill:#81c784
    style L3 fill:#558b2f
    style L4 fill:#fbc02d
    style L5 fill:#ff6f00
```

---

## 13. DEVELOPMENT ENGINEER SKILL PROGRESSION

```mermaid
graph TD
    A["BACKEND ENGINEER<br/>6 specialists"]

    L1["L1: Language basics<br/>Follows patterns<br/>Guided development"]
    L2["L2: Production code<br/>Independent coding<br/>Good architecture"]
    L3["L3: System design<br/>Complex problems<br/>Mentoring"]
    L4["L4: Architecture lead<br/>Standards setting<br/>Team decisions"]
    L5["L5: Chief architect<br/>Breakthrough design<br/>Industry impact"]

    A --> L1
    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5

    style L1 fill:#c8e6c9
    style L2 fill:#81c784
    style L3 fill:#558b2f
    style L4 fill:#fbc02d
    style L5 fill:#ff6f00
```

---

## 14. MANAGER SKILL PROGRESSION (Team Manager → Director)

```mermaid
graph TD
    A["TEAM MANAGER<br/>45 agents"]

    B["Talent Development<br/>Individual assessment<br/>Development plans<br/>Coaching"]

    C["Performance Management<br/>Goal setting<br/>Feedback<br/>Reviews"]

    D["Team Leadership<br/>Direction setting<br/>Decision-making<br/>Culture"]

    E["Delegation<br/>Work assignment<br/>Workload balance<br/>Authority"]

    F["Cross-functional<br/>Collaboration<br/>Relationships<br/>Conflict resolution"]

    G["Operational Excellence<br/>Processes<br/>Quality<br/>Improvement"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    H["+ SENIOR MANAGER"]
    I["Strategic Thinking<br/>Leadership Development<br/>Policy & Standards<br/>Cross-Dept Influence"]

    B -.-> H
    H -.-> I

    style A fill:#e8f5e9
    style B fill:#e8f5e9
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#e8f5e9
    style F fill:#e8f5e9
    style G fill:#e8f5e9
    style H fill:#f3e5f5
    style I fill:#f3e5f5
```

---

## 15. ANNUAL SKILLS INVESTMENT & ROI

```mermaid
graph TD
    A["ANNUAL SKILLS<br/>INVESTMENT"]

    B["Specialist Training<br/>80-120 hours/year<br/>$5K-$8K per agent<br/>287 agents"]

    C["Manager Development<br/>150-200 hours/year<br/>$10K-$15K per manager<br/>81 managers"]

    D["Director Development<br/>200-250 hours/year<br/>$15K-$25K per director<br/>9 directors"]

    E["TOTAL INVESTMENT<br/>$850K-$1.2M/year"]

    F["EXPECTED ROI"]

    G["25-35% Productivity<br/>Improvement"]

    H["40-60% Quality<br/>Issue Reduction"]

    I["50-70% Internal<br/>Promotion Rate"]

    J["85%+ High-Performer<br/>Retention"]

    A --> B
    A --> C
    A --> D

    B --> E
    C --> E
    D --> E

    E --> F

    F --> G
    F --> H
    F --> I
    F --> J

    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#bbdefb
    style D fill:#bbdefb
    style E fill:#1e88e5
    style F fill:#fbc02d
    style G fill:#81c784
    style H fill:#81c784
    style I fill:#81c784
    style J fill:#81c784
```

---

## 16. DEPARTMENT SPECIALIST TEAMS (Design)

```mermaid
graph TD
    A["DESIGN DEPT<br/>33 Agents"]

    B["Web UI<br/>4 agents<br/>Responsive design"]

    C["Mobile/App<br/>4 agents<br/>Mobile-first"]

    D["Brand Identity<br/>3 agents<br/>Logo & systems"]

    E["Color/Typography<br/>3 agents<br/>Type systems"]

    F["Motion Design<br/>4 agents<br/>Animation"]

    G["QC Lead<br/>1 agent<br/>Quality standards"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    style A fill:#f3e5f5
    style B fill:#f3e5f5
    style C fill:#f3e5f5
    style D fill:#f3e5f5
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style G fill:#e1bee7
```

---

## 17. DEPARTMENT SPECIALIST TEAMS (Development)

```mermaid
graph TD
    A["DEVELOPMENT DEPT<br/>45 Agents"]

    B["Backend<br/>6 agents<br/>Server logic"]

    C["Frontend<br/>6 agents<br/>Client UI"]

    D["Full Stack<br/>6 agents<br/>End-to-end"]

    E["DevOps<br/>5 agents<br/>Infrastructure"]

    F["Mobile<br/>6 agents<br/>iOS/Android"]

    G["QA/Testing<br/>6 agents<br/>Quality"]

    H["QC Lead<br/>1 agent<br/>Code standards"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H

    style A fill:#e8f5e9
    style B fill:#e8f5e9
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#e8f5e9
    style F fill:#e8f5e9
    style G fill:#e8f5e9
    style H fill:#a5d6a7
```

---

## 18. CONTINUOUS LEARNING CYCLE

```mermaid
graph TD
    A["CONTINUOUS LEARNING<br/>CYCLE"]

    B["Quarterly<br/>New skills intro<br/>Emerging tools<br/>Trend briefings<br/>Best practices"]

    C["Semi-Annually<br/>Deep skill training<br/>Certifications<br/>Conferences<br/>Advanced techniques"]

    D["Annually<br/>Gap assessment<br/>Development planning<br/>Specialization<br/>Leadership training"]

    E["Ongoing<br/>1-2 hours/week<br/>Learning time<br/>Managers: 2-3 hrs<br/>Directors: 3-4 hrs"]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> A

    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#90caf9
    style D fill:#64b5f6
    style E fill:#42a5f5
```

---

## 19. SKILLS BY DEPARTMENT - DISTRIBUTION

```mermaid
graph TD
    A["DESIGN<br/>6 core skills<br/>20+ specialist skills"]
    B["SOCIAL MEDIA<br/>6 core skills<br/>25+ specialist skills"]
    C["DEVELOPMENT<br/>6 core skills<br/>30+ specialist skills"]
    D["FINANCE<br/>6 core skills<br/>15+ specialist skills"]
    E["OPERATIONS<br/>6 core skills<br/>20+ specialist skills"]
    F["MARKETING<br/>6 core skills<br/>20+ specialist skills"]
    G["LEAD GEN<br/>6 core skills<br/>20+ specialist skills"]
    H["MEDIA BUYING<br/>6 core skills<br/>20+ specialist skills"]
    I["SALES<br/>6 core skills<br/>25+ specialist skills"]

    J["+ UNIVERSAL SKILLS<br/>7 skills<br/>All agents"]

    J --> A
    J --> B
    J --> C
    J --> D
    J --> E
    J --> F
    J --> G
    J --> H
    J --> I

    style J fill:#e3f2fd
    style A fill:#f3e5f5
    style B fill:#fce4ec
    style C fill:#e8f5e9
    style D fill:#ffe0b2
    style E fill:#c8e6c9
    style F fill:#fff3e0
    style G fill:#f0f4c3
    style H fill:#ffccbc
    style I fill:#e1f5ff
```

---

## 20. SKILLS ASSESSMENT CERTIFICATION LEVELS

```mermaid
graph TD
    L1["LEVEL 1<br/>CERTIFICATION<br/>Manager confirmation<br/>Checklist completion"]

    L2["LEVEL 2<br/>CERTIFICATION<br/>Manager assessment<br/>Peer feedback<br/>Portfolio review"]

    L3["LEVEL 3<br/>CERTIFICATION<br/>Manager + Senior Mgr<br/>Peer validation<br/>Comprehensive portfolio<br/>Skill demo"]

    L4["LEVEL 4<br/>CERTIFICATION<br/>Director assessment<br/>Cross-team validation<br/>Strategic work samples<br/>Industry benchmarking"]

    L5["LEVEL 5<br/>CERTIFICATION<br/>CEO assessment<br/>Multi-stakeholder<br/>Organizational impact<br/>Industry recognition"]

    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5

    style L1 fill:#c8e6c9
    style L2 fill:#81c784
    style L3 fill:#558b2f
    style L4 fill:#fbc02d
    style L5 fill:#ff6f00
```

---

**All skills diagrams ready for implementation and training delivery.**
