import {defineType, defineField} from 'sanity'

export const formHubSpot = defineType({
  name: 'formHubSpot',
  title: 'HubSpot Embed',
  description: 'Embed a HubSpot form using the portal and form IDs',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'region',
      type: 'string',
      title: 'Region',
      description: "Specify the HubSpot region if not using the default 'na1'",
      placeholder: 'e.g., eu1, ap1',
      initialValue: 'na1',
    }),

    defineField({
      name: 'portalId',
      type: 'string',
      title: 'Portal ID',
      description: 'Your HubSpot account portal ID',
      placeholder: 'e.g., 12345678',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const doc = (ctx as {document?: {form?: string}}).document
          if (doc?.form === 'hubSpotForm' && !val) {
            return 'Portal ID is required when form is set to HubSpot'
          }
          return true
        }),
    }),

    defineField({
      name: 'formId',
      type: 'string',
      title: 'Form ID',
      description: 'The unique ID of the HubSpot form to embed',
      placeholder: 'e.g., abcd1234-ef56-7890-gh12-ijklmnopqrst',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const doc = (ctx as {document?: {form?: string}}).document
          if (doc?.form === 'hubSpotForm' && !val) {
            return 'Form ID is required when form is set to HubSpot'
          }
          return true
        }),
    }),
  ],
})
