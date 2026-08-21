'use client'

import {useCallback, useSyncExternalStore} from 'react'

type MobileNavBtnProps = {
  className?: string
}

const getCheckbox = () => document.getElementById('mobile-nav-toggle') as HTMLInputElement | null

// The open/closed state lives on an uncontrolled checkbox driven by CSS, so it
// is external to React. useSyncExternalStore subscribes to it without the
// mount-time setState that `react-hooks/set-state-in-effect` (correctly) flags.
function subscribe(onStoreChange: () => void) {
  const checkbox = getCheckbox()
  if (!checkbox) return () => {}

  checkbox.addEventListener('change', onStoreChange)
  return () => checkbox.removeEventListener('change', onStoreChange)
}

const getSnapshot = () => getCheckbox()?.checked ?? false
const getServerSnapshot = () => false

export default function MobileNavBtn({className}: MobileNavBtnProps) {
  const isExpanded = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleMenu = useCallback(() => {
    const checkbox = getCheckbox()

    if (checkbox) {
      checkbox.checked = !checkbox.checked
      checkbox.dispatchEvent(new Event('change', {bubbles: true}))
    }
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
