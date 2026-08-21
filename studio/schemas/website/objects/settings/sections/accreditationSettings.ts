import {defineType, defineField} from 'sanity'

export const accreditationSettings = defineType({
  name: 'accreditationSettings',
  title: 'Accreditations Settings',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'showTitles',
      type: 'boolean',
      title: 'Show Titles',
      description: 'Display titles for accreditation items',
      initialValue: false,
    }),

    defineField({
      name: 'showTags',
      type: 'boolean',
      title: 'Show Tags',
      description: 'Display tags for accreditation items',
      initialValue: true,
    }),

    defineField({
      name: 'displayType',
      type: 'string',
      title: 'Display Type',
      description: 'Choose how to display the accreditation items',
      options: {
        list: [
          {title: 'Grid (default)', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'grid',
    }),

    defineField({
      name: 'showArrows',
      type: 'boolean',
      title: 'Show Arrows',
      description: 'Display previous/next arrows on the carousel',
      initialValue: true,
      hidden: ({parent}) => parent?.displayType !== 'carousel',
    }),

    defineField({
      name: 'showDots',
      type: 'boolean',
      title: 'Show Dots',
      description: 'Display pagination dots on the carousel',
      initialValue: true,
      hidden: ({parent}) => parent?.displayType !== 'carousel',
    }),

    defineField({
      name: 'autoplay',
      type: 'boolean',
      title: 'Autoplay',
      description: 'Automatically advance the carousel',
      initialValue: true,
      hidden: ({parent}) => parent?.displayType !== 'carousel',
    }),

    defineField({
      name: 'autoplayInterval',
      type: 'number',
      title: 'Autoplay Interval (seconds)',
      description: 'How long each page stays before the carousel advances',
      initialValue: 7,
      validation: (Rule) => Rule.min(2).max(30).integer(),
      hidden: ({parent}) => parent?.displayType !== 'carousel' || parent?.autoplay !== true,
    }),

    defineField({
      name: 'itemsPerView',
      type: 'number',
      title: 'Items per View (desktop)',
      description:
        'Number of items shown per page on desktop. Mobile always shows 1, tablet always 2.',
      options: {
        list: [
          {title: '1 item per view', value: 1},
          {title: '2 items per view', value: 2},
          {title: '3 items per view', value: 3},
          {title: '4 items per view', value: 4},
          {title: '5 items per view', value: 5},
          {title: '6 items per view', value: 6},
        ],
        layout: 'dropdown',
      },
      initialValue: 4,
      validation: (Rule) => Rule.min(1).max(6).integer(),
      hidden: ({parent}) => parent?.displayType !== 'carousel',
    }),
  ],
})
