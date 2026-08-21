import {BLOG_OVERVIEW_QUERY} from '@/lib/queries/blog-posts'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {type PostList, PostListSchema} from '@/lib/zod/website/content/blog'

export async function fetchBlogList(
  page: number,
  perPage: number,
  tagSlug?: string | null,
  categorySlug?: string | null,
  authorSlug?: string | null,
): Promise<PostList | null> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  const offset = (page - 1) * perPage
  const end = offset + perPage

  const data = await client.fetch(BLOG_OVERVIEW_QUERY, {
    excludeDrafts: isPreview,
    offset,
    end,
    tagSlug: tagSlug ?? null,
    categorySlug: categorySlug ?? null,
    authorSlug: authorSlug ?? null,
  })

  return data ? PostListSchema.parse(data) : null
}
