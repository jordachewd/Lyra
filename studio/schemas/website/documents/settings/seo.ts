import {defineField, defineType} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'

export const seoSettings = defineType({
  name: 'seoSettings',
  type: 'document',
  title: 'SEO',
  description: 'Settings for SEO and social sharing',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'category',
      type: 'string',
      title: 'Business Category',
      description: 'The business category for structured data (schema.org)',
      placeholder: 'Technology',
    }),

    defineField({
      name: 'classification',
      type: 'string',
      title: 'Business Classification',
      description: 'The business classification for structured data (schema.org)',
      placeholder: 'Software',
    }),

    defineField({
      name: 'keywords',
      type: 'text',
      rows: 10,
      title: 'Keywords',
      description: 'Comma-separated keywords for SEO (e.g. "web design, branding, strategy")',
      placeholder: 'web design, branding, strategy',
    }),

    defineField({
      name: 'twitterHandle',
      type: 'string',
      title: 'Twitter',
      description: 'Twitter handle, e.g. @lyra',
      placeholder: '@lyra',
    }),

    defineField({
      name: 'linkedinHandle',
      type: 'string',
      title: 'LinkedIn',
      description: 'LinkedIn company page URL',
      placeholder: '/company/lyra',
    }),

    defineField({
      name: 'gSiteVerification',
      type: 'string',
      title: 'Google Site Verification',
      description: 'Meta tag content for Google site ownership verification',
      placeholder: 'e.g. dpX-abcdefghijklmnop',
    }),

    defineField({
      name: 'noindex',
      type: 'boolean',
      title: 'Disable Indexing',
      description:
        'If enabled, search engines will not index the site. ' +
        'However, it is up to the search engines to respect this setting.',
      initialValue: false,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'SEO Settings'}
    },
  },
})
