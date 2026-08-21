import RichText, {RichTextPropValue} from '@/components/ui/RichText'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {StepItemSchema} from '@/lib/zod/sections/content/stepper'
import {SanityColor} from '@/lib/types/color-format'
import {memo} from 'react'
import classNames from 'classnames'

type StepperItemProps = {
  item: StepItemSchema
  /** Last step of a desktop row: suppresses its forward connector line. */
  isRowEnd?: boolean
}

function StepperItem({item, isRowEnd = false}: StepperItemProps) {
  const {id, title, description, layout, label, textColor, descColor, background} =
    item as StepItemSchema

  const stepCss = getCssVars(
    {
      textColor: textColor as SanityColor,
      bgColor: background as SanityColor,
    },
    'stepperItem',
  )

  const stepClass = classNames('lyraStepper-step', layout, {
    'no-label': !label,
    'row-end': isRowEnd,
  })

  const labelClass = classNames('lyraStepper-step-label', {
    'no-label': !label,
    'has-ring': !!textColor,
  })

  return (
    <div id={`step-${id}`} className={stepClass} style={stepCss.vars}>
      <div className={labelClass}>{label}</div>
      <div className={`lyraStepper-step-content ${layout}`}>
        <div className="lyraStepper-step-content-title">{title}</div>
        {description.length > 0 && (
          <RichText
            className="lyraStepper-step-content-desc"
            value={description as RichTextPropValue}
            textColor={descColor as SanityColor}
          />
        )}
      </div>
    </div>
  )
}

export default memo(StepperItem)
