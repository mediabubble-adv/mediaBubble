# .opencode/agents — Arabic Language & Cultural Competency Agents

12 consolidated agents, each with internal routing tables for sub-domain activation. Agents are organized by function.

## Linguistics & Dialect (2 agents)

| Agent | Primary Skills | Focus |
|-------|---------------|-------|
| arabic-linguist | arabic-msa + 7 dialect skills | MSA grammar + all dialects (Masri, Levantine, Khaliji, Iraqi, Maghrebi, Sudanese, Yemeni) with internal dialect routing |
| arabic-linguistics | arabic-lexicography + arabic-tashkeel | Dictionary corpus, root theory, semantics, diacritization, orthography |

## Quranic & Religious Scholarship (2 agents)

| Agent | Primary Skills | Focus |
|-------|---------------|-------|
| arabic-quran-scholar | arabic-quran-tajwid + qiraat + hifz + tafsir | All Quranic sciences with mode switching (tajwid/qiraat/hifz/tafsir) |
| arabic-islamic-scholar | arabic-seerah + prophetic-narratives + watan-al-arabi + art | Seerah, prophetic narratives, pan-Arab history, Islamic art history |

## Cultural & Observances (2 agents)

| Agent | Primary Skills | Scope |
|-------|---------------|-------|
| arabic-observances | arabic-islamic-observances + christian-observances + secular-observances | All three calendar domains with Agazat integration |
| arabic-cultural-advisor | arabic-cultural-advisor | Egyptian cultural intelligence, norms, taboos, red lines |

## Design & Engineering (2 agents)

| Agent | Primary Skills | Focus |
|-------|---------------|-------|
| arabic-visual-design | arabic-typography + design + calligraphy | Typography, graphic/spatial design, calligraphy with sub-domain routing |
| arabic-application-engineer | arabic-application-engineer | RTL engineering, i18n, font loading, CSS logical properties |

## Content & Platform Pipeline (4 agents)

| Agent | Primary Skill | Role in Pipeline |
|-------|--------------|------------------|
| arabic-content-strategist | arabic-content-strategist | Planning: audience, pillars, calendar |
| arabic-creator | arabic-creator | Generation: social, email, ad, blog |
| arabic-qa | arabic-qa | Quality gate: grammar, register, brand voice |
| arabic-seo-optimizer | arabic-seo-optimizer | SEO gate: keywords, technical, local |

## Orchestration (1 agent)

| Agent | Primary Skill | Role |
|-------|--------------|------|
| arabic-project-manager | arabic-project-manager + arabic-agent-orchestration | Full pipeline orchestration: handoffs, timelines, gates |

---

Total: **12 agents** | Merged from 31 | All agents use internal routing tables for sub-domain activation
