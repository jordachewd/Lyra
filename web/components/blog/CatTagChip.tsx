import type {Category} from '@/lib/zod/website/content/category'
import type {Tag} from '@/lib/zod/website/content/tag'
import classNames from 'classnames'
import Link from 'next/link'

type ChipType = (Category | Tag) & {count?: number}

type ChipProps = {
  items: ChipType[]
  label?: string
  className?: string
}

export default function CatTagChip({items, label = '', className: cssClass}: ChipProps) {
  const containerClass = classNames('cattag-chips', cssClass)
  const hasItems = items && items.length > 0
  if (!hasItems) return null

  const chipUrl = (item: ChipType) => {
    const isCategory = (item as Category)._type === 'category'

    if (isCategory) {
      return `/blog?category=${item.slug}`
    } else {
      return `/blog?tag=${item.slug}`
    }
  }

  return (
    <div className={containerClass}>
      {label !== '' && <span className="cattag-label">{label}:</span>}

      {items.map((item) => {
        return (
          <Link key={item._id} href={chipUrl(item)} className={`cattag-chip ${item._type}`}>
            {item.title}
          </Link>
        )
      })}
    </div>
  )
}
