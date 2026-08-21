import classNames from 'classnames'
import type {MenuItem} from '@/lib/zod/sections/layout/menu'
import type {HeaderMenuType} from '@/lib/zod/website/layout/header'
import HeaderDropdownNav from './HeaderDropdownNav'
import HeaderMegaMenuNav from './HeaderMegaMenuNav'

type HeaderMainNavProps = {
  menuItems: MenuItem[]
  menuType: HeaderMenuType
}

export default function HeaderMainNav({menuItems, menuType}: HeaderMainNavProps) {
  const isMegaMenu = menuType === 'megamenu'
  const navClass = classNames('arrMainNav', {
    'arrMainNav--dropdown': !isMegaMenu,
    'arrMainNav--megamenu': isMegaMenu,
  })

  return (
    <nav className={navClass} aria-label="Main Navigation">
      {isMegaMenu ? (
        <HeaderMegaMenuNav menuItems={menuItems} />
      ) : (
        <HeaderDropdownNav menuItems={menuItems} />
      )}
    </nav>
  )
}
