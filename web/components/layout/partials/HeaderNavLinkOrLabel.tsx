'use client'

import RenderImage from '@/components/ui/RenderImage'
import {AnyImageField} from '@/lib/images/types'
import {MenuItem} from '@/lib/zod/sections/layout/menu'
import Link from 'next/link'
import {KeyboardEvent} from 'react'

type LinkOrLabelProps = {
  node: MenuItem
  htmlFor?: string
  className: string
  icon?: AnyImageField
  desc?: string | null
  showStaticDetails?: boolean
}

export default function HeaderNavLinkOrLabel({
  node,
  htmlFor,
  className,
  icon,
  desc,
  showStaticDetails = false,
}: LinkOrLabelProps) {
  const navIcon = icon ?? null
  const hasChildren = node.children && node.children.length > 0
  const hasAlt = navIcon && 'alt' in navIcon && navIcon.alt
  const navIconAlt = hasAlt ? navIcon.alt : node.label
  const newTabTarget = {target: '_blank', rel: 'noopener noreferrer'}

  const handleLabelKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      const forId = e.currentTarget.getAttribute('for')
      if (forId) {
        const checkbox = document.getElementById(forId) as HTMLInputElement | null
        if (checkbox) {
          checkbox.checked = !checkbox.checked
          checkbox.dispatchEvent(new Event('change', {bubbles: true}))
        }
      }
    }
  }

  if (node.href && hasChildren && htmlFor) {
    return (
      <>
        <Link
          href={node.href}
          data-close="menu"
          className={className}
          {...(node.newTab ? newTabTarget : {})}
        >
          {navIcon && (
            <span className={`${className}-icon`}>
              <RenderImage
                image={navIcon}
                alt={navIconAlt || node.label}
                displayWidth={20}
                mobileWidth={20}
              />
            </span>
          )}

          <div className={`${className}-header`}>
            <span className={`${className}-node`}>{node.label}</span>
            {desc && <div className={`${className}-desc`}>{desc}</div>}
          </div>
        </Link>

        <label
          className={`${className}-toggle`}
          htmlFor={htmlFor}
          tabIndex={0}
          role="button"
          aria-haspopup="menu"
          aria-label={`Toggle ${node.label} submenu`}
          onKeyDown={handleLabelKeyDown}
        >
          <span className="chev" aria-hidden="true">
            <span />
          </span>
        </label>
      </>
    )
  }

  if (node.href) {
    return (
      <Link
        href={node.href}
        data-close="menu"
        className={className}
        {...(node.newTab ? newTabTarget : {})}
      >
        {navIcon && (
          <span className={`${className}-icon`}>
            <RenderImage
              image={navIcon}
              alt={navIconAlt || node.label}
              displayWidth={20}
              mobileWidth={20}
            />
          </span>
        )}

        <div className={`${className}-header`}>
          <span className={`${className}-node`}>{node.label}</span>
          {desc && <div className={`${className}-desc`}>{desc}</div>}
        </div>
      </Link>
    )
  }

  if (htmlFor) {
    return (
      <label
        className={className}
        htmlFor={htmlFor}
        tabIndex={0}
        role="button"
        aria-haspopup="menu"
        aria-label={`Open ${node.label} menu`}
        onKeyDown={handleLabelKeyDown}
      >
        {navIcon && (
          <span className={`${className}-icon`}>
            <RenderImage
              image={navIcon}
              alt={navIconAlt || node.label}
              displayWidth={20}
              mobileWidth={20}
            />
          </span>
        )}

        <div className={`${className}-header`}>
          <span className={`${className}-node`}>{node.label}</span>
          {desc && <div className={`${className}-desc`}>{desc}</div>}
        </div>

        {hasChildren && (
          <span className="chev" aria-hidden="true">
            <span />
          </span>
        )}
      </label>
    )
  }

  if (showStaticDetails) {
    return (
      <div className={className}>
        {navIcon && (
          <span className={`${className}-icon`}>
            <RenderImage
              image={navIcon}
              alt={navIconAlt || node.label}
              displayWidth={20}
              mobileWidth={20}
            />
          </span>
        )}

        <div className={`${className}-header`}>
          <span className={`${className}-node`}>{node.label}</span>
          {desc && <div className={`${className}-desc`}>{desc}</div>}
        </div>
      </div>
    )
  }

  return <span className={className}>{node.label}</span>
}
