import {defineType, defineField} from 'sanity'

export const solutionItem = defineType({
  name: 'solutionItem',
  title: 'Solution Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Name of the solution item',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'Short description of the solution item',
    }),

    defineField({
      name: 'tag',
      type: 'string',
      title: 'Badge / Tag',
      description: 'E.g. "ACCESS POINT" or "SMP"',
    }),

    defineField({
      name: 'features',
      type: 'blockContentMedi',
      title: '"Show All" Features/Benefits',
      description: 'List of features/benefits of the solution item',
    }),
  ],
  preview: {
    select: {title: 'title', tag: 'tag'},
    prepare({title, tag}) {
      const subtitle = tag ? `Solution Item | ${tag}` : 'Solution Item'
      return {title, subtitle: subtitle}
    },
  },
})
