import {HeaderData} from '@/lib/zod/website/layout/header'
import HeaderLogo from './partials/HeaderLogo'
import HeaderMainNav from './partials/HeaderMainNav'
import NavClientLogic from './partials/NavClientLogic'
import HeaderAbove from './partials/HeaderAbove'
import SectionButtons from '../sections/partials/SectionButtons'
import MobileNavBtn from './partials/MobileNavBtn'
import classNames from 'classnames'

type HeaderProps = {
  data: HeaderData
}

export default function Header({data}: HeaderProps) {
  const {logo, aboveMenu, menu, menuType, buttons} = data as HeaderData

  const menuItems = menu?.items ?? []
  const hasLogo = !!logo?.image
  const hasAbove = aboveMenu.length > 0
  const hasMenu = menuItems.length > 0
  const hasBtns = buttons.length > 0

  if (!hasLogo && !hasMenu && !hasBtns) return null

  const headerClass = classNames('lyraHeader', {
    'has-above-menu': hasAbove,
  })

  return (
    <header className={headerClass} aria-label="Lyra Header">
      {hasMenu && (
        <>
          <NavClientLogic />
          <input
            id="mobile-nav-toggle"
            className="nav-toggle"
            type="checkbox"
            tabIndex={-1}
            aria-hidden="true"
          />
        </>
      )}

      {hasAbove && <HeaderAbove menu={aboveMenu} />}

      <div className="lyraHeader-main">
        <div className="lyraHeader-brand">
          {hasLogo && <HeaderLogo logo={logo} className="lyraHeader-brand-slot" />}
          {hasMenu && <MobileNavBtn />}
        </div>

        {hasMenu && <HeaderMainNav menuItems={menuItems} menuType={menuType} />}
        {hasAbove && <HeaderAbove menu={aboveMenu} className="mobile-only" />}
        {hasBtns && <SectionButtons buttons={buttons} className="buttons-slot" location="header" />}
      </div>
    </header>
  )
}
