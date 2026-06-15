# Arabic Numerical & Cultural Conventions

## Eastern vs Western Arabic Numerals

### When to Use Each

| Context | Numeral Style | Example |
|---------|--------------|---------|
| Body text, headings, marketing copy | Eastern Arabic (شرقية) | ١٢٣٤٥ |
| Code, URLs, technical identifiers | Western (غربية) | 12345 |
| UI: prices, dates, counts | Eastern Arabic | ١٬٥٠٠ ج.م |
| UI: input fields (phone, ID) | Western | +20 100 000 0000 |
| Mixed: brand name with number | Western | "MediaBubble 2026" |
| Mixed: numbered list in Arabic text | Eastern | "١. الخطوة الأولى" |

### Display in CSS

Arabic numerals naturally render in the correct form when the correct font and `lang` attribute are used. No special CSS is needed — it's a character set choice in the content.

```html
<!-- Eastern Arabic numerals (for Arabic body text) -->
<p lang="ar">السعر: ١٬٥٠٠ جنيه</p>

<!-- Western numerals (for technical context within Arabic) -->
<p lang="ar">الرمز: <span dir="ltr">ABC-12345</span></p>
```

## Date Formats

| Context | Format | Example |
|---------|--------|---------|
| Arabic body text | dd/mm/yyyy (Eastern numerals) | ١٥/٠٣/٢٠٢٦ |
| English body text | Month dd, yyyy | March 15, 2026 |
| UI date picker | dd/mm/yyyy | 15/03/2026 |
| API / backend | ISO 8601 | 2026-03-15 |
| Formal Arabic documents | String format | ١٥ مارس ٢٠٢٦ |

### Month Names in Arabic

| Month | Arabic Name (Eastern) | Arabic Script |
|-------|----------------------|---------------|
| January | يناير | يناير |
| February | فبراير | فبراير |
| March | مارس | مارس |
| April | أبريل | أبريل |
| May | مايو | مايو |
| June | يونيو | يونيو |
| July | يوليو | يوليو |
| August | أغسطس | أغسطس |
| September | سبتمبر | سبتمبر |
| October | أكتوبر | أكتوبر |
| November | نوفمبر | نوفمبر |
| December | ديسمبر | ديسمبر |

### Day Names

| Day | Arabic | Notes |
|-----|--------|-------|
| Sunday | الأحد | Start of week in Egypt |
| Monday | الإتنين | |
| Tuesday | التلات | |
| Wednesday | الأربع | |
| Thursday | الخميس | |
| Friday | الجمعة | Weekend start |
| Saturday | السبت | Weekend end |

## Time Formats

| Context | Format | Example |
|---------|--------|---------|
| Arabic UI | 12h with ص/م | ٣:٠٠ م |
| English UI | 12h with AM/PM | 3:00 PM |
| 24h format | Used in technical contexts | 15:00 |

### Time markers

| Arabic | Meaning | English Equivalent |
|--------|---------|-------------------|
| ص | صباحاً | AM |
| م | مساءً | PM |

## Currency

| Context | Format | Example |
|---------|--------|---------|
| Arabic UI | Symbol + Eastern numerals | ١٬٥٠٠ ج.م |
| English UI | EGP + Western numerals | 1,500 EGP |
| Mixed / Tech | EGP + Western numerals | EGP 1,500 |
| Price display | Short form | ١٬٥٠٠ ج |

### Currency Symbols

| Symbol | Meaning | When to Use |
|--------|---------|-------------|
| ج.م | جنيه مصري | Arabic content, formal |
| جـ | جنيه (short) | Arabic content, informal |
| EGP | Egyptian Pound | English content, technical |
| LE | Livre Egyptienne | Legacy / banking |

### Number formatting

| Rule | Example |
|------|---------|
| Thousands separator: comma | ١٬٠٠٠٬٠٠٠ |
| Decimal separator: point | ١٫٥ |
| Negative sign: prefix | -١٠٠ |
| Percentage: suffix | ٢٠٪ |

## Phone Numbers

| Component | Format |
|-----------|--------|
| Country code | +20 |
| Mobile prefix | 10x, 11x, 12x, 15x |
| Format | +20 100 000 0000 |
| Display in UI | +20 100 000 0000 (Western numerals always) |

## Addresses

Arabic addresses are structured differently from English:

| English Order | Arabic Order |
|--------------|--------------|
| Building → Street → Area → City → Country | Country → City → Area → Street → Building |

## RTL + Numbers: Mixed Content

When numbers appear in RTL Arabic text, they should be embedded in the text directionally:

```html
<!-- Correct: number in RTL text -->
<p dir="rtl">رصيدك: ١٬٥٠٠ جنيه (آخر تحديث: ١٥/٠٣/٢٠٢٦)</p>

<!-- Phone numbers are always LTR islands in RTL text -->
<p dir="rtl">اتصل بنا: <span dir="ltr">+20 100 000 0000</span></p>
```

## CSS for Numerals

```css
/* Force Eastern numerals in Arabic content */
html[lang="ar"] .price {
  font-variant-numeric: traditional;
}

/* Western numerals for technical content */
.code-snippet {
  font-variant-numeric: tabular-nums;
}
```
