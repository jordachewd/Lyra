import {defineField, defineType} from 'sanity'
import {TagsIcon} from '@sanity/icons/Tags'

export const tagType = defineType({
  name: 'tag',
  type: 'document',
  title: 'Blog Tag',
  description: 'Blog tag for classifying posts',
  icon: TagsIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the tag',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL slug for the tag',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'description',
      type: 'blockContentExcerpt',
      title: 'Description',
      description: 'A short description of the tag. (Optional)',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title, subtitle: 'Blog Tag'}
    },
  },
})
