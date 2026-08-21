import {defineField} from 'sanity'

export const cmmShowTitle = defineField({
  name: 'showTitle',
  type: 'boolean',
  title: 'Show Title & Description',
  description: 'Toggle to show or hide the top title (headline) and description',
  initialValue: true,
})
