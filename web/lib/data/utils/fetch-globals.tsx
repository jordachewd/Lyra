import {GLOBALS_QUERY} from '@/lib/queries/globals'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {type GlobalsData, GlobalsSchema} from '@/lib/zod/website/layout/globals'

export async function fetchGlobals(): Promise<GlobalsData | null> {
  const client = await getSanityClient()
  const data = await client.fetch(GLOBALS_QUERY)
  return data ? GlobalsSchema.parse(data ?? {}) : null
}
