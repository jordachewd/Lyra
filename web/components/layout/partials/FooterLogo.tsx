import RenderImage from '@/components/ui/RenderImage'
import {NestedImageField} from '@/lib/images/types'
import {ImageField} from '@/lib/zod/sections/layout/imageNoMeta'
import Link from 'next/link'

type FooterLogoProps = {logo: ImageField; className?: string}

export default function FooterLogo({logo, className: style}: FooterLogoProps) {
  const logoImg = logo as NestedImageField | null | undefined
  const alt = logo?.alt ?? 'Lyra Footer Logo'

  return (
    <div className={style}>
      <Link href="/">
        <RenderImage image={logoImg} alt={alt} displayWidth={178} mobileWidth={178} priority />
      </Link>
    </div>
  )
}
