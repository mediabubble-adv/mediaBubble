---
name: arabic-lexicography
description: >
  Arabic Maajam (Lexicography) — the science of Arabic dictionary-making,
  etymology (ishtiqaq), semantic field analysis (dalalat), and lexical
  ontology. Covers classical dictionary navigation (Lisan al-Arab, Taj
  al-Arus, al-Qamus al-Muhit, al-Sihah, Mu'jam Maqayis al-Lughah),
  root-based derivation, semantic gradation of near-synonyms, etymology
  of loanwords, ghareeb (rare/archaic) vocabulary, technical/specialized
  lexicography, and modern computational lexicography.
license: MIT
metadata:
  version: "1.0.0"
  domain: linguistics
  triggers: "Arabic lexicography, Maajam, Arabic dictionary, etymology, Ishtiqaq, Dalalat, Lisan al-Arab, Taj al-Arus, al-Qamus, Arabic roots, Arabic semantics"
  role: specialist
  scope: analysis-and-ontology
  output-format: structured-lexicon
---

# arabic-lexicography — Arabic Maajam (Lexicography)

## Overview

Arabic lexicography (علم المعاجم / صناعة المعاجم) is the science of compiling, analyzing, and defining Arabic vocabulary. The Arabic lexicographic tradition is one of the richest in world history, with a continuous tradition from the 8th century CE to the present. Arabic lexicography is inseparable from Quranic studies (ghareeb al-Quran), hadith (ghareeb al-hadith), and Arabic poetics.

## Classical Dictionary Corpus

### Phonetic Dictionaries (Arranged by Phonetic/Sound Order)

| Dictionary | Author | Date | Method | Scope |
|------------|--------|------|--------|-------|
| Al-'Ayn | Al-Khalil ibn Ahmad al-Farahidi | ~175 AH | Phonetic: laryngeals first | First Arabic dictionary; ~7,000 roots |
| Al-Jamharah | Ibn Durayd | 321 AH | Phonetic: letters of Heja | 5,300+ roots |
| Al-Muhit fi al-Lughah | Al-Sahib ibn 'Abbad | 385 AH | Phonetic by makharij | |

### Root-Order Dictionaries (Arranged by Last Root Letter)

| Dictionary | Author | Date | Volumes | Roots |
|------------|--------|------|---------|-------|
| **Lisan al-Arab** (لسان العرب) | Ibn Manzur | 711 AH | 20 vols | ~80,000 — the largest pre-modern Arabic dictionary |
| **Taj al-Arus** (تاج العروس) | Al-Zabidi | 1205 AH | 40 vols | The largest Arabic dictionary ever compiled |
| **Al-Qamus al-Muhit** (القاموس المحيط) | Al-Firuzabadi | 817 AH | 4 vols | ~60,000 entries; source of "Qamus" (dictionary) in Arabic |
| **Al-Sihah** (الصحاح) | Al-Jawhari | 398 AH | 6 vols | ~40,000 entries; "the most correct" |

### Thematic & Specialized Dictionaries

| Dictionary | Author | Focus |
|------------|--------|-------|
| Mu'jam Maqayis al-Lughah | Ibn Faris (395 AH) | Root-based meaning cores (maqayis) |
| Al-Mufradat fi Gharib al-Quran | Al-Raghib al-Isfahani (502 AH) | Quranic vocabulary; semantic analysis |
| Al-Mu'jam al-Wasit | Majma' al-Lughah al-Arabiyyah (1960) | Modern standard Arabic; 30,000 entries |
| Al-Munjid | Louis Ma'luf (1908) | Revised multiple times; Christian Lebanese scholarship |
| Al-Mawrid (English-Arabic) | Munir Baalbaki / Rohi Baalbaki | Modern English-Arabic translation dictionary |

## Root-Based Derivation (Ishtiqaq)

### Types of Derivation

| Type | Arabic | Description | Example |
|------|--------|-------------|---------|
| Small (Saghir) | اشتقاق صغير | Changes in form & vowel pattern only; root unchanged | كتب → كتاب → مكتب → مكتبة |
| Large (Kabir) | اشتقاق كبير | Metathesis (letter order change) | وجل → وجل (same consonants, different order) |
| Greater (Akbar) | اشتقاق أكبر | Letter substitution with similar makhraj | نقص → نقض (ص→ض; same place of articulation) |

### Form-Meaning Cores (Maqayis)

Ibn Faris established that each Arabic triliteral root has a core meaning (maqyas) that unites all its derivations:

| Root | Maqyas (Core Meaning) | Derivations |
|------|----------------------|-------------|
| ك-ت-ب | Gathering / joining | كتاب (gathered writing), كتب (he wrote), مكتب (gathering-place), كتيبة (gathered army) |
| ع-ل-م | Mark / sign / distinct knowledge | علم (knowledge/knowing/flag), علامة (sign), معلوم (known), تعليم (teaching) |
| ج-م-ع | Bringing together | جمع (to gather), جماعة (group), جمعة (Friday gathering), جميع (all together) |

## Semantic Field Analysis (Dalalat)

### Near-Synonyms Gradation (Al-Furuq al-Lughawiyyah)

Arabic has extensively developed literature on subtle differences between near-synonyms (الفروق اللغوية). Critical for master-level lexicography:

| Words | Shared Meaning | Distinction |
|-------|---------------|-------------|
| خوف / خشية / وجل / رهبة / هيبة | Fear | خوف=general; خشية=awe+fear (of God); وجل=palpitation; رهبة=overwhelming; هيبة=reverence |
| حزن / أسف / غم / كرب | Sadness | حزن=general; أسف=regret; غم=oppressive; كرب=choking |
| شكر / حمد / مدح | Praise | شكر=for benefit received; حمد=for intrinsic quality; مدح=description of excellence |
| بخل / شح | Stinginess | بخل=withholding; شح=eager+stingy |

### Semantic Classification Systems

| Category | Arabic Term | Description |
|----------|-------------|-------------|
| Polysemy (multiple related meanings) | المشترك اللفظي | One word, multiple related senses (عين = eye, water source, self) |
| Homonymy (unrelated) | الاشتراك اللفظي | One word, unrelated meanings |
| Synonymy | الترادف | Multiple words, one sense (debated: Arabic has limited true synonymy) |
| Antonymy | التضاد | Abundant in Arabic: أسود/أبيض, كبير/صغير |
| Hypernymy | العام والخاص | General vs specific: دابة (animal) → horse/camel/donkey |
| Collocation | التلازم اللفظي | Words that co-occur: نعمة + شكر, مصيبة + صبر |

## Etymology (Ishtiqaq & Mu'arrab)

### Loanword Analysis (المعرب والدخيل)

Arabic has absorbed vocabulary from many languages while maintaining derivational integrity:

| Source Language | Examples | Domain |
|-----------------|----------|--------|
| Aramaic / Syriac | إنجيل (evangel), فِردَوس (paradise), إستبرق (brocade) | Religion, luxury |
| Persian | إستبرق, بنفسج (violet), ياسمين (jasmine), زنجبيل (ginger) | Flora, luxury |
| Greek | فيلسوف (philosopher), إسطرلاب (astrolabe), أقليم (clime) | Philosophy, science |
| Latin | قانون (canon), دينار (denarius), قنطار (centenarius) | Law, measurement |
| Turkish | أورنيك (pattern), ياش (age-grade), أوضة (room) | Military, administration |
| Hindi/Urdu | ساري (sari), تَنْبُوُل (betel), زنجبيل (variant) | Trade |
| Amharic/Ethiopian | حبش (Habesh), زنج (Zanj), سورة (Surah) | Place names |
| Berber | سردين (sardine), تيس (male goat — likely) | North Africa |

### Loanword Integration Principles (تعريب)

When Arabic borrows a word, it undergoes:
1. **Phonetic integration**: foreign phonemes mapped to nearest Arabic (p → ب/f, v → ف, g → ج/ق/غ, ch → ش/ك)
2. **Morphological integration**: loanwords adopted into Arabic patterns (أفعل, مفعول, etc.)
3. **Derivational productivity**: loanwords become new roots (تلفن → يَتَلْفَن / تلفزيون → تلفز)

**Examples:** تلفزيون (TV), ديمقراطية (democracy), سينما (cinema), إنترنت (Internet), كمبيوتر (computer)

## Computational Lexicography

### Arabic NLP & Ontology

| Domain | Applications |
|--------|-------------|
| Lemmatization | Map inflected forms to dictionary lemma (root or stem) |
| Morphological analysis | Segment words into prefix+stem+suffix (AraMorph, MADAMIRA) |
| Root extraction | Automatic extraction of triliteral/quadriliteral roots |
| Semantic ontology | WordNet-style: Arabic WordNet (AWN), BAMA/Qutuf |
| Corpus linguistics | Building frequency lists from contemporary Arabic corpora |
| Digital lexicography | Machine-readable dictionary creation; TEI XML dictionaries |

### Building an Arabic Lexicon

For MediaBubble, a practical lexicographic ontologies can serve:
- **Dialect mapping**: mapping MSA headwords to dialectal equivalents across 22 states
- **Controlled vocabulary**: brand glossaries for media, tech, marketing domains
- **Semantic annotation**: tagging content with root, form, semantic field, and register
