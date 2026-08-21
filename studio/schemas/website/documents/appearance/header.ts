import {HomeIcon} from '@sanity/icons/Home'
import {defineType, defineField} from 'sanity'

export const siteHeader = defineType({
  name: 'siteHeader',
  type: 'document',
  icon: HomeIcon,
  title: 'Header',
  fields: [
    defineField({
      name: 'headerLogo',
      type: 'imageIcon',
      title: 'Logo',
      description: 'Upload a logo to display in the header. Recommended dimensions: 168x36 pixels.',
    }),

    defineField({
      name: 'aboveMenu',
      type: 'array',
      title: 'Above Header',
      description:
        'Add items to display above the navigation menu, such as contact info or social media links.',
      of: [{type: 'aboveMenuItem'}],
      options: {sortable: true},
      validation: (r) => r.max(3).error('Maximum of 3 items are allowed'),
    }),

    defineField({
      name: 'headerMenu',
      type: 'reference',
      title: 'Navigation Menu',
      description: 'Select a navigation menu to display in the header.',
      to: [{type: 'menu'}],
      options: {disableNew: true},
    }),

    defineField({
      name: 'menuType',
      type: 'string',
      title: 'Menu Type',
      description: 'Choose how to display the navigation menu.',
      options: {
        list: [
          {title: 'Dropdown (default)', value: 'dropdown'},
          {title: 'Mega Menu', value: 'megamenu'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'dropdown',
    }),

    defineField({
      name: 'headerButtons',
      type: 'array',
      title: 'CTA Buttons',
      description: 'Add, remove, and reorder call-to-action buttons to display in the header.',
      of: [{type: 'ctaButton'}],
      validation: (r) => r.max(2).error('Maximum of 2 buttons are allowed'),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Header'}
    },
  },
})
