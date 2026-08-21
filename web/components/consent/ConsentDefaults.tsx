import {headers} from 'next/headers'
import Script from 'next/script'

export default async function ConsentDefaults() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <Script
      nonce={nonce}
      id="arratech-consent-defaults"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',              
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
          `,
      }}
    />
  )
}
