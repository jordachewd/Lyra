'use client'

import classNames from 'classnames'
import {memo, useCallback, useMemo, useState} from 'react'
import {
  AccordionSettings,
  type AccordionItem as AccordionItemType,
} from '@/lib/zod/sections/content/accordion'
import AccordionRow from './AccordionRow'
import {groupAccordionItems} from '@/lib/utils/sections/group-accordion-items'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {SanityColor} from '@/lib/types/color-format'

type AccordionItemProps = {
  items: AccordionItemType[]
  settings: AccordionSettings
  className?: string
}

function AccordionItems({items, settings, className}: AccordionItemProps) {
  const hasItems = items.length > 0
  const {design, ordered, firstExpanded, textColor, accentColor, bgColor} =
    settings as AccordionSettings

  const {sorted, grouped} = useMemo(() => groupAccordionItems(items, ordered), [items, ordered])
  const initialOpenIndex = useMemo(
    () => (firstExpanded && sorted.length > 0 ? 0 : null),
    [firstExpanded, sorted],
  )

  const itemsCss = useMemo(() => classNames('arrAccordion-items', className), [className])
  const groupCss = useMemo(() => classNames('arrAccordion-group', className), [className])

  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex)
  const handleOpenItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  const cssVars = getCssVars(
    {
      textColor: textColor as SanityColor,
      accentColor: accentColor as SanityColor,
      bgColor: bgColor as SanityColor,
    },
    'accordionItem',
  )

  if (!hasItems) {
    return <div className="arrAccordion-noItems">No items yet.</div>
  }

  if (ordered && grouped.length > 0) {
    return (
      <div className={itemsCss} style={cssVars.vars}>
        {grouped.map((row) => (
          <div key={row.id} className={groupCss}>
            <div className="arrAccordion-group-letter">{row.letter}</div>
            <div className="arrAccordion-group-items">
              {row.items.map(({index, item}) => (
                <AccordionRow
                  key={item.id}
                  item={item}
                  index={index}
                  type={design}
                  isOpen={openIndex === index}
                  onToggle={handleOpenItem}
                  textColor={textColor as SanityColor}
                  accentColor={accentColor as SanityColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={itemsCss} style={cssVars.vars}>
      {items.map((item, index) => (
        <AccordionRow
          key={item.id}
          item={item}
          index={index}
          type={design}
          isOpen={openIndex === index}
          onToggle={handleOpenItem}
          textColor={textColor as SanityColor}
          accentColor={accentColor as SanityColor}
        />
      ))}
    </div>
  )
}

export default memo(AccordionItems)
