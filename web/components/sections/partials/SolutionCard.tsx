import RenderImage from '@/components/ui/RenderImage'
import RichText, {RichTextPropValue} from '@/components/ui/RichText'
import {NestedImageField} from '@/lib/images/types'
import {CardFooterItem} from '@/lib/zod/sections/layout/card-footer'
import {SolutionCardSchema} from '@/lib/zod/sections/content/solutions'
import classNames from 'classnames'
import CardFooter from './CardFooter'
import SolutionsCardFeature from './SolutionsCardFeature'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {stringToSlug} from '@/lib/utils/common/string-to-slug'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import {SanityColor} from '@/lib/types/color-format'

type SolutionsCardProps = {
  card: SolutionCardSchema
  layout: 'horizontal' | 'vertical'
}

function SolutionCard({card, layout}: SolutionsCardProps) {
  const image = card.image as NestedImageField | null | undefined
  const imageAlt = image?.alt ?? (card.title || 'Solution Card Image')
  const baseImgSize = layout === 'horizontal' ? 640 : 460
  const imageSize = getImgSize(image?.widthSize || 'normal', baseImgSize)
  const cardFooter: CardFooterItem[] = card.footer || []
  const hasCards = card.items && card.items.length > 0

  const layoutCss = classNames({
    vertical: layout === 'vertical',
    horizontal: layout === 'horizontal',
  })

  const cardClass = classNames('arrSolutions-card', layoutCss, {
    rounded: card.rounded,
  })

  const cardCss = getCssVars(
    {
      textColor: card.textColor as SanityColor,
      bgColor: card.background as SanityColor,
    },
    'solutionCard',
  )

  const cardId = stringToSlug(card.id + '-' + card.title)

  return (
    <div id={cardId} className={cardClass} style={cardCss.vars}>
      {image && (
        <div className={`arrSolutions-card-image ${layoutCss}`}>
          <RenderImage
            image={image}
            alt={imageAlt}
            displayWidth={imageSize}
            mobileWidth={imageSize * 0.5}
            priority
          />
        </div>
      )}

      <div className={`arrSolutions-card-content ${layoutCss}`}>
        <div className={`arrSolutions-card-content-header ${layoutCss}`}>
          <div className="arrSolutions-card-content-header-title">{card.title}</div>

          {card.content.length > 0 && (
            <RichText
              className="arrSolutions-card-content-header-desc"
              value={card.content as RichTextPropValue}
            />
          )}
        </div>

        {hasCards &&
          card.items.map((feature, index) => {
            return (
              <SolutionsCardFeature
                feature={feature}
                layout={layout}
                textColor={cardCss.colors.textColor}
                key={feature.id + '-' + index}
              />
            )
          })}

        {cardFooter.length > 0 && (
          <CardFooter
            content={cardFooter}
            className={`arrSolutions-card-footer ${layoutCss}`}
            textColor={cardCss.colors.textColor}
            section={card.title}
          />
        )}
      </div>
    </div>
  )
}

export default SolutionCard
