'use client'

import {useState, useEffect, useCallback} from 'react'

type MobileNavBtnProps = {
  className?: string
}

export default function MobileNavBtn({className}: MobileNavBtnProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleMenu = useCallback(() => {
    const checkbox = document.getElementById('mobile-nav-toggle') as HTMLInputElement | null

    if (checkbox) {
      checkbox.checked = !checkbox.checked
      checkbox.dispatchEvent(new Event('change', {bubbles: true}))
    }
  }, [])

  useEffect(() => {
    const checkbox = document.getElementById('mobile-nav-toggle') as HTMLInputElement | null

    if (!checkbox) return

    const handleChange = () => {
      setIsExpanded(checkbox.checked)
    }

    setIsExpanded(checkbox.checked)

    checkbox.addEventListener('change', handleChange)
    return () => checkbox.removeEventListener('change', handleChange)
  }, [])

  return (
    <label
      className={className ? `hamburger ${className}` : 'hamburger'}
      htmlFor="mobile-nav-toggle"
      aria-label="Toggle mobile navigation"
      aria-controls="nav-menu"
      aria-expanded={isExpanded}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleMenu()
        }
      }}
    >
      <span />
      <span />
      <span />
    </label>
  )
}
