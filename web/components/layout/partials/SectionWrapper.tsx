import {type SanityColor} from '@/lib/types/color-format'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {type LayoutSettings} from '@/lib/zod/sections/settings/section-layout'
import {type SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import {type BackgroundSettings} from '@/lib/zod/sections/settings/section-background'
import classNames from 'classnames'
import {type ReactNode, type CSSProperties} from 'react'

type SectionProps = {
  id: string
  settings: SectionSettings
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function SectionWrapper({id, settings, children, className, style}: SectionProps) {
  const {layout, background} = settings as SectionSettings
  const {pdTopBottom, pdDisplay, template, columns, width} = layout as LayoutSettings
  const {type, bgColor, gradient, image, ovlColor, ovlBlend, ovlOpacity} =
    background as BackgroundSettings

  const hasBgColor = type === 'color' && bgColor
  const hasBgGradient = type === 'gradient' && gradient
  const hasBgImg = type === 'image' && !!image?.image?.asset?.url
  const hasBgBlend = type === 'image' && ovlBlend
  const hasBgOpacity = type === 'image' && ovlOpacity !== undefined && ovlOpacity !== null

  const sectClass = classNames('arrSection', className, {
    [`arrGradient-${gradient}`]: hasBgGradient,
    [`ptb_${pdTopBottom}`]: pdTopBottom,
    [`pdd_${pdDisplay}`]: pdDisplay,
    'bg-color': hasBgColor,
    'bg-img': hasBgImg,
  })

  const wrapCss = classNames('arrSection-wrapper', {
    [`${className}-wrapper`]: className,
    [`cols-${columns}`]: template === 'normal' || template === 'reversed',
    [`${template}`]: template,
    siteWidth: width === 'normal',
    fullWidth: width === 'full',
  })

  let sectCss: CSSProperties = {}
  const cssVars = getCssVars(
    {
      bgColor: bgColor as SanityColor,
      bgImage: hasBgImg ? image?.image?.asset?.url : null,
      bgOverlay: ovlColor as SanityColor,
      bgOvlBlend: hasBgBlend ? ovlBlend : null,
      bgOpacity: hasBgOpacity ? ovlOpacity : null,
    },
    'sectionWrapper',
  )

  sectCss = cssVars.vars
  const sectionStyle = {...sectCss, ...style}

  return (
    <section id={`section-${id}`} className={sectClass} style={sectionStyle}>
      <div className={wrapCss}>{children}</div>
    </section>
  )
}
