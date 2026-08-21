import {NestedImageField} from '@/lib/images/types'
import type {Metadata} from 'next'
import {sanitizeAbsoluteUrl} from '../../common/sanitize-url'

type OgImageOutput = NonNullable<NonNullable<Metadata['openGraph']>['images']> | undefined

type OgImageObj = {
  url: string
  width?: number
  height?: number
  alt?: string
  type?: string
}

type OgImageItem = Array<string | OgImageObj>

export function resolveOgImages(
  siteBase: string | undefined,
  images: NestedImageField[],
): OgImageOutput {
  const items: OgImageItem = []

  for (const si of images) {
    const asset = si?.image?.asset
    const url = sanitizeAbsoluteUrl(asset?.url, siteBase)

    if (!url) continue

    const dims = asset?.metadata?.dimensions
    const imgAlt = typeof si?.alt === 'string' && si.alt?.trim()
    const alt = imgAlt || 'Arratech Image'

    items.push({
      url,
      width: dims?.width,
      height: dims?.height,
      alt,
    })
  }

  return items.length ? items : undefined
}
