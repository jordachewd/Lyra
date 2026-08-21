import {defineType} from 'sanity'

export const cardFooter = defineType({
  name: 'cardFooter',
  type: 'array',
  of: [{type: 'ctaMessage'}, {type: 'ctaButton'}],
  validation: (r) => r.max(2).error('Maximum of 2 items are allowed'),
})
