import {SectionOf} from '@/lib/zod/website/content/page'
import {Fragment} from 'react'
import {RichTextPropValue} from '../ui/RichText'
import StepperItem from './partials/StepperItem'
import SectionButtons from './partials/SectionButtons'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import SectionWrapper from '../layout/partials/SectionWrapper'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type StepperProps = SectionOf<'stepper'>

const STEPS_PER_ROW = 7

export default function StepperSection({
  _id,
  title,
  eyebrow,
  description,
  steps,
  buttons,
  disclaimer,
  settings,
}: StepperProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'
  const hasSteps = steps && steps.length > 0
  const hasButtons = buttons && buttons.length > 0

  return (
    <SectionWrapper
      id={`stepper-${_id}`}
      settings={settings as SectionSettings}
      className="arrStepper"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={title}
          above={eyebrow || undefined}
          desc={description as RichTextPropValue}
          alignment={align}
          settings={titleDesc}
          className="arrStepper-title"
        />
      )}

      {hasSteps && (
        <div className="arrStepper-steps">
          {steps.map((step, index) => {
            const isRowEnd = (index + 1) % STEPS_PER_ROW === 0
            const showSeparator = isRowEnd && index < steps.length - 1

            return (
              <Fragment key={step.id + index}>
                <StepperItem item={step} isRowEnd={isRowEnd} />
                {showSeparator && (
                  <div className="arrStepper-step-separator">
                    <div className="arrStepper-step-separator-line"></div>
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      )}

      {hasButtons && (
        <SectionButtons
          buttons={buttons}
          className="arrStepper-actions"
          location={`${title} section`}
        />
      )}

      {disclaimer && <div className="arrStepper-disclaimer">{disclaimer}</div>}
    </SectionWrapper>
  )
}
