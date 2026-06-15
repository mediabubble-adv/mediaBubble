#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const root = path.resolve(import.meta.dirname, '..')
const arPath = path.join(root, 'apps/web-eg/public/locales/ar/translation.json')
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'))

const CTA = 'احصل على تقييمك الاستراتيجي المجاني'

Object.assign(ar.common, {
  getAudit: CTA,
  learnMore: 'شوف التفاصيل',
  viewCaseStudies: 'شوف دراسات الحالة',
  getStarted: 'احجز مكالمة مجانية',
  sendMessage: 'ابعت الرسالة',
  readMore: 'اقرأ المقال',
})
ar.common.actions.submit = 'ابعت الرسالة'

ar.nav.getAudit = CTA
ar.nav.logoAlt = 'ميديابابل، وكالة تسويق الغردقة'

Object.assign(ar.hero.home, {
  subtitle:
    'من الاستراتيجية للتنفيذ، بنساعد شركات الغردقة تكبر أسرع، تترتّب أعلى، وتحوّل أكتر.',
  description:
    'من ٢٠١٥، ساعدنا +٢٠٠ براند في SEO والبراند والويب والإعلانات المدفوعة. بنقيس النتايج مش بس الشغل.',
  cta: CTA,
  ctaSecondary: 'شوف دراسات الحالة',
})

Object.assign(ar.about.hero, {
  title: 'تسويق مبني لشركات الغردقة',
  subtitle:
    'وكالة متكاملة بتساعد البراندات المحلية تكبر باستراتيجية واضحة ونتايج قابلة للقياس.',
})
Object.assign(ar.about.story, {
  body: 'ميديابابل بدأت في الغردقة سنة ٢٠١٥ بهدف واحد: تدي شركات البحر الأحمر جودة تسويق زي القاهرة ودبي، من غير تكلفة الوكالات الكبيرة. النهارده بنشتغل مع فنادق ومطاعم وعقارات وصحة وتجزئة في مصر والخليج.',
  body2:
    'بنفضل صغار بالقصد. كل عميل بياخد فريق مخصص، تواصل مباشر مع اللي بياخدوا القرار، وتقارير تقدر تستخدمها فعلاً.',
})
Object.assign(ar.about.values.creative, {
  def: 'شغل بيستاهل الانتباه لأنه واضح، على البراند، ومبني يحوّل.',
})
Object.assign(ar.about.values.strategic, {
  def: 'كل قرار مربوط بهدف. بنوافق الإبداع والكلام والميديا على اللي محتاج تحققه.',
})
Object.assign(ar.about.values.dataDriven, {
  def: 'بنحدد أهداف قبل ما نصرف. الحملات مربوطة بإيرادات أو leads أو حجوزات تقدر تتابعها.',
})

ar.services.hero.subtitle =
  'SEO وبراند وويب ومحتوى وإعلانات مدفوعة. فريق واحد، خطة واحدة، تقارير واضحة.'
ar.services.web.description =
  'مواقع سريعة وموبايل الأول، مبنية تحوّل الزوار لعملاء محتملين وحجوزات.'
ar.services.content.description =
  'مقالات ومحتوى سوشيال وإيميل بيجيب الترافيك المناسب ويخلي جمهورك متفاعل.'
ar.services.events.description =
  'براندينج فعاليات وترويج وتغطية في الموقع بيملّي القاعات ويبني سمعتك.'
ar.services.seo.description = ar.services.seo.description.replace(
  ' — ',
  '، ',
)
ar.services.cta.primary = CTA
ar.services.cta.secondary = 'شوف دراسات الحالة'

Object.assign(ar.process.heading, {
  kicker: 'إزاي بنشتغل',
  title: 'أربع خطوات من البريف للنتايج',
  subtitle:
    'اكتشاف، استراتيجية، تنفيذ، وإطلاق. كل خطوة ليها deliverable واضح ومسؤول.',
})
Object.assign(ar.process.step1, {
  title: 'اكتشاف',
  description:
    'بنراجع السوق والمنافسين وتسويقك الحالي. هتاخد brief مكتوب فيه الأولويات وquick wins.',
})
Object.assign(ar.process.step2, {
  title: 'استراتيجية',
  description:
    'بنحدد الأهداف والقنوات والميزانية والـ KPIs. بتاعتمد الخطة قبل ما نبني أي حاجة.',
})
Object.assign(ar.process.step3, {
  title: 'تنفيذ',
  description:
    'تصميم ومحتوى وإعلانات وتطوير بيشتغلوا مع بعض مع متابعة أسبوعية وخط زمني مشترك.',
})
Object.assign(ar.process.step4, {
  title: 'إطلاق ونمو',
  description:
    'بنطلق، بنتابع الأداء، وبنحسّن شهرياً. هتاخد تقارير تقدر تستخدمها في اجتماعات الإدارة.',
})
ar.process.footer.tagline = 'جاهز تبدأ؟ احجز تقييمك الاستراتيجي المجاني.'

Object.assign(ar.showcase.heading, {
  kicker: 'شغل مختار',
  title: 'نتايج عملاء حديثة',
  subtitle: 'تلات شركات في الغردقة. أرقام حقيقية من حملات شغالة.',
})
Object.assign(ar.showcase.project1, {
  poeticTitle: 'كورال باي ريزورت',
  description:
    'SEO وإعلانات مدفوعة لسلسلة فنادق ٤ نجوم. الحجوزات المباشرة زادت ٦٨٪ في ست شهور.',
  metric: '٦٨٪ زيادة في الحجوزات المباشرة',
})
Object.assign(ar.showcase.project2, {
  poeticTitle: 'ريد سي دايفرز',
  description:
    'SEO محلي وتسويق محتوى. الترافيك العضوي زاد ٣٤٠٪ في تمان شهور.',
  metric: '٣٤٠٪ نمو في الترافيك العضوي',
})
Object.assign(ar.showcase.project3, {
  poeticTitle: 'أكوا سبورتس مصر',
  description:
    'تجديد براند وموقع جديد. حجم العملاء المحتملين اتضاعف في الربع الأول.',
  metric: 'ضعف حجم العملاء في الربع الأول',
})
ar.showcase.cta.explore = 'شوف دراسة الحالة'
ar.showcase.cta.viewAll = 'شوف كل دراسات الحالة'

ar.portfolio.empty.body =
  'بنجهّز دراسات حالة جديدة. ارجع قريب أو تواصل معانا عشان نتكلم عن مشروعك.'
ar.portfolio.cta.primary = CTA

ar.blog.hero.subtitle =
  'نصايح تسويق عملية لشركات الغردقة والبحر الأحمر. من غير كلام فاضي.'
ar.blog.newsletter.body =
  'نصايح شهرية ودراسات حالة محلية وتحليلات استراتيجية في إيميلك. من غير سبام.'
ar.blog.empty.body = 'ارجع قريب. بننشر محتوى جديد كل أسبوع.'

Object.assign(ar.contact.hero, {
  subtitle:
    'قولنا عن شغلك. هنراجع تسويقك ونرد خلال يوم عمل واحد.',
})
Object.assign(ar.contact.form, {
  submit: 'ابعت الرسالة',
  submitting: 'بيتبعت…',
  sending: 'بيتبعت…',
  required: 'من فضلك املأ الحقل ده',
  invalidEmail: 'اكتب بريد إلكتروني صحيح',
  successHeading: 'هنتواصل معاك قريب',
  successBody: 'شكراً على تواصلك. بنرد في العادة خلال يوم عمل واحد.',
  errorHeading: 'في حاجة غلط',
  errorBody: 'مقدرناش نبعت رسالتك. جرّب تاني أو ابعت إيميل مباشرة.',
  optional: 'اختياري',
  firstNamePlaceholder: 'الاسم الأول',
  lastNamePlaceholder: 'اسم العائلة',
  emailPlaceholder: 'you@yourbusiness.com',
  phonePlaceholder: '+20 1xx xxx xxxx',
  serviceLabel: 'إزاي نقدر نساعدك؟',
  servicePlaceholder: 'اختار خدمة',
  messagePlaceholder: 'قولنا عن شغلك وأهدافك',
  error: {
    required: 'من فضلك املأ الحقل ده',
    email: 'اكتب بريد إلكتروني صحيح',
  },
})
Object.assign(ar.contact.info, {
  kicker: 'يالا نتكلم',
  title: CTA,
  subtitle:
    'قولنا عن شغلك. هنراجع تسويقك الحالي ونرد بخطة أولويات. مجاني، من غير التزام.',
  emailLabel: 'الإيميل',
  phoneLabel: 'التليفون',
  addressLabel: 'المكتب',
  hoursLabel: 'مواعيد العمل',
  hours: 'الأحد للخميس، ٩ صباحاً لـ ٦ مساءً (توقيت مصر)',
})
ar.contact.error = {
  title: 'في حاجة غلط',
  body: 'مقدرناش نبعت رسالتك. جرّب تاني أو ابعت إيميل مباشرة.',
  retry: 'جرّب تاني',
}
ar.contact.success = {
  title: 'هنتواصل معاك قريب',
  body: 'شكراً على تواصلك. بنرد في العادة خلال يوم عمل واحد.',
}

ar.footer.company.tagline =
  'وكالة تسويق في الغردقة. SEO وبراند وويب وإعلانات بنتايج تقدر تقيسها.'

Object.assign(ar.seo.home, {
  title: 'ميديابابل | وكالة تسويق الغردقة',
  description:
    'وكالة تسويق متكاملة في الغردقة، مصر. SEO وبراند وتطوير ويب وإعلانات مدفوعة لشركات البحر الأحمر.',
})
ar.seo.about.description =
  'اتعرّف على فريق ميديابابل. خبراء تسويق في الغردقة بيساعدوا شركات البحر الأحمر تكبر من ٢٠١٥.'

Object.assign(ar.errors['404'], {
  heading: 'الصفحة دي اتنقلت أو مش موجودة',
  body: 'الصفحة اللي بتدوّر عليها ممكن تكون اتنقلت أو اتحذفت. ارجع للصفحة الرئيسية.',
})
ar.errors.form.required = 'من فضلك املأ الحقل ده'
ar.errors.form.email = 'اكتب بريد إلكتروني صحيح'

Object.assign(ar.cta, {
  primary: CTA,
  secondary: 'شوف دراسات الحالة',
  audit: CTA,
})

ar.cookieConsent = {
  title: 'بنستخدم كوكيز',
  body: 'بنستخدم كوكيز عشان نحسّن تجربتك، نحلّل الزيارات، ونفتكر لغتك.',
  learnMore: 'سياسة الكوكيز',
  accept: 'موافق',
  decline: 'رفض',
  close: 'إغلاق',
}

function stripEmDashInStrings(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/\s*[—–]\s*/g, (m) => (m.includes('–') && /\d/.test(obj) ? ' لـ ' : '، '))
      .replace(/ — /g, '، ')
      .replace(/—/g, '، ')
  }
  if (Array.isArray(obj)) return obj.map(stripEmDashInStrings)
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) obj[k] = stripEmDashInStrings(obj[k])
  }
  return obj
}

const cleaned = stripEmDashInStrings(ar)
const json = JSON.stringify(cleaned, null, 2).replace(/, ,/g, '، ') + '\n'
fs.writeFileSync(arPath, json)
console.log('Wrote', arPath)
