import {defineType, defineField} from 'sanity'
import {cmmBgColor} from '../../fields/common/cmmBgColor'
import {cmmTextColor} from '../../fields/common/cmmTextColor'

export const solutionCard = defineType({
  name: 'solutionCard',
  title: 'Solution Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the solution card',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'content',
      type: 'blockContentMini',
      title: 'Main Content',
      description: 'Main content area for the solution card',
    }),

    defineField({
      name: 'image',
      type: 'imageNoMeta',
      title: 'Hero Image',
      description: 'Image to display alongside the solutions in this card',
    }),

    defineField({
      name: 'items',
      type: 'array',
      title: 'Features',
      description: 'List of features to highlight in this card',
      of: [{type: 'solutionItem'}],
    }),

    defineField({
      name: 'footer',
      type: 'cardFooter',
      title: 'Footer',
      description: 'Footer section with a call to action button',
    }),

    cmmTextColor,
    cmmBgColor,

    defineField({
      name: 'rounded',
      type: 'boolean',
      description: 'Whether the card should have rounded corners or not',
      title: 'Rounded Corners',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image.image'},
    prepare({title, media}) {
      return {title, media, subtitle: 'Solution Card'}
    },
  },
})
