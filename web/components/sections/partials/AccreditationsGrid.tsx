import {
  AccreditationItem as AccreditationItemType,
  AccreditationSettings,
} from '@/lib/zod/sections/content/accreditations'
import AccreditationItem from './AccreditationItem'

type Props = {
  items: AccreditationItemType[]
  settings?: AccreditationSettings
}

export default function AccreditationsGrid({items, settings}: Props) {
  return (
    <div className="lyraAccreditations-grid">
      {items.map((item, index) => (
        <AccreditationItem key={item.id + index} item={item} settings={settings} />
      ))}
    </div>
  )
}
