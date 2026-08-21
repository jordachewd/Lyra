import {toNestedImageField} from '@/lib/images/normalize'
import {AnyImageField} from '@/lib/images/types'
import {urlFor} from '@/lib/utils/sanity/image'
import Image from 'next/image'

type RenderImageProps = {
  image: AnyImageField
  alt: string
  displayWidth?: number
  mobileWidth?: number
  className?: string
  priority?: boolean
}

export default function RenderImage({
  image,
  alt,
  displayWidth = 20,
  mobileWidth = 20,
  className: style,
  priority = false,
}: RenderImageProps) {
  const nested = toNestedImageField(image)

  const asset = nested?.image?.asset
  if (!asset) return null

  const metadata = asset.metadata
  const aspect = metadata?.dimensions?.aspectRatio || 4.6667
  const targetW = displayWidth
  const targetH = Math.round(targetW / aspect)

  const dims = nested?.image?.asset?.metadata?.dimensions
  const width = targetW
  const height = dims?.aspectRatio ? Math.round(width / dims.aspectRatio) : targetH

  const src = nested?.image ? urlFor(nested.image).width(width).fit('fill').url() : null

  if (!src) return null

  const imgSrc = src.includes('?') ? `${src}&w=${targetW}` : `${src}?w=${targetW}`

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || targetW}
      height={height || targetH}
      priority={priority}
      placeholder={metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={metadata?.lqip}
      sizes={`(max-width: 768px) ${mobileWidth}px, ${displayWidth}px`}
      className={style}
    />
  )
}
