import {SectionOf} from '@/lib/zod/website/content/page'
import {type RichTextPropValue} from '../ui/RichText'
import ComparisonItem from './partials/ComparisonItem'
import SectionButtons from './partials/SectionButtons'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type ComparisonProps = SectionOf<'comparison'>

export default function ComparisonSection({
  _id,
  title,
  description,
  steps,
  buttons,
  settings,
}: ComparisonProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'

  const allSteps = steps || []
  const hasSteps = allSteps.length > 0
  const hasButtons = buttons.length > 0

  return (
    <SectionWrapper
      id={`comparison-${_id}`}
      settings={settings as SectionSettings}
      className="lyraComparison"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={title}
          desc={description as RichTextPropValue}
          alignment={align}
          settings={titleDesc}
        />
      )}

      {hasSteps && (
        <div className="lyraComparison-steps">
          {allSteps.map((step, index) => (
            <ComparisonItem key={step.id + index} item={step} />
          ))}
        </div>
      )}

      {hasButtons && (
        <SectionButtons
          buttons={buttons}
          className="lyraStepper-actions"
          location={`${title} section`}
        />
      )}
    </SectionWrapper>
  )
}
