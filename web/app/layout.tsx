import ConsentManager from '@/components/consent/ConsentManager'
import BodyClassManager from '@/components/layout/body/BodyClassManager'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import {isProduction, isStaging} from '@/lib/const/env'
import {getGlobals} from '@/lib/data/globals'
import {arrBuildMetadata} from '@/lib/utils/seo/metadata/build-metadata'
import RootJsonLd from '@/components/seo/RootJsonLd'
import type {GlobalsData} from '@/lib/zod/website/layout/globals'
import type {GoogleSchema, HubspotSchema} from '@/lib/zod/website/settings/tracking'
import classNames from 'classnames'
import {Metadata} from 'next'
import {cookies} from 'next/headers'
import {notFound} from 'next/navigation'
import {ReactNode} from 'react'
import {inter} from './fonts'
import StagingBanner from '@/components/layout/StagingBanner'
import ArrGtm from '@/components/analytics/ArrGtm'
import ArrHubSpot from '@/components/analytics/ArrHubSpot'
import ConsentDefaults from '@/components/consent/ConsentDefaults'
import './globals.scss'
import './styles.scss'

type RootLayoutProps = {
  children: ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  if (!isProduction) return {}

  return arrBuildMetadata({
    ogType: 'website',
  })
}

export default async function RootLayout({children}: RootLayoutProps) {
  /** Globals */
  const globals = (await getGlobals()) as GlobalsData | null
  if (!globals) notFound()
  const {header, footer, settings} = globals

  /** Google Tag Manager */
  const google = settings?.tracking?.google as GoogleSchema
  const isGtm = !!google?.enabled
  const gTagManagerId = google?.gTagManagerId ?? undefined

  /** Hubspot */
  const hubspot = settings?.tracking?.hubspot as HubspotSchema
  const isHbs = !!hubspot?.enabled
  const hbPortalId = hubspot?.portalId ?? undefined

  /** Body Classes */
  const cookieStore = await cookies()
  const pageClass = cookieStore.get('__page_class')?.value ?? ''
  const bodyClass = classNames(inter.className, pageClass)

  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <head>
        {/* Consent Defaults (inline, nonced, runs beforeInteractive) */}
        <ConsentDefaults />
        {/* Google Tag Manager bootstrap (inline, nonced, runs beforeInteractive) */}
        {isGtm && gTagManagerId && <ArrGtm gtmId={gTagManagerId} />}
      </head>

      <body className={bodyClass}>
        {/* Google Tag Manager (noscript) */}
        {isGtm && gTagManagerId && <ArrGtm gtmId={gTagManagerId} noscript />}

        {/* Body Class Manager */}
        <BodyClassManager />

        {/* Website Body */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {header && <Header data={header} />}
        {children}
        {footer && <Footer data={footer} />}

        {/* Staging Banner */}
        {isStaging && <StagingBanner />}

        {/* Consent Manager */}
        <ConsentManager />

        {/* Website JSON-LD */}
        {isProduction && <RootJsonLd />}

        {/* Hubspot Tracking Code */}
        {isHbs && hbPortalId && <ArrHubSpot id={hbPortalId} />}
      </body>
    </html>
  )
}
