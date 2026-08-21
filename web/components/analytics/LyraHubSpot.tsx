import {defaultConsent, getServerConsent} from '@/lib/consent/server'
import type {StoredConsent} from '@/lib/types/consent'
import {headers} from 'next/headers'
import Script from 'next/script'
import HubspotConsentLoader from './HubspotConsentLoader'

type HubSpotProps = {
  id: string
}

export default async function LyraHubSpot({id}: HubSpotProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const serverConsent: StoredConsent | null = await getServerConsent()
  const consent = serverConsent ?? defaultConsent()
  const isMarketing = !!consent.state.marketing

  if (isMarketing)
    return (
      <Script
        nonce={nonce}
        id="hs-script-loader"
        strategy="afterInteractive"
        src={`https://js.hs-scripts.com/${id}.js`}
      />
    )

  return <HubspotConsentLoader portalId={id} nonce={nonce} initialMarketing={false} />
}
