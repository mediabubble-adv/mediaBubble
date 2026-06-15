---
name: arabic-quran-tajwid
description: >
  Tajwid — the rules governing the correct articulation, pronunciation, and
  recitation of the Holy Quran. Covers Makharij al-Huruf (articulation points,
  all 17 across 5 anatomical regions), Sifaat al-Huruf (permanent and
  occasional letter attributes), Ahkam al-Madd (12 elongation rules),
  Ahkam an-Noon as-Sakinah wa Tanwin (4 rules), Ahkam al-Meem as-Sakinah,
  Qalqalah, Waqf wa Ibtida (pausing and starting), and lahn (error)
  correction. This skill is a prerequisite for professional Quranic recitation
  and is the foundation of Qira'at training.
license: MIT
metadata:
  version: "1.0.0"
  domain: religious-studies
  triggers: "Tajwid, Quran recitation, Makharij, Sifaat, Madd, Noon Sakinah, Meem Sakinah, Qalqalah, Waqf wa Ibtida, Tarteel, Quranic phonetics"
  role: specialist
  scope: analysis-and-production
  output-format: text
---

# arabic-quran-tajwid — Quranic Recitation Rules (Tajwid)

## Overview

Tajwid (تجويد, lit. "making excellent") is the set of linguistic and phonetic rules for reciting the Quran as it was revealed to the Prophet Muhammad and transmitted through the canonical chains of narration. It is an obligatory science (فرض عين) for every qualified reciter.

The core principle: every letter has its rightful place (makhraj) and its rightful quality (sifah), without exaggeration or deficiency.

## Articulation Points (Makharij al-Huruf)

### The 17 Articulation Points Across 5 Regions

| Region | Points | Letters |
|--------|--------|---------|
| Throat (الحلق) | 3 (deepest, middle, nearest mouth) | ء ه / ع ح / غ خ |
| Tongue (اللسان) | 10 (deepest, middle, sides, tip, etc.) | ق ك / ج ش ي / ض / ل / ن / ر / ط د ت / ص ز س / ظ ذ ث |
| Lips (الشفتان) | 2 (inner+outer) | ف / و م ب |
| Nasal cavity (الخيشوم) | 1 | Ghunnah |
| Oral cavity (الجوف) | 1 (madd) | Madd letters (ا و ي) |

### Detailed Tongue Makharij

| # | Makhraj | Letters | Description |
|---|---------|---------|-------------|
| 1 | Deepest tongue + upper palate | ق (qaf) | Root of tongue rises to soft palate |
| 2 | Below #1 + upper palate | ك (kaf) | Slightly forward of qaf |
| 3 | Middle of tongue + palate | ج (jim) / ش (sheen) / ي (ya) | One makhraj for three letters |
| 4 | Edge of tongue + upper molars left/right | ض (dad) | The most distinctive classical makhraj; only Arabic has it |
| 5 | Forward edge + upper gum behind incisors | ل (lam) | |
| 6 | Tongue tip + upper gum behind incisors | ن (noon) | |
| 7 | Tongue tip + gum of incisors | ر (ra) | |
| 8 | Tongue tip + base of upper incisors | ط (ta) / د (dal) / ت (ta) | |
| 9 | Tongue tip + upper incisors edge | ص (sad) / ز (zay) / س (sin) | |
| 10 | Tongue tip + tip of upper incisors | ظ (dha) / ذ (dhal) / ث (tha) | |

## Letter Attributes (Sifaat al-Huruf)

### Permanent Attributes (Sifaat Lazima)

| Attribute | Opposite | Meaning | Letters bearing it |
|-----------|----------|---------|-------------------|
| Jahr (جهر) | Hams (همس) | Loudness/whisper | جهر: all except همس letters |
| Shiddah (شدة) | Rakhawa (رخاوة) | Strength/weakness of closure | شدّ: أ ج د ق ط ب ك |
| Isti'la (استعلاء) | Istifal (استفال) | Tongue elevation/depression | استعلاء: خ ص ض غ ط ق ظ |
| Itbaq (إطباق) | Infitah (انفتاح) | Palatal closure/openness | إطباق: ص ض ط ظ |
| Idhlaq (إذلاق) | Ismat (إصمات) | Quick/trapped articulation | إذلاق: ف ر م ن ل ب |

### Occasional Attributes (Sifaat Aaridah)

- Qalqalah: echoing vibration on ق ط ب ج د
- Tafkhim (emphasis) vs Tarqiq (softening): applies primarily to ر ل ا
- Mafkhusa (puffed): only the letter ض in specific conditions

## Madd (Elongation) Rules

### The 12 Madd Categories

| # | Madd Type | Length | Example |
|---|-----------|--------|---------|
| 1 | Asli (Natural) | 2 harakat | قال، يقول |
| 2 | Muttasil (Connected) | 4–5 h. | جاء، شاء |
| 3 | Munfasil (Separated) | 4–5 h. | يا أيها |
| 4 | Lazim (Obligatory) | 6 h. | الحاقة |
| 5 | Aarid (Occasional) | 2, 4, or 6 h. | العالمين |
| 6 | Leen (Soft) | 2 h. | بيت، خوف |
| 7 | Badal (Exchange) | 2 h. | آمن |
| 8 | Tamkin (Stability) | 2 h. | حياة، نبي |
| 9 | Sila Sughra (Small connective) | 2 h. (ه over pronoun) | لهُ ملك |
| 10 | Sila Kubra (Large connective) | 4–5 h. (ه over pronoun) | بهِ اتقوا |
| 11 | Madd Farq (Distinguishing) | 6 h. | آلذكرين |
| 12 | Madd Lazim Kalimi/Kharfi | 6 h. | After saakinah letters |

## Noon as-Sakinah & Tanwin Rules

| Rule | Applies Before | Example |
|------|---------------|---------|
| Izhar (Clear) | ء ه ع ح غ خ | من آمن |
| Idgham (Merged) | ي ر م ل و ن | من يقول → مَّن يَقُول |
| With Ghunnah | ي ن م و | من يقول (nasalized merger) |
| Without Ghunnah | ر ل | من ربك → مَّن رَّبُّك |
| Iqlab (Change) | ب | من بعد → مِمْبَعْد |
| Ikhfa (Hide) | 15 remaining letters | من قال → ن sound hidden |

## Waqf wa Ibtida (Pausing & Starting)

| Symbol | Meaning | Action |
|--------|---------|--------|
| م (Lazim) | Mandatory stop | Must stop here |
| ط (Murakhkhas) | Permitted common | Prefer to stop |
| ج (Ja'iz) | Permitted | Either stop or continue |
| صلي (al-Wasl Awla) | Connecting preferred | Better to continue |
| قفي (Qaf) | Permitted with caveat | Stop is better |
| لا | No permissible stop | Do NOT stop here |
| . (Mu'anaqah) | Paired stops | Stop at one only |

## Error Correction (Lahn)

### Lahn Jali (Obvious Errors)

Errors in the word's structure that change meaning. These invalidate the recitation:
- Changing a letter for another (قال for قلت)
- Breaking madd rules (adding/subtracting harakat)
- Breaking ghunnah rules

### Lahn Khafi (Subtle Errors)

Errors in recitation quality that do NOT change meaning but violate tajwid:
- Insufficient ghunnah duration
- Insufficient madd length
- Weak articulation of attributes
- Rushing the recitation (not achieving tarteel)
