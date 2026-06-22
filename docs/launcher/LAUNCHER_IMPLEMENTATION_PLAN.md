# Launcher App - Detailed Implementation Plan

## Advanced Task Management + Personalized Dashboard + Team AI Agents

**Timeline:** 8 Weeks | **Phases:** 4 | **Team Size:** 2-3 Developers

---

## 📋 Table of Contents

1. [Phase Overview](#phase-overview)
2. [Phase 1: Foundation (Weeks 1-2)](#phase-1-foundation-weeks-1-2)
3. [Phase 2: Advanced Task Management (Weeks 3-4)](#phase-2-advanced-task-management-weeks-3-4)
4. [Phase 3: Personalized Dashboard (Weeks 5-6)](#phase-3-personalized-dashboard-weeks-5-6)
5. [Phase 4: Team & AI Agents (Weeks 7-8)](#phase-4-team--ai-agents-weeks-7-8)
6. [Database Schema Updates](#database-schema-updates)
7. [API Endpoints Map](#api-endpoints-map)
8. [Component Architecture](#component-architecture)
9. [Testing Strategy](#testing-strategy)

---

## Phase Overview

```
WEEK 1-2: FOUNDATION
├─ Fix quick wins (2 hours)
├─ Setup component library
├─ Add form validation
└─ Error/loading states

WEEK 3-4: ADVANCED TASKS
├─ Task CRUD with all fields
├─ Subtask management
├─ File attachments
├─ Comments & mentions
└─ Assignment workflow

WEEK 5-6: PERSONALIZED DASHBOARD
├─ User profile & preferences
├─ Task filtering & sorting
├─ Client assignment view
├─ Deadline tracking
└─ Team member insights

WEEK 7-8: TEAM & AI AGENTS
├─ Team member management
├─ AI agent creation
├─ Agent capabilities
├─ Team collaboration
└─ Testing & deployment
```

---

# Phase 1: Foundation (Weeks 1-2)

## Week 1: Quick Wins + Component Library

### 1.1 Execute Quick Wins (2 hours)

Follow `LAUNCHER_QUICK_WINS.md` checklist:

- [ ] Fix module status badges
- [ ] Add Toast notifications
- [ ] Secure sidebar collapse
- [ ] Add loading skeletons
- [ ] Update dashboard message
- [ ] Add empty states
- [ ] ARIA labels
- [ ] Basic error handling
- [ ] Fix touch targets
- [ ] Create .env.example

### 1.2 Create Base Components (4 hours)

**Files to create:**

```
components/
├── ui/
│   ├── Button.tsx                    ✅ See guide
│   ├── Input.tsx                     ✅ See guide
│   ├── Skeleton.tsx                  ✅ See guide
│   ├── Toast.tsx                     ✅ See guide
│   ├── EmptyState.tsx                ✅ See guide
│   ├── Badge.tsx                     (NEW)
│   ├── Checkbox.tsx                  (NEW)
│   ├── Modal.tsx                     (NEW)
│   └── Textarea.tsx                  (NEW)
└── form/
    ├── FormField.tsx                 ✅ See guide
    └── FormError.tsx                 (NEW)
```

**Badge Component:**

```typescript
// components/ui/Badge.tsx
import { cn } from '@/lib/utils'

const badgeVariants = {
  priority: {
    high: 'bg-red-500/15 text-red-600',
    medium: 'bg-yellow-500/15 text-yellow-600',
    low: 'bg-green-500/15 text-green-600',
  },
  status: {
    todo: 'bg-gray-500/15 text-gray-600',
    'in-progress': 'bg-blue-500/15 text-blue-600',
    done: 'bg-green-500/15 text-green-600',
  },
}

export function Badge({ type, value, className }: any) {
  const style = badgeVariants[type]?.[value] || ''
  return (
    <span className={cn('inline-block px-2 py-1 text-xs font-semibold rounded', style, className)}>
      {value}
    </span>
  )
}
```

**Modal Component:**

```typescript
// components/ui/Modal.tsx
import { X } from 'lucide-react'
import { ReactNode } from 'react'

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
}) {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-lg bg-brand-surface shadow-xl">
          <div className="flex items-center justify-between border-b border-brand-whisper-border p-4">
            <h2 className="text-lg font-semibold text-brand-text">{title}</h2>
            <button
              onClick={onClose}
              className="text-brand-text-muted hover:text-brand-text"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">{children}</div>
          {actions && <div className="border-t border-brand-whisper-border p-4 flex justify-end gap-2">{actions}</div>}
        </div>
      </div>
    </>
  )
}
```

### 1.3 Setup Form Validation (2 hours)

**File: `lib/validation/task-schemas.ts`**

```typescript
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title required").max(200),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date().optional(),
  assignedTo: z.string().uuid().optional(),
  clientId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const subtaskSchema = z.object({
  title: z.string().min(1, "Subtask title required"),
  completed: z.boolean().default(false),
});

export type SubtaskInput = z.infer<typeof subtaskSchema>;
```

### 1.4 Setup Error Boundaries (1 hour)

```typescript
// components/layout/ErrorBoundary.tsx (from guide)
// app/(app)/layout.tsx - wrap with ErrorBoundary
```

---

## Week 2: Loading States + Empty States

### 2.1 Create State Components (2 hours)

**LoadingState, SkeletonCard, EmptyState** - Follow `LAUNCHER_IMPROVEMENTS_GUIDE.md`

### 2.2 Apply to Existing Pages (3 hours)

```
✓ Dashboard page
✓ Tasks page
✓ Time page
✓ CRM page
```

### 2.3 Setup Testing Framework (2 hours)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
```

**Create: `jest.config.js`**

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },
};
```

### 2.4 End of Phase 1 Checklist

- [ ] All quick wins completed
- [ ] Component library setup (Button, Input, Modal, Badge, etc.)
- [ ] Form validation schemas created
- [ ] Error boundaries in place
- [ ] Loading states on all pages
- [ ] Empty states for key features
- [ ] Tests directory structure created
- [ ] All pages responsive (mobile tested)

---

# Phase 2: Advanced Task Management (Weeks 3-4)

## Week 3: Task CRUD + File Management

### 3.1 Database Schema Updates

**`prisma/schema.prisma` additions:**

```prisma
// Enhanced Task model
model Task {
  id            String   @id @default(cuid())
  title         String
  description   String?
  priority      Priority @default(medium)  // low, medium, high
  status        TaskStatus @default(todo)  // todo, in_progress, done
  dueDate       DateTime?
  completedAt   DateTime?

  // Assignments
  assignedToId  String?
  assignedTo    User? @relation("TaskAssignee", fields: [assignedToId], references: [id])

  createdById   String
  createdBy     User @relation("TaskCreator", fields: [createdById], references: [id])

  // Client & Project
  clientId      String?
  client        Client? @relation(fields: [clientId], references: [id])

  projectId     String?
  project       Project? @relation(fields: [projectId], references: [id])

  // Content
  subtasks      Subtask[]
  comments      Comment[]
  attachments   Attachment[]
  tags          Tag[] @relation("TaskTags")

  // Metadata
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([assignedToId])
  @@index([clientId])
  @@index([createdById])
}

// New models
model Subtask {
  id        String   @id @default(cuid())
  taskId    String
  task      Task @relation(fields: [taskId], references: [id], onDelete: Cascade)

  title     String
  completed Boolean @default(false)
  order     Int     @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Comment {
  id        String   @id @default(cuid())
  taskId    String
  task      Task @relation(fields: [taskId], references: [id], onDelete: Cascade)

  authorId  String
  author    User @relation(fields: [authorId], references: [id])

  content   String
  mentions  User[] @relation("CommentMentions")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([taskId])
  @@index([authorId])
}

model Attachment {
  id        String   @id @default(cuid())
  taskId    String
  task      Task @relation(fields: [taskId], references: [id], onDelete: Cascade)

  fileName  String
  fileUrl   String
  fileSize  Int
  mimeType  String

  uploadedById String
  uploadedBy   User @relation(fields: [uploadedById], references: [id])

  createdAt DateTime @default(now())

  @@index([taskId])
}

model Tag {
  id        String   @id @default(cuid())
  name      String   @unique
  color     String   @default("#3b82f6")
  tasks     Task[] @relation("TaskTags")

  createdAt DateTime @default(now())
}

model Client {
  id        String   @id @default(cuid())
  name      String
  email     String?
  phone     String?

  tasks     Task[]
  projects  Project[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Project {
  id        String   @id @default(cuid())
  name      String
  clientId  String
  client    Client @relation(fields: [clientId], references: [id])

  tasks     Task[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Priority {
  low
  medium
  high
}

enum TaskStatus {
  todo
  in_progress
  done
}
```

**Run migration:**

```bash
npx prisma migrate dev --name add_advanced_tasks
```

### 3.2 Create Task API Endpoints (3 hours)

**Files to create:**

```
app/api/tasks/
├── route.ts                    # GET all, POST create
├── [id]/
│   ├── route.ts               # GET, PATCH, DELETE
│   ├── subtasks/route.ts      # POST subtask
│   ├── comments/route.ts      # POST comment
│   ├── attachments/route.ts   # POST file upload
│   └── assign/route.ts        # PATCH assign
```

**`app/api/tasks/route.ts`:**

```typescript
import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/db/prisma";
import { createTaskSchema } from "@/lib/validation/task-schemas";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const data = createTaskSchema.parse(body);

    const task = await prisma.task.create({
      data: {
        ...data,
        createdById: session.id,
      },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
      },
    });

    return Response.json(task);
  } catch (error) {
    console.error("Task creation error:", error);
    return new Response("Failed to create task", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const assignedTo = searchParams.get("assignedTo");

    const where: any = {};
    if (status) where.status = status;
    if (assignedTo) where.assignedToId = assignedTo;

    const tasks = await prisma.task.findMany({
      where,
      include: {
        createdBy: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true } },
        client: { select: { id: true, name: true } },
        subtasks: true,
        tags: true,
        _count: { select: { comments: true, attachments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    return new Response("Failed to fetch tasks", { status: 500 });
  }
}
```

**`app/api/tasks/[id]/route.ts`:**

```typescript
import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/db/prisma";
import { updateTaskSchema } from "@/lib/validation/task-schemas";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const task = await prisma.task.findUnique({
      where: { id: params.id },
      include: {
        createdBy: true,
        assignedTo: true,
        subtasks: true,
        comments: { include: { author: true } },
        attachments: true,
        tags: true,
        client: true,
      },
    });

    if (!task) return new Response("Not found", { status: 404 });

    return Response.json(task);
  } catch (error) {
    return new Response("Failed to fetch task", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const data = updateTaskSchema.parse(body);

    const task = await prisma.task.update({
      where: { id: params.id },
      data,
      include: {
        createdBy: true,
        assignedTo: true,
        subtasks: true,
      },
    });

    return Response.json(task);
  } catch (error) {
    return new Response("Failed to update task", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    await prisma.task.delete({ where: { id: params.id } });

    return Response.json({ success: true });
  } catch (error) {
    return new Response("Failed to delete task", { status: 500 });
  }
}
```

### 3.3 Create Task Management Components (4 hours)

**Components to create:**

```
app/(app)/tasks/
├── _components/
│   ├── TaskForm.tsx           # Create/edit task
│   ├── TaskCard.tsx           # Display task
│   ├── TaskDetails.tsx        # Full task view
│   ├── SubtaskList.tsx        # Subtasks
│   ├── CommentSection.tsx     # Comments with mentions
│   ├── AttachmentList.tsx     # File attachments
│   ├── TaskFilters.tsx        # Filter/sort UI
│   └── AssigneeSelect.tsx     # User picker
├── page.tsx                   # Task list page
└── [id]/page.tsx             # Task detail page
```

**TaskForm Component:**

```typescript
// app/(app)/tasks/_components/TaskForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/form/FormField'
import { Badge } from '@/components/ui/Badge'
import { createTaskSchema, type CreateTaskInput } from '@/lib/validation/task-schemas'
import { useToast } from '@/components/ui/Toast'

export function TaskForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  })
  const { toast } = useToast()
  const priority = watch('priority')

  const onSubmit = async (data: CreateTaskInput) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create task')

      const task = await response.json()
      toast('success', `Task "${task.title}" created`)
      onSuccess?.()
    } catch (error) {
      toast('error', error instanceof Error ? error.message : 'Failed to create task')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Task Title" required error={errors.title?.message}>
        <Input {...register('title')} placeholder="What needs to be done?" />
      </FormField>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          {...register('description')}
          placeholder="Add details or instructions"
          className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2 text-brand-text"
          rows={3}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Priority" required error={errors.priority?.message}>
          <select
            {...register('priority')}
            className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </FormField>

        <FormField label="Due Date" error={errors.dueDate?.message}>
          <input
            type="datetime-local"
            {...register('dueDate', { valueAsDate: true })}
            className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Assign To" error={errors.assignedTo?.message}>
          <select {...register('assignedTo')} className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2">
            <option value="">Unassigned</option>
            <option value="user-id">John Doe</option>
            {/* Load from API */}
          </select>
        </FormField>

        <FormField label="Client" error={errors.clientId?.message}>
          <select {...register('clientId')} className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2">
            <option value="">Select client</option>
            {/* Load from API */}
          </select>
        </FormField>
      </div>

      <Button type="submit" isLoading={isSubmitting} loadingText="Creating…">
        Create Task
      </Button>
    </form>
  )
}
```

### 3.4 File Upload Handler (2 hours)

**`lib/upload/handler.ts`:**

```typescript
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = join(process.cwd(), "public/uploads");
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function handleFileUpload(file: File) {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large (max 50MB)");
  }

  // Validate file type
  const allowed = ["image/", "application/pdf", "text/", "video/"];
  if (!allowed.some((type) => file.type.startsWith(type))) {
    throw new Error("File type not allowed");
  }

  const buffer = await file.arrayBuffer();
  const fileName = `${randomUUID()}-${file.name}`;
  const filePath = join(UPLOAD_DIR, fileName);

  await writeFile(filePath, Buffer.from(buffer));

  return {
    fileName: file.name,
    fileUrl: `/uploads/${fileName}`,
    fileSize: file.size,
    mimeType: file.type,
  };
}
```

**`app/api/tasks/[id]/attachments/route.ts`:**

```typescript
import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/db/prisma";
import { handleFileUpload } from "@/lib/upload/handler";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) return new Response("No file provided", { status: 400 });

    const uploadedFile = await handleFileUpload(file);

    const attachment = await prisma.attachment.create({
      data: {
        taskId: params.id,
        uploadedById: session.id,
        ...uploadedFile,
      },
    });

    return Response.json(attachment);
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      error instanceof Error ? error.message : "Upload failed",
      { status: 400 },
    );
  }
}
```

---

## Week 4: Comments, Subtasks, Assignments

### 4.1 Comments with Mentions (3 hours)

**`app/api/tasks/[id]/comments/route.ts`:**

```typescript
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const { content, mentions } = await request.json();

    const comment = await prisma.comment.create({
      data: {
        taskId: params.id,
        authorId: session.id,
        content,
        mentions: {
          connect: mentions?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        author: true,
        mentions: true,
      },
    });

    // TODO: Send notifications to mentioned users
    // sendMentionNotification(mentions, session.id, params.id)

    return Response.json(comment);
  } catch (error) {
    return new Response("Failed to create comment", { status: 500 });
  }
}
```

**`app/(app)/tasks/_components/CommentSection.tsx`:**

```typescript
'use client'

import { useState, useCallback } from 'react'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { At } from 'lucide-react'

export function CommentSection({
  taskId,
  teamMembers,
}: {
  taskId: string
  teamMembers: any[]
}) {
  const [content, setContent] = useState('')
  const [mentions, setMentions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const { toast } = useToast()

  const handleMention = useCallback((userId: string, userName: string) => {
    const mention = `@${userName}`
    setContent(prev => prev + mention)
    setMentions(prev => [...prev, userId])
    setShowMentions(false)
  }, [])

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await fetch(`/api/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, mentions }),
      })

      toast('success', 'Comment added')
      setContent('')
      setMentions([])
    } catch (error) {
      toast('error', 'Failed to add comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setShowMentions(true)}
          placeholder="Add a comment... Type @ to mention someone"
          className="w-full"
          rows={3}
        />

        {showMentions && (
          <div className="absolute bottom-full mb-2 w-full bg-brand-surface border border-brand-whisper-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {teamMembers.map(member => (
              <button
                key={member.id}
                onClick={() => handleMention(member.id, member.name)}
                className="w-full text-left px-4 py-2 hover:bg-brand-canvas flex items-center gap-2"
              >
                <At size={14} className="text-brand-blue" />
                {member.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!content.trim()}
        isLoading={isSubmitting}
      >
        Comment
      </Button>
    </div>
  )
}
```

### 4.2 Subtask Management (2 hours)

**`app/(app)/tasks/_components/SubtaskList.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'

export function SubtaskList({
  taskId,
  subtasks,
}: {
  taskId: string
  subtasks: any[]
}) {
  const [newSubtask, setNewSubtask] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return

    setIsAdding(true)
    try {
      await fetch(`/api/tasks/${taskId}/subtasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newSubtask }),
      })

      toast('success', 'Subtask added')
      setNewSubtask('')
    } catch (error) {
      toast('error', 'Failed to add subtask')
    } finally {
      setIsAdding(false)
    }
  }

  const handleToggleSubtask = async (subtaskId: string, completed: boolean) => {
    try {
      await fetch(`/api/tasks/${taskId}/subtasks/${subtaskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      })
    } catch (error) {
      toast('error', 'Failed to update subtask')
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-brand-text">Subtasks</h3>

      <div className="space-y-2">
        {subtasks.map(subtask => (
          <div
            key={subtask.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-canvas"
          >
            <button
              onClick={() => handleToggleSubtask(subtask.id, subtask.completed)}
              className={`flex-shrink-0 ${subtask.completed ? 'text-brand-success' : 'text-brand-text-muted'}`}
            >
              <Check size={20} />
            </button>
            <span className={subtask.completed ? 'line-through text-brand-text-muted' : ''}>
              {subtask.title}
            </span>
            <button className="ml-auto text-brand-text-muted hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
          placeholder="Add a subtask..."
          className="flex-1"
        />
        <Button
          size="sm"
          onClick={handleAddSubtask}
          isLoading={isAdding}
          disabled={!newSubtask.trim()}
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  )
}
```

### 4.3 Assignment Workflow (2 hours)

**`app/api/tasks/[id]/assign/route.ts`:**

```typescript
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const { assignedToId } = await request.json();

    const task = await prisma.task.update({
      where: { id: params.id },
      data: { assignedToId },
      include: {
        assignedTo: true,
      },
    });

    // TODO: Send assignment notification
    // sendAssignmentNotification(assignedToId, params.id)

    return Response.json(task);
  } catch (error) {
    return new Response("Failed to assign task", { status: 500 });
  }
}
```

### 4.4 End of Phase 2 Checklist

- [ ] Task CRUD fully functional
- [ ] Subtask management working
- [ ] File upload/attachments working
- [ ] Comments with mentions
- [ ] Task assignment workflow
- [ ] All API endpoints tested
- [ ] Error handling on all endpoints
- [ ] Form validation complete
- [ ] Unit tests for components
- [ ] Task list page with filters

---

# Phase 3: Personalized Dashboard (Weeks 5-6)

## Week 5: User Profiles & Dashboard

### 5.1 Update User Schema

**`prisma/schema.prisma`:**

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  role          UserRole @default(member)
  department    String?

  // Profile
  avatar        String?
  bio           String?

  // Preferences
  preferences   UserPreferences?

  // Relations
  assignedTasks Task[] @relation("TaskAssignee")
  createdTasks  Task[] @relation("TaskCreator")
  comments      Comment[]
  uploadedFiles Attachment[]
  teamMember    TeamMember?
  teamLeads     Team[] @relation("TeamLead")

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model UserPreferences {
  id               String   @id @default(cuid())
  userId           String   @unique
  user             User @relation(fields: [userId], references: [id], onDelete: Cascade)

  theme            String @default("dark")
  sidebarCollapsed Boolean @default(false)
  defaultView      String @default("kanban")  // kanban, list, calendar

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

enum UserRole {
  admin
  manager
  member
}
```

### 5.2 Personalized Dashboard Component (4 hours)

**`app/(app)/_components/PersonalizedDashboard.tsx`:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LoadingState } from '@/components/layout/LoadingState'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { CheckSquare, Calendar, User, Building2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Task {
  id: string
  title: string
  priority: string
  status: string
  dueDate: Date | null
  assignedTo: { name: string } | null
  client: { name: string } | null
  createdBy: { name: string }
  subtasks: any[]
}

export function PersonalizedDashboard({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'assigned' | 'created' | 'due-soon'>('assigned')

  useEffect(() => {
    loadTasks()
  }, [filter])

  async function loadTasks() {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tasks?filter=${filter}&userId=${userId}`)
      if (!response.ok) throw new Error('Failed to load tasks')

      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingState count={5} variant="list" />
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={CheckSquare}
        title="No tasks yet"
        description={`No ${filter} tasks at the moment. Great job staying on top of things!`}
        action={{
          label: 'View All Tasks',
          onClick: () => window.location.href = '/tasks',
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['assigned', 'created', 'due-soon'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === f
                ? 'bg-brand-blue text-white'
                : 'bg-brand-surface text-brand-text hover:bg-brand-canvas'
            }`}
          >
            {f === 'assigned' && 'Assigned to Me'}
            {f === 'created' && 'I Created'}
            {f === 'due-soon' && 'Due Soon'}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map(task => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}`}
            className="block p-4 rounded-lg border border-brand-whisper-border bg-brand-surface hover:border-brand-blue/50 hover:bg-brand-canvas transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-brand-text group-hover:text-brand-blue truncate">
                  {task.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge type="priority" value={task.priority} />
                  <Badge type="status" value={task.status} />

                  {task.client && (
                    <span className="text-xs text-brand-text-muted flex items-center gap-1">
                      <Building2 size={12} />
                      {task.client.name}
                    </span>
                  )}

                  {task.dueDate && (
                    <span className="text-xs text-brand-text-muted flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-brand-text-muted">
                  {task.subtasks.length > 0 && (
                    <span>
                      {task.subtasks.filter((s: any) => s.completed).length}/{task.subtasks.length} subtasks
                    </span>
                  )}

                  {task.createdBy && filter === 'assigned' && (
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      from {task.createdBy.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                {task.assignedTo && (
                  <div className="text-right">
                    <p className="text-xs text-brand-text-muted">Assigned</p>
                    <p className="text-sm font-medium text-brand-text">{task.assignedTo.name}</p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

### 5.3 Dashboard Filters & Sorting (3 hours)

**`app/(app)/page.tsx` - Enhanced:**

```typescript
'use client'

import { PersonalizedDashboard } from './_components/PersonalizedDashboard'
import { getServerSession } from '@/lib/auth/server-session'

export default async function DashboardPage() {
  const session = await getServerSession()

  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text">Your Dashboard</h1>
          <p className="mt-2 text-brand-text-muted">Tasks assigned to you, created by you, and upcoming deadlines</p>
        </div>

        <PersonalizedDashboard userId={session?.id} />
      </div>
    </div>
  )
}
```

### 5.4 Client/Project Views (2 hours)

**`app/(app)/clients/page.tsx` - New:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LoadingState } from '@/components/layout/LoadingState'

export default function ClientsPage() {
  const [clients, setClients] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    try {
      const response = await fetch('/api/clients')
      if (!response.ok) throw new Error('Failed to load clients')
      const data = await response.json()
      setClients(data)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingState count={6} variant="grid" />

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-brand-text mb-6">Clients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client: any) => (
          <Link
            key={client.id}
            href={`/clients/${client.id}`}
            className="p-4 rounded-lg border border-brand-whisper-border bg-brand-surface hover:border-brand-blue/50 transition-all"
          >
            <h2 className="font-semibold text-brand-text">{client.name}</h2>
            <p className="text-xs text-brand-text-muted mt-1">{client.email}</p>
            <div className="mt-3 text-xs text-brand-text-muted">
              {client._count?.tasks || 0} tasks
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

## Week 6: Team Views & Analytics

### 6.1 Team Management Page (3 hours)

**`app/(app)/team/page.tsx` - New:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { LoadingState } from '@/components/layout/LoadingState'
import { useToast } from '@/components/ui/Toast'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string | null
  tasksAssigned: number
  tasksCompleted: number
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddMember, setShowAddMember] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadTeamMembers()
  }, [])

  async function loadTeamMembers() {
    try {
      const response = await fetch('/api/team/members')
      if (!response.ok) throw new Error('Failed to load team')
      const data = await response.json()
      setMembers(data)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingState count={5} />

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-brand-text">Team Members</h1>
        <Button onClick={() => setShowAddMember(true)}>
          <Plus size={16} className="mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4">
        {members.map(member => (
          <div
            key={member.id}
            className="p-4 rounded-lg border border-brand-whisper-border bg-brand-surface"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-blue/15 flex items-center justify-center">
                  <Users size={24} className="text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text">{member.name}</h3>
                  <p className="text-xs text-brand-text-muted">{member.email}</p>
                  {member.department && (
                    <p className="text-xs text-brand-text-muted">{member.department}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-semibold text-brand-text">
                  {member.tasksAssigned} assigned
                </div>
                <div className="text-xs text-brand-success">
                  {member.tasksCompleted} completed
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        title="Add Team Member"
      >
        {/* AddMemberForm component */}
      </Modal>
    </div>
  )
}
```

### 6.2 Team Analytics (2 hours)

**`app/(app)/_components/TeamAnalytics.tsx`:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function TeamAnalytics() {
  const [data, setData] = useState([])

  useEffect(() => {
    loadAnalytics()
  }, [])

  async function loadAnalytics() {
    try {
      const response = await fetch('/api/analytics/team')
      if (!response.ok) throw new Error('Failed to load analytics')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    }
  }

  return (
    <div className="rounded-lg border border-brand-whisper-border bg-brand-surface p-4">
      <h3 className="font-semibold text-brand-text mb-4">Team Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="var(--color-brand-whisper-border)" />
          <XAxis dataKey="name" stroke="var(--color-brand-text-muted)" />
          <YAxis stroke="var(--color-brand-text-muted)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-brand-surface)' }} />
          <Legend />
          <Bar dataKey="completed" fill="var(--color-brand-success)" />
          <Bar dataKey="inProgress" fill="var(--color-brand-blue)" />
          <Bar dataKey="pending" fill="var(--color-brand-text-muted)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

### 6.3 End of Phase 3 Checklist

- [ ] User profile pages
- [ ] Personalized dashboard with filters
- [ ] Client/project views
- [ ] Team member listings
- [ ] Basic team analytics
- [ ] Task assignments to multiple people
- [ ] Deadline tracking & notifications
- [ ] Team performance metrics
- [ ] Client dashboard with their tasks
- [ ] All APIs for dashboard features

---

# Phase 4: Team & AI Agents (Weeks 7-8)

## Week 7: Team Management & AI Agent Framework

### 7.1 Team Model Enhancement

**`prisma/schema.prisma`:**

```prisma
model Team {
  id          String   @id @default(cuid())
  name        String
  description String?

  leadId      String
  lead        User @relation("TeamLead", fields: [leadId], references: [id])

  members     TeamMember[]
  agents      AIAgent[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model TeamMember {
  id        String   @id @default(cuid())
  teamId    String
  team      Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  userId    String @unique
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)

  role      String @default("member")  // member, lead, admin
  joinedAt  DateTime @default(now())
}

model AIAgent {
  id          String   @id @default(cuid())
  teamId      String
  team        Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  name        String
  description String?
  role        String  // researcher, manager, executor, analyst

  config      Json    // Agent-specific configuration
  capabilities String[] // Tags: automation, analysis, communication, etc.

  isActive    Boolean @default(true)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 7.2 Team Management API (2 hours)

**`app/api/team/route.ts`:**

```typescript
import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const { name, description, memberIds } = await request.json();

    const team = await prisma.team.create({
      data: {
        name,
        description,
        leadId: session.id,
        members: {
          create: memberIds.map((id: string) => ({
            userId: id,
            role: id === session.id ? "lead" : "member",
          })),
        },
      },
      include: {
        members: { include: { user: true } },
        lead: true,
      },
    });

    return Response.json(team);
  } catch (error) {
    return new Response("Failed to create team", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const teams = await prisma.team.findMany({
      where: {
        members: {
          some: { userId: session.id },
        },
      },
      include: {
        lead: true,
        members: { include: { user: true } },
        agents: true,
      },
    });

    return Response.json(teams);
  } catch (error) {
    return new Response("Failed to fetch teams", { status: 500 });
  }
}
```

### 7.3 AI Agent Creation Interface (4 hours)

**`app/(app)/team/[id]/_components/AgentCreator.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { FormField } from '@/components/form/FormField'
import { useToast } from '@/components/ui/Toast'
import { Zap, Settings } from 'lucide-react'

const AGENT_ROLES = [
  {
    name: 'Researcher',
    description: 'Gathers and analyzes information',
    capabilities: ['research', 'analysis', 'summarization'],
  },
  {
    name: 'Manager',
    description: 'Organizes tasks and team coordination',
    capabilities: ['task-management', 'coordination', 'scheduling'],
  },
  {
    name: 'Executor',
    description: 'Completes assigned tasks',
    capabilities: ['execution', 'implementation', 'automation'],
  },
  {
    name: 'Analyst',
    description: 'Provides insights and recommendations',
    capabilities: ['analysis', 'insights', 'reporting'],
  },
]

export function AgentCreator({ teamId }: { teamId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleCreate = async () => {
    if (!selectedRole || !name.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/team/${teamId}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          role: selectedRole,
        }),
      })

      if (!response.ok) throw new Error('Failed to create agent')

      const agent = await response.json()
      toast('success', `AI Agent "${agent.name}" created successfully`)
      setIsOpen(false)
      setName('')
      setDescription('')
      setSelectedRole(null)
    } catch (error) {
      toast('error', error instanceof Error ? error.message : 'Failed to create agent')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Zap size={16} className="mr-2" />
        Create AI Agent
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create AI Agent"
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!selectedRole || !name.trim()}
              isLoading={isSubmitting}
            >
              Create Agent
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormField label="Agent Name" required>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Research Assistant, Task Manager"
            />
          </FormField>

          <FormField label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will this agent do?"
              className="w-full rounded-lg border border-brand-input-border bg-brand-surface px-4 py-2"
              rows={3}
            />
          </FormField>

          <FormField label="Agent Role" required>
            <div className="grid grid-cols-2 gap-3">
              {AGENT_ROLES.map(role => (
                <button
                  key={role.name}
                  onClick={() => setSelectedRole(role.name)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedRole === role.name
                      ? 'border-brand-blue bg-brand-blue/10'
                      : 'border-brand-whisper-border hover:border-brand-blue/50'
                  }`}
                >
                  <h4 className="font-semibold text-brand-text">{role.name}</h4>
                  <p className="text-xs text-brand-text-muted mt-1">{role.description}</p>
                </button>
              ))}
            </div>
          </FormField>

          {selectedRole && (
            <div className="p-3 rounded-lg bg-brand-blue/10 border border-brand-blue/30">
              <h4 className="text-xs font-semibold text-brand-blue mb-2">Capabilities</h4>
              <div className="flex flex-wrap gap-1">
                {AGENT_ROLES.find(r => r.name === selectedRole)?.capabilities.map(cap => (
                  <span key={cap} className="text-xs bg-brand-blue/20 text-brand-blue px-2 py-1 rounded">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
```

### 7.4 AI Agent Display (2 hours)

**`app/(app)/team/[id]/_components/AgentCard.tsx`:**

```typescript
import { Settings, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function AgentCard({
  agent,
  onToggle,
  onConfigure,
  onDelete,
}: {
  agent: any
  onToggle: () => void
  onConfigure: () => void
  onDelete: () => void
}) {
  const roleIcons = {
    Researcher: '🔍',
    Manager: '📋',
    Executor: '⚙️',
    Analyst: '📊',
  }

  return (
    <div className="p-4 rounded-lg border border-brand-whisper-border bg-brand-surface hover:border-brand-blue/50 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl">{roleIcons[agent.role as keyof typeof roleIcons]}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-brand-text">{agent.name}</h3>
            <p className="text-xs text-brand-text-muted mt-1">{agent.description}</p>
            <div className="flex gap-2 mt-2">
              <Badge type="status" value={agent.isActive ? 'active' : 'inactive'} />
              <span className="text-xs text-brand-text-muted">Role: {agent.role}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            title={agent.isActive ? 'Deactivate' : 'Activate'}
          >
            {agent.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onConfigure}
            title="Configure"
          >
            <Settings size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            title="Delete"
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}
```

## Week 8: Integration & Testing

### 8.1 Agent Assignment to Tasks (2 hours)

**Enhanced Task model with agent assignment:**

```prisma
model Task {
  // ... existing fields ...
  assignedAgentId  String?
  assignedAgent    AIAgent? @relation(fields: [assignedAgentId], references: [id])
}

model AIAgent {
  // ... existing fields ...
  assignedTasks Task[]
}
```

### 8.2 Complete Testing Suite (3 hours)

Create test files for:

- Task creation, update, deletion
- Team management
- Agent creation and assignment
- Dashboard filtering
- Comment and mention system
- File uploads

### 8.3 Documentation (2 hours)

- README for developers
- API documentation
- Team setup guide
- Agent capabilities guide

### 8.4 End of Phase 4 Checklist

- [ ] Team management fully functional
- [ ] AI agent creation working
- [ ] Agent assignment to tasks
- [ ] All core features tested
- [ ] Documentation complete
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Ready for staging deployment

---

# Database Schema Updates Summary

```sql
-- Run migrations in order:
1. npx prisma migrate dev --name add_advanced_tasks
2. npx prisma migrate dev --name add_team_support
3. npx prisma migrate dev --name add_ai_agents
```

---

# API Endpoints Map

## Tasks

```
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
POST   /api/tasks/:id/subtasks
POST   /api/tasks/:id/comments
POST   /api/tasks/:id/attachments
PATCH  /api/tasks/:id/assign
```

## Team

```
POST   /api/team
GET    /api/team
GET    /api/team/:id
PATCH  /api/team/:id
POST   /api/team/:id/members
DELETE /api/team/:id/members/:memberId
POST   /api/team/:id/agents
GET    /api/team/:id/agents
PATCH  /api/team/:id/agents/:agentId
DELETE /api/team/:id/agents/:agentId
```

## Clients

```
POST   /api/clients
GET    /api/clients
GET    /api/clients/:id
PATCH  /api/clients/:id
DELETE /api/clients/:id
```

## Analytics

```
GET    /api/analytics/dashboard
GET    /api/analytics/team
GET    /api/analytics/tasks
GET    /api/analytics/clients/:id
```

---

# Component Architecture

```
app/
├── (app)/
│   ├── page.tsx (PersonalizedDashboard)
│   ├── _components/
│   │   ├── PersonalizedDashboard.tsx
│   │   ├── TeamAnalytics.tsx
│   │   └── DashboardStats.tsx
│   ├── tasks/
│   │   ├── page.tsx (Task list)
│   │   ├── [id]/page.tsx (Task detail)
│   │   └── _components/
│   │       ├── TaskForm.tsx
│   │       ├── TaskCard.tsx
│   │       ├── SubtaskList.tsx
│   │       ├── CommentSection.tsx
│   │       ├── AttachmentList.tsx
│   │       └── TaskFilters.tsx
│   ├── team/
│   │   ├── page.tsx (Team list)
│   │   ├── [id]/page.tsx (Team detail)
│   │   └── _components/
│   │       ├── TeamMembers.tsx
│   │       ├── AgentCreator.tsx
│   │       ├── AgentCard.tsx
│   │       └── AgentConfig.tsx
│   ├── clients/
│   │   ├── page.tsx (Client list)
│   │   ├── [id]/page.tsx (Client detail)
│   │   └── _components/
│   │       ├── ClientForm.tsx
│   │       └── ClientTasks.tsx
│   └── layout.tsx
├── api/
│   ├── tasks/ (routes)
│   ├── team/ (routes)
│   ├── clients/ (routes)
│   └── analytics/ (routes)
└── components/
    ├── ui/ (reusable)
    └── form/ (reusable)
```

---

# Testing Strategy

## Unit Tests

- Form validation schemas
- API response handlers
- Data transformation functions
- Filter/sort logic

## Integration Tests

- Task CRUD workflow
- Team management flow
- Comment/mention system
- File upload process

## E2E Tests

- Complete task creation → assignment → completion
- Team creation → member addition → agent creation
- Dashboard filtering and sorting
- Client task overview

## Performance Tests

- Dashboard load time (<2s)
- Task list with filters (<1s)
- API response times (<500ms)

---

# Development Workflow

## Daily Standup Format

```
COMPLETED (yesterday):
- [ ] Feature/task name
- [ ] Feature/task name

IN PROGRESS (today):
- [ ] Feature/task name
- [ ] Feature/task name

BLOCKERS:
- [ ] Issue/dependency name
```

## PR Review Checklist

```
- [ ] Tests added/updated
- [ ] Accessibility checked
- [ ] Mobile responsive
- [ ] No console errors
- [ ] API errors handled
- [ ] Loading states present
- [ ] Empty states present
- [ ] Performance acceptable
```

## Deployment Checklist

```
- [ ] All tests passing
- [ ] Code review approved
- [ ] Migrations tested
- [ ] Database backup taken
- [ ] Documentation updated
- [ ] Performance baseline met
- [ ] Security audit passed
- [ ] Stakeholders notified
```

---

# Success Metrics

## Week 1-2: Foundation

✓ Component library in place
✓ Forms validating
✓ Error boundaries active
✓ Team can see improvements

## Week 3-4: Tasks

✓ Full CRUD working
✓ Subtasks/comments functional
✓ Files uploadable
✓ Tests at >80% coverage

## Week 5-6: Dashboard

✓ Dashboard personalized per user
✓ Filters/sorting working
✓ Team views complete
✓ Performance >85 Lighthouse

## Week 7-8: AI & Team

✓ Teams fully functional
✓ AI agents creatable
✓ Agent assignment working
✓ Ready for production

---

# Next Steps

1. **Approve Plan** - Get stakeholder sign-off
2. **Setup Sprint** - Organize Phases 1-2 sprints
3. **Assign Developers** - 2-3 developers per phase
4. **Daily Standups** - 15 min daily syncs
5. **Weekly Reviews** - Monday phase completion
6. **Continuous Testing** - Tests as you code
7. **Staging Deploy** - End of each 2-week phase
8. **Production Deploy** - After Phase 4 completion

---

**Start Date:** Week of [Your Date]  
**End Date:** 8 weeks later  
**Team Size:** 2-3 developers  
**Estimated Effort:** 500-600 developer hours
