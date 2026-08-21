import AboutInfoCards from './partials/AboutInfoCards'
import {SectionOf} from '@/lib/zod/website/content/page'
import {type RichTextPropValue} from '@/components/ui/RichText'
import SectionButtons from './partials/SectionButtons'
import SectionWrapper from '../layout/partials/SectionWrapper'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type AboutInfoProps = SectionOf<'aboutInfo'>

export default function AboutInfoSection(props: AboutInfoProps) {
  const {_id, title, collapsibles, description, buttons, settings} = props
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'
  const hasBtns = buttons && buttons.length > 0
  const hasCollapsibles = collapsibles && collapsibles.length > 0

  return (
    <SectionWrapper
      id={`about-info-${_id}`}
      settings={settings as SectionSettings}
      className="arrAboutInfo"
    >
      {hasCollapsibles && <AboutInfoCards features={collapsibles} />}

      <div className="arrAboutInfo-content">
        {titleDesc.showTitle && (
          <TitleDesc
            alignment={align}
            title={title}
            desc={description as RichTextPropValue}
            settings={titleDesc}
          />
        )}

        {hasBtns && (
          <SectionButtons
            buttons={buttons}
            className="arrAboutInfo-actions"
            location={`${title} section`}
          />
        )}
      </div>
    </SectionWrapper>
  )
}
