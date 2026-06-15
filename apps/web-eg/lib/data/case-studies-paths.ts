/** Local static asset paths under public/assets/case-studies/{id}/ */
export function caseStudyAsset(id: string, name: string): string {
  return `/assets/case-studies/${id}/${name}.webp`
}
