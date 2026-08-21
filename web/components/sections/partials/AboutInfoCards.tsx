'use client'

import RenderImage from '@/components/ui/RenderImage'
import RichText, {RichTextPropValue} from '@/components/ui/RichText'
import {NestedImageField} from '@/lib/images/types'
import {AboutCard} from '@/lib/zod/sections/content/about-info'
import classNames from 'classnames'
import {memo, useCallback, useState} from 'react'

type AboutInfoCardsProps = {
  features: AboutCard[]
}

function AboutInfoCards({features}: AboutInfoCardsProps) {
  const [open, setOpen] = useState<number | null>(null)

  const onClick = useCallback((i: number) => {
    setOpen((prev) => (prev === i ? null : i))
  }, [])

  return (
    <div className="lyraAboutInfo-features">
      {features.map((feature: AboutCard, index) => {
        const featKey = feature.id || index
        const featIcon = feature.icon as NestedImageField | null | undefined
        const featAlt = featIcon?.alt ?? (feature.title || `Feature Icon ${index + 1}`)
        const featTitle = feature.title ?? `Feature ${index + 1}`
        const featContent = feature.content as RichTextPropValue
        const featClass = classNames('lyraAboutInfo-feature-content', {
          opened: open === index,
        })

        return (
          <div key={featKey} onClick={() => onClick(index)} className="lyraAboutInfo-feature-card">
            <span className="lyraAboutInfo-feature-icon">
              <RenderImage image={featIcon} alt={featAlt} />
            </span>

            <div className="lyraAboutInfo-feature-head">
              <span className="lyraAboutInfo-feature-title">{featTitle}</span>
              <span className="lyraAboutInfo-feature-rollout" aria-hidden="true"></span>
            </div>

            <div className={featClass}>
              <div className="lyraAboutInfo-feature-content-inner">
                <RichText value={featContent} className="lyraAboutInfo-feature-content-body" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default memo(AboutInfoCards)
