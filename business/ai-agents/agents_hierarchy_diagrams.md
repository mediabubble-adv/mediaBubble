# MediaBubble AI Agents Hierarchy - Mermaid Diagrams
**Visual Architecture of Organizational Structure**

---

## 1. OVERALL ORGANIZATIONAL HIERARCHY (5-Tier Structure)

```mermaid
graph TD
    A["<b>TIER 1: EXECUTIVE</b><br/>CEO/Chief Orchestration Agent<br/>(1 agent)"] 
    
    B["<b>TIER 2: DEPARTMENT DIRECTORS</b><br/>(9 agents)"]
    C["Design Director"]
    D["Social Media Director"]
    E["Development Director"]
    F["Operations Director"]
    G["Finance Director"]
    H["Marketing Director"]
    I["Lead Gen Director"]
    J["Media Buying Director"]
    K["Sales Director"]
    
    L["<b>TIER 3: SENIOR MANAGEMENT</b><br/>(36 agents)<br/>QC Leads • Project Managers • Senior Team Managers"]
    
    M["<b>TIER 4: TEAM MANAGERS</b><br/>(45 agents)<br/>5-7 per department"]
    
    N["<b>TIER 5: SPECIALIST AGENTS</b><br/>(215+ agents)<br/>4-6 per team manager"]
    
    A --> B
    B --> |"Each Director leads"| L
    L --> |"Oversee"| M
    M --> |"Manage"| N
    
    B -.->|"9 departments"| C
    B -.->|"9 departments"| D
    B -.->|"9 departments"| E
    B -.->|"9 departments"| F
    B -.->|"9 departments"| G
    B -.->|"9 departments"| H
    B -.->|"9 departments"| I
    B -.->|"9 departments"| J
    B -.->|"9 departments"| K
    
    style A fill:#e1f5ff,stroke:#01579b,stroke-width:3px,color:#000
    style B fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    style L fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    style M fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000
    style N fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#000
```

---

## 2. SPAN OF CONTROL BY LEVEL

```mermaid
graph LR
    A["CEO<br/>(1)"] -->|"9 direct reports"| B["Department Directors<br/>(9)"]
    B -->|"6-8 direct reports each"| C["Senior Management<br/>(36)"]
    C -->|"4-5 direct reports each"| D["Team Managers<br/>(45)"]
    D -->|"4-6 direct reports each"| E["Specialist Agents<br/>(215+)"]
    
    style A fill:#e1f5ff
    style B fill:#fff3e0
    style C fill:#f3e5f5
    style D fill:#e8f5e9
    style E fill:#fce4ec
```

---

## 3. DESIGN DEPARTMENT HIERARCHY (33 agents)

```mermaid
graph TD
    A["Design Director<br/>(1)"]
    
    B["QC Lead<br/>(1)"]
    C["Project Manager<br/>(1)"]
    D["Senior Team Manager<br/>(1)"]
    
    E["Web UI<br/>Team Manager"]
    F["Mobile<br/>Team Manager"]
    G["Application<br/>Team Manager"]
    H["Brand Identity<br/>Team Manager"]
    I["Color/Typography<br/>Team Manager"]
    J["Motion<br/>Team Manager"]
    
    E1["Web UI Designers<br/>(4)"]
    F1["Mobile Designers<br/>(4)"]
    G1["App Designers<br/>(4)"]
    H1["Brand Designers<br/>(3)"]
    I1["Color/Typo<br/>Specialists<br/>(3)"]
    J1["Motion Designers<br/>(4)"]
    
    A --> B
    A --> C
    A --> D
    
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    D --> J
    
    E --> E1
    F --> F1
    G --> G1
    H --> H1
    I --> I1
    J --> J1
    
    style A fill:#fff3e0
    style B fill:#f3e5f5
    style C fill:#f3e5f5
    style D fill:#f3e5f5
    style E fill:#e8f5e9
    style F fill:#e8f5e9
    style G fill:#e8f5e9
    style H fill:#e8f5e9
    style I fill:#e8f5e9
    style J fill:#e8f5e9
```

---

## 4. SOCIAL MEDIA DEPARTMENT HIERARCHY (50 agents)

```mermaid
graph TD
    A["Social Media Director<br/>(1)"]
    
    B["QC Lead<br/>(1)"]
    C["Project Manager<br/>(1)"]
    D["Senior Team Manager<br/>(1)"]
    
    E["SEO Content<br/>Manager"]
    F["Educational<br/>Manager"]
    G["Engagement<br/>Manager"]
    H["Brand Content<br/>Manager"]
    I["Video<br/>Manager"]
    J["Reel/Short-form<br/>Manager"]
    K["Arabic Formal<br/>Manager"]
    L["Masri Dialect<br/>Manager"]
    M["LinkedIn<br/>Manager"]
    N["Instagram/TikTok<br/>Manager"]
    
    A --> B
    A --> C
    A --> D
    
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    D --> J
    D --> K
    D --> L
    D --> M
    D --> N
    
    E --> |"4 creators"| E1["Content<br/>Team"]
    F --> |"4 creators"| F1["Content<br/>Team"]
    G --> |"4 creators"| G1["Content<br/>Team"]
    H --> |"3 creators"| H1["Content<br/>Team"]
    I --> |"4 creators"| I1["Content<br/>Team"]
    J --> |"4 creators"| J1["Content<br/>Team"]
    K --> |"3 creators"| K1["Content<br/>Team"]
    L --> |"3 creators"| L1["Content<br/>Team"]
    M --> |"2 creators"| M1["Content<br/>Team"]
    N --> |"3 creators"| N1["Content<br/>Team"]
    
    style A fill:#fff3e0
    style B fill:#f3e5f5
    style C fill:#f3e5f5
    style D fill:#f3e5f5
```

---

## 5. DEVELOPMENT DEPARTMENT HIERARCHY (45 agents)

```mermaid
graph TD
    A["Development Director<br/>(1)"]
    
    B["QC Lead<br/>(1)"]
    C["Project Manager<br/>(1)"]
    D["Senior Team Manager<br/>(1)"]
    
    E["Backend<br/>Team Manager"]
    F["Frontend<br/>Team Manager"]
    G["Full Stack<br/>Team Manager"]
    H["DevOps<br/>Team Manager"]
    I["Mobile<br/>Team Manager"]
    J["QA/Testing<br/>Team Manager"]
    
    E1["Backend Engineers<br/>(6)"]
    F1["Frontend Engineers<br/>(6)"]
    G1["Full Stack Engineers<br/>(6)"]
    H1["DevOps Engineers<br/>(5)"]
    I1["Mobile Engineers<br/>(6)"]
    J1["QA Specialists<br/>(6)"]
    
    A --> B
    A --> C
    A --> D
    
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    D --> J
    
    E --> E1
    F --> F1
    G --> G1
    H --> H1
    I --> I1
    J --> J1
    
    style A fill:#fff3e0
    style B fill:#f3e5f5
    style C fill:#f3e5f5
    style D fill:#f3e5f5
```

---

## 6. DECISION AUTHORITY BY LEVEL

```mermaid
graph TD
    A["Team Manager<br/>(Tier 4)<br/><br/>Authority:<br/>• Task assignments<br/>• Individual performance<br/>• Team mentoring<br/>• Minor optimizations"]
    
    B["Senior Manager<br/>(Tier 3)<br/><br/>Authority:<br/>• Function standards<br/>• Multi-team decisions<br/>• Process improvements<br/>• Hiring team managers"]
    
    C["Department Director<br/>(Tier 2)<br/><br/>Authority:<br/>• Department strategy<br/>• Budget allocation<br/>• Org design<br/>• Hiring managers"]
    
    D["CEO<br/>(Tier 1)<br/><br/>Authority:<br/>• Company strategy<br/>• Major resources<br/>• Org structure<br/>• Final decisions"]
    
    A -->|"Escalate if:"| B
    B -->|"Escalate if:"| C
    C -->|"Escalate if:"| D
    
    A -.->|"Multi-team impact"| B
    B -.->|"Strategic shift"| C
    C -.->|"Company-wide"| D
    
    style A fill:#e8f5e9
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e1f5ff
```

---

## 7. OPERATIONS DEPARTMENT HIERARCHY (28 agents)

```mermaid
graph TD
    A["Operations Director<br/>(1)"]
    
    B["QC Lead<br/>(1)"]
    C["Project Manager<br/>(1)"]
    D["Senior Team Manager<br/>(1)"]
    
    E["Process Optimization<br/>Manager"]
    F["Project Coordination<br/>Manager"]
    G["Quality Assurance<br/>Manager"]
    H["Resource Allocation<br/>Manager"]
    I["Knowledge Management<br/>Manager"]
    
    E1["Specialists<br/>(6)"]
    F1["Specialists<br/>(6)"]
    G1["Specialists<br/>(6)"]
    H1["Specialists<br/>(5)"]
    I1["Specialists<br/>(5)"]
    
    A --> B
    A --> C
    A --> D
    
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    
    E --> E1
    F --> F1
    G --> G1
    H --> H1
    I --> I1
    
    style A fill:#fff3e0
    style B fill:#f3e5f5
    style C fill:#f3e5f5
    style D fill:#f3e5f5
```

---

## 8. ESCALATION PATHWAYS

```mermaid
graph TD
    A["Team Manager<br/>Issue"]
    B["Senior Manager<br/>Review"]
    C["Director<br/>Decision"]
    D["CEO<br/>Strategic Decision"]
    
    A -->|"Block another team"| B
    A -->|"Resource conflict"| B
    A -->|"Policy change"| B
    
    B -->|"Multi-dept impact"| C
    B -->|"Budget change"| C
    B -->|"Strategic question"| C
    
    C -->|"Company direction"| D
    C -->|"Major budget"| D
    C -->|"Org structure"| D
    
    E["Timeline:<br/>1-2 days"] -.-> A
    F["Timeline:<br/>2-5 days"] -.-> B
    G["Timeline:<br/>1-2 weeks"] -.-> C
    H["Timeline:<br/>As needed"] -.-> D
    
    style A fill:#e8f5e9
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e1f5ff
```

---

## 9. CROSS-DEPARTMENT COMMUNICATION MATRIX

```mermaid
graph LR
    A["Design"]
    B["Development"]
    C["Social Media"]
    D["Marketing"]
    E["Sales"]
    F["Operations"]
    G["Finance"]
    H["Lead Gen"]
    I["Media Buying"]
    
    A <-->|"Designer-Dev<br/>handoff"| B
    C <-->|"Content &<br/>strategy"| D
    H <-->|"Lead quality<br/>& handoff"| E
    I <-->|"Campaign<br/>management"| D
    I <-->|"Performance"| E
    F -.->|"Process support"| A
    F -.->|"Process support"| B
    F -.->|"Process support"| C
    G -.->|"Budget &<br/>reporting"| A
    G -.->|"Budget &<br/>reporting"| B
    G -.->|"Budget &<br/>reporting"| C
    
    style A fill:#f3e5f5
    style B fill:#e8f5e9
    style C fill:#fce4ec
    style D fill:#fff3e0
    style E fill:#e1f5ff
    style F fill:#c8e6c9
    style G fill:#ffe0b2
    style H fill:#f0f4c3
    style I fill:#ffccbc
```

---

## 10. MANAGER RESPONSIBILITIES BY TIER

```mermaid
graph TD
    A["Team Manager<br/>(45 agents)<br/><br/>Responsibilities:<br/>• Daily team coordination<br/>• Individual performance<br/>• Development planning<br/>• Quality (first pass)<br/>• Problem solving<br/>• Mentoring"]
    
    B["Senior Manager<br/>(36 agents)<br/><br/>Responsibilities:<br/>• Function leadership<br/>• Multi-team strategy<br/>• Policy & standards<br/>• Quality gates<br/>• Manager development<br/>• Cross-team alignment"]
    
    C["Department Director<br/>(9 agents)<br/><br/>Responsibilities:<br/>• Department P&L<br/>• Strategic vision<br/>• Org design<br/>• Hiring & culture<br/>• Client relationships<br/>• Board reporting"]
    
    D["CEO<br/>(1 agent)<br/><br/>Responsibilities:<br/>• Company strategy<br/>• Resource allocation<br/>• Board relations<br/>• Investor relations<br/>• Market positioning<br/>• Culture & values"]
    
    A --> |"Escalation"| B
    B --> |"Escalation"| C
    C --> |"Escalation"| D
    
    style A fill:#e8f5e9
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e1f5ff
```

---

## 11. QUALITY ASSURANCE HIERARCHY

```mermaid
graph TD
    A["CEO"]
    
    B["Quality Governance Council<br/>(All 9 QC Leads + CEO)"]
    
    C["QC Lead<br/>Design"]
    D["QC Lead<br/>Social Media"]
    E["QC Lead<br/>Development"]
    F["QC Lead<br/>Operations"]
    G["QC Lead<br/>Finance"]
    H["QC Lead<br/>Marketing"]
    I["QC Lead<br/>Lead Gen"]
    J["QC Lead<br/>Media Buying"]
    K["QC Lead<br/>Sales"]
    
    L["Quality Gate 1<br/>Team Manager<br/>Initial Review"]
    
    M["Quality Gate 2<br/>QC Lead<br/>Final Approval"]
    
    N["Quality Gate 3<br/>Output<br/>Ships"]
    
    A --> B
    B --> C
    B --> D
    B --> E
    B --> F
    B --> G
    B --> H
    B --> I
    B --> J
    B --> K
    
    L --> M
    M --> N
    
    style A fill:#e1f5ff
    style B fill:#b3e5fc
    style C fill:#f3e5f5
    style D fill:#f3e5f5
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style G fill:#f3e5f5
    style H fill:#f3e5f5
    style I fill:#f3e5f5
    style J fill:#f3e5f5
    style K fill:#f3e5f5
    style L fill:#e8f5e9
    style M fill:#f3e5f5
    style N fill:#c8e6c9
```

---

## 12. AGENT DISTRIBUTION BY DEPARTMENT

```mermaid
pie title "287 Total AI Agents Distribution"
    "Design (33)" : 33
    "Social Media (50)" : 50
    "Development (45)" : 45
    "Operations (28)" : 28
    "Finance (28)" : 28
    "Marketing (44)" : 44
    "Lead Generation (44)" : 44
    "Media Buying (28)" : 28
    "Sales (40)" : 40
```

---

## 13. AGENT DISTRIBUTION BY TIER

```mermaid
pie title "287 Total AI Agents by Tier"
    "Tier 1 - CEO (1)" : 1
    "Tier 2 - Directors (9)" : 9
    "Tier 3 - Senior Mgmt (36)" : 36
    "Tier 4 - Team Managers (45)" : 45
    "Tier 5 - Specialists (215)" : 215
```

---

## 14. REPORTING STRUCTURE: FULL VIEW

```mermaid
graph TD
    CEO["CEO<br/>(Tier 1)<br/>1 agent"]
    
    DD1["Design<br/>Director"]
    DD2["Social Media<br/>Director"]
    DD3["Development<br/>Director"]
    DD4["Operations<br/>Director"]
    DD5["Finance<br/>Director"]
    DD6["Marketing<br/>Director"]
    DD7["Lead Gen<br/>Director"]
    DD8["Media Buying<br/>Director"]
    DD9["Sales<br/>Director"]
    
    SM1["Senior Mgmt<br/>Design<br/>3 agents"]
    SM2["Senior Mgmt<br/>Social<br/>3 agents"]
    SM3["Senior Mgmt<br/>Dev<br/>3 agents"]
    SM4["Senior Mgmt<br/>Ops<br/>3 agents"]
    SM5["Senior Mgmt<br/>Finance<br/>3 agents"]
    SM6["Senior Mgmt<br/>Marketing<br/>3 agents"]
    SM7["Senior Mgmt<br/>Lead Gen<br/>3 agents"]
    SM8["Senior Mgmt<br/>Media Buying<br/>3 agents"]
    SM9["Senior Mgmt<br/>Sales<br/>3 agents"]
    
    TM1["Team Mgrs<br/>Design<br/>6 agents"]
    TM2["Team Mgrs<br/>Social<br/>10 agents"]
    TM3["Team Mgrs<br/>Dev<br/>6 agents"]
    TM4["Team Mgrs<br/>Ops<br/>5 agents"]
    TM5["Team Mgrs<br/>Finance<br/>5 agents"]
    TM6["Team Mgrs<br/>Marketing<br/>6 agents"]
    TM7["Team Mgrs<br/>Lead Gen<br/>6 agents"]
    TM8["Team Mgrs<br/>Media Buying<br/>4 agents"]
    TM9["Team Mgrs<br/>Sales<br/>6 agents"]
    
    SP1["Specialists<br/>Design<br/>23 agents"]
    SP2["Specialists<br/>Social<br/>36 agents"]
    SP3["Specialists<br/>Dev<br/>35 agents"]
    SP4["Specialists<br/>Ops<br/>28 agents"]
    SP5["Specialists<br/>Finance<br/>28 agents"]
    SP6["Specialists<br/>Marketing<br/>44 agents"]
    SP7["Specialists<br/>Lead Gen<br/>44 agents"]
    SP8["Specialists<br/>Media Buying<br/>28 agents"]
    SP9["Specialists<br/>Sales<br/>40 agents"]
    
    CEO --> DD1
    CEO --> DD2
    CEO --> DD3
    CEO --> DD4
    CEO --> DD5
    CEO --> DD6
    CEO --> DD7
    CEO --> DD8
    CEO --> DD9
    
    DD1 --> SM1
    DD2 --> SM2
    DD3 --> SM3
    DD4 --> SM4
    DD5 --> SM5
    DD6 --> SM6
    DD7 --> SM7
    DD8 --> SM8
    DD9 --> SM9
    
    SM1 --> TM1
    SM2 --> TM2
    SM3 --> TM3
    SM4 --> TM4
    SM5 --> TM5
    SM6 --> TM6
    SM7 --> TM7
    SM8 --> TM8
    SM9 --> TM9
    
    TM1 --> SP1
    TM2 --> SP2
    TM3 --> SP3
    TM4 --> SP4
    TM5 --> SP5
    TM6 --> SP6
    TM7 --> SP7
    TM8 --> SP8
    TM9 --> SP9
    
    style CEO fill:#e1f5ff
    style DD1 fill:#fff3e0
    style DD2 fill:#fff3e0
    style DD3 fill:#fff3e0
    style DD4 fill:#fff3e0
    style DD5 fill:#fff3e0
    style DD6 fill:#fff3e0
    style DD7 fill:#fff3e0
    style DD8 fill:#fff3e0
    style DD9 fill:#fff3e0
```

---

## 15. GROWTH & SCALING MODEL

```mermaid
graph LR
    A["Current State<br/>287 agents<br/>9 departments"]
    
    B["Year 1<br/>+45 agents<br/>Specialization"]
    
    C["Year 2<br/>+60 agents<br/>Expansion"]
    
    D["Year 3<br/>+75 agents<br/>New services"]
    
    A -->|"Consolidate<br/>& optimize"| B
    B -->|"Expand<br/>capacity"| C
    C -->|"New<br/>markets"| D
    
    E["287 agents<br/>9 departments<br/>45 teams<br/>6-10 per team"]
    F["332 agents<br/>10 departments<br/>55 teams<br/>6-8 per team"]
    G["392 agents<br/>11 departments<br/>65 teams<br/>6-8 per team"]
    H["467 agents<br/>12 departments<br/>80 teams<br/>5-7 per team"]
    
    A -.-> E
    B -.-> F
    C -.-> G
    D -.-> H
    
    style A fill:#e1f5ff
    style B fill:#fff3e0
    style C fill:#f3e5f5
    style D fill:#e8f5e9
```

---

**All diagrams ready for documentation, presentations, and training materials.**

