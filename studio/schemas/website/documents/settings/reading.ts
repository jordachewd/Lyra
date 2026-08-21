import {defineType, defineField} from 'sanity'

export const readingSettings = defineType({
  name: 'readingSettings',
  type: 'document',
  fields: [
    defineField({
      name: 'homePage',
      type: 'reference',
      title: 'Home Page • Content',
      to: [{type: 'page'}],
      options: {disableNew: true, filter: '!defined(archivedAt) && !(_id in path("drafts.**"))'},
      description: 'Select a page to be the homepage of the website.',
      validation: (Rule) => Rule.required().error('Homepage is required.'),
    }),

    defineField({
      name: 'blogPage',
      type: 'reference',
      title: 'Blog Page • Content',
      to: [{type: 'page'}],
      options: {disableNew: true, filter: '!defined(archivedAt) && !(_id in path("drafts.**"))'},
      description: 'Select a page to be the blog page of the website.',
      validation: (Rule) => Rule.required().error('Blog page is required.'),
    }),

    defineField({
      name: 'blogSettings',
      type: 'blogSettings',
      title: 'Blog Page • Settings',
    }),

    defineField({
      name: 'webinars',
      type: 'webinars',
      title: 'Webinars • Content & Settings',
      validation: (Rule) =>
        Rule.custom((val: {page?: {_ref?: string}} | undefined) => {
          if (!val?.page?._ref) return 'Webinars page is required.'
          return true
        }),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Reading Settings'}
    },
  },
})
