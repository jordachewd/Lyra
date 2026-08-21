import {NestedImageField} from '@/lib/images/types'
import {SectionOf} from '@/lib/zod/website/content/page'
import classNames from 'classnames'
import RenderImageBox from '../ui/RenderImageBox'
import {RichTextPropValue} from '../ui/RichText'
import AccordionItems from './partials/AccordionItems'
import SectionWrapper from '../layout/partials/SectionWrapper'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import TitleDesc from '../layout/partials/TitleDesc'

type AccordionProps = SectionOf<'accordion'>

export default function AccordionSection({
  _id,
  eyebrow,
  title,
  subtitle,
  description,
  image,
  items,
  accSettings,
  settings,
}: AccordionProps) {
  const {titleDesc, layout} = settings as SectionSettings

  const {template, width} = layout
  const isCentered = template === 'centered' || template === 'revCentered'
  const align = isCentered ? 'center' : template === 'reversed' ? 'right' : 'left'

  const img = image as NestedImageField | null | undefined
  const hasImg = !!img?.image
  const imgWidth = isCentered ? 960 : width === 'full' ? 860 : 680

  const contentCss = classNames('lyraAccordion-content', {
    ordered: accSettings.ordered,
  })

  const accordionCss = classNames({
    ordered: accSettings.ordered,
  })

  return (
    <SectionWrapper
      id={`accordion-${_id}`}
      settings={settings as SectionSettings}
      className="lyraAccordion"
    >
      {hasImg && (
        <RenderImageBox title={title} img={img} imgSize={imgWidth} className="lyraAccordion-image" />
      )}

      <div className={contentCss}>
        {titleDesc.showTitle && (
          <TitleDesc
            title={title}
            desc={description as RichTextPropValue}
            above={eyebrow || undefined}
            below={subtitle || undefined}
            alignment={align}
            settings={titleDesc}
          />
        )}

        <AccordionItems items={items} settings={accSettings} className={accordionCss} />
      </div>
    </SectionWrapper>
  )
}
