import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import {SectionOf} from '@/lib/zod/website/content/page'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {RichTextPropValue} from '../ui/RichText'
import {ContentBlockSettings} from '@/lib/zod/sections/content/content-blocks'
import ContentBlocksList from './partials/ContentBlocksList'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type ContentBlocksProps = SectionOf<'contentBlocks'>

export default function ContentBlocks({
  _id,
  aboveEyebrow,
  headline,
  belowEyebrow,
  description,
  blocks,
  blocksSettings,
  settings,
}: ContentBlocksProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'

  const safeBlocks = blocks ?? []
  const hasBlocks = safeBlocks.length > 0

  return (
    <SectionWrapper
      id={`contentBlocks-${_id}`}
      settings={settings as SectionSettings}
      className="lyraContentBlocks"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={headline}
          desc={description as RichTextPropValue}
          above={aboveEyebrow || undefined}
          below={belowEyebrow || undefined}
          alignment={align}
          settings={titleDesc}
          className="lyraContentBlocks-title"
        />
      )}

      {hasBlocks && (
        <ContentBlocksList
          items={safeBlocks}
          blocksSettings={blocksSettings as ContentBlockSettings}
        />
      )}
    </SectionWrapper>
  )
}
