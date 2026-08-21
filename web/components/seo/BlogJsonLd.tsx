import type {SiteMetadata} from '@/lib/types/metadata-site'
import {getSiteMeta} from '../../lib/utils/seo/metadata/site-metadata'
import type {BreadcrumbItemInput, PageJsonLdData} from '@/lib/types/seo'
import {buildBlogPageJsonLd} from '@/lib/utils/seo/jsonld/blog-json-ld'
import {headers} from 'next/headers'

type BlogJsonLdProps = {
  data: PageJsonLdData | undefined
}

export default async function BlogJsonLd({data}: BlogJsonLdProps) {
  if (!data) return null

  const nonce = (await headers()).get('x-nonce') ?? undefined
  const {url, title, description, ignore = false} = data

  if (ignore) return null

  const meta = (await getSiteMeta()) as SiteMetadata
  const pageUrl = url ? `${meta.siteUrl + url}` : meta.siteUrl

  const breadcrumbs: BreadcrumbItemInput[] = [
    {name: meta.siteName, url: meta.siteUrl},
    {name: title || 'Blog', url: pageUrl},
  ]

  const jsonLd = buildBlogPageJsonLd(
    {
      url: pageUrl,
      title: title || meta.siteTitle,
      description: description || meta.siteDesc || '',
    },
    meta,
    breadcrumbs,
  )

  return (
    <script
      nonce={nonce}
      id="arratech-blog-jsonld"
      key="arratech-blog-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
    />
  )
}
