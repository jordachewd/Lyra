import {defineField} from 'sanity'

export const cmmShowDesc = defineField({
  name: 'showDesc',
  type: 'boolean',
  title: 'Show Description',
  description: 'Toggle to show or hide the top description',
  initialValue: true,
  hidden: ({parent}) => parent?.showTitle === false,
})
