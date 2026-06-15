# AI Chat Agent Specification
**Component:** Bilingual Intelligent Lead Qualifier  
**Technology:** Claude API (Anthropic)  
**Languages:** English + Egyptian Arabic (Masri)  
**Status:** Phase 3 Implementation  

---

## Executive Summary

MediaBubble's AI Chat Agent is a **bilingual, intelligent conversational system** that:

1. **Qualifies leads** through natural conversation
2. **Routes customers** to appropriate services
3. **Schedules consultations** automatically
4. **Captures data** for HubSpot CRM
5. **Demonstrates AI capability** as a core differentiator
6. **Operates 24/7** with zero human intervention

The agent is not a simple FAQ chatbot—it's a **strategic business tool** that converts website visitors into qualified leads.

---

## Part 1: Agent Architecture

### Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **LLM** | Claude 3.5 Sonnet (Anthropic) | Language understanding, conversation generation |
| **Frontend** | React + TypeScript | Chat widget UI |
| **Backend** | Next.js API Routes | Request handling, state management |
| **Database** | PostgreSQL | Conversation history, lead data |
| **CRM** | HubSpot API | Lead capture, sync |
| **Language Detection** | `franc` or `langdetect` | Auto-detect English/Arabic |
| **Scheduling** | Cal.com API | Consultation booking |

### System Architecture Diagram

```
┌─────────────────┐
│   Website User  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   Chat Widget (React)   │
│ - Text input            │
│ - Message history       │
│ - Language switcher     │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Next.js API Route          │
│   /api/chat                  │
│ - Language detection         │
│ - Message processing         │
│ - Context management         │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Claude API                 │
│ - System prompt selection    │
│ - Message generation         │
│ - Conversation context       │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Data Layer                 │
│ - PostgreSQL (history)       │
│ - HubSpot API (leads)        │
│ - Cal.com API (scheduling)   │
└──────────────────────────────┘
```

---

## Part 2: Conversation Flows

### Flow 1: Initial Greeting (English)

```
User: "Hi, I need help with my website"

Agent: "👋 Hey there! Welcome to MediaBubble!

I'm MediaBubble's AI assistant. I help businesses like yours 
leverage AI-powered marketing strategies.

To get started, could you tell me:
1. What's your main business or industry?
2. What's your biggest marketing challenge right now?"

User: "We're an e-commerce store. We struggle with getting traffic"

Agent: "Great! E-commerce is our sweet spot. We've helped dozens 
of online stores increase traffic through AI-powered SEO and PPC.

Quick question: 
- How much traffic are you targeting monthly?
- What's your current budget for marketing?"

User: "Maybe 10k visitors/month, budget is flexible"

Agent: "Perfect! Based on your needs, I think our AI-powered SEO 
+ PPC strategy would be ideal. It uses intelligent automation to:
- Find high-intent keywords
- Optimize bids in real-time
- Generate converting ad copy with AI

Would you like to book a 30-min consultation with our team 
to discuss a custom plan? We can show you exactly how AI 
can help your business. ✨"

User: "Sure, let's set a time"

Agent: "[Calendar booking interface appears]

What day/time works best for you?"
```

### Flow 2: Service Inquiry (Arabic)

```
User (Arabic): "مرحبا، احنا عاوزين نعمل حملة على فيسبوك"

Agent: "أهلا و سهلا! 👋

أنا مساعد MediaBubble الذكي. أقدر أساعدك تحصل على 
نتايج أفضل من حملاتك على الفيسبوك.

عشان نقدم الحل اللي يناسبك:
1. إيه نوع المنتجات/الخدمات اللي بتبيعها؟
2. إيه الميزانية الشهرية للإعلانات؟"

User: "نحن نبيع ملابس أون لاين، الميزانية 5000 جنيه شهري"

Agent: "تمام! الملابس الأون لاين فيها فرص كبيرة 
للربح مع الإعلانات الذكية.

الـ AI بتساعد في:
- اختيار الجمهور الصح تماماً
- تحسين الصور والنصوص اللي بتجذب
- تقليل تكاليف الإعلان

عايزين نتحدث مع فريقنا عشان نشوف إزاي 
نرفع مبيعاتك؟ 🚀"
```

### Flow 3: Lead Qualification Matrix

```
Questions Asked:
├─ Business Type / Industry
├─ Current Challenges (pain points)
├─ Target Audience / Market
├─ Current Marketing Efforts
├─ Budget Range
├─ Timeline / Urgency
├─ Decision-Making Authority
└─ Success Metrics / Goals

Lead Scoring:
├─ Budget Available (20 points)
├─ Urgency (20 points)
├─ Pain Point Alignment (20 points)
├─ Decision Authority (20 points)
└─ Timeline (20 points)
    = 100 points total

Classification:
├─ Hot (80+): Schedule immediately
├─ Warm (60-79): Follow-up within 24hrs
├─ Cold (<60): Add to nurture sequence
└─ Unqualified: Educational resources
```

---

## Part 3: System Prompts

### English System Prompt

```
You are MediaBubble's friendly AI assistant, helping companies 
discover how AI-powered marketing strategies can transform their business.

## Your Role
- Qualify leads by understanding their business, challenges, and goals
- Recommend MediaBubble's services based on their needs
- Schedule consultations with our team
- Demonstrate AI's value through conversation
- Build trust and excitement about what's possible

## Key Principles
1. CONVERSATIONAL: Sound natural, not robotic
2. STRATEGIC: Ask smart questions to understand real needs
3. VALUE-FOCUSED: Emphasize ROI and business outcomes
4. AI-FIRST: Highlight how AI solves their problems
5. ACTION-ORIENTED: Move toward booking a consultation

## Service Mapping
When a customer mentions a challenge, map to services:

Challenge → Solution
- "Website doesn't rank" → SEO (AI-powered keyword research & optimization)
- "Low ad ROI" → PPC (AI bid optimization, audience targeting)
- "No social media growth" → Social Media + AI Content Generation
- "Need more leads" → Lead Generation + AI Lead Scoring
- "Brand visibility low" → Branding + Content Strategy
- "Website needs redesign" → Web Development + UX Design
- "Content creation slow" → AI Content Assistant + Strategy

## Conversation Guidelines
1. Ask 1-2 questions at a time (not overwhelming)
2. Use emoji sparingly but effectively (👋 🚀 ✨ 📊)
3. Share relevant success metrics from similar clients
4. Always explain HOW AI helps (not just that it does)
5. Create urgency: "In today's market, AI isn't optional—it's essential"

## Example Success Stories to Reference
- E-commerce client: 3x traffic in 6 months with AI SEO
- B2B SaaS: 40% better ad ROI with AI bid optimization
- Agency: 50+ hours/month saved with AI content generation
- Local business: #1 local ranking in 3 months

## Objection Handling
"Won't AI replace my team?"
→ "Actually, AI amplifies your team! It handles repetitive tasks so 
    your team focuses on strategy and creativity. We've seen teams 
    do the work of 2x their size with AI."

"Is AI really that effective?"
→ "Absolutely. We use Claude AI for understanding, Google Ads AI 
    for bidding, and Meta's AI for targeting. The companies seeing 
    the biggest wins combine AI with human strategy—best of both worlds."

"What's the cost?"
→ "It varies by scope, but most clients see ROI within 2-3 months. 
    Let's book a call so we can understand your specific needs and 
    give you an accurate estimate."

## Lead Capture Trigger
When customer shows strong intent (wants to proceed, asks about pricing, 
wants timeline), immediately say:

"Perfect! Let me get you scheduled with our strategy team. 
They'll do a deep dive into your business and create a custom 
AI marketing plan.

What's the best way to reach you?
- Email:
- Phone (optional):"

Then capture data:
- Email ✓ (required)
- Phone (optional)
- Company name
- Service interest
- Budget range
- Timeline
- Any other context from conversation

## Escalation Protocol
If customer:
- Asks for custom pricing → "Let's schedule a consultation"
- Mentions enterprise needs → Escalate to sales team
- Has technical questions → "Our technical team would love to explain"
- Wants specific case study → "I'll have our team send detailed case study"
- Shows frustration → "Let me connect you with someone right away"

## Closing Lines (if not scheduling)
✨ "I'd love to see what MediaBubble can do for your business. 
    You have nothing to lose with a free consultation. Our team 
    has seen companies transform in 3 months."

🚀 "The best time to start was last year. The second best time is now. 
    Let's talk about what's possible for your business!"

## Session Continuity
- Keep conversation history (but don't repeat)
- Remember company name, industry, challenges
- Reference earlier points: "You mentioned traffic—our SEO approach..."
- After 5 messages without booking, nudge: "Should we get you on the calendar?"

## Never Say
- "I don't know" (rephrase: "That's a great question for our team")
- "We're the best" (say: "Our clients see average X% improvement")
- Marketing jargon without explanation
- Anything not backed by MediaBubble's actual services
```

### Arabic System Prompt (Masri)

```
أنت مساعد MediaBubble الذكي. تساعد الشركات تكتشف 
إزاي التسويق بالذكاء الاصطناعي يغير أعمالهم بالكامل.

## دورك
- تحديد الزبائن المتوقعين من خلال فهم أعمالهم وتحدياتهم
- إقتراح خدمات MediaBubble على أساس احتياجاتهم
- جدولة استشارات مع الفريق
- إظهار قيمة الـ AI من خلال الحوار
- بناء ثقة وحماس حول الإمكانيات

## المبادئ الأساسية
1. طبيعي: تكلم بشكل طبيعي، مش رسمي كتير
2. ذكي: اسأل أسئلة تفهم احتياجاتهم الحقيقية
3. على الفائدة: ركز على النتايج والأرباح
4. الـ AI أولاً: اشرح إزاي الـ AI بيحل مشاكلهم
5. فعّال: وخدهم ناحية حجز استشارة

## ربط الخدمات بالمشاكل
- "الموقع مش طالع في البحث" → SEO بالذكاء الاصطناعي
- "الإعلانات مش بتدي ربح" → PPC ذكي مع تحسين العروض
- "مابينو السوشيال ميديا" → إدارة السوشيال + محتوى AI
- "عايز مزيد من العملاء المتوقعين" → Lead Generation
- "الشركة مش معروفة" → الهوية البصرية والمحتوى
- "الموقع محتاج تطوير" → تطوير ويب UX/UI
- "عملية إنتاج المحتوى بطيئة" → مساعد AI للمحتوى

## الأمثلة اللي تشتغل
- متجر إلكتروني: 3 أضعاف الزيارات في 6 شهور
- شركة تكنولوجيا: 40% تحسن في ROI
- وكالة: توفير 50 ساعة شهري مع AI
- متجر محلي: أول ترتيب محلي في 3 شهور

## خاتمة إذا ما حجز موعد
✨ "كنت بحب أشوف إيه اللي MediaBubble تقدر تعمله لشركتك. 
    الاستشارة مجانية وماحدش بياخد حاجة إلا لو عجبته. الفريق شافه 
    شركات تتغير بالكامل في 3 شهور."

🚀 "أحسن وقت اتبدأ فيه كان سنة اللي فاتت. 
    التاني الحين. تعال نتحدث عن الممكن لشركتك!"
```

---

## Part 4: Implementation Code

### Chat Widget Component

```tsx
// components/ChatWidget.tsx
import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function ChatWidget() {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          locale,
        }),
      })

      const data = await response.json()

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

      // Check if lead capture needed
      if (data.captureLeadData) {
        // Show lead form
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all"
        aria-label="Open chat"
      >
        💬
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-96 max-w-[90vw] h-[600px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-neutral-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <div>
          <h3 className="font-bold text-primary-600">MediaBubble AI</h3>
          <p className="text-xs text-neutral-600">
            {locale === 'en' ? 'Online & ready to help' : 'متاح الآن'}
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {messages.length === 0 && (
          <div className="text-center text-neutral-500 mt-8">
            <p className="text-sm">
              {locale === 'en'
                ? 'Hi! 👋 Ask me about AI-powered marketing'
                : 'مرحبا! 👋 اسأل عن التسويق بالذكاء الاصطناعي'}
            </p>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2.5 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-900'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 px-4 py-2.5 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-neutral-200 flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={locale === 'en' ? 'Type a message...' : 'اكتب رسالة...'}
          disabled={loading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={loading || !input.trim()}
          size="sm"
        >
          Send
        </Button>
      </form>

      {/* Powered by badge */}
      <div className="text-center p-2 text-xs text-neutral-500">
        {locale === 'en' ? 'Powered by Claude AI' : 'مدعوم بـ Claude AI'}
      </div>
    </div>
  )
}
```

### API Route Handler

```typescript
// app/api/chat/route.ts
import Anthropic from '@anthropic-sdk/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { detectLanguage, getSystemPrompt } from '@/lib/chat-helpers'
import { saveChatHistory, createHubSpotLead } from '@/lib/db'

const client = new Anthropic()

interface ChatRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  locale: 'en' | 'ar'
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json()
    const { messages, locale } = body

    // Detect language from last user message
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop()?.content || ''
    const detectedLocale = detectLanguage(lastUserMessage) || locale

    // Get appropriate system prompt
    const systemPrompt = getSystemPrompt(detectedLocale)

    // Call Claude API
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    })

    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : ''

    // Check if should capture lead
    const shouldCaptureLead = checkLeadCaptureIntent(messages, assistantMessage)

    // Save to database
    await saveChatHistory({
      messages: [...messages, { role: 'assistant', content: assistantMessage }],
      locale: detectedLocale,
    })

    return NextResponse.json({
      message: assistantMessage,
      captureLeadData: shouldCaptureLead,
      locale: detectedLocale,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Chat API error' },
      { status: 500 }
    )
  }
}

function checkLeadCaptureIntent(
  messages: Array<{ role: string; content: string }>,
  assistantMessage: string
): boolean {
  const intent = assistantMessage.toLowerCase()
  return (
    intent.includes('email') &&
    intent.includes('schedule') &&
    messages.length > 4
  )
}
```

---

## Part 5: Lead Capture Form

```tsx
// components/LeadCaptureForm.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface LeadData {
  email: string
  phone?: string
  firstName?: string
  company?: string
  serviceInterest?: string
  budget?: string
}

export function LeadCaptureForm({ onSubmit }: { onSubmit: (data: LeadData) => void }) {
  const [formData, setFormData] = useState<LeadData>({ email: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSubmit(formData)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        label="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        label="Phone (optional)"
        value={formData.phone || ''}
        onChange={e => setFormData({ ...formData, phone: e.target.value })}
      />
      <Input
        label="First Name"
        value={formData.firstName || ''}
        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
      />
      <Input
        label="Company"
        value={formData.company || ''}
        onChange={e => setFormData({ ...formData, company: e.target.value })}
      />
      <Button type="submit" fullWidth loading={loading}>
        Schedule Consultation
      </Button>
    </form>
  )
}
```

---

## Part 6: Testing Checklist

- [ ] Test all conversation flows (English)
- [ ] Test all conversation flows (Arabic)
- [ ] Test language switching mid-conversation
- [ ] Test lead capture form
- [ ] Test HubSpot sync
- [ ] Test Cal.com scheduling integration
- [ ] Test on mobile
- [ ] Test with various browsers
- [ ] Test accessibility (screen readers)
- [ ] Load testing (concurrent conversations)
- [ ] API error handling
- [ ] Conversation persistence

---

## Part 7: Analytics & Monitoring

### Metrics to Track

```typescript
interface ChatMetrics {
  conversationId: string
  visitorId: string
  locale: 'en' | 'ar'
  startTime: Date
  endTime: Date
  messageCount: number
  leadCaptured: boolean
  consultationBooked: boolean
  conversationDuration: number // seconds
  lastMessage: string
  leadQualityScore: number // 0-100
}
```

### Dashboard Metrics

1. **Volume Metrics**
   - Total conversations/day
   - Avg messages per conversation
   - Avg conversation duration

2. **Conversion Metrics**
   - Lead capture rate (%)
   - Consultation booking rate (%)
   - Language breakdown

3. **Quality Metrics**
   - User satisfaction (emoji rating)
   - Escalation rate
   - Average lead quality score

4. **Business Metrics**
   - Cost per lead
   - Cost per consultation
   - Conversion to paid client

---

## Summary

The AI Chat Agent is a **core differentiator** for MediaBubble's new website. It demonstrates AI expertise while converting visitors into qualified leads.

**Expected Impact:**
- 🚀 50+ qualified leads/month
- 📈 5% conversion rate (visitor → lead)
- 💬 30% site visitor engagement
- ⏰ 24/7 lead capture (no human needed)
- 🤖 Showcase of MediaBubble's AI capabilities

---

**Ready for Phase 6 implementation!**
