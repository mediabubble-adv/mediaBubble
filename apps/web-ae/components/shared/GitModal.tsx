'use client'

import { useEffect, useRef } from 'react'
import { X, Github, GitBranch, Zap, Shield } from 'lucide-react'
import { trackGitModalOpened, trackGitModalCtaClicked } from '@mediabubble/shared/client'

const FEATURES = [
  { icon: GitBranch, text: 'Connect your repositories in minutes' },
  { icon: Zap,       text: 'Automated deployments on every push' },
  { icon: Shield,    text: 'Branch-based preview environments' },
  { icon: Github,    text: 'Works with GitHub, GitLab & Bitbucket' },
]

interface GitModalProps {
  open: boolean
  onClose: () => void
}

export function GitModal({ open, onClose }: GitModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Track open event once per trigger
  useEffect(() => {
    if (open) {
      trackGitModalOpened()
      requestAnimationFrame(() => closeButtonRef.current?.focus())
    }
  }, [open])

  // Esc to close + focus trap
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }

      if (e.key === 'Tab') {
        const modal = document.getElementById('git-modal-dialog')
        if (!modal) return
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])',
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="git-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="git-modal-title"
        className="fixed inset-0 z-[400] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[420px] pointer-events-auto animate-scale-in overflow-hidden">

          <div className="h-1.5 w-full bg-brand-navy" />

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close GitHub integration modal"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-brand-charcoal/40 hover:text-brand-charcoal hover:bg-brand-canvas transition-colors"
          >
            <X size={18} />
          </button>

          <div className="px-7 pt-6 pb-7">
            <div className="w-11 h-11 rounded-xl bg-brand-navy/10 flex items-center justify-center mb-4">
              <Github className="text-brand-navy" size={22} />
            </div>

            <h2
              id="git-modal-title"
              className="font-display text-[1.35rem] font-bold text-brand-navy leading-tight mb-1.5"
            >
              GitHub Integration
            </h2>
            <p className="text-[14px] text-brand-charcoal/60 mb-5">
              Connect your repositories for streamlined development and seamless deployments.
            </p>

            <ul className="space-y-3 mb-7" role="list" aria-label="Integration features">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-yellow/15 flex items-center justify-center">
                    <Icon size={14} className="text-brand-navy" />
                  </span>
                  <span className="text-[14px] text-brand-charcoal/80">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <a
                href="/services#web"
                onClick={trackGitModalCtaClicked}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-navy text-white text-[14px] font-semibold hover:bg-[#0a2a66] active:scale-[0.98] transition-all duration-150 shadow-md shadow-brand-navy/20"
              >
                <Github size={15} />
                Explore
              </a>
              <button
                onClick={onClose}
                className="flex-1 px-5 py-3 rounded-xl border-2 border-brand-whisper-border text-brand-charcoal/70 text-[14px] font-semibold hover:bg-brand-canvas active:scale-[0.98] transition-all duration-150"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
