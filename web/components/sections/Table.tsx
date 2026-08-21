import {SectionOf} from '@/lib/zod/website/content/page'
import {RichTextPropValue} from '../ui/RichText'
import LyraPortableTable from './partials/LyraPortableTable'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'
import {SanityColor} from '@/lib/types/color-format'

type TableProps = SectionOf<'table'>

export default function TableSection({
  _id,
  aboveEyebrow,
  title,
  belowEyebrow,
  description,
  table,
  settings,
}: TableProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const {showTitle, textColor, accentColor} = titleDesc
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'
  const hasTable = Array.isArray(table) && table.length > 0

  return (
    <SectionWrapper
      id={`table-${_id}`}
      settings={settings as SectionSettings}
      className="lyraTableSection"
    >
      {showTitle && (
        <TitleDesc
          title={title}
          desc={description as RichTextPropValue}
          above={aboveEyebrow || undefined}
          below={belowEyebrow || undefined}
          alignment={align}
          settings={titleDesc}
          className="lyraTableSection-title"
        />
      )}

      <div className="lyraTableSection-content">
        {hasTable ? (
          <LyraPortableTable
            data={table}
            className="lyraTableSection"
            textColor={textColor as SanityColor}
            accentColor={accentColor as SanityColor}
          />
        ) : (
          <div className="lyraTableSection-empty">No data available.</div>
        )}
      </div>
    </SectionWrapper>
  )
}
