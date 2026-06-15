# Arabic Design — Layout Patterns & RTL Recipes

## RTL Grid Layout Guide

### Flexbox RTL

```css
.container {
  direction: rtl;
  display: flex;
  gap: var(--space-md);
}
```

⚠️ **Key watchpoint**: Avoid `flex-direction: row-reverse` — it reverses visual order of flex items, not the logical flow. Use `direction: rtl` + `flex-direction: row` for natural RTL.

### CSS Grid RTL

```css
.grid {
  direction: rtl;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

⚠️ Grid items read right-to-left in source order — works correctly if source order matches visual hierarchy. If you need left-to-right grid for specific items, override with `direction: ltr` on the item.

## Common Layout Patterns

| Pattern | RTL Approach | Before / After |
|---------|-------------|----------------|
| Hero: Image left, text right | Keep image on right side in source; text on left | LTR: image right, text left → RTL: image right (stays), text left (stays) — but padding/margin flips |
| Navbar: Logo left, links right | Logo still visually left; links shift right | Logo needs its own row or `margin-left: auto` becomes `margin-right: auto` |
| Card grid: 3-column | direction: rtl — cards wrap right-to-left | First card is visually top-right |
| Sidebar: Left | Sidebar becomes right column | `grid-area: sidebar` stays same name; layout flips |
| Form: Label left, input right | Label right, input left | Swap text-align on labels to right |

## Text & Typography RTL Rules

| Element | RTL Rule |
|---------|----------|
| Body text | `text-align: right` (optional but common) |
| Numbers in Arabic text | Should remain LTR within RTL flow (CSS handles automatically) |
| Mixed LTR/RTL | Use `<bdi>` for user-generated content |
| Ellipsis overflow | Works correctly in RTL with `text-overflow: ellipsis` |
| Paragraph margins | `margin-right: 0; margin-left: var(--space)` flipped |
| Drop cap | Drop cap should align right in RTL; not supported in all CSS |
| Underline | Works; position is always bottom regardless of direction |
