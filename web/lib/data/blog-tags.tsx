import {ZodError} from 'zod'
import {getSanityClient} from '../utils/sanity/get-sanity-client'
import {unstable_noStore as noStore} from 'next/cache'
import {BlogTags} from '../zod/website/content/blog'
import {formatZodError} from '../zod/lib/format-zod-error'
import {cacheByTag} from './caching/cache-by-tag'
import {fetchBlogTags} from './utils/fetch-blog-tags'

export async function getBlogTags(): Promise<BlogTags | null> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  if (isPreview) {
    noStore()
    return fetchBlogTags()
  }

  try {
    const cached = cacheByTag(fetchBlogTags, {
      keyParts: ['blog-tags'],
      tags: ['post:list'],
      revalidate: 1,
    })

    return cached()
  } catch (err: unknown) {
    const base = `Failed to load getBlogTags() (preview=${isPreview}).`
    const detail =
      err instanceof ZodError
        ? formatZodError(err)
        : err instanceof Error
          ? err.message
          : 'Unknown error'

    throw new Error(`${base}\n${detail}`)
  }
}
