import classNames from 'classnames'
import type {MenuItem} from '@/lib/zod/sections/layout/menu'
import HeaderNavGrandchildList from './HeaderNavGrandchildList'
import HeaderNavLinkOrLabel from './HeaderNavLinkOrLabel'

type HeaderMegaMenuNavProps = {
  menuItems: MenuItem[]
}

function hasChildren(item: MenuItem) {
  return item.children.length > 0
}

export default function HeaderMegaMenuNav({menuItems}: HeaderMegaMenuNavProps) {
  return (
    <ul className="lyraMainNav-menu megamenu" id="nav-menu">
      {menuItems.map((item, i) => {
        const tId = `mega-menu-item-${i}`
        const itemHasChildren = hasChildren(item)
        const itemClasses = classNames('menu-item', {
          'has-children': itemHasChildren,
        })

        return (
          <li key={tId} className={itemClasses}>
            {itemHasChildren && (
              <input
                id={tId}
                className="submenu-toggle"
                type="checkbox"
                tabIndex={-1}
                aria-hidden="true"
              />
            )}

            <div className="item-header">
              <HeaderNavLinkOrLabel
                node={item}
                className={item.href ? 'top-link' : 'top-label'}
                htmlFor={itemHasChildren ? tId : undefined}
              />
            </div>

            {itemHasChildren && (
              <div className="menu-list megamenu-panel" aria-label={`${item.label} submenu`}>
                <ul className="child-list megamenu-grid">
                  {item.children.map((child, j) => {
                    const childHasChildren = hasChildren(child)
                    const childKey = `mega-child-menu-${i}-${j}`
                    const childItemClasses = classNames('child-item', 'megamenu-group', {
                      'has-children': childHasChildren,
                    })

                    const headerClass = classNames('child-header', 'megamenu-group-header', {
                      'has-link': child.href,
                      'no-link': !child.href,
                    })

                    return (
                      <li key={childKey} className={childItemClasses}>
                        <div className={headerClass}>
                          <HeaderNavLinkOrLabel
                            node={child}
                            icon={child.icon}
                            desc={child.description}
                            className={child.href ? 'child-link' : 'child-label'}
                            showStaticDetails
                          />
                        </div>

                        {childHasChildren && (
                          <HeaderNavGrandchildList
                            items={child.children}
                            label={child.label}
                            idPrefix={`mega-${i}-${j}`}
                            className="megamenu-links"
                          />
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
