# On-Page SEO — Arabic Content Optimization

## Arabic Meta Titles

### Best Practices
- **Length:** 50-65 characters including spaces (Arabic chars are wider)
- **Keyword placement:** Primary keyword in first 40 characters
- **Structure:** Primary Keyword — Secondary Keyword | Brand Name
- **Masri usage:** Use MSA for title (Google indexes MSA better), Masri for snippets
- **Brand mention:** Include MediaBubble or variant at the end

### Title Templates by Page Type

| Page Type | Formula | Example (Arabic) | Length |
|-----------|---------|------------------|--------|
| Homepage | [Value Prop] — [Brand] | منصة حجز الأطباء الأولى في مصر — MediaBubble | 42 chars |
| Category | [Category] في [Location] — [Brand] | دكتور أسنان في القاهرة — MediaBubble | 34 chars |
| Doctor page | دكتور [Name] [Specialty] — [Location] | دكتور أحمد السيد — جراحة تجميل في القاهرة | 42 chars |
| Article | [Keyword] : [Benefit] — MediaBubble | ألم الظهر : الأسباب والعلاج — MediaBubble | 38 chars |
| Location page | أحسن [Specialty] في [Neighborhood/City] | أحسن دكتور عيون في المعادي | 33 chars |
| Pricing | أسعار [Service] في مصر 2026 | أسعار عمليات التجميل في مصر 2026 | 33 chars |
| Guide | دليل [Topic] الشامل — MediaBubble | دليل اختيار المستشفى الشامل — MediaBubble | 38 chars |

### Title Checklist
- [ ] Primary keyword in title (exact match where natural)
- [ ] Under 65 characters
- [ ] Includes brand name (unless homepage)
- [ ] Compelling for click-through (numbers, questions, benefits)
- [ ] Unique per page (no duplicate titles)
- [ ] Masri only in relevant long-tail (avoid in head-term titles)

---

## Arabic Meta Descriptions

### Best Practices
- **Length:** 100-160 characters including spaces
- **Structure:** Include primary keyword naturally + CTA + value proposition
- **Masri:** Use Masri tone in descriptions (higher CTR for Egyptian audience)
- **Unique:** Every page needs a unique description
- **CTA:** Include an action verb in Masri (احجز, اعرف, شوف, قارن)

### Description Templates

| Page Type | Template | Masri Example |
|-----------|----------|---------------|
| Doctor | اعرف كل حاجة عن دكتور [Name] تخصص [Specialty] في [Location] — التقييمات، العنوان، وأرقام التواصل. احجز موعدك دلوقتي. | اعرف كل حاجة عن دكتور أحمد السيد تخصص جراحة تجميل في القاهرة — التقييمات، العنوان، وأرقام التواصل. احجز موعدك دلوقتي. |
| Article | تعرف على أسباب وأعراض وعلاج [Condition] في دليلنا الشامل. نصائح مهمة من أفضل الأطباء في مصر. اقرأ المقال كامل. | تعرف على أسباب وأعراض وعلاج ألم الظهر في دليلنا الشامل. نصائح مهمة من أفضل الأطباء في مصر. اقرأ المقال كامل. |
| Location | عاوز دكتور [Specialty] في [Location]؟ لقينا لك أحسن الأطباء مع التقييمات والعناوين. احجز كشفك أونلاين. | عاوز دكتور عيون في المعادي؟ لقينا لك أحسن الأطباء مع التقييمات والعناوين. احجز كشفك أونلاين. |
| Service | كل اللي محتاج تعرفه عن [Service] في مصر — الأسعار، المميزات، والأطباء المتخصصين. ابدأ رحلتك العلاجية مع MediaBubble. | كل اللي محتاج تعرفه عن عمليات التجميل في مصر — الأسعار، المميزات، والأطباء المتخصصين. ابدأ رحلتك العلاجية مع MediaBubble. |

### Description Checklist
- [ ] Under 160 characters
- [ ] Primary keyword included naturally
- [ ] Compelling CTA in Masri
- [ ] Unique per page
- [ ] Doesn't duplicate title

---

## Arabic Heading Structure

### H1 Guidelines
- One H1 per page
- Include primary keyword
- Should match or closely relate to meta title
- Keep under 70 characters
- Natural Arabic phrasing (not keyword-stuffed)

### H2 Subheadings
- Include secondary keywords and related terms
- Use Masri for H2s when content is Masri-targeted
- Question format works well (إزاي, ليه, فين, امتى)
- Maintain logical hierarchy (H1 → H2 → H3)

### Heading Examples by Intent

| Intent | H1 | H2 Examples |
|--------|----|-------------|
| Informational | أعراض وعلاج ألم الظهر: دليل شامل | إيه أسباب ألم الظهر؟, إزاي تعالج ألم الظهر في البيت, أمتى تروح للدكتور |
| Transactional | احجز دكتور عيون في المعادي | أحسن دكاترة عيون في المعادي, أسعار الكشف, تقييمات المرضى, ازاي تحجز موعد |
| Comparison | أفضل مستشفيات التجميل في مصر 2026 | مقارنة الأسعار, مين أفضل دكتور تجميل, تجارب المرضى, أسئلة شائعة |
| Local | دكتور أسنان في مدينة نصر | أفضل عيادات أسنان, عيادات أسنان 24 ساعة, أسعار الكشف, احجز موعدك |

---

## Arabic Schema Markup

### Required Schema Types for Healthcare

| Schema Type | Page Types | Key Properties (Arabic) |
|-------------|-----------|----------------------|
| MedicalBusiness | Doctor, clinic, hospital pages | name, description, areaServed (Cairo, Alexandria), medicalSpecialty, priceRange |
| Physician | Individual doctor pages | name, medicalSpecialty, hospitalAffiliation, availableChannel |
| Hospital | Hospital pages | name, location, specialty, aggregatedRating |
| Article | Blog posts, guides | headline, description, author, datePublished, image |
| FAQPage | FAQ sections | mainEntity (Question + Answer in Arabic) |
| LocalBusiness | All location pages | name, address, telephone, openingHours, review |
| Product | Service/pricing pages | name, description, offers (price, priceCurrency) |
| AggregateRating | Doctors, hospitals with reviews | ratingValue, reviewCount, bestRating |

### Implementation Notes for Arabic
- Use `@language: "ar-EG"` for Egyptian Arabic content
- Use `@language: "ar"` for MSA content
- For bilingual pages, use separate itemscopes per language
- Arabic properties: `name`, `description` in Arabic text
- Transliterate medical specialities consistently (use official Arabic medical terms)

### MedicalSpeciality Values (Arabic)
| Speciality | Schema Value |
|-----------|-------------|
| أسنان | Dentist |
| عيون | Ophthalmologist |
| عظام | Orthopedic |
| جلدية | Dermatologist |
| تجميل | PlasticSurgery |
| نساء وتوليد | Gynecologic |
| أطفال | Pediatric |
| قلب | Cardiologist |
| مخ وأعصاب | Neurologist |
| نفسي | Psychiatrist |

---

## Image Alt Text (Arabic)

### Guidelines
- Describe the image content in Arabic (MSA or Masri depending on page)
- Include relevant keyword naturally
- Keep under 125 characters
- Don't keyword-stuff
- Differentiate decorative vs informative images

### Alt Text Examples

| Image | Good Alt Text (Arabic) | Bad Alt Text |
|-------|----------------------|-------------|
| Doctor consultation | دكتور يستقبل مريض في عيادة — MediaBubble | دكتور, صورة |
| Clinic interior | تصميم عيادة أسنان حديثة في القاهرة — MediaBubble | عيادة |
| Medical team | فريق أطباء MediaBubble في أحدث مستشفيات القاهرة | فريق |
| Infographic | رسم بياني يوضح مراحل علاج ألم الظهر | رسم بياني |

---

## Internal Linking for Arabic Sites

### Strategy
- Use Arabic anchor text that describes the target page
- Include keywords naturally in anchor text
- Link from high-authority pages to new content
- Use Masri anchor text for conversational links
- Keep link density reasonable (2-5 internal links per 500 words)

### Anchor Text Examples

| Target Page | Good Arabic Anchor Text |
|-------------|----------------------|
| دكتور أسنان في المعادي | دكتور أسنان في المعادي |
| دليل المستشفيات | دليلنا الشامل لأفضل المستشفيات في مصر |
| Booking page | احجز موعدك من هنا |
| Article on back pain | اقرأ المقال كامل عن ألم الظهر |

### On-Page SEO Checklist
- [ ] Meta title (50-65 chars, primary keyword first 40 chars)
- [ ] Meta description (100-160 chars, CTA in Masri)
- [ ] H1 (one per page, primary keyword, under 70 chars)
- [ ] H2/H3 structure with secondary keywords
- [ ] Schema markup implemented (MedicalBusiness, Article, etc.)
- [ ] Image alt text in Arabic for all images
- [ ] Internal links with Arabic anchor text (3-5 per page)
- [ ] URL slug optimized (see technical-seo reference)
- [ ] Content length: minimum 500 words for articles, 1000+ for pillar pages
- [ ] No duplicate meta tags across pages
