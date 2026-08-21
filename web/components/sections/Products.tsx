import {SectionOf} from '@/lib/zod/website/content/page'
import {type RichTextPropValue} from '@/components/ui/RichText'
import ProductCard from './partials/ProductCard'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type ProductsProps = SectionOf<'products'>

export default function ProductsSection({_id, title, description, cards, settings}: ProductsProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'
  const hasCards = cards && cards.length > 0

  return (
    <SectionWrapper
      id={`products-${_id}`}
      settings={settings as SectionSettings}
      className="lyraProducts"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={title}
          desc={description as RichTextPropValue}
          alignment={align}
          settings={titleDesc}
          className="lyraProducts-title"
        />
      )}

      {hasCards && (
        <div className="lyraProducts-cards">
          {cards.map((card, index) => (
            <ProductCard key={index + card.id} card={card} />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
