import {defineField} from 'sanity'
import {FormInputTypes} from '../../types/formInputTypes'

export const formFieldRadioSelect = defineField({
  name: 'options',
  type: 'array',
  title: 'Options',
  description: 'List of options for select or radio fields',
  of: [{type: 'string'}],
  hidden: ({parent}: {parent?: FormInputTypes}) =>
    parent?.type !== 'select' && parent?.type !== 'radio',
  validation: (Rule) =>
    Rule.custom<string[]>((arr, ctx) => {
      const t = (ctx.parent as FormInputTypes | undefined)?.type
      if (t !== 'select' && t !== 'radio') return true
      if (!arr || arr.length < 1) return 'Provide at least one option'
      if (arr.some((s) => typeof s !== 'string' || !s.trim())) {
        return 'Options must be non-empty strings'
      }
      const trimmed = arr.map((s) => s.trim().toLowerCase())
      const unique = new Set(trimmed)
      if (unique.size !== trimmed.length) return 'Options must be unique (case-insensitive)'
      return true
    }).max(10),
})
