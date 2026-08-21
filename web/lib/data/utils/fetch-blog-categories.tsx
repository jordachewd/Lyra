import {BLOG_ALL_CATEGORIES_QUERY} from '@/lib/queries/blog-categories'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {type BlogCategories, BlogCategoriesSchema} from '@/lib/zod/website/content/blog'

export async function fetchBlogCategories(): Promise<BlogCategories> {
  const client = await getSanityClient()
  const isPreview = client.config().perspective === 'previewDrafts'

  const data = await client.fetch(BLOG_ALL_CATEGORIES_QUERY, {
    excludeDrafts: isPreview,
  })

  return data ? BlogCategoriesSchema.parse(data) : []
}
