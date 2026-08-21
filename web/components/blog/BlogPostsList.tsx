import type {PostList, BlogTags, BlogCategories, PostCard} from '@/lib/zod/website/content/blog'
import BlogCardsList from '../sections/partials/BlogCardsList'
import FeaturedPost from './FeaturedPost'
import BlogPagination from './BlogPagination'
import BlogTagFilter from './BlogTagFilter'
import BlogCategoryFilter from './BlogCategoryFilter'
import {Suspense} from 'react'
import {filterEmptyTags} from '@/lib/utils/blog/filterEmptyTags'
import type {BlogSettings} from '@/lib/zod/website/settings/reading'

type BlogPostsListProps = {
  pageId: string
  allPosts: PostList | null
  allTags: BlogTags | null
  allCategories: BlogCategories | null
  currentPage: number
  selectedTag: string | null
  selectedCategory: string | null
  selectedAuthor: string | null
  settings: BlogSettings
  layout: 'normal' | 'full'
}

export default function BlogPostsList({
  pageId,
  allPosts,
  allTags,
  allCategories,
  currentPage,
  selectedTag,
  selectedCategory,
  selectedAuthor,
  settings,
  layout,
}: BlogPostsListProps) {
  const posts = allPosts?.items ?? []
  const totalFiltered = allPosts?.totalFiltered ?? 0
  const totalUnfiltered = allPosts?.totalUnfiltered ?? 0
  const isView = !selectedTag && !selectedCategory && !selectedAuthor
  const {perPage, filterBy} = settings

  const tags = filterEmptyTags(allTags ?? [])
  const categories = filterEmptyTags(allCategories ?? [])

  const hasTags = tags.length > 0 && filterBy === 'tags'
  const hasCats = categories.length > 0 && filterBy === 'categories'

  const featPost = currentPage === 1 && isView ? (posts[0] ?? null) : null
  const postsList: PostCard[] = featPost ? posts.slice(1) : posts
  const totalPages = Math.ceil(totalFiltered / perPage)

  if (totalUnfiltered === 0) {
    return <p className="lyraBlog-noPosts">No posts found.</p>
  }

  return (
    <section
      id={`section-bloglist-${pageId}`}
      className={`lyraBlog-wrapper ${layout}`}
      aria-label="Blog posts list"
    >
      {featPost && <FeaturedPost post={featPost} settings={settings} />}

      {hasCats && (
        <Suspense fallback={<div className="lyraBlog-filters" />}>
          <BlogCategoryFilter items={categories} totalCount={totalUnfiltered} />
        </Suspense>
      )}

      {hasTags && (
        <Suspense fallback={<div className="lyraBlog-filters" />}>
          <BlogTagFilter items={tags} totalCount={totalUnfiltered} />
        </Suspense>
      )}

      {postsList.length > 0 ? (
        <BlogCardsList posts={postsList} settings={settings} className="lyraBlog-posts" />
      ) : (
        !featPost && <p className="lyraBlog-noPosts">No posts found.</p>
      )}

      {totalPages > 1 && (
        <Suspense fallback={<div className="blog-pagination" />}>
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            selectedTag={selectedTag}
            selectedCategory={selectedCategory}
            selectedAuthor={selectedAuthor}
          />
        </Suspense>
      )}
    </section>
  )
}
