import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionSubtitle} from '../../fields/common/cmmSectionSubtitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const formType = defineType({
  name: 'formType',
  type: 'document',
  title: 'Form',
  description: 'Section with a form to collect user information',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionSubtitle,
    cmmSectionDescription,

    defineField({
      name: 'features',
      type: 'array',
      title: 'Key Features',
      description: 'List up to 6 key features',
      of: [{type: 'featureItem'}],
      validation: (r) => r.max(6),
    }),

    defineField({
      name: 'featDisplay',
      type: 'string',
      title: 'Features Display',
      description: 'Choose how the features are displayed',
      options: {
        list: [
          {title: 'Vertical (Default)', value: 'vertical'},
          {title: 'Horizontal', value: 'horizontal'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'vertical',
    }),

    defineField({
      name: 'formTitle',
      type: 'string',
      title: 'Form Title (Optional)',
      description: 'Title to display at the top of the form',
    }),

    defineField({
      name: 'form',
      type: 'string',
      title: 'Form Type',
      description: 'Select the type of form to display in this section',
      initialValue: 'customForm',
      options: {
        list: [
          {title: 'Custom Form', value: 'customForm'},
          {title: 'HubSpot Form (Embedded)', value: 'hubSpotForm'},
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'fields',
      type: 'array',
      title: 'Form Fields',
      description: 'Add input fields to include in the form',
      of: [defineArrayMember({type: 'formInput'})],
      hidden: ({parent}) => parent?.form !== 'customForm',
    }),

    defineField({
      name: 'btnLabel',
      type: 'string',
      title: 'Button Label (Optional)',
      description: 'Label for the form submit button',
      initialValue: 'Send Message',
      hidden: ({parent}) => parent?.form !== 'customForm',
    }),

    defineField({
      name: 'hubspot',
      type: 'formHubSpot',
      title: 'HubSpot Settings',
      hidden: ({parent}) => parent?.form !== 'hubSpotForm',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const parent = (ctx as {parent?: {form?: string}}).parent
          if (parent?.form === 'hubSpotForm' && !val) {
            return 'Provide HubSpot settings'
          }
          return true
        }),
    }),

    defineField({
      name: 'footer',
      type: 'blockContentMini',
      title: 'Footer Text (Optional)',
      description: 'Text to display below the form',
      hidden: ({parent}) => parent?.form !== 'customForm',
    }),

    defineField({
      name: 'titleDesc',
      type: 'cmmTtlDescSettings',
      title: 'Title & Description',
      description: 'Settings for the title and description display',
    }),

    defineField({
      name: 'layout',
      type: 'cmmLySettings',
      title: 'Section Layout',
      description: 'Settings for the section layout',
    }),

    defineField({
      name: 'background',
      type: 'cmmBgSettings',
      title: 'Section Background',
      description: 'Settings for the section background',
    }),
  ],
  preview: {
    select: {title: 'title', name: 'sectionName'},
    prepare({title, name}) {
      return {title, subtitle: `Form · ${name}`}
    },
  },
})
