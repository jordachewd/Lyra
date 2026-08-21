import {defineField} from 'sanity'

export const menuDescField = defineField({
  name: 'description',
  type: 'string',
  title: 'Description',
  description: 'A short description for the menu item (optional)',
})
