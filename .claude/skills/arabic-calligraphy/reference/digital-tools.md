# Digital Calligraphy Tools & Workflows

## Tool Categories

| Category | Tools | Best For |
|----------|-------|----------|
| Drawing / Sketching | Procreate, Adobe Fresco, Concepts | Rough sketches, exploring directions, client presentations |
| Vector Design | Adobe Illustrator, Affinity Designer, Inkscape | Final vector artwork, curve refinement, logo deliverables |
| Font Creation | Glyphs, FontLab, FontForge, RoboFont | Turning calligraphy into functional typefaces |
| Calligraphy-Specific | Calligraphr, iFontMaker, Metaflop | Quick font generation from calligraphy samples |
| 3D & Motion | Cinema 4D, Blender, After Effects | Dimensional calligraphy, animated lettering |

## Primary Workflow

### Phase 1: Sketching (Procreate / iPad)

**Recommended setup:**
- iPad Pro 12.9" (screen real estate matters)
- Apple Pencil (2nd gen or Pro)
- Paper-like screen protector (optional, adds friction)

**Brush recommendations:**
- **Classical Naskh/Thuluth:** Studio Pen (adjusted), custom qalam brushes
- **Kufi:** Monoline brush, technical pen
- **Diwani:** Fine tip brush, script brush
- **Ruq'ah:** Technical pen, fine liner

**Procreate techniques:**
- Use streamline (stabilization) at 10-20% for smooth curves
- Multiple layers for: baseline grid → letter roughs → refinement → decoration
- Color code layers: rough (blue), refined (black), final (dark)
- Export timelapse for client process storytelling

### Phase 2: Vector Conversion (Illustrator)

**Methods:**

| Method | When to Use | Pros | Cons |
|--------|-------------|------|------|
| Image Trace | Quick conversions, rough drafts | Fast, easy | Messy paths, too many anchor points |
| Manual Pen Tool | Final artwork, logos | Clean curves, precise | Time-consuming, requires skill |
| Hybrid | Complex pieces | Balance of speed and quality | Two-step process |

**Image Trace settings for calligraphy:**
- Preset: Custom
- Mode: Black and White
- Threshold: 128 (adjust per piece)
- Paths: 50-70%
- Corners: 50-70%
- Noise: 1px
- Expand → Unite (merge overlapping shapes)

**Manual pen tool workflow:**
1. Place sketch at 30% opacity
2. Create baseline and x-height guides
3. Draw each letter as a filled shape (not strokes followed by Expand)
4. Use as few anchor points as possible
5. Bezier handles should align with the natural curve direction
6. Use smooth point (not corner point) for flowing curves

**Anchor point hygiene:**
- Naskh/Thuluth: Smooth curves every 50-100px
- Kufi: Corner points at every angle change
- Diwani: Dense points in tight turns, sparse on long strokes
- Ruq'ah: Sparse points, mostly short straight segments

### Phase 3: Refinement & Export

**Stroke weight consistency check:**
- Use Illustrator's Stroke panel → Show Options → Weight profile
- Visual check: zoom to 400% — no uneven thinning/thickening in curves
- For logos: simulate 32px rendering (View → Pixel Preview)

**Export formats:**

| Format | Use Case | Settings |
|--------|----------|----------|
| SVG | Web, digital | Outlines only, no strokes |
| PNG 2× | Presentation, social | 1200px wide, transparent bg |
| PDF | Print, client delivery | CMYK, outlines, crop marks |
| EPS | Legacy print | Outlines, Illustrator 8 compatible |
| Font file | Typeface creation | .otf with proper Unicode mapping |

## Tool-Specific Workflows

### Adobe Illustrator

**Calligraphy-specific features:**
- **Width Tool (Shift+W)** — Adjust stroke weight dynamically, useful for Thuluth-like variation
- **Blob Brush Tool (Shift+B)** — Draw filled shapes directly (good for Ruq'ah)
- **Brush Definition** — Create custom calligraphy brushes from scanned ink strokes
- **Path Simplify** — Reduce anchor points: Object → Path → Simplify (80-90% curve precision)

**Plugins:**
- **Astute Graphics** — VectorScribe (anchor point tools)
- **Eagle** — Reference image library integration

### Glyphs (Font Creation)

**Workflow:**
1. Import vector calligraphy as individual letter SVGs
2. Map each to the correct Unicode code point
3. Set sidebearings (left/right spacing) per letter
4. Add kerning pairs for common connections
5. Generate OpenType features for ligatures and stylistic alternates
6. Export as .otf or .woff2

**Arabic-specific settings:**
- Script: Arabic
- Direction: Right-to-left
- Mark positioning: Anchor-based (fatha, damma, kasra, etc.)
- Required OpenType features: `init`, `medi`, `fina`, `isol`, `rlig`

### Procreate

**Brush creation for calligraphy:**
1. New brush → Shape → Edit → Draw a qalam nib shape (rectangle with angled tip)
2. Grain → None
3. Apple Pencil → Pressure: Size (100%), Opacity (0%)
4. Stabilization → Streamline (10-20%)
5. Save as custom brush set

**Layer management:**
- Sketch layer at 30% opacity (blue)
- Refined sketch at 50% opacity (pencil)
- Final inking (black)
- Decorative elements (separate layer)
- Background/effects

### Adobe Fresco

**Best for:** Combined vector + raster calligraphy
**Vector brushes:** Clean, scalable lines with real-time smoothing
**Live brushes:** Watercolor and oil — good for textured calligraphy backgrounds
**Pixel brushes:** For fine detail work and texture overlays

## Hardware Considerations

| Hardware | Best For | Why |
|----------|----------|-----|
| iPad Pro 12.9" + Apple Pencil | Primary calligraphy creation | Large canvas, pressure sensitivity, portability |
| Wacom Cintiq Pro 24" | Professional vector work | Ergonomics, precision, large screen |
| Surface Pro + Slim Pen | Windows-focused workflow | Glyphs/FontLab native, pen input |
| Huion Kamvas | Budget-friendly Cintiq alternative | Good pressure sensitivity, lower cost |

**Screen calibration:**
- sRGB for digital work
- Adobe RGB for print work
- Calibrate monthly with hardware calibrator (i1Display, Spyder)

## File Management

### Naming Convention
```
YYYY-MM-DD_Brand-Name_Script-Type_Version.ai
2026-06-08_MediaBubble_Kufi_v03.ai
```

### Layer Structure (Illustrator)
```
Layer 1: Final Artwork (locked)
Layer 2: Color fills / Effects
Layer 3: Decorative elements
Layer 4: Refined sketch
Layer 5: Original rough (locked, hidden)
```

### Delivery Package
```
project-name/
  sketches/          # Procreate/Fresco files
  vectors/           # .ai, .svg source files
  exports/           # .png, .pdf, .eps deliverables
    digital/         # Web-optimized
    print/           # CMYK, high-res
  font/              # .otf, .woff2 if applicable
  references/        # Brief, moodboard, inspirations
```

## Recommended Plugins & Extensions

| Tool | Plugin | Purpose |
|------|--------|---------|
| Illustrator | VectorScribe | Advanced anchor point control |
| Illustrator | WidthScribe | Dynamic stroke width editing |
| Illustrator | Fontself Maker | Quick font creation from vector letters |
| Glyphs | GlyphsArab | Arabic script features and OT layout |
| Procreate | Brush Studio | Custom calligraphy brush creation |
| Blender | Calligraphy Animation | 3D lettering and extruded calligraphy |

## Appendix: Resolution & Export Cheat Sheet

| Use Case | DPI | Dimensions | Format | Color |
|----------|-----|------------|--------|-------|
| Web logo | 72 | Max 400px width | SVG or PNG | sRGB |
| Print logo | 300 | Based on usage | PDF or EPS | CMYK |
| App icon | 72-144 | 1024×1024 (source) | PNG | sRGB |
| Billboard | 30-50 | As specified | EPS or PDF | CMYK |
| Embroidery | N/A | As specified | EPS (outlines) | PMS |
| Packaging | 300 | As specified | AI or PDF | CMYK + PMS |
