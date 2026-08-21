import {type RichTextPropValue} from '@/components/ui/RichText'
import {SectionOf} from '@/lib/zod/website/content/page'
import RenderImage from '@/components/ui/RenderImage'
import {NestedImageField} from '@/lib/images/types'
import SectionButtons from './partials/SectionButtons'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import SectionWrapper from '../layout/partials/SectionWrapper'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {SanityColor} from '@/lib/types/color-format'

type TextImgProps = SectionOf<'textImage'>

export default function TextImage({
  _id,
  aboveTitle,
  title,
  belowTitle,
  description,
  chips,
  image,
  buttons,
  settings,
}: TextImgProps) {
  const {titleDesc, layout} = settings as SectionSettings

  const {template, width} = layout
  const isCentered = template === 'centered' || template === 'revCentered'
  const align = isCentered ? 'center' : 'left'

  const img = image?.image as NestedImageField | null | undefined
  const imgAlt = image?.alt ?? (title || 'Lyra Image')
  const imgCaption = image?.caption ?? ''
  const imgCaptionSub = image?.captionSub ?? ''
  const imgCredit = image?.credit ?? ''

  const imgWidth = isCentered ? 960 : width === 'full' ? 860 : 680
  const imgSize = getImgSize(image?.widthSize || 'normal', imgWidth)
  const imgShape = image?.shape ?? 'normal'

  const hasChips = chips && chips.length > 0
  const hasBtns = buttons && buttons.length > 0

  const textImgCss = getCssVars(
    {
      textColor: titleDesc.textColor as SanityColor,
    },
    'textImgColor',
  )

  return (
    <SectionWrapper
      id={`text-image-${_id}`}
      settings={settings as SectionSettings}
      className="lyraTextImage"
    >
      <div className="lyraTextImage-content">
        {titleDesc.showTitle && (
          <TitleDesc
            title={title}
            desc={description as RichTextPropValue}
            above={aboveTitle || undefined}
            below={belowTitle || undefined}
            alignment={align}
            settings={titleDesc}
          />
        )}

        {hasChips && (
          <div className="cattag-chips lyraTextImage-chips" style={textImgCss.vars}>
            {chips!.map((chip, index) => (
              <span key={index} className="cattag-chip">
                {chip}
              </span>
            ))}
          </div>
        )}

        {hasBtns && (
          <SectionButtons
            buttons={buttons}
            className={`lyraTextImage-actions ${align}`}
            location={`${title} section`}
          />
        )}
      </div>

      {img && (
        <div className={`lyraTextImage-image ${imgShape}`}>
          <RenderImage
            image={img}
            alt={imgAlt}
            displayWidth={imgSize}
            mobileWidth={imgSize * 0.5}
            priority
          />
          {(imgCaption || imgCaptionSub || imgCredit) && (
            <div className="lyraTextImage-image-meta">
              {imgCaption && <div className="lyraTextImage-image-caption">{imgCaption}</div>}
              {imgCaptionSub && (
                <div className="lyraTextImage-image-caption-sub">{imgCaptionSub}</div>
              )}
              {imgCredit && <div className="lyraTextImage-image-credit">{imgCredit}</div>}
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  )
}
