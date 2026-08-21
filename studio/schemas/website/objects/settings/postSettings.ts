import {defineType, defineField} from 'sanity'
import {brandColors} from '../../../../consts/brand-colors'

export const postSettings = defineType({
  name: 'postSettings',
  type: 'object',
  title: 'Post Settings',
  description: 'Settings for the blog post.',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'showCats',
      type: 'boolean',
      title: 'Show Categories',
      description: 'Toggle to display the categories on the page',
      initialValue: false,
    }),

    defineField({
      name: 'showTags',
      type: 'boolean',
      title: 'Show Tags',
      description: 'Toggle to display the tags on the page',
      initialValue: true,
    }),

    defineField({
      name: 'showAuthor',
      type: 'boolean',
      title: 'Show Author(s)',
      description: 'Toggle to display the author(s) on the page',
      initialValue: true,
    }),

    defineField({
      name: 'showDate',
      type: 'boolean',
      title: 'Show Date',
      description: 'Toggle to display the publication date on the page',
      initialValue: true,
    }),

    defineField({
      name: 'alignTitle',
      type: 'string',
      title: 'Title • Alignment',
      description: 'Alignment for the title of the section.',
      options: {
        list: [
          {title: 'Default (Center)', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'center',
    }),

    defineField({
      name: 'pdDisplay',
      type: 'string',
      title: 'Title • Show Padding (Top / Bottom)',
      description: 'Choose where to show padding for the title area',
      options: {
        list: [
          {title: 'Top & Bottom (default)', value: 'both'},
          {title: 'Only Top', value: 'top'},
          {title: 'Only Bottom', value: 'bottom'},
          {title: 'None', value: 'none'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'both',
    }),

    defineField({
      name: 'pdTopBottom',
      type: 'string',
      title: 'Title • Padding Size (Top / Bottom)',
      description: 'Choose the size of the padding for the title area',
      options: {
        list: [
          {title: 'Default (100%)', value: 'normal'},
          {title: 'Medium (75%)', value: 'medium'},
          {title: 'Half (50%)', value: 'half'},
          {title: 'Small (25%)', value: 'small'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
      hidden: ({parent}) => parent?.pdDisplay === 'none',
    }),

    defineField({
      name: 'textColor',
      title: 'Title • Text Color',
      description: 'Choose the text color for the title and description',
      type: 'color',
      options: brandColors,
    }),

    defineField({
      name: 'gradientBg',
      type: 'string',
      title: 'Background Gradient',
      description: 'Select a background gradient for the page',
      initialValue: 'post',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Home', value: 'home'},
          {title: 'Page', value: 'page'},
          {title: 'Page Blue', value: 'pageblue'},
          {title: 'Post (Default)', value: 'post'},
          {title: 'Product', value: 'product'},
          {title: 'Solution', value: 'solution'},
          {title: 'Resource (Blue)', value: 'guideblue'},
          {title: 'Resource (Green)', value: 'guidegreen'},
          {title: 'Resource (Gray)', value: 'guidegray'},
        ],
        layout: 'dropdown',
      },
    }),
  ],
})
