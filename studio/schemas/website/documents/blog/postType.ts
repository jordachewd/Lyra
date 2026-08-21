import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {allSectionTypes} from '../../../../consts/website-section-types'
import {archivedAtField} from '../../fields/common/archivable'

export const postType = defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  description: 'Blog posts are the main content type for the blog section of the website.',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the post',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL slug for the post',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'image',
      type: 'imageWithMeta',
      title: 'Featured Image',
      description: 'Main image for the post (optional)',
    }),

    defineField({
      name: 'body',
      type: 'blockContentMaxi',
      title: 'Body',
      description: 'Main content of the post',
    }),

    defineField({
      name: 'excerpt',
      type: 'blockContentExcerpt',
      title: 'Excerpt (optional)',
      description: 'Short summary of the post.',
    }),

    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      description: 'Select categories for the post',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      validation: (r) => r.unique().error('Categories must be unique'),
    }),

    defineField({
      name: 'tag',
      type: 'array',
      title: 'Tags',
      description: 'Select tags for the post',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tag'}]})],
      validation: (r) => r.unique().error('Tags must be unique'),
    }),

    defineField({
      name: 'author',
      type: 'array',
      title: 'Author(s)',
      description: 'Select author(s) for the post',
      of: [defineArrayMember({type: 'reference', to: [{type: 'author'}]})],
      validation: (r) => r.unique().error('Authors must be unique'),
    }),

    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      description: 'Add, remove, and reorder sections on the bottom of the post',
      of: [
        defineArrayMember({
          name: 'sectionRef',
          type: 'reference',
          title: 'Add / Create Section',
          description: 'Select a section to add to the page',
          to: allSectionTypes,
        }),
      ],

      options: {sortable: true},
      validation: (r) => r.max(10).warning('Too many sections harms performance'),
    }),

    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Date and time when the post was published',
    }),

    defineField({
      name: 'settings',
      type: 'postSettings',
      title: 'Post Settings',
    }),

    defineField({
      name: 'seo',
      type: 'seoMeta',
      title: 'SEO & Metadata',
    }),

    archivedAtField,
  ],
  preview: {
    select: {title: 'title', media: 'image.image.asset'},
    prepare({title, media}) {
      return {title, media, subtitle: 'Blog post'}
    },
  },
})
