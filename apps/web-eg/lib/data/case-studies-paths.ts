/** Local static asset paths under public/assets/case-studies/{id}/ */
export function caseStudyAsset(id: string, name: string, useV2 = false): string {
  return `/assets/case-studies/${id}/${name}${useV2 ? '-v2' : ''}.webp`
}
