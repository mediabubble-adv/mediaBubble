# Arabic Design — RTL UI Pattern Library

## Navigation Patterns

| Pattern | LTR | RTL | CSS Strategy |
|---------|-----|-----|-------------|
| Breadcrumbs | Home > Products | الرئيسية > المنتجات | `flex-direction: row` + `dir="rtl"` |
| Pagination | « 1 2 3 » | » 1 2 3 « | Swap `«` `»` characters; keep `dir="rtl"` |
| Sidebar | Left column | Right column | `grid-template-columns: sidebar main` → swap order |
| Back button | ← Back (left edge) | → رجوع (right edge) | `margin-inline-end: auto` |

## Icon Mirroring — Do Not Mirror

| Icon | Do NOT Mirror | Reason |
|------|--------------|--------|
| ← → arrows | Mirror (←→ ↔ →←) | Directional arrows MUST flip |
| ⌚ Clock | Mirror face keeps direction | Text/person face content is cultural |
| 📞 Phone | Keep LTR orientation | Phone handset orientation is universal |
| 📧 Envelope | Keep | No directional meaning |
| 👍 Thumbs up | Keep | Universal |
| ✉️ Send icon (plane) | Mirror | Direction matters |
| 🗑 Trash | Keep | No directional meaning |

## Form Layout RTL

```html
<form dir="rtl">
  <label for="name">الاسم</label>
  <input type="text" id="name" dir="auto" />
  
  <label for="phone">رقم الهاتف</label>
  <input type="tel" id="phone" dir="ltr" />
  
  <div class="field-row">
    <label><input type="radio" name="gender" /> ذكر</label>
    <label><input type="radio" name="gender" /> أنثى</label>
  </div>
</form>
```

## Responsive Breakpoint Behavior

| Breakpoint | LTR Behavior | RTL Behavior |
|------------|-------------|--------------|
| Desktop (≥1024px) | Sidebar left, content right | Sidebar right, content left |
| Tablet (768–1023px) | Horizontal menu | Same (horizontal) |
| Mobile (<768px) | Hamburger menu bottom-left | Hamburger menu bottom-right |
