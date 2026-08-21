'use client'

import {useEffect, useState} from 'react'
import Script from 'next/script'

type Props = {
  portalId: string
  nonce?: string
  initialMarketing: boolean
}

export default function HubspotConsentLoader({portalId, nonce, initialMarketing}: Props) {
  const [shouldLoad, setShouldLoad] = useState<boolean>(initialMarketing)

  useEffect(() => {
    if (shouldLoad) return

    function onUpdate(e: Event) {
      const detail = (e as CustomEvent).detail as {state?: {marketing?: boolean}} | undefined
      if (detail?.state?.marketing) setShouldLoad(true)
    }

    window.addEventListener('lyra-consent-updated', onUpdate)
    return () => window.removeEventListener('lyra-consent-updated', onUpdate)
  }, [shouldLoad])

  return shouldLoad ? (
    <Script
      nonce={nonce}
      id="hs-script-loader"
      strategy="afterInteractive"
      src={`https://js.hs-scripts.com/${portalId}.js`}
    />
  ) : null
}
