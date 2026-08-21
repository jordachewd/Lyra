import {type RichTextPropValue} from '@/components/ui/RichText'
import {SectionOf} from '@/lib/zod/website/content/page'
import RenderImage from '@/components/ui/RenderImage'
import FeatureItems from './partials/FeatureItems'
import SectionButtons from './partials/SectionButtons'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {SanityColor} from '@/lib/types/color-format'
import classNames from 'classnames'

type HeroProps = SectionOf<'hero'>

export default function Hero({
  _id,
  aboveTitle,
  title,
  belowTitle,
  subheadline,
  features,
  featDisplay,
  image,
  eyebrowImage,
  buttons,
  settings,
}: HeroProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const {showTitle, shrinkTitle, textColor, accentColor} = titleDesc
  const {template, width} = layout

  const isCentered = template === 'centered' || template === 'revCentered'
  const align = isCentered ? 'center' : 'left'

  const hasImg = !!image?.image?.asset
  const imgAlt = image?.alt ?? (title || 'Hero Section Image')
  const imgWidth = isCentered ? 960 : width === 'full' ? 860 : 680
  const imgSize = getImgSize(image?.widthSize || 'normal', imgWidth)
  const imgShape = image?.shape ?? 'normal'

  const hasEyebrowImg = !!eyebrowImage?.image?.asset
  const eyebrowImgAlt = eyebrowImage?.alt ?? (title || 'Hero Section Eyebrow Image')
  const eyebrowImgSize = getImgSize(eyebrowImage?.widthSize || 'normal', 320)
  const eyebrowImgShape = eyebrowImage?.shape ?? 'normal'

  const hasBtns = buttons && buttons.length > 0
  const hasFeats = features && features.length > 0
  const feats = features ?? []

  const featClass = classNames(
    'arrHero-features',
    featDisplay || 'vertical',
    shrinkTitle && 'shrink',
    align,
  )

  return (
    <SectionWrapper id={`hero-${_id}`} settings={settings as SectionSettings} className="arrHero">
      <div className="arrHero-content">
        {hasEyebrowImg && (
          <div className={`arrHero-eyebrowImage ${eyebrowImgShape}`}>
            <RenderImage
              image={eyebrowImage}
              alt={eyebrowImgAlt}
              displayWidth={eyebrowImgSize}
              mobileWidth={eyebrowImgSize * 0.5}
              priority
            />
          </div>
        )}

        {showTitle && (
          <TitleDesc
            title={title}
            desc={subheadline as RichTextPropValue}
            above={aboveTitle || undefined}
            below={belowTitle || undefined}
            alignment={align}
            settings={titleDesc}
          />
        )}

        {hasFeats && (
          <FeatureItems
            features={feats}
            className={featClass}
            textColor={textColor as SanityColor}
            accentColor={accentColor as SanityColor}
          />
        )}

        {hasBtns && (
          <SectionButtons
            buttons={buttons}
            className={`arrHero-actions ${align}`}
            location={`${title} section`}
          />
        )}
      </div>

      <div className={`arrHero-image ${imgShape}`}>
        {hasImg && (
          <RenderImage
            image={image}
            alt={imgAlt}
            displayWidth={imgSize}
            mobileWidth={imgSize * 0.5}
            priority
          />
        )}
      </div>
    </SectionWrapper>
  )
}
