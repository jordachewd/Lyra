import type {PostCard} from '@/lib/zod/website/content/blog'
import type {NestedImageField} from '@/lib/images/types'
import type {RichTextPropValue} from '../ui/RichText'
import type {Tag} from '@/lib/zod/website/content/tag'
import Link from 'next/link'
import RenderImage from '../ui/RenderImage'
import CatTagChip from './CatTagChip'
import {formatPostDate} from '@/lib/utils/common/format-date'
import RichText from '../ui/RichText'
import classNames from 'classnames'
import {Category} from '@/lib/zod/website/content/category'
import {Author} from '@/lib/zod/website/content/author'
import AuthorsList from './AuthorsList'
import type {BlogDisplaySettings} from '@/lib/zod/website/settings/reading'

type FeaturedProps = {
  post: PostCard
  settings: BlogDisplaySettings
}

export default function FeaturedPost({post, settings}: FeaturedProps) {
  const title = post.title
  const image = post.image as NestedImageField
  const excerpt = post.excerptText as RichTextPropValue
  const categories = post.categories as Category[]
  const authors = post.authors as unknown as Author[]
  const tags = post.tags as Tag[]
  const alt = post.image?.alt ?? title
  const date = formatPostDate(post?.publishedAt)

  const {showExcerpt, showCats, showTags, showAuthor, showDate} = settings

  const hasImg = !!image?.image?.asset?.url
  const hasCats = categories.length > 0 && showCats
  const hasAuths = authors.length > 0 && showAuthor
  const hasTags = tags.length > 0 && showTags
  const hasExcerpt = !!excerpt && showExcerpt

  const heroClass = classNames('lyraBlog-hero', {
    noImage: !hasImg,
  })

  return (
    <div className={heroClass} aria-label="featured article">
      {hasImg && (
        <Link href={`/blog/${post.slug}`} className="lyraBlog-hero-media">
          <RenderImage image={image} alt={alt} displayWidth={700} mobileWidth={360} priority />
        </Link>
      )}

      <div className="lyraBlog-hero-content">
        {hasCats && <CatTagChip className="lyraBlog-hero-categories" items={categories} />}

        <h2 className="lyraBlog-hero-headline">
          <Link href={`/blog/${post.slug}`}> {title} </Link>
        </h2>

        {hasAuths && (
          <AuthorsList
            className="lyraBlog-hero-authors"
            imageSize={20}
            authors={authors}
            clickable
          />
        )}

        {hasExcerpt && <RichText className="lyraBlog-hero-excerpt" value={excerpt} />}

        {(hasTags || showDate) && (
          <div className="lyraBlog-hero-meta">
            {hasTags && <CatTagChip className="lyraBlog-hero-tags" items={tags} />}
            {showDate && (
              <time className="lyraBlog-hero-date" dateTime={date}>
                {date}
              </time>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
