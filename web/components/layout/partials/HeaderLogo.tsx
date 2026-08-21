import {useSanityImage} from '@/lib/hooks/useSanityImage'
import {ImageField} from '@/lib/zod/sections/layout/imageNoMeta'
import Link from 'next/link'
import Image from 'next/image'
import {NestedImageField} from '@/lib/images/types'

type HeaderLogoProps = {logo: ImageField; className?: string}

export default function HeaderLogo({logo, className: style}: HeaderLogoProps) {
  const logoImg = logo as NestedImageField | null | undefined
  const alt = logo?.alt ?? 'Arratech Header Logo'

  const {src, width, height} = useSanityImage(logoImg, {
    targetWidth: 168,
    fallbackHeight: 36,
  })

  if (!src) return null

  return (
    <div className={style}>
      <Link href="/">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 120px, 168px"
          priority
        />
      </Link>
    </div>
  )
}
