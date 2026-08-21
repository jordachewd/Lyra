'use client'

import Link from 'next/link'
import type {Facet} from '@/lib/types/blog-facet'
import classNames from 'classnames'
import {useSearchParams} from 'next/navigation'

type BlogTagFilterProps = {
  items: Facet[]
  totalCount: number
}

export default function BlogTagFilter({items, totalCount}: BlogTagFilterProps) {
  const searchParams = useSearchParams()
  const selectedTag = searchParams?.get('tag') ?? null

  const buildUrl = (tagSlug: string | null) => {
    const params = new URLSearchParams()
    if (tagSlug) params.set('tag', tagSlug)

    const query = params.toString()
    return `/blog${query ? `?${query}` : ''}`
  }

  const hasItems = items && items.length > 0
  if (!hasItems) return null

  return (
    <div className="lyraBlog-filters">
      <span className="sr-only">Filter by tag</span>

      <div className="cattag-chips">
        <Link
          href={buildUrl(null)}
          className={classNames('cattag-chip', 'tag', {
            selected: selectedTag === null,
          })}
          aria-label="Show all posts"
          aria-current={selectedTag === null ? 'page' : undefined}
        >
          All Posts ({totalCount})
        </Link>

        {items.map((item) => {
          const isActive = selectedTag === item.slug
          const text = `${item.title} (${item.count})`
          const chipClass = classNames('cattag-chip', 'tag', {
            selected: isActive,
          })

          return (
            <Link
              key={item._id}
              href={buildUrl(item.slug)}
              className={chipClass}
              aria-label={`Filter by tag ${item.title}`}
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
