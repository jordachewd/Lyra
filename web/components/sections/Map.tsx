import {SectionOf} from '@/lib/zod/website/content/page'
import {RichTextPropValue} from '../ui/RichText'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type MapProps = SectionOf<'mapSection'>

export default function MapSection({
  _id,
  title,
  subtitle,
  description,
  embedUrl,
  fullScreen,
  settings,
}: MapProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'

  return (
    <SectionWrapper
      id={`map-${_id}`}
      settings={settings as SectionSettings}
      className="arrMapSection"
    >
      {titleDesc.showTitle && (
        <div className="arrMapSection-content">
          <TitleDesc
            title={title}
            below={subtitle}
            desc={description as RichTextPropValue}
            alignment={align}
            settings={titleDesc}
            className="arrMapSection-title"
          />
        </div>
      )}

      <div className="arrMapSection-map">
        {embedUrl ? (
          <iframe
            loading="lazy"
            src={embedUrl}
            referrerPolicy="no-referrer-when-downgrade"
            title={title || 'Arratech Office Location'}
            allowFullScreen={fullScreen}
          />
        ) : (
          <p>No map yet.</p>
        )}
      </div>
    </SectionWrapper>
  )
}
