import {POST_BY_SLUG_QUERY} from '@/lib/queries/post-by-slug'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {type PostDetail, PostDetailSchema} from '@/lib/zod/website/content/post'

export async function fetchPostBySlug(slug: string): Promise<PostDetail | null> {
  const client = await getSanityClient()
  const data = await client.fetch(POST_BY_SLUG_QUERY, {slug})
  return data ? PostDetailSchema.parse(data) : null
}
