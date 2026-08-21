import {defineField, defineType} from 'sanity'

export const comparisonItem = defineType({
  name: 'comparisonItem',
  type: 'object',
  title: 'Comparison Item',
  description: 'An item to be compared in the comparison section',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title for the comparison item. E.g., "Basic", "Pro", "Enterprise"',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'boxes',
      type: 'array',
      title: 'Comparison Boxes',
      description: 'Add up to 2 comparison boxes to highlight features or details',
      of: [{type: 'comparisonBox'}],
      validation: (r) => r.max(2).error('Maximum of 2 items allowed'),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title, subtitle: 'Comparison Item'}
    },
  },
})
