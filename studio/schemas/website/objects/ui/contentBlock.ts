import {defineField, defineType} from 'sanity'

export const contentBlock = defineType({
  name: 'contentBlock',
  type: 'object',
  title: 'Content Block',
  description: 'Individual content block with headline and content',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the content block',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      description: 'Tagline of the content block (optional)',
    }),

    defineField({
      name: 'description',
      type: 'blockContentMini',
      title: 'Description',
      description: 'Main content of the content block',
    }),

    defineField({
      name: 'icon',
      type: 'imageIcon',
      title: 'Icon',
      description: 'Icon representing the content block',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'icon.image'},
    prepare({title, media}) {
      return {
        title,
        media,
        subtitle: 'Content Block',
      }
    },
  },
})
