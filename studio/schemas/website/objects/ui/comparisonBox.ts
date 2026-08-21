import {defineField, defineType} from 'sanity'
import {cmmBgColor} from '../../fields/common/cmmBgColor'
import {cmmTextColor} from '../../fields/common/cmmTextColor'

export const comparisonBox = defineType({
  name: 'comparisonBox',
  type: 'object',
  title: 'Comparison Box',
  description: 'A box within a comparison item to highlight specific features or details',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the comparison box',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'description',
      type: 'blockContentMini',
      title: 'Description (optional)',
      description: 'Brief description of the comparison box',
    }),

    cmmTextColor,
    cmmBgColor,
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title, subtitle: 'Comparison Box'}
    },
  },
})
