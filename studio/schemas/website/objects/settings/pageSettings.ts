import {defineType, defineField} from 'sanity'
import {cmmShowTitle} from '../../fields/common/cmmShowTitle'
import {cmmAlignTitle} from '../../fields/common/cmmAlignTitle'
import {cmmShowDesc} from '../../fields/common/cmmShowDesc'
import {brandColors} from '../../../../consts/brand-colors'

export const pageSettings = defineType({
  name: 'pageSettings',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    cmmShowTitle,
    cmmShowDesc,

    defineField({
      name: 'shrinkTitle',
      type: 'boolean',
      title: 'Shrink Title & Description',
      description: 'Toggle to half width, leaving more space on the right.',
      initialValue: false,
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    cmmAlignTitle,

    defineField({
      name: 'pdDisplay',
      type: 'string',
      title: 'Title & Description • Show Padding (Top / Bottom)',
      description: 'Choose where to show padding for the title and description area',
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
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    defineField({
      name: 'pdTopBottom',
      type: 'string',
      title: 'Title & Description • Padding Size (Top / Bottom)',
      description: 'Choose the size of the padding for the title and description area',
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
      hidden: ({parent}) => parent?.pdDisplay === 'none' || parent?.showTitle === false,
    }),

    defineField({
      name: 'width',
      type: 'string',
      title: 'Title & Description • Section Width',
      description: 'Choose the width of the title and description area',
      options: {
        list: [
          {title: 'Site Width (Default)', value: 'normal'},
          {title: 'Full Width', value: 'full'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    defineField({
      name: 'textColor',
      title: 'Title & Description • Text Color',
      description: 'Choose the text color for the title and description',
      type: 'color',
      options: brandColors,
      hidden: ({parent}) => parent?.showTitle === false,
    }),

    defineField({
      name: 'gradientBg',
      type: 'string',
      title: 'Page Background Gradient',
      description: 'Choose a background gradient for the page',
      initialValue: 'page',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Home', value: 'home'},
          {title: 'Page (Default)', value: 'page'},
          {title: 'Page Blue', value: 'pageblue'},
          {title: 'Post', value: 'post'},
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
