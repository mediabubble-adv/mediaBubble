# Image Optimization Standards — MediaBubble

## File Size Requirements

| Use Case            | Max Size | Target               |
| ------------------- | -------- | -------------------- |
| Hero / full-width   | 250 KB   | 150–200 KB           |
| Service / feature   | 150 KB   | 80–120 KB            |
| Portfolio thumbnail | 80 KB    | 40–60 KB             |
| Blog featured       | 120 KB   | 70–100 KB            |
| Logo / icon         | 20 KB    | < 10 KB (prefer SVG) |

## Recommended Dimensions

| Use Case               | Dimensions    | Aspect Ratio |
| ---------------------- | ------------- | ------------ |
| Hero images            | 1920 × 1080   | 16:9         |
| Service section        | 1200 × 800    | 3:2          |
| Portfolio / case study | 1200 × 900    | 4:3          |
| Blog featured          | 1200 × 630    | 16:9         |
| Thumbnails             | 400 × 300 min | 4:3          |
| OG / social share      | 1200 × 630    | 16:9         |

## Format Priority

1. **AVIF** — best compression, modern browsers (Chrome 85+, Firefox 93+, Safari 16+)
2. **WebP** — excellent compression, broad support (Chrome 23+, Firefox 65+, Safari 14+)
3. **JPEG** — fallback for photos
4. **PNG** — only for images requiring transparency
5. **SVG** — logos, icons, illustrations (vector)

Next.js `<Image>` automatically serves AVIF/WebP when `formats: ['image/avif', 'image/webp']` is set in `next.config.js` — no manual conversion needed for images imported through the component.

## Technical Specifications

- **Resolution:** 72 DPI (screen); 2× for retina via Next.js `sizes` prop
- **Color space:** sRGB
- **Lazy loading:** Use `loading="lazy"` for below-the-fold images; `priority` prop for LCP images
- **`sizes` prop:** Always set on `<Image fill>` and large responsive images

```tsx
// ✅ Correct
<Image
  src="/hero.jpg"
  alt="MediaBubble team in Hurghada office"
  width={1200}
  height={630}
  priority          // above-the-fold / LCP
  sizes="100vw"
/>

// ✅ Correct — responsive grid image
<Image
  src="/portfolio/rebrand.jpg"
  alt="Coral Beach Resort brand identity redesign"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

## Alt Text Standards

**Format:** `[What the image shows] — [context if not obvious from surrounding text]`

| ❌ Bad        | ✅ Good                                                                |
| ------------- | ---------------------------------------------------------------------- |
| `""` (empty)  | `"MediaBubble team reviewing campaign analytics"`                      |
| `"image.jpg"` | `"Before-and-after comparison of Coral Beach Resort website redesign"` |
| `"photo"`     | `"Hurghada marina at sunset — location of our office"`                 |
| `"banner"`    | `"Google Ads dashboard showing 340% organic traffic increase"`         |

Decorative images (purely visual, no information) should use `alt=""` and `aria-hidden="true"`.

## Optimization Tools

| Tool            | Platform          | Use Case                        |
| --------------- | ----------------- | ------------------------------- |
| Squoosh         | Web (squoosh.app) | Manual conversion + compression |
| ImageOptim      | macOS             | Batch lossless optimization     |
| Sharp           | Node.js           | Build-time automated processing |
| TinyPNG/TinyJPG | Web               | Quick PNG/JPEG compression      |
| SVGO            | CLI               | SVG minification                |

## Checklist Before Uploading

- [ ] File size within budget for use case
- [ ] Correct dimensions (no upscaling)
- [ ] WebP or AVIF format (with JPEG/PNG fallback if needed)
- [ ] Descriptive alt text written
- [ ] `loading="lazy"` or `priority` set appropriately
- [ ] `sizes` prop set on responsive images
