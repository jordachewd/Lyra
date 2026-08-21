'use client'

import Link from 'next/link'
import type {Facet} from '@/lib/types/blog-facet'
import classNames from 'classnames'
import {useSearchParams} from 'next/navigation'

type BlogCategoryFilterProps = {
  items: Facet[]
  totalCount: number
}

export default function BlogCategoryFilter({items, totalCount}: BlogCategoryFilterProps) {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams?.get('category') ?? null

  const buildUrl = (categorySlug: string | null) => {
    const params = new URLSearchParams()
    if (categorySlug) params.set('category', categorySlug)

    const query = params.toString()
    return `/blog${query ? `?${query}` : ''}`
  }

  const hasItems = items && items.length > 0
  if (!hasItems) return null

  return (
    <div className="lyraBlog-filters">
      <span className="sr-only">Filter by category</span>

      <div className="cattag-chips">
        <Link
          href={buildUrl(null)}
          className={classNames('cattag-chip', {
            selected: selectedCategory === null,
          })}
          aria-label="Show all posts"
          aria-current={selectedCategory === null ? 'page' : undefined}
        >
          All Posts ({totalCount})
        </Link>

        {items.map((item) => {
          const isActive = selectedCategory === item.slug
          const text = `${item.title} (${item.count})`

          return (
            <Link
              key={item._id}
              href={buildUrl(item.slug)}
              className={classNames('cattag-chip', {
                selected: isActive,
              })}
              aria-label={`Filter by category ${item.title}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {text}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
