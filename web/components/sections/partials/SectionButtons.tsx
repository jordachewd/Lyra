import {CtaButton} from '@/lib/zod/sections/layout/cta-button'
import SectionButtonsClient from './SectionButtonsClient'
import {getGlobals} from '@/lib/data/globals'
import type {GlobalsData} from '@/lib/zod/website/layout/globals'
import {getServerConsent, defaultConsent} from '@/lib/consent/server'
import type {StoredConsent} from '@/lib/types/consent'
import {isProduction} from '@/lib/const/env'
import type {GoogleSchema} from '@/lib/zod/website/settings/tracking'

type ButtonsProps = {
  buttons: CtaButton[]
  className?: string
  location?: string
}

export default async function SectionButtons({
  buttons,
  className,
  location = 'unknown',
}: ButtonsProps) {
  if (!buttons || buttons.length === 0) return null

  /** Get Consent */
  const serverConsent: StoredConsent | null = await getServerConsent()
  const consent = serverConsent ?? defaultConsent()
  const marketingAllowed = !!consent.state.marketing

  /** Get Globals */
  const globals = (await getGlobals()) as GlobalsData | null
  const google = globals?.settings?.tracking?.google as GoogleSchema
  const sendEvent = (google?.enabled ?? false) && marketingAllowed

  return (
    <SectionButtonsClient
      buttons={buttons}
      location={location}
      className={className}
      sendEvent={sendEvent && isProduction}
    />
  )
}
