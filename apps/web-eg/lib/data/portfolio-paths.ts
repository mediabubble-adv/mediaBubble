/** Local static asset paths under public/assets/portfolio/{id}/ */
export function portfolioAsset(id: string, name: string): string {
  return `/assets/portfolio/${id}/${name}.webp`
}
