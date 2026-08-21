import {defineType, defineField} from 'sanity'

export const accordionItem = defineType({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Question / Term)',
      description: 'The question to be answered or term to be defined',
      type: 'string',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description (Answer / Definition)',
      description: 'The answer or definition for the accordion item',
      type: 'blockContentPlus',
      validation: (r) => r.required(),
    }),
  ],

  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title,
        subtitle: 'Accordion Item',
      }
    },
  },
})
