import RenderImage from '@/components/ui/RenderImage'
import {NestedImageField} from '@/lib/images/types'
import {AboveHeaderMenu} from '@/lib/zod/website/layout/header'
import classNames from 'classnames'
import Link from 'next/link'

type HeaderAboveProps = {
  menu: AboveHeaderMenu[]
  className?: string
}

export default function HeaderAbove({menu, className: cssClass}: HeaderAboveProps) {
  return (
    <div className={`lyraHeader-features ${cssClass || ''}`}>
      {menu.map((item, index) => {
        const id = item.id || `above-menu-item-${index}`
        const href = item.href || null
        const target = item.newTab ? '_blank' : '_self'
        const rel = item.newTab ? 'noopener noreferrer' : undefined
        const icon = item.icon as NestedImageField | null | undefined
        const alt = item.icon?.alt || item.title || 'Icon'

        const btnOnMobile = cssClass === 'mobile-only' ? 'lyraButton small' : ''
        const onMobileCss = classNames(btnOnMobile, {
          hideOnMobile: item.hideOnMobile && cssClass === 'mobile-only',
        })

        const content = (
          <>
            {icon?.image && (
              <RenderImage
                image={icon}
                alt={alt}
                displayWidth={20}
                mobileWidth={20}
                className="lyraHeader-features-icon"
              />
            )}
            <span>{item.title}</span>
          </>
        )

        return href ? (
          <Link
            key={id}
            href={href}
            target={target}
            rel={rel}
            className={`lyraHeader-features-link ${onMobileCss}`}
          >
            {content}
          </Link>
        ) : (
          <div key={id} className={`lyraHeader-features-item ${onMobileCss}`}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
