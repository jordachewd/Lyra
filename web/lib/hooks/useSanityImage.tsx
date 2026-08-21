import {useMemo} from 'react'
import {urlFor} from '@/lib/utils/sanity/image'
import {NestedImageField} from '@/lib/images/types'

type SanityImageOptions = {
  targetWidth?: number
  fallbackHeight?: number
}

export function useSanityImage(
  image: NestedImageField | null | undefined,
  options: SanityImageOptions = {},
) {
  const {targetWidth = 168, fallbackHeight = 168} = options

  return useMemo(() => {
    if (!image) return {src: null, width: 0, height: 0}

    const dims = image?.image?.asset?.metadata?.dimensions
    const width = targetWidth
    const height = dims?.aspectRatio ? Math.round(width / dims.aspectRatio) : fallbackHeight

    const src = image?.image ? urlFor(image.image).width(width).fit('fill').url() : null

    return {src, width, height}
  }, [image, targetWidth, fallbackHeight])
}
