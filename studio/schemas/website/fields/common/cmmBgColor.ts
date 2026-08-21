import {defineField} from 'sanity'
import {brandColors} from '../../../../consts/brand-colors'

export const cmmBgColor = defineField({
  name: 'background',
  title: 'Background Color',
  description: 'Color for the background (optional)',
  type: 'color',
  options: brandColors,
})
