import {defineField} from 'sanity'

export const formFieldType = defineField({
  name: 'type',
  type: 'string',
  title: 'Type',
  description: 'Type of form input field',
  initialValue: 'text',
  options: {
    list: [
      {title: 'Checkbox', value: 'checkbox'},
      {title: 'Email', value: 'email'},
      {title: 'Radio', value: 'radio'},
      {title: 'Tel (Phone No.)', value: 'tel'},
      {title: 'Text', value: 'text'},
      {title: 'Textarea', value: 'textarea'},
      {title: 'Select', value: 'select'},
    ],
    layout: 'dropdown',
  },
})
