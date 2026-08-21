import {defineType, defineField} from 'sanity'
import {cmmTextColor} from '../../../fields/common/cmmTextColor'
import {brandColors} from '../../../../../consts/brand-colors'
import {cmmBgColor} from '../../../fields/common/cmmBgColor'

export const accordionSettings = defineType({
  name: 'accordionSettings',
  title: 'Accordion Setting',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'design',
      type: 'string',
      title: 'Design Style',
      description: 'Choose the design style for the accordion',
      options: {list: ['faq', 'glossary'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'faq',
    }),

    defineField({
      name: 'ordered',
      type: 'boolean',
      title: 'Alphabetical Ordered',
      description: 'Display accordion items in alphabetical order',
      initialValue: false,
    }),

    defineField({
      name: 'firstExpanded',
      type: 'boolean',
      title: 'First Item Expanded',
      description: 'Should the first item be expanded when the accordion loads?',
      initialValue: false,
    }),

    cmmTextColor,

    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      description: 'Color for accents (optional)',
      type: 'color',
      options: brandColors,
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    cmmBgColor,
  ],
})
