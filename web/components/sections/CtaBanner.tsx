import {NestedImageField} from '@/lib/images/types'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import {SectionOf} from '@/lib/zod/website/content/page'
import classNames from 'classnames'
import RenderImage from '../ui/RenderImage'
import {RichTextPropValue} from '../ui/RichText'
import SectionButtons from './partials/SectionButtons'
import {SanityColor} from '@/lib/types/color-format'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {CtaBannerSettings} from '@/lib/zod/sections/content/cta-banner'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type CtaBannerProps = SectionOf<'ctaBanner'>

export default function CtaBannerSection({
  _id,
  eyebrow,
  title,
  tagline,
  subheadline,
  image,
  buttons,
  ctaSettings,
  settings,
}: CtaBannerProps) {
  const {innerPadding, ctaGradient, ctaBgColor} = ctaSettings as CtaBannerSettings
  const {titleDesc, layout} = settings as SectionSettings
  const {template, columns} = layout as LayoutSettings

  const isCentered = template === 'centered' || template === 'revCentered'
  const align = isCentered ? 'center' : template === 'reversed' ? 'right' : 'left'

  const img = image?.image as NestedImageField | null | undefined
  const imgSize = getImgSize('normal', 620)
  const imgAlt = image?.alt ?? (title || 'CTA Image')

  const hasImg = !!img
  const hasButtons = buttons && buttons.length > 0
  const isGradient = ctaGradient && ctaGradient !== 'none' && ctaGradient !== 'custom'

  const ctaContainerCss = getCssVars(
    {
      bgColor: ctaBgColor as SanityColor,
    },
    'ctaContainer',
  )

  const ctaContainerClass = classNames('arrCtaBanner-container', {
    [`arrGradient-${ctaGradient}`]: isGradient,
    [`cols-${columns}`]: template === 'normal' || template === 'reversed',
    [`${template}`]: template,
    'no-img': !hasImg,
  })

  const ctaContentClass = classNames('arrCtaBanner-content', `pd-${innerPadding}`)

  return (
    <SectionWrapper
      id={`cta-banner-${_id}`}
      settings={settings as SectionSettings}
      className="arrCtaBanner"
    >
      <div className={ctaContainerClass} style={ctaContainerCss.vars}>
        <div className="arrCtaBanner-image">
          {hasImg && (
            <RenderImage
              image={img}
              alt={imgAlt}
              displayWidth={imgSize}
              mobileWidth={imgSize * 0.5}
            />
          )}
        </div>

        <div className={ctaContentClass}>
          {titleDesc.showTitle && (
            <div className="arrCtaBanner-content-title">
              <TitleDesc
                title={title}
                desc={subheadline as RichTextPropValue}
                above={eyebrow || undefined}
                below={tagline || undefined}
                alignment={align}
                settings={titleDesc}
              />
            </div>
          )}

          {hasButtons && (
            <SectionButtons
              buttons={buttons}
              className="arrCtaBanner-content-actions"
              location={`${title} section`}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
