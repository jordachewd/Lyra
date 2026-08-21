import RenderImage from '@/components/ui/RenderImage'
import {NestedImageField} from '@/lib/images/types'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import {
  AccreditationItem as AccreditationItemType,
  AccreditationSettings,
} from '@/lib/zod/sections/content/accreditations'
import Link from 'next/link'

type Props = {
  item: AccreditationItemType
  settings?: AccreditationSettings
}

export default function AccreditationItem({item, settings}: Props) {
  const img = item.image as NestedImageField | null | undefined
  const imgSize = getImgSize(img?.widthSize ?? 'normal', 192)

  const hasImg = Boolean(img?.image?.asset)
  const hasTitle = settings?.showTitles && Boolean(item.title)
  const hasTag = Boolean(item.tag && settings?.showTags)

  const linkHref = item.link?.href ?? null
  const linkNewTab = item.link?.newTab ?? false

  const content = (
    <>
      {hasTitle && <div className="lyraAccreditations-item-title">{item.title}</div>}
      {hasImg && (
        <div className="lyraAccreditations-item-image">
          <RenderImage
            image={img}
            alt={img?.alt || item.title}
            displayWidth={imgSize}
            mobileWidth={imgSize}
          />
        </div>
      )}
      {hasTag && <div className="lyraAccreditations-item-tag">{item.tag}</div>}
    </>
  )

  return (
    <>
      {linkHref ? (
        <Link
          href={linkHref}
          className="lyraAccreditations-item"
          {...(linkNewTab && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
        >
          {content}
        </Link>
      ) : (
        <div className="lyraAccreditations-item">{content}</div>
      )}
    </>
  )
}
