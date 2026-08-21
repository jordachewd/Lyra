'use client'

import RichText, {RichTextPropValue} from '@/components/ui/RichText'
import {SanityColor} from '@/lib/types/color-format'
import {AccordionDesign, type AccordionItem} from '@/lib/zod/sections/content/accordion'
import classNames from 'classnames'
import {memo} from 'react'

type RowProps = {
  item: AccordionItem
  index: number
  isOpen: boolean
  type: AccordionDesign
  textColor?: SanityColor
  accentColor?: SanityColor
  onToggle: (index: number) => void
}

function AccordionRow({item, index, isOpen, type, textColor, accentColor, onToggle}: RowProps) {
  const itemCss = classNames('arrAccordion-item', {
    faq: type === 'faq',
    glossary: type === 'glossary',
  })

  const answerCss = classNames('arrAccordion-answerWrap', {
    open: isOpen,
  })

  return (
    <div className={itemCss} onClick={() => onToggle(index)}>
      <div className="arrAccordion-question">
        <span className="arrAccordion-question-text">{item.title}</span>
        <span aria-hidden="true" className="arrAccordion-question-icon" />
      </div>

      <div className={answerCss}>
        <RichText
          className="arrAccordion-answer"
          value={item.description as RichTextPropValue}
          textColor={textColor}
          accentColor={accentColor}
        />
      </div>
    </div>
  )
}

export default memo(AccordionRow)
