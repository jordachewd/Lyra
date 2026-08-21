import {defineField, defineType} from 'sanity'
import {cmmBgColor} from '../../fields/common/cmmBgColor'
import {brandColors} from '../../../../consts/brand-colors'

export const stepperItem = defineType({
  name: 'stepperItem',
  type: 'object',
  title: 'Stepper Item',
  description: 'Individual step in a stepper or process illustration',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'Short label or title for the step. E.g., "Step 1"',
    }),

    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the step',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'description',
      type: 'blockContentMini',
      title: 'Description (optional)',
      description: 'Short description of the step',
    }),

    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout',
      description: 'Choose how the step is displayed',
      options: {
        list: [
          {title: 'Card (Default)', value: 'card'},
          {title: 'Text', value: 'text'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'card',
    }),

    defineField({
      name: 'textColor',
      title: 'Title Color',
      description: 'Color for the title text (optional)',
      type: 'color',
      options: brandColors,
    }),

    defineField({
      name: 'descColor',
      title: 'Description Color',
      description: 'Color for the description text (optional)',
      type: 'color',
      options: brandColors,
    }),

    cmmBgColor,
  ],
  preview: {
    select: {title: 'title', label: 'label'},
    prepare({title, label}) {
      return {title, subtitle: `Stepper Item · ${label ? label : 'No label'}`}
    },
  },
})
