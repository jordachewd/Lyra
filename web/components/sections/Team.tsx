import {SectionOf} from '@/lib/zod/website/content/page'
import TeamMembersGrid from './partials/TeamMembersGrid'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {RichTextPropValue} from '../ui/RichText'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type TeamSectionProps = SectionOf<'teamOverview'>

export default function TeamSection({
  _id,
  title,
  subtitle,
  description,
  members,
  settings,
}: TeamSectionProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'
  const hasMembers = members.length > 0

  return (
    <SectionWrapper
      id={`team-${_id}`}
      settings={settings as SectionSettings}
      className="lyraTeamOverview"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={title}
          below={subtitle}
          desc={description as RichTextPropValue}
          alignment={align}
          settings={titleDesc}
          className="lyraTeamOverview-title"
        />
      )}

      {hasMembers && <TeamMembersGrid members={members} />}
    </SectionWrapper>
  )
}
