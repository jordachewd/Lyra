import type {SiteMetadata} from '@/lib/types/metadata-site'
import {getSiteMeta} from '../../lib/utils/seo/metadata/site-metadata'
import {buildPageJsonLd} from '@/lib/utils/seo/jsonld/page-json-ld'
import type {BreadcrumbItemInput, PageJsonLdData} from '@/lib/types/seo'
import {headers} from 'next/headers'

type PageJsonLdProps = {
  data: PageJsonLdData | undefined
}

export default async function PageJsonLd({data}: PageJsonLdProps) {
  if (!data) return null

  const nonce = (await headers()).get('x-nonce') ?? undefined
  const {url, title, description, imageUrl, ignore = false} = data

  if (ignore) return null

  const isHome: boolean = url === '/'
  const meta = (await getSiteMeta()) as SiteMetadata
  const pageUrl = url && !isHome ? `${meta.siteUrl + url}` : meta.siteUrl

  const breadcrumbs: BreadcrumbItemInput[] = !isHome
    ? [
        {name: meta.siteName, url: meta.siteUrl},
        {name: title || meta.siteName, url: pageUrl},
      ]
    : []

  const jsonLd = buildPageJsonLd(
    {
      url: pageUrl,
      title: title || meta.siteTitle,
      description: description || meta.siteDesc || '',
      imageUrl: imageUrl || meta.siteImgUrl,
    },
    meta,
    {pageType: 'WebPage', breadcrumbs},
  )

  return (
    <script
      nonce={nonce}
      id="lyra-page-jsonld"
      key="lyra-page-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
    />
  )
}
