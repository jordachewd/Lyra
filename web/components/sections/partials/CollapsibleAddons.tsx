'use client'

import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import classNames from 'classnames'
import {CSSProperties, useCallback, useMemo, useState} from 'react'

type AddonsProps = {
  content: RichTextPropValue
  label?: string
  className?: string
  textColor?: string | undefined
}

export default function CollapsibleAddons({
  content,
  label = 'Show All Addons',
  textColor,
  className: cssClass,
}: AddonsProps) {
  const [open, setOpen] = useState<boolean>(false)
  const addonClass = classNames('arrCollapsibleAddons', cssClass)

  const wrapperClass = useMemo(() => classNames('arrCollapsibleAddons-wrapper', {open}), [open])

  const cssVars: CSSProperties = useMemo(
    () => (textColor ? {['--collapsibleAddon-txt' as string]: textColor} : {}),
    [textColor],
  )

  const toggleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <div className={addonClass} style={cssVars}>
      <div
        className="arrCollapsibleAddons-header"
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        aria-expanded={open}
      >
        <span aria-hidden="true" className="arrCollapsibleAddons-header-icon" />
        <span className="arrCollapsibleAddons-header-text">{label}</span>
      </div>

      <div className={wrapperClass}>
        <RichText value={content} className="arrCollapsibleAddons-wrapper-content" />
      </div>
    </div>
  )
}
