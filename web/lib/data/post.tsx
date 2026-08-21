import {unstable_noStore as noStore} from 'next/cache'
import {formatZodError} from '../zod/lib/format-zod-error'
import {ZodError} from 'zod'
import {getSanityClient} from '../utils/sanity/get-sanity-client'
import {cacheByTag} from './caching/cache-by-tag'
import type {PostDetail} from '../zod/website/content/post'
import {fetchPostBySlug} from './utils/fetch-post-by-slug'

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  if (isPreview) {
    noStore()
    return fetchPostBySlug(slug)
  }

  try {
    const cached = cacheByTag(fetchPostBySlug, {
      keyParts: ['post-by-slug', slug],
      tags: [`post:${slug}`, 'post:list'],
      revalidate: 1,
    })

    return cached(slug)
  } catch (err: unknown) {
    const base = `Failed to load post "${slug}" (preview=${isPreview}).`
    const detail =
      err instanceof ZodError
        ? formatZodError(err)
        : err instanceof Error
          ? err.message
          : 'Unknown error'

    throw new Error(`${base}\n${detail}`)
  }
}
