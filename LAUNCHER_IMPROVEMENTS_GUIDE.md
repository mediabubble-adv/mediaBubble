# Launcher App - Implementation Improvement Guide
## Step-by-Step Solutions for Functionality, UX & Security

---

## 1. CREATE COMPONENT LIBRARY

### 1.1 Base UI Components

#### Create: `components/ui/Button.tsx`
```typescript
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-sm',
        secondary: 'bg-brand-surface text-brand-text border border-brand-whisper-border hover:bg-brand-canvas',
        ghost: 'text-brand-text hover:bg-brand-canvas',
        danger: 'bg-red-500/15 text-red-600 hover:bg-red-500/25',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  loadingText?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, loadingText, children, disabled, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      ref={ref}
      {...props}
    >
      {isLoading ? loadingText || 'Loading…' : children}
    </button>
  )
)
Button.displayName = 'Button'
```

#### Create: `components/ui/Input.tsx`
```typescript
import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ReactNode
  label?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, icon, label, ...props }, ref) => {
    const id = props.id || props.name
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-brand-text">
            {label}
            {props.required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              'w-full rounded-lg border px-4 py-2 text-sm text-brand-text transition-colors',
              'bg-brand-surface placeholder:text-brand-text-muted',
              'border-brand-input-border focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue/50',
              error && 'border-red-500 focus:ring-red-500/50',
              icon && 'pl-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted">{icon}</div>}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
```

#### Create: `components/ui/Skeleton.tsx`
```typescript
import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-brand-surface', className)}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 && 'w-3/4' // Last line shorter
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-lg border border-brand-whisper-border bg-brand-surface p-4">
      <Skeleton className="h-6 w-1/2" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}
```

#### Create: `components/ui/Toast.tsx`
```typescript
'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
  action?: { label: string; onClick: () => void }
}

const ToastContext = createContext<{
  toast: (type: ToastType, message: string, action?: Toast['action']) => void
}>({
  toast: () => {},
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (type: ToastType, message: string, action?: Toast['action']) => {
    const id = Math.random().toString(36)
    setToasts((prev) => [...prev, { id, type, message, action }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

function Toast({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: <CheckCircle2 size={18} className="text-green-500" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-blue-500" />,
    warning: <AlertCircle size={18} className="text-yellow-500" />,
  }

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    info: 'bg-blue-500/10 border-blue-500/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
  }

  return (
    <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${bgColors[toast.type]} max-w-sm`}>
      {icons[toast.type]}
      <div className="flex-1">
        <p className="text-sm text-brand-text">{toast.message}</p>
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-1 text-xs font-medium underline hover:no-underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-brand-text-muted hover:text-brand-text"
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  )
}
```

#### Create: `components/ui/EmptyState.tsx`
```typescript
import { LucideIcon } from 'lucide-react'
import { Button } from './Button'

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-whisper-border bg-brand-surface/50 px-6 py-12">
      <Icon size={40} className="text-brand-text-muted/50 mb-4" />
      <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
      {description && <p className="mt-1 text-sm text-brand-text-muted text-center max-w-sm">{description}</p>}
      {action && (
        <Button variant="primary" size="sm" onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  )
}
```

---

## 2. CREATE FORM VALIDATION SYSTEM

#### Create: `lib/validation/schemas.ts`
```typescript
import { z } from 'zod'

// Reusable validators
export const emailSchema = z.string().email('Invalid email address')
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[0-9]/, 'Must contain number')

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date().optional(),
  assignedTo: z.string().uuid().optional(),
})

export type TaskInput = z.infer<typeof taskSchema>
```

#### Create: `components/form/FormField.tsx`
```typescript
'use client'

import { ReactNode } from 'react'
import { FieldValues, FieldPath, UseFormRegisterReturn } from 'react-hook-form'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  description?: string
  children: ReactNode
  htmlFor?: string
}

export function FormField({
  label,
  error,
  required,
  description,
  children,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-brand-text">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {description && <p className="text-xs text-brand-text-muted">{description}</p>}
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
```

---

## 3. FIX LOADING STATES

#### Create: `components/layout/LoadingState.tsx`
```typescript
import { SkeletonCard } from '@/components/ui/Skeleton'

export interface LoadingStateProps {
  count?: number
  variant?: 'card' | 'list' | 'grid'
}

export function LoadingState({ count = 3, variant = 'card' }: LoadingStateProps) {
  if (variant === 'list') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid gap-4 ${variant === 'grid' ? 'grid-cols-2 md:grid-cols-3' : ''}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
```

#### Update: Dashboard Page with Loading States
```typescript
// apps/launcher/app/(app)/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LoadingState } from '@/components/layout/LoadingState'
import { EmptyState } from '@/components/ui/EmptyState'
import { CheckSquare } from 'lucide-react'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingState count={6} variant="grid" />
  }

  const modules = [
    // ... existing modules
  ]

  return (
    <div className="px-6 py-8 lg:px-8">
      {/* ... existing content ... */}
    </div>
  )
}
```

---

## 4. ADD ERROR BOUNDARIES

#### Create: `components/layout/ErrorBoundary.tsx`
```typescript
'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught:', error)
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.reset) || (
          <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <AlertTriangle size={40} className="text-red-500 mb-2" />
            <h2 className="text-lg font-semibold text-red-900">Something went wrong</h2>
            <p className="mt-1 text-sm text-red-700">{this.state.error.message}</p>
            <Button
              variant="primary"
              size="sm"
              onClick={this.reset}
              className="mt-4"
            >
              Try again
            </Button>
          </div>
        )
      );
    }

    return this.props.children
  }
}
```

---

## 5. IMPROVE FORM HANDLING

#### Create: `components/form/TaskForm.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from './FormField'
import { taskSchema, type TaskInput } from '@/lib/validation/schemas'
import { useToast } from '@/components/ui/Toast'

export function TaskForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
  })
  const { toast } = useToast()

  const onSubmit = async (data: TaskInput) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create task')

      toast('success', 'Task created successfully')
      onSuccess?.()
    } catch (error) {
      toast('error', error instanceof Error ? error.message : 'Failed to create task')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Task Title" required error={errors.title?.message}>
        <Input {...register('title')} placeholder="Enter task title" />
      </FormField>

      <FormField
        label="Priority"
        required
        error={errors.priority?.message}
      >
        <select
          {...register('priority')}
          className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2 text-brand-text"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </FormField>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          {...register('description')}
          placeholder="Enter task description (optional)"
          className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2 text-brand-text"
          rows={4}
        />
      </FormField>

      <Button
        type="submit"
        isLoading={isSubmitting}
        loadingText="Creating…"
      >
        Create Task
      </Button>
    </form>
  )
}
```

---

## 6. ACCESSIBILITY IMPROVEMENTS

#### Update: Navigation with ARIA
```typescript
// apps/launcher/app/(app)/_shell/app-shell.tsx - Topbar Component

function Topbar({
  user,
  onOpenPalette,
  onOpenMobile,
}: {
  user: ShellUser
  onOpenPalette: () => void
  onOpenMobile: () => void
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-brand-whisper-border bg-brand-canvas/80 px-4 backdrop-blur">
      <button
        type="button"
        onClick={onOpenMobile}
        className="text-brand-text-muted transition-colors hover:text-brand-text lg:hidden focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
        aria-label="Open navigation menu"
        aria-expanded={isMobileOpen}
        aria-controls="mobile-nav"
      >
        <Menu size={20} />
      </button>

      <button
        type="button"
        onClick={onOpenPalette}
        className="flex h-9 max-w-sm flex-1 items-center gap-2 rounded-lg border border-brand-input-border bg-brand-surface px-3 text-left text-[13px] text-brand-text-muted transition-colors hover:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        aria-label="Open search (Cmd+K)"
      >
        <Search size={15} className="shrink-0" aria-hidden="true" />
        <span className="flex-1 truncate">Search…</span>
        <kbd className="hidden rounded border border-brand-whisper-border px-1.5 py-0.5 text-[10px] font-semibold sm:inline">
          ⌘K
        </kbd>
      </button>

      {/* ... rest of component ... */}
    </header>
  )
}
```

---

## 7. MOBILE OPTIMIZATION

#### Create: `components/layout/ResponsiveContainer.tsx`
```typescript
import { cn } from '@/lib/utils'

export function ResponsiveContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(
      'w-full',
      'px-4 sm:px-6 lg:px-8',
      'mx-auto max-w-7xl',
      className
    )}>
      {children}
    </div>
  )
}

// Usage in pages
<ResponsiveContainer className="py-8">
  {/* Content */}
</ResponsiveContainer>
```

#### Create: `components/layout/MobileDrawer.tsx`
```typescript
'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'

export interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function MobileDrawer({
  isOpen,
  onClose,
  title,
  children,
}: MobileDrawerProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm transform bg-brand-surface shadow-xl transition-transform duration-200 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between border-b border-brand-whisper-border px-4 py-3">
          {title && <h2 id="drawer-title" className="font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-brand-text-muted hover:text-brand-text"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </>
  )
}
```

---

## 8. SECURITY FIXES

#### Create: `lib/security/rate-limit.ts`
```typescript
import { RateLimiter } from 'limiter' // npm install limiter
import { Redis } from '@upstash/redis' // or use your redis client

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
})

export async function rateLimit(
  identifier: string,
  limit: number = 5,
  window: number = 60
) {
  const key = `rl:${identifier}`
  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, window)
  }

  return {
    success: current <= limit,
    remaining: Math.max(0, limit - current),
    resetIn: (await redis.ttl(key)) || 0,
  }
}
```

#### Update: Auth Endpoints with Rate Limiting
```typescript
// apps/launcher/app/api/auth/login/route.ts

import { rateLimit } from '@/lib/security/rate-limit'

export async function POST(request: Request) {
  const { email } = await request.json()

  // Rate limit by email
  const { success, remaining } = await rateLimit(`login:${email}`, 5, 300)

  if (!success) {
    return new Response(
      JSON.stringify({
        error: 'Too many login attempts. Please try again later.',
      }),
      {
        status: 429,
        headers: {
          'Retry-After': '300',
          'X-Remaining': remaining.toString(),
        },
      }
    )
  }

  // ... continue with login logic
}
```

---

## 9. IMPLEMENT PROPER TYPING

#### Create: `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ApiResponse<T> = {
  data?: T
  error?: string
  status: number
}

export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (!response.ok) {
      return {
        error: data.error || 'An error occurred',
        status: response.status,
      }
    }

    return {
      data,
      status: response.status,
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    }
  }
}
```

---

## 10. TESTING TEMPLATE

#### Create: `app/(app)/tasks/__tests__/task-form.test.tsx`
```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskForm } from '../task-form'
import { ToastProvider } from '@/components/ui/Toast'

describe('TaskForm', () => {
  it('renders form fields', () => {
    render(
      <ToastProvider>
        <TaskForm />
      </ToastProvider>
    )

    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()

    render(
      <ToastProvider>
        <TaskForm />
      </ToastProvider>
    )

    const submitButton = screen.getByRole('button', { name: /create task/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSuccess = jest.fn()

    render(
      <ToastProvider>
        <TaskForm onSuccess={onSuccess} />
      </ToastProvider>
    )

    await user.type(screen.getByLabelText(/task title/i), 'Test task')
    await user.selectOptions(screen.getByLabelText(/priority/i), 'high')

    const submitButton = screen.getByRole('button', { name: /create task/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })
})
```

---

## Implementation Priority

### Week 1: Foundation
1. Create Button, Input, Skeleton components
2. Add Toast notification system
3. Create FormField component
4. Add ErrorBoundary
5. Fix localStorage security issue

### Week 2: UX
1. Add LoadingState component
2. Add EmptyState component
3. Implement form validation
4. Add loading states to all pages
5. Create responsive container

### Week 3: Polish & Security
1. Add accessibility attributes
2. Improve mobile experience
3. Implement rate limiting
4. Add proper error handling
5. Add testing structure

### Week 4+: Features
1. Implement real task CRUD
2. Add real-time updates
3. Complete module functionality
4. Add search & filters
5. Performance optimization

---

## Files to Create/Update

```
NEW FILES:
components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Skeleton.tsx
│   ├── Toast.tsx
│   ├── EmptyState.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   └── Select.tsx
├── form/
│   ├── FormField.tsx
│   ├── TaskForm.tsx
│   └── FormSection.tsx
└── layout/
    ├── ErrorBoundary.tsx
    ├── LoadingState.tsx
    ├── MobileDrawer.tsx
    ├── ResponsiveContainer.tsx
    └── PageHeader.tsx

lib/
├── validation/
│   └── schemas.ts
├── utils.ts
├── security/
│   └── rate-limit.ts
└── api/
    └── client.ts

UPDATED FILES:
app/layout.tsx (add ToastProvider)
app/(app)/page.tsx (add loading/empty states)
app/(app)/_shell/app-shell.tsx (accessibility)
tailwind.config.ts (typography scale)
package.json (add dependencies)
```

---

## Next Steps

1. **Review & Approve:** Share this guide with team
2. **Setup:** Create component library structure
3. **Implement:** Follow weekly priority schedule
4. **Test:** Add unit & E2E tests as you build
5. **Review:** Weekly progress check-ins
6. **Deploy:** Staging environment before production

---

**Remember:** This is a marathon, not a sprint. Prioritize **user experience** and **functionality** over feature completeness. Users prefer a few fully-working features over many broken ones.

