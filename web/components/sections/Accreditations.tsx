import {SectionOf} from '@/lib/zod/website/content/page'
import {NestedImageField} from '@/lib/images/types'
import {RichTextPropValue} from '../ui/RichText'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'
import dynamic from 'next/dynamic'
import AccreditationsGrid from './partials/AccreditationsGrid'

const AccreditationsCarousel = dynamic(() => import('./partials/AccreditationsCarousel'))

type AccreditationProps = SectionOf<'accreditation'>

export default function AccreditationSection({
  _id,
  title,
  description,
  items,
  accrSettings,
  settings,
}: AccreditationProps) {
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'

  const renderItems = items.filter((item) => {
    const img = item.image as NestedImageField | null | undefined
    return Boolean(img?.image?.asset)
  })

  const hasItems = renderItems.length > 0

  return (
    <SectionWrapper
      id={`accreditations-${_id}`}
      settings={settings as SectionSettings}
      className="lyraAccreditations"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={title}
          desc={description as RichTextPropValue}
          alignment={align}
          settings={titleDesc}
        />
      )}

      {hasItems &&
        (accrSettings?.displayType === 'carousel' ? (
          <AccreditationsCarousel items={renderItems} settings={accrSettings} />
        ) : (
          <AccreditationsGrid items={renderItems} settings={accrSettings} />
        ))}
    </SectionWrapper>
  )
}
