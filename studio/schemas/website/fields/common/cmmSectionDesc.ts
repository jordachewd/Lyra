import {defineField} from 'sanity'

export const cmmSectionDescription = defineField({
  name: 'description',
  type: 'blockContentMedi',
  title: 'Description (Optional)',
  description: 'Short description for the section',
})
