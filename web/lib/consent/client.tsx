import type {ClientConsentState, StoredConsent} from '@/lib/types/consent'
import {CONSENT_VERSION, CONSENT_COOKIE_NAME} from '../const/consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (
      command: 'consent' | 'config' | 'event' | 'js',
      action: string | Date,
      params?: Record<string, unknown>,
    ) => void
  }
}

export function applyConsentToGtag(state: ClientConsentState): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  const statistics = state.statistics ? 'granted' : 'denied'
  const marketing = state.marketing ? 'granted' : 'denied'
  const preferences = state.preferences ? 'granted' : 'denied'

  window.gtag('consent', 'update', {
    analytics_storage: statistics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    functionality_storage: preferences,
    personalization_storage: marketing,
    security_storage: 'granted',
    wait_for_update: 500,
  })
}

/** Used in Forms */
function parseStoredConsent(raw: string): StoredConsent | null {
  try {
    const parsed = JSON.parse(raw) as StoredConsent
    if (!parsed || typeof parsed !== 'object') return null
    if (parsed.version !== CONSENT_VERSION) return null
    if (!parsed.state) return null
    return parsed
  } catch {
    return null
  }
}

function readConsentFromCookie(): StoredConsent | null {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';').map((c) => c.trim())
  const match = cookies.find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`))
  if (!match) return null
  const value = decodeURIComponent(match.split('=')[1] || '')
  return parseStoredConsent(value)
}

export function readConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null

  const fromCookie = readConsentFromCookie()
  if (fromCookie) return fromCookie

  try {
    const ls = window.localStorage.getItem(CONSENT_COOKIE_NAME)
    if (!ls) return null
    return parseStoredConsent(ls)
  } catch {
    return null
  }
}
