import RenderImage from '@/components/ui/RenderImage'
import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import {NestedImageField} from '@/lib/images/types'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import {SectionOf} from '@/lib/zod/website/content/page'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type KeyFeaturesProps = SectionOf<'keyFeatures'>

export default function KeyFeaturesSection(props: KeyFeaturesProps) {
  const {_id, topHeadline, description, cards, bottomHeadline, settings} = props

  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'

  const hasBottomHeadline = bottomHeadline && bottomHeadline.trim() !== ''

  return (
    <SectionWrapper
      id={`key-features-${_id}`}
      settings={settings as SectionSettings}
      className="arrKeyFeatures"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={topHeadline}
          desc={description as RichTextPropValue}
          className="arrKeyFeatures-topHeadline"
          alignment={align}
          settings={titleDesc}
        />
      )}

      {cards.length > 0 && (
        <div className="arrKeyFeatures-cards">
          {cards.map((card, index) => {
            const keyId = card.id + index
            const icon = card.icon as NestedImageField | null | undefined
            const iconAlt = icon?.alt ?? `Key Feature Icon ${index + 1}`

            return (
              <div key={keyId} className="arrKeyFeatures-card">
                {icon && (
                  <div className="arrKeyFeatures-card-icon">
                    <RenderImage image={icon} alt={iconAlt} displayWidth={24} mobileWidth={24} />
                  </div>
                )}

                <RichText
                  value={card.description as RichTextPropValue}
                  className="arrKeyFeatures-card-text"
                />
              </div>
            )
          })}
        </div>
      )}

      {hasBottomHeadline && (
        <TitleDesc
          title={bottomHeadline}
          alignment={align}
          settings={titleDesc}
          className="arrKeyFeatures-bottomHeadline"
        />
      )}
    </SectionWrapper>
  )
}
