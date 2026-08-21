import {FooterData, FooterSettings} from '@/lib/zod/website/layout/footer'
import FooterLogo from './partials/FooterLogo'
import {MenuItem} from '@/lib/zod/sections/layout/menu'
import FooterNavColumn from './partials/FooterNavColumn'
import classNames from 'classnames'
import {CSSProperties} from 'react'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {SanityColor} from '@/lib/types/color-format'

type FooterProps = {
  data: FooterData
}

export default function Footer({data}: FooterProps) {
  const {logo, menu, copyright, settings} = data as FooterData

  const menus = menu?.items ?? []
  const hasLogo = !!logo?.image
  const hasMenus = !!menus?.length

  const {textColor, layout, background} = settings as FooterSettings
  const {pdTopBottom, pdDisplay, template, width} = layout
  const {type, bgColor, gradient, image, ovlColor, ovlOpacity} = background

  const hasBgColor = type === 'color' && bgColor
  const hasBgGradient = type === 'gradient' && gradient
  const hasBgImg = type === 'image' && !!image?.image?.asset?.url
  const hasBgOpacity = type === 'image' && ovlOpacity !== undefined && ovlOpacity !== null

  const ftClass = classNames('arrFooter', 'ptb_' + pdTopBottom, 'pdd_' + pdDisplay, {
    [`arrGradient-${gradient}`]: hasBgGradient,
    'bg-color': hasBgColor,
    'bg-img': hasBgImg,
  })

  const ftWrap = classNames('arrFooter-container', template, {
    siteWidth: width === 'normal',
    fullWidth: width === 'full',
  })

  let ftCss: CSSProperties = {}
  const cssVars = getCssVars(
    {
      textColor: textColor as SanityColor,
      bgColor: bgColor as SanityColor,
      bgImage: hasBgImg ? image?.image?.asset?.url : null,
      bgOverlay: ovlColor as SanityColor,
      bgOpacity: hasBgOpacity ? ovlOpacity : null,
    },
    'arrFooter',
  )
  ftCss = cssVars.vars

  if (!hasLogo && !hasMenus && !copyright) return null

  return (
    <footer className={ftClass} style={ftCss}>
      <div className={ftWrap}>
        {hasLogo && <FooterLogo logo={logo} className="arrFooter-logo" />}

        {hasMenus && (
          <div className="arrFooter-nav-center">
            {menus.map((item: MenuItem, idx: number) => (
              <FooterNavColumn key={`${item.label}-${idx}`} menuItem={item} />
            ))}
          </div>
        )}

        {copyright && (
          <div className="arrFooter-bottom">
            <span className="arrFooter-copyright">{copyright}</span>
          </div>
        )}
      </div>
    </footer>
  )
}
