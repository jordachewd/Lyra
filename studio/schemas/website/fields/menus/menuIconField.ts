import {defineField} from 'sanity'

export const menuIconField = defineField({
  name: 'icon',
  type: 'imageIcon',
  title: 'Icon',
  description: 'Optional icon for the menu item',
})
