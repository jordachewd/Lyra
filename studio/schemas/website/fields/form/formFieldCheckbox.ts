import {defineField} from 'sanity'
import type {FormInputTypes} from '../../types/formInputTypes'

export const formFieldCheckbox = defineField({
  name: 'cbxOptions',
  type: 'array',
  title: 'Options',
  description: 'Checkbox field options',
  of: [{type: 'formCheckboxOption'}],

  hidden: ({parent}: {parent?: FormInputTypes}) => parent?.type !== 'checkbox',

  validation: (Rule) =>
    Rule.max(10).custom((value, ctx) => {
      const parent = ctx.parent as FormInputTypes | undefined
      if (parent?.type !== 'checkbox') return true

      const arr = Array.isArray(value) ? value : []

      if (arr.length === 0) {
        return 'Add at least one checkbox option.'
      }

      const labels = arr.map((opt) => {
        const content = (opt as {label?: unknown}).label
        if (!Array.isArray(content) || content.length === 0) return ''
        const firstBlock = content[0] as {children?: Array<{text?: string}>}
        const firstChild = firstBlock?.children?.[0]
        return (firstChild?.text ?? '').trim()
      })

      if (labels.some((l) => !l)) {
        return 'Each option must have a label.'
      }

      const lowered = labels.map((l) => l.toLowerCase())
      const unique = new Set(lowered)
      if (unique.size !== lowered.length) {
        return 'Option labels must be unique (case-insensitive).'
      }

      return true
    }),
})
