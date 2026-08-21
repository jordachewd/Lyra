import {defineField, defineType} from 'sanity'
import {FormInputTypes} from '../../types/formInputTypes'
import {formFieldCheckbox} from '../../fields/form/formFieldCheckbox'
import {formFieldType} from '../../fields/form/formFieldType'
import {formFieldRadioSelect} from '../../fields/form/formFieldRadioSelect'

export const formInput = defineType({
  name: 'formInput',
  type: 'object',
  title: 'Form field',
  description: 'Individual form input field',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Label for the form input field',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'hubspotKey',
      type: 'string',
      title: 'HubSpot Key',
      description: 'The HubSpot property key for this form input field',
    }),

    defineField({
      name: 'info',
      type: 'string',
      title: 'Info',
      description: 'Additional information or help text for the form input field',
    }),

    formFieldType,
    formFieldRadioSelect,
    formFieldCheckbox,

    defineField({
      name: 'optLayout',
      type: 'string',
      title: 'Layout',
      description: 'Display options horizontally or vertically',
      options: {list: ['vertical', 'horizontal'], layout: 'radio', direction: 'horizontal'},
      hidden: ({parent}: {parent?: FormInputTypes}) =>
        parent?.type !== 'radio' && parent?.type !== 'checkbox',
      initialValue: 'vertical',
    }),

    defineField({
      name: 'placeholder',
      type: 'string',
      title: 'Placeholder',
      description: 'Placeholder text for the form input field',
      hidden: ({parent}: {parent?: FormInputTypes}) =>
        parent?.type === 'radio' || parent?.type === 'checkbox' || parent?.type === 'select',
    }),

    defineField({
      name: 'required',
      type: 'boolean',
      title: 'Required',
      description: 'Is this required?',
      initialValue: false,
      hidden: ({parent}: {parent?: FormInputTypes}) => parent?.type === 'checkbox',
    }),

    defineField({
      name: 'size',
      type: 'string',
      title: 'Field Size',
      description: 'Width size of the form field',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Half Width', value: 'half'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'full',
    }),
  ],
  preview: {
    select: {title: 'title', type: 'type', required: 'required'},
    prepare({title, type, required}) {
      return {
        title,
        subtitle: 'Form field  · ' + type + (required ? ' · required' : ''),
      }
    },
  },
})
