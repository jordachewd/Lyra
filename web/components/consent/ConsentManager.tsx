import {getServerConsent, shouldRenew} from '@/lib/consent/server'
import type {StoredConsent} from '@/lib/types/consent'
import ConsentDialogClient from './ConsentDialogClient'

export default async function ConsentManager() {
  const serverConsent: StoredConsent | null = await getServerConsent()
  const needsRenew = shouldRenew(serverConsent)

  return <ConsentDialogClient initial={serverConsent} show={!serverConsent || needsRenew} />
}
