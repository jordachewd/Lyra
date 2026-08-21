import classNames from 'classnames'
import type {MenuItem} from '@/lib/zod/sections/layout/menu'
import HeaderNavGrandchildList from './HeaderNavGrandchildList'
import HeaderNavLinkOrLabel from './HeaderNavLinkOrLabel'

type HeaderDropdownNavProps = {
  menuItems: MenuItem[]
}

function isLeaf(item: MenuItem) {
  return item.children.length === 0
}

export default function HeaderDropdownNav({menuItems}: HeaderDropdownNavProps) {
  return (
    <ul className="arrMainNav-menu" id="nav-menu">
      {menuItems.map((item, i) => {
        const tId = `menu-item-${i}`
        const hasChildren = !isLeaf(item)
        const itemClasses = classNames('menu-item', {
          'has-children': hasChildren,
        })

        return (
          <li key={tId} className={itemClasses}>
            {hasChildren && (
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
                htmlFor={hasChildren ? tId : undefined}
              />
            </div>

            {hasChildren && (
              <div className="menu-list" aria-label={`${item.label} submenu`}>
                <ul className="child-list">
                  {item.children.map((child, j) => {
                    const childHasKids = !isLeaf(child)
                    const cId = `child-menu-${i}-${j}`
                    const childItemClasses = classNames('child-item', {
                      'has-children': childHasKids,
                    })

                    return (
                      <li key={cId} className={childItemClasses}>
                        {childHasKids && (
                          <input
                            id={cId}
                            className="child-toggle"
                            type="checkbox"
                            tabIndex={-1}
                            aria-hidden="true"
                          />
                        )}

                        <div className="child-header">
                          <HeaderNavLinkOrLabel
                            node={child}
                            icon={child.icon}
                            desc={child.description}
                            className={child.href ? 'child-link' : 'child-label'}
                            htmlFor={childHasKids ? cId : undefined}
                          />
                        </div>

                        {childHasKids && (
                          <HeaderNavGrandchildList
                            items={child.children}
                            label={child.label}
                            idPrefix={`${i}-${j}`}
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
