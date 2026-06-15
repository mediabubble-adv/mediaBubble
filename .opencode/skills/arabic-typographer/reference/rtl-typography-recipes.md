# Arabic Typography — RTL Typography CSS Recipes

## Baseline Setup

```css
:root {
  --font-arabic: 'Noto Naskh Arabic', 'Amiri', serif;
  --font-latin: 'Inter', system-ui, sans-serif;
}

[dir="rtl"] {
  font-family: var(--font-arabic);
  line-height: 1.8; /* Arabic needs taller lines for diacritics */
}
```

## Key RTL CSS Properties

| Property | LTR Default | RTL Override |
|----------|-------------|--------------|
| `text-align` | left | right |
| `padding-inline-start` | padding-left | padding-right |
| `margin-inline-start` | margin-left | margin-right |
| `border-inline-start` | border-left | border-right |
| `inset-inline-start` | left | right |

## Diacritic Handling

```css
/* Prevent diacritics clipping */
.arabic-text {
  line-height: 2;
  overflow: visible;
  -webkit-font-feature-settings: "kern" 1, "mark" 1, "mkmk" 1;
  font-feature-settings: "kern" 1, "mark" 1, "mkmk" 1;
}
```

## Numeral Conventions

```css
/* Eastern Arabic numerals (١٢٣) — default */
.arabic-numerals {
  font-variant-numeric: arabic-indic;
}

/* Western Arabic numerals (123) — for mixed contexts */
.latin-numerals {
  font-variant-numeric:;
}
```
