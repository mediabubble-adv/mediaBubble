/** Maps public portfolio ids to legacy shared asset folders (EG-origin filenames). */
const ASSET_FOLDER_ALIASES: Record<string, string> = {
  'gulf-divers': 'red-sea-divers',
  'marina-rentals': 'hurghada-rentals',
}

/** Local static asset paths under public/assets/portfolio/{id}/ */
export function portfolioAsset(id: string, name: string): string {
  const folder = ASSET_FOLDER_ALIASES[id] ?? id
  return `/assets/portfolio/${folder}/${name}.webp`
}
