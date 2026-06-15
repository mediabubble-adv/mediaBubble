import { STORAGE_KEYS } from '../storage-keys'

export const COOKIE_CONSENT_KEY = STORAGE_KEYS.cookieConsent

export type ConsentStatus = 'accepted' | 'declined' | null

export const COOKIE_CONSENT_GRANTED_EVENT = 'cookieConsentGranted'
