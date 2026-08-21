import {SectionOf} from '@/lib/zod/website/content/page'
import {SolutionCardSchema} from '@/lib/zod/sections/content/solutions'
import SolutionCard from './partials/SolutionCard'
import classNames from 'classnames'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {RichTextPropValue} from '../ui/RichText'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type SolutionsProps = SectionOf<'solutions'>

export default function SolutionsSection({
  _id,
  title,
  description,
  cards,
  display,
  settings,
}: SolutionsProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'
  const sectionCards = (cards as SolutionCardSchema[]) || []
  const hasCards = sectionCards.length > 0

  const layoutCss = classNames({
    vertical: display === 'vertical',
    horizontal: display === 'horizontal',
  })

  const cardsCss = classNames('lyraSolutions-cards', layoutCss)

  return (
    <SectionWrapper
      id={`solutions-${_id}`}
      settings={settings as SectionSettings}
      className="lyraSolutions"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={title}
          desc={description as RichTextPropValue}
          alignment={align}
          settings={titleDesc}
        />
      )}

      {hasCards && (
        <div className={cardsCss}>
          {sectionCards.map((card, index) => (
            <SolutionCard key={card.id + index} card={card} layout={display} />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
