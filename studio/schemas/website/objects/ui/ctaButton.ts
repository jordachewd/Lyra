import {defineType, defineField} from 'sanity'
import {LaunchIcon} from '@sanity/icons/Launch'
import {CtaButtonParent} from '../../types/ctaButtonParent'

export const ctaButton = defineType({
  name: 'ctaButton',
  type: 'object',
  title: 'CTA Button',
  description: 'Call to action button with text and link',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Text',
      description: 'Text to display on the button',
      placeholder: 'Get Started',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'type',
      type: 'string',
      title: 'Link Type',
      description: 'Choose the type of link for this button',
      options: {
        list: [
          {title: 'Internal page', value: 'internal'},
          {title: 'Custom link', value: 'custom'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
    }),

    defineField({
      name: 'href',
      title: 'URL or path',
      type: 'string',
      description: 'Absolute URL (https://…) or internal path (contact)',
      hidden: ({parent}: {parent?: CtaButtonParent}) => parent?.type !== 'custom',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const linkType = (ctx.parent as CtaButtonParent | undefined)?.type
          if (linkType !== 'custom') return true
          if (typeof val !== 'string' || !val.trim()) return 'Provide a URL or path'
          const ok = /^https?:\/\//.test(val) || val.startsWith('/')
          return ok || 'Use https://… or a leading-slash path like /pricing'
        }),
    }),

    defineField({
      name: 'pageRef',
      type: 'reference',
      title: 'Page',
      description: 'Select a page to link to',
      to: [{type: 'page'}],
      options: {disableNew: true, filter: '!defined(archivedAt) && !(_id in path("drafts.**"))'},
      hidden: ({parent}: {parent?: CtaButtonParent}) => parent?.type !== 'internal',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const linkType = (ctx.parent as CtaButtonParent | undefined)?.type
          return linkType === 'internal' ? !!val || 'Pick a page' : true
        }),
    }),

    defineField({
      name: 'highlight',
      type: 'boolean',
      title: 'Highlight Button',
      description: 'Enable to apply special styling to the button.',
      initialValue: false,
    }),

    defineField({
      name: 'target',
      type: 'boolean',
      title: 'Open in new tab',
      description: 'Whether to open the link in a new tab',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'text'},
    prepare({title}) {
      return {title, media: LaunchIcon, subtitle: 'CTA Button'}
    },
  },
})
