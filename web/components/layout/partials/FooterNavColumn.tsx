import type {MenuItem} from '@/lib/zod/sections/layout/menu'
import Link from 'next/link'

type FooterNavColumnProps = {
  menuItem: MenuItem
}

export default function FooterNavColumn({menuItem}: FooterNavColumnProps) {
  const hasHref = !!menuItem.href
  const itemChildren = (menuItem.children || []) as MenuItem[]
  const hasChildren = itemChildren && itemChildren.length > 0

  return (
    <div className="lyraFooter-nav-column">
      {hasHref ? (
        <Link
          className="lyraFooter-nav-heading"
          href={menuItem.href ?? '#'}
          target={menuItem.newTab ? '_blank' : undefined}
          rel={menuItem.newTab ? 'noopener noreferrer' : undefined}
        >
          {menuItem.label}
        </Link>
      ) : (
        <div className="lyraFooter-nav-heading">{menuItem.label}</div>
      )}

      {hasChildren && (
        <ul className="lyraFooter-nav-list">
          {itemChildren.map((navItem: MenuItem, navIdx: number) => {
            const navHasHref = !!navItem.href
            const navItemChildren = (navItem.children || []) as MenuItem[]
            const navHasChildren = navItemChildren && navItemChildren.length > 0

            return (
              <li key={`${navItem.label}-${navIdx}`}>
                {navHasHref ? (
                  <Link
                    href={navItem.href ?? '#'}
                    className="lyraFooter-nav-item"
                    target={navItem.newTab ? '_blank' : undefined}
                    rel={navItem.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {navItem.label}
                  </Link>
                ) : (
                  <span className="lyraFooter-nav-item" role="menuitem">
                    {navItem.label}
                  </span>
                )}

                {navHasChildren && (
                  <ul className="lyraFooter-nav-list child-list">
                    {navItemChildren.map((child, childIdx) => (
                      <li
                        key={`${child.label}-${navIdx}-${childIdx}`}
                        className="lyraFooter-nav-item child"
                      >
                        {child.href ? (
                          <Link
                            href={child.href ?? '#'}
                            className="lyraFooter-nav-item child"
                            target={child.newTab ? '_blank' : undefined}
                            rel={child.newTab ? 'noopener noreferrer' : undefined}
                          >
                            {child.label}
                          </Link>
                        ) : (
                          <span className="lyraFooter-nav-item child">{child.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
