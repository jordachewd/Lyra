'use client'

import {memo} from 'react'

type ConsentCategoryProps = {
  title: string
  description: string
  checked?: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}

function ConsentCategory({title, description, checked, disabled, onChange}: ConsentCategoryProps) {
  return (
    <div className="consent__row">
      <div className="consent__row-text">
        <div className="consent__row-title">{title}</div>
        <div className="consent__row-desc">{description}</div>
      </div>
      <label className="switch">
        <input
          type="checkbox"
          checked={!!checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="slider" />
      </label>
    </div>
  )
}

export default memo(ConsentCategory)
