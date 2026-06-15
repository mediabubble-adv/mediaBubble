export interface LegalSection {
  heading: string
  body: string | string[]
}

export interface LegalLocaleContent {
  kicker: string
  title: string
  sections: LegalSection[]
}

export interface LegalDocumentConfig {
  lastUpdated: string
  en: LegalLocaleContent
  ar: LegalLocaleContent
}
