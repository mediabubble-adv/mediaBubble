#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const root = path.resolve(import.meta.dirname, '..')
const enPath = path.join(root, 'apps/brand/lib/i18n/en.json')
const arPath = path.join(root, 'apps/brand/lib/i18n/ar-masri.json')
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'))

const OLD_TAGLINE =
  "We don't just think outside the box—we redefine it."
const NEW_TAGLINE =
  'Clear strategy, measurable results, and creative that converts.'

const OLD_DESC =
  "MediaBubble is a full-service marketing and advertising agency based in Hurghada, Egypt. Founded in 2015, we've grown into a team of 22+ dedicated professionals committed to helping businesses thrive through innovative, results-driven strategies."
const NEW_DESC =
  'MediaBubble is a marketing and advertising agency based in Hurghada, Egypt. Since 2015, a team of 22+ strategists, designers, and developers has helped brands grow through SEO, branding, web, and paid ads. We measure outcomes, not outputs.'

if (en[OLD_TAGLINE]) {
  delete en[OLD_TAGLINE]
}
en[NEW_TAGLINE] = NEW_TAGLINE
if (en[OLD_DESC]) {
  delete en[OLD_DESC]
}
en[NEW_DESC] = NEW_DESC

en['Get your free strategy audit'] = 'Get your free strategy audit'
en['View case studies'] = 'View case studies'
en['See details'] = 'See details'
en['Not exported yet. Request this file from the design team.'] =
  'Not exported yet. Request this file from the design team.'
en['Translation loading issue'] = 'Translation loading issue'
en['We could not load translations. Refresh the page and try again.'] =
  'We could not load translations. Refresh the page and try again.'
en['Refresh page'] = 'Refresh page'

en['Use "Explore [Service Name]" for service pages, "View case studies" for portfolio. Avoid "Learn More" as a standalone CTA.'] =
  'Use "Explore [Service Name]" for service pages, "View case studies" for portfolio. Avoid "Learn More" as a standalone CTA.'
en['Schedule a Free Consultation'] = 'Get your free strategy audit'

if (ar[OLD_TAGLINE]) delete ar[OLD_TAGLINE]
ar[NEW_TAGLINE] = 'استراتيجية واضحة، نتايج قابلة للقياس، وإبداع بيحوّل.'
if (ar[OLD_DESC]) delete ar[OLD_DESC]
ar[NEW_DESC] =
  'ميديابابل وكالة تسويق وإعلانات في الغردقة، مصر. من ٢٠١٥، فريق من ٢٢+ متخصص في الاستراتيجية والتصميم والتطوير بيساعد البراندات تكبر من خلال SEO والبراند والويب والإعلانات المدفوعة. بنقيس النتايج مش بس الشغل.'

ar['Get your free strategy audit'] = 'احصل على تقييمك الاستراتيجي المجاني'
ar['View case studies'] = 'شوف دراسات الحالة'
ar['See details'] = 'شوف التفاصيل'
ar['Not exported yet. Request this file from the design team.'] =
  'الملف لسه مش متاح. اطلبه من فريق التصميم.'
ar['Translation loading issue'] = 'مشكلة في تحميل الترجمة'
ar['We could not load translations. Refresh the page and try again.'] =
  'مقدرناش نحمّل الترجمة. حدّث الصفحة وجرب تاني.'
ar['Refresh page'] = 'حدّث الصفحة'

function stripEmDash(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/\s*[—–]\s*/g, (m) =>
        m.includes('–') && /\d/.test(obj) && /mm|gsm|px/.test(obj) ? ' ' : ', ',
      )
      .replace(/—/g, ', ')
  }
  if (Array.isArray(obj)) return obj.map(stripEmDash)
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) obj[k] = stripEmDash(obj[k])
  }
  return obj
}

fs.writeFileSync(enPath, JSON.stringify(stripEmDash(en), null, 2) + '\n')
fs.writeFileSync(arPath, JSON.stringify(stripEmDash(ar), null, 2) + '\n')
console.log('Updated brand i18n')
