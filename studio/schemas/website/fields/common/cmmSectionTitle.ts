import {defineField} from 'sanity'

export const cmmSectionTitle = defineField({
  name: 'title',
  type: 'string',
  title: 'Title (Heading)',
  description: 'Main heading for the section',
  validation: (r) => r.required(),
})
