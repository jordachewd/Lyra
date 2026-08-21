import {defineField} from 'sanity'

export const archivedAtField = defineField({
  name: 'archivedAt',
  title: 'Archived at',
  type: 'datetime',
  readOnly: true,
  hidden: true,
})
