import {PAGE_BY_SLUG_QUERY} from '@/lib/queries/page-by-slug'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {type PageBySlug, PageBySlugSchema} from '@/lib/zod/website/content/page'

export async function fetchPageBySlug(slug: string): Promise<PageBySlug | null> {
  const client = await getSanityClient()
  const data = await client.fetch(PAGE_BY_SLUG_QUERY, {slug})
  return data ? PageBySlugSchema.parse(data) : null
}
