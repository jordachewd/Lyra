import {defineField} from 'sanity'

export const menuLinkTypeField = defineField({
  name: 'linkType',
  type: 'string',
  title: 'Link Type',
  description: 'Choose the type of link for this menu item',
  options: {
    list: [
      {title: 'Internal page', value: 'internal'},
      {title: 'Custom link', value: 'custom'},
      {title: 'No link', value: 'none'},
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  initialValue: 'internal',
})
