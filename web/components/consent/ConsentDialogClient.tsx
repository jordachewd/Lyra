'use client'

import {useEffect, useState} from 'react'
import ConsentCategory from './ConsentCategory'
import {applyConsentToGtag} from '@/lib/consent/client'
import type {ClientConsentState, StoredConsent, ViewMode} from '@/lib/types/consent'

type Props = {
  initial: StoredConsent | null
  show: boolean
}

export default function ConsentDialogClient({initial, show}: Props) {
  const [view, setView] = useState<ViewMode>(show ? 'banner' : 'hidden')
  const [pending, setPending] = useState(false)
  const [prefs, setPrefs] = useState<ClientConsentState>(() => ({
    preferences: initial?.state.preferences ?? false,
    statistics: initial?.state.statistics ?? false,
    marketing: initial?.state.marketing ?? false,
  }))

  const acceptAll = () => persist({preferences: true, statistics: true, marketing: true})

  const rejectAll = () => persist({preferences: false, statistics: false, marketing: false})

  const saveCustom = () => persist(prefs)

  async function persist(next: ClientConsentState) {
    setPending(true)
    const payload: StoredConsent = {
      version: initial?.version ?? 1,
      timestamp: new Date().toISOString(),
      state: {required: true, ...next},
    }

    try {
      applyConsentToGtag(next)

      await fetch('/api/consent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
        keepalive: true,
      })

      // Notify loaders (HubSpot, anything else) that consent changed
      window.dispatchEvent(new CustomEvent('arr-consent-updated', {detail: {state: next}}))

      setView('hidden')
    } catch {
      setView('hidden')
    } finally {
      setPending(false)
    }
  }

  const uiVisible = view !== 'hidden'

  useEffect(() => {
    ;(window as unknown as Record<string, unknown>).showConsentManager = () => setView('modal')
  }, [])

  const actions =
    view === 'banner' ? (
      <div className="consent__actions">
        <button className="arrButton highlighted" onClick={acceptAll} disabled={pending}>
          Accept all
        </button>
        <button className="arrButton highlighted" onClick={rejectAll} disabled={pending}>
          Reject all
        </button>
        <button className="arrButton" onClick={() => setView('modal')} disabled={pending}>
          Customize
        </button>
      </div>
    ) : (
      <div className="consent__actions consent__actions--modal">
        <button className="arrButton highlighted" onClick={saveCustom} disabled={pending}>
          Save choices
        </button>
        <button className="arrButton highlighted" onClick={acceptAll} disabled={pending}>
          Accept all
        </button>
        <button className="arrButton" onClick={rejectAll} disabled={pending}>
          Reject all
        </button>
      </div>
    )

  return uiVisible ? (
    <div
      className={`consent consent--${view}`}
      role="dialog"
      aria-modal="true"
      aria-label="Consent Manager"
    >
      <div className="consent__content">
        <div className={`consent__header ${view === 'banner' ? 'consent__row' : ''}`}>
          <h2 className="consent__title">Privacy & Cookies</h2>
          {view === 'banner' && actions}
        </div>

        <p className="consent__desc">
          We use cookies to run our site and improve your experience. Optional cookies are disabled
          until you consent.
        </p>

        {view === 'modal' && (
          <>
            <div className="consent__categories">
              <ConsentCategory
                title="Required"
                description="Essential for site operation (session/auth, security, load balancing)."
                checked
                disabled
              />
              <ConsentCategory
                title="Preferences"
                description="Saves settings like language or layout."
                checked={prefs.preferences}
                onChange={(v) => setPrefs((s) => ({...s, preferences: v}))}
              />
              <ConsentCategory
                title="Statistics & Analytics"
                description="Anonymous usage analytics (GA/Amplitude/Matomo (cookie mode), A/B testing, performance tools)."
                checked={prefs.statistics}
                onChange={(v) => setPrefs((s) => ({...s, statistics: v}))}
              />
              <ConsentCategory
                title="Marketing"
                description="Advertising and marketing tools such as ads (Google/Meta/LinkedIn), remarketing, HubSpot tracking cookies, third-party widgets."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((s) => ({...s, marketing: v}))}
              />
            </div>
            {actions}
          </>
        )}
      </div>
    </div>
  ) : null
}
