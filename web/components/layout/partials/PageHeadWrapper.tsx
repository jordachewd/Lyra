import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {PageSettingsType} from '@/lib/zod/sections/layout/page-settings'
import {SanityColor} from '@/lib/types/color-format'
import classNames from 'classnames'
import {ReactNode} from 'react'

type SectionProps = {
  id: string
  settings: PageSettingsType
  children: ReactNode
  className?: string
}

export default function PageHeadWrapper({id, settings, children, className}: SectionProps) {
  const {pdTopBottom, pdDisplay, width, textColor} = settings as PageSettingsType
  const sectionCss = classNames(
    'lyraSection lyraPageHead',
    className,
    'ptb_' + pdTopBottom,
    'pdd_' + pdDisplay,
  )
  const wrapperClass = className ? className + '-wrapper' : ''
  const wrapperCss = classNames('lyraSection-wrapper', wrapperClass, {
    siteWidth: width === 'normal',
    fullWidth: width === 'full',
  })

  const cssVars = getCssVars(
    {
      textColor: textColor as SanityColor,
    },
    'pgHeadColor',
  )

  return (
    <section id={`section-pagehead-${id}`} className={sectionCss} style={cssVars.vars}>
      <div className={wrapperCss}>{children}</div>
    </section>
  )
}
