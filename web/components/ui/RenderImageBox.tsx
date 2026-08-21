import {NestedImageField} from '@/lib/images/types'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import classNames from 'classnames'
import RenderImage from './RenderImage'

type ImageBoxProps = {
  img: NestedImageField | null | undefined
  imgSize?: number
  className?: string
  title?: string
}

export default function RenderImageBox({img, imgSize = 720, className: css, title}: ImageBoxProps) {
  if (!img) return null

  const alt = img?.alt ?? (title || 'Section Image')
  const size = getImgSize(img?.widthSize || 'normal', imgSize)
  const shape = img?.shape ?? 'normal'
  const style = classNames('lyraImageBox', shape, css)

  return (
    <div className={style}>
      <RenderImage image={img} alt={alt} displayWidth={size} mobileWidth={size * 0.5} priority />
    </div>
  )
}
