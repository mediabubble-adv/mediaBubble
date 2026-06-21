import { Rocket } from 'lucide-react'

// Centered card chrome shared by every auth page (/login, /signup, …).
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card">
            <Rocket size={20} className="text-primary" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            launcher.mediabubble.co
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/20">
          {children}
        </div>
      </div>
    </main>
  )
}
