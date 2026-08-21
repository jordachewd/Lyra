import {SanityColor} from '@/lib/types/color-format'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {TableMatrixSchema} from '@/lib/zod/sections/content/table'
import classNames from 'classnames'

type ArrTableProps = {
  data: TableMatrixSchema
  className?: string
  textColor?: SanityColor
  accentColor?: SanityColor
}

export default function ArrPortableTable({data, className, textColor, accentColor}: ArrTableProps) {
  const [headRow, ...bodyRows] = data.length > 1 ? data : ([] as TableMatrixSchema)
  const rowsBody = data.length > 1 ? bodyRows : data

  const tableClass = classNames('arrPortableTable', {
    [`${className}-table`]: !!className,
  })

  const cssVars = getCssVars(
    {
      textColor: textColor as SanityColor,
      accentColor: accentColor as SanityColor,
    },
    'portableTable',
  )

  return (
    <table className={tableClass} style={cssVars.vars}>
      {headRow && headRow.length > 0 && (
        <thead>
          <tr>
            {headRow.map((cell, i) => (
              <th key={`h-${i}`} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {rowsBody.map((row, rIdx) => (
          <tr key={`r-${rIdx}`}>
            {row.map((cell, cIdx) => (
              <td key={`r-${rIdx}-c-${cIdx}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
