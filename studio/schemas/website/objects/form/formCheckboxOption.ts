import {defineField, defineType} from 'sanity'

export const formCheckboxOption = defineType({
  name: 'formCheckboxOption',
  type: 'object',
  title: 'Field Option',
  description: 'Option for checkbox fields',
  fields: [
    defineField({
      name: 'label',
      type: 'blockContentMini',
      title: 'Label',
      description: 'Label for this checkbox option',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'value',
      type: 'string',
      title: 'Value',
      description: 'Value for this option. Used in form submissions. Must be unique.',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'required',
      type: 'boolean',
      title: 'Required',
      description: 'Is selecting this option required?',
      initialValue: false,
    }),

    defineField({
      name: 'checked',
      type: 'boolean',
      title: 'Checked',
      description: 'Is this option checked by default?',
      initialValue: false,
    }),
  ],

  preview: {
    select: {title: 'value'},
    prepare({title}) {
      return {
        title,
        subtitle: 'Checkbox Option',
      }
    },
  },
})
