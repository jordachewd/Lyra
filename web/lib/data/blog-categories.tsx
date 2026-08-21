import {ZodError} from 'zod'
import {getSanityClient} from '../utils/sanity/get-sanity-client'
import {unstable_noStore as noStore} from 'next/cache'
import {BlogCategories} from '../zod/website/content/blog'
import {formatZodError} from '../zod/lib/format-zod-error'
import {cacheByTag} from './caching/cache-by-tag'
import {fetchBlogCategories} from './utils/fetch-blog-categories'

export async function getBlogCategories(): Promise<BlogCategories | null> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  if (isPreview) {
    noStore()
    return fetchBlogCategories()
  }

  try {
    const cached = cacheByTag(fetchBlogCategories, {
      keyParts: ['blog-categories'],
      tags: ['post:list'],
      revalidate: 1,
    })

    return cached()
  } catch (err: unknown) {
    const base = `Failed to load getBlogCategories() (preview=${isPreview}).`
    const detail =
      err instanceof ZodError
        ? formatZodError(err)
        : err instanceof Error
          ? err.message
          : 'Unknown error'

    throw new Error(`${base}\n${detail}`)
  }
}
