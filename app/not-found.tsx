import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF5FB] via-[#F4F8FE] to-white flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 w-16 h-16 rounded-2xl bg-[#072A6B] flex items-center justify-center mx-auto">
        <Image src="/assets/logo-white.svg" alt="" width={36} height={36} />
      </div>

      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
        404
      </p>
      <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[#072A6B] leading-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-[16px] text-[#666] leading-relaxed mb-8 max-w-md">
        The page you were looking for does not exist or may have moved. Let&apos;s get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-[#072A6B] text-white hover:bg-[#0A3580] active:scale-[0.97] transition-all duration-150"
        >
          Go to Homepage
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold border-2 border-[#072A6B]/20 text-[#072A6B] hover:border-[#072A6B] hover:bg-[#072A6B]/[0.04] active:scale-[0.97] transition-all duration-150"
        >
          Contact Us
        </Link>
      </div>

      <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Quick links">
        {[
          { label: 'Services',  href: '/services'  },
          { label: 'About',     href: '/about'     },
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'Blog',      href: '/blog'      },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-[13px] text-[#2196F3] hover:text-[#1565C0] hover:underline transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
