import {defineType, defineField} from 'sanity'
import {MenuIcon} from '@sanity/icons/Menu'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Admin title (e.g. "Header Main Menu").',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      description: 'Unique reference slug.',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'children',
      type: 'array',
      title: 'Menu Items',
      description: 'Add, remove, and reorder menu items',
      of: [{type: 'menuItem'}],
      options: {sortable: true},
      validation: (r) => r.max(8),
    }),
  ],

  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'No title set',
        subtitle: 'Menu',
      }
    },
  },
})
