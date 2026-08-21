import {ComparisonItemSchema} from '@/lib/zod/sections/content/comparison'
import ComparisonBox from './ComparisonBox'

type ComparisonItemProps = {
  item: ComparisonItemSchema
}

export default function ComparisonItem({item}: ComparisonItemProps) {
  const boxes = item.boxes || []

  return (
    <div className="lyraComparison-step">
      <div className="lyraComparison-step-title">{item.title}</div>
      {boxes.length > 0 && (
        <div className="lyraComparison-step-boxes">
          {boxes.map((box, index) => (
            <ComparisonBox key={box.id + index} box={box} />
          ))}
        </div>
      )}
    </div>
  )
}
