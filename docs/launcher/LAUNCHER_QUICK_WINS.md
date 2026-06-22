# Launcher App - Quick Wins (Do This Week!)

## 10 Changes That Take <2 Hours, Maximum Impact

---

## 1. FIX MISLEADING "LIVE" STATUS BADGES ⭐ (15 min)

**Current Problem:** All 9 modules show green "Live" badge but most don't work

**File:** `apps/launcher/app/(app)/page.tsx` (Line 93)

**Change:**

```typescript
// OLD
<span className="mt-3 inline-block rounded-md bg-brand-success/15 px-2 py-0.5 text-[11px] font-bold text-brand-success">
  {status}
</span>

// NEW - Map status to real colors
const statusConfig = {
  'Live': { bg: 'bg-green-500/15', text: 'text-green-600' },
  'In Progress': { bg: 'bg-blue-500/15', text: 'text-blue-600' },
  'Coming Soon': { bg: 'bg-gray-500/15', text: 'text-gray-600' },
}

const config = statusConfig[status]

<span className={`mt-3 inline-block rounded-md ${config.bg} px-2 py-0.5 text-[11px] font-bold ${config.text}`}>
  {status}
</span>
```

**Update Module List:**

```typescript
const modules = [
  {
    name: "Tasks",
    href: "/tasks",
    description: "Kanban board, inline timers.",
    icon: CheckSquare,
    status: "In Progress",
  },
  {
    name: "Time",
    href: "/time",
    description: "Timesheet, leave, capacity, approvals.",
    icon: Clock,
    status: "Live",
  },
  {
    name: "CRM",
    href: "/crm",
    description: "Clients, invoices, quotations.",
    icon: Building2,
    status: "In Progress",
  },
  {
    name: "Finance",
    href: "/finance",
    description: "Cash flow, currencies, ledger.",
    icon: Wallet,
    status: "Coming Soon",
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    description: "XP levels, streaks, podium.",
    icon: Trophy,
    status: "Coming Soon",
  },
  {
    name: "AI Tools",
    href: "/ai",
    description: "Prompt Studio, variable templates.",
    icon: Bot,
    status: "In Progress",
  },
  {
    name: "Chat",
    href: "/chat",
    description: "Channels, realtime (Redis + WS).",
    icon: MessageSquare,
    status: "In Progress",
  },
  {
    name: "Automation",
    href: "/automation",
    description: "Workflow triggers and test runs.",
    icon: Workflow,
    status: "In Progress",
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    description: "Proposals and live campaigns.",
    icon: Megaphone,
    status: "In Progress",
  },
];
```

---

## 2. ADD TOAST NOTIFICATIONS (20 min)

**File:** `app/layout.tsx`

**Add:**

```typescript
// Import at top
import { ToastProvider } from '@/components/ui/Toast'

// Wrap children
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${rootFontClassName} font-sans antialiased bg-brand-canvas text-brand-text`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
```

**Use in any component:**

```typescript
import { useToast } from "@/components/ui/Toast";

function MyComponent() {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      toast("success", "Task deleted successfully");
    } catch (error) {
      toast("error", "Failed to delete task");
    }
  };
}
```

---

## 3. SECURE SIDEBAR COLLAPSE (10 min)

**Problem:** localStorage can be accessed by XSS attacks

**File:** `apps/launcher/app/(app)/_shell/app-shell.tsx` (Line 35-46)

**Change localStorage to cookie:**

```typescript
// OLD
useEffect(() => {
  setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
}, []);

// NEW - Use cookies instead
import { getCookie, setCookie } from "@/lib/auth/cookie";

useEffect(() => {
  const collapsed = getCookie(COLLAPSE_KEY) === "1";
  setCollapsed(collapsed);
}, []);

const toggleCollapsed = useCallback(() => {
  setCollapsed((c) => {
    const next = !c;
    setCookie(COLLAPSE_KEY, next ? "1" : "0", {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
    return next;
  });
}, []);
```

---

## 4. ADD LOADING SKELETON TO DASHBOARD (15 min)

**File:** `apps/launcher/app/(app)/page.tsx`

**Make it async and add streaming:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { SkeletonCard } from '@/components/ui/Skeleton'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="h-8 w-32 bg-brand-surface animate-pulse rounded" />
          <div className="mt-4 h-10 w-64 bg-brand-surface animate-pulse rounded" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ... existing content ...
}
```

---

## 5. UPDATE DASHBOARD MESSAGE (5 min)

**File:** `apps/launcher/app/(app)/page.tsx` (Line 55-59)

**Current:**

```typescript
<p className="mt-2 max-w-2xl text-[14px] text-brand-text-muted">
  All core modules are live locally. Production deploy is pending — jump in below or press{' '}
  <kbd className="rounded border border-brand-whisper-border px-1.5 py-0.5 text-[11px] font-semibold">⌘K</kbd>{' '}
  to search.
</p>
```

**New (Honest):**

```typescript
<p className="mt-2 max-w-2xl text-[14px] text-brand-text-muted">
  <strong>Foundation Phase Complete:</strong> Auth, database, and navigation are production-ready.
  Most modules are still in development — explore them below or press{' '}
  <kbd className="rounded border border-brand-whisper-border px-1.5 py-0.5 text-[11px] font-semibold">⌘K</kbd>{' '}
  to search.
</p>
```

---

## 6. ADD EMPTY STATE MESSAGE (10 min)

**File:** `apps/launcher/app/(app)/tasks/page.tsx`

**Add to task page:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { EmptyState } from '@/components/ui/EmptyState'
import { CheckSquare } from 'lucide-react'

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    // Simulate loading
    setIsLoading(false)
  }

  if (tasks.length === 0 && !isLoading) {
    return (
      <div className="p-8">
        <EmptyState
          icon={CheckSquare}
          title="No tasks yet"
          description="Create your first task to get started with the task manager."
          action={{
            label: 'Create Task',
            onClick: () => {
              // Open create task dialog
            },
          }}
        />
      </div>
    )
  }

  // ... existing content ...
}
```

---

## 7. FIX ACCESSIBILITY: ADD ARIA LABELS (20 min)

**File:** `apps/launcher/app/(app)/_shell/app-shell.tsx`

**Update Topbar:**

```typescript
// OLD
<button
  type="button"
  onClick={onOpenMobile}
  className="text-brand-text-muted transition-colors hover:text-brand-text lg:hidden"
>
  <Menu size={20} />
</button>

// NEW
<button
  type="button"
  onClick={onOpenMobile}
  className="text-brand-text-muted transition-colors hover:text-brand-text lg:hidden focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
  aria-label="Open navigation menu"
  aria-expanded={mobileOpen}
  aria-controls="mobile-nav"
>
  <Menu size={20} aria-hidden="true" />
</button>
```

---

## 8. ADD BASIC ERROR HANDLING (15 min)

**File:** `apps/launcher/app/api/tasks/route.ts`

```typescript
// Current: No error handling
export async function POST(request: Request) {
  const data = await request.json();
  const task = await prisma.tasks.create({ data });
  return Response.json(task);
}

// NEW: With error handling
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate input
    if (!data.title || data.title.trim().length === 0) {
      return Response.json(
        { error: "Task title is required" },
        { status: 400 },
      );
    }

    const task = await prisma.tasks.create({ data });
    return Response.json(task);
  } catch (error) {
    console.error("Task creation error:", error);
    return Response.json({ error: "Failed to create task" }, { status: 500 });
  }
}
```

---

## 9. IMPROVE TOUCH TARGET SIZES (15 min)

**File:** Multiple component files

**Issue:** Many buttons/links < 48px

**Quick Fix Pattern:**

```typescript
// OLD
<button className="px-2.5 py-2 text-[13px]">Click</button>

// NEW - Min 44px height on mobile
<button className="px-3 py-2.5 text-sm min-h-11">Click</button>

// Or use size prop
<Button size="md" />  <!-- Already 44px -->
```

**Search & Replace in your editor:**

```
Find: className="px-2.5 py-2 text-\[13px\]"
Replace: className="px-3 py-2.5 text-sm min-h-11"
```

---

## 10. ADD .env.example (5 min)

**Create:** `apps/launcher/.env.example`

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/launcher

# Auth
JWT_SECRET=your-secret-key-here-min-32-chars
SESSION_COOKIE_NAME=launcher_session
SESSION_COOKIE_MAX_AGE=86400

# Email (if using)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis (for real-time features)
REDIS_URL=redis://localhost:6379
REDIS_TOKEN=optional-token

# External APIs
OPENAI_API_KEY=sk-...
STRIPE_API_KEY=sk_live_...

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Add to .gitignore:**

```
.env
.env.local
.env.*.local
```

---

## Checklist: Do These NOW ✅

- [ ] Fix module status badges (honest colors)
- [ ] Add Toast provider to layout
- [ ] Update dashboard message
- [ ] Add loading skeletons
- [ ] Fix localStorage → cookie
- [ ] Add ARIA labels to buttons
- [ ] Add error handling to one API endpoint
- [ ] Add empty state to one page
- [ ] Check button sizes on mobile
- [ ] Create .env.example

**Estimated Time:** 1.5 - 2 hours total

**Impact:**

- ✅ More honest communication with users
- ✅ Better error feedback
- ✅ Improved accessibility
- ✅ Enhanced visual feedback
- ✅ Security improvements

---

## After Quick Wins

Once you complete these quick wins:

1. **Run accessibility audit:**

   ```bash
   npm install -D @axe-core/react
   npm run test:a11y
   ```

2. **Check performance:**

   ```bash
   npm run build
   npm run start
   # Then run Lighthouse audit
   ```

3. **Test on real device:**
   - iPhone Safari
   - Android Chrome
   - Tablet
   - Different network speeds

4. **Get team feedback:**
   - Does the status badges feel more accurate?
   - Do error messages help?
   - Are buttons easy to tap?

---

## Template: Weekly Progress

**Week of June 20:**

- [x] Complete quick wins (10 items)
- [x] Test on mobile
- [ ] Start Phase 1: Task creation workflow
- [ ] Add 5 more unit tests

**Week of June 27:**

- [ ] Complete task CRUD operations
- [ ] Add form validation framework
- [ ] Implement loading states for all modules
- [ ] Get design review

**Week of July 4:**

- [ ] Complete Phase 2: UX Polish
- [ ] Accessibility audit + fixes
- [ ] Performance optimization
- [ ] Security audit

---

**Remember:** Ship early, ship often. These quick wins build momentum and make users feel heard. ✨
