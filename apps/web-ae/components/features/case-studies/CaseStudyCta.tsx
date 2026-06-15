import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '@/lib/data/case-studies'
import { Container } from '@/components/layout/Container'

interface Props {
  cs: CaseStudy
}

export function CaseStudyCta({ cs }: Props) {
  const serviceHref = cs.ctaServiceSlug ? `/services#${cs.ctaServiceSlug}` : '/services'

  return (
    <section aria-label="Get started" className="py-12 sm:py-16 bg-brand-navy">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-white mb-4">
            Want results like {cs.client}?
          </h2>
          <p className="text-[15px] text-white/75 leading-relaxed mb-8">
            We specialise in {cs.service.toLowerCase()} for hospitality and tourism brands across the UAE and Gulf.
            Book a free strategy call and we will map a plan for your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              data-ripple=""
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150"
            >
              Book a strategy call
              <ArrowRight size={15} />
            </Link>
            <Link
              href={serviceHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white border border-white/25 hover:bg-white/10 transition-colors"
            >
              Explore {cs.service}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
