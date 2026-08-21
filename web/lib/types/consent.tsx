export type ViewMode = 'banner' | 'modal' | 'hidden'

type ConsentState = {
  required: true
  preferences: boolean
  statistics: boolean
  marketing: boolean
}

export type StoredConsent = {
  version: number
  timestamp: string // ISO
  state: ConsentState
}

export type ClientConsentState = {
  preferences: boolean
  statistics: boolean
  marketing: boolean
}
