import { Building2 } from 'lucide-react'

// Minimal chrome for external client portal pages (no staff sidebar).
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
            <Building2 size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              MediaBubble client portal
            </p>
            <p className="text-[13px] text-muted-foreground">Secure access for your account team</p>
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
