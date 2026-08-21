import {draftMode} from 'next/headers'
import {sanityPreviewClient, sanityClient} from './client-config'
import {isDevelopment} from '../../const/env'

export async function getSanityClient() {
  const {isEnabled} = await draftMode()
  const allowPreview = isDevelopment && isEnabled

  return allowPreview ? sanityPreviewClient : sanityClient
}
