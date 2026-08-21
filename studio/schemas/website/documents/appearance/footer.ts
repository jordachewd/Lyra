import {ComposeIcon} from '@sanity/icons/Compose'
import {defineType, defineField} from 'sanity'
import {brandColors} from '../../../../consts/brand-colors'

export const siteFooter = defineType({
  name: 'siteFooter',
  type: 'document',
  icon: ComposeIcon,
  title: 'Footer',
  fields: [
    defineField({
      name: 'footerLogo',
      type: 'imageIcon',
      title: 'Logo',
      description: 'The logo displayed in the footer',
    }),

    defineField({
      name: 'footerMenu',
      type: 'reference',
      title: 'Navigation Menu',
      description: 'Select the menu to display in the footer',
      to: [{type: 'menu'}],
      options: {disableNew: true},
    }),

    defineField({
      name: 'footerCopyright',
      type: 'string',
      title: 'Copyright Text',
      description: 'Text displayed at the bottom of the footer',
      initialValue: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
    }),

    defineField({
      name: 'textColor',
      title: 'Text Color',
      description: 'Color for the footer text and links',
      type: 'color',
      options: brandColors,
    }),

    defineField({
      name: 'layout',
      type: 'cmmLySettings',
      title: 'Layout',
      description: 'Settings for the footer layout display',
    }),

    defineField({
      name: 'background',
      type: 'cmmBgSettings',
      title: 'Background',
      description: 'Settings for the footer background display',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Footer'}
    },
  },
})
