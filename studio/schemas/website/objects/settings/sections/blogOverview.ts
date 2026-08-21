import {defineType, defineField} from 'sanity'
import {maxFromReadingSettings} from '../../../../../utils/reading-settings'

export const blogOverviewSettings = defineType({
  name: 'blogOverviewSettings',
  type: 'object',
  title: 'Blog Overview Settings',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'limit',
      type: 'number',
      title: 'Number of posts',
      description: 'Number of blog posts to display',
      initialValue: 3,
      validation: (Rule) => Rule.required().custom(maxFromReadingSettings('perPage', 3)),
    }),

    defineField({
      name: 'showExcerpt',
      type: 'boolean',
      title: 'Show Excerpt',
      description: 'Toggle to display the excerpt on the post cards',
      initialValue: false,
    }),

    defineField({
      name: 'showCats',
      type: 'boolean',
      title: 'Show Categories',
      description: 'Toggle to display the categories on the post cards',
      initialValue: true,
    }),

    defineField({
      name: 'showTags',
      type: 'boolean',
      title: 'Show Tags',
      description: 'Toggle to display the tags on the post cards',
      initialValue: false,
    }),

    defineField({
      name: 'showAuthor',
      type: 'boolean',
      title: 'Show Author(s)',
      description: 'Toggle to display the author(s) on the post cards',
      initialValue: false,
    }),

    defineField({
      name: 'showDate',
      type: 'boolean',
      title: 'Show Date',
      description: 'Toggle to display the publication date on the post cards',
      initialValue: true,
    }),
  ],
})
