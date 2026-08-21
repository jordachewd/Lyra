import {unstable_noStore as noStore} from 'next/cache'
import {type GlobalsData} from '@/lib/zod/website/layout/globals'
import {ZodError} from 'zod'
import {formatZodError} from '@/lib/zod/lib/format-zod-error'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {cacheByTag} from './caching/cache-by-tag'
import {fetchGlobals} from './utils/fetch-globals'

export async function getGlobals(): Promise<GlobalsData | null> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  if (isPreview) {
    noStore()
    return fetchGlobals()
  }

  try {
    const cached = cacheByTag(fetchGlobals, {
      keyParts: ['globals'],
      tags: ['site:globals'],
      revalidate: 1,
    })

    return cached()
  } catch (err: unknown) {
    const base = `Failed to load Website Settings.`
    const detail =
      err instanceof ZodError
        ? formatZodError(err)
        : err instanceof Error
          ? err.message
          : 'Unknown error'

    throw new Error(`${base}\n${detail}`)
  }
}
