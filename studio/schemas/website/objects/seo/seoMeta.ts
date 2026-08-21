import {defineType, defineField} from 'sanity'
import {SeoModeType} from '../../types/seoMode'

export const seoMeta = defineType({
  name: 'seoMeta',
  type: 'object',
  title: 'SEO',
  description: 'Overrides for search/social. Leave blank to inherit from content.',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'mode',
      type: 'string',
      title: 'Mode',
      description:
        '"Auto" will derive SEO metadata from page content. ' +
        '"Custom" lets you set custom metadata. ' +
        '"Ignore" disables SEO for this page.',
      options: {
        list: [
          {title: 'Auto (Default)', value: 'auto'},
          {title: 'Custom', value: 'override'},
          {title: 'Ignore', value: 'ignore'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'auto',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'title',
      type: 'string',
      title: 'Meta Title',
      description: 'Recommended up to ~60 characters.',
      validation: (r) => r.max(60).warning('Keep titles under ~60 characters for best results.'),
      hidden: ({parent}: {parent?: SeoModeType}) => parent?.mode !== 'override',
    }),

    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      title: 'Meta Description',
      description: 'Recommended up to ~160 characters.',
      validation: (r) =>
        r.max(160).warning('Keep descriptions under ~160 characters for best results.'),
      hidden: ({parent}: {parent?: SeoModeType}) => parent?.mode !== 'override',
    }),

    defineField({
      name: 'image',
      type: 'imageIcon',
      title: 'Meta Image',
      description: '1200×630px recommended. Used for social sharing previews.',
      hidden: ({parent}: {parent?: SeoModeType}) => parent?.mode !== 'override',
    }),

    defineField({
      name: 'keywords',
      type: 'text',
      rows: 4,
      title: 'Meta Keywords',
      description: 'Comma-separated keywords for search engines (optional).',
      placeholder: 'Peppol, API, e-invoicing, integration, etc.',
      hidden: ({parent}: {parent?: SeoModeType}) => parent?.mode !== 'override',
    }),

    defineField({
      name: 'noindex',
      type: 'boolean',
      title: 'Discourage search engines from indexing this page.',
      description:
        'If enabled, search engines will not index this page. ' +
        'However, it is up to the search engines to respect this setting.',
      initialValue: false,
      hidden: ({parent}: {parent?: SeoModeType}) => parent?.mode !== 'ignore',
    }),
  ],
  preview: {
    select: {title: 'metaTitle', mode: 'mode', media: 'image'},
    prepare({title, mode, media}) {
      return {
        title: title || 'SEO (auto)',
        subtitle: `Mode: ${mode || 'auto'}`,
        media,
      }
    },
  },
})
