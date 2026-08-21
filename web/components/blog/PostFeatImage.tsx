import {NestedImageField} from '@/lib/images/types'
import {formatPostDate} from '@/lib/utils/common/format-date'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import {PostSettings} from '@/lib/zod/sections/layout/post-settings'
import {Author} from '@/lib/zod/website/content/author'
import {Category} from '@/lib/zod/website/content/category'
import {PostDetail} from '@/lib/zod/website/content/post'
import {Tag} from '@/lib/zod/website/content/tag'
import RenderImage from '../ui/RenderImage'
import AuthorsList from './AuthorsList'
import CatTagChip from './CatTagChip'

type PostFeatImageProps = {
  postId: string
  post: PostDetail
}

export default function PostFeatImage({postId, post}: PostFeatImageProps) {
  /** Post Image */
  const pImage = post.image as NestedImageField
  const pImgAlt = post.image?.alt || post.title || 'Blog Post Image'
  const pImgSize = getImgSize(post.image?.widthSize || 'normal', 960)
  const pImgShape = post.image?.shape ?? 'normal'
  const pImgCap = post.image?.caption ?? ''
  const pImgCapSub = post.image?.captionSub ?? ''
  const pImgCredit = post.image?.credit ?? ''

  /** Post Details */
  const pDate: string = formatPostDate(post.publishedAt)
  const pCats: Category[] = post.categories || []
  const pTags: Tag[] = post.tags || []
  const pAuths: Author[] = post.authors || []

  /** Post Settings */
  const pSettings: PostSettings | null = post.settings
  const hasCats = Boolean(pSettings?.showCats && pCats.length > 0)
  const hasTags = Boolean(pSettings?.showTags && pTags.length > 0)
  const hasDate = Boolean(pSettings?.showDate && post.publishedAt)
  const hasAuths = Boolean(pSettings?.showAuthor && pAuths.length > 0)
  const hasImg = Boolean(pImage && pImage.image)

  return (
    <section id={`${postId}-featImage`} className="lyraPost-featImage">
      {hasCats && (
        <div className="lyraPost-featImage-widgets top">
          <CatTagChip items={pCats} />
        </div>
      )}

      {hasImg && (
        <div className={`lyraPost-featImage-image ${pImgShape}`}>
          <RenderImage
            image={pImage}
            alt={pImgAlt}
            displayWidth={pImgSize}
            mobileWidth={pImgSize * 0.5}
            priority
          />

          {(pImgCap || pImgCapSub || pImgCredit) && (
            <div className="lyraPost-featImage-image-meta">
              {pImgCap && <div className="lyraPost-featImage-image-caption">{pImgCap}</div>}
              {pImgCapSub && (
                <div className="lyraPost-featImage-image-caption-sub">{pImgCapSub}</div>
              )}
              {pImgCredit && (
                <div className="lyraPost-featImage-image-credit">
                  <span>Credit/Source:</span>
                  {pImgCredit}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {(hasDate || hasTags) && (
        <div className="lyraPost-featImage-widgets bottom">
          {hasTags && <CatTagChip items={pTags} />}
          {hasDate && (
            <time dateTime={pDate} className="lyraPost-featImage-date">
              {pDate}
            </time>
          )}
        </div>
      )}

      {hasAuths && <AuthorsList authors={pAuths} />}
    </section>
  )
}
