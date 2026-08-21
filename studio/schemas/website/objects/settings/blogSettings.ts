import {defineType, defineField} from 'sanity'

export const blogSettings = defineType({
  name: 'blogSettings',
  type: 'object',
  title: 'Blog List Settings',
  description: 'Settings for the blog listing page.',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'showExcerpt',
      type: 'boolean',
      title: 'Show Post Excerpts',
      description: 'Enable to display post excerpts on listing pages.',
      initialValue: true,
    }),

    defineField({
      name: 'excerptLength',
      type: 'number',
      title: 'Excerpt Length',
      description: 'Maximum number of characters to show for excerpts or some descriptions.',
      initialValue: 360,
      hidden: ({parent}) => !parent?.showExcerpt,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          if (typeof val !== 'number') return 'Required when "Show Post Excerpts" is enabled.'
          if (!Number.isInteger(val) || val <= 0) return 'Must be a positive integer.'
          if (val < 50 || val > 1000) return 'Must be between 50 and 1000.'
          return true
        }),
    }),

    defineField({
      name: 'perPage',
      type: 'number',
      title: 'Posts Per Page',
      description: 'Maximum number of posts per paginated blog page.',
      initialValue: 9,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .min(3)
          .max(30)
          .error('Must be a positive integer between 3 and 30.'),
    }),

    defineField({
      name: 'filterBy',
      type: 'string',
      title: 'Filter Posts by',
      description: 'Choose how to filter posts on the blog listing page.',
      options: {
        list: [
          {title: 'Tags (default)', value: 'tags'},
          {title: 'Categories', value: 'categories'},
          {title: 'None', value: 'none'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'tags',
    }),

    defineField({
      name: 'showCats',
      type: 'boolean',
      title: 'Show Categories',
      description: 'Toggle to display the categories on the page',
      initialValue: true,
    }),

    defineField({
      name: 'showTags',
      type: 'boolean',
      title: 'Show Tags',
      description: 'Toggle to display the tags on the page',
      initialValue: true,
    }),

    defineField({
      name: 'showAuthor',
      type: 'boolean',
      title: 'Show Author(s)',
      description: 'Toggle to display the author(s) on the page',
      initialValue: true,
    }),

    defineField({
      name: 'showDate',
      type: 'boolean',
      title: 'Show Date',
      description: 'Toggle to display the publication date on the page',
      initialValue: true,
    }),
  ],
})
