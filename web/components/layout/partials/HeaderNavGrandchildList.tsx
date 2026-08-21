import Link from 'next/link'
import type {MenuItem} from '@/lib/zod/sections/layout/menu'
import RenderImage from '@/components/ui/RenderImage'

type HeaderNavGrandchildListProps = {
  items: MenuItem[]
  label: string
  idPrefix: string
  className?: string
}

export default function HeaderNavGrandchildList({
  items,
  label,
  idPrefix,
  className,
}: HeaderNavGrandchildListProps) {
  const listClass = className ? `grandchild-list ${className}` : 'grandchild-list'

  return (
    <ul className={listClass} aria-label={`${label} submenu`}>
      {items
        .filter((item) => item.href)
        .map((item, index) => {
          const itemKey = `grandchild-menu-${idPrefix}-${index}`
          const hasIcon = !!item.icon?.image

          return (
            <li key={itemKey} className="grandchild-item">
              <Link
                href={item.href!}
                className="grandchild-link"
                data-close="menu"
                {...(item.newTab
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {})}
              >
                {hasIcon && (
                  <div className="grandchild-item-icon">
                    <RenderImage
                      image={item.icon}
                      alt={item.icon?.alt || item.label}
                      displayWidth={20}
                      mobileWidth={20}
                    />
                  </div>
                )}
                <div className="grandchild-item-label">
                  <span className="grandchild-item-label-title">{item.label}</span>
                  {item.description && (
                    <span className="grandchild-item-label-desc">{item.description}</span>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}
