import {defineField} from 'sanity'

export const cmmHideOnMobile = defineField({
  name: 'hideOnMobile',
  type: 'boolean',
  title: 'Hide on Mobile',
  description: 'Hide this element on mobile devices',
  initialValue: false,
})
