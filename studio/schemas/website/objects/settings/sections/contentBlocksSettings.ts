import {defineType, defineField} from 'sanity'
import {brandColors} from '../../../../../consts/brand-colors'
import {cmmBgColor} from '../../../fields/common/cmmBgColor'
import {cmmTextColor} from '../../../fields/common/cmmTextColor'

export const contentBlocksSettings = defineType({
  name: 'contentBlocksSettings',
  type: 'object',
  title: 'Content Blocks Section Settings',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Block Type',
      description: 'Choose block type',
      options: {
        list: [
          {title: 'Box (Default)', value: 'box'},
          {title: 'Card', value: 'card'},
          {title: 'Text Only', value: 'text'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'box',
    }),

    defineField({
      name: 'gap',
      type: 'string',
      title: 'Gap Between Blocks',
      description: 'Choose the distance between blocks',
      options: {
        list: [
          {title: 'Normal (Default)', value: 'normal'},
          {title: 'Medium', value: 'medium'},
          {title: 'Bigger', value: 'bigger'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'showIcon',
      title: 'Show Icons',
      description: 'Toggle to show or hide icons in the blocks',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'iconTitle',
      type: 'string',
      title: 'Icon & Title Alignment',
      description: 'Choose how to display the blocks title in relation to their icon',
      options: {
        list: [
          {title: 'Stacked (Default)', value: 'stacked'},
          {title: 'Inline', value: 'samerow'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'stacked',
      hidden: ({parent}) => parent?.showIcon === false,
    }),

    defineField({
      name: 'collapsible',
      title: 'Collapsible Blocks',
      description: 'Toggle to enable or disable collapsible blocks',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'perRow',
      type: 'number',
      title: 'Blocks Per Row',
      description: 'Number of blocks to display per row',
      initialValue: 3,
      options: {
        list: [
          {title: 'One per row', value: 1},
          {title: 'Two per row', value: 2},
          {title: 'Three per row (Default)', value: 3},
          {title: 'Four per row', value: 4},
        ],
        layout: 'dropdown',
      },
      validation: (r) => r.required().min(1).max(4),
    }),

    cmmTextColor,

    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      description: 'Color for accents (optional)',
      type: 'color',
      options: brandColors,
    }),

    cmmBgColor,

    defineField({
      name: 'iconBg',
      title: 'Icon Background Color',
      description: 'Color for the icon background (optional)',
      type: 'color',
      options: brandColors,
      hidden: ({parent}) => parent?.showIcon === false,
    }),
  ],
})
