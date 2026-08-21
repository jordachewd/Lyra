import Link from 'next/link'
import {NestedImageField} from '@/lib/images/types'
import {Author} from '@/lib/zod/website/content/author'
import RenderImage from '../ui/RenderImage'
import {AuthorAvatarIcon} from './AuthorAvatarIcon'

type AuthsListProps = {
  authors: Author[]
  imageSize?: number
  className?: string
  clickable?: boolean
}

export default function AuthorsList({
  authors,
  imageSize = 24,
  className = 'arrPost-featImage-authors',
  clickable = true,
}: AuthsListProps) {
  return (
    <div className={className}>
      {authors.map((a: Author) => {
        const content = (
          <>
            {a.image ? (
              <RenderImage
                image={a.image as NestedImageField}
                alt={a.name ?? 'Author Image'}
                displayWidth={imageSize}
                mobileWidth={imageSize}
              />
            ) : (
              <AuthorAvatarIcon size={imageSize + 2} />
            )}
            <span>{a.name}</span>
          </>
        )

        if (clickable && a.slug) {
          return (
            <Link
              key={a._id}
              href={`/blog?author=${a.slug}`}
              className="arrPost-featImage-authors-item"
              aria-label={`View all posts by ${a.name}`}
            >
              {content}
            </Link>
          )
        }

        return (
          <div key={a._id} className="arrPost-featImage-authors-item">
            {content}
          </div>
        )
      })}
    </div>
  )
}
