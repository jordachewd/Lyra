import AuthorsList from '@/components/blog/AuthorsList'
import CatTagChip from '@/components/blog/CatTagChip'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import RenderImage from '@/components/ui/RenderImage'
import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import type {NestedImageField} from '@/lib/images/types'
import {formatPostDate} from '@/lib/utils/common/format-date'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import type {Author} from '@/lib/zod/website/content/author'
import type {PostCard} from '@/lib/zod/website/content/blog'
import type {Category} from '@/lib/zod/website/content/category'
import type {Tag} from '@/lib/zod/website/content/tag'
import {BlogDisplaySettings} from '@/lib/zod/website/settings/reading'
import classNames from 'classnames'
import Link from 'next/link'

type ListProps = {
  posts: PostCard[]
  settings: BlogDisplaySettings
  className?: string
}

export default function BlogCardsList({posts, settings, className: cssClass}: ListProps) {
  const {showExcerpt, showCats, showTags, showAuthor, showDate} = settings
  const sectionClass = classNames('lyraBlogSection-posts', cssClass)

  return (
    <div className={sectionClass}>
      {posts.map((card, idx) => {
        const cardImg = card.image as NestedImageField | null | undefined
        const imgAlt = cardImg?.alt ?? (card.title || 'Blog Post Image')
        const imgSize = getImgSize(cardImg?.widthSize || 'normal', 640)

        const hasImg = !!cardImg?.image
        const hasExcerpt = showExcerpt && card.excerptText
        const hasCats = showCats && card.categories.length > 0
        const hasTags = showTags && card.tags.length > 0
        const hasAuths = showAuthor && card.authors.length > 0
        const hasDate = showDate && card.publishedAt
        const cardDate = formatPostDate(card.publishedAt)

        return (
          <div key={idx + card._id} className="lyraBlogSection-postCard">
            <Link href={`/blog/${card.slug}`} className="lyraBlogSection-postCard-image">
              {hasImg ? (
                <RenderImage
                  image={cardImg}
                  alt={imgAlt}
                  displayWidth={imgSize}
                  mobileWidth={imgSize * 0.5}
                  priority
                />
              ) : (
                <ImagePlaceholder />
              )}
            </Link>

            <div className="lyraBlogSection-postCard-content">
              {hasCats && (
                <CatTagChip
                  className="lyraBlogSection-postCard-categories"
                  items={card.categories as Category[]}
                />
              )}

              <Link href={`/blog/${card.slug}`} className="lyraBlogSection-postCard-title">
                {card.title}
              </Link>

              {hasAuths && (
                <AuthorsList
                  imageSize={20}
                  className="lyraBlogSection-postCard-authors"
                  authors={card.authors as Author[]}
                  clickable
                />
              )}

              {hasExcerpt && (
                <RichText
                  className="lyraBlogSection-postCard-excerpt"
                  value={card.excerptText as RichTextPropValue}
                />
              )}

              {(hasTags || hasDate) && (
                <div className="lyraBlogSection-postCard-widgets">
                  {hasTags && (
                    <CatTagChip
                      className="lyraBlogSection-postCard-tags"
                      items={card.tags as Tag[]}
                    />
                  )}

                  {hasDate && (
                    <time dateTime={cardDate} className="lyraBlogSection-postCard-date">
                      {cardDate}
                    </time>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
