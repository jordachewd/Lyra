'use client'

import Link from 'next/link'
import {useMemo} from 'react'

type BlogPaginationProps = {
  currentPage: number
  totalPages: number
  selectedTag: string | null
  selectedCategory: string | null
  selectedAuthor: string | null
  basePath?: string
}

export default function BlogPagination({
  currentPage,
  totalPages,
  selectedTag,
  selectedCategory,
  selectedAuthor,
  basePath = '/blog',
}: BlogPaginationProps) {
  const paginationPages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({length: totalPages}, (_, i) => i + 1)
    }

    const pages: number[] = []
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5)
    } else if (currentPage >= totalPages - 2) {
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2)
    }
    return pages
  }, [currentPage, totalPages])

  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.set('page', page.toString())
    if (selectedTag) params.set('tag', selectedTag)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedAuthor) params.set('author', selectedAuthor)
    const query = params.toString()
    return `${basePath}${query ? `?${query}` : ''}`
  }

  return (
    <nav className="lyraBlog-pagination" aria-label="Pagination navigation">
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="lyraBlog-pagination-btn"
          aria-label="Go to previous page"
          scroll={false}
        >
          «
        </Link>
      ) : (
        <span className="lyraBlog-pagination-btn" aria-disabled="true">
          «
        </span>
      )}

      {paginationPages.map((pageNum) => {
        const isActive = pageNum === currentPage
        return isActive ? (
          <span
            key={pageNum}
            className="lyraBlog-pagination-btn"
            aria-current="page"
            aria-label={`Page ${pageNum}`}
          >
            {pageNum}
          </span>
        ) : (
          <Link
            key={pageNum}
            href={buildUrl(pageNum)}
            className="lyraBlog-pagination-btn"
            aria-label={`Go to page ${pageNum}`}
            scroll={false}
          >
            {pageNum}
          </Link>
        )
      })}

      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="lyraBlog-pagination-btn"
          aria-label="Go to next page"
          scroll={false}
        >
          »
        </Link>
      ) : (
        <span className="lyraBlog-pagination-btn" aria-disabled="true">
          »
        </span>
      )}
    </nav>
  )
}
