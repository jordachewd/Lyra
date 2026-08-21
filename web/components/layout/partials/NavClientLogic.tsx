'use client'

import {useEffect, useCallback, useRef} from 'react'
import {usePathname} from 'next/navigation'

export default function NavClientLogic() {
  const pathname = usePathname()

  const menuOpenerRef = useRef<HTMLElement | null>(null)

  const uncheckAll = useCallback((root: HTMLElement) => {
    const boxes = root.querySelectorAll<HTMLInputElement>(
      'input.submenu-toggle, input.child-toggle, #mobile-nav-toggle',
    )
    boxes.forEach((el) => {
      if (el.checked) el.checked = false
    })

    const mainToggle = root.querySelector('#mobile-nav-toggle') as HTMLInputElement | null
    mainToggle?.dispatchEvent(new Event('change', {bubbles: true}))
  }, [])

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.lyraHeader')
    if (!root) return

    const handleMenuOpen = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (
        target.checked &&
        (target.classList.contains('submenu-toggle') || target.classList.contains('child-toggle'))
      ) {
        const label = root.querySelector<HTMLElement>(`label[for="${target.id}"]`)
        if (label) {
          menuOpenerRef.current = label
        }
      }
    }

    root.addEventListener('change', handleMenuOpen)
    return () => root.removeEventListener('change', handleMenuOpen)
  }, [])

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.lyraHeader')
    if (!root) return

    uncheckAll(root)
  }, [pathname, uncheckAll])

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.lyraHeader')
    if (!root) return

    const closeMenus = () => {
      uncheckAll(root)
      ;(document.activeElement as HTMLElement | null)?.blur?.()
    }

    const onClickInside = (e: MouseEvent) => {
      const target = e.target as Element | null
      const link = target?.closest<HTMLAnchorElement>('a[data-close="menu"]')
      if (link && root.contains(link)) closeMenus()
    }

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return

      if (root.contains(target)) return

      const hasOpenMenu = root.querySelector<HTMLInputElement>(
        'input.submenu-toggle:checked, input.child-toggle:checked',
      )

      if (hasOpenMenu) {
        closeMenus()
      }
    }

    const onPopState = () => {
      closeMenus()
    }

    root.addEventListener('click', onClickInside)
    document.addEventListener('click', onClickOutside)
    window.addEventListener('hashchange', closeMenus)
    window.addEventListener('popstate', onPopState)

    return () => {
      root.removeEventListener('click', onClickInside)
      document.removeEventListener('click', onClickOutside)
      window.removeEventListener('hashchange', closeMenus)
      window.removeEventListener('popstate', onPopState)
    }
  }, [uncheckAll])

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.lyraHeader')
    if (!root) return

    const toggle = document.getElementById('mobile-nav-toggle') as HTMLInputElement | null
    const menu = document.getElementById('nav-menu')

    const syncMobileNav = () => {
      if (!toggle) return

      const isOpen = toggle.checked

      if (menu) {
        menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true')
      }
    }

    const syncSubmenus = () => {
      const submenuToggles = root.querySelectorAll<HTMLInputElement>('input.submenu-toggle')
      submenuToggles.forEach((subToggle) => {
        const menuList = subToggle.parentElement?.querySelector('.menu-list')
        if (menuList) {
          menuList.setAttribute('aria-hidden', subToggle.checked ? 'false' : 'true')
        }
      })
    }

    const syncAll = () => {
      syncMobileNav()
      syncSubmenus()
    }

    syncAll()

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (
        target.id === 'mobile-nav-toggle' ||
        target.classList.contains('submenu-toggle') ||
        target.classList.contains('child-toggle')
      ) {
        // Mobile accordion: opening one top-level item closes any other open one.
        // Scoped to top-level submenu-toggles (direct children of a .menu-item) so
        // desktop hover/:focus-within behavior and nested toggles are untouched.
        const isMobile = window.matchMedia('(max-width: 63.9375em)').matches
        if (
          isMobile &&
          target.checked &&
          target.classList.contains('submenu-toggle') &&
          target.parentElement?.classList.contains('menu-item')
        ) {
          const topToggles = root.querySelectorAll<HTMLInputElement>(
            '.lyraMainNav-menu > .menu-item > input.submenu-toggle',
          )
          topToggles.forEach((other) => {
            if (other !== target && other.checked) other.checked = false
          })
        }

        syncAll()
      }
    }

    root.addEventListener('change', handleChange)
    return () => root.removeEventListener('change', handleChange)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const root = document.querySelector<HTMLElement>('.lyraHeader')
      if (!root) return

      const target = e.target as HTMLElement
      const isInHeader = root.contains(target)

      if (e.key === 'Escape' && isInHeader) {
        e.preventDefault()
        uncheckAll(root)

        const isMobile = window.innerWidth < 1024
        if (isMobile) {
          const hamburger = root.querySelector<HTMLElement>('.hamburger')
          hamburger?.focus()
        } else {
          const opener = menuOpenerRef.current
          if (opener && root.contains(opener)) {
            opener.focus()
          } else {
            const firstMenuItem = root.querySelector<HTMLElement>(
              '.lyraMainNav-menu > .menu-item .top-link, .lyraMainNav-menu > .menu-item .top-label',
            )
            firstMenuItem?.focus()
          }
        }

        menuOpenerRef.current = null
        return
      }

      const arrowKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']

      if (arrowKeys.includes(e.key) && isInHeader) {
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href]:not([tabindex="-1"]), button:not([disabled]), label[tabindex="0"], [tabindex="0"]:not([tabindex="-1"])',
          ),
        ).filter((el) => {
          if (el.offsetParent === null) return false

          const inMenuList = el.closest('.menu-list, .grandchild-list')
          if (!inMenuList) return true

          const styles = window.getComputedStyle(inMenuList)
          return styles.visibility !== 'hidden' && styles.opacity !== '0'
        })

        const currentIndex = focusable.indexOf(target)
        if (currentIndex === -1) return

        let nextIndex = currentIndex

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % focusable.length
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + focusable.length) % focusable.length
        }

        if (nextIndex !== currentIndex) {
          e.preventDefault()
          focusable[nextIndex]?.focus()
        }
      }
    },
    [uncheckAll],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const toggle = document.getElementById('mobile-nav-toggle') as HTMLInputElement | null

    let resizeTimeout: ReturnType<typeof setTimeout>

    const syncInert = () => {
      const isOpen = toggle?.checked ?? false
      const isMobile = window.matchMedia('(max-width: 63.9375em)').matches // < 1024px, matches $mq-nav

      const main = document.querySelector('main.lyraMain')
      const footer = document.querySelector('footer.lyraFooter')

      if (isMobile && isOpen) {
        main?.setAttribute('inert', '')
        footer?.setAttribute('inert', '')
        // Lock body scroll so the page behind the open mobile nav cannot move.
        // Header is position:fixed, so hiding overflow causes no layout shift.
        document.documentElement.style.overflow = 'hidden'
      } else {
        main?.removeAttribute('inert')
        footer?.removeAttribute('inert')
        document.documentElement.style.overflow = ''
      }
    }

    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(syncInert, 100)
    }

    syncInert()
    toggle?.addEventListener('change', syncInert)
    window.addEventListener('resize', debouncedResize)

    return () => {
      toggle?.removeEventListener('change', syncInert)
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimeout)
      // Never leave the page scroll-locked if this component unmounts while open.
      document.documentElement.style.overflow = ''
    }
  }, [])

  return null
}
