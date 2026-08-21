import type {SiteMetadata} from '@/lib/types/metadata-site'
import {getSiteMeta} from '../../lib/utils/seo/metadata/site-metadata'
import type {PostJsonLdData, BreadcrumbItemInput} from '@/lib/types/seo'
import {buildBlogPostJsonLd} from '@/lib/utils/seo/jsonld/post-json-ld'
import {headers} from 'next/headers'

type PostJsonLdProps = {
  data: PostJsonLdData | undefined
}

export default async function PostJsonLd({data}: PostJsonLdProps) {
  if (!data) return null

  const nonce = (await headers()).get('x-nonce') ?? undefined
  const {
    url,
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    authorNames,
    tags,
    ignore = false,
  } = data

  if (ignore) return null

  const meta = (await getSiteMeta()) as SiteMetadata
  const postUrl = url ? `${meta.siteUrl + url}` : meta.siteUrl

  const breadcrumbs: BreadcrumbItemInput[] = [
    {name: meta.siteName, url: meta.siteUrl},
    {name: 'Blog', url: `${meta.siteUrl}/blog`},
    {name: title || 'Blog Post', url: postUrl},
  ]

  const jsonLd = buildBlogPostJsonLd(
    {
      url: postUrl,
      title: title || meta.siteTitle,
      description: description || meta.siteDesc || '',
      imageUrl: imageUrl || meta.siteImgUrl,
      datePublished,
      dateModified,
      authorNames,
      tags,
    },
    meta,
    breadcrumbs,
  )

  return (
    <script
      nonce={nonce}
      id="lyra-post-jsonld"
      key="lyra-post-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
    />
  )
}
