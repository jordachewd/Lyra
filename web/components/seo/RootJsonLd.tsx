import type {SiteMetadata} from '@/lib/types/metadata-site'
import {buildRootLayoutJsonLd} from '../../lib/utils/seo/jsonld/root-json-ld'
import {getSiteMeta} from '../../lib/utils/seo/metadata/site-metadata'
import {headers} from 'next/headers'

export default async function RootJsonLd() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const meta = (await getSiteMeta()) as SiteMetadata
  const jsonLd = buildRootLayoutJsonLd(meta)

  return (
    <script
      nonce={nonce}
      id="arratech-site-jsonld"
      key="arratech-site-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
    />
  )
}
