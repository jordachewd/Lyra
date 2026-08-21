import {unstable_noStore as noStore} from 'next/cache'
import {type PageBySlug} from '@/lib/zod/website/content/page'
import {getSanityClient} from '../utils/sanity/get-sanity-client'
import {cacheByTag} from './caching/cache-by-tag'
import {ZodError} from 'zod'
import {formatZodError} from '../zod/lib/format-zod-error'
import {fetchPageBySlug} from './utils/fetch-page-by-slug'

export async function getPageBySlug(slug: string): Promise<PageBySlug | null> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  if (isPreview) {
    noStore()
    return fetchPageBySlug(slug)
  }

  try {
    const cached = cacheByTag(fetchPageBySlug, {
      keyParts: ['page-by-slug', slug],
      tags: [`page:${slug}`],
      revalidate: 1,
    })

    return cached(slug)
  } catch (err: unknown) {
    const base = `Failed to load page "${slug}" (preview=${isPreview}).`
    const detail =
      err instanceof ZodError
        ? formatZodError(err)
        : err instanceof Error
          ? err.message
          : 'Unknown error'

    throw new Error(`${base}\n${detail}`)
  }
}
