export interface AgentInfo {
  agent: string
  agentAr: string
  description: string
}

export const branchAgents: Record<string, AgentInfo> = {
  '1':  { agent: 'Dialectologist', agentAr: 'عالم لهجات', description: 'Specialist in regional Arabic varieties, sociolinguistic variation, and cross-dialectal competence.' },
  '2':  { agent: 'Islamic Scholar', agentAr: 'عالم إسلامي', description: 'Scholar trained in Quranic sciences, Hadith, Fiqh, Kalam, and classical Arabic traditions.' },
  '3':  { agent: 'Lexicographer', agentAr: 'معجمي', description: 'Expert in Arabic dictionary construction, root-system etymology, and semantic nuance analysis.' },
  '4':  { agent: 'Cultural Anthropologist', agentAr: 'عالم أنثروبولوجيا ثقافية', description: 'Analyst of Arab religious observances, folk traditions, minority communities, and social codes.' },
  '5':  { agent: 'Artist / Designer', agentAr: 'فنان / مصمم', description: 'Practitioner of Arabic visual arts, calligraphy, design, music, and performing arts.' },
  '6':  { agent: 'Historian', agentAr: 'مؤرخ', description: 'Historian of the Arab world from pre-Islamic Arabia through contemporary society and diaspora.' },
  '7':  { agent: 'Esoteric Scholar', agentAr: 'عالم أسرار', description: 'Scholar of Arabic letter mysticism (ʿIlm al-Ḥurūf) and numerological sciences (ʿIlm al-Arqām).' },
  '8':  { agent: 'Linguist', agentAr: 'لغوي', description: 'Core linguist specializing in Arabic phonetics, morphology, syntax, rhetoric, and prosody.' },
  '9':  { agent: 'Literary Critic', agentAr: 'ناقد أدبي', description: 'Scholar and critic of Arabic literature spanning classical poetry, prose, modern genres, and oral traditions.' },
  '10': { agent: 'Translator', agentAr: 'مترجم', description: 'Professional translator and interpreter working between Arabic and other languages across domains.' },
  '11': { agent: 'Computational Linguist', agentAr: 'لغوي حاسوبي', description: 'Engineer and researcher in Arabic NLP, speech technology, OCR, typography, and LLMs.' },
  '12': { agent: 'Educator', agentAr: 'معلم', description: 'Teacher of Arabic as a foreign language (TAFL) with expertise in pedagogy, assessment, and curriculum design.' },
  '13': { agent: 'Manuscript Scholar', agentAr: 'عالم مخطوطات', description: 'Specialist in Arabic codicology, paleography, textual criticism (taḥqīq), and digital humanities.' },
  '14': { agent: 'Media Analyst', agentAr: 'محلل إعلامي', description: 'Journalist and analyst of Arab press, satellite media, news discourse, digital media, and advertising.' },
}

export const subBranchAgents: Record<string, AgentInfo> = {
  '1.1':  { agent: 'Egyptologist Dialectologist', agentAr: 'عالم لهجات مصرية', description: 'Specialist in Egyptian Arabic phonology, lexicon, sociolects, and media register.' },
  '1.2':  { agent: 'Arabian Dialectologist', agentAr: 'عالم لهجات جزيرة العرب', description: 'Specialist in Saudi, Gulf, and Arabian Peninsula Arabic varieties.' },
  '1.3':  { agent: 'Gulf Dialectologist', agentAr: 'عالم لهجات خليجية', description: 'Specialist in Emirati and Gulf Arabic phonology, maritime lexicon, and Bedouin-coastal distinction.' },
  '1.4':  { agent: 'Levantine Dialectologist', agentAr: 'عالم لهجات شامية', description: 'Specialist in Syrian, Lebanese, Palestinian, and Jordanian Arabic.' },
  '1.5':  { agent: 'Maghrebi Dialectologist', agentAr: 'عالم لهجات مغاربية', description: 'Specialist in Moroccan, Algerian, Tunisian, and Libyan Darija with Berber substrate knowledge.' },
  '1.6':  { agent: 'Mesopotamian Dialectologist', agentAr: 'عالم لهجات عراقية', description: 'Specialist in Iraqi Arabic qəltu/gilit distinction and Turkish/Persian loanword integration.' },
  '2.1':  { agent: 'Qāriʾ / Qurʾān Scholar', agentAr: 'قارئ / عالم قرآن', description: 'Master of Tajwīd recitation rules, qirāʾāt traditions, and ʿUlūm al-Qurʾān.' },
  '2.2':  { agent: 'Mufassir / Exegete', agentAr: 'مفسر', description: 'Scholar of Quranic exegesis, classical and contemporary tafsīr methodologies.' },
  '2.3':  { agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي', description: 'Scholar of Sīra, Islamic historiography, and caliphal dynastic eras.' },
  '2.4':  { agent: 'Muḥaddith / Hadīth Scholar', agentAr: 'محدث', description: 'Specialist in Hadith sciences, transmitter criticism, and canonical collection analysis.' },
  '2.5':  { agent: 'Faqīh / Jurist', agentAr: 'فقيه', description: 'Legal scholar of Uṣūl al-Fiqh, madhhab jurisprudence, and fatwā methodology.' },
  '2.6':  { agent: 'Mutakallim / Theologian', agentAr: 'متكلم', description: 'Scholar of ʿIlm al-Kalām, Islamic theological schools, and doctrinal debates.' },
  '2.7':  { agent: 'Ṣūfī / Mystic', agentAr: 'صوفي', description: 'Practitioner and scholar of Taṣawwuf, Sufi orders, and mystical literature.' },
  '2.8':  { agent: 'Faylasūf / Philosopher', agentAr: 'فيلسوف', description: 'Scholar of Arabic philosophy, mashshāʾiyya, ishrāqiyya, and contemporary Arab thought.' },
  '3.2':  { agent: 'Etymologist', agentAr: 'عالم اشتقاق', description: 'Specialist in Arabic root-system derivation, loanword Arabization, and semantic drift.' },
  '3.3':  { agent: 'Semanticist', agentAr: 'عالم دلالات', description: 'Analyst of Arabic near-synonym discrimination, polysemy, and connotative fields.' },
  '5.2':  { agent: 'Designer', agentAr: 'مصمم', description: 'Practitioner of Arabic graphic design, RTL UI/UX, and spatial design.' },
  '5.3':  { agent: 'Calligrapher', agentAr: 'خطاط', description: 'Master of Arabic calligraphic scripts, tashkīl, and the master calligrapher tradition.' },
  '5.4':  { agent: 'Musician / Performer', agentAr: 'موسيقي', description: 'Musician and performer of Arabic maqām, classical vocal forms, cinema, theatre, and folk arts.' },
  '8.1':  { agent: 'Grammarian / Naḥwī', agentAr: 'نحوي', description: 'Scholar of Arabic syntax, iʿrāb, ʿāmil theory, and school traditions.' },
  '8.2':  { agent: 'Morphologist / Ṣarfī', agentAr: 'صرفي', description: 'Specialist in Arabic root-and-pattern morphology, verb forms, and derived nouns.' },
  '8.3':  { agent: 'Rhetorician / Balāghī', agentAr: 'بلاغي', description: 'Scholar of Arabic rhetorical sciences — maʿānī, bayān, and badīʿ.' },
  '8.4':  { agent: 'Prosodist / ʿArūḍī', agentAr: 'عروضي', description: 'Scholar of Arabic prosody, meter identification, and rhyme theory.' },
  '8.5':  { agent: 'Phonetician / Ṣawtī', agentAr: 'صوتي', description: 'Specialist in Arabic phonetics, phonology, emphasis spread, and regional variation.' },
  '9.1':  { agent: 'Poetry Critic', agentAr: 'ناقد شعري', description: 'Scholar of classical Arabic poetry from the Jāhilī through neoclassical periods.' },
  '9.2':  { agent: 'Prose Scholar', agentAr: 'عالم نثر', description: 'Scholar of classical Arabic prose — oratory, epistolary, maqāmāt, and adab encyclopedias.' },
  '9.3':  { agent: 'Literary Modernist', agentAr: 'أديب حديث', description: 'Scholar and critic of modern and contemporary Arabic literature — novel, poetry, drama.' },
  '9.4':  { agent: 'Folklorist', agentAr: 'عالم تراث شعبي', description: 'Scholar of Arab folk and oral traditions — epics, Nabati poetry, proverbs, and ḥakawātī.' },
  '10.2': { agent: 'Conference Interpreter', agentAr: 'مترجم فوري', description: 'Professional simultaneous and consecutive interpreter for diplomatic and conference settings.' },
  '10.4': { agent: 'Literary Translator', agentAr: 'مترجم أدبي', description: 'Translator of Arabic and English literary works with stylistic and cultural fidelity.' },
  '11.1': { agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية', description: 'Engineer of Arabic NLP systems — tokenization, parsing, NER, sentiment analysis.' },
  '11.3': { agent: 'Speech Engineer', agentAr: 'مهندس كلام', description: 'Engineer of Arabic ASR, TTS, speaker identification, and diacritization systems.' },
  '11.7': { agent: 'AI / LLM Engineer', agentAr: 'مهندس ذكاء اصطناعي', description: 'Engineer of Arabic LLMs, prompt engineering, and generative AI systems.' },
  '12.1': { agent: 'SLA Researcher', agentAr: 'باحث اكتساب لغة', description: 'Researcher of second-language acquisition theory for Arabic learners.' },
  '12.3': { agent: 'Assessment Specialist', agentAr: 'أخصائي تقييم', description: 'Designer of Arabic proficiency assessments aligned to ACTFL/CEFR standards.' },
  '13.1': { agent: 'Critical Editor / Muḥaqqiq', agentAr: 'محقق', description: 'Scholar of Arabic textual criticism, stemmatics, and critical edition production.' },
  '13.3': { agent: 'Paleographer', agentAr: 'عالم خطوط قديمة', description: 'Scholar of Arabic paleography, script dating, and regional script family identification.' },
  '14.3': { agent: 'Media Linguist', agentAr: 'لغوي إعلامي', description: 'Analyst of Arabic news language, discourse, propaganda, and media framing.' },
}

export interface MeasurableSkill {
  agent: string
  agentAr: string
  skills: string[]
}

export const leafSkills: Record<string, MeasurableSkill> = {

  /* ===== Branch 1: Dialectal Variations ===== */
  '1.1.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Transcribe the /q/ → /ʔ/ and /dʒ/ → /g/ shifts in Egyptian Arabic from audio samples',
      'Identify Egyptian Arabic vowel reductions and stress patterns in natural speech',
      'Compare Cairene vs. rural Ṣaʿīdī phonological features from field recordings',
    ],
  },
  '1.1.2': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Recognize and categorize Turkish, French, English, and Italian loanwords in Egyptian Arabic',
      'Produce a semantic field analysis of loanword integration patterns',
    ],
  },
  '1.1.3': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Differentiate Cairene urban speech from rural Ṣaʿīdī varieties across phonological and lexical features',
      'Identify class-based and education-level markers in Egyptian Arabic speech samples',
    ],
  },
  '1.1.4': {
    agent: 'Media Linguist', agentAr: 'لغوي إعلامي',
    skills: [
      'Analyze the register shift between Egyptian Arabic in cinema vs. formal broadcast media',
      'Identify code-switching patterns between Egyptian Arabic and Modern Standard Arabic in media',
    ],
  },
  '1.1.5': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Explain the meaning and context of 20 common Egyptian Arabic proverbs',
      'Use Egyptian Arabic idiomatic expressions appropriately in conversation',
    ],
  },
  '1.2.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Najdī phonological features including the preservation of /q/ and /dʒ/',
      'Transcribe Najdī Arabic speech with correct consonantal reflexes',
    ],
  },
  '1.2.2': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Distinguish Ḥijāzī urban from Bedouin varieties using phonological and lexical diagnostics',
      'Identify features and examples of each variety from audio samples',
    ],
  },
  '1.2.3': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Recognize Gulf Coast and Eastern Province dialectal markers including Baḥārna and ʿArab distinctions',
      'Explain the sociohistorical factors differentiating these speech communities',
    ],
  },
  '1.2.4': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Identify religious-register vocabulary and code-switching patterns with Fuṣḥā in Saudi speech',
      'Analyze how religious context triggers register shift in natural conversation',
    ],
  },
  '1.3.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Emirati reflexes of /q/ (→ ʾ / g), /dʒ/ (→ j / č) in connected speech',
      'Transcribe Emirati Arabic phrases with accurate phonetic representation',
    ],
  },
  '1.3.2': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Define 15 terms from the Emirati maritime and pearl-diving lexical domain',
      'Explain the cultural and historical context of maritime vocabulary',
    ],
  },
  '1.3.3': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Differentiate Bedouin from coastal urban Emirati Arabic using phonological and lexical criteria',
      'Identify the social markers that distinguish these varieties',
    ],
  },
  '1.3.4': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Explain the meaning and usage of 15 common Emirati idiomatic expressions',
      'Use Emirati idioms appropriately in context-based exercises',
    ],
  },
  '1.4.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify distinguishing phonological and lexical features of Syrian, Lebanese, Palestinian, and Jordanian Arabic',
      'Classify audio samples by national variety with 80%+ accuracy',
    ],
  },
  '1.4.2': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify shared Levantine phonological isoglosses such as the ʾimāla of /aː/ and the use of /ʕ/ reflexes',
      'Map Levantine isoglosses onto a geographic continuum',
    ],
  },
  '1.4.3': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Aramaic substrate elements in Levantine Arabic vocabulary and syntax',
      'Trace Western loanword origins in Levantine Arabic lexicon',
    ],
  },
  '1.5.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Differentiate Moroccan, Algerian, Tunisian, and Libyan Darija using phonological and lexical diagnostics',
      'Classify Maghrebi audio samples by country of origin with 75%+ accuracy',
    ],
  },
  '1.5.2': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Berber (Amazigh) substrate influence on Maghrebi Darija phonology and lexicon',
      'Explain the historical contact dynamics that produced substrate features',
    ],
  },
  '1.5.3': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Identify French lexical borrowings and code-switching patterns in Maghrebi Darija',
      'Analyze the sociolinguistic factors driving French integration in North African speech',
    ],
  },
  '1.6.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Distinguish Baghdādī qəltu from rural gilit Arabic using phonological criteria',
      'Transcribe and classify Iraqi Arabic speech samples by type',
    ],
  },
  '1.6.2': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Turkish and Persian loanwords in Iraqi Arabic across multiple semantic domains',
      'Trace the historical contacts that produced these borrowings',
    ],
  },
  '1.6.3': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify distinctive Maʿdān (Marsh Arab) vocabulary related to marshland environment and culture',
      'Explain the endangered status of Maʿdān Arabic and its unique lexical features',
    ],
  },
  '1.7': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Sudanese Arabic phonological features including Nubian and Beja substrate influence',
      'Differentiate Sudanese Arabic from Egyptian Arabic using phonological and lexical diagnostics',
    ],
  },
  '1.8.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Distinguish Ṣanʿānī, Ḥaḍramī, and Taʿizzī Yemeni varieties using phonological criteria',
      'Identify key lexical differences among Yemeni Arabic sub-varieties',
    ],
  },
  '1.8.2': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Omani and Ẓafārī Arabic features including unique consonantal inventories',
      'Explain the relationship between Omani Arabic and surviving Modern South Arabian languages',
    ],
  },
  '1.8.3': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Distinguish ʿArab from Baḥārna varieties in Bahraini Arabic using phonological and social criteria',
      'Identify the historical sectarian dimensions of Bahraini Arabic variation',
    ],
  },
  '1.8.4': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Qatari and Kuwaiti Arabic features that distinguish them from other Gulf varieties',
      'Classify Gulf audio samples by sub-variety using phonetic and lexical markers',
    ],
  },
  '1.8.5': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Ḥassāniyya Arabic phonological and lexical features',
      'Explain the Bedouin origins and West African contact influences on Ḥassāniyya',
    ],
  },
  '1.8.6': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Cypriot Maronite Arabic features as a severely endangered Arabic variety',
      'Explain the Greek contact influence on Cypriot Maronite Arabic phonology and lexicon',
    ],
  },
  '1.8.7': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Identify Central Asian Arabic varieties in Afghanistan, Uzbekistan, and Khuzestan',
      'Explain the Persian and Turkic contact influences on these isolated Arabic varieties',
    ],
  },
  '1.9.1': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Explain Ferguson\'s diglossia theory and its application to the Arabic-speaking world',
      'Critique modern challenges to the classical diglossia model using contemporary evidence',
    ],
  },
  '1.9.2': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Identify and classify code-switching patterns between Fuṣḥā and ʿāmmiyya in natural speech',
      'Analyze inter-dialectal code-mixing in pan-Arab media contexts',
    ],
  },
  '1.9.3': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Identify language attitudes toward different Arabic varieties in a given community',
      'Analyze the social prestige, purism, and stigma associated with specific Arabic varieties',
    ],
  },
  '1.9.4': {
    agent: 'Language Planner', agentAr: 'مخطط لغوي',
    skills: [
      'Explain Arabization language policies in the Maghreb and Sudan across educational and governmental domains',
      'Evaluate the effectiveness of Arabization policies in post-colonial contexts',
    ],
  },
  '1.9.5': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Apply dialect distance measurement techniques to Arabic varieties',
      'Construct a dialect continuum map of the Arabic-speaking world with isogloss bundles',
    ],
  },
  '1.10.1': {
    agent: 'Dialectologist', agentAr: 'عالم لهجات',
    skills: [
      'Demonstrate passive comprehension of 3+ major Arabic dialects outside one\'s primary variety',
      'Identify the key comprehension barriers between Arabic varieties',
    ],
  },
  '1.10.2': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Switch between Fuṣḥā and ʿāmmiyya appropriately based on context and audience',
      'Analyze diglossia management strategies in real-world communication scenarios',
    ],
  },
  '1.10.3': {
    agent: 'Sociolinguist', agentAr: 'عالم لهجات اجتماعية',
    skills: [
      'Identify a speaker\'s regional origin from audio samples with 80%+ accuracy',
      'Provide sociolinguistic profiling of speakers based on phonological and lexical markers',
    ],
  },

  /* ===== Branch 2: Religious & Classical Studies ===== */
  '2.1.1.1': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Identify and articulate all 29 Arabic consonant articulation points (makhārij) with correct placement',
      'Demonstrate independent (ṣifāt) for each letter — vibrants, plosives, fricatives, emphatics',
    ],
  },
  '2.1.1.2': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Identify and apply ṣifāt al-ḥurūf including hams, jahr, shidda, rakhāwa, istiʿlāʾ, istifāl',
      'Differentiate pairs of letters sharing articulation points but differing in ṣifāt',
    ],
  },
  '2.1.1.3': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Apply 4 rules of nūn sākina and tanwīn (iẓhār, idghām, iqlāb, ikhfāʾ) with correct pronunciation',
      'Identify the rule applicable to any nūn sākina or tanwīn in a Qurʾānic verse',
    ],
  },
  '2.1.1.4': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Apply rules of mīm sākina (ikhfāʾ shafawī, idghām shafawī, iẓhār shafawī) in recitation',
      'Identify mīm sākina rules in any Qurʾānic context',
    ],
  },
  '2.1.1.5': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Identify and apply all madd levels from aṣlī/ṭabīʿī through muttajil, munfaṣil, lāzim, and ʿāriḍ',
      'Recite with correct madd counts (2, 4, 5, or 6 beats) per rule',
    ],
  },
  '2.1.1.6': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Apply waqf (pause) rules including qaṭʿ, ḥasan, kāfī, and tāmm classifications',
      'Identify appropriate ibtidāʾ (commencement) points after each pause type',
    ],
  },
  '2.1.1.7': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Identify the 10 canonical qirāʾāt (recitation traditions) and their primary transmitters',
      'Recite selected verses in at least 2 different qirāʾāt with correct differences',
    ],
  },
  '2.1.2.1': {
    agent: 'Qurʾān Scholar', agentAr: 'عالم قرآن',
    skills: [
      'Read ʿUthmānic rasm script without diacritics or vowel markers',
      'Explain the orthographic conventions unique to the muṣḥaf',
    ],
  },
  '2.1.2.2': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Read unvoweled Qurʾānic text at a fluent pace (100+ words/min) without hesitation',
      'Demonstrate accurate pronunciation without reliance on diacritical marks',
    ],
  },
  '2.1.2.3': {
    agent: 'Qurʾān Scholar', agentAr: 'عالم قرآن',
    skills: [
      'Define 50+ archaic and hapax legomena words occurring in the Qurʾān with their root derivations',
      'Explain the contextual meaning of rare Qurʾānic vocabulary',
    ],
  },
  '2.1.2.4': {
    agent: 'Qurʾān Scholar', agentAr: 'عالم قرآن',
    skills: [
      'Navigate the Qurʾān by sūra, āyah number, juzʾ, and ḥizb using thematic indexing',
      'Locate verses by thematic keyword within 30 seconds',
    ],
  },
  '2.1.2.5': {
    agent: 'Qāriʾ', agentAr: 'قارئ',
    skills: [
      'Memorize and recite at least 5 juzʾ (out of 30) with correct tajwīd',
      'Recite from memory with accurate waqf and ibtidāʾ',
    ],
  },
  '2.1.3.1': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Identify asbāb al-nuzūl (occasions of revelation) for 30+ major Qurʾānic verses',
      'Explain how asbāb al-nuzūl inform tafsīr interpretation',
    ],
  },
  '2.1.3.2': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Identify instances of naskh (abrogation) in the Qurʾān and classify them as nāsikh or mansūkh',
      'Explain the scholarly debates surrounding abrogation in the Qurʾān',
    ],
  },
  '2.1.3.3': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Classify sūras as Makkī or Madanī and identify the distinguishing features of each category',
      'Explain how Makkī/Madanī classification affects tafsīr methodology',
    ],
  },
  '2.1.3.4': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Distinguish muḥkam (clear) from mutashābih (ambiguous) Qurʾānic verses',
      'Explain the interpretive principles for handling mutashābihāt',
    ],
  },
  '2.1.3.5': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Identify and interpret the 29 sūras containing ḥurūf muqaṭṭaʿāt (disjointed letters)',
      'Explain the major scholarly theories on the meaning of the disjointed letters',
    ],
  },
  '2.1.3.6': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Identify linguistic, scientific, and legislative dimensions of iʿjāz al-Qurʾān',
      'Construct an argument for Qurʾānic inimitability using specific textual examples',
    ],
  },
  '2.2.1.1': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Compare tafsīr of a given verse from al-Ṭabarī and Ibn Kathīr with analytical commentary',
      'Identify the isnād chains and methodological principles used in tafsīr bi-al-maʾthūr',
    ],
  },
  '2.2.1.2': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Compare tafsīr of a given verse from al-Zamakhsharī and al-Rāzī with attention to theological differences',
      'Identify the rational and linguistic methods distinguishing tafsīr bi-al-raʾy',
    ],
  },
  '2.2.2.1': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Produce a thematic (mawḍūʿī) tafsīr of a selected Qurʾānic concept across multiple sūras',
      'Demonstrate the methodology of collecting and synthesizing verses by theme',
    ],
  },
  '2.2.2.2': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Apply maqāṣid-oriented tafsīr to contemporary socio-legal questions',
      'Identify the objectives of Sharīʿa in Qurʾānic legislation',
    ],
  },
  '2.2.2.3': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Identify verses addressed in scientific (ʿilmī) tafsīr and evaluate the methodological validity',
      'Critique claims of scientific foreshadowing in the Qurʾān using scholarly criteria',
    ],
  },
  '2.2.2.4': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Apply feminist hermeneutical approaches to Qurʾānic interpretation',
      'Compare traditional and feminist tafsīr of selected verses',
    ],
  },
  '2.2.3': {
    agent: 'Mufassir', agentAr: 'مفسر',
    skills: [
      'Produce a comparative tafsīr analysis spanning at least 3 classical and 2 contemporary sources',
      'Apply exegetical findings to a contemporary fatwā or daʿwa context',
    ],
  },
  '2.3.1.1': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Describe pre-Islamic Arabian social, religious, and economic structures',
      'Explain the significance of the Jāhiliyya context for understanding early Islam',
    ],
  },
  '2.3.1.2': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Construct a chronological timeline of the Makkan period (610–622 CE) with key events and individuals',
      'Explain the primary challenges faced by the early Muslim community in Makka',
    ],
  },
  '2.3.1.3': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Construct a chronological timeline of the Madīnan period (622–632 CE) with key events, treaties, and expeditions',
      'Explain the establishment of the first Islamic polity and its governance model',
    ],
  },
  '2.3.1.4': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Identify the major ghazawāt (expeditions) and their historical significance, including Badr, Uḥud, and Khandaq',
      'Explain the terms and consequences of key treaties including Ḥudaybiyya',
    ],
  },
  '2.3.1.5': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Describe the Prophet\'s character traits, household structure, and key Companions',
      'Explain the significance of the prophetic example (uswa ḥasana) in Islamic thought',
    ],
  },
  '2.3.1.6': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Critically compare Sīra accounts from Ibn Hishām, al-Ṭabarī, and Ibn Saʿd',
      'Evaluate the isnād methodology used in early Sīra sources',
    ],
  },
  '2.3.2': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Identify the major prophetic narratives (Qiṣaṣ al-Anbiyāʾ) and their Qurʾānic sources',
      'Compare Qurʾānic prophetic accounts with Biblical parallels',
    ],
  },
  '2.3.3.1': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Construct a timeline of the Rāshidūn Caliphate (632–661) with major events and administrative developments',
      'Evaluate the historical debates surrounding succession and the first fitna',
    ],
  },
  '2.3.3.2': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Describe the Umayyad Caliphate\'s administrative structure, military expansion, and cultural achievements',
      'Evaluate the causes and consequences of the Umayyad dynasty\'s fall',
    ],
  },
  '2.3.3.3': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Describe the ʿAbbāsid Caliphate\'s Golden Age — Bayt al-Ḥikma, translation movement, administrative innovations',
      'Explain the factors leading to ʿAbbāsid decline and fragmentation',
    ],
  },
  '2.3.3.4': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Describe the history of al-Andalus (711–1492) — conquest, Umayyad emirate, taifa kingdoms, Nasrids',
      'Evaluate the cultural and intellectual legacy of Islamic Spain',
    ],
  },
  '2.3.3.5': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Describe the Mamlūk Sultanate (1250–1517) — political structure, military system, cultural patronage',
      'Explain the Mamlūk role in repelling Mongol invasions and Crusader presence',
    ],
  },
  '2.3.3.6': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Describe Ottoman administrative structures in Arab provinces (1517–1918)',
      'Evaluate the impact of Ottoman rule on Arab society, culture, and religious institutions',
    ],
  },
  '2.3.4': {
    agent: 'Islamic Historian', agentAr: 'مؤرخ إسلامي',
    skills: [
      'Evaluate isnād methodology in early Islamic historiography',
      'Compare the historical methods of major Muslim historians including al-Ṭabarī, al-Masʿūdī, and Ibn Khaldūn',
      'Engage with modern historiographical debates on early Islamic history',
    ],
  },
  '2.4.1': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Classify ḥadīth as ṣaḥīḥ, ḥasan, ḍaʿīf, or mawḍūʿ using muṣṭalaḥ criteria',
      'Produce a justified classification for any given ḥadīth with chain and text',
    ],
  },
  '2.4.2': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Evaluate transmitter reliability using jarḥ wa-taʿdīl terminology and categories',
      'Verify the status of specific narrators in the hadith transmitter biography literature',
    ],
  },
  '2.4.3': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Construct transmitter chains using ʿilm al-rijāl biographical sources',
      'Identify key figures in isnād networks across early Islamic history',
    ],
  },
  '2.4.4': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Describe the contents, organization, and significance of the six canonical ḥadīth collections (kutub sitta)',
      'Compare the methodology of al-Bukhārī and Muslim in their Ṣaḥīḥ collections',
    ],
  },
  '2.4.5': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Identify ʿāli (elevated) vs. nāzil (low) chains and their significance in hadith criticism',
      'Trace asānīd chains from later collections back to Companions',
    ],
  },
  '2.4.6': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Explain gharīb (unusual) vocabulary occurring in ḥadīth texts',
      'Use specialized lexicons like al-Nihāya fī Gharīb al-Ḥadīth to resolve obscure terms',
    ],
  },
  '2.4.7': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Reconcile apparently contradictory ḥadīth using mukhtalif al-ḥadīth methodology',
      'Apply jamʿ (reconciliation) and tarjīḥ (preference) principles',
    ],
  },
  '2.4.8': {
    agent: 'Muḥaddith', agentAr: 'محدث',
    skills: [
      'Analyze a passage from Fatḥ al-Bārī (Ibn Ḥajar) or a major hadith commentary',
      'Explain the commentary\'s methodology in relation to the original collection',
    ],
  },
  '2.5.1.1': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Differentiate the four primary sources of Islamic law: Qurʾān, Sunna, Ijmāʿ, and Qiyās',
      'Apply each source type in constructing a basic legal ruling',
    ],
  },
  '2.5.1.2': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Define and apply secondary legal sources: istiḥsān, maṣāliḥ mursala, ʿurf, sadd al-dharāʾiʿ',
      'Identify which secondary sources are accepted by each madhhab',
    ],
  },
  '2.5.1.3': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Distinguish ijtihād from taqlīd and describe the conditions for absolute and limited ijtihād',
      'Identify contemporary debates on the closure of ijtihād and neo-ijtihād movements',
    ],
  },
  '2.5.1.4': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Define and apply the five essential maqāṣid (objectives): dīn, nafs, ʿaql, nasl, māl',
      'Use maqāṣid analysis to evaluate contemporary legal rulings',
    ],
  },
  '2.5.2.1': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Describe the Ḥanafī school\'s methodology, key figures (Abū Ḥanīfa, Abū Yūsuf, al-Shaybānī), and distinctive principles',
      'Apply Ḥanafī rulings to selected fiqh questions',
    ],
  },
  '2.5.2.2': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Describe the Mālikī school\'s methodology, key figures (Mālik, Ibn al-Qāsim), and reliance on ʿamal ahl al-Madīna',
      'Apply Mālikī rulings to selected fiqh questions',
    ],
  },
  '2.5.2.3': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Describe the Shāfiʿī school\'s methodology, key figures (al-Shāfiʿī, al-Muzanī), and the uṣūl system',
      'Apply Shāfiʿī rulings to selected fiqh questions',
    ],
  },
  '2.5.2.4': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Describe the Ḥanbalī school\'s methodology, key figures (Aḥmad ibn Ḥanbal, Ibn Taymiyya), and textualist approach',
      'Apply Ḥanbalī rulings to selected fiqh questions',
    ],
  },
  '2.5.2.5': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Describe the Jaʿfarī (Shīʿī) school\'s methodology, key figures (Imams), and distinctive principles including ʿaql and ʿadl',
      'Apply Jaʿfarī rulings to selected fiqh questions',
    ],
  },
  '2.5.2.6': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Describe the Ibāḍī school\'s methodology and distinctive principles',
      'Apply Ibāḍī rulings to selected fiqh questions and compare with sunnī madhāhib',
    ],
  },
  '2.5.3': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Compare rulings across at least 3 madhāhib on the same fiqh question',
      'Analyze the methodological differences producing divergent rulings',
    ],
  },
  '2.5.4': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Apply fiqh al-aqalliyyāt principles to Muslim minority contexts in non-Muslim countries',
      'Identify contemporary fatwās addressing minority community challenges',
    ],
  },
  '2.5.5': {
    agent: 'Faqīh', agentAr: 'فقيه',
    skills: [
      'Define and apply 20+ major qawāʿid fiqhiyya (legal maxims) to novel cases',
      'Trace the textual sources and scholarly development of the legal maxims',
    ],
  },
  '2.5.6': {
    agent: 'Muftī', agentAr: 'مفتي',
    skills: [
      'Construct a fatwā following correct methodology: identifying the issue, evidence, and ruling classification',
      'Apply contemporary fatwā methodology using classical uṣūl with attention to changing contexts',
    ],
  },
  '2.5.7': {
    agent: 'Legal Formulist', agentAr: 'موثق',
    skills: [
      'Draft a notarial document (wathīqa/shurṭa) following classical Islamic legal formulary',
      'Identify the structural components and legal function of each section in a wathāʾiq document',
    ],
  },
  '2.6': {
    agent: 'Mutakallim', agentAr: 'متكلم',
    skills: [
      'Describe the positions of Ashʿarī, Māturīdī, Muʿtazilī, Salafī, and Shīʿī schools on key theological questions',
      'Analyze classical debates on qadar (predestination), khalq al-Qurʾān, and ṣifāt Allāh',
      'Construct a comparative theological analysis of a selected doctrine across schools',
    ],
  },
  '2.7': {
    agent: 'Ṣūfī', agentAr: 'صوفي',
    skills: [
      'Describe the major Sufi orders (ṭuruq) and their chains of transmission (silsila)',
      'Analyze the works of al-Ghazālī, Ibn ʿArabī, and Junayd al-Baghdādī with critical commentary',
      'Evaluate the relationship between Sufi metaphysics and Islamic orthodoxy',
    ],
  },
  '2.8': {
    agent: 'Faylasūf', agentAr: 'فيلسوف',
    skills: [
      'Describe the Mashshāʾī (Peripatetic) and Ishrāqī (Illuminationist) schools of Arabic philosophy',
      'Analyze the works of al-Kindī, al-Fārābī, Ibn Sīnā, and Ibn Rushd with critical commentary',
      'Engage with contemporary Arab philosophical debates on modernity, identity, and political thought',
    ],
  },

  /* ===== Branch 3: Lexicography ===== */
  '3.1': {
    agent: 'Lexicographer', agentAr: 'معجمي',
    skills: [
      'Navigate and extract definitions from classical dictionaries (Lisān al-ʿArab, Tāj al-ʿArūs) with proficiency',
      'Use modern dictionaries (al-Munjid, al-Wasīṭ) and specialized lexicons for specific domains',
      'Compare entries across multiple dictionaries to identify definitional evolution',
    ],
  },
  '3.2.1': {
    agent: 'Etymologist', agentAr: 'عالم اشتقاق',
    skills: [
      'Analyze triliteral, quadriliteral, and khamsī root patterns with correct identification',
      'Extract root patterns from any given Arabic word with 95%+ accuracy',
    ],
  },
  '3.2.2': {
    agent: 'Etymologist', agentAr: 'عالم اشتقاق',
    skills: [
      'Identify and apply al-ishtiqāq al-ṣaghīr — derivational morphology from a common root',
      'Generate derived forms from a given triliteral root and explain meaning shifts',
    ],
  },
  '3.2.3': {
    agent: 'Etymologist', agentAr: 'عالم اشتقاق',
    skills: [
      'Identify permutational derivation (al-ishtiqāq al-kabīr / al-qalb) across related roots',
      'Explain semantic relationships between permutation root pairs',
    ],
  },
  '3.2.4': {
    agent: 'Etymologist', agentAr: 'عالم اشتقاق',
    skills: [
      'Analyze semantic field derivation (al-ishtiqāq al-akbar) across root families',
      'Map semantic field relationships between historically related roots',
    ],
  },
  '3.2.5': {
    agent: 'Etymologist', agentAr: 'عالم اشتقاق',
    skills: [
      'Identify loanword origins and Arabization patterns (taʿrīb) in Arabic vocabulary',
      'Trace the source language and historical pathway of borrowed terms',
    ],
  },
  '3.2.6': {
    agent: 'Etymologist', agentAr: 'عالم اشتقاق',
    skills: [
      'Analyze semantic drift in Arabic words across historical periods',
      'Identify historical layering of meaning for selected lexical items using diachronic evidence',
    ],
  },
  '3.3': {
    agent: 'Semanticist', agentAr: 'عالم دلالات',
    skills: [
      'Discriminate between near-synonyms in Arabic (furūq lughawiyya) with precision',
      'Identify polysemy, homonymy, and aḍdād (words with opposite meanings) in Arabic lexicon',
      'Analyze connotative fields for a given semantic domain',
    ],
  },
  '3.4': {
    agent: 'Lexicographer', agentAr: 'معجمي',
    skills: [
      'Compare classical Arabic ordering systems — phonological (al-Khalīl), alphabetical (al-Jawharī), root-based',
      'Design a corpus-based digital lexicon entry with frequency data and collocations',
    ],
  },
  '3.5': {
    agent: 'Corpus Linguist', agentAr: 'لغوي متون',
    skills: [
      'Design and construct a representative Arabic corpus with balanced genre coverage',
      'Perform frequency analysis, concordance extraction, and collocation analysis using corpus tools',
    ],
  },

  /* ===== Branch 4: Cultural & Religious Literacy ===== */
  '4.1': {
    agent: 'Cultural Anthropologist', agentAr: 'عالم أنثروبولوجيا ثقافية',
    skills: [
      'Describe the practices, timing, and cultural significance of Ramadan, Eid al-Fiṭr, and Eid al-Aḍḥā',
      'Explain regional variations in observing Mawlid, ʿĀshūrāʾ, sacred nights, and ʿUmra',
    ],
  },
  '4.2': {
    agent: 'Cultural Anthropologist', agentAr: 'عالم أنثروبولوجيا ثقافية',
    skills: [
      'Describe Coptic, Eastern, and Western Christmas observances in Arab contexts',
      'Explain Easter traditions and other Christian feasts as practiced in the Arab world',
    ],
  },
  '4.3': {
    agent: 'Cultural Anthropologist', agentAr: 'عالم أنثروبولوجيا ثقافية',
    skills: [
      'Navigate official holiday calendars across Arab countries for practical planning',
      'Describe holiday social etiquette, media schedules, retail culture, and diaspora adaptation patterns',
    ],
  },
  '4.4': {
    agent: 'Cultural Anthropologist', agentAr: 'عالم أنثروبولوجيا ثقافية',
    skills: [
      'Describe national day celebrations, folk music/dance traditions, and traditional dress from 5+ Arab countries',
      'Explain lifecycle rituals (birth, marriage, death) and hospitality codes across Arab regions',
    ],
  },
  '4.5.9.1': {
    agent: 'Cultural Historian', agentAr: 'مؤرخ ثقافي',
    skills: [
      'Read and analyze Judeo-Arabic texts in Hebrew script with comprehension',
      'Explain the historical development of Judeo-Arabic literature across genres',
    ],
  },
  '4.5.9.2': {
    agent: 'Cultural Historian', agentAr: 'مؤرخ ثقافي',
    skills: [
      'Navigate Cairo Geniza materials and explain their significance for Jewish and Islamic history',
      'Analyze Geniza documents for linguistic, economic, and social historical evidence',
    ],
  },
  '4.5.9.3': {
    agent: 'Cultural Historian', agentAr: 'مؤرخ ثقافي',
    skills: [
      'Describe the history and culture of Jewish communities in Arab lands (Mizraḥī heritage)',
      'Explain the impact of 20th-century political events on Arab Jewish communities',
    ],
  },
  '4.5.9.4': {
    agent: 'Cultural Historian', agentAr: 'مؤرخ ثقافي',
    skills: [
      'Analyze Arab-Jewish literature and memory narratives in post-1948 contexts',
      'Identify themes of nostalgia, loss, and identity in Arab-Jewish cultural production',
    ],
  },
  '4.6': {
    agent: 'Cultural Anthropologist', agentAr: 'عالم أنثروبولوجيا ثقافية',
    skills: [
      'Demonstrate culturally appropriate hospitality behaviour (istiqbāl, qahwa, taʿām) in Arab settings',
      'Identify honor and shame codes, gift-giving expectations, and tribal ʿurf conventions',
      'Navigate gender norms in professional and social interactions across Arab contexts',
    ],
  },
  '4.5.*': {
    agent: 'Cultural Anthropologist', agentAr: 'عالم أنثروبولوجيا ثقافية',
    skills: [
      'Describe the religious practices and cultural traditions of Druze, ʿAlawī, Ismāʿīlī, Yazīdī, Mandaean, and Bahāʾī communities',
      'Explain the interfaith dynamics and minority rights issues in contemporary Arab societies',
    ],
  },

  /* ===== Branch 5: Aesthetics & Visual Arts ===== */
  '5.1.1': {
    agent: 'Art Historian', agentAr: 'مؤرخ فني',
    skills: [
      'Identify geometric pattern families, arabesque motifs, and manuscript illumination styles across Islamic periods',
      'Describe traditional woodwork, ceramic, and metalwork techniques with regional attribution',
    ],
  },
  '5.1.2': {
    agent: 'Artist', agentAr: 'فنان',
    skills: [
      'Identify major contemporary Arab artists, movements, and galleries across painting, sculpture, and digital art',
      'Analyze themes of identity, politics, and heritage in contemporary Arab visual art',
    ],
  },
  '5.2.1': {
    agent: 'Graphic Designer', agentAr: 'مصمم جرافيك',
    skills: [
      'Design Arabic typography layouts, branding systems, and RTL UI/UX interfaces with correct script treatment',
      'Apply Arabic design principles to bilingual (AR/EN) communication materials',
    ],
  },
  '5.2.2': {
    agent: 'Spatial Designer', agentAr: 'مصمم مكاني',
    skills: [
      'Identify Arabic architectural elements (muqarnas, mashrabiyya, iwan) and their spatial function',
      'Design spaces incorporating Arab design identity principles for modern interiors, gardens, and exhibitions',
    ],
  },
  '5.2.3': {
    agent: 'Design Strategist', agentAr: 'مخطط تصميم',
    skills: [
      'Articulate an Arab design identity framework balancing heritage preservation with contemporary aesthetics',
      'Analyze fashion design as an expression of Arab cultural identity',
    ],
  },
  '5.3.1': {
    agent: 'Calligrapher', agentAr: 'خطاط',
    skills: [
      'Write legibly in at least 3 of the 10 major calligraphic scripts (Kūfī, Naskh, Thuluth, Ruqʿa, Dīwānī, Maghribī, Nastaʿlīq, Muḥaqqaq, Siyāqāt, Contemporary)',
      'Identify script families and their historical development with examples from manuscripts',
    ],
  },
  '5.3.2.1': {
    agent: 'Calligrapher', agentAr: 'خطاط',
    skills: [
      'Apply full vocalization (fatḥa, ḍamma, kasra, sukūn, shadda) correctly to any Arabic text',
      'Produce correctly vocalized calligraphic compositions',
    ],
  },
  '5.3.2.2': {
    agent: 'Calligrapher', agentAr: 'خطاط',
    skills: [
      'Apply orthographic diacritics (hamzāt, madda, waṣla) correctly across word positions',
      'Resolve hamza spelling in initial, medial, and final positions according to rule',
    ],
  },
  '5.3.2.3': {
    agent: 'Calligrapher', agentAr: 'خطاط',
    skills: [
      'Compare tashkīl conventions in Qurʾānic muṣḥafs vs. non-Qurʾānic manuscripts and print',
      'Explain the functional and aesthetic differences between Qurʾānic and literary tashkīl',
    ],
  },
  '5.3.2.4': {
    agent: 'Computational Linguist', agentAr: 'لغوي حاسوبي',
    skills: [
      'Evaluate automatic Arabic diacritization systems (Mishkāl, Farasa, Shakkala) for accuracy',
      'Apply diacritization tools to raw Arabic text and assess output quality',
    ],
  },
  '5.3.2.5': {
    agent: 'Calligrapher', agentAr: 'خطاط',
    skills: [
      'Incorporate tashkīl as ornamental elements in calligraphic compositions',
      'Design decorative tashkīl patterns integrated with letterforms',
    ],
  },
  '5.3.3': {
    agent: 'Calligrapher', agentAr: 'خطاط',
    skills: [
      'Describe the contributions of Ibn Muqla, Ibn al-Bawwāb, and Yāqūt al-Mustaʿṣimī to Arabic calligraphy',
      'Produce a calligraphic piece following the ijāza (master certification) tradition',
      'Use digital calligraphy tools while maintaining traditional script proportions',
    ],
  },
  '5.4.1': {
    agent: 'Musician', agentAr: 'موسيقي',
    skills: [
      'Identify and demonstrate 10+ maqāmāt with their scale structure, quarter-tones, and emotional character',
      'Apply iqāʿ (rhythmic cycles) in performance of Arabic classical forms',
    ],
  },
  '5.4.2': {
    agent: 'Musician', agentAr: 'موسيقي',
    skills: [
      'Perform or analyze a classical qaṣīda, dawr, and muwashshaḥ with attention to form and ornamentation',
      'Identify the structural characteristics of each classical vocal form',
    ],
  },
  '5.4.3': {
    agent: 'Musician', agentAr: 'موسيقي',
    skills: [
      'Demonstrate basic proficiency on 2+ traditional Arab instruments (ʿūd, qānūn, nāy, riqq)',
      'Identify instrument families and their roles in the takht ensemble',
    ],
  },
  '5.4.4': {
    agent: 'Film Scholar', agentAr: 'عالم سينما',
    skills: [
      'Identify major works and directors of Egyptian cinema\'s golden age',
      'Analyze themes in films by Yūsuf Shāhīn and the Palestinian cinema movement',
    ],
  },
  '5.4.5': {
    agent: 'Theatre Scholar', agentAr: 'عالم مسرح',
    skills: [
      'Identify the founders of modern Arab theatre (Ṣanūʿ, al-Naqqāsh, Wannūs) and their key works',
      'Analyze the development of Arab theatrical forms and their political engagement',
    ],
  },
  '5.4.6': {
    agent: 'Media Scholar', agentAr: 'عالم إعلام',
    skills: [
      'Analyze the musalsal (Ramadan television drama) as a cultural phenomenon',
      'Identify major serials, production trends, and the social impact of Arab television drama',
    ],
  },
  '5.4.7': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Demonstrate or analyze dabke, tanoura, raṣf, and ʿarda with regional identification',
      'Explain the cultural function of folk dance in Arab social celebrations',
    ],
  },

  /* ===== Branch 6: Historical Context ===== */
  '6.1': {
    agent: 'Historian', agentAr: 'مؤرخ',
    skills: [
      'Describe pre-Islamic Arabian kingdoms (Sabaʾ, Ḥimyar, Nabataea, Palmyra) with chronological accuracy',
      'Read and interpret pre-Islamic epigraphic inscriptions (South Arabian, Safaitic, Thamudic)',
      'Analyze pre-Islamic poetry as a historical source for Arabian society',
    ],
  },
  '6.2': {
    agent: 'Historian', agentAr: 'مؤرخ',
    skills: [
      'Construct a timeline of the early Islamic conquests (622–750) with key battles and territorial gains',
      'Explain the administrative and social structures established during the early conquest period',
    ],
  },
  '6.3': {
    agent: 'Historian', agentAr: 'مؤرخ',
    skills: [
      'Describe the Bayt al-Ḥikma (House of Wisdom) and the translation movement\'s impact on world knowledge',
      'Explain how Arabic became the global scientific language during the Golden Age (750–1258)',
    ],
  },
  '6.4': {
    agent: 'Historian', agentAr: 'مؤرخ',
    skills: [
      'Describe Ottoman administrative structures in Arab provinces and their evolution over 400 years',
      'Identify key figures and intellectual developments of the Nahḍa (Arab Renaissance, late 19th–early 20th c.)',
    ],
  },
  '6.5': {
    agent: 'Historian', agentAr: 'مؤرخ',
    skills: [
      'Explain the European mandate system and its impact on modern Arab state boundaries',
      'Analyze the rise of Arab nationalism, independence movements, and the Arab-Israeli conflict',
      'Evaluate the causes and consequences of the Arab Spring and Gulf state development',
    ],
  },
  '6.6': {
    agent: 'Political Scientist', agentAr: 'عالم سياسة',
    skills: [
      'Describe the structure and function of the Arab League and other pan-Arab institutions',
      'Analyze the tension between pan-Arab identity and nation-state sovereignty in the modern era',
    ],
  },
  '6.7': {
    agent: 'Sociologist', agentAr: 'عالم اجتماع',
    skills: [
      'Describe demographic structures, urbanization patterns, and youth bulges across Arab societies',
      'Analyze contemporary social movements, inequality, and civil society in the Arab world',
    ],
  },
  '6.8': {
    agent: 'Sociologist', agentAr: 'عالم اجتماع',
    skills: [
      'Analyze the Mahjar (Arab diaspora) literary and cultural contributions in the Americas',
      'Explain labour migration patterns from the Arab world to the Gulf, Europe, and beyond',
      'Describe the impact of forced displacement on Palestinian, Syrian, and other refugee communities',
      'Analyze diaspora identity formation and transnational cultural production',
    ],
  },

  /* ===== Branch 7: Esoteric Sciences ===== */
  '7.1.1': {
    agent: 'Esoteric Scholar', agentAr: 'عالم أسرار',
    skills: [
      'Apply the abjad al-ṣaghīr and abjad al-kabīr letter-number assignment systems to Arabic text',
      'Convert between letters and numerical values in esoteric calculations',
    ],
  },
  '7.1.2': {
    agent: 'Esoteric Scholar', agentAr: 'عالم أسرار',
    skills: [
      'Classify Arabic letters as nūrānī (light) or ẓalmānī (dark) following traditional taqsīmāt',
      'Explain the metaphysical significance of letter classification in ḥurūfī cosmology',
    ],
  },
  '7.1.3': {
    agent: 'Esoteric Scholar', agentAr: 'عالم أسرار',
    skills: [
      'Apply taṣrīf al-ḥurūf (letter combination) techniques for esoteric purposes',
      'Generate and interpret combinatorial letter matrices',
    ],
  },
  '7.1.4': {
    agent: 'Esoteric Scholar', agentAr: 'عالم أسرار',
    skills: [
      'Explain the esoteric significance of the ḥurūf muqaṭṭaʿāt in Sufi and ḥurūfī traditions',
      'Apply aḥkām al-ḥurūf rulings derived from the disjointed letters',
    ],
  },
  '7.1.5': {
    agent: 'Ṣūfī Scholar', agentAr: 'عالم صوفي',
    skills: [
      'Explain Ibn ʿArabī\'s theory of the creative letter (al-amr al-takwīnī) and the ʿālam al-ḥurūf',
      'Analyze the al-Būnī school\'s approach to letter mysticism and its sources',
    ],
  },
  '7.2.1': {
    agent: 'Esoteric Scholar', agentAr: 'عالم أسرار',
    skills: [
      'Construct and interpret chronograms (taʾrīkh / tawqīt) for historical dates',
      'Apply abjad arithmetic to extract dates from poetic lines and inscriptions',
    ],
  },
  '7.2.2': {
    agent: 'Esoteric Scholar', agentAr: 'عالم أسرار',
    skills: [
      'Identify sacred numbers in Islamic tradition and their numerological interpretations',
      'Explain the significance of numbers like 19, 40, 1000 in Qurʾānic and Sufi contexts',
    ],
  },
  '7.2.3': {
    agent: 'Esoteric Scholar', agentAr: 'عالم أسرار',
    skills: [
      'Construct and interpret al-zāʾira (divinatory number-wheels) following traditional methods',
      'Explain the mathematical principles underlying zāʾira construction',
    ],
  },
  '7.2.4': {
    agent: 'Esoteric Practitioner', agentAr: 'ممارس',
    skills: [
      'Construct a number-based taʿwīdh (amulet) following traditional methods and ethical considerations',
      'Identify the numerical sequences and their symbolic meanings in amulet design',
    ],
  },
  '7.2.5': {
    agent: 'Shīʿī Esoteric Scholar', agentAr: 'عالم أسرار شيعي',
    skills: [
      'Explain the principles of Jafr (Shīʿī esoteric numerology and divination)',
      'Analyze Jafr texts and their interpretive methodology for predicting future events',
    ],
  },
  '7.2.6': {
    agent: 'Historian of Science', agentAr: 'مؤرخ علم',
    skills: [
      'Identify the historical connections between ʿilm al-ḥisāb (arithmetic), al-jabr (algebra), and esoteric numerology',
      'Explain how esoteric number theory influenced the development of Arabic mathematics',
    ],
  },

  /* ===== Branch 8: Core Linguistic Sciences ===== */
  '8.1.1': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Classify any Arabic word as ism (noun), fiʿl (verb), or ḥarf (particle) with justification',
      'Identify sentence types (ismiyya vs. fiʿliyya) and analyze their structure',
    ],
  },
  '8.1.2': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Apply iʿrāb (case endings) to any Arabic word: marfūʿ, manṣūb, majrūr, majzūm',
      'Produce full iʿrāb diagrams for complex sentences',
    ],
  },
  '8.1.3': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Explain the ʿāmil (governor) theory — both lafẓī (explicit) and maʿnawī (implied) governors',
      'Identify the ʿāmil governing each iʿrāb ending in a given sentence',
    ],
  },
  '8.1.4': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Analyze nominal sentence structure (mubtadaʾ + khabar) with correct iʿrāb',
      'Identify varieties of khabar (mufrad, jumlah, shibh jumlah) and their iʿrāb',
    ],
  },
  '8.1.5': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Identify al-fāʿil (subject) and al-nāʾib ʿan al-fāʿil (proxy subject) with iʿrāb',
      'Analyze verb agreement with subjects in terms of gender and number',
    ],
  },
  '8.1.6': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Identify and differentiate the five types of mafʿūl (object) in Arabic syntax',
      'Construct sentences correctly employing each mafʿūl type',
    ],
  },
  '8.1.7': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Identify and analyze ḥāl (circumstantial accusative), tamyīz (specification), and istithnāʾ (exception)',
      'Construct sentences with correct iʿrāb for each category',
    ],
  },
  '8.1.8': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Analyze conditional sentence structure (sharṭ + jawāb) with correct jussive application',
      'Identify tools of condition (in, idhā, law) and their grammatical effects',
    ],
  },
  '8.1.9': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Apply tawābiʿ (naʿt, tawkīd, badal, ʿaṭf) with correct agreement',
      'Analyse complex sentences containing multiple tawābiʿ structures',
    ],
  },
  '8.1.10': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Analyze the maṣdar (verbal noun) and its operation (ʿamal) on objects and complements',
      'Differentiate maṣdar from other derived noun forms',
    ],
  },
  '8.1.11': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Analyze ism al-fāʿil (active participle) and ism al-mafʿūl (passive participle) syntax',
      'Apply participle structures in reading complex Arabic texts',
    ],
  },
  '8.1.12': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Compare Baṣran, Kūfan, Andalusī, and Baghdādī grammatical school approaches to a contested grammatical issue',
      'Identify the school affiliation of specific grammatical analyses',
    ],
  },
  '8.1.13': {
    agent: 'Grammarian', agentAr: 'نحوي',
    skills: [
      'Teach foundational Arabic grammar using al-Ajurrūmiyya or Alfiyya Ibn Mālik as primary texts',
      'Explain the pedagogical structure and memorization methodology of classical grammar texts',
    ],
  },
  '8.1.14': {
    agent: 'Theoretical Linguist', agentAr: 'لغوي نظري',
    skills: [
      'Apply X-bar theory, Minimalist Program, or LFG frameworks to Arabic syntactic structures',
      'Compare modern linguistic approaches with classical Arabic grammatical theory',
    ],
  },
  '8.2.1': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Analyze any Arabic word into its root (jadhr) and pattern (wazn)',
      'Identify root consonants and distinguish them from affixes',
    ],
  },
  '8.2.2': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Conjugate all Forms I–XV for any given triliteral root',
      'Explain the semantic augmentation associated with each verbal form',
    ],
  },
  '8.2.3': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Conjugate weak-root verbs (mithāl, ajwaf, nāqiṣ, lafīf) across all paradigms',
      'Identify and apply the phonological rules governing weak-root conjugations',
    ],
  },
  '8.2.4': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Conjugate muḍāʿaf (geminate/doubled) verbs correctly across all paradigms',
      'Identify the phonological environments triggering geminate reduction or retention',
    ],
  },
  '8.2.5': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Classify verbs as ṣaḥīḥ (sound) or muʿtall (weak) with subclass identification',
      'Apply the correct paradigm for each verb classification',
    ],
  },
  '8.2.6': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Generate maṣdar (verbal noun) forms for any given verb pattern',
      'Identify the semantic relationship between verb patterns and their maṣādir',
    ],
  },
  '8.2.7': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Differentiate derived nouns (ism fāʿil, ism mafʿūl, ism zamān, ism makān, ism āla)',
      'Derive each derived noun type from any given verbal root',
    ],
  },
  '8.2.8': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Apply broken plural patterns to singular nouns with pattern prediction',
      'Generate sound masculine and feminine plurals with correct suffix application',
    ],
  },
  '8.2.9': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Apply taṣghīr (diminutive) patterns to any Arabic noun',
      'Identify the semantic nuance conveyed by diminutive forms',
    ],
  },
  '8.2.10': {
    agent: 'Morphologist', agentAr: 'صرفي',
    skills: [
      'Construct nisba (relative adjective) forms correctly with phonological adjustments',
      'Apply nisba patterns to toponyms, anthroponyms, and abstract nouns',
    ],
  },
  '8.2.11': {
    agent: 'Computational Morphologist', agentAr: 'صرفي حاسوبي',
    skills: [
      'Describe the architecture of morphological analyzers (Buckwalter, MADAMIRA, Farasa)',
      'Evaluate analyzer outputs and resolve ambiguities using rule-based or statistical methods',
    ],
  },
  '8.3.1.1': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Differentiate khabar (declarative) from inshāʾ (performative) utterances with examples from Arabic texts',
      'Analyze the communicative purpose of khabar and inshāʾ in context',
    ],
  },
  '8.3.1.2': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify the five types of ṭalab (request): amr, nahy, istifhām, tamannī, nidāʾ',
      'Analyze performative utterances for rhetorical effect in Arabic literature and media',
    ],
  },
  '8.3.1.3': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify and construct qaṣr (restriction/emphasis) structures using innamā, mā…illā, and other tools',
      'Analyze the rhetorical effect of qaṣr in text',
    ],
  },
  '8.3.1.4': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Analyze faṣl (juncture) and waṣl (disjuncture) choices in Arabic discourse',
      'Explain how connection or separation between clauses serves rhetorical goals',
    ],
  },
  '8.3.1.5': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify ījāz (brevity) and iṭnāb (prolixity) in Arabic texts with examples',
      'Analyze how a writer\'s choice between brevity and elaboration affects meaning',
    ],
  },
  '8.3.2.1': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify and classify tashbīh (simile) types — muṭlaq, muqayyad, tashbīh balīgh, etc.',
      'Analyze the rhetorical effect of similes in classical Arabic poetry',
    ],
  },
  '8.3.2.2': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify istiʿāra (metaphor) types — taṣrīḥiyya, makniyya, tammiyya, etc.',
      'Analyze the function of metaphor in Arabic literary and religious texts',
    ],
  },
  '8.3.2.3': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify al-majāz al-ʿaqlī (metonymic transfer) and distinguish it from istiʿāra',
      'Analyze metonymic expressions in Arabic discourse',
    ],
  },
  '8.3.2.4': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify kināya (metonymy / allusion) in Arabic texts',
      'Analyze how kināya achieves rhetorical indirection and politeness',
    ],
  },
  '8.3.3.1': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify verbal embellishments (jinās/paronomasia, sajʿ/rhymed prose, tarsīʿ/symmetric phrasing) in Arabic texts',
      'Compose text using basic badīʿ techniques',
    ],
  },
  '8.3.3.2': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Identify semantic embellishments (ṭibāq/antithesis, muqābala/counterbalance, tawriya/double entendre)',
      'Analyze the effect of semantic badīʿ in classical and modern Arabic prose',
    ],
  },
  '8.3.3.3': {
    agent: 'Rhetorician', agentAr: 'بلاغي',
    skills: [
      'Apply balāgha analysis to Qurʾānic iʿjāz with attention to maʿānī, bayān, and badīʿ dimensions',
      'Produce a full rhetorical analysis of selected Qurʾānic verses',
    ],
  },
  '8.4.1': {
    agent: 'Prosodist', agentAr: 'عروضي',
    skills: [
      'Identify and describe all 16 classical meters (buhūr) with their foot patterns',
      'Recite or scan sample lines in each of the 16 meters',
    ],
  },
  '8.4.2': {
    agent: 'Prosodist', agentAr: 'عروضي',
    skills: [
      'Apply ʿarūḍ (first foot of the second hemlstich) and ḍarb (last foot) modification rules',
      'Identify modified feet in classical Arabic poetry',
    ],
  },
  '8.4.3': {
    agent: 'Prosodist', agentAr: 'عروضي',
    skills: [
      'Identify and apply ziḥāf (minor modifications) and ʿilla (major modifications) to meter feet',
      'Explain how modifications affect the metrical pattern without breaking it',
    ],
  },
  '8.4.4': {
    agent: 'Prosodist', agentAr: 'عروضي',
    skills: [
      'Apply al-taqṭīʿ al-ʿarūḍī (scansion) methodology to any line of classical Arabic poetry',
      'Produce full scansion notation with foot boundaries and metrical identification',
    ],
  },
  '8.4.5': {
    agent: 'Prosodist', agentAr: 'عروضي',
    skills: [
      'Analyze qāfiya (rhyme) structure — rawī, taʾsīs, dakhīl, rijdā, etc.',
      'Identify rhyme flaws (ʿuyūb al-qāfiya) in poetic texts',
    ],
  },
  '8.4.6': {
    agent: 'Prosodist', agentAr: 'عروضي',
    skills: [
      'Scan variant meters used in zajal, muwashshaḥ, and free verse',
      'Compare free-verse metrical structures with classical ʿarūḍ norms',
    ],
  },
  '8.4.7': {
    agent: 'Computational Prosodist', agentAr: 'عروضي حاسوبي',
    skills: [
      'Use automatic meter identification tools for classical Arabic poetry',
      'Evaluate the accuracy of computational scansion systems and address common failure modes',
    ],
  },
  '8.5.1': {
    agent: 'Phonetician', agentAr: 'صوتي',
    skills: [
      'Identify and produce all 28/29 Arabic consonants with correct place and manner of articulation',
      'Differentiate pharyngeal (/ʿ/, /ḥ/), uvular (/q/, /gh/, /kh/), and emphatic (/ḍ/, /ṣ/, /ṭ/, /ẓ/) consonants',
    ],
  },
  '8.5.2': {
    agent: 'Phonetician', agentAr: 'صوتي',
    skills: [
      'Identify and produce short vowels (/a/, /u/, /i/), long vowels (/ā/, /ū/, /ī/), and diphthongs (/ay/, /aw/)',
      'Transcribe Arabic words in IPA with correct vowel representation',
    ],
  },
  '8.5.3': {
    agent: 'Phonetician', agentAr: 'صوتي',
    skills: [
      'Analyze Arabic syllable structure (CV, CVV, CVC, CVVC, CVCC) with weight classification',
      'Apply Arabic stress rules to predict stress placement in any word',
    ],
  },
  '8.5.4': {
    agent: 'Phonetician', agentAr: 'صوتي',
    skills: [
      'Identify and analyze emphasis spread (tafkīm / pharyngealization) domains in Arabic words',
      'Predict emphasis spread targets based on segmental and prosodic context',
    ],
  },
  '8.5.5': {
    agent: 'Phonetician', agentAr: 'صوتي',
    skills: [
      'Identify regional phonological variation in Arabic consonant inventories and vowel systems',
      'Describe stylistic variation in Arabic pronunciation (formal vs. casual registers)',
    ],
  },

  /* ===== Branch 9: Arabic Literature ===== */
  '9.1.1': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze 3+ Muʿallaqāt odes with attention to structure, theme, and pre-Islamic values',
      'Describe the contributions of Imruʾ al-Qays and al-Khansāʾ to the Arabic poetic tradition',
    ],
  },
  '9.1.2': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze transitional poetry bridging the Jāhilī and Islamic periods',
      'Identify the thematic and formal shifts in mukhaḍram poetry',
    ],
  },
  '9.1.3': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze naqāʾiḍ (flyting) poetry between Jarīr and al-Farazdaq',
      'Describe the development of Umayyad love poetry (ʿUmar ibn Abī Rabīʿa)',
    ],
  },
  '9.1.4': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze the poetry of al-Mutanabbī with attention to panegyric, wisdom, and linguistic virtuosity',
      'Describe the innovations of Abū Nuwās in khamriyya (wine poetry) and al-Maʿarrī in philosophical verse',
    ],
  },
  '9.1.5': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze Andalusī poetry with attention to its distinctive themes and forms (muwashshaḥ, zajal)',
      'Describe the literary relationship between Ibn Zaydūn and Wallāda',
    ],
  },
  '9.1.6': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze al-Būṣīrī\'s Burda as a masterpiece of devotional poetry',
      'Trace the Burda\'s influence on later praise poetry across the Islamic world',
    ],
  },
  '9.1.7': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze the strophic structure and thematic content of muwashshaḥāt and zajal',
      'Compare the formal constraints of muwashshaḥ with classical qaṣīda',
    ],
  },
  '9.1.8': {
    agent: 'Poetry Scholar', agentAr: 'عالم شعر',
    skills: [
      'Analyze neoclassical poetry (al-Bārūdī, Shawqī, Ḥāfiẓ Ibrāhīm) and its revival of classical forms',
      'Evaluate the neoclassical engagement with Western literary influences',
    ],
  },
  '9.2.1': {
    agent: 'Prose Scholar', agentAr: 'عالم نثر',
    skills: [
      'Analyze khuṭba (oratory) from Quss ibn Sāʿida and ʿAbd al-Ḥamīd al-Kātib',
      'Identify the rhetorical devices employed in classical Arabic oratory',
    ],
  },
  '9.2.2': {
    agent: 'Prose Scholar', agentAr: 'عالم نثر',
    skills: [
      'Analyze the epistolary style of al-Jāḥiẓ and al-Tawḥīdī',
      'Identify the conventions of the Arabic risāla (epistle) genre',
    ],
  },
  '9.2.3': {
    agent: 'Prose Scholar', agentAr: 'عالم نثر',
    skills: [
      'Analyze maqāmāt by al-Hamadhānī and al-Ḥarīrī with attention to rhyme, narrative structure, and social commentary',
      'Identify the linguistic virtuosity characterizing the maqāma genre',
    ],
  },
  '9.2.4': {
    agent: 'Prose Scholar', agentAr: 'عالم نثر',
    skills: [
      'Navigate and analyze adab encyclopedias by al-Jāḥiẓ, Ibn Qutayba, and al-Masʿūdī',
      'Explain the concept of adab as a literary and ethical category',
    ],
  },
  '9.2.5': {
    agent: 'Prose Scholar', agentAr: 'عالم نثر',
    skills: [
      'Analyze travel literature (riḥla) from Ibn Jubayr and Ibn Baṭṭūṭa',
      'Identify the conventions of Arabic travel writing and its value as historical source',
    ],
  },
  '9.2.6': {
    agent: 'Prose Scholar', agentAr: 'عالم نثر',
    skills: [
      'Analyze Usāma ibn Munqidh\'s autobiographical Kitāb al-Iʿtibār',
      'Evaluate autobiography as a source for understanding Crusader-era Arab society',
    ],
  },
  '9.2.7': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Analyze popular epic cycles (Sīrat ʿAntar, Sīrat Banī Hilāl) for structure and themes',
      'Explain the oral performance tradition of popular epics and their social function',
    ],
  },
  '9.2.8': {
    agent: 'Literary Scholar', agentAr: 'عالم أدبي',
    skills: [
      'Analyze narrative frames, story cycles, and themes in Alf Layla wa-Layla (1001 Nights)',
      'Trace the textual history and translation legacy of the 1001 Nights',
    ],
  },
  '9.3.1': {
    agent: 'Literary Historian', agentAr: 'مؤرخ أدبي',
    skills: [
      'Analyze the works of al-Ṭahṭāwī, al-Bustānī, and al-Manfalūṭī as Nahḍa pioneers',
      'Identify the intellectual trends of the Nahḍa (Arab Renaissance) and their literary expression',
    ],
  },
  '9.3.2': {
    agent: 'Diaspora Literature Scholar', agentAr: 'عالم أدب مهجري',
    skills: [
      'Analyze the works of Jubrān Khalīl Jubrān, Mīkhāʾīl Nuʿayma, and Ilyā Abū Māḍī',
      'Identify the themes of exile, identity, and cultural fusion in Mahjar literature',
    ],
  },
  '9.3.3.1': {
    agent: 'Poetry Critic', agentAr: 'ناقد شعري',
    skills: [
      'Analyze Romantic Arabic poetry (Muṭrān, Ṭāhā, Abū Shabaka) with attention to theme and form',
      'Identify the influence of Western Romanticism on Arab romantic poets',
    ],
  },
  '9.3.3.2': {
    agent: 'Poetry Critic', agentAr: 'ناقد شعري',
    skills: [
      'Analyze Tammūzī/mythological poetry (Adūnīs, al-Sayyāb, al-Bayātī) and its mythic symbolism',
      'Explain the Tammūzī movement\'s engagement with ancient Near Eastern mythology',
    ],
  },
  '9.3.3.3': {
    agent: 'Poetry Critic', agentAr: 'ناقد شعري',
    skills: [
      'Analyze resistance poetry (Maḥmūd Darwīsh, Samīḥ al-Qāsim, Murīd al-Barghūthī)',
      'Identify the aesthetic strategies of Arabic political poetry under occupation',
    ],
  },
  '9.3.3.4': {
    agent: 'Poetry Critic', agentAr: 'ناقد شعري',
    skills: [
      'Analyze free-verse pioneers (Nāzik al-Malāʾika, Badr Shākir al-Sayyāb) and their metrical innovations',
      'Explain the break from classical ʿarūḍ in the free-verse movement',
    ],
  },
  '9.3.4.1': {
    agent: 'Novel Scholar', agentAr: 'عالم رواية',
    skills: [
      'Analyze Naǧīb Maḥfūẓ\'s works across his realist, symbolic, and historical phases',
      'Analyze al-Ṭayyib Ṣāliḥ\'s Mawsim al-Hijra ilā al-Shamāl and its postcolonial themes',
    ],
  },
  '9.3.4.2': {
    agent: 'Novel Scholar', agentAr: 'عالم رواية',
    skills: [
      'Analyze the generational novel tradition (Ilyās Khūrī, Ghassān Kanafānī, Imīl Ḥabībī)',
      'Identify the narrative strategies for representing Palestinian experience in fiction',
    ],
  },
  '9.3.4.3': {
    agent: 'Novel Scholar', agentAr: 'عالم رواية',
    skills: [
      'Analyze Maghrebi novels (Kateb Yacine, Assia Djebar) and their engagement with French colonial legacy',
      'Identify the use of multilingualism and code-switching in Maghrebi fiction',
    ],
  },
  '9.3.4.4': {
    agent: 'Feminist Literary Scholar', agentAr: 'ناقدة أدبية',
    skills: [
      'Analyze Arab women\'s writing (Nawāl al-Saʿdāwī, Ahlām Mustaghānamī) for feminist themes',
      'Identify the relationship between Arab feminist fiction and social activism',
    ],
  },
  '9.3.5': {
    agent: 'Short Story Scholar', agentAr: 'عالم قصة قصيرة',
    skills: [
      'Analyze the development of the Arabic short story across major Arab literary centers',
      'Identify the formal characteristics of the Arabic short story tradition',
    ],
  },
  '9.3.6.1': {
    agent: 'Theatre Scholar', agentAr: 'عالم مسرح',
    skills: [
      'Analyze the works of pioneer Arab playwrights (Ṣanūʿ, al-Naqqāsh, al-Ḥakīm)',
      'Describe the social and political role of early Arab theatre',
    ],
  },
  '9.3.6.2': {
    agent: 'Theatre Scholar', agentAr: 'عالم مسرح',
    skills: [
      'Analyze modern Arab drama (Wannūs, Barsha, Qūra) with attention to political engagement',
      'Identify the influence of Western theatrical movements on modern Arab playwrights',
    ],
  },
  '9.3.6.3': {
    agent: 'Theatre Scholar', agentAr: 'عالم مسرح',
    skills: [
      'Analyze the shadow play tradition (Khayāl al-Ẓill) of Ibn Dāniyāl',
      'Explain the popular entertainment context of pre-modern Arabic dramatic forms',
    ],
  },
  '9.3.7.1': {
    agent: 'Literary Critic', agentAr: 'ناقد أدبي',
    skills: [
      'Analyze classical Arabic literary criticism (al-Jāḥiẓ, Ibn Qutayba) with attention to methodology',
      'Describe the development of Arabic poetic criticism from pre-Islamic through ʿAbbāsid periods',
    ],
  },
  '9.3.7.2': {
    agent: 'Literary Critic', agentAr: 'ناقد أدبي',
    skills: [
      'Analyze modern schools of Arabic criticism (al-ʿAqqād, Ṭāhā Ḥusayn, Mandūr)',
      'Evaluate the relationship between modern Arabic criticism and Western literary theory',
    ],
  },
  '9.3.7.3': {
    agent: 'Literary Critic', agentAr: 'ناقد أدبي',
    skills: [
      'Apply structuralist and semiotic analysis to Arabic literary texts (al-Ghadhāmī\'s methodology)',
      'Evaluate the contribution of Arab structuralist critics to global literary theory',
    ],
  },
  '9.3.7.4': {
    agent: 'Literary Critic', agentAr: 'ناقد أدبي',
    skills: [
      'Apply postcolonial and feminist theoretical frameworks to Arabic literary analysis',
      'Produce a critical reading of a modern Arabic text using postcolonial or feminist methodology',
    ],
  },
  '9.4.1': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Analyze folk epic cycles (sīra shaʿbiyya) for narrative structure and oral-formulaic composition',
      'Explain the social function of folk epics in Arab popular culture',
    ],
  },
  '9.4.2': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Analyze Nabati (Bedouin vernacular) poetry with attention to themes and oral performance',
      'Identify Nabati poetic forms and their relationship to classical Arabic poetry',
    ],
  },
  '9.4.3': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Analyze mawwāl (folk sung poetry) for thematic content and musical structure',
      'Identify regional mawwāl styles across the Arab world',
    ],
  },
  '9.4.4': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Analyze zajal (strophic sung debate poetry) for structure and performance conventions',
      'Compare zajal traditions across Lebanon, Palestine, and the Levant',
    ],
  },
  '9.4.5': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Explain the meaning and social context of 50+ Arabic proverbs (amthāl)',
      'Analyze proverbs as expressions of Arab cultural values and worldview',
    ],
  },
  '9.4.6': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Collect and analyze Arabic riddles, lullabies, and children\'s folkloric materials',
      'Explain the developmental and cultural role of children\'s oral lore in Arab societies',
    ],
  },
  '9.4.7': {
    agent: 'Folklorist', agentAr: 'عالم تراث شعبي',
    skills: [
      'Analyze the ḥakawātī (public storyteller) tradition and its narrative techniques',
      'Describe the social function of public storytelling in pre-modern Arab society',
    ],
  },

  /* ===== Branch 10: Translation & Interpretation ===== */
  '10.1': {
    agent: 'Translation Theorist', agentAr: 'منظر ترجمة',
    skills: [
      'Explain Arabic-specific translation theories including approaches to Qurʾānic untranslatability',
      'Apply equivalence theories (formal vs. dynamic) to Arabic-English translation pairs',
    ],
  },
  '10.2': {
    agent: 'Conference Interpreter', agentAr: 'مترجم فوري',
    skills: [
      'Perform simultaneous interpretation between Arabic and English for 30+ minutes with 90%+ fidelity',
      'Perform consecutive interpretation with accurate note-taking and rendering for diplomatic settings',
    ],
  },
  '10.3.1': {
    agent: 'Legal Translator', agentAr: 'مترجم قانوني',
    skills: [
      'Translate legal contracts, court rulings, and legislation between Arabic and English with terminological precision',
      'Navigate differences between civil law, common law, and Sharīʿa legal frameworks',
    ],
  },
  '10.3.2': {
    agent: 'Medical Translator', agentAr: 'مترجم طبي',
    skills: [
      'Translate medical reports, clinical trials, and pharmaceutical documentation with accurate Arabic terminology',
      'Apply Arabic medical terminology standards across different Arab regulatory contexts',
    ],
  },
  '10.3.3': {
    agent: 'Financial Translator', agentAr: 'مترجم مالي',
    skills: [
      'Translate financial statements, annual reports, and commercial contracts with Arabic accounting terminology',
      'Navigate differences between IFRS and local Arab accounting standards in translation',
    ],
  },
  '10.3.4': {
    agent: 'Technical Translator', agentAr: 'مترجم تقني',
    skills: [
      'Translate technical documentation, patents, and engineering specifications with Arabic technical terminology',
      'Apply Arabization standardization (ASMO, Arab League terminology) in technical translation',
    ],
  },
  '10.3.5': {
    agent: 'Media Translator', agentAr: 'مترجم إعلامي',
    skills: [
      'Translate news articles, press releases, and editorial content between Arabic and English',
      'Navigate the specific journalistic conventions of Arab media in translation',
    ],
  },
  '10.3.6': {
    agent: 'UN Translator', agentAr: 'مترجم أممي',
    skills: [
      'Translate UN documents, resolutions, and reports using standard UN Arabic terminology',
      'Apply the six UN language style guidelines specifically for Arabic-language document production',
    ],
  },
  '10.4': {
    agent: 'Literary Translator', agentAr: 'مترجم أدبي',
    skills: [
      'Translate Arabic literary works (prose and poetry) into English with attention to stylistic and cultural fidelity',
      'Address untranslatability challenges in Arabic poetry: meter, rhyme, and cultural allusion',
    ],
  },
  '10.5.1': {
    agent: 'Subtitler', agentAr: 'مترجم ترجمة سمعية',
    skills: [
      'Create Arabic and English subtitles respecting timing, reading speed, and RTL rendering constraints',
      'Apply subtitling conventions for Arab media platforms and streaming services',
    ],
  },
  '10.5.2': {
    agent: 'Dubbing Specialist', agentAr: 'أخصائي دبلجة',
    skills: [
      'Adapt Arabic dubbing scripts with appropriate dialect choice for target audiences',
      'Synchronize Arabic voice-over scripts with original timing and lip movements',
    ],
  },
  '10.5.3': {
    agent: 'Accessibility Specialist', agentAr: 'أخصائي إتاحة',
    skills: [
      'Produce Arabic audio description tracks for visually impaired audiences',
      'Create Arabic subtitles for the deaf and hard-of-hearing (SDH) with speaker identification and sound cues',
    ],
  },
  '10.6': {
    agent: 'Qurʾān Translator', agentAr: 'مترجم قرآن',
    skills: [
      'Evaluate major English Qurʾān translations (Pickthall, Yusuf Ali, Arberry, Sahih International, Abdel Haleem) for methodology and accuracy',
      'Translate selected Qurʾānic verses with awareness of tafsīr tradition and untranslatability challenges',
      'Address the theological implications of rendering Qurʾānic concepts in English',
    ],
  },
  '10.7.1': {
    agent: 'Localization Engineer', agentAr: 'مهندس تعريب',
    skills: [
      'Localize websites and software for Arabic/RTL audiences with correct bidi and i18n implementation',
      'Apply Arabic UX writing conventions for interface strings, errors, and instructions',
    ],
  },
  '10.7.2': {
    agent: 'Game Localization Specialist', agentAr: 'أخصائي تعريب ألعاب',
    skills: [
      'Localize video games for Arab markets including script adaptation, UI, and cultural sensitivities',
      'Navigate dialect choice and fuṣḥa vs. ʿāmmiyya decisions in game localization',
    ],
  },
  '10.7.3': {
    agent: 'MT Specialist', agentAr: 'أخصائي ترجمة آلية',
    skills: [
      'Evaluate Machine Translation output (Google, Sakhr, LLM-based) for Arabic-English pairs',
      'Identify common Arabic MT failure modes and apply post-editing strategies',
    ],
  },
  '10.7.4': {
    agent: 'CAT Tool Specialist', agentAr: 'أخصائي أدوات الترجمة',
    skills: [
      'Configure and use CAT tools (Trados, memoQ) with Arabic language pairs including terminology management',
      'Create and maintain Arabic translation memories and term bases',
    ],
  },
  '10.7.5': {
    agent: 'PEMT Specialist', agentAr: 'أخصائي تحرير ترجمة آلية',
    skills: [
      'Apply post-editing strategies for Arabic MT output: full vs. light post-editing',
      'Evaluate Arabic PEMT quality using standardized metrics and error taxonomies',
    ],
  },
  '10.8': {
    agent: 'Translation Ethics Officer', agentAr: 'أخصائي أخلاقيات ترجمة',
    skills: [
      'Apply professional ethics codes (ATA, AIIC, SATI) in Arabic translation contexts',
      'Navigate confidentiality, impartiality, and cultural sensitivity in Arabic translation practice',
    ],
  },

  /* ===== Branch 11: Digital & Computational Arabic ===== */
  '11.1.1': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Apply Arabic-specific tokenization strategies: morphological segmentation vs. surface-form tokenization',
      'Handle Arabic tokenization challenges including clitics, affixes, and white-space variation',
    ],
  },
  '11.1.2': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Use morphological analyzers (Buckwalter, MADAMIRA, Farasa) for Arabic text analysis',
      'Evaluate analyzer outputs and resolve morphological ambiguity using context',
    ],
  },
  '11.1.3': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Apply Arabic POS taggers with appropriate tag sets (PATB, ARF) and handle OOV challenges',
      'Evaluate Arabic POS tagging accuracy across MSA and dialectal text',
    ],
  },
  '11.1.4': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Use Arabic treebanks (PADT, Columbia, Quranic) for syntactic analysis',
      'Apply dependency or constituency parsing to Arabic sentences with parser tools',
    ],
  },
  '11.1.5': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Train and evaluate Arabic NER systems with appropriate tag sets (person, location, org, etc.)',
      'Handle Arabic NER challenges including ambiguity, name variation, and dialectal entities',
    ],
  },
  '11.1.6': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Build and evaluate Arabic sentiment analysis systems for MSA and dialectal text',
      'Create Arabic sentiment lexicons and handle negation, intensity, and dialectal variation',
    ],
  },
  '11.1.7': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Evaluate Arabic MT systems across metrics (BLEU, TER, COMET) with awareness of Arabic-specific challenges',
      'Compare statistical, neural, and LLM-based MT approaches for Arabic',
    ],
  },
  '11.1.8': {
    agent: 'NLP Engineer', agentAr: 'مهندس معالجة طبيعية',
    skills: [
      'Build Arabic QA systems with appropriate retrieval and generation strategies',
      'Apply Arabic IE techniques — relation extraction, event extraction, and template filling',
    ],
  },
  '11.2.1': {
    agent: 'Corpus Linguist', agentAr: 'لغوي متون',
    skills: [
      'Navigate and query classical Arabic corpora (OpenITI, al-Shāmila) for research',
      'Extract and analyze data from classical corpora with appropriate search strategies',
    ],
  },
  '11.2.2': {
    agent: 'Corpus Linguist', agentAr: 'لغوي متون',
    skills: [
      'Query and analyze modern standard Arabic corpora (arabicorpus, Kalimat)',
      'Perform frequency, concordance, and collocation analyses on MSA corpora',
    ],
  },
  '11.2.3': {
    agent: 'Corpus Linguist', agentAr: 'لغوي متون',
    skills: [
      'Identify and use available dialectal Arabic corpora for research',
      'Evaluate dialectal corpus design and annotation quality',
    ],
  },
  '11.2.4': {
    agent: 'Corpus Linguist', agentAr: 'لغوي متون',
    skills: [
      'Use Arabic-English parallel corpora for translation and contrastive research',
      'Align parallel corpora at sentence and sub-sentence levels',
    ],
  },
  '11.2.5': {
    agent: 'Corpus Linguist', agentAr: 'لغوي متون',
    skills: [
      'Query Arabic treebanks (PADT, Columbia Arabic Treebank, Quranic Treebank) for syntactic research',
      'Extract syntactic patterns from treebank data using query languages',
    ],
  },
  '11.2.6': {
    agent: 'Corpus Linguist', agentAr: 'لغوي متون',
    skills: [
      'Use Arabic WordNet for lexical semantic research and cross-lingual applications',
      'Navigate Arabic FrameNet and OntoNotes for frame semantic and coreference analysis',
    ],
  },
  '11.3.1': {
    agent: 'Speech Engineer', agentAr: 'مهندس كلام',
    skills: [
      'Train and evaluate Arabic ASR systems for MSA and dialectal speech',
      'Handle Arabic ASR challenges including dialect variation, code-switching, and OOV vocabulary',
    ],
  },
  '11.3.2': {
    agent: 'Speech Engineer', agentAr: 'مهندس كلام',
    skills: [
      'Build and evaluate Arabic TTS systems using rule-based and neural approaches',
      'Handle Arabic TTS challenges including tashkīl, phrase-final lengthening, and emphatic consonant synthesis',
    ],
  },
  '11.3.3': {
    agent: 'Speech Engineer', agentAr: 'مهندس كلام',
    skills: [
      'Apply speaker identification and diarization techniques to Arabic multi-speaker audio',
      'Handle Arabic-specific speaker recognition challenges including dialect-based variation',
    ],
  },
  '11.3.4': {
    agent: 'Speech Engineer', agentAr: 'مهندس كلام',
    skills: [
      'Apply and evaluate automatic Arabic diacritization (tashkīl) systems',
      'Compare rule-based and neural approaches to Arabic orthographic restoration',
    ],
  },
  '11.4.1': {
    agent: 'OCR Engineer', agentAr: 'مهندس تعرف بصري',
    skills: [
      'Apply Arabic OCR systems to printed text with correct character segmentation and RTL processing',
      'Handle Arabic OCR challenges including connected glyphs, ligatures, and font variation',
    ],
  },
  '11.4.2': {
    agent: 'OCR Engineer', agentAr: 'مهندس تعرف بصري',
    skills: [
      'Apply handwriting recognition systems for Arabic script (printed and cursive)',
      'Evaluate Arabic HTR accuracy across writing styles and historical documents',
    ],
  },
  '11.4.3': {
    agent: 'Document Engineer', agentAr: 'مهندس وثائق',
    skills: [
      'Perform document layout analysis for Arabic manuscripts and printed materials',
      'Digitize Arabic documents with appropriate metadata, OCR, and IIIF-compliant workflows',
    ],
  },
  '11.5.1': {
    agent: 'Font Engineer', agentAr: 'مهندس خطوط',
    skills: [
      'Navigate the Arabic Unicode block (0600–06FF) with character code knowledge',
      'Identify Arabic Unicode characters by code point and name',
    ],
  },
  '11.5.2': {
    agent: 'BiDi Engineer', agentAr: 'مهندس نص ثنائي الاتجاه',
    skills: [
      'Apply the Unicode Bidirectional Algorithm correctly for Arabic-Latin mixed text',
      'Resolve BiDi rendering issues across browsers, applications, and platforms',
    ],
  },
  '11.5.3': {
    agent: 'Font Engineer', agentAr: 'مهندس خطوط',
    skills: [
      'Design Arabic typefaces with appropriate character shapes and style families',
      'Differentiate Naskh, Kufic, and Ruqʿa-inspired typeface designs',
    ],
  },
  '11.5.4': {
    agent: 'Font Engineer', agentAr: 'مهندس خطوط',
    skills: [
      'Implement OpenType features for Arabic fonts (init, medi, fina, isol, liga)',
      'Write OpenType feature code for Arabic glyph substitution and positioning',
    ],
  },
  '11.5.5': {
    agent: 'Font Engineer', agentAr: 'مهندس خطوط',
    skills: [
      'Configure and use text shaping engines (HarfBuzz, CoreText) for Arabic script rendering',
      'Diagnose and resolve Arabic shaping issues in digital environments',
    ],
  },
  '11.6.1': {
    agent: 'IR Engineer', agentAr: 'مهندس استرجاع',
    skills: [
      'Apply Arabic stemming algorithms (light, root-based, statistical) for information retrieval',
      'Evaluate stemmer effectiveness for Arabic search relevance',
    ],
  },
  '11.6.2': {
    agent: 'IR Engineer', agentAr: 'مهندس استرجاع',
    skills: [
      'Optimize Arabic search systems for relevance with appropriate tokenization and ranking',
      'Handle Arabic search challenges including morphological variation and query ambiguity',
    ],
  },
  '11.6.3': {
    agent: 'IR Engineer', agentAr: 'مهندس استرجاع',
    skills: [
      'Build and evaluate Arabic spell-checking and correction systems',
      'Handle Arabic spelling challenges including Hamza variation, Alif maqṣūra, and common typos',
    ],
  },
  '11.6.4': {
    agent: 'IR Engineer', agentAr: 'مهندس استرجاع',
    skills: [
      'Build cross-lingual information retrieval systems between Arabic and English',
      'Apply CLIR techniques including query translation and bilingual term matching',
    ],
  },
  '11.7.1': {
    agent: 'LLM Engineer', agentAr: 'مهندس نماذج لغوية',
    skills: [
      'Fine-tune and evaluate Arabic LLMs (AraBERT, Jais, CamelBERT) for specific tasks',
      'Compare encoder-only, decoder-only, and encoder-decoder model performance for Arabic NLP tasks',
    ],
  },
  '11.7.2': {
    agent: 'LLM Engineer', agentAr: 'مهندس نماذج لغوية',
    skills: [
      'Design Arabic prompts for LLMs with attention to diglossia and register',
      'Evaluate LLM output quality for Arabic using appropriate metrics and benchmarks',
    ],
  },
  '11.7.3': {
    agent: 'LLM Engineer', agentAr: 'مهندس نماذج لغوية',
    skills: [
      'Evaluate LLM performance on dialectal Arabic understanding and generation',
      'Fine-tune LLMs for dialectal Arabic tasks with appropriate data strategies',
    ],
  },
  '11.7.4': {
    agent: 'Content Generation Specialist', agentAr: 'أخصائي توليد محتوى',
    skills: [
      'Generate high-quality Arabic content (articles, social media, marketing copy) using LLM tools',
      'Evaluate and edit LLM-generated Arabic content for fluency, accuracy, and cultural appropriateness',
    ],
  },
  '11.8.1': {
    agent: 'Input Methods Specialist', agentAr: 'أخصائي طرق إدخال',
    skills: [
      'Configure and use Arabic keyboard layouts (QWERTY Arabic, Buckwalter) efficiently',
      'Design alternative Arabic input methods for specialized domains and accessibility',
    ],
  },
  '11.8.2': {
    agent: 'Digital Linguist', agentAr: 'لغوي رقمي',
    skills: [
      'Read and produce text in Arabic chat alphabets (Arabizi / Franco-Arabic)',
      'Analyze the linguistic features of Arabizi and its relationship to spoken and written Arabic',
    ],
  },
  '11.8.3': {
    agent: 'Voice Assistant Engineer', agentAr: 'مهندس مساعد صوتي',
    skills: [
      'Design voice interaction flows for Arabic-language voice assistants',
      'Handle Arabic ASR and NLU challenges in voice assistant contexts',
    ],
  },
  '11.8.4': {
    agent: 'Accessibility Engineer', agentAr: 'مهندس إتاحة',
    skills: [
      'Configure and test Arabic-language screen readers (NVDA, JAWS, VoiceOver) for RTL content',
      'Evaluate Arabic web and app accessibility for visually impaired users',
    ],
  },

  /* ===== Branch 12: TAFL ===== */
  '12.1': {
    agent: 'SLA Researcher', agentAr: 'باحث اكتساب لغة',
    skills: [
      'Apply SLA theories (Universal Grammar, interactionist, sociocultural) to Arabic learning contexts',
      'Analyze the diglossia challenge in Arabic SLA and propose pedagogical responses',
      'Use contrastive analysis between Arabic and English to predict learner errors',
    ],
  },
  '12.2': {
    agent: 'Curriculum Designer', agentAr: 'مصمم مناهج',
    skills: [
      'Design Arabic curricula aligned to CEFR/ACTFL proficiency standards',
      'Evaluate and select Arabic textbook series for different learner profiles',
      'Create ASP (Arabic for Specific Purposes) modules for professional domains',
      'Design and evaluate authentic Arabic learning materials from media and literature',
    ],
  },
  '12.3': {
    agent: 'Assessment Specialist', agentAr: 'أخصائي تقييم',
    skills: [
      'Administer and rate ACTFL Arabic OPI interviews with reliable inter-rater agreement',
      'Design Arabic assessments aligned to CEFR levels with appropriate task types',
      'Use and evaluate computer-adaptive Arabic proficiency tests',
    ],
  },
  '12.4': {
    agent: 'Heritage Language Educator', agentAr: 'معلم تراثي',
    skills: [
      'Design differentiated Arabic curricula for heritage learner profiles (diaspora backgrounds)',
      'Address heritage learner needs: literacy gaps, dialectal competence, identity motivation',
      'Design language maintenance strategies for Arab diaspora communities',
    ],
  },
  '12.5': {
    agent: 'Classroom Educator', agentAr: 'معلم صفي',
    skills: [
      'Apply CLT (Communicative Language Teaching) and TBLT (Task-Based Language Teaching) in Arabic classrooms',
      'Integrate Arabic EdTech tools (apps, LMS, AI tutors) into instruction',
      'Design effective study abroad programs for Arabic learners in Arab countries',
    ],
  },
  '12.6': {
    agent: 'Teacher Trainer', agentAr: 'مدرب معلمين',
    skills: [
      'Design and deliver Arabic teacher training programs for native and non-native teachers',
      'Apply reflective practice and classroom observation methodologies in Arabic teaching contexts',
      'Address native vs. non-native teacher dynamics in Arabic language education',
    ],
  },

  /* ===== Branch 13: Manuscripts & Critical Editing ===== */
  '13.1': {
    agent: 'Critical Editor', agentAr: 'محقق',
    skills: [
      'Apply stemmatic (Lachmannian) and eclectic recension methods to Arabic manuscript traditions',
      'Produce a critical edition with full apparatus criticus including variant apparatus and commentary',
      'Distinguish and produce diplomatic, eclectic, and best-text editions with appropriate methodology',
    ],
  },
  '13.2': {
    agent: 'Codicologist', agentAr: 'عالم مخطوطات',
    skills: [
      'Analyze Arabic manuscript writing supports (papyrus, parchment, paper) and dating methods',
      'Identify binding structures, collation formula, mise-en-page conventions, and provenance markers',
      'Describe the manuscript book production chain in pre-modern Islamic societies',
    ],
  },
  '13.3': {
    agent: 'Paleographer', agentAr: 'عالم خطوط قديمة',
    skills: [
      'Date undated Arabic manuscripts by script analysis with ±50 year precision',
      'Identify regional script families (Maghribī, Mashriqī, Andalusī, Kūfī, Naskh) in manuscript evidence',
      'Trace the diachronic development of Arabic scripts from the 7th–15th centuries',
    ],
  },
  '13.4': {
    agent: 'Bibliographer', agentAr: 'عالم فهرسة',
    skills: [
      'Navigate bio-bibliographic sources: Ibn al-Nadīm\'s Fihrist, Ḥājjī Khalīfa\'s Kashf al-Ẓunūn',
      'Use modern bio-bibliographic tools (Brockelmann\'s GAL, Sezgin\'s GAS, online databases)',
      'Produce a bibliographic entry for an Arabic manuscript following standard conventions',
    ],
  },
  '13.5': {
    agent: 'Digital Humanities Scholar', agentAr: 'عالم إنسانيات رقمية',
    skills: [
      'Navigate and use OpenITI and al-Maktaba al-Shāmila for digital manuscript research',
      'Apply IIIF (International Image Interoperability Framework) for manuscript image access',
      'Use computational paleographic tools for script analysis and attribution',
    ],
  },
  '13.6': {
    agent: 'Archivist', agentAr: 'أرشفي',
    skills: [
      'Describe best practices for Arabic manuscript preservation, storage, and conservation',
      'Design archival systems for manuscript collections with appropriate metadata standards',
      'Evaluate digitization prioritization strategies for endangered manuscript collections',
    ],
  },

  /* ===== Branch 14: Media & Journalism ===== */
  '14.1': {
    agent: 'Media Historian', agentAr: 'مؤرخ إعلامي',
    skills: [
      'Describe the development of the early Arabic press in the 19th century (al-Waqāʾiʿ al-Miṣriyya, al-Ahrām, al-Manār)',
      'Analyze the role of pan-Arab print media in fostering Arab nationalism (1950s–1970s)',
      'Evaluate censorship patterns and press freedom in different Arab political contexts',
    ],
  },
  '14.2': {
    agent: 'Media Analyst', agentAr: 'محلل إعلامي',
    skills: [
      'Analyze Al Jazeera and Al Arabiya editorial frameworks and audience targeting strategies',
      'Evaluate the role of state-owned satellite channels in projecting Arab soft power',
      'Compare news framing across pan-Arab satellite channels for the same event',
    ],
  },
  '14.3': {
    agent: 'Media Linguist', agentAr: 'لغوي إعلامي',
    skills: [
      'Analyze Arabic news writing conventions across pan-Arab and local outlets',
      'Identify the linguistic features of Arabic broadcast news register',
      'Differentiate opinion from news content in Arabic media and identify discourse markers',
      'Apply critical discourse analysis (CDA) to Arabic news texts',
      'Identify propaganda techniques and framing devices in Arab media discourse',
    ],
  },
  '14.4': {
    agent: 'Digital Media Analyst', agentAr: 'محلل إعلام رقمي',
    skills: [
      'Describe the development of the Arab blogosphere and its role in political discourse',
      'Analyze hashtag activism and social media campaigns in Arab contexts',
      'Identify Arabic internet linguistics features: Arabizi, abbreviations, and platform-specific conventions',
      'Evaluate disinformation and misinformation patterns in Arabic-language social media',
    ],
  },
  '14.5': {
    agent: 'Broadcast Analyst', agentAr: 'محلل بث',
    skills: [
      'Analyze the format and discourse of Arab talk shows on satellite television',
      'Describe the evolution of Islamic religious broadcasting in the Arab world',
      'Analyze the Ramadan drama (musalsal) phenomenon from a media production perspective',
      'Evaluate the growth and impact of Arabic-language podcasting',
    ],
  },
  '14.6': {
    agent: 'Journalist', agentAr: 'صحفي',
    skills: [
      'Apply conflict reporting safety protocols and ethics in Arab conflict zones',
      'Produce Arabic investigative journalism reports using documentary sources, interviews, and data',
      'Create Arabic data journalism visualizations with appropriate language and cultural framing',
      'Apply journalistic ethics codes (Arab and international) to reporting practice',
    ],
  },
  '14.7': {
    agent: 'Advertising Specialist', agentAr: 'أخصائي إعلان',
    skills: [
      'Analyze Ramadan advertising campaigns for cultural messaging and consumer targeting',
      'Design crisis communication strategies for Arab markets and audiences',
      'Evaluate nation branding campaigns by Arab governments and their media impact',
    ],
  },
}
