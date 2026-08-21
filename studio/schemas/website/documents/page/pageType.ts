import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType, defineArrayMember} from 'sanity'
import {PROTECTED_PAGE_SLUGS} from '../../../../consts/config/protected-page-slugs'
import {reservedRoutes} from '../../../../consts/config/reserved-routes'
import {allSectionTypes} from '../../../../consts/website-section-types'
import {archivedAtField} from '../../fields/common/archivable'

export const pageType = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  description: 'A standard page with flexible sections',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'Title of the page',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Page Slug',
      description: 'Page URL (e.g. "about" for /about)',
      readOnly: ({document}) => {
        const currentSlug = (document?.slug as {current?: string})?.current?.toLowerCase().trim()
        return !!currentSlug && PROTECTED_PAGE_SLUGS.has(currentSlug)
      },
      options: {source: 'title'},
      validation: (Rule) =>
        Rule.required().custom((val) => {
          const s = val?.current?.toLowerCase().trim()
          return (s && !reservedRoutes.includes(s)) || 'Slug is reserved. Please choose another.'
        }),
    }),

    defineField({
      name: 'description',
      type: 'blockContentMini',
      title: 'Description (optional)',
      description: 'Short description of the page',
    }),

    defineField({
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Add, remove, and reorder sections to build the page',
      of: [
        defineArrayMember({
          name: 'sectionRef',
          type: 'reference',
          title: 'Add / Create Section',
          description: 'Select a section to add to the page',
          to: allSectionTypes,
        }),
      ],
      options: {sortable: true},
      validation: (r) => r.max(30).warning('Too many sections harms performance'),
    }),

    defineField({
      name: 'settings',
      type: 'pageSettings',
      title: 'Page Settings',
      description:
        'These include title & description display options and background gradient selection.',
    }),

    defineField({
      name: 'seo',
      type: 'seoMeta',
      title: 'SEO & Metadata',
    }),

    archivedAtField,
  ],
  preview: {
    select: {title: 'title', media: 'sections.0.image.image'},
    prepare({title, media}) {
      return {title, media, subtitle: 'Page'}
    },
  },
})
