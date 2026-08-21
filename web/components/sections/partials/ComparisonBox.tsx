import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {ComparisonBoxSchema} from '@/lib/zod/sections/content/comparison'
import {SanityColor} from '@/lib/types/color-format'

type ComparisonBoxProps = {
  box: ComparisonBoxSchema
}

export default function ComparisonBox({box}: ComparisonBoxProps) {
  const boxCss = getCssVars(
    {
      textColor: box.textColor as SanityColor,
      bgColor: box.background as SanityColor,
    },
    'comparisonBox',
  )
  return (
    <div className="lyraComparison-step-box" style={boxCss.vars}>
      <div className="lyraComparison-step-box-title">{box.title}</div>
      {box.description.length > 0 && (
        <RichText
          className="lyraComparison-step-box-desc"
          value={box.description as RichTextPropValue}
        />
      )}
    </div>
  )
}
