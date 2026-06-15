/** Maps public portfolio ids to legacy shared asset folders (EG-origin filenames). */
const ASSET_FOLDER_ALIASES: Record<string, string> = {
  'gulf-divers': 'red-sea-divers',
  'marina-rentals': 'hurghada-rentals',
}

/** Local static asset paths under public/assets/case-studies/{id}/ */
export function caseStudyAsset(id: string, name: string): string {
  const folder = ASSET_FOLDER_ALIASES[id] ?? id
  return `/assets/case-studies/${folder}/${name}.webp`
}
