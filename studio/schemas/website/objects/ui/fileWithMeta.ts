import {defineType, defineField} from 'sanity'

export const fileWithMeta = defineType({
  name: 'fileWithMeta',
  title: 'File',
  type: 'object',
  fields: [
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (r) => r.required(),
    }),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
  ],
  preview: {
    select: {title: 'title', media: 'asset', subtitle: 'description'},
    prepare({title, media, subtitle}) {
      return {title: title || 'File', media, subtitle}
    },
  },
})
