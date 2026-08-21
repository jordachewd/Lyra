import {BLOG_ALL_TAGS_QUERY} from '@/lib/queries/blog-tags'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {type BlogTags, BlogTagsSchema} from '@/lib/zod/website/content/blog'

export async function fetchBlogTags(): Promise<BlogTags> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  const data = await client.fetch(BLOG_ALL_TAGS_QUERY, {
    excludeDrafts: isPreview,
  })

  return data ? BlogTagsSchema.parse(data) : []
}
