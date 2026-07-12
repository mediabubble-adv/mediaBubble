#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const variants = ['light', 'dark'];

function illustrationPrompt(subject, composition, variant, extra = '') {
  const background =
    variant === 'dark'
      ? 'Deep charcoal #0D0F12 background. Fully isolated subject. Clean negative space around the object. No decorative background elements.'
      : 'Pure white background. Fully isolated subject. Clean negative space around the object. No decorative background elements.';

  return `Create a single marketing website illustration asset for MediaBubble.

Brand mood:
Confident, crafted, calm. Professional creative-studio polish. Functional, not playful. Premium, not flashy.

Subject:
${subject}

Composition:
${composition}

Style:
Flat 2D vector illustration. Crisp edges. Hard clean outlines. Clean geometric shapes. Minimal detail. Flat fills only. No texture. No gradients. No gloss. No bevels. No soft shading. No shadows. No 3D. No photorealism. Avoid the soft dribbble poster look.

Color rules:
Use only #072A6B, #2196F3, #FFC107, and white #FFFFFF. Navy should be dominant. Blue should be secondary. Yellow should be a small accent only. Do not let yellow dominate the composition.

Background:
${background}

Output constraints:
No text. No letters. No numbers. No logos. No watermark. No border. No mockup frame. No extra objects outside the main concept. Keep shapes large and readable at small card sizes.

Asset goal:
Website-ready ${variant}-mode service illustration for a premium agency marketing page. 4:3 composition.${extra ? `\n\nExtra constraints:\n${extra}` : ''}`;
}

function photoPrompt(subject, composition, wardrobe, variant, extra = '') {
  const backgroundRule =
    variant === 'dark'
      ? 'Deep charcoal or very dark neutral studio background with subtle separation light on the subject. Keep the scene premium and controlled, not moody or cinematic. If props are visible, keep them dark and minimal.'
      : 'Neutral light background or modern bright studio environment. If brand colors appear, keep them subtle and intentional. No clutter. No heavy props.';

  return `Create a realistic website photo asset for MediaBubble.

Brand mood:
Confident, crafted, calm. Professional creative agency. Natural and honest. No cheesy stock-photo energy.

Subject:
${subject}

Composition:
${composition}

Wardrobe and styling:
${wardrobe}

Photography style:
Photorealistic. Clean studio or editorial lighting. Natural skin texture. Natural posture. Hands must look anatomically correct. Eyes natural. No beauty filters. No exaggerated bokeh. No cinematic teal-orange grading.

Color and set rules:
${backgroundRule}

Output constraints:
No readable text on screens, whiteboards, clothing, or objects. No logos. No watermark. No extra fingers. No distorted hands. No duplicate limbs. No warped laptops or monitors.

Asset goal:
Premium, trustworthy ${variant}-mode people image for a marketing website.${extra ? `\n\nExtra constraints:\n${extra}` : ''}`;
}

function patternPrompt(subject, composition, variant, extra = '') {
  return `Create a clean website background pattern asset for MediaBubble.

Subject:
${subject}

Composition:
${composition}

Style:
Flat graphic pattern. Precise geometry. Very subtle. No texture. No gradients. No shadows. No 3D. No photorealism.

Output constraints:
Designed for repeating edges and easy tiling cleanup. No text. No logos. No watermark. Keep contrast restrained and professional.

Asset goal:
Quiet premium ${variant}-mode background overlay for a marketing website section.${extra ? `\n\nExtra constraints:\n${extra}` : ''}`;
}

const blueprints = [
  ['seo-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'SEO and search engine optimization.',
      'Centered isolated composition. A large navy magnifying glass overlaps a simplified search UI card. Add a compact upward-trending bar chart and a small number-one ranking badge shape. Keep the layout balanced and readable at small sizes.',
      variant,
      'Use thick stable shapes and clear spacing between elements. The ranking badge should be small and secondary.'
    )],
  ['paid-ads-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Paid digital advertising and PPC campaign performance.',
      'Centered isolated composition. A large cursor arrow clicks a clean ad card. Add a few geometric coin shapes and two upward performance arrows emerging from the card. Keep the scene compact and bold.',
      variant,
      'No glowing effects. Keep the coins simplified and limited in number.'
    )],
  ['social-media-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Social media marketing and audience engagement.',
      'Centered isolated composition. Three stacked feed cards with simple heart, share, and comment icons. Add a few small floating engagement bubbles and one upward signal line. Keep the forms bold and minimal.',
      variant,
      'Do not include readable counters, usernames, or interface labels.'
    )],
  ['branding-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Brand identity design and visual system creation.',
      'Centered isolated composition. A bold abstract geometric logo mark in the center, surrounded by a color swatch circle, a type specimen card, and a simple grid layout card. Balanced radial arrangement.',
      variant,
      'Keep the logo abstract and original. No letters or monograms.'
    )],
  ['web-dev-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Web development and responsive design.',
      'Centered isolated composition. A laptop with a simplified code-editor panel beside a browser-window panel, with a phone and tablet nearby. Clear device silhouettes and a stable visual rhythm.',
      variant,
      'Do not show readable code or UI labels. Use line blocks instead of text.'
    )],
  ['ai-marketing-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'AI-powered marketing automation.',
      'Centered isolated composition. A stylized abstract brain icon in the center with geometric circuit paths extending outward to small gear and spark symbols. Compact and symmetric.',
      variant,
      'Keep the brain abstract and simple. Avoid sci-fi complexity or futuristic neon effects.'
    )],
  ['analytics-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Business analytics and revenue growth.',
      'Centered isolated composition. A rising bar chart with a clean upward line graph over it, plus a small coin stack and compact arrow badges. Stable chart geometry and generous whitespace.',
      variant,
      'No readable axes, labels, or numbers.'
    )],
  ['targeting-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Audience targeting and funnel strategy.',
      'Centered isolated composition. A large bullseye target with three small avatar cards orbiting around it and a simple funnel shape below. Clear visual hierarchy from target to audience to funnel.',
      variant,
      'Keep the avatar cards abstract and icon-like, not detailed portraits.'
    )],
  ['teamwork-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Teamwork and strategic collaboration.',
      'Centered isolated composition. Three abstract human figures arranged in a circle with arms oriented toward a shared star or hub shape in the center. Thin linking arcs suggest collaboration.',
      variant,
      'Keep the figures geometric and calm. Avoid cartoon expressions.'
    )],
  ['serp-illustration', 'illustrations', '1536x1024', (variant) =>
    illustrationPrompt(
      'Search ranking and search results performance.',
      'Centered isolated composition. A browser-window card with simplified result rows, one highlighted top result, and compact upward arrows along the side. Strong emphasis on ranked structure.',
      variant,
      'Do not show any readable text, URLs, or numbers. Use line blocks only.'
    )],
  ['developer-macbook', 'people', '1536x1024', (variant) =>
    photoPrompt(
      'A young Egyptian male software developer, around age 25 to 30, seated at a minimal desk working on a laptop.',
      'Medium shot, 4:3 crop. Subject slightly off-center with breathing room. Looking naturally toward the laptop, relaxed but focused.',
      'Bright yellow crew-neck t-shirt with no logo, clean casual grooming.',
      variant,
      'Laptop screen may show abstract code-like blocks with no readable text.'
    )],
  ['business-owner-campaign', 'people', '1536x1024', (variant) =>
    photoPrompt(
      'A young Egyptian male business owner, around age 28 to 35, reviewing campaign performance on a desktop display.',
      'Medium shot, 4:3 crop. Seated at a modern desk, turned slightly toward a monitor, expression confident and satisfied without exaggeration.',
      'Electric blue crew-neck t-shirt or clean smart-casual top with no logo.',
      variant,
      'Monitor may show abstract chart blocks with no readable text.'
    )],
  ['team-strategy', 'people', '1536x1024', (variant) =>
    photoPrompt(
      'An Egyptian marketing team of three adults, two men and one woman, in a collaborative strategy discussion.',
      'Wide editorial shot with 16:9 feel. Standing near a whiteboard in a bright modern office. Natural interaction, not posed handshake energy.',
      'One man in a yellow t-shirt, one man in a blue t-shirt, one woman in a clean white blouse. No logos.',
      variant,
      'Whiteboard may contain abstract lines and shapes only, with no readable writing.'
    )],
  ['dot-grid-navy', 'patterns', '1024x1024', (variant) =>
    patternPrompt(
      'A precise dot-grid pattern.',
      variant === 'dark'
        ? 'Square tile composition. Solid #072A6B background. Small electric-blue dots arranged in a uniform square grid with wide spacing. Very subtle and consistent.'
        : 'Square tile composition. Pure white background. Small navy dots arranged in a uniform square grid with wide spacing. Very subtle and consistent.',
      variant,
      'The pattern should be easy to crop into a seamless repeat tile. No visible central focal point.'
    )],
  ['wave-bubble-texture', 'patterns', '1536x1024', (variant) =>
    patternPrompt(
      'An abstract wave and bubble overlay texture.',
      variant === 'dark'
        ? 'Wide composition. Solid #072A6B background with a few smooth electric-blue curved bands and sparse circular bubble forms. Gentle horizontal flow, low contrast, no focal subject.'
        : 'Wide composition. Pure white background with very subtle navy and blue curved bands plus sparse pale geometric bubble forms. Gentle horizontal flow, low contrast, no focal subject.',
      variant,
      'Keep it calm and restrained. No dramatic motion or layered complexity.'
    )],
  ['geometric-overlay', 'patterns', '1536x1024', (variant) =>
    patternPrompt(
      'A subtle geometric line overlay.',
      variant === 'dark'
        ? 'Wide composition. Deep charcoal #0D0F12 background with thin electric-blue diagonal lines forming a soft diamond-grid pattern. Quiet and restrained.'
        : 'Wide composition. Pure white background with thin navy diagonal lines forming a light diamond-grid pattern. Very subtle, airy, and quiet.',
      variant,
      'No heavy contrast. No center motif. Designed for overlay use under hero content.'
    )],
];

const assets = blueprints.flatMap(([key, category, size, promptForVariant]) =>
  variants.map((variant) => ({
    key: `${key}-${variant}`,
    size,
    outputPath: `apps/web-eg/public/assets/${category}/${key}-${variant}.png`,
    prompt: promptForVariant(variant),
  }))
);

function parseArgs(argv) {
  const requestedKeys = new Set();

  for (const arg of argv) {
    if (arg.startsWith('--assets=')) {
      for (const key of arg.slice('--assets='.length).split(',')) {
        if (key.trim()) {
          requestedKeys.add(key.trim());
        }
      }
    }
  }

  return { requestedKeys };
}

function getSelectedAssets(requestedKeys) {
  if (requestedKeys.size === 0) {
    return assets;
  }

  const selected = assets.filter((asset) => requestedKeys.has(asset.key));
  const missing = [...requestedKeys].filter(
    (key) => !assets.some((asset) => asset.key === key)
  );

  if (missing.length > 0) {
    throw new Error(`Unknown asset keys: ${missing.join(', ')}`);
  }

  return selected;
}

async function generateAsset(apiKey, asset) {
  const response = await fetch('https://api.openai.com/v1/images', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      size: asset.size,
      quality: 'high',
      prompt: asset.prompt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error for ${asset.key}: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const imageData = payload?.data?.[0]?.b64_json;

  if (!imageData) {
    throw new Error(`No image data returned for ${asset.key}`);
  }

  const outputFile = path.join(rootDir, asset.outputPath);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, Buffer.from(imageData, 'base64'));

  return outputFile;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OPENAI_API_KEY is required to generate assets.');
    console.error(
      'Example: OPENAI_API_KEY=... node scripts/generate-brand-assets.mjs --assets=seo-illustration-light,seo-illustration-dark'
    );
    process.exit(1);
  }

  const { requestedKeys } = parseArgs(process.argv.slice(2));
  const selectedAssets = getSelectedAssets(requestedKeys);

  for (const asset of selectedAssets) {
    console.log(`Generating ${asset.key} -> ${asset.outputPath}`);
    const outputFile = await generateAsset(apiKey, asset);
    console.log(`Saved ${outputFile}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
