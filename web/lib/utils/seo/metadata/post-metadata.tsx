import type {AnyImageField} from '@/lib/images/types'
import {ptToPlainText} from '@/lib/utils/common/pt-to-plain-text'
import type {PostDetail} from '@/lib/zod/website/content/post'
import type {SeoMetaSchema, SeoModeSchema} from '@/lib/zod/sections/layout/seo-meta'
import type {Metadata} from 'next'
import {lyraBuildMetadata} from './build-metadata'
import {lyraNoMetadata} from './no-metadata'
import {urlFor} from '@/lib/utils/sanity/image'
import type {PostJsonLdData} from '@/lib/types/seo'

type PostMetaProps = {
  post: PostDetail | null
  data?: 'jsonld' | 'metadata'
}

export async function lyraGetPostMetadata({
  post,
  data = 'metadata',
}: PostMetaProps): Promise<Metadata | PostJsonLdData> {
  if (!post) {
    return await lyraBuildMetadata({
      pathname: '/blog/404',
      title: 'Page not found',
      ogType: 'website',
    })
  }

  // Page-level fallbacks
  const pgTitle = post.title.trim()
  const pgDesc = ptToPlainText(post?.excerpt) || ptToPlainText(post.body)
  const pgImage = post.image as AnyImageField

  // SEO Meta from the page (if any)
  const seoMeta = post.seoMeta as SeoMetaSchema
  const isSeoMeta = seoMeta?.mode === ('override' as SeoModeSchema)
  const smTitle = isSeoMeta ? seoMeta?.title?.trim() : undefined
  const smDesc = isSeoMeta ? seoMeta?.description?.trim() : undefined
  const smImage = isSeoMeta ? (seoMeta?.image as AnyImageField) : undefined
  const smKeywords = isSeoMeta ? seoMeta?.keywords?.trim() : undefined

  // Final metadata values
  const title = smTitle || pgTitle
  const description = smDesc || pgDesc
  const image = smImage || pgImage || null
  const keywords = smKeywords || undefined
  const publishedTime = post?.publishedAt || undefined
  const authors = post?.authors?.map((a) => a.name).filter(Boolean)
  const category = post?.categories?.[0] || null
  const tags = post?.tags?.map((t) => String(t.title).trim()).filter(Boolean)

  if (data === 'jsonld') {
    const source = image != null ? ('image' in image ? image.image : image) : null
    const imgUrl = source ? urlFor(source).url() : null

    return {
      url: `/blog/${post.slug}`,
      title,
      description,
      imageUrl: imgUrl || undefined,
      ignore: seoMeta?.mode === ('ignore' as SeoModeSchema),
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      authorNames: authors || [],
      tags,
    }
  }

  if (seoMeta?.mode === ('ignore' as SeoModeSchema))
    return await lyraNoMetadata({
      title,
      noIndex: seoMeta?.noindex ?? false,
    })

  return await lyraBuildMetadata({
    pathname: `/blog/${post.slug}`,
    title,
    description,
    image,
    keywords,
    ogType: 'article',
    article: {
      publishedTime,
      authors,
      section: category?.title ? category.title.trim() : undefined,
      tags,
    },
  })
}
