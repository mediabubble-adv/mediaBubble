# RTL-Optimized Component Specifications

Each component spec includes: LTR vs RTL layout, CSS implementation, and testing notes.

## 1. Navigation Bar

### Layout

```
LTR:  [Logo] [Nav Items] [Lang Switcher] [CTA]
RTL:  [CTA] [Lang Switcher] [Nav Items] [Logo]
```

### Implementation

```html
<nav dir="auto">
  <a href="/" class="logo">MediaBubble</a>
  <ul class="nav-menu">
    <li><a href="/services">الخدمات</a></li>
    <li><a href="/about">عن المنصة</a></li>
    <li><a href="/contact">تواصل معانا</a></li>
  </ul>
  <div class="lang-switcher">EN / AR</div>
  <a href="/contact" class="cta-button">احجز استشارة</a>
</nav>
```

```css
nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-inline: 1.5rem;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
  margin-inline-start: auto; /* Pushes nav to opposite side */
  list-style: none;
}

/* RTL overrides */
[dir="rtl"] nav .cta-button {
  /* CTA on the far left in RTL */
  order: -1;
}
```

### Testing

- [ ] Logo is on the right edge in RTL
- [ ] Dropdown menus open in the correct direction
- [ ] Language switcher is on the opposite side from logo
- [ ] Hamburger menu (mobile) is on the side opposite the logo

---

## 2. Form Field

### Layout

```
LTR:  [Label] [Input] [Hint/Error]
RTL:  [Hint/Error] [Input] [Label]
```

### Implementation

```css
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-field__label {
  text-align: start;
  font-weight: 600;
}

.form-field__input {
  text-align: start;
  padding-inline: 1rem;
  border: 1px solid;
  border-color: var(--color-border);
}

.form-field__error {
  text-align: start;
  color: var(--color-error);
}
```

### Testing

- [ ] Label is on the right in RTL
- [ ] Input cursor starts on the right
- [ ] Error message is on the left in RTL
- [ ] Placeholder text aligns correctly

---

## 3. Card

### Layout

```
LTR:  [Image] [Title] [Description] [Action]
RTL:  [Action] [Description] [Title] [Image]
```

Flex and grid automatically reverse in RTL. Test to confirm.

### Implementation

```css
.card {
  display: flex;
  flex-direction: column;
  text-align: start; /* Aligns text per direction */
}

.card__media {
  /* Media content — direction-agnostic */
}

.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card__actions {
  display: flex;
  gap: 0.5rem;
  justify-content: start; /* Start = left LTR, right RTL */
}
```

### Testing

- [ ] Card text aligns correctly (start-aligned)
- [ ] Card actions are on the correct side
- [ ] Cards in a grid flow in correct reading order
- [ ] RTL: first card is top-right

---

## 4. Data Table

### Layout

```
LTR:  [Col A] [Col B] [Col C]
      [Data]  [Data]  [Data]
RTL:  [Col C] [Col B] [Col A]
      [Data]  [Data]  [Data]
```

### Implementation

```css
.table {
  width: 100%;
  text-align: start;
}

.table th,
.table td {
  padding-inline: 1rem;
  padding-block: 0.75rem;
  text-align: start;
}

/* Numeric columns should always align right */
.table td.numeric {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
```

### Testing

- [ ] Column order reverses in RTL
- [ ] Text within cells aligns start
- [ ] Numeric columns still align right
- [ ] Sort indicators point in correct direction

---

## 5. Progress Bar

### Implementation

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-bg-muted);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
  /* Width percentage from 0-100 works naturally in RTL */
}

/* For RTL, the fill starts from the right side automatically
   when using width + dir="rtl" */
```

### Testing

- [ ] Bar fills from right in RTL
- [ ] Percentage label position matches fill direction
- [ ] Animation direction correct

---

## 6. Carousel / Slider

### Implementation

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  /* In RTL, scroll direction reverses automatically */
}

.carousel__item {
  flex: 0 0 100%;
  scroll-snap-align: start; /* start = left LTR, right RTL */
}

/* Arrow buttons */
.carousel__btn-prev,
.carousel__btn-next {
  /* Icons are mirrored in RTL */
}

[dir="rtl"] .carousel__btn-prev .icon,
[dir="rtl"] .carousel__btn-next .icon {
  transform: scaleX(-1);
}
```

### Testing

- [ ] Swipe direction reverses in RTL
- [ ] Dots/pagination position matches direction
- [ ] Arrow icons point correctly (mirrored)
- [ ] Auto-play slides move in correct direction

---

## 7. Accordion

### Implementation

```css
.accordion__trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: start;
  padding-inline: 1rem;
}

.accordion__icon {
  margin-inline-start: auto;
  transition: transform 0.2s;
}

[dir="rtl"] .accordion__icon {
  /* Icon doesn't need mirroring, but position should be start-aligned */
}

.accordion__trigger[aria-expanded="true"] .accordion__icon {
  transform: rotate(180deg);
}
```

### Testing

- [ ] Trigger text aligns right in RTL
- [ ] Expand/collapse icon is on the left in RTL
- [ ] Icon rotation animation works in both directions

---

## 8. Modal / Dialog

### Implementation

```css
.modal {
  position: fixed;
  inset: 0; /* Logical: covers all sides */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__content {
  text-align: start;
  padding: 2rem;
  max-width: 90%;
}

.modal__close {
  position: absolute;
  inset-inline-end: 1rem; /* Right in LTR, Left in RTL */
  top: 1rem;
}
```

### Testing

- [ ] Close button is on the correct side
- [ ] Text inside modal aligns correctly
- [ ] Focus trap respects reading direction
- [ ] Backdrop dismiss behavior matches expectation

---

## 9. Breadcrumbs

### Layout

```
LTR:  Home > Services > SEO
RTL:  SEO < Services < Home
```

### Implementation

```css
.breadcrumbs {
  display: flex;
  gap: 0.5rem;
  list-style: none;
}

.breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumbs__separator {
  /* Use directional arrow that mirrors in RTL */
}

[dir="rtl"] .breadcrumbs__separator svg {
  transform: scaleX(-1);
}
```

### Testing

- [ ] Order reverses correctly
- [ ] Separator icon ( / or > ) mirrors in RTL
- [ ] Home link position is correct (opposite corners)

---

## 10. Pagination

### Layout

```
LTR:  [«] [1] [2] [3] [»]
RTL:  [»] [1] [2] [3] [«]
```

### Implementation

```css
.pagination {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  direction: ltr; /* Pagination numbers are direction-agnostic */
}

/* Alternative: keep direction RTL and mirror icons */
[dir="rtl"] .pagination .icon-prev,
[dir="rtl"] .pagination .icon-next {
  transform: scaleX(-1);
}
```

### Testing

- [ ] First page is on the correct side
- [ ] Previous/Next icons are correctly mirrored
- [ ] Ellipsis position matches direction
