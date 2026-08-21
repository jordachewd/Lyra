import {defineField} from 'sanity'

export const menuTitleField = defineField({
  name: 'title',
  type: 'string',
  title: 'Title',
  description: 'The title of the menu item',
  validation: (r) => r.required(),
})
