import {defineType, defineField} from 'sanity'

export const imageIcon = defineType({
  name: 'imageIcon',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image File',
      description: 'Choose an image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Useful for SEO and accessibility.',
      placeholder: 'Short description of the image',
    }),
  ],
  preview: {
    select: {media: 'image', title: 'alt'},
  },
})
