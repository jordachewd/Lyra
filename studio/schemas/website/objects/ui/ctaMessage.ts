import {defineField, defineType} from 'sanity'
import {FeedbackIcon} from '@sanity/icons/Feedback'
import {menuPageRefField} from '../../fields/menus/menuPageRefField'
import {menuHrefField} from '../../fields/menus/menuHrefField'
import {menuNewTabField} from '../../fields/menus/menuNewTabField'

export const ctaMessage = defineType({
  name: 'ctaMessage',
  type: 'object',
  title: 'CTA Message',
  description: 'Call to action message with an optional icon',
  fields: [
    defineField({
      name: 'info',
      type: 'string',
      title: 'Title',
      description: 'Short message to encourage users to take action',
      placeholder: 'Want to know more?',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Tag Line',
      description: 'Even shorter message to encourage users to take action',
      placeholder: 'Let us give you a demo.',
    }),

    defineField({
      name: 'icon',
      type: 'imageIcon',
      description: 'Icon to display alongside the message',
      title: 'Icon',
    }),

    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      description: 'Choose the type of link for this menu item',
      options: {
        list: [
          {title: 'No link', value: 'none'},
          {title: 'Internal page', value: 'internal'},
          {title: 'Custom link', value: 'custom'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    }),

    menuPageRefField,
    menuHrefField,
    menuNewTabField,
  ],
  preview: {
    select: {title: 'info'},
    prepare({title}) {
      return {title, media: FeedbackIcon, subtitle: 'CTA Message'}
    },
  },
})
