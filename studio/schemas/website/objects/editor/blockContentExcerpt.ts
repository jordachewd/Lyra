import {defineType, defineArrayMember} from 'sanity'
import {validateExcerptLength} from '../../../../utils/validate-excerpt-length'

export const blockContentExcerpt = defineType({
  name: 'blockContentExcerpt',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: [],
      },
    }),
  ],
  validation: (Rule) => Rule.custom(async (value, ctx) => await validateExcerptLength(value, ctx)),
})
