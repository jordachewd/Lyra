import {unstable_noStore as noStore} from 'next/cache'
import type {PostList} from '@/lib/zod/website/content/blog'
import {ZodError} from 'zod'
import {formatZodError} from '../zod/lib/format-zod-error'
import {getSanityClient} from '../utils/sanity/get-sanity-client'
import {cacheByTag} from './caching/cache-by-tag'
import {fetchBlogList} from './utils/fetch-blog-list'

type GetBlogListArgs = {
  page?: number
  perPage?: number
  tagSlug?: string | null
  categorySlug?: string | null
  authorSlug?: string | null
}

export async function getBlogList({
  page = 1,
  perPage = 12,
  tagSlug,
  categorySlug,
  authorSlug,
}: GetBlogListArgs = {}): Promise<PostList | null> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  if (isPreview) {
    noStore()
    return fetchBlogList(page, perPage, tagSlug, categorySlug, authorSlug)
  }

  try {
    const cached = cacheByTag(fetchBlogList, {
      keyParts: [
        'blog-list',
        page,
        perPage,
        tagSlug ?? 'all',
        categorySlug ?? 'all',
        authorSlug ?? 'all',
      ],
      tags: ['post:list'],
      revalidate: 1,
    })

    return cached(page, perPage, tagSlug, categorySlug, authorSlug)
  } catch (err: unknown) {
    const base = `Failed to load getBlogList() (preview=${isPreview}).`
    const detail =
      err instanceof ZodError
        ? formatZodError(err)
        : err instanceof Error
          ? err.message
          : 'Unknown error'

    throw new Error(`${base}\n${detail}`)
  }
}
