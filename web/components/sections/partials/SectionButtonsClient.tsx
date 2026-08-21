'use client'

import Link from 'next/link'
import {sendGTMEvent} from '@next/third-parties/google'
import {memo, useCallback} from 'react'
import {CtaButton} from '@/lib/zod/sections/layout/cta-button'
import {toGtmCtaName, toGtmLocation} from '@/lib/utils/common/to-gtm-key'

type ButtonsClientProps = {
  buttons: CtaButton[]
  location: string
  className?: string
  sendEvent?: boolean
}

function SectionButtonsClient({
  buttons,
  location: loc,
  className,
  sendEvent = false,
}: ButtonsClientProps) {
  const handleClick = useCallback(
    (value: string) => {
      if (!sendEvent) return

      const cta_name = toGtmCtaName(value)
      const location = toGtmLocation(loc)

      sendGTMEvent({event: 'cta_click', cta_name, location})
    },
    [sendEvent, loc],
  )

  return (
    <div className={className}>
      {buttons.map((btn, index) => (
        <Link
          key={btn.id || index}
          href={btn.href ?? '/'}
          target={btn.target ? '_blank' : '_self'}
          className={`lyraButton ${btn.highlight ? 'highlighted' : ''}`}
          onClick={() => handleClick(btn.text)}
        >
          {btn.text}
        </Link>
      ))}
    </div>
  )
}

export default memo(SectionButtonsClient)
