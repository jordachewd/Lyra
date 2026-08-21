import {defineType, defineField} from 'sanity'

export const googleTracking = defineType({
  name: 'googleTracking',
  type: 'object',
  title: 'Google Tracking Settings',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'enabled',
      type: 'boolean',
      title: 'Enable Google Tracking',
      description: 'Toggle to enable or disable Google tracking site-wide',
      initialValue: false,
    }),

    defineField({
      name: 'gTagManagerId',
      type: 'string',
      title: 'Google Tag Manager ID',
      hidden: ({parent}) => !parent?.enabled,
      description: 'Your Google Tag Manager ID (e.g. GTM-XXXXXXX)',
      placeholder: 'GTM-XXXXXXX',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const enabled = (context as any)?.parent?.enabled
          if (enabled && !value) {
            return 'Google Tag Manager ID is required when tracking is enabled'
          }

          return true
        }),
    }),
  ],
})
