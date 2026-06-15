#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const root = path.resolve(import.meta.dirname, '..')
const egEn = path.join(root, 'apps/web-eg/public/locales/en/translation.json')
const egAr = path.join(root, 'apps/web-eg/public/locales/ar/translation.json')
const aeEn = path.join(root, 'apps/web-ae/public/locales/en/translation.json')
const aeAr = path.join(root, 'apps/web-ae/public/locales/ar/translation.json')

function uaeSwapEn(text) {
  if (typeof text !== 'string') return text
  return text
    .replace(/Hurghada's #1 Marketing Agency/g, "UAE's trusted marketing agency")
    .replace(/Hurghada marketing agency/g, 'UAE marketing agency')
    .replace(/Hurghada Marketing Agency/g, 'UAE Marketing Agency')
    .replace(/Marketing built for Hurghada businesses/g, 'Marketing built for UAE businesses')
    .replace(/Hurghada businesses/g, 'UAE businesses')
    .replace(/Hurghada and Red Sea businesses/g, 'UAE and Gulf businesses')
    .replace(/Hurghada and across Egypt/g, 'Dubai and across the UAE')
    .replace(/across Egypt and the Gulf/g, 'across the UAE and the Gulf')
    .replace(/Red Sea businesses/g, 'UAE businesses')
    .replace(/Red Sea Governorate, Egypt/g, 'Dubai, UAE')
    .replace(/Red Sea Governorate/g, 'Dubai')
    .replace(/Hurghada, Egypt/g, 'Dubai, UAE')
    .replace(/Hurghada in 2015/g, 'Dubai in 2015')
    .replace(/started in Hurghada/g, 'started in Dubai')
    .replace(/founded in Hurghada/g, 'founded in Dubai')
    .replace(/in Hurghada/g, 'in the UAE')
    .replace(/Hurghada market/g, 'UAE market')
    .replace(/Hurghada & Red Sea Governorate/g, 'Dubai & UAE')
    .replace(/Local SEO for Hurghada/g, 'Local SEO for Dubai')
    .replace(/Three Hurghada businesses/g, 'Three UAE businesses')
    .replace(/for Hurghada Businesses/g, 'for UAE Businesses')
    .replace(/for Hurghada and Red Sea businesses/g, 'for UAE and Gulf businesses')
    .replace(/for businesses in Hurghada and across Egypt/g, 'for businesses in Dubai and across the UAE')
    .replace(/for Egyptian businesses/g, 'for UAE businesses')
    .replace(/real Hurghada businesses/g, 'real UAE businesses')
    .replace(/Made with ☀️ in Hurghada, Egypt\./g, 'Made with ☀️ in Dubai, UAE.')
    .replace(/Sunday to Thursday, 9 AM to 6 PM \(EET\)/g, 'Sunday to Thursday, 9 AM to 6 PM (GST)')
    .replace(/\+20 1xx xxx xxxx/g, '+971 5x xxx xxxx')
    .replace(/\+20 123 456 7890/g, '+971 50 123 4567')
    .replace(
      /give Red Sea businesses marketing quality on par with Cairo and Dubai, without agency overhead\. Today we work with hotels, restaurants, real estate, healthcare, and retail across Egypt and the Gulf\./g,
      'give UAE businesses marketing quality on par with global brands, without agency overhead. Today we work with hotels, restaurants, real estate, healthcare, and retail across the Emirates and the Gulf.',
    )
    .replace(/MediaBubble \| Hurghada Marketing Agency/g, 'MediaBubble | UAE Marketing Agency')
    .replace(/About MediaBubble \| Hurghada Marketing Agency Since 2015/g, 'About MediaBubble | UAE Marketing Agency Since 2015')
    .replace(/Services \| MediaBubble Hurghada/g, 'Services | MediaBubble UAE')
    .replace(/Based in Hurghada, serving businesses across Egypt\./g, 'Based in Dubai, serving businesses across the UAE.')
}

function uaeSwapAr(text) {
  if (typeof text !== 'string') return text
  return text
    .replace(/الغردقة/g, 'دبي')
    .replace(/محافظة البحر الأحمر/g, 'الإمارات')
    .replace(/البحر الأحمر/g, 'الإمارات')
    .replace(/مصر/g, 'الإمارات')
    .replace(/توقيت مصر/g, 'توقيت الخليج (GST)')
    .replace(/القاهرة ودبي/g, 'دبي وأبوظبي')
    .replace(/\+٢٠/g, '+٩٧١')
    .replace(/شركات الغردقة/g, 'شركات الإمارات')
    .replace(/وكالة التسويق الأولى في الغردقة/g, 'وكالة تسويق موثوقة في الإمارات')
    .replace(/وكالة تسويق الغردقة/g, 'وكالة تسويق الإمارات')
    .replace(/تلات شركات في الغردقة/g, 'تلات شركات في الإمارات')
    .replace(/لشركات الغردقة/g, 'لشركات الإمارات')
    .replace(/في الغردقة، بنخدم شركات في كل مصر/g, 'في دبي، بنخدم شركات في كل الإمارات')
    .replace(/صُنع بـ ☀️ في الغردقة، مصر\./g, 'صُنع بـ ☀️ في دبي، الإمارات.')
    .replace(/بنفكر/g, 'نتفكر')
    .replace(/إحنا/g, 'حنا')
    .replace(/مش/g, 'مو')
    .replace(/دلوقتي/g, ' الحين')
    .replace(/عاوز/g, 'تبي')
    .replace(/كده/g, 'كذا')
    .replace(/ يالا /g, ' ')
}

function mapDeep(obj, fn) {
  if (typeof obj === 'string') return fn(obj)
  if (Array.isArray(obj)) return obj.map((v) => mapDeep(v, fn))
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) out[k] = mapDeep(v, fn)
    return out
  }
  return obj
}

const en = mapDeep(JSON.parse(fs.readFileSync(egEn, 'utf8')), uaeSwapEn)
const ar = mapDeep(JSON.parse(fs.readFileSync(egAr, 'utf8')), uaeSwapAr)

en.hero.home.kicker = "UAE's trusted marketing agency"
en.seo.home.title = 'MediaBubble | UAE Marketing Agency'
en.seo.home.description =
  'Full-service marketing agency in Dubai, UAE. SEO, branding, web development, and paid advertising for UAE businesses.'

ar.hero.home.kicker = 'وكالة تسويق موثوقة في الإمارات'
ar.seo.home.title = 'ميديابابل | وكالة تسويق الإمارات'
ar.seo.home.description =
  'وكالة تسويق متكاملة في دبي، الإمارات. SEO وبراند وتطوير ويب وإعلانات مدفوعة لشركات الإمارات.'

fs.writeFileSync(aeEn, JSON.stringify(en, null, 2) + '\n')
fs.writeFileSync(aeAr, JSON.stringify(ar, null, 2) + '\n')
console.log('Wrote', aeEn)
console.log('Wrote', aeAr)
