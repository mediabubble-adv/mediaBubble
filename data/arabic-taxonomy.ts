export interface SkillNode {
  id: string
  label: string
  labelAr?: string
  description?: string
  children?: SkillNode[]
  gateLevel?: number
  count?: number
  agent?: string
  agentAr?: string
  skills?: string[]
}

export interface EnrichedSkillNode extends SkillNode {
  agent: string
  agentAr: string
  skills: string[]
}

export interface Track {
  id: string
  name: string
  nameAr: string
  description: string
  color: string
  icon: string
  nodes: { id: string; label: string; requiredLevel: number }[]
  tracksUnlocked: string[]
}

export const branchColors: Record<string, string> = {
  '1': '#e8711a',
  '2': '#1b5e20',
  '3': '#34a853',
  '4': '#8d6e63',
  '5': '#ad1457',
  '6': '#3e2723',
  '7': '#37474f',
  '8': '#1a73e8',
  '9': '#c62828',
  '10': '#6a1b9a',
  '11': '#1565c0',
  '12': '#f57c00',
  '13': '#4e342e',
  '14': '#00838f',
}

export const branchIcons: Record<string, string> = {
  '1': 'Languages',
  '2': 'BookOpen',
  '3': 'BookMarked',
  '4': 'Globe',
  '5': 'Palette',
  '6': 'History',
  '7': 'Sparkles',
  '8': 'Binary',
  '9': 'Feather',
  '10': 'Languages',
  '11': 'Cpu',
  '12': 'GraduationCap',
  '13': 'Archive',
  '14': 'Radio',
}

export const taxonomyTree: SkillNode[] = [
  {
    id: '1', label: 'Dialectal Variations', labelAr: 'اللهجات العربية',
    description: 'Regional spoken varieties of Arabic across the Arab world',
    gateLevel: 1,
    children: [
      {
        id: '1.1', label: 'Egyptian (Masrī)', labelAr: 'مصري',
        description: 'Phonological features (g → g, q → ʔ), lexical inventory & loanwords, sociolects (urban Cairene vs. rural Ṣaʿīdī), media & cinema register, proverbs & idioms',
        gateLevel: 3,
        children: [
          { id: '1.1.1', label: 'Phonological features (g → g, q → ʔ)' },
          { id: '1.1.2', label: 'Lexical inventory & loanwords (Turkish, French, English, Italian)' },
          { id: '1.1.3', label: 'Sociolects (urban Cairene vs. rural Ṣaʿīdī)' },
          { id: '1.1.4', label: 'Media & cinema register' },
          { id: '1.1.5', label: 'Egyptian Arabic proverbs & idiomatic expressions' },
        ],
      },
      {
        id: '1.2', label: 'Saudi (KSA)', labelAr: 'سعودي',
        description: 'Najdī core features, Ḥijāzī urban vs. Bedouin varieties, Gulf Coast / Eastern Province, religious register',
        gateLevel: 3,
        children: [
          { id: '1.2.1', label: 'Najdī core features' },
          { id: '1.2.2', label: 'Ḥijāzī urban vs. Bedouin varieties' },
          { id: '1.2.3', label: 'Gulf Coast / Eastern Province (Baḥārna, ʿArab)' },
          { id: '1.2.4', label: 'Religious register & code-switching with Fuṣḥā' },
        ],
      },
      {
        id: '1.3', label: 'Emirati (Emārātī)', labelAr: 'إماراتي',
        description: 'Phonology (ʾ / j / č reflexes), maritime & pearl-diving lexicon, Bedouin vs. coastal urban distinction, idiomatic expressions',
        gateLevel: 3,
        children: [
          { id: '1.3.1', label: 'Phonology (ʾ / j / č reflexes)' },
          { id: '1.3.2', label: 'Maritime & pearl-diving lexicon' },
          { id: '1.3.3', label: 'Bedouin vs. coastal urban distinction' },
          { id: '1.3.4', label: 'Emirati idiomatic expressions' },
        ],
      },
      {
        id: '1.4', label: 'Levantine (Shāmī)', labelAr: 'شامي',
        description: 'Syrian / Lebanese / Palestinian / Jordanian sub-branches, shared phonological isoglosses, Aramaic substrate',
        gateLevel: 3,
        children: [
          { id: '1.4.1', label: 'Syrian / Lebanese / Palestinian / Jordanian sub-branches' },
          { id: '1.4.2', label: 'Shared phonological isoglosses' },
          { id: '1.4.3', label: 'Aramaic substrate & Western loanwords' },
        ],
      },
      {
        id: '1.5', label: 'Maghrebi (Darija)', labelAr: 'داريجا',
        description: 'Moroccan / Algerian / Tunisian / Libyan, Berber (Amazigh) substrate, French lexical overlay',
        gateLevel: 3,
        children: [
          { id: '1.5.1', label: 'Moroccan / Algerian / Tunisian / Libyan' },
          { id: '1.5.2', label: 'Berber (Amazigh) substrate influence' },
          { id: '1.5.3', label: 'French lexical overlay & code-switching' },
        ],
      },
      {
        id: '1.6', label: 'Iraqi (Mesopotamian)', labelAr: 'عراقي',
        description: 'Baghdādī (qəltu) vs. rural (gilit), Turkish & Persian loanwords, Marsh Arab vocabulary',
        gateLevel: 3,
        children: [
          { id: '1.6.1', label: 'Baghdādī (qəltu) vs. rural (gilit)' },
          { id: '1.6.2', label: 'Turkish & Persian loanwords' },
          { id: '1.6.3', label: 'Marsh Arab (Maʿdān) vocabulary' },
        ],
      },
      { id: '1.7', label: 'Sudanese', labelAr: 'سوداني', description: 'Nubian & Beja substrate, unique phonological inventory', gateLevel: 3 },
      {
        id: '1.8', label: 'Other Varieties', labelAr: 'لهجات أخرى',
        description: 'Yemeni, Omani, Bahraini, Qatari, Kuwaiti, Mauritanian (Ḥassāniyya), Cypriot Maronite, Central Asian Arabic',
        gateLevel: 2,
        children: [
          { id: '1.8.1', label: 'Yemeni (Ṣanʿānī, Ḥaḍramī, Taʿizzī)' },
          { id: '1.8.2', label: 'Omani / Ẓafārī' },
          { id: '1.8.3', label: 'Bahraini (ʿArab vs. Baḥārna)' },
          { id: '1.8.4', label: 'Qatari / Kuwaiti' },
          { id: '1.8.5', label: 'Mauritanian (Ḥassāniyya)' },
          { id: '1.8.6', label: 'Cypriot Maronite Arabic' },
          { id: '1.8.7', label: 'Central Asian Arabic (Afghanistan, Uzbekistan, Khuzestan)' },
        ],
      },
      {
        id: '1.9', label: 'Sociolinguistics & Dialectology', labelAr: 'علم اللغة الاجتماعي',
        description: 'Diglossia theory, code-switching, language attitudes, Arabization policy, dialect continuum',
        gateLevel: 3,
        children: [
          { id: '1.9.1', label: 'Diglossia theory (Ferguson, modern critiques)' },
          { id: '1.9.2', label: 'Code-switching & code-mixing (Fuṣḥā/ʿāmmiyya, inter-dialect)' },
          { id: '1.9.3', label: 'Language attitudes & ideology (prestige, purism, shame)' },
          { id: '1.9.4', label: 'Language planning / Arabization policy (Maghreb, Sudan)' },
          { id: '1.9.5', label: 'Dialect continuum & distance measurement' },
        ],
      },
      {
        id: '1.10', label: 'Cross-Dialectal Competencies', labelAr: 'كفاءات عبر اللهجية',
        description: 'Passive comprehension across varieties, diglossia management, dialect identification',
        gateLevel: 4,
        children: [
          { id: '1.10.1', label: 'Passive comprehension across varieties' },
          { id: '1.10.2', label: 'Diglossia management (register-appropriate switching)' },
          { id: '1.10.3', label: 'Dialect identification & sociolinguistic profiling' },
        ],
      },
    ],
  },
  {
    id: '2', label: 'Religious & Classical Studies', labelAr: 'الدراسات الدينية والكلاسيكية',
    description: 'Quranic sciences, Tafsir, Hadith, Fiqh, Kalam, Tasawwuf, and Arabic philosophy',
    gateLevel: 1,
    children: [
      {
        id: '2.1', label: 'Holy Qurʾān', labelAr: 'القرآن الكريم',
        description: 'Tajwīd recitation rules, reading proficiency, ʿUlūm al-Qurʾān',
        gateLevel: 3,
        children: [
          {
            id: '2.1.1', label: 'Tajwīd (Recitation Rules)', labelAr: 'التجويد',
            children: [
              { id: '2.1.1.1', label: 'Makhārij al-Ḥurūf (articulation points)' },
              { id: '2.1.1.2', label: 'Ṣifāt al-Ḥurūf (phonetic qualities)' },
              { id: '2.1.1.3', label: 'Aḥkām al-Nūn as-Sākina & al-Tanwīn' },
              { id: '2.1.1.4', label: 'Aḥkām al-Mīm as-Sākina' },
              { id: '2.1.1.5', label: 'Madd (prolongation) rules & levels' },
              { id: '2.1.1.6', label: 'Waqf (pause) & Ibtidāʾ (commencement)' },
              { id: '2.1.1.7', label: 'Qirāʾāt (canonical recitation traditions)' },
            ],
          },
          {
            id: '2.1.2', label: 'Reading & Deciphering Proficiency', labelAr: 'القراءة والفهم',
            children: [
              { id: '2.1.2.1', label: 'Rasm al-Muṣḥaf (ʿUthmānic script orthography)' },
              { id: '2.1.2.2', label: 'Fluency in unvoweled Qurʾānic text' },
              { id: '2.1.2.3', label: 'Vocabulary acquisition (archaic & hapax legomena)' },
              { id: '2.1.2.4', label: 'Āyah indexing & thematic navigation' },
              { id: '2.1.2.5', label: 'Memorization (Ḥifẓ — partial & complete)' },
            ],
          },
          {
            id: '2.1.3', label: 'ʿUlūm al-Qurʾān (Qurʾānic Sciences)', labelAr: 'علوم القرآن',
            children: [
              { id: '2.1.3.1', label: 'Asbāb al-Nuzūl (occasions of revelation)' },
              { id: '2.1.3.2', label: 'al-Nāsikh wa-al-Mansūkh (abrogation)' },
              { id: '2.1.3.3', label: 'Makkī vs. Madanī classification' },
              { id: '2.1.3.4', label: 'al-Muḥkam wa-al-Mutashābih (clear vs. ambiguous)' },
              { id: '2.1.3.5', label: 'al-Ḥurūf al-Muqaṭṭaʿāt (disjointed letters)' },
              { id: '2.1.3.6', label: 'Iʿjāz al-Qurʾān (inimitability)' },
            ],
          },
        ],
      },
      {
        id: '2.2', label: 'Tafsīr (Qurʾānic Exegesis)', labelAr: 'التفسير',
        description: 'Classical methodologies (bi-al-maʾthūr, bi-al-raʾy), contemporary approaches (thematic, maqāṣid, scientific, feminist)',
        gateLevel: 3,
        children: [
          {
            id: '2.2.1', label: 'Classical Methodologies',
            children: [
              { id: '2.2.1.1', label: 'Tafsīr bi-al-Maʾthūr (Ṭabarī, Ibn Kathīr)' },
              { id: '2.2.1.2', label: 'Tafsīr bi-al-Raʾy (Zamakhsharī, Rāzī)' },
            ],
          },
          {
            id: '2.2.2', label: 'Contemporary Approaches',
            children: [
              { id: '2.2.2.1', label: 'Thematic (Mawḍūʿī) tafsīr' },
              { id: '2.2.2.2', label: 'Socio-legal & Maqāṣid-oriented tafsīr' },
              { id: '2.2.2.3', label: 'Scientific (ʿIlmī) tafsīr' },
              { id: '2.2.2.4', label: 'Feminist & hermeneutical tafsīr' },
            ],
          },
          { id: '2.2.3', label: 'Application (comparative tafsīr, fatwā & daʿwa)' },
        ],
      },
      {
        id: '2.3', label: 'Islamic History', labelAr: 'التاريخ الإسلامي',
        description: 'Sīra, Qiṣaṣ al-Anbiyāʾ, caliphal & dynastic eras, historiography',
        gateLevel: 3,
        children: [
          {
            id: '2.3.1', label: 'Sīra (Prophetic Biography)',
            children: [
              { id: '2.3.1.1', label: 'Pre-Islāmic (Jāhiliyya) context' },
              { id: '2.3.1.2', label: 'Makkan period (610–622 CE)' },
              { id: '2.3.1.3', label: 'Madīnan period (622–632 CE)' },
              { id: '2.3.1.4', label: 'Key expeditions & treaties' },
              { id: '2.3.1.5', label: 'Prophet\'s character, household & Companions' },
              { id: '2.3.1.6', label: 'Primary sources (Ibn Hishām, Ṭabarī, Ibn Saʿd)' },
            ],
          },
          { id: '2.3.2', label: 'Prophetic Narratives (Qiṣaṣ al-Anbiyāʾ)' },
          {
            id: '2.3.3', label: 'Caliphal & Dynastic Eras',
            children: [
              { id: '2.3.3.1', label: 'Rāshidūn (632–661)' },
              { id: '2.3.3.2', label: 'Umayyad (661–750)' },
              { id: '2.3.3.3', label: 'ʿAbbāsid (750–1258)' },
              { id: '2.3.3.4', label: 'Andalusī (711–1492)' },
              { id: '2.3.3.5', label: 'Mamlūk (1250–1517)' },
              { id: '2.3.3.6', label: 'Ottoman Arab provinces (1517–1918)' },
            ],
          },
          { id: '2.3.4', label: 'Historiography & Sources (Isnād, key historians, modern debates)' },
        ],
      },
      {
        id: '2.4', label: 'ʿUlūm al-Ḥadīth (Ḥadīth Sciences)', labelAr: 'علوم الحديث',
        description: 'Muṣṭalaḥ, jarḥ wa-taʿdīl, ʿilm al-rijāl, canonical collections, commentary tradition',
        gateLevel: 3,
        children: [
          { id: '2.4.1', label: 'Muṣṭalaḥ al-Ḥadīth (ṣaḥīḥ, ḥasan, ḍaʿīf, mawḍūʿ)' },
          { id: '2.4.2', label: 'al-Jarḥ wa-al-Taʿdīl (transmitter criticism)' },
          { id: '2.4.3', label: 'ʿIlm al-Rijāl (biographical evaluation)' },
          { id: '2.4.4', label: 'al-Kutub al-Sitta / al-Tisʿa (canonical collections)' },
          { id: '2.4.5', label: 'Asānīd studies (chain elevation, ʿāli/nāzil)' },
          { id: '2.4.6', label: 'Gharīb al-Ḥadīth (unusual vocabulary)' },
          { id: '2.4.7', label: 'Mukhtalif al-Ḥadīth (contradictory ḥadīth)' },
          { id: '2.4.8', label: 'Commentary tradition (Fatḥ al-Bārī, etc.)' },
        ],
      },
      {
        id: '2.5', label: 'Fiqh & Uṣūl al-Fiqh', labelAr: 'الفقه وأصوله',
        description: 'Legal theory, school jurisprudence (6 schools), comparative fiqh, maqāṣid, fatwā methodology',
        gateLevel: 3,
        children: [
          {
            id: '2.5.1', label: 'Uṣūl al-Fiqh (Legal Theory)',
            children: [
              { id: '2.5.1.1', label: 'Primary sources (Qurʾān, Sunna, Ijmāʿ, Qiyās)' },
              { id: '2.5.1.2', label: 'Secondary sources (Istihsān, Maṣāliḥ, ʿUrf)' },
              { id: '2.5.1.3', label: 'Ijtihād & Taqlīd' },
              { id: '2.5.1.4', label: 'Maqāṣid al-Sharīʿa (higher objectives)' },
            ],
          },
          {
            id: '2.5.2', label: 'Fiqh al-Madhāhib',
            children: [
              { id: '2.5.2.1', label: 'Ḥanafī' }, { id: '2.5.2.2', label: 'Mālikī' },
              { id: '2.5.2.3', label: 'Shāfiʿī' }, { id: '2.5.2.4', label: 'Ḥanbalī' },
              { id: '2.5.2.5', label: 'Jaʿfarī (Shīʿī)' }, { id: '2.5.2.6', label: 'Ibāḍī' },
            ],
          },
          { id: '2.5.3', label: 'Fiqh al-Muqāran (comparative fiqh)' },
          { id: '2.5.4', label: 'Fiqh al-Aqalliyyāt (minority fiqh)' },
          { id: '2.5.5', label: 'al-Qawāʿid al-Fiqhiyya (legal maxims)' },
          { id: '2.5.6', label: 'Fatwā methodology & contemporary rulings' },
          { id: '2.5.7', label: 'Wathāʾiq / Shurūṭ (notarial formulary)' },
        ],
      },
      { id: '2.6', label: 'ʿIlm al-Kalām (Theology)', labelAr: 'علم الكلام', description: 'Ashʿarī, Māturīdī, Muʿtazilī, Salafī, Shīʿī schools — key debates on qadar, khalq al-Qurʾān, ṣifāt Allāh', gateLevel: 3 },
      { id: '2.7', label: 'al-Taṣawwuf (Sufism)', labelAr: 'التصوف', description: 'Junayd, al-Ghazālī, Ibn ʿArabī, Sufi orders, literature, poetry', gateLevel: 3 },
      { id: '2.8', label: 'al-Falsafa al-ʿArabiyya', labelAr: 'الفلسفة العربية', description: 'Mashshāʾiyya, Ishrāqiyya, political philosophy, contemporary Arab philosophy', gateLevel: 3 },
    ],
  },
  {
    id: '3', label: 'Lexicography (al-Maʿājim)', labelAr: 'المعاجم',
    description: 'Arabic dictionaries, etymology, semantic nuances, lexicographical methods, corpus linguistics',
    gateLevel: 2,
    children: [
      {
        id: '3.1', label: 'Lexical Definitions', labelAr: 'التعريفات المعجمية',
        description: 'Classical dictionaries (Lisān al-ʿArab, Tāj al-ʿArūs), modern standard (al-Munjid, al-Wasīṭ), specialized, bilingual',
        gateLevel: 2,
      },
      {
        id: '3.2', label: 'Etymology (Ishtiqāq)', labelAr: 'الاشتقاق',
        description: 'Root-system, ṣaghīr/kabīr/akbar derivation, loanword Arabization, semantic drift',
        gateLevel: 3,
        children: [
          { id: '3.2.1', label: 'Root-system morphology (triliteral, quadriliteral, khamsī)' },
          { id: '3.2.2', label: 'al-Ishtiqāq al-Ṣaghīr (derivational)' },
          { id: '3.2.3', label: 'al-Ishtiqāq al-Kabīr / al-Qalb (permutational)' },
          { id: '3.2.4', label: 'al-Ishtiqāq al-Akbar (semantic field)' },
          { id: '3.2.5', label: 'Loanword identification & Arabization (Taʿrīb)' },
          { id: '3.2.6', label: 'Semantic drift & historical layering' },
        ],
      },
      {
        id: '3.3', label: 'Semantic Nuances (al-Furūq al-Lughawiyya)', labelAr: 'الفروق اللغوية',
        description: 'Near-synonym discrimination, polysemy, homonymy, aḍdād, connotative fields',
        gateLevel: 3,
      },
      {
        id: '3.4', label: 'Lexicographical Methods', labelAr: 'مناهج المعجمية',
        description: 'Classical ordering systems, corpus-based lexicography, digital lexicon design',
        gateLevel: 3,
      },
      {
        id: '3.5', label: 'Corpus Linguistics', labelAr: 'لغويات المتون',
        description: 'Corpus design, frequency analysis, concordance & collocation extraction',
        gateLevel: 3,
      },
    ],
  },
  {
    id: '4', label: 'Cultural & Religious Literacy', labelAr: 'الثقافة الدينية والمدنية',
    description: 'Islamic and Christian holidays, holiday periods, folk traditions, minority communities, etiquette',
    gateLevel: 1,
    children: [
      {
        id: '4.1', label: 'Islamic Holidays & Observances', labelAr: 'الأعياد الإسلامية',
        description: 'Ramadan, ʿĪds, Mawlid, ʿĀshūrāʾ, sacred nights, ʿUmra',
        gateLevel: 2,
      },
      {
        id: '4.2', label: 'Christian Holidays in Arab Context', labelAr: 'الأعياد المسيحية',
        description: 'Christmas (Coptic/Eastern/Western), Easter, other feasts',
        gateLevel: 2,
      },
      {
        id: '4.3', label: 'Holiday Periods (ʿAṭāl al-Aʿyād)', labelAr: 'عطل الأعياد',
        description: 'Official calendars, social etiquette, media schedules, retail culture, diaspora adaptations',
        gateLevel: 2,
      },
      {
        id: '4.4', label: 'National & Folk Traditions', labelAr: 'التقاليد القومية والشعبية',
        description: 'National days, folk music & dance, traditional dress, hospitality, lifecycle rituals',
        gateLevel: 2,
      },
      {
        id: '4.5', label: 'Minority Religious & Ethnic Communities', labelAr: 'الأقليات الدينية والعرقية',
        description: 'Arab Christians, Druze, ʿAlawī, Ismāʿīlī, Yazīdī, Mandaean, Bahāʾī, Jewish heritage',
        gateLevel: 2,
        children: [
          {
            id: '4.5.9', label: 'Arab Jewish Heritage',
            children: [
              { id: '4.5.9.1', label: 'Judeo-Arabic language & literature' },
              { id: '4.5.9.2', label: 'Cairo Geniza studies' },
              { id: '4.5.9.3', label: 'Jewish communities in Arab lands (Mizraḥī heritage)' },
              { id: '4.5.9.4', label: 'Arab-Jewish literature & memory' },
            ],
          },
        ],
      },
      {
        id: '4.6', label: 'Cultural Etiquette & Social Codes', labelAr: 'الآداب الاجتماعية',
        description: 'Honor & shame, hospitality codes, gift-giving, tribal ʿurf, gender norms',
        gateLevel: 2,
      },
    ],
  },
  {
    id: '5', label: 'Aesthetics & Visual Arts', labelAr: 'الجماليات والفنون البصرية',
    description: 'Traditional and contemporary Arabic art, design, calligraphy, music & performing arts',
    gateLevel: 1,
    children: [
      {
        id: '5.1', label: 'Arabic Art', labelAr: 'الفن العربي',
        description: 'Geometric patterns, arabesque, manuscript illumination, woodwork, ceramics, metalwork, contemporary forms',
        gateLevel: 2,
        children: [
          { id: '5.1.1', label: 'Traditional Forms (geometric, arabesque, illumination, woodwork, ceramics, metalwork)' },
          { id: '5.1.2', label: 'Contemporary Forms (painting, sculpture, digital art, street art, photography)' },
        ],
      },
      {
        id: '5.2', label: 'Arabic Design', labelAr: 'التصميم العربي',
        description: 'Graphic design, typography, RTL UI/UX, spatial & interior design, design philosophy',
        gateLevel: 3,
        children: [
          { id: '5.2.1', label: 'Graphic Design (typography, branding, RTL UI/UX)' },
          { id: '5.2.2', label: 'Spatial & Interior Design (architectural elements, modern interiors, gardens, exhibitions)' },
          { id: '5.2.3', label: 'Design Philosophy (Arab design identity, heritage preservation, fashion)' },
        ],
      },
      {
        id: '5.3', label: 'Arabic Calligraphy (al-Khuṭūṭ)', labelAr: 'الخط العربي',
        description: '10 script families, tashkīl (diacritics), master calligrapher tradition',
        gateLevel: 3,
        children: [
          {
            id: '5.3.1', label: 'Scripts (Kūfī, Naskh, Thuluth, Ruqʿa, Dīwānī, Maghribī, Nastaʿlīq, Muḥaqqaq, Siyāqāt, Contemporary)',
          },
          {
            id: '5.3.2', label: 'al-Tashkīl (Diacritics & Vocalization)',
            children: [
              { id: '5.3.2.1', label: 'Full vocalization (fatḥa, ḍamma, kasra, sukūn, shadda)' },
              { id: '5.3.2.2', label: 'Orthographic diacritics (hamzāt, madda, waṣla)' },
              { id: '5.3.2.3', label: 'Tashkīl in Qurʾānic vs. non-Qurʾānic contexts' },
              { id: '5.3.2.4', label: 'Automated tashkīl (Arabic diacritization systems)' },
              { id: '5.3.2.5', label: 'Artistic tashkīl as ornamentation' },
            ],
          },
          { id: '5.3.3', label: 'Calligrapher Tradition (Ibn Muqla, Ibn al-Bawwāb, Yāqūt, ijāza, digital)' },
        ],
      },
      {
        id: '5.4', label: 'Music & Performing Arts', labelAr: 'الموسيقى والفنون الأدائية',
        description: 'Maqām modal system, classical vocal forms, instruments, cinema, theatre, television drama, folk dance',
        gateLevel: 2,
        children: [
          { id: '5.4.1', label: 'al-Maqām al-ʿArabī (modal system, quarter-tones, iqāʿ)' },
          { id: '5.4.2', label: 'Classical vocal forms (qaṣīda, dawr, muwashshaḥ)' },
          { id: '5.4.3', label: 'Arab musical instruments (ʿūd, qānūn, nāy, riqq)' },
          { id: '5.4.4', label: 'Arab cinema (Egyptian golden age, Yūsuf Shāhīn, Palestinian)' },
          { id: '5.4.5', label: 'Arab theatre (Ṣanūʿ, al-Naqqāsh, Wannūs)' },
          { id: '5.4.6', label: 'Arab television drama (musalsalāt, Ramadan tradition)' },
          { id: '5.4.7', label: 'Folk dance (dabke, tanoura, raṣf, ʿarda)' },
        ],
      },
    ],
  },
  {
    id: '6', label: 'Historical Context (al-Waṭan al-ʿArabī)', labelAr: 'السياق التاريخي',
    description: 'Pre-Islamic Arabia through contemporary Arab society, including diaspora and migration',
    gateLevel: 1,
    children: [
      { id: '6.1', label: 'Pre-Islamic Arabia', labelAr: 'شبه الجزيرة قبل الإسلام', description: 'Ancient kingdoms, epigraphy, pre-Islamic poetry', gateLevel: 2 },
      { id: '6.2', label: 'Rise of Islam & Early Conquests (622–750)', labelAr: 'صدر الإسلام', gateLevel: 2 },
      { id: '6.3', label: 'The Islamic Golden Age (c. 750–1258)', labelAr: 'العصر الذهبي', description: 'Bayt al-Ḥikma, translation movement, Arabic as scientific language', gateLevel: 3 },
      { id: '6.4', label: 'The Ottoman Era & Nahḍa (1517–1918)', labelAr: 'العصر العثماني', gateLevel: 2 },
      {
        id: '6.5', label: 'Colonial & Post-Colonial Period', labelAr: 'الاستعمار وما بعده',
        description: 'European mandate, nationalism, independence, Arab-Israeli conflict, Arab Spring, Gulf states',
        gateLevel: 3,
      },
      { id: '6.6', label: 'Pan-Arab Institutions & Identity', labelAr: 'المؤسسات القومية', gateLevel: 2 },
      { id: '6.7', label: 'Contemporary Arab Society', labelAr: 'المجتمع العربي المعاصر', gateLevel: 2 },
      {
        id: '6.8', label: 'Diaspora & Migration', labelAr: 'الشتات والهجرة',
        description: 'Mahjar, labour migration, forced displacement, diaspora identity',
        gateLevel: 2,
      },
    ],
  },
  {
    id: '7', label: 'Esoteric & Occult Sciences', labelAr: 'علوم الأسرار والحروف',
    description: 'ʿIlm al-Ḥurūf (letter mysticism) and ʿIlm al-Arqām (numerology)',
    gateLevel: 2,
    children: [
      {
        id: '7.1', label: 'ʿIlm al-Ḥurūf (Science of Letters)', labelAr: 'علم الحروف',
        description: 'Abjad systems, letter divisions, combinatorial branch, ḥurūfī metaphysics',
        gateLevel: 3,
        children: [
          { id: '7.1.1', label: 'Abjad al-Ṣaghīr / al-Kabīr (letter-number assignment)' },
          { id: '7.1.2', label: 'al-Taqsīmāt (letter division: nūrānī / ẓalmānī)' },
          { id: '7.1.3', label: 'al-Shuʿab (combinatorial branch — Taṣrīf al-Ḥurūf)' },
          { id: '7.1.4', label: 'Aḥkām al-Ḥurūf (ḥurūf muqaṭṭaʿāt rulings)' },
          { id: '7.1.5', label: 'Sufi metaphysics (Ibn ʿArabī, al-Būnī school)' },
        ],
      },
      {
        id: '7.2', label: 'ʿIlm al-Arqām (Science of Numbers)', labelAr: 'علم الأرقام',
        description: 'Abjad arithmetic, chronograms, sacred numbers, al-Zāʾira, Jafr',
        gateLevel: 2,
        children: [
          { id: '7.2.1', label: 'Abjad arithmetic & chronograms (taʾrīkh / tawqīt)' },
          { id: '7.2.2', label: 'Numerological interpretation of sacred numbers' },
          { id: '7.2.3', label: 'al-Zāʾira (divinatory number-wheels)' },
          { id: '7.2.4', label: 'Number-based taʿwīdh (amulet) construction' },
          { id: '7.2.5', label: 'Jafr (Shīʿī esoteric numerology & divination)' },
          { id: '7.2.6', label: 'Overlap with ʿIlm al-Ḥisāb (arithmetic) & al-Jabr (algebra)' },
        ],
      },
    ],
  },
  {
    id: '8', label: 'Core Linguistic Sciences', labelAr: 'العلوم العربية الأساسية',
    description: 'The four pillars — phonetics, morphology, syntax, rhetoric — plus prosody',
    gateLevel: 1,
    children: [
      {
        id: '8.1', label: 'ʿIlm al-Naḥw (Syntax / Grammar)', labelAr: 'علم النحو',
        description: 'Iʿrāb (case system), ʿāmil theory, nominal/verbal sentences, school traditions, modern linguistic approaches',
        gateLevel: 4,
        children: [
          { id: '8.1.1', label: 'al-Kalima & al-Jumla (word & sentence classification)' },
          { id: '8.1.2', label: 'al-Iʿrāb (marfūʿ, manṣūb, majrūr, majzūm)' },
          { id: '8.1.3', label: 'al-ʿĀmil theory (governors: lafẓī / maʿnawī)' },
          { id: '8.1.4', label: 'al-Mubtadaʾ wa-al-Khabar (nominal sentence)' },
          { id: '8.1.5', label: 'al-Fāʿil & al-Nāʾib ʿan al-Fāʿil (subject & proxy)' },
          { id: '8.1.6', label: 'al-Mafʿūlāt (five types of objects)' },
          { id: '8.1.7', label: 'al-Ḥāl, al-Tamyīz, al-Istiṯnāʾ' },
          { id: '8.1.8', label: 'al-Sharṭ & al-Jawāb (conditional sentences)' },
          { id: '8.1.9', label: 'al-Tawābiʿ (naʿt, tawkīd, badal, ʿaṭf)' },
          { id: '8.1.10', label: 'al-Maṣdar & ʿamaluh (verbal noun & its operation)' },
          { id: '8.1.11', label: 'al-Ism al-Fāʿil wa-al-Mafʿūl (participles)' },
          { id: '8.1.12', label: 'School traditions (Baṣran, Kūfan, Andalusī, Baghdādī)' },
          { id: '8.1.13', label: 'Pedagogical grammar (al-Ajurrūmiyya, Alfiyya)' },
          { id: '8.1.14', label: 'Modern approaches (X-bar, minimalism, LFG)' },
        ],
      },
      {
        id: '8.2', label: 'ʿIlm al-Ṣarf (Morphology)', labelAr: 'علم الصرف',
        description: 'Root-and-pattern system, verb forms, weak roots, derived nouns, plural formation, computational morphology',
        gateLevel: 4,
        children: [
          { id: '8.2.1', label: 'Root-and-pattern system (jadhr / wazn)' },
          { id: '8.2.2', label: 'al-Mujarrad wa-al-Mazīd (Forms I–XV)' },
          { id: '8.2.3', label: 'Weak-root verbs (mithāl, ajwaf, nāqiṣ, lafīf)' },
          { id: '8.2.4', label: 'al-Muḍāʿaf (doubled/geminate verbs)' },
          { id: '8.2.5', label: 'al-Fiʿl al-Ṣaḥīḥ wa-al-Muʿtall' },
          { id: '8.2.6', label: 'al-Maṣdar (verbal noun) formation patterns' },
          { id: '8.2.7', label: 'al-Mushtaqqāt (derived nouns)' },
          { id: '8.2.8', label: 'al-Jamʿ (broken vs. sound plural formation)' },
          { id: '8.2.9', label: 'al-Taṣghīr (diminutive patterns)' },
          { id: '8.2.10', label: 'al-Nisba (relative adjective)' },
          { id: '8.2.11', label: 'Morphological parsing & computational morphology' },
        ],
      },
      {
        id: '8.3', label: 'ʿIlm al-Balāgha (Rhetoric)', labelAr: 'علم البلاغة',
        description: 'Three sciences: ʿIlm al-Maʿānī (semantic syntax), ʿIlm al-Bayān (figurative language), ʿIlm al-Badīʿ (embellishment)',
        gateLevel: 4,
        children: [
          {
            id: '8.3.1', label: 'ʿIlm al-Maʿānī (Semantic Syntax)',
            children: [
              { id: '8.3.1.1', label: 'Khabar vs. Inshāʾ (declarative vs. performative)' },
              { id: '8.3.1.2', label: 'al-Ṭalab (amr, nahy, istifhām, tamannī, nidāʾ)' },
              { id: '8.3.1.3', label: 'al-Qaṣr (restriction / emphasis)' },
              { id: '8.3.1.4', label: 'al-Faṣl wa-al-Waṣl (juncture vs. disjuncture)' },
              { id: '8.3.1.5', label: 'al-Ījāz wa-al-Iṭnāb (brevity & prolixity)' },
            ],
          },
          {
            id: '8.3.2', label: 'ʿIlm al-Bayān (Figurative Language)',
            children: [
              { id: '8.3.2.1', label: 'al-Tashbīh (simile)' },
              { id: '8.3.2.2', label: 'al-Istiʿāra (metaphor)' },
              { id: '8.3.2.3', label: 'al-Majāz al-ʿAqlī (metonymic transfer)' },
              { id: '8.3.2.4', label: 'al-Kināya (metonymy / allusion)' },
            ],
          },
          {
            id: '8.3.3', label: 'ʿIlm al-Badīʿ (Embellishment)',
            children: [
              { id: '8.3.3.1', label: 'al-Muḥassināt al-Lafẓiyya (jinās, sajʿ, tarsīʿ)' },
              { id: '8.3.3.2', label: 'al-Muḥassināt al-Maʿnawiyya (ṭibāq, muqābala, tawriya)' },
              { id: '8.3.3.3', label: 'al-Balāgha in Qurʾānic Iʿjāz analysis' },
            ],
          },
        ],
      },
      {
        id: '8.4', label: 'ʿIlm al-ʿArūḍ (Prosody & Rhyme)', labelAr: 'علم العروض',
        description: 'al-Khalīl\'s 16 meters, allowable modifications, scansion, rhyme theory, computational ʿarūḍ',
        gateLevel: 3,
        children: [
          { id: '8.4.1', label: 'al-Khalīl\'s system of 16 meters (buhūr)' },
          { id: '8.4.2', label: 'al-ʿArūḍ & al-Ḍarb (last foot modification)' },
          { id: '8.4.3', label: 'al-Ziḥāf wa-al-ʿIlla (allowable modifications)' },
          { id: '8.4.4', label: 'al-Taqṭīʿ al-ʿArūḍī (scansion methodology)' },
          { id: '8.4.5', label: 'al-Qāfiya (rhyme theory)' },
          { id: '8.4.6', label: 'Variant meters (zajal, muwashshaḥ, free verse)' },
          { id: '8.4.7', label: 'Computational ʿarūḍ & automatic meter identification' },
        ],
      },
      {
        id: '8.5', label: 'ʿIlm al-Ṣawtiyyāt (Phonetics & Phonology)', labelAr: 'علم الصوتيات',
        description: 'Consonant inventory, vowel system, syllable structure, emphasis spread, regional variation',
        gateLevel: 4,
        children: [
          { id: '8.5.1', label: 'Arabic consonant inventory (pharyngeal, uvular, emphatic)' },
          { id: '8.5.2', label: 'Arabic vowel system (short, long, diphthongs)' },
          { id: '8.5.3', label: 'Syllable structure & stress patterns' },
          { id: '8.5.4', label: 'Emphasis spread (tafkīm / pharyngealization)' },
          { id: '8.5.5', label: 'Regional and stylistic phonological variation' },
        ],
      },
    ],
  },
  {
    id: '9', label: 'Arabic Literature (al-Adab)', labelAr: 'الأدب العربي',
    description: 'Classical poetry and prose, modern & contemporary literature, folk & oral traditions',
    gateLevel: 2,
    children: [
      {
        id: '9.1', label: 'Classical Poetry (al-Shiʿr al-Qadīm)', labelAr: 'الشعر القديم',
        description: 'Jāhilī through neoclassical — the Muʿallaqāt, ʿAbbāsid Golden Age, Andalusī, Muwashshaḥ',
        gateLevel: 3,
        children: [
          { id: '9.1.1', label: 'Jāhilī (al-Muʿallaqāt, Imruʾ al-Qays, al-Khansāʾ)' },
          { id: '9.1.2', label: 'Mukhaḍramūn & Islāmic transitional' },
          { id: '9.1.3', label: 'Umayyad (Jarīr, al-Farazdaq, naqāʾiḍ, ʿUmar ibn Abī Rabīʿa)' },
          { id: '9.1.4', label: 'ʿAbbāsid Golden Age (al-Mutanabbī, Abū Nuwās, al-Maʿarrī)' },
          { id: '9.1.5', label: 'Andalusī poetry (Ibn Zaydūn, Wallāda, al-Muʿtamid)' },
          { id: '9.1.6', label: 'Ayyūbid / Mamlūk (al-Būṣīrī — Burda)' },
          { id: '9.1.7', label: 'Muwashshaḥ & Zajal (strophic forms)' },
          { id: '9.1.8', label: 'Neoclassical (al-Bārūdī, Shawqī, Ḥāfiẓ Ibrāhīm)' },
        ],
      },
      {
        id: '9.2', label: 'Classical Prose (al-Nathr al-Qadīm)', labelAr: 'النثر القديم',
        description: 'Oratory, epistolary, Maqāmāt, Adab encyclopedias, travel literature, popular epics, 1001 Nights',
        gateLevel: 3,
        children: [
          { id: '9.2.1', label: 'Oratory (khuṭba: Quss ibn Sāʿida, ʿAbd al-Ḥamīd al-Kātib)' },
          { id: '9.2.2', label: 'Epistolary (rasāʾil: al-Jāḥiẓ, al-Tawḥīdī)' },
          { id: '9.2.3', label: 'al-Maqāmāt (al-Hamadhānī, al-Ḥarīrī)' },
          { id: '9.2.4', label: 'Adab encyclopedias (al-Jāḥiẓ, Ibn Qutayba, al-Masʿūdī)' },
          { id: '9.2.5', label: 'Travel literature (riḥla: Ibn Jubayr, Ibn Baṭṭūṭa)' },
          { id: '9.2.6', label: 'Autobiography (Usāma ibn Munqidh)' },
          { id: '9.2.7', label: 'Popular epic cycles (Sīrat ʿAntar, Banī Hilāl)' },
          { id: '9.2.8', label: '1001 Nights (Alf Layla wa-Layla)' },
        ],
      },
      {
        id: '9.3', label: 'Modern & Contemporary Literature', labelAr: 'الأدب الحديث',
        description: 'Nahḍa, Mahjar, modern poetry, novel, short story, drama, literary criticism',
        gateLevel: 3,
        children: [
          { id: '9.3.1', label: 'Nahḍa (al-Ṭahṭāwī, al-Bustānī, al-Manfalūṭī)' },
          { id: '9.3.2', label: 'Mahjar / Diaspora (Jubrān, Nuʿayma, Abū Māḍī)' },
          {
            id: '9.3.3', label: 'Modern Poetry',
            children: [
              { id: '9.3.3.1', label: 'Romantic (Muṭrān, Ṭāhā, Abū Shabaka)' },
              { id: '9.3.3.2', label: 'Tammūzī / Mythological (Adūnīs, Sayyib, Bayātī)' },
              { id: '9.3.3.3', label: 'Resistance (Darwīsh, al-Qāsim, al-Barghūthī)' },
              { id: '9.3.3.4', label: 'Free-verse pioneers (al-Malāʾika, al-Sayyāb)' },
            ],
          },
          {
            id: '9.3.4', label: 'The Novel (al-Riwāya)',
            children: [
              { id: '9.3.4.1', label: 'Pioneers (Maḥfūẓ, al-Ṭayyib Ṣāliḥ)' },
              { id: '9.3.4.2', label: 'Generational (Khūrī, Kanafānī, Ḥabībī)' },
              { id: '9.3.4.3', label: 'Maghrebi (Kateb Yacine, Djebar)' },
              { id: '9.3.4.4', label: 'Women\'s writing (al-Saʿdāwī, Mustaghānamī)' },
            ],
          },
          { id: '9.3.5', label: 'The Short Story (al-Qiṣṣa al-Qaṣīra)' },
          {
            id: '9.3.6', label: 'Drama (al-Masraḥ)',
            children: [
              { id: '9.3.6.1', label: 'Pioneers (Ṣanūʿ, al-Naqqāsh, al-Ḥakīm)' },
              { id: '9.3.6.2', label: 'Modern (Wannūs, Barsha, Qūra)' },
              { id: '9.3.6.3', label: 'Shadow plays (Khayāl al-Ẓill: Ibn Dāniyāl)' },
            ],
          },
          {
            id: '9.3.7', label: 'Literary Criticism (al-Naqd al-Adabī)',
            children: [
              { id: '9.3.7.1', label: 'Classical criticism (al-Jāḥiẓ, Ibn Qutayba)' },
              { id: '9.3.7.2', label: 'Modern schools (al-ʿAqqād, Ḥusayn, Mandūr)' },
              { id: '9.3.7.3', label: 'Structuralism & semiotics (al-Ghadhāmī)' },
              { id: '9.3.7.4', label: 'Postcolonial & feminist criticism' },
            ],
          },
        ],
      },
      {
        id: '9.4', label: 'Folk & Oral Traditions', labelAr: 'التقاليد الشعبية',
        description: 'Folk epic, Nabati poetry, Mawwāl, Zajal, proverbs, riddles, Ḥakawātī',
        gateLevel: 2,
        children: [
          { id: '9.4.1', label: 'Folk epic (Sīra Shaʿbiyya)' },
          { id: '9.4.2', label: 'al-Shiʿr al-Nabaṭī (Bedouin vernacular poetry)' },
          { id: '9.4.3', label: 'al-Mawwāl (folk sung poetry)' },
          { id: '9.4.4', label: 'al-Zajal (strophic sung debate poetry)' },
          { id: '9.4.5', label: 'Proverbs (al-Amthāl al-ʿArabiyya)' },
          { id: '9.4.6', label: 'Riddles, lullabies, children\'s lore' },
          { id: '9.4.7', label: 'Ḥakawātī (public storyteller tradition)' },
        ],
      },
    ],
  },
  {
    id: '10', label: 'Translation & Interpretation', labelAr: 'الترجمة والتحرير الفوري',
    description: 'Translation theory, conference interpreting, specialized, literary, audiovisual, Quranic translation, localization',
    gateLevel: 2,
    children: [
      { id: '10.1', label: 'Translation Theory (Arabic-specific)', labelAr: 'نظرية الترجمة', gateLevel: 3 },
      { id: '10.2', label: 'Conference & Diplomatic Interpreting', labelAr: 'الترجمة الفورية', gateLevel: 4 },
      {
        id: '10.3', label: 'Specialized Translation', labelAr: 'الترجمة المتخصصة',
        children: [
          { id: '10.3.1', label: 'Legal & judicial' },
          { id: '10.3.2', label: 'Medical & pharmaceutical' },
          { id: '10.3.3', label: 'Financial & commercial' },
          { id: '10.3.4', label: 'Technical & engineering' },
          { id: '10.3.5', label: 'Media & news translation' },
          { id: '10.3.6', label: 'UN & international organizations' },
        ],
        gateLevel: 3,
      },
      { id: '10.4', label: 'Literary Translation', labelAr: 'الترجمة الأدبية', gateLevel: 4 },
      {
        id: '10.5', label: 'Audiovisual Translation', labelAr: 'الترجمة السمعية البصرية',
        children: [
          { id: '10.5.1', label: 'Subtitling (Arabic ↔ English)' },
          { id: '10.5.2', label: 'Dubbing & voice-over (dialect choice)' },
          { id: '10.5.3', label: 'Accessibility (audio description, SDH)' },
        ],
        gateLevel: 3,
      },
      {
        id: '10.6', label: 'Qurʾānic & Religious Translation', labelAr: 'ترجمة القرآن',
        description: 'Untranslatability challenges, major English Qurʾān translations, ḥadīth & fiqh translation',
        gateLevel: 4,
      },
      {
        id: '10.7', label: 'Localization & Technology', labelAr: 'التعريب والتكنولوجيا',
        children: [
          { id: '10.7.1', label: 'Website & software localization (RTL, i18n)' },
          { id: '10.7.2', label: 'Game localization for Arab markets' },
          { id: '10.7.3', label: 'Machine translation (Google, Sakhr, LLM-based)' },
          { id: '10.7.4', label: 'CAT tools (Trados, memoQ, Arabic support)' },
          { id: '10.7.5', label: 'Post-editing of machine translation' },
        ],
        gateLevel: 3,
      },
      { id: '10.8', label: 'Ethics & Professional Practice', labelAr: 'أخلاقيات المهنة', gateLevel: 2 },
    ],
  },
  {
    id: '11', label: 'Digital & Computational Arabic', labelAr: 'اللغة العربية الرقمية',
    description: 'NLP, corpora, speech technology, OCR, Unicode/typography, information retrieval, LLMs',
    gateLevel: 2,
    children: [
      {
        id: '11.1', label: 'Arabic Natural Language Processing', labelAr: 'المعالجة الطبيعية',
        children: [
          { id: '11.1.1', label: 'Preprocessing & tokenization' },
          { id: '11.1.2', label: 'Morphological analysis (Buckwalter, MADAMIRA, Farasa)' },
          { id: '11.1.3', label: 'Part-of-speech tagging' },
          { id: '11.1.4', label: 'Syntactic parsing (treebanks)' },
          { id: '11.1.5', label: 'Named-entity recognition' },
          { id: '11.1.6', label: 'Sentiment analysis & opinion mining' },
          { id: '11.1.7', label: 'Machine translation systems' },
          { id: '11.1.8', label: 'Question-answering & information extraction' },
        ],
        gateLevel: 3,
      },
      {
        id: '11.2', label: 'Arabic Corpora & Resources', labelAr: 'المتون والموارد',
        children: [
          { id: '11.2.1', label: 'Classical corpora (OpenITI, al-Shāmila)' },
          { id: '11.2.2', label: 'Modern standard corpora (arabicorpus, Kalimat)' },
          { id: '11.2.3', label: 'Dialectal corpora' },
          { id: '11.2.4', label: 'Parallel corpora' },
          { id: '11.2.5', label: 'Arabic treebanks (PADT, Columbia, Quranic)' },
          { id: '11.2.6', label: 'Arabic WordNet, FrameNet & OntoNotes' },
        ],
        gateLevel: 2,
      },
      {
        id: '11.3', label: 'Arabic Speech Technology', labelAr: 'تقنية الكلام',
        children: [
          { id: '11.3.1', label: 'Automatic speech recognition (MSA & dialects)' },
          { id: '11.3.2', label: 'Text-to-speech (rule-based, neural)' },
          { id: '11.3.3', label: 'Speaker identification & diarization' },
          { id: '11.3.4', label: 'Arabic diacritization (automatic tashkīl)' },
        ],
        gateLevel: 3,
      },
      {
        id: '11.4', label: 'Arabic Script & OCR', labelAr: 'التعرف البصري',
        children: [
          { id: '11.4.1', label: 'Optical character recognition' },
          { id: '11.4.2', label: 'Handwriting recognition' },
          { id: '11.4.3', label: 'Document layout analysis & digitization' },
        ],
        gateLevel: 3,
      },
      {
        id: '11.5', label: 'Arabic Typography & Unicode', labelAr: 'الطباعة ويونيكود',
        children: [
          { id: '11.5.1', label: 'Arabic Unicode block (0600–06FF)' },
          { id: '11.5.2', label: 'Bidirectional text (BiDi algorithm)' },
          { id: '11.5.3', label: 'Arabic font design & type families' },
          { id: '11.5.4', label: 'OpenType features (init, medi, fina, liga)' },
          { id: '11.5.5', label: 'Text shaping engines (HarfBuzz, CoreText)' },
        ],
        gateLevel: 2,
      },
      {
        id: '11.6', label: 'Arabic Information Retrieval', labelAr: 'استرجاع المعلومات',
        children: [
          { id: '11.6.1', label: 'Arabic stemming & root extraction' },
          { id: '11.6.2', label: 'Arabic search relevance' },
          { id: '11.6.3', label: 'Arabic spell-checking & correction' },
          { id: '11.6.4', label: 'Cross-lingual information retrieval' },
        ],
        gateLevel: 3,
      },
      {
        id: '11.7', label: 'Arabic LLMs & Generative AI', labelAr: 'النماذج اللغوية الكبيرة',
        children: [
          { id: '11.7.1', label: 'LLMs for Arabic (AraBERT, Jais, CamelBERT)' },
          { id: '11.7.2', label: 'Arabic prompt engineering & evaluation' },
          { id: '11.7.3', label: 'Dialectal LLM performance & fine-tuning' },
          { id: '11.7.4', label: 'Arabic content generation' },
        ],
        gateLevel: 3,
      },
      {
        id: '11.8', label: 'Arabic Input & Interaction', labelAr: 'الإدخال والتفاعل',
        children: [
          { id: '11.8.1', label: 'Keyboard layouts (Arabic QWERTY, Buckwalter)' },
          { id: '11.8.2', label: 'Arabic chat alphabets (Arabizi / Franco-Arabic)' },
          { id: '11.8.3', label: 'Voice assistants for Arabic' },
          { id: '11.8.4', label: 'Arabic accessibility tech (screen readers)' },
        ],
        gateLevel: 2,
      },
    ],
  },
  {
    id: '12', label: 'Teaching Arabic (TAFL)', labelAr: 'تعليم العربية كلغة أجنبية',
    description: 'Pedagogical foundations, curricula, assessment, heritage learners, classroom methods, teacher training',
    gateLevel: 2,
    children: [
      { id: '12.1', label: 'Pedagogical Foundations', labelAr: 'الأسس التربوية', description: 'SLA theory, diglossia challenge, contrastive analysis', gateLevel: 3 },
      { id: '12.2', label: 'Curricula & Materials', labelAr: 'المناهج والمواد', description: 'Textbook series, CEFR/ACTFL design, ASP, authentic materials', gateLevel: 3 },
      { id: '12.3', label: 'Assessment & Proficiency', labelAr: 'التقييم والكفاءة', description: 'ACTFL OPI, CEFR alignment, computer-adaptive tests', gateLevel: 3 },
      { id: '12.4', label: 'Heritage Learners', labelAr: 'المتعلمون التراثيون', description: 'Diaspora profiles, curriculum design, language maintenance', gateLevel: 3 },
      { id: '12.5', label: 'Classroom Methods & Technology', labelAr: 'طرق التدريس والتكنولوجيا', description: 'CLT, TBLT, Arabic EdTech, study abroad', gateLevel: 2 },
      { id: '12.6', label: 'Teacher Training', labelAr: 'تدريب المعلمين', description: 'Certification, native/non-native dynamics, reflective practice', gateLevel: 4 },
    ],
  },
  {
    id: '13', label: 'Manuscripts & Critical Editing', labelAr: 'المخطوطات والتحقيق',
    description: 'Textual criticism, codicology, paleography, bibliography, digital humanities',
    gateLevel: 2,
    children: [
      { id: '13.1', label: 'Textual Criticism (Taḥqīq)', labelAr: 'التحقيق', description: 'Stemmatics, recension, edition types, apparatus criticus', gateLevel: 3 },
      { id: '13.2', label: 'Arabic Codicology', labelAr: 'علم المخطوطات', description: 'Writing supports, binding, collation, mise-en-page, provenance', gateLevel: 2 },
      { id: '13.3', label: 'Arabic Paleography', labelAr: 'علم الخطوط', description: 'Early Kufic, naskh development, regional script families, dating', gateLevel: 3 },
      { id: '13.4', label: 'Bibliographic Tradition (al-Fihris)', labelAr: 'الفهرست', description: 'Ibn al-Nadīm, Ḥājjī Khalīfa, Brockelmann, Sezgin, databases', gateLevel: 2 },
      {
        id: '13.5', label: 'Digital Humanities', labelAr: 'الإنسانيات الرقمية',
        description: 'OpenITI, al-Maktaba al-Shāmila, digitization, IIIF, computational paleography',
        gateLevel: 3,
      },
      { id: '13.6', label: 'Archival & Preservation', labelAr: 'الأرشفة والحفظ', gateLevel: 2 },
    ],
  },
  {
    id: '14', label: 'Media & Journalism', labelAr: 'الإعلام والصحافة',
    description: 'Press history, satellite media, news language, digital/social media, television, journalism practice, advertising',
    gateLevel: 2,
    children: [
      { id: '14.1', label: 'Arab Press History', labelAr: 'تاريخ الصحافة', description: 'Early Arabic press, pan-Arab print era, censorship', gateLevel: 2 },
      { id: '14.2', label: 'Pan-Arab Satellite Media', labelAr: 'الإعلام الفضائي', description: 'Al Jazeera, Al Arabiya, state-owned channels, soft power', gateLevel: 2 },
      {
        id: '14.3', label: 'Arabic News Language & Discourse', labelAr: 'لغة الأخبار',
        description: 'News writing, broadcast Arabic, opinion vs. news, discourse analysis, propaganda',
        gateLevel: 3,
      },
      {
        id: '14.4', label: 'Digital & Social Media', labelAr: 'الإعلام الرقمي',
        description: 'Arab blogosphere, social platforms, hashtag activism, internet linguistics, disinformation',
        gateLevel: 3,
      },
      { id: '14.5', label: 'Television & Radio', labelAr: 'التلفزيون والإذاعة', description: 'Talk shows, religious broadcasting, drama, podcasting', gateLevel: 2 },
      { id: '14.6', label: 'Journalism Training & Practice', labelAr: 'التدريب الصحفي', description: 'Conflict reporting, investigative journalism, data journalism, ethics', gateLevel: 3 },
      { id: '14.7', label: 'Advertising & Public Relations', labelAr: 'الإعلان والعلاقات العامة', description: 'Ramadan campaigns, crisis communication, nation branding', gateLevel: 2 },
    ],
  },
]

export const learningTracks: Track[] = [
  {
    id: 'A', name: 'Foundational Arabic Linguistics', nameAr: 'العلوم العربية الأساسية',
    description: 'The four pillars — phonetics, morphology, syntax, rhetoric — plus prosody. Gateway to all other tracks.',
    color: '#1a73e8', icon: 'Binary',
    nodes: [
      { id: '8.5', label: 'Phonetics & Phonology', requiredLevel: 3 },
      { id: '8.2', label: 'Morphology (Ṣarf)', requiredLevel: 3 },
      { id: '8.1', label: 'Syntax (Naḥw)', requiredLevel: 3 },
      { id: '8.3', label: 'Rhetoric (Balāgha)', requiredLevel: 3 },
      { id: '8.4', label: 'Prosody (ʿArūḍ)', requiredLevel: 2 },
    ],
    tracksUnlocked: ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
  },
  {
    id: 'B', name: 'Dialectal Arabic', nameAr: 'اللهجات العربية',
    description: 'Proficiency in one or more spoken Arabic varieties, with sociolinguistic awareness and diglossia management.',
    color: '#e8711a', icon: 'Languages',
    nodes: [
      { id: '1.9', label: 'Sociolinguistics & Dialectology', requiredLevel: 2 },
      { id: '1.1', label: 'Egyptian (Masrī)', requiredLevel: 3 },
      { id: '1.4', label: 'Levantine (Shāmī)', requiredLevel: 3 },
      { id: '1.2', label: 'Saudi (KSA)', requiredLevel: 3 },
      { id: '1.10', label: 'Cross-Dialectal Competencies', requiredLevel: 3 },
    ],
    tracksUnlocked: ['G', 'I', 'H'],
  },
  {
    id: 'D', name: 'Quranic Studies', nameAr: 'الدراسات القرآنية',
    description: 'From Tajwīd recitation through Tafsīr and ʿUlūm al-Qurʾān.',
    color: '#1b5e20', icon: 'BookOpen',
    nodes: [
      { id: '2.1.2', label: 'Reading Proficiency', requiredLevel: 1 },
      { id: '2.1.1', label: 'Tajwīd (Recitation)', requiredLevel: 3 },
      { id: '2.1.3', label: 'ʿUlūm al-Qurʾān', requiredLevel: 3 },
      { id: '2.2', label: 'Tafsīr (Exegesis)', requiredLevel: 3 },
      { id: '2.2.2', label: 'Contemporary Tafsīr', requiredLevel: 3 },
    ],
    tracksUnlocked: ['E', 'G', 'K'],
  },
  {
    id: 'E', name: 'Islamic Sciences', nameAr: 'العلوم الإسلامية',
    description: 'Hadith, Fiqh & Usul, Kalam, Tasawwuf, and Arabic philosophy.',
    color: '#2e7d32', icon: 'BookMarked',
    nodes: [
      { id: '2.3.1', label: 'Sīra (Prophetic Biography)', requiredLevel: 2 },
      { id: '2.4', label: 'Hadith Sciences', requiredLevel: 3 },
      { id: '2.5.1', label: 'Uṣūl al-Fiqh', requiredLevel: 3 },
      { id: '2.5.2', label: 'Fiqh al-Madhāhib', requiredLevel: 3 },
      { id: '2.6', label: 'Kalām (Theology)', requiredLevel: 3 },
      { id: '2.7', label: 'Taṣawwuf (Sufism)', requiredLevel: 3 },
      { id: '2.8', label: 'Falsafa (Philosophy)', requiredLevel: 3 },
    ],
    tracksUnlocked: ['O', 'K'],
  },
  {
    id: 'F', name: 'Arabic Literature', nameAr: 'الأدب العربي',
    description: 'From pre-Islamic odes to the contemporary novel — classical poetry and prose, modern genres, folk traditions.',
    color: '#c62828', icon: 'Feather',
    nodes: [
      { id: '9.1', label: 'Classical Poetry', requiredLevel: 3 },
      { id: '9.2', label: 'Classical Prose', requiredLevel: 3 },
      { id: '9.3', label: 'Modern & Contemporary', requiredLevel: 3 },
      { id: '9.3.3', label: 'Modern Poetry', requiredLevel: 3 },
      { id: '9.3.4', label: 'The Novel', requiredLevel: 3 },
      { id: '9.3.7', label: 'Literary Criticism', requiredLevel: 3 },
      { id: '9.4', label: 'Folk & Oral Traditions', requiredLevel: 2 },
    ],
    tracksUnlocked: ['G', 'I'],
  },
  {
    id: 'G', name: 'Translation & Interpretation', nameAr: 'الترجمة والتحرير الفوري',
    description: 'Theory, conference interpreting, specialized, literary, AVT, Quranic translation, localization.',
    color: '#6a1b9a', icon: 'Languages',
    nodes: [
      { id: '10.1', label: 'Translation Theory', requiredLevel: 3 },
      { id: '10.3', label: 'Specialized Translation', requiredLevel: 3 },
      { id: '10.4', label: 'Literary Translation', requiredLevel: 4 },
      { id: '10.5', label: 'Audiovisual Translation', requiredLevel: 3 },
      { id: '10.2', label: 'Conference Interpreting', requiredLevel: 4 },
      { id: '10.6', label: 'Quranic Translation', requiredLevel: 4 },
      { id: '10.7', label: 'Localization & Technology', requiredLevel: 3 },
    ],
    tracksUnlocked: ['J'],
  },
  {
    id: 'H', name: 'Teaching Arabic (TAFL)', nameAr: 'تعليم العربية',
    description: 'Pedagogical foundations, curriculum design, proficiency assessment, heritage learners, classroom technology.',
    color: '#f57c00', icon: 'GraduationCap',
    nodes: [
      { id: '12.1', label: 'Pedagogical Foundations', requiredLevel: 3 },
      { id: '12.2', label: 'Curricula & Materials', requiredLevel: 3 },
      { id: '12.3', label: 'Assessment & Proficiency', requiredLevel: 3 },
      { id: '12.4', label: 'Heritage Learners', requiredLevel: 3 },
      { id: '12.5', label: 'Classroom Methods & Tech', requiredLevel: 2 },
      { id: '12.6', label: 'Teacher Training', requiredLevel: 4 },
    ],
    tracksUnlocked: [],
  },
  {
    id: 'I', name: 'Media & Journalism', nameAr: 'الإعلام والصحافة',
    description: 'Press history, satellite broadcasting, news discourse, digital/social media, journalism practice, advertising.',
    color: '#00838f', icon: 'Radio',
    nodes: [
      { id: '14.3', label: 'News Language & Discourse', requiredLevel: 3 },
      { id: '14.1', label: 'Press History', requiredLevel: 2 },
      { id: '14.2', label: 'Satellite Media', requiredLevel: 2 },
      { id: '14.4', label: 'Digital & Social Media', requiredLevel: 3 },
      { id: '14.5', label: 'Television & Radio', requiredLevel: 2 },
      { id: '14.6', label: 'Journalism Practice', requiredLevel: 3 },
      { id: '14.7', label: 'Advertising & PR', requiredLevel: 2 },
    ],
    tracksUnlocked: [],
  },
  {
    id: 'J', name: 'Digital & Computational Arabic', nameAr: 'اللغة العربية الرقمية',
    description: 'NLP, corpora, speech technology, OCR, Unicode, information retrieval, LLMs.',
    color: '#1565c0', icon: 'Cpu',
    nodes: [
      { id: '11.5', label: 'Typography & Unicode', requiredLevel: 2 },
      { id: '11.2', label: 'Corpora & Resources', requiredLevel: 2 },
      { id: '11.1', label: 'Arabic NLP', requiredLevel: 3 },
      { id: '11.3', label: 'Speech Technology', requiredLevel: 3 },
      { id: '11.4', label: 'Script & OCR', requiredLevel: 3 },
      { id: '11.6', label: 'Information Retrieval', requiredLevel: 3 },
      { id: '11.7', label: 'LLMs & Generative AI', requiredLevel: 3 },
    ],
    tracksUnlocked: [],
  },
  {
    id: 'K', name: 'Cultural & Religious Literacy', nameAr: 'الثقافة الدينية والمدنية',
    description: 'Holidays, observances, minority communities, social etiquette, folk traditions.',
    color: '#8d6e63', icon: 'Globe',
    nodes: [
      { id: '4.1', label: 'Islamic Holidays', requiredLevel: 2 },
      { id: '4.2', label: 'Christian Holidays', requiredLevel: 2 },
      { id: '4.3', label: 'Holiday Periods', requiredLevel: 2 },
      { id: '4.4', label: 'Folk Traditions', requiredLevel: 2 },
      { id: '4.5', label: 'Minority Communities', requiredLevel: 2 },
      { id: '4.6', label: 'Cultural Etiquette', requiredLevel: 2 },
    ],
    tracksUnlocked: [],
  },
  {
    id: 'L', name: 'Aesthetics & Visual Arts', nameAr: 'الجماليات والفنون البصرية',
    description: 'Art, design, calligraphy, music, and performing arts.',
    color: '#ad1457', icon: 'Palette',
    nodes: [
      { id: '5.1', label: 'Arabic Art', requiredLevel: 2 },
      { id: '5.3', label: 'Calligraphy', requiredLevel: 3 },
      { id: '5.2', label: 'Arabic Design', requiredLevel: 3 },
      { id: '5.4', label: 'Music & Performing Arts', requiredLevel: 2 },
    ],
    tracksUnlocked: ['J'],
  },
  {
    id: 'M', name: 'Manuscripts & Critical Editing', nameAr: 'المخطوطات والتحقيق',
    description: 'Textual criticism, codicology, paleography, bibliography, digital humanities.',
    color: '#4e342e', icon: 'Archive',
    nodes: [
      { id: '13.3', label: 'Paleography', requiredLevel: 3 },
      { id: '13.2', label: 'Codicology', requiredLevel: 2 },
      { id: '13.1', label: 'Textual Criticism (Taḥqīq)', requiredLevel: 3 },
      { id: '13.4', label: 'Bibliographic Tradition', requiredLevel: 2 },
      { id: '13.5', label: 'Digital Humanities', requiredLevel: 3 },
    ],
    tracksUnlocked: ['J'],
  },
  {
    id: 'N', name: 'Historical Context', nameAr: 'السياق التاريخي',
    description: 'Pre-Islamic Arabia through contemporary Arab society, diaspora, and migration.',
    color: '#3e2723', icon: 'History',
    nodes: [
      { id: '6.1', label: 'Pre-Islamic Arabia', requiredLevel: 2 },
      { id: '6.2', label: 'Rise of Islam', requiredLevel: 2 },
      { id: '6.3', label: 'Islamic Golden Age', requiredLevel: 2 },
      { id: '6.4', label: 'Ottoman Era & Nahḍa', requiredLevel: 2 },
      { id: '6.5', label: 'Colonial & Post-Colonial', requiredLevel: 3 },
      { id: '6.6', label: 'Pan-Arab Identity', requiredLevel: 2 },
      { id: '6.7', label: 'Contemporary Society', requiredLevel: 2 },
      { id: '6.8', label: 'Diaspora & Migration', requiredLevel: 2 },
    ],
    tracksUnlocked: ['E', 'F', 'I', 'K'],
  },
  {
    id: 'O', name: 'Esoteric Sciences', nameAr: 'علوم الأسرار',
    description: 'Letter mysticism (ʿIlm al-Ḥurūf) and numerology (ʿIlm al-Arqām).',
    color: '#37474f', icon: 'Sparkles',
    nodes: [
      { id: '7.1', label: 'ʿIlm al-Ḥurūf', requiredLevel: 3 },
      { id: '7.2', label: 'ʿIlm al-Arqām', requiredLevel: 2 },
    ],
    tracksUnlocked: [],
  },
]

export function getNodeById(id: string, nodes: SkillNode[] = taxonomyTree): SkillNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = getNodeById(id, node.children)
      if (found) return found
    }
  }
  return undefined
}

export function getBranchForId(id: string): string {
  return id.split('.')[0]
}

export function countLeaves(nodes: SkillNode[]): number {
  let count = 0
  for (const node of nodes) {
    if (!node.children || node.children.length === 0) count++
    else count += countLeaves(node.children)
  }
  return count
}

export const totalNodeCount = countLeaves(taxonomyTree)

export function getLeafIds(nodes: SkillNode[]): string[] {
  const ids: string[] = []
  for (const node of nodes) {
    if (!node.children || node.children.length === 0) ids.push(node.id)
    else ids.push(...getLeafIds(node.children))
  }
  return ids
}

export function getAllBranchLeafCounts(): { id: string; label: string; leafCount: number; gateLevel?: number }[] {
  return taxonomyTree.map(b => ({
    id: b.id,
    label: b.label,
    leafCount: countLeaves([b]),
    gateLevel: b.gateLevel,
  }))
}
