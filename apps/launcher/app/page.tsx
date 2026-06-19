import { CheckSquare, Clock, Database, ShieldCheck, Rocket } from 'lucide-react'

const phase1Apps = [
  {
    name: 'Task Management',
    description: 'Kanban board, CRUD, comments, real-time sync.',
    icon: CheckSquare,
    status: 'Week 3–4',
  },
  {
    name: 'Time Management',
    description: 'Time entry, weekly utilization, calendar sync.',
    icon: Clock,
    status: 'Week 3',
  },
]

const foundation = [
  { label: 'Database schema (Prisma baseline)', icon: Database, done: true },
  { label: 'Authentication (JWT, RBAC)', icon: ShieldCheck, done: false },
  { label: 'App scaffold + CI', icon: Rocket, done: true },
]

export default function LauncherHome() {
  return (
    <main className="min-h-screen px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">
          launcher.mediabubble.co
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-text lg:text-4xl">
          MediaBubble Operations Platform
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-brand-text-muted">
          Phase 1 foundation — database, authentication, API, and the first two
          MVP apps. This shell is the Week 1 deliverable; functionality lands in
          the following weeks.
        </p>

        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-brand-text-muted">
            Foundation
          </h2>
          <ul className="mt-3 space-y-2">
            {foundation.map(({ label, icon: Icon, done }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-brand-whisper-border bg-brand-surface px-4 py-3"
              >
                <Icon size={16} className="shrink-0 text-brand-blue" />
                <span className="flex-1 text-[14px] text-brand-text">{label}</span>
                <span
                  className={`text-[11px] font-bold ${done ? 'text-brand-success' : 'text-brand-text-muted'}`}
                >
                  {done ? 'Ready' : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-brand-text-muted">
            Phase 1 apps
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {phase1Apps.map(({ name, description, icon: Icon, status }) => (
              <div
                key={name}
                className="rounded-xl border border-brand-whisper-border bg-brand-surface p-5"
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} className="text-brand-blue" />
                  <h3 className="text-[15px] font-bold text-brand-text">{name}</h3>
                </div>
                <p className="mt-2 text-[13px] text-brand-text-muted">{description}</p>
                <span className="mt-3 inline-block rounded-md bg-brand-yellow/[0.14] px-2 py-0.5 text-[11px] font-bold text-brand-text">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
