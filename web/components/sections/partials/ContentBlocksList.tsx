'use client'

import RenderImage from '@/components/ui/RenderImage'
import RichText, {RichTextPropValue} from '@/components/ui/RichText'
import {NestedImageField} from '@/lib/images/types'
import {SanityColor} from '@/lib/types/color-format'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {perRowToClass} from '@/lib/utils/sections/per-row-class'
import {ContentBlock, ContentBlockSettings} from '@/lib/zod/sections/content/content-blocks'
import classNames from 'classnames'
import {KeyboardEvent, memo, useCallback, useMemo, useState} from 'react'

type ContentBlocksListProps = {
  items: ContentBlock[]
  blocksSettings: ContentBlockSettings
}

function ContentBlocksList({items, blocksSettings}: ContentBlocksListProps) {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const {
    type,
    showIcon,
    iconTitle,
    perRow,
    collapsible,
    gap,
    textColor,
    accentColor,
    bgColor,
    iconBg,
  } = blocksSettings as ContentBlockSettings

  const openBlock = useCallback(
    (index: number) => {
      if (!collapsible) return
      setOpenItem((prev) => (prev === index ? null : index))
    },
    [collapsible],
  )

  const onBlockKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, index: number) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      openBlock(index)
    },
    [openBlock],
  )

  const blockClass = useMemo(
    () =>
      classNames('arrContentBlocks-block', type, iconTitle, perRowToClass(perRow), {
        collapsible: collapsible,
      }),
    [type, iconTitle, perRow, collapsible],
  )

  const gridClass = useMemo(
    () =>
      classNames('arrContentBlocks-grid', type, {
        collapsible: collapsible,
        [`gap-${gap}`]: gap !== 'normal',
      }),
    [type, collapsible, gap],
  )

  const gridCss = getCssVars(
    {
      textColor: textColor as SanityColor,
      accentColor: accentColor as SanityColor,
      bgColor: bgColor as SanityColor,
      iconBg: iconBg as SanityColor,
    },
    'contentBlocks',
  )

  return (
    <div className={gridClass} style={gridCss.vars}>
      {items.map((block, idx) => {
        const blkIcon = block.icon as NestedImageField | null | undefined
        const blkIconAlt = blkIcon?.alt ?? (block.title || 'Content Block Icon')

        const blkHasIcon = showIcon && !!blkIcon?.image
        const blkHasDesc = !!block.description && block.description.length > 0
        const blkIconSize = type === 'card' ? 48 : 20

        const canToggle = collapsible && blkHasDesc
        const isOpen = openItem === idx

        const textClass = classNames('arrContentBlocks-block-desc', type, {
          collapsible: collapsible,
          open: isOpen,
        })

        const toggleProps = canToggle
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-expanded': isOpen,
              onClick: () => openBlock(idx),
              onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => onBlockKeyDown(event, idx),
            }
          : {}

        return (
          <div key={block.id} className={blockClass} {...toggleProps}>
            <div className={`arrContentBlocks-block-head ${type} ${iconTitle}`}>
              {blkHasIcon && (
                <div className={`arrContentBlocks-block-head-icon ${type}`}>
                  <RenderImage
                    image={blkIcon}
                    alt={blkIconAlt}
                    displayWidth={blkIconSize}
                    mobileWidth={blkIconSize}
                  />
                </div>
              )}

              <div className="arrContentBlocks-block-head-title">
                <span className="arrContentBlocks-block-head-title-text">{block.title}</span>

                {block.tagline && (
                  <span className="arrContentBlocks-block-head-title-tagline">{block.tagline}</span>
                )}
              </div>
            </div>

            {blkHasDesc && (
              <div className={textClass}>
                <RichText
                  className="arrContentBlocks-block-desc-content"
                  value={block.description as RichTextPropValue}
                />
              </div>
            )}

            {canToggle && <span aria-hidden="true" className="arrContentBlocks-block-collapse" />}
          </div>
        )
      })}
    </div>
  )
}

export default memo(ContentBlocksList)
