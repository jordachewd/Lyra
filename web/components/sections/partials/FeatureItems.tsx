import RenderImage from '@/components/ui/RenderImage'
import {NestedImageField} from '@/lib/images/types'
import {SanityColor} from '@/lib/types/color-format'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {FeatureItem} from '@/lib/zod/sections/content/products'
import classNames from 'classnames'

type FeatureItemsProps = {
  features: FeatureItem[]
  className?: string
  textColor?: SanityColor
  accentColor?: SanityColor
}

export default function FeatureItems({
  features,
  className: cssClass,
  textColor,
  accentColor,
}: FeatureItemsProps) {
  if (features.length === 0) return null
  const itemClass = classNames('arrFeatures', cssClass, {
    cards: features.some((feat) => feat.layout === 'card'),
  })

  const cssVars = getCssVars(
    {
      textColor: textColor as SanityColor,
      accentColor: accentColor as SanityColor,
    },
    'featureItem',
  )

  return (
    <div className={itemClass} style={cssVars.vars}>
      {features.map((feature, index) => {
        const {eyebrow, title, icon, description, ttlSize, layout} = feature as FeatureItem
        const iconField = icon as NestedImageField | null | undefined
        const iconAlt = iconField?.alt ?? (title || `Feature Icon ${index + 1}`)
        const desc = description ? description : null

        return (
          <div key={feature.id + index} className={`arrFeatures-item ${layout}`}>
            {icon && (
              <div className="arrFeatures-icon">
                <RenderImage image={icon} alt={iconAlt} />
              </div>
            )}

            <div className="arrFeatures-content">
              {eyebrow && <span className="arrFeatures-content-eyebrow">{eyebrow}</span>}
              <span className={`arrFeatures-content-title ${ttlSize}`}>{title}</span>
              {desc && <span className="arrFeatures-content-description">{desc}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
