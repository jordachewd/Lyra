'use client'

import {useEffect} from 'react'
import {usePathname, useSearchParams} from 'next/navigation'
import {trackPageView} from '@/lib/analytics/pageview'
import {getBodyClasses} from '@/lib/utils/common/get-body-classes'

let lastBodyClasses: string[] = []
let lastPVPath: string | null = null

export default function BodyClassManager() {
  const pathname = usePathname()
  const search = useSearchParams()

  useEffect(() => {
    const body = document.body
    const clsString = getBodyClasses(pathname ?? '/')
    const nextClasses = clsString.split(/\s+/).filter(Boolean)

    for (const c of lastBodyClasses) body.classList.remove(c)

    for (const c of nextClasses) if (!body.classList.contains(c)) body.classList.add(c)

    lastBodyClasses = nextClasses

    const q = search?.toString()
    const pagePath = `${pathname ?? '/'}${q ? `?${q}` : ''}`

    if (lastPVPath !== pagePath) {
      const pageTitle = document.title || 'Lyra'
      trackPageView(pageTitle, pagePath)
      lastPVPath = pagePath
    }

    return () => {
      for (const c of lastBodyClasses) body.classList.remove(c)
      lastBodyClasses = []
    }
  }, [pathname, search])

  return null
}
