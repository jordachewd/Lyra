import type {AnyImageField} from '@/lib/images/types'
import {ptToPlainText} from '@/lib/utils/common/pt-to-plain-text'
import type {PageBySlug} from '@/lib/zod/website/content/page'
import type {SeoMetaSchema, SeoModeSchema} from '@/lib/zod/sections/layout/seo-meta'
import type {Metadata} from 'next'
import {lyraBuildMetadata} from './build-metadata'
import {lyraNoMetadata} from './no-metadata'
import {getSectionMetadata} from './section-metadata'
import {urlFor} from '@/lib/utils/sanity/image'
import {PageJsonLdData} from '@/lib/types/seo'

type PgMetaProps = {
  page: PageBySlug | null
  canonical?: string
  data?: 'jsonld' | 'metadata'
}

export async function lyraGetPageMetadata({
  page,
  canonical,
  data = 'metadata',
}: PgMetaProps): Promise<Metadata | PageJsonLdData> {
  if (!page) {
    return await lyraBuildMetadata({
      pathname: canonical || '/404',
      title: 'Page not found',
      ogType: 'website',
    })
  }

  // Section-level metadata
  const secMeta = getSectionMetadata({
    sections: page.sections ?? [],
  })

  const secTitle = secMeta.title?.trim()
  const secDesc = secMeta.description?.trim()
  const secImage = secMeta.image as AnyImageField

  // Page-level fallbacks
  const pgTitle = page.title.trim()
  const pgDesc = ptToPlainText(page.description)

  // SEO Meta from the page (if any)
  const seoMeta = page.seoMeta as SeoMetaSchema
  const isSeoMeta = seoMeta?.mode === ('override' as SeoModeSchema)
  const smTitle = isSeoMeta ? seoMeta?.title?.trim() : undefined
  const smDesc = isSeoMeta ? seoMeta?.description?.trim() : undefined
  const smImage = isSeoMeta ? (seoMeta?.image as AnyImageField) : undefined
  const smKeywords = isSeoMeta ? seoMeta?.keywords?.trim() : undefined

  // Final metadata values
  const title = smTitle || pgTitle || secTitle
  const description = smDesc || secDesc || pgDesc
  const image = smImage || secImage || null
  const keywords = smKeywords || undefined

  if (data === 'jsonld') {
    const source = image != null ? ('image' in image ? image.image : image) : null
    const imgUrl = source ? urlFor(source).url() : null

    return {
      url: canonical || `/${page.slug}`,
      title: `${title} · Lyra`,
      description,
      imageUrl: imgUrl || undefined,
      ignore: seoMeta?.mode === ('ignore' as SeoModeSchema),
    }
  }

  if (seoMeta?.mode === ('ignore' as SeoModeSchema))
    return await lyraNoMetadata({
      title: `${title} · Lyra`,
      noIndex: seoMeta?.noindex ?? false,
    })

  return await lyraBuildMetadata({
    pathname: canonical || `/${page.slug}`,
    title: `${title} · Lyra`,
    description,
    image,
    keywords,
    ogType: 'website',
  })
}
