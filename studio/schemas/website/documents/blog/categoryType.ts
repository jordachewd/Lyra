import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons/Folder'

export const categoryType = defineType({
  name: 'category',
  type: 'document',
  title: 'Blog Category',
  description: 'A category for grouping blog posts.',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the category',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL slug for the category',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'description',
      type: 'blockContentExcerpt',
      title: 'Description',
      description: 'A short description of the category. (Optional)',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title, subtitle: 'Blog Category'}
    },
  },
})
