import {defineField} from 'sanity'

export const cmmSectionName = defineField({
  name: 'sectionName',
  type: 'string',
  title: 'Usage (Internal)',
  description: 'Target where you\'ll use this section (e.g: "[PAGE/POST] Page / Post name").',
  validation: (r) => r.required(),
})
