# SKILL DEFINITIONS: Parent Categories

## 1. arabic:language (Parent Category)

**Name:** Arabic Language  
**Slug:** arabic:language  
**Type:** Parent Category  
**Description:** Comprehensive Arabic language skills spanning conversational Egyptian Arabic (Masri), formal Modern Standard Arabic, regional dialects, translation, and business communication.

**Metadata:**

```
type: parent
priority: high
focus: language
languages: [Arabic, English]
dialects: [Masri/Egyptian, MSA/Modern Standard, Levantine, Gulf, Moroccan, Sudanese]
```

**Child Skills (5):**

1. arabic:language-masri-core
2. arabic:language-masri-business
3. arabic:language-msa-formal
4. arabic:language-regional-dialects
5. arabic:language-translation

**Agent Guidelines:**

- Lead with Masri examples in Masri-focused skills
- Always include pronunciation guides
- Explain cultural context & usage patterns
- Use modern, authentic examples from contemporary media
- Reference dialectal differences when relevant
- Acknowledge regional variations (Cairo vs. other regions)

---

## 2. arabic:design (Parent Category)

**Name:** Arabic Design  
**Slug:** arabic:design  
**Type:** Parent Category  
**Description:** Comprehensive Arabic and Islamic design skills encompassing calligraphy, typography, visual arts, cultural aesthetics, UI/UX localization, and marketing-focused creative design.

**Metadata:**

```
type: parent
priority: high
focus: design
visual-traditions: [Calligraphy, Islamic Geometry, Typography, Contemporary Art]
applications: [Print, Digital, UI/UX, Marketing, Branding]
cultural-focus: [Authentic representation, Historical context, Modern interpretation]
```

**Child Skills (6):**

1. arabic:design-calligraphy
2. arabic:design-typography
3. arabic:design-visual-arts
4. arabic:design-cultural-aesthetics
5. arabic:design-ui-localization
6. arabic:design-marketing-creative

**Agent Guidelines:**

- Explain historical & cultural context first
- Clarify authentic vs. stereotypical representations
- Include modern designer examples & contemporary applications
- Show technical implementation details
- Note cultural significance & symbolic meaning
- Cite credible cultural sources
- Avoid cultural appropriation language

---

## IMPLEMENTATION NOTES

Both parent categories should:

- Be discoverable via search (name + slug)
- Support 5-6 child skills respectively
- Have clear metadata for classification
- Include agent behavior guidelines
- Enable hierarchical navigation (parent → children)
- Support cross-references between related skills

Category creation is foundational for Phase 2. Both should be live before individual skills are created.
