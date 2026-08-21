'use client'

import {CSSProperties, useEffect, useState} from 'react'
import classNames from 'classnames'
import {
  AccreditationItem as AccreditationItemType,
  AccreditationSettings,
} from '@/lib/zod/sections/content/accreditations'
import AccreditationItem from './AccreditationItem'

type Props = {
  items: AccreditationItemType[]
  settings?: AccreditationSettings
}

// Mobile always shows 1 item, tablet always 2; only the desktop count is
// editor-configurable (1–6). `em` mirrors the SCSS breakpoints so JS pagination
// stays locked to the CSS column count.
function readItemsPerPage(desktopCount: number): number {
  if (typeof window === 'undefined') return desktopCount
  if (window.matchMedia('(min-width: 64em)').matches) return desktopCount
  if (window.matchMedia('(min-width: 48em)').matches) return 2
  return 1
}

export default function AccreditationsCarousel({items, settings}: Props) {
  const showArrows = settings?.showArrows ?? true
  const showDots = settings?.showDots ?? true
  const autoplay = settings?.autoplay ?? true

  // Clamp CMS values defensively so a stray draft value can't break layout/timing.
  const itemsPerView = Math.min(6, Math.max(1, Math.round(settings?.itemsPerView ?? 4)))
  const autoplayMs = Math.max(2, settings?.autoplayInterval ?? 7) * 1000

  const [itemsPerPage, setItemsPerPage] = useState(itemsPerView)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  const pages = Math.max(1, Math.ceil(items.length / itemsPerPage))
  const hasControls = pages > 1

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 64em)')
    const mqTablet = window.matchMedia('(min-width: 48em)')
    const update = () => setItemsPerPage(readItemsPerPage(itemsPerView))

    update()
    mqDesktop.addEventListener('change', update)
    mqTablet.addEventListener('change', update)
    return () => {
      mqDesktop.removeEventListener('change', update)
      mqTablet.removeEventListener('change', update)
    }
  }, [itemsPerView])

  // Clamp during render rather than in an effect: when a breakpoint change
  // shrinks `pages`, a stored `page` past the new end would otherwise render one
  // frame out of range before an effect could correct it.
  const safePage = Math.min(page, pages - 1)

  useEffect(() => {
    if (!autoplay || !hasControls || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setPage((prev) => (Math.min(prev, pages - 1) + 1) % pages)
    }, autoplayMs)
    return () => window.clearInterval(id)
  }, [autoplay, hasControls, paused, pages, autoplayMs])

  // Step from the clamped index, not the raw one: after a breakpoint change
  // shrinks `pages`, a stale `page` past the end would otherwise send the first
  // arrow click somewhere unrelated to the slide on screen.
  const goPrev = () => setPage((prev) => (Math.min(prev, pages - 1) - 1 + pages) % pages)
  const goNext = () => setPage((prev) => (Math.min(prev, pages - 1) + 1) % pages)

  const trackStyle = {'--lyra-page': safePage} as CSSProperties

  const pauseHandlers = hasControls
    ? {
        onMouseEnter: () => setPaused(true),
        onMouseLeave: () => setPaused(false),
        onFocus: () => setPaused(true),
        onBlur: () => setPaused(false),
        onTouchStart: () => setPaused(true),
        onTouchEnd: () => setPaused(false),
      }
    : {}

  return (
    <div
      className="lyraAccreditations-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Accreditations"
      data-per-view={itemsPerView}
      style={{'--lyra-per-view': itemsPerView} as CSSProperties}
      {...pauseHandlers}
    >
      <div className="lyraAccreditations-carousel-track" style={trackStyle} aria-live="off">
        {items.map((item, index) => (
          <AccreditationItem key={item.id + index} item={item} settings={settings} />
        ))}
      </div>

      {hasControls && showArrows && (
        <>
          <button
            type="button"
            className="lyraAccreditations-carousel-arrow lyraAccreditations-carousel-arrow--prev"
            aria-label="Previous accreditations"
            onClick={goPrev}
          />
          <button
            type="button"
            className="lyraAccreditations-carousel-arrow lyraAccreditations-carousel-arrow--next"
            aria-label="Next accreditations"
            onClick={goNext}
          />
        </>
      )}

      {hasControls && showDots && (
        <div className="lyraAccreditations-carousel-dots">
          {Array.from({length: pages}).map((_, index) => (
            <button
              key={index}
              type="button"
              className={classNames('lyraAccreditations-carousel-dot', {
                'is-active': index === safePage,
              })}
              aria-label={`Go to page ${index + 1}`}
              aria-current={index === safePage}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
