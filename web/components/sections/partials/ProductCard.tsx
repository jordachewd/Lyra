import RenderImage from '@/components/ui/RenderImage'
import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import {CardFooterItem} from '@/lib/zod/sections/layout/card-footer'
import {ProductCardSchema} from '@/lib/zod/sections/content/products'
import CardFooter from './CardFooter'
import CollapsibleAddons from './CollapsibleAddons'
import FeatureItems from './FeatureItems'
import {NestedImageField} from '@/lib/images/types'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {SanityColor} from '@/lib/types/color-format'

type ProductCardProps = {
  card: ProductCardSchema
}

export default function ProductCard({card}: ProductCardProps) {
  const hasDesc = card.description && card.description.length > 0
  const hasAddons = card.addons && card.addons.length > 0
  const hasFeatures = card.features && card.features.length > 0
  const hasFooter = card.footer && card.footer.length > 0
  const icon = card.icon as NestedImageField | null | undefined
  const iconAlt = icon?.alt ?? (card.title || 'Product Card Icon')

  const cardCss = getCssVars(
    {
      textColor: card.textColor as SanityColor,
      bgColor: card.background as SanityColor,
    },
    'prodCard',
  )

  return (
    <div className="lyraProducts-card" style={cardCss.vars}>
      <div className="lyraProducts-card-heading">
        {icon && (
          <div className="lyraProducts-card-heading-icon">
            <RenderImage image={icon} alt={iconAlt} displayWidth={32} mobileWidth={32} />
          </div>
        )}

        <div className="lyraProducts-card-heading-title">{card.title}</div>
      </div>

      {hasDesc && (
        <RichText className="lyraProducts-card-desc" value={card.description as RichTextPropValue} />
      )}

      {hasFeatures && (
        <div className="lyraProducts-card-features">
          <div className="lyraProducts-card-features-title">Key features</div>

          <FeatureItems
            features={card.features}
            className={card.featDisplay || 'vertical'}
            textColor={card.textColor as SanityColor}
          />

          {hasAddons && (
            <CollapsibleAddons
              label="Show all features"
              content={card.addons as RichTextPropValue}
              className="lyraProducts-card-addons"
              textColor={cardCss.colors.textColor}
            />
          )}
        </div>
      )}

      {hasFooter && (
        <CardFooter
          content={card.footer as CardFooterItem[]}
          textColor={cardCss.colors.textColor}
          className="lyraProducts-card-footer"
          section={card.title}
        />
      )}
    </div>
  )
}
