import {defineType, defineField} from 'sanity'
import {menuHrefField} from '../../fields/menus/menuHrefField'
import {menuNewTabField} from '../../fields/menus/menuNewTabField'
import {menuPageRefField} from '../../fields/menus/menuPageRefField'
import {menuFileField} from '../../fields/menus/menuFileField'

export const linkField = defineType({
  name: 'linkField',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      description: 'Choose the type of link',
      options: {
        list: [
          {title: 'None (default)', value: 'none'},
          {title: 'Internal page', value: 'internal'},
          {title: 'File', value: 'file'},
          {title: 'Custom', value: 'custom'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    }),

    menuPageRefField,
    menuHrefField,
    menuFileField,
    menuNewTabField,
  ],
})
