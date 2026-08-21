import {defineField} from 'sanity'
import {brandColors} from '../../../../consts/brand-colors'

export const cmmTextColor = defineField({
  name: 'textColor',
  title: 'Text Color',
  description: 'Color for the text (optional)',
  type: 'color',
  options: brandColors,
})
