'use client'

import type { IconType } from 'react-icons'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa6'
import {
  FOOTER_SOCIAL_ORDER,
  MEDIABUBBLE_SOCIAL_HREFS,
  type MediabubbleSocialId,
} from '../social-links'
import { useI18n } from '../i18n/I18nProvider'

const SOCIAL_ICONS: Record<MediabubbleSocialId, IconType> = {
  github: FaGithub,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
}

/** Per-platform hover accent on the dark footer. */
const SOCIAL_ACCENT: Record<MediabubbleSocialId, string> = {
  github: 'hover:text-white hover:border-white/25 hover:bg-white/10',
  facebook: 'hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/12',
  instagram: 'hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/12',
  linkedin: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/12',
  tiktok: 'hover:text-[#69C9D0] hover:border-[#69C9D0]/40 hover:bg-[#69C9D0]/12',
}

const LABEL_KEYS: Record<MediabubbleSocialId, string> = {
  github: 'footer.social.github',
  facebook: 'footer.social.facebook',
  instagram: 'footer.social.instagram',
  linkedin: 'footer.social.linkedin',
  tiktok: 'footer.social.tiktok',
}

const LABEL_FALLBACKS: Record<MediabubbleSocialId, string> = {
  github: 'View on GitHub',
  facebook: 'Follow on Facebook',
  instagram: 'Follow on Instagram',
  linkedin: 'Connect on LinkedIn',
  tiktok: 'Follow on TikTok',
}

export function FooterSocialLinks() {
  const { t } = useI18n()

  return (
    <ul
      className="flex flex-wrap items-center gap-2.5 pt-1"
      aria-label={t('footer.social.heading', 'Follow Us')}
    >
      {FOOTER_SOCIAL_ORDER.map((id) => {
        const Icon = SOCIAL_ICONS[id]
        const href = MEDIABUBBLE_SOCIAL_HREFS[id]
        const label = t(LABEL_KEYS[id], LABEL_FALLBACKS[id])

        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={[
                'group flex size-10 items-center justify-center rounded-full border border-white/10',
                'bg-white/[0.03] text-[17px] text-white/50',
                'transition-all duration-200 ease-out',
                'hover:scale-105 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]',
                SOCIAL_ACCENT[id],
              ].join(' ')}
            >
              <Icon className="shrink-0" aria-hidden />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
