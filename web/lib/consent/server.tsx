import type {StoredConsent} from '@/lib/types/consent'
import {cookies} from 'next/headers'
import {CONSENT_VERSION, CONSENT_COOKIE_NAME} from '../const/consent'

export function defaultConsent(): StoredConsent {
  return {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    state: {
      required: true,
      preferences: false,
      statistics: false,
      marketing: false,
    },
  }
}

function parseConsent(raw: string | undefined): StoredConsent | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as StoredConsent
    if (!parsed?.state || parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function shouldRenew(consent: StoredConsent | null): boolean {
  if (!consent) return true
  try {
    const ts = new Date(consent.timestamp).getTime()
    const now = Date.now()
    const twelveMonths = 365 * 24 * 60 * 60 * 1000
    return now - ts > twelveMonths || consent.version !== CONSENT_VERSION
  } catch {
    return true
  }
}

export async function getServerConsent(): Promise<StoredConsent | null> {
  const cookieStore = await cookies()
  const c = cookieStore.get(CONSENT_COOKIE_NAME)?.value
  return parseConsent(c)
}
