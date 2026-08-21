import {defineType, defineField} from 'sanity'
import {cmmShowDesc} from '../../../fields/common/cmmShowDesc'
import {cmmShowTitle} from '../../../fields/common/cmmShowTitle'
import {brandColors} from '../../../../../consts/brand-colors'

export const cmmTtlDescSettings = defineType({
  name: 'cmmTtlDescSettings',
  type: 'object',
  title: 'Title & Description',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    cmmShowTitle,
    cmmShowDesc,

    defineField({
      name: 'shrinkTitle',
      type: 'boolean',
      title: 'Shrink Title & Description',
      description: 'Toggle to half width, leaving more space on the right.',
      initialValue: false,
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    defineField({
      name: 'titleTag',
      type: 'string',
      title: 'Title Tag',
      description: 'Select the HTML tag for the title to improve SEO and accessibility.',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2 (default)', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'h2',
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    defineField({
      name: 'textColor',
      title: 'Text Color',
      description: 'Color for the text (optional)',
      type: 'color',
      options: brandColors,
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      description: 'Color for accents (optional)',
      type: 'color',
      options: brandColors,
      hidden: ({parent}) => parent?.showTitle === false,
    }),
  ],
})
