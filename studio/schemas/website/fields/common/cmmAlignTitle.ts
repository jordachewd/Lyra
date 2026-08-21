import {defineField} from 'sanity'

export const cmmAlignTitle = defineField({
  name: 'alignTitle',
  type: 'string',
  title: 'Title & Description • Alignment',
  description: 'Alignment for the title and description of the section.',
  options: {
    list: [
      {title: 'Default (Left)', value: 'left'},
      {title: 'Center', value: 'center'},
      {title: 'Right', value: 'right'},
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  initialValue: 'left',
  hidden: ({parent}) => parent?.showTitle === false,
})
