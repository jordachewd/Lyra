import {createClient} from '@sanity/client'
import {projectId, dataset, apiVersion, readToken, isDevelopment} from '../../const/env'

// Warn about missing env vars in development
if (typeof window !== 'undefined' && isDevelopment) {
  const missing = [
    !projectId && 'NEXT_PUBLIC_SANITY_PROJECT_ID',
    !dataset && 'NEXT_PUBLIC_SANITY_DATASET',
  ].filter(Boolean) as string[]

  if (missing.length) {
    console.warn(`[Sanity] Missing environment variable(s): ${missing.join(', ')}`)
  }
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: 'previewDrafts',
})
