import {SectionOf} from '@/lib/zod/website/content/page'
import RichText, {RichTextPropValue} from '../ui/RichText'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {SanityColor} from '@/lib/types/color-format'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type TextOnlyProps = SectionOf<'text'>

export default function TextOnlySection({
  _id,
  aboveTitle,
  title,
  belowTitle,
  content,
  settings,
}: TextOnlyProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const {showTitle, showDesc, textColor, accentColor} = titleDesc
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'
  const hasDesc = content && content.length > 0

  return (
    <SectionWrapper
      id={`text-only-${_id}`}
      settings={settings as SectionSettings}
      className="lyraTextOnly"
    >
      {showTitle && (
        <div className="lyraTextOnly-title">
          <TitleDesc
            title={title}
            above={aboveTitle || undefined}
            below={belowTitle || undefined}
            alignment={align}
            settings={titleDesc}
          />
        </div>
      )}

      {hasDesc && showDesc && (
        <RichText
          className="lyraTextOnly-content"
          value={content as RichTextPropValue}
          textColor={textColor as SanityColor}
          accentColor={accentColor as SanityColor}
        />
      )}
    </SectionWrapper>
  )
}
