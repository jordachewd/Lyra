import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'

export const authorType = defineType({
  name: 'author',
  type: 'document',
  title: 'Blog Author',
  description: 'Blog author details',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Name of the author',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL slug for the author',
      options: {source: 'name'},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'image',
      type: 'imageIcon',
      title: 'Photo',
      description: 'Image of the author. (Optional)',
    }),

    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: 'Role or position of the author. (Optional)',
    }),

    defineField({
      name: 'bio',
      type: 'blockContentExcerpt',
      title: 'Bio',
      description: 'A short biography of the author. (Optional)',
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image.image'},
    prepare({title, media}) {
      return {title, media, subtitle: 'Blog Author'}
    },
  },
})
