import {defineType, defineField} from 'sanity'

export const aboutInfoCard = defineType({
  name: 'aboutInfoCard',
  type: 'object',
  title: 'Collapsible Card',
  description: 'A card that can be expanded or collapsed to show more information',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title for the collapsible card',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'icon',
      type: 'imageIcon',
      title: 'Icon',
      description: 'Icon to represent the card',
    }),

    defineField({
      name: 'content',
      type: 'blockContentMini',
      title: 'Content',
      description: 'Detailed content for the card',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'icon.image'},
    prepare({title, media}) {
      return {title, media, subtitle: 'Collapsible Card'}
    },
  },
})
